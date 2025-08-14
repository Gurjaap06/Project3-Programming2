import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Favorites from './pages/Favorites.jsx'
import { PokemonProvider } from './context/PokemonContext.jsx'

export default function App() {
  return (
    <PokemonProvider>
      <header className="container header">
        <h1 className="brand">Pokémon Finder</h1>
        <nav className="nav">
          <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? 'active' : ''}>Favorites</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <footer className="container footer">
        Data from <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokeAPI</a>
      </footer>
    </PokemonProvider>
  )
}
