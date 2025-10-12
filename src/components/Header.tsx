import React, { useState } from 'react';
import Search from './Search';
import LoginModal from './LoginModal';
import { useApp } from '../hooks/useApp';

const Header: React.FC = () => {
  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme, setSearchQuery, currentPage, setCurrentPage } = useApp();

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Open login modal
  const openLoginModal = () => {
    setLoginModalMode('login');
    setIsLoginModalOpen(true);
  };

  // Open register modal
  const openRegisterModal = () => {
    setLoginModalMode('register');
    setIsLoginModalOpen(true);
  };

  const navigationItems = [
    { id: 'home', label: 'Accueil', icon: '🏠' },
    { id: 'movies', label: 'Films', icon: '🎬' },
    { id: 'series', label: 'Séries', icon: '📺' },
    { id: 'favorites', label: 'Ma Liste', icon: '❤️' },
    { id: 'quiz', label: 'Quiz Cinéma', icon: '🧠' },
    { id: 'new', label: 'Nouveautés', icon: '✨' },
    { id: 'popular', label: 'Populaires', icon: '🔥' }
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-netflix-red text-3xl font-bold cursor-pointer">StreamFlix</h1>
            </div>

            {/* Navigation intégrée */}
            <nav className="hidden md:flex space-x-6">
              {navigationItems.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                    currentPage === page.id
                      ? 'bg-netflix-red text-white'
                      : 'text-white hover:text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm">{page.icon}</span>
                  <span>{page.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <Search onSearch={handleSearch} />

              {/* Bouton Theme */}
              <button
                onClick={toggleTheme}
                className="p-2 text-white hover:text-gray-300 transition-colors"
                title={isDarkMode ? 'Mode lumineux' : 'Mode sombre'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {isLoggedIn ? (
                <div className="relative group">
                  <div className="w-8 h-8 bg-red-600 rounded overflow-hidden cursor-pointer">
                    <img src="https://via.placeholder.com/32x32/ff0000/ffffff?text=U" alt="Profile" className="w-full h-full object-cover" />
                  </div>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-netflix-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Mon Profil</a>
                      <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Paramètres</a>
                      <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Se déconnecter</a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={openLoginModal}
                    className="group relative overflow-hidden bg-gradient-to-r from-netflix-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                    <span className="relative z-10">Connexion</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </button>

                  <button
                    onClick={openRegisterModal}
                    className={`hidden sm:flex items-center space-x-1 px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'border-gray-600 text-gray-300 hover:border-netflix-red hover:text-netflix-red hover:bg-netflix-red/10'
                        : 'border-gray-300 text-gray-700 hover:border-netflix-red hover:text-netflix-red hover:bg-netflix-red/10'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium">S'inscrire</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-700 bg-black/95' : 'border-gray-200 bg-white/95'} backdrop-blur-sm`}>
            <div className="px-4 py-3 space-y-2">
              {navigationItems.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setCurrentPage(page.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-colors ${
                    currentPage === page.id
                      ? 'bg-netflix-red text-white'
                      : isDarkMode
                      ? 'text-white hover:bg-gray-800'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>{page.icon}</span>
                  <span>{page.label}</span>
                </button>
              ))}

              {/* Mobile login buttons */}
              <div className="pt-3 border-t border-gray-600 space-y-2">
                <button
                  onClick={() => {
                    openLoginModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-netflix-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-3 rounded-lg shadow-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                  <span>Se connecter</span>
                </button>

                <button
                  onClick={() => {
                    openRegisterModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    isDarkMode
                      ? 'border-gray-600 text-gray-300 hover:border-netflix-red hover:text-netflix-red hover:bg-netflix-red/10'
                      : 'border-gray-300 text-gray-700 hover:border-netflix-red hover:text-netflix-red hover:bg-netflix-red/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Créer un compte</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        initialMode={loginModalMode}
      />
    </>
  );
};

export default Header;