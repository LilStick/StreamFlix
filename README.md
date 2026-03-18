# StreamFlix 🎬

**StreamFlix** is a French-language streaming platform project (films & series) built as part of a school course. The project is developed incrementally — **each Git branch corresponds to a step assigned by the teacher**, adding new features or technologies on top of the previous step.

---

## 📁 Project Structure

```
StreamFlix/
├── index.html       # Main HTML page
├── css/
│   └── style.css    # CSS stylesheet
├── js/
│   └── script.js    # JavaScript logic
└── images/          # Logo and film posters
```

---

## 🌿 Branches — Course Steps

| Branch | Step | Description |
|---|---|---|
| `main` | **Step 1 — HTML** | Initial project setup: semantic HTML structure, accessibility, Open Graph meta tags, and navigation layout for the StreamFlix homepage. |
| `cssUpdate` | **Step 2 — CSS** | Styling of the HTML page with plain CSS: layout, colors, typography, and responsive design basics. |
| `sassUpdate` | **Step 3 — SASS/SCSS** | Migration from plain CSS to SCSS: variables, mixins, animations, Bootstrap theming, and an organized file structure with imports. |
| `JavaScriptbranch` | **Step 4 — JavaScript** | Interactive features added with vanilla JS: section visibility toggle, movie counter in the footer, "watched" marking, live search with a no-results message, a movie detail modal, and a dark/light theme toggle. |
| `ReactUpdate` | **Step 5 — React + TMDB API** | Migration to React and integration of the [TMDB API](https://www.themoviedb.org/documentation/api) for real-time movie data, advanced movie management features, and a component-based architecture. |

> Each branch builds on the previous one, reflecting the progressive skills introduced during the course.

---

## 🚀 Getting Started

Clone the repository and check out the branch that corresponds to the step you want to explore:

```bash
git clone https://github.com/LilStick/StreamFlix.git
cd StreamFlix

# Example: view the JavaScript step
git checkout JavaScriptbranch
```

Open `index.html` in your browser (or use a local dev server for the React branch).

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure & accessibility
- **CSS3 / SCSS** — Styling, animations, responsive design
- **JavaScript (ES6+)** — DOM manipulation, events, modals
- **React** — Component-based UI (Step 5)
- **TMDB API** — Real-time movie and series data (Step 5)

---

## 👤 Author

**LilStick** — School project
