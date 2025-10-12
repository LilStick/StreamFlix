import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';

interface FilterProps {
  onFilterChange: (filters: {
    genre: string;
    year: string;
    rating: number;
    duration: string;
  }) => void;
}

const FilterPanel: React.FC<FilterProps> = ({ onFilterChange }) => {
  const { isDarkMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: 0,
    duration: ''
  });

  const genres = ['Action', 'Sci-Fi', 'Crime', 'Drame', 'Thriller', 'Aventure', 'Comédie'];
  const years = ['2024', '2020-2023', '2010-2019', '2000-2009', '1990-1999', 'Plus ancien'];
  const durations = ['Moins de 90min', '90-120min', '120-150min', 'Plus de 150min'];

  const handleFilterChange = (key: string, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = { genre: '', year: '', rating: 0, duration: '' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
        </svg>
        <span>Filtres</span>
      </button>

      {isOpen && (
        <div className={`absolute top-12 left-0 w-80 p-6 rounded-lg shadow-xl z-50 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filtres</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Genre</label>
            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className={`w-full p-2 rounded border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Tous les genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Année */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Année</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className={`w-full p-2 rounded border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Toutes les années</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Note minimale */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Note minimale: {filters.rating}/10</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Durée */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Durée</label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className={`w-full p-2 rounded border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Toutes les durées</option>
              {durations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 bg-netflix-red hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;