# StreamFlix - React Streaming Platform

Un projet de plateforme de streaming moderne construit avec React, TypeScript et Tailwind CSS.

## 🚀 Technologies Utilisées

- **React 18** - Bibliothèque d'interface utilisateur moderne
- **TypeScript** - JavaScript avec des types statiques
- **Vite** - Outil de build ultra-rapide pour le développement
- **Tailwind CSS** - Framework CSS utilitaire pour un design responsive
- **ESLint** - Linter pour maintenir la qualité du code

## 🎨 Fonctionnalités

### Interface Utilisateur
- **Header Navigation** - Navigation principale avec logo StreamFlix
- **Hero Section** - Section d'accueil avec appel à l'action
- **Movie Grid** - Grille de films et séries avec hover effects
- **Search Component** - Fonctionnalité de recherche interactive
- **Login Modal** - Modal d'authentification (connexion/inscription)
- **Footer** - Pied de page avec liens et réseaux sociaux

### Design System
- **Couleurs Netflix** - Palette de couleurs inspirée de Netflix
- **Responsive Design** - Interface adaptative pour tous les écrans
- **Animations** - Transitions et effets hover fluides
- **Components Modulaires** - Architecture de composants réutilisables

## 🛠️ Installation et Lancement

### Prérequis
- Node.js (version 20.19+ ou 22.12+ recommandée)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd StreamFlix-REACT

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le projet sera accessible sur `http://localhost:5173`

### Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Build
npm run build        # Construit l'application pour la production
npm run preview      # Prévisualise le build de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants React réutilisables
│   ├── Header.tsx      # Navigation principale
│   ├── Hero.tsx        # Section héro
│   ├── MovieGrid.tsx   # Grille de contenu
│   ├── Footer.tsx      # Pied de page
│   ├── Search.tsx      # Composant de recherche
│   └── LoginModal.tsx  # Modal d'authentification
├── assets/             # Ressources statiques
├── App.tsx            # Composant principal
├── main.tsx           # Point d'entrée de l'application
└── index.css          # Styles Tailwind CSS
```

## 🎨 Système de Design

### Couleurs Personnalisées
```css
netflix-red: #E50914    /* Rouge Netflix */
netflix-black: #221F1F  /* Noir Netflix */
netflix-dark: #141414   /* Fond sombre */
```

### Classes Utilitaires
```css
.btn-primary    /* Bouton principal rouge */
.btn-secondary  /* Bouton secondaire gris */
.card          /* Carte de contenu */
.hero-gradient /* Dégradé pour la section héro */
```

## 🚀 Déploiement

Le projet est prêt pour le déploiement sur Vercel, Netlify ou tout autre service moderne.

```bash
npm run build
```

---

**StreamFlix** - Votre destination pour un streaming moderne ✨
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
