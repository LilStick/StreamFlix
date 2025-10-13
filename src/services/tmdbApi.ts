// TMDB API Service for StreamFlix
const API_KEY = "08a341931ab5f5dcee467baeb4a68c76";
const BASE_URL = "https://api.themoviedb.org/3";

// TMDB API Response interfaces
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface TMDBMovieDetails extends TMDBMovie {
  genres: Genre[];
  runtime: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  imdb_id: string;
  homepage: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenresResponse {
  genres: Genre[];
}

// API error interface
export interface TMDBError {
  status_message: string;
  status_code: number;
}

// Helper function to construct image URLs
export const getImageUrl = (path: string | null, size: 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string | null => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Helper function to format runtime
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};

// Base API request function
const apiRequest = async <T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'fr-FR'); // French language for descriptions

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData: TMDBError = await response.json();
      throw new Error(`TMDB API Error: ${errorData.status_message} (${errorData.status_code})`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred while fetching data from TMDB');
  }
};

// API Functions
export const tmdbApi = {
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>('/movie/popular', { page });
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>('/movie/top_rated', { page });
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>('/movie/now_playing', { page });
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>('/movie/upcoming', { page });
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>('/search/movie', { query, page });
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<TMDBMovieDetails> => {
    return apiRequest<TMDBMovieDetails>(`/movie/${movieId}`);
  },

  // Get movie credits (cast and crew)
  getMovieCredits: async (movieId: number): Promise<TMDBCredits> => {
    return apiRequest<TMDBCredits>(`/movie/${movieId}/credits`);
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId: number, page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>('/discover/movie', {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc'
    });
  },

  // Get all genres
  getGenres: async (): Promise<TMDBGenresResponse> => {
    return apiRequest<TMDBGenresResponse>('/genre/movie/list');
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow: 'day' | 'week' = 'week'): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>(`/trending/movie/${timeWindow}`);
  },

  // Get similar movies
  getSimilarMovies: async (movieId: number, page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>(`/movie/${movieId}/similar`, { page });
  },

  // Get recommended movies
  getRecommendedMovies: async (movieId: number, page: number = 1): Promise<TMDBSearchResponse> => {
    return apiRequest<TMDBSearchResponse>(`/movie/${movieId}/recommendations`, { page });
  }
};

// Convert TMDB movie to app format
export const convertTMDBMovieToAppFormat = async (tmdbMovie: TMDBMovie): Promise<import('../data/movies').Movie> => {
  try {
    // Get detailed info and credits for full conversion
    const [details, credits] = await Promise.all([
      tmdbApi.getMovieDetails(tmdbMovie.id),
      tmdbApi.getMovieCredits(tmdbMovie.id)
    ]);

    // Find director
    const director = credits.crew.find(person => person.job === 'Director')?.name || 'Unknown Director';

    // Get main cast (first 4 actors)
    const cast = credits.cast.slice(0, 4).map(actor => actor.name);

    // Get primary genre
    const genre = details.genres.length > 0 ? details.genres[0].name : 'Unknown';

    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      image: getImageUrl(tmdbMovie.poster_path) || '/images/placeholder.jpg',
      year: new Date(tmdbMovie.release_date).getFullYear(),
      genre,
      rating: Math.round(tmdbMovie.vote_average * 10) / 10,
      duration: formatRuntime(details.runtime),
      description: tmdbMovie.overview || 'No description available.',
      director,
      cast,
      backdrop: getImageUrl(tmdbMovie.backdrop_path, 'original')
    };
  } catch (error) {
    console.error('Error converting TMDB movie:', error);

    // Fallback conversion with available data
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      image: getImageUrl(tmdbMovie.poster_path) || '/images/placeholder.jpg',
      year: new Date(tmdbMovie.release_date).getFullYear(),
      genre: 'Unknown',
      rating: Math.round(tmdbMovie.vote_average * 10) / 10,
      duration: 'Unknown',
      description: tmdbMovie.overview || 'No description available.',
      director: 'Unknown Director',
      cast: [],
      backdrop: getImageUrl(tmdbMovie.backdrop_path, 'original')
    };
  }
};

export default tmdbApi;