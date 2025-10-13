import { createContext } from 'react';
import type { Movie, MovieCategory } from '../data/movies';

export interface AppContextType {
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

  // API Data Management
  movieCategories: MovieCategory[];
  allMovies: Movie[];
  isLoading: boolean;
  apiError: string | null;
  refreshMovies: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);