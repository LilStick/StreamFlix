import React, { useState, useEffect, type ReactNode } from 'react';
import type { Movie, MovieCategory } from '../data/movies';
import { tmdbApi, convertTMDBMovieToAppFormat } from '../services/tmdbApi';
import { AppContext } from './AppContextTypes';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [watchedMovies, setWatchedMovies] = useState<Set<number>>(new Set());
  const [favoriteMovies, setFavoriteMovies] = useState<Set<number>>(new Set());
  const [userRatings, setUserRatings] = useState<Map<number, number>>(new Map());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [notification, setNotification] = useState<{ message: string; type: string; id: number } | null>(null);

  // API State
  const [movieCategories, setMovieCategories] = useState<MovieCategory[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('streamflix-theme');
    const savedWatched = localStorage.getItem('streamflix-watched');
    const savedFavorites = localStorage.getItem('streamflix-favorites');
    const savedRatings = localStorage.getItem('streamflix-ratings');

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    if (savedWatched) {
      setWatchedMovies(new Set(JSON.parse(savedWatched)));
    }

    if (savedFavorites) {
      setFavoriteMovies(new Set(JSON.parse(savedFavorites)));
    }

    if (savedRatings) {
      const ratingsArray = JSON.parse(savedRatings);
      setUserRatings(new Map(ratingsArray));
    }
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('streamflix-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('streamflix-watched', JSON.stringify([...watchedMovies]));
  }, [watchedMovies]);

  useEffect(() => {
    localStorage.setItem('streamflix-favorites', JSON.stringify([...favoriteMovies]));
  }, [favoriteMovies]);

  useEffect(() => {
    localStorage.setItem('streamflix-ratings', JSON.stringify([...userRatings]));
  }, [userRatings]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleWatched = (movieId: number) => {
    const newWatched = new Set(watchedMovies);
    if (newWatched.has(movieId)) {
      newWatched.delete(movieId);
    } else {
      newWatched.add(movieId);
    }
    setWatchedMovies(newWatched);
  };

  const toggleFavorite = (movieId: number) => {
    const newFavorites = new Set(favoriteMovies);
    if (newFavorites.has(movieId)) {
      newFavorites.delete(movieId);
      showNotification('Film retiré de Ma Liste', 'info');
    } else {
      newFavorites.add(movieId);
      showNotification('Film ajouté à Ma Liste', 'success');
    }
    setFavoriteMovies(newFavorites);
  };

  const setUserRating = (movieId: number, rating: number) => {
    const newRatings = new Map(userRatings);
    newRatings.set(movieId, rating);
    setUserRatings(newRatings);
    showNotification(`Film noté ${rating}/5 étoiles`, 'success');
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotification({ message, type, id });
    setTimeout(() => setNotification(null), 3000);
  };

  // Refresh movies from TMDB API
  const refreshMovies = async (): Promise<void> => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Fetch different categories of movies
      const [popular, topRated, nowPlaying, trending] = await Promise.all([
        tmdbApi.getPopularMovies(),
        tmdbApi.getTopRatedMovies(),
        tmdbApi.getNowPlayingMovies(),
        tmdbApi.getTrendingMovies()
      ]);

      // Convert TMDB movies to app format
      const [popularMovies, topRatedMovies, nowPlayingMovies, trendingMovies] = await Promise.all([
        Promise.all(popular.results.slice(0, 10).map(convertTMDBMovieToAppFormat)),
        Promise.all(topRated.results.slice(0, 10).map(convertTMDBMovieToAppFormat)),
        Promise.all(nowPlaying.results.slice(0, 10).map(convertTMDBMovieToAppFormat)),
        Promise.all(trending.results.slice(0, 10).map(convertTMDBMovieToAppFormat))
      ]);

      // Create movie categories
      const categories: MovieCategory[] = [
        { title: 'Tendances', movies: trendingMovies },
        { title: 'Populaires', movies: popularMovies },
        { title: 'Mieux notés', movies: topRatedMovies },
        { title: 'Au cinéma', movies: nowPlayingMovies }
      ];

      // Flatten all movies for search
      const allMoviesList = [
        ...trendingMovies,
        ...popularMovies,
        ...topRatedMovies,
        ...nowPlayingMovies
      ];

      // Remove duplicates based on ID
      const uniqueMovies = allMoviesList.reduce((acc, movie) => {
        if (!acc.some(m => m.id === movie.id)) {
          acc.push(movie);
        }
        return acc;
      }, [] as Movie[]);

      setMovieCategories(categories);
      setAllMovies(uniqueMovies);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch movies from TMDB';
      setApiError(errorMessage);
      showNotification(errorMessage, 'error');
      console.error('Error refreshing movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load movies on component mount
  useEffect(() => {
    refreshMovies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{
      isDarkMode,
      toggleTheme,
      watchedMovies,
      toggleWatched,
      favoriteMovies,
      toggleFavorite,
      userRatings,
      setUserRating,
      searchQuery,
      setSearchQuery,
      selectedMovie,
      setSelectedMovie,
      currentPage,
      setCurrentPage,
      showNotification,
      notification,
      movieCategories,
      allMovies,
      isLoading,
      apiError,
      refreshMovies
    }}>
      {children}
    </AppContext.Provider>
  );
};

