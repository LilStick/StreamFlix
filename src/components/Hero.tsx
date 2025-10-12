import { featuredMovie } from '../data/movies';
import { useApp } from '../hooks/useApp';

const Hero: React.FC = () => {
  const { setSelectedMovie } = useApp();

  const handleWatchNow = () => {
    setSelectedMovie(featuredMovie);
  };
  return (
    <section className="relative h-screen flex items-center justify-start">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={featuredMovie.image}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to generic background
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1489599210478-e5822cd8b2c1?w=1920&h=1080&fit=crop&crop=center";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            {featuredMovie.title}
          </h1>
          <div className="flex items-center mb-4 text-lg">
            <span className="text-yellow-400">★</span>
            <span className="ml-2 text-white font-semibold">{featuredMovie.rating}/10</span>
            <span className="mx-4 text-gray-300">•</span>
            <span className="text-gray-300">{featuredMovie.year}</span>
            <span className="mx-4 text-gray-300">•</span>
            <span className="text-gray-300">{featuredMovie.duration}</span>
            <span className="mx-4 text-gray-300">•</span>
            <span className="bg-netflix-red text-white px-2 py-1 rounded text-sm font-bold">
              {featuredMovie.genre}
            </span>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
            {featuredMovie.description}
          </p>
          <div className="mb-6">
            <p className="text-gray-400">
              <strong>Réalisé par:</strong> {featuredMovie.director}
            </p>
            <p className="text-gray-400">
              <strong>Avec:</strong> {featuredMovie.cast.join(', ')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary text-lg px-8 py-4">
              <svg className="w-6 h-6 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Regarder maintenant
            </button>
            <button
              onClick={handleWatchNow}
              className="btn-secondary text-lg px-8 py-4"
            >
              <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Plus d'infos
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded transition-colors duration-300">
              <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ma Liste
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;