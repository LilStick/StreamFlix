import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import type { Movie } from '../data/movies';
import StarRating from './StarRating';
import VideoPlayer from './VideoPlayer';

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const { watchedMovies, toggleWatched, favoriteMovies, toggleFavorite, userRatings, setUserRating, isDarkMode } = useApp();
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  if (!isOpen) return null;

  const isWatched = watchedMovies.has(movie.id);
  const isFavorite = favoriteMovies.has(movie.id);
  const userRating = userRatings.get(movie.id) || 0;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header avec image */}
        <div className="relative h-64 md:h-80">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1489599210478-e5822cd8b2c1?w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50"
          >
            ×
          </button>

          {/* Badge VU */}
          {isWatched && (
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ✓ VU
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.rating}/10
                </span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">{movie.genre}</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowVideoPlayer(true)}
                className="px-6 py-2 bg-netflix-red hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Regarder
              </button>

              <button
                onClick={() => toggleWatched(movie.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isWatched
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                {isWatched ? '✓ Vu' : 'Marquer vu'}
              </button>

              <button
                onClick={() => toggleFavorite(movie.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d={isFavorite
                    ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                  }/>
                </svg>
                {isFavorite ? 'Dans ma liste' : 'Ma Liste'}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {movie.description}
            </p>
          </div>

          {/* Section de notation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Votre note</h3>
            <div className="flex items-center space-x-3">
              <StarRating
                initialRating={userRating}
                onRatingChange={(rating) => setUserRating(movie.id, rating)}
                size="lg"
              />
              {userRating > 0 && (
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {userRating}/5 étoiles
                </span>
              )}
            </div>
          </div>

          {/* Détails */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Réalisateur</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{movie.director}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Casting</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {movie.cast.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <VideoPlayer
        movie={movie}
        isOpen={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
      />
    </div>
  );
};

export default MovieModal;