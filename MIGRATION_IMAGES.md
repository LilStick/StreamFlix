# Migration des Images - Instructions

## 📸 Comment utiliser vos images de l'ancien projet

Votre nouveau projet React est configuré pour utiliser les films de votre ancien projet StreamFlix. Voici comment migrer vos images :

### 1. Copier les images
Copiez toutes les images de votre ancien projet :
```
Ancien projet: c:\Users\noele\Documents\CODE\StreamFlix\images\films\
Nouveau projet: c:\Users\noele\Documents\CODE\StreamFlix-REACT\public\images\films\
```

### 2. Noms d'images attendus
Le système recherche ces images dans le dossier `public/images/films/` :

- `spiderman-no-way-home.jpg`
- `top-gun-maverick.jpg`
- `avatar-way-of-water.jpg`
- `black-panther-wakanda-forever.jpg`
- `the-batman.jpg`
- `doctor-strange-multiverse.jpg`
- `minions-rise-of-gru.jpg`
- `jurassic-world-dominion.jpg`
- `thor-love-and-thunder.jpg`
- `lightyear.jpg`
- `scream-2022.jpg`
- `morbius.jpg`

### 3. Système de fallback
Si une image locale n'existe pas, le système utilise automatiquement :
- Une image placeholder depuis Unsplash
- Le système continue de fonctionner parfaitement

### 4. Ajouter de nouveaux films
Pour ajouter vos propres films, modifiez le fichier :
`src/data/movies.ts`

### 5. Structure d'un film
```typescript
{
  id: 13,
  title: "Votre Film",
  image: "/images/films/votre-film.jpg",
  year: 2024,
  genre: "Action",
  rating: 8.5,
  duration: "2h 15min",
  description: "Description de votre film...",
  director: "Nom du réalisateur",
  cast: ["Acteur 1", "Acteur 2", "Acteur 3"]
}
```

### 6. Commandes utiles
```bash
# Voir les images disponibles
ls public/images/films/

# Copier depuis l'ancien projet (exemple)
cp ../StreamFlix/images/films/* public/images/films/

# Relancer le serveur
npm run dev
```

## 🎬 Fonctionnalités ajoutées
- **Affichage riche** : Note, durée, description, casting
- **Catégories intelligentes** : Films par genre, année, note
- **Film principal** : Section Hero avec le film vedette
- **Hover effects** : Informations détaillées au survol
- **Responsive design** : Adapté à tous les écrans

## 🔄 Système automatique
Le projet fonctionne immédiatement avec ou sans vos images locales grâce au système de fallback intégré.