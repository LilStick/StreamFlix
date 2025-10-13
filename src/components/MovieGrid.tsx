import React, { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import MovieModal from './MovieModal';
import type { Movie } from '../data/movies';

const MovieGrid: React.FC = () => {
  const {
    searchQuery,
    selectedMovie,
    setSelectedMovie,
    watchedMovies,
    toggleWatched,
    favoriteMovies,
    toggleFavorite,
    isDarkMode,
    movieCategories,
    allMovies,
    isLoading,
    apiError
  } = useApp();

  // Filter movies by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return movieCategories;
    }

    const filteredMovies = allMovies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some((actor: string) => actor.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return [{
      title: `Résultats pour "${searchQuery}"`,
      movies: filteredMovies
    }];
  }, [searchQuery, movieCategories, allMovies]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleToggleWatched = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    toggleWatched(movieId);
  };

  const handleToggleFavorite = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    toggleFavorite(movieId);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`py-16 ${isDarkMode ? 'bg-netflix-dark' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Chargement des films...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (apiError) {
    return (
      <div className={`py-16 ${isDarkMode ? 'bg-netflix-dark' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Erreur de chargement
          </h2>
          <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {apiError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`py-16 ${isDarkMode ? 'bg-netflix-dark' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 || filteredCategories[0].movies.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Aucun film trouvé pour "{searchQuery}"
              </p>
            </div>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.movies.map((movie) => {
                    const isWatched = watchedMovies.has(movie.id);
                    const isFavorite = favoriteMovies.has(movie.id);
                    return (
                      <div
                        key={movie.id}
                        className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
                        onClick={() => handleMovieClick(movie)}
                      >
                        <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1489599210478-e5822cd8b2c1?w=400&h=600&fit=crop';
                            }}
                          />

                          {/* Badge VU */}
                          {isWatched && (
                            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                              ✓ VU
                            </div>
                          )}

                          {/* Bouton Favori */}
                          <button
                            onClick={(e) => handleToggleFavorite(e, movie.id)}
                            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                              isFavorite
                                ? 'bg-red-600 text-white'
                                : 'bg-black bg-opacity-50 text-white hover:bg-red-600'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d={isFavorite
                                ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                              }/>
                            </svg>
                          </button>

                          {/* Overlay au survol */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                            <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                            <div className="flex items-center gap-2 text-sm mb-2">
                              <span className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {movie.rating}
                              </span>
                              <span>{movie.year}</span>
                            </div>
                            <p className="text-sm line-clamp-2 mb-3">{movie.description}</p>

                            {/* Boutons d'action */}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => handleToggleWatched(e, movie.id)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  isWatched
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                              >
                                {isWatched ? '✓ Vu' : 'Marquer vu'}
                              </button>
                              <button className="px-3 py-1 bg-netflix-red hover:bg-red-700 text-white rounded-full text-xs font-medium transition-colors">
                                ▶ Regarder
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default MovieGrid;