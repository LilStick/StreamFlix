# 🎬 StreamFlix React

> Modern streaming platform built with React, TypeScript, and Tailwind CSS

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)

## ✨ Features

### 🎯 **Core Features**
- **Netflix-like UI** - Modern, intuitive streaming interface
- **Dark/Light Mode** - Adaptive theme with localStorage persistence
- **Fully Responsive** - Mobile-first design for all devices
- **Smooth Animations** - CSS transitions and micro-interactions

### 🎬 **Movie Management**
- **Curated Catalog** - 5 high-quality movies with local images
- **Smart Categories** - Popular, by director, genre, ratings
- **Advanced Search** - Search by title, genre, director, cast
- **User Favorites** - Add/remove movies from personal list
- **5-Star Ratings** - User rating system with persistence
- **Watch History** - Track watched movies

### 🎮 **Cinema Quiz**
- **10 Cinema Questions** - Interactive quiz with 15s timer
- **Challenge Mode** - Randomized questions for replay value
- **Score Tracking** - Best score saved locally
- **Detailed Results** - Review answers with corrections
- **Categories** - Directors, Actors, Awards, Sci-Fi, etc.

### 🎥 **Video Player (Simulated)**
- **Full Controls** - Play/pause, progress bar, volume
- **Fullscreen Mode** - Immersive viewing experience
- **Subtitles Support** - Toggle subtitles on/off

### 🔐 **Authentication UI**
- **Modern Login Modal** - Elegant design with animations
- **Dual Mode** - Login and registration forms
- **Form Validation** - Visual feedback and error states

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Modern JavaScript framework |
| **TypeScript** | Static typing for reliability |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first CSS framework |
| **Context API** | Global state management |
| **Local Storage** | User preferences persistence |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/LilStick/StreamFlix.git
cd StreamFlix

# Switch to React branch
git checkout ReactUpdate

# Install dependencies
npm install

# Start development server
npm run dev
```

🌐 **App will be available at `http://localhost:5173`**

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation + auth
│   ├── Hero.tsx         # Featured movie section
│   ├── MovieGrid.tsx    # Movie catalog grid
│   ├── MovieModal.tsx   # Movie details + player
│   ├── Quiz.tsx         # Cinema quiz game
│   ├── LoginModal.tsx   # Authentication modal
│   ├── VideoPlayer.tsx  # Simulated video player
│   └── StarRating.tsx   # Rating component
├── context/
│   └── AppContext.tsx   # Global app state
├── data/
│   ├── movies.ts        # Movie database
│   └── quiz.ts          # Quiz questions
├── hooks/
│   └── useApp.ts        # Context hook
└── assets/              # Static assets

public/
└── images/
    └── films/           # Local movie posters
        ├── darknight.webp
        ├── inception.webp
        ├── matrix.jpeg
        └── ...
```

## 🎨 Customization

### Adding Movies
Edit `src/data/movies.ts`:
```typescript
{
  id: 6,
  title: "New Movie",
  image: "/images/films/new_movie.jpg",
  year: 2024,
  genre: "Action",
  rating: 8.5,
  duration: "2h 15min",
  description: "Amazing new movie...",
  director: "Director Name",
  cast: ["Actor 1", "Actor 2"]
}
```

### Theme Configuration
Customize colors in `tailwind.config.js`:
```javascript
colors: {
  'netflix-red': '#E50914',
  'netflix-dark': '#141414',
  'netflix-black': '#000000',
}
```

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tailwind Breakpoints** - `sm`, `md`, `lg`, `xl`
- **Hamburger Menu** - Clean mobile navigation
- **Flexible Grids** - Adaptive column layout

## 🔧 Technical Features

### State Management
- Context API for global state
- localStorage for persistence
- Custom hooks for business logic

### Performance
- Local image hosting for speed
- Optimized component rendering
- Efficient search filtering

### Accessibility
- Semantic HTML with ARIA labels
- Keyboard navigation support
- WCAG contrast compliance

## 🎯 Roadmap

- [ ] Real authentication with backend
- [ ] Actual video streaming
- [ ] Dynamic movie database
- [ ] AI-powered recommendations
- [ ] Social sharing features
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎬 Credits

- **Netflix-inspired Design** - Modern streaming interface
- **Movie Posters** - Official promotional materials
- **Quiz Content** - Custom cinema trivia questions

---

**Made with ❤️ by LilStick** | **StreamFlix React** - Modern streaming experience
```
