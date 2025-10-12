// Quiz data
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category?: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: QuizAnswer[];
  completedAt: Date;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qui a réalisé le film 'Inception' (2010) ?",
    options: [
      "Steven Spielberg",
      "Christopher Nolan",
      "James Cameron",
      "Ridley Scott"
    ],
    correctAnswer: "Christopher Nolan",
    category: "Réalisateurs"
  },
  {
    id: 2,
    question: "Quel film a remporté l'Oscar du meilleur film en 2020 ?",
    options: [
      "1917",
      "Joker",
      "Parasite",
      "Once Upon a Time in Hollywood"
    ],
    correctAnswer: "Parasite",
    category: "Récompenses"
  },
  {
    id: 3,
    question: "Dans quel film trouve-t-on la réplique culte 'May the Force be with you' ?",
    options: [
      "Star Trek",
      "Star Wars",
      "Interstellar",
      "Avatar"
    ],
    correctAnswer: "Star Wars",
    category: "Répliques Cultes"
  },
  {
    id: 4,
    question: "Qui incarne Iron Man dans l'univers cinématographique Marvel ?",
    options: [
      "Chris Evans",
      "Chris Hemsworth",
      "Robert Downey Jr.",
      "Mark Ruffalo"
    ],
    correctAnswer: "Robert Downey Jr.",
    category: "Acteurs"
  },
  {
    id: 5,
    question: "Quel est le film d'animation le plus rentable de tous les temps ?",
    options: [
      "Le Roi Lion (2019)",
      "La Reine des Neiges 2",
      "Toy Story 4",
      "Les Indestructibles 2"
    ],
    correctAnswer: "Le Roi Lion (2019)",
    category: "Animation"
  },
  {
    id: 6,
    question: "Combien d'Oscars a remporté le film 'Titanic' (1997) ?",
    options: [
      "8",
      "11",
      "14",
      "9"
    ],
    correctAnswer: "11",
    category: "Récompenses"
  },
  {
    id: 7,
    question: "Quel réalisateur est connu pour ses films 'Pulp Fiction' et 'Kill Bill' ?",
    options: [
      "Martin Scorsese",
      "Quentin Tarantino",
      "David Fincher",
      "Guy Ritchie"
    ],
    correctAnswer: "Quentin Tarantino",
    category: "Réalisateurs"
  },
  {
    id: 8,
    question: "Dans 'Le Seigneur des Anneaux', qui doit détruire l'anneau unique ?",
    options: [
      "Aragorn",
      "Gandalf",
      "Frodon",
      "Sam"
    ],
    correctAnswer: "Frodon",
    category: "Fantasy"
  },
  {
    id: 9,
    question: "Quel acteur joue le rôle de Jack Sparrow dans 'Pirates des Caraïbes' ?",
    options: [
      "Orlando Bloom",
      "Johnny Depp",
      "Geoffrey Rush",
      "Javier Bardem"
    ],
    correctAnswer: "Johnny Depp",
    category: "Acteurs"
  },
  {
    id: 10,
    question: "Quel film de science-fiction se déroule en grande partie dans une ville appelée Gotham ?",
    options: [
      "Spider-Man",
      "Superman",
      "Batman",
      "Iron Man"
    ],
    correctAnswer: "Batman",
    category: "Science-Fiction"
  }
];

// Questions par catégorie pour le mode défi
export const quizCategories = [
  { id: 'all', name: 'Toutes catégories', icon: '🎬' },
  { id: 'directors', name: 'Réalisateurs', icon: '🎭' },
  { id: 'actors', name: 'Acteurs', icon: '⭐' },
  { id: 'awards', name: 'Récompenses', icon: '🏆' },
  { id: 'quotes', name: 'Répliques Cultes', icon: '💬' },
  { id: 'animation', name: 'Animation', icon: '🎨' },
  { id: 'scifi', name: 'Science-Fiction', icon: '🚀' }
];

// Shuffle questions for challenge mode
export const shuffleQuestions = (questions: QuizQuestion[]): QuizQuestion[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get score message
export const getScoreMessage = (score: number, total: number): { message: string; emoji: string; color: string } => {
  const percentage = (score / total) * 100;

  if (percentage === 100) {
    return {
      message: "Parfait ! Vous êtes un expert du 7ème art ! 🏆",
      emoji: "🏆",
      color: "text-yellow-500"
    };
  } else if (percentage >= 80) {
    return {
      message: "Excellent ! Vous êtes un cinéphile confirmé 🌟",
      emoji: "🌟",
      color: "text-green-500"
    };
  } else if (percentage >= 40) {
    return {
      message: "Pas mal ! Un vrai amateur de cinéma 🍿",
      emoji: "🍿",
      color: "text-blue-500"
    };
  } else {
    return {
      message: "Vous devriez regarder plus de films ! 🎬",
      emoji: "🎬",
      color: "text-red-500"
    };
  }
};