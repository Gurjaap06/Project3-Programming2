import { Link } from 'react-router-dom'
import { usePokemon } from '../context/PokemonContext.jsx'

export default function PokemonCard({ pokemon }) {
  const { favorites, toggleFavorite } = usePokemon()
  const isFav = favorites.includes(pokemon.name)

  return (
    <article className="card">
      <button className="fav" onClick={() => toggleFavorite(pokemon.name)} aria-label="Toggle favorite">
        {isFav ? '★' : '☆'}
      </button>
      <Link to={`/pokemon/${pokemon.name}`}>
        <img src={pokemon.sprite} alt={pokemon.name} loading="lazy" />
        <h4 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h4>
        <p className="types">{pokemon.types.join(', ')}</p>
      </Link>
    </article>
  )
}
