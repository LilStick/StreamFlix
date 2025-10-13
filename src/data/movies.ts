// Movies database
export interface Movie {
  id: number;
  title: string;
  image: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  description: string;
  director: string;
  cast: string[];
  trailer?: string;
  backdrop?: string | null;
}

export interface MovieCategory {
  title: string;
  movies: Movie[];
}

// Movies with local images
export const movies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    image: "/images/films/darknight.webp",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "2h 32min",
    description: "Batman affronte le Joker, un criminel anarchiste qui veut plonger Gotham City dans le chaos. Heath Ledger livre une performance légendaire dans ce chef-d'œuvre de Christopher Nolan.",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"]
  },
  {
    id: 2,
    title: "Inception",
    image: "/images/films/inception.webp",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: "2h 28min",
    description: "Dom Cobb est un voleur expert dans l'art de s'introduire dans les rêves d'autrui pour dérober leurs secrets. Une dernière mission pourrait lui rendre sa vie d'avant.",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"]
  },
  {
    id: 3,
    title: "Interstellar",
    image: "/images/films/Interstellar_film_poster.jpg",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.6,
    duration: "2h 49min",
    description: "Dans un futur proche, la Terre se meurt. Un groupe d'explorateurs entreprend le voyage le plus important de l'histoire de l'humanité au-delà de notre galaxie.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"]
  },
  {
    id: 4,
    title: "The Matrix",
    image: "/images/films/matrix.jpeg",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 16min",
    description: "Un programmeur informatique découvre que la réalité n'est qu'une simulation informatique et rejoint une rébellion pour libérer l'humanité.",
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"]
  },
  {
    id: 5,
    title: "Forrest Gump",
    image: "/images/films/forrest_gump.jpg",
    year: 1994,
    genre: "Drame",
    rating: 8.8,
    duration: "2h 22min",
    description: "L'histoire extraordinaire d'un homme simple qui, sans le savoir, influence les événements historiques américains les plus importants des années 60 et 70.",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"]
  }
];

// Movie categories
export const movieCategories: MovieCategory[] = [
  {
    title: "Films Populaires",
    movies: movies.filter(movie => [1, 2, 4, 5].includes(movie.id))
  },
  {
    title: "Christopher Nolan",
    movies: movies.filter(movie => movie.director === "Christopher Nolan")
  },
  {
    title: "Science-Fiction",
    movies: movies.filter(movie => movie.genre === "Sci-Fi")
  },
  {
    title: "Classiques Incontournables",
    movies: movies.filter(movie => movie.year <= 2000 && movie.rating >= 8.5)
  },
  {
    title: "Films d'Action",
    movies: movies.filter(movie => movie.genre === "Action")
  },
  {
    title: "Les Mieux Notés",
    movies: movies.filter(movie => movie.rating >= 8.5).sort((a, b) => b.rating - a.rating)
  }
];

// Featured movie for Hero section
export const featuredMovie: Movie = movies[0]; // The Dark Knight