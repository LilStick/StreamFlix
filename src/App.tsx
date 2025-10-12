import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Quiz from './components/Quiz';
import { AppProvider } from './context/AppContext';
import { useApp } from './hooks/useApp';

function AppContent() {
  const { isDarkMode, currentPage } = useApp();

  // Render page content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'favorites':
        return <div className="py-16"><h2 className="text-center text-2xl font-bold">Ma Liste - Fonctionnalité en développement</h2></div>;
      case 'movies':
        return <div className="py-16"><h2 className="text-center text-2xl font-bold">Films - Tous les films</h2><MovieGrid /></div>;
      case 'series':
        return <div className="py-16"><h2 className="text-center text-2xl font-bold">Séries - Fonctionnalité en développement</h2></div>;
      case 'new':
        return <div className="py-16"><h2 className="text-center text-2xl font-bold">Nouveautés - Fonctionnalité en développement</h2></div>;
      case 'popular':
        return <div className="py-16"><h2 className="text-center text-2xl font-bold">Populaires - Films les plus populaires</h2><MovieGrid /></div>;
      case 'quiz':
        return <Quiz />;
      default:
        return (
          <>
            <Hero />
            <MovieGrid />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-netflix-dark' : 'bg-gray-50'
    }`}>
      <Header />
      <main>
        {renderContent()}
      </main>
      <Footer />
      <Notification />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App
