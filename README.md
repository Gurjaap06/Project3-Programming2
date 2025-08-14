# Pokémon Finder (React + Vite)

A simple, responsive Pokémon finder using **React Router**, **PokeAPI**, **React Context**, and **localStorage**.  
Built with **Vite**, styled with **plain CSS**, and deployable to **GitHub Pages**.

## Requirements satisfied
- 3+ pages: Home, Details, Favorites
- React Router (HashRouter for GitHub Pages)
- API integration (PokeAPI) with loading/error states
- Hooks: `useState`, `useEffect`, Context for favorites
- Props and event handlers (search form, filter, favorite toggles)
- Conditional rendering (loading, errors, empty states)
- Responsive design with CSS
- README + deploy scripts

## Getting started

```bash
# 1) Install deps
npm install

# 2) Run locally (open the URL shown)
npm run dev
```

## Project structure
```
src/
  api/pokeapi.js          # API helpers
  components/             # UI components
  context/PokemonContext.jsx
  pages/                  # Home, Details, Favorites
  App.jsx, main.jsx, styles.css
```

## Notes
- PokeAPI is public. Heavy filtering fetches multiple Pokémon details; this project caps some requests for performance.
- If you rename your repo, no changes are required (HashRouter avoids base path issues).
