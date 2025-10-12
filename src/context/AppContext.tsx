import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Movie } from '../data/movies';

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Watched movies
  watchedMovies: Set<number>;
  toggleWatched: (movieId: number) => void;

  // Favorites
  favoriteMovies: Set<number>;
  toggleFavorite: (movieId: number) => void;

  // User ratings
  userRatings: Map<number, number>;
  setUserRating: (movieId: number, rating: number) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modal
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;

  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Notifications
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  notification: { message: string; type: string; id: number } | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

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
      notification
    }}>
      {children}
    </AppContext.Provider>
  );
};

