import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonBasic } from '../api/pokeapi.js'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { usePokemon } from '../context/PokemonContext.jsx'

export default function Details() {
  const { name } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { favorites, toggleFavorite } = usePokemon()
  const isFav = favorites.includes(name)

  useEffect(() => {
    let active = true
    setLoading(true); setError('')
    getPokemonBasic(name)
      .then((d) => { if (active) setData(d) })
      .catch(() => { if (active) setError('Pokémon not found') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [name])

  if (loading) return <Loader />
  if (error || !data) return <ErrorMessage msg={error || 'Error'} />

  return (
    <section className="details">
      <img src={data.sprite} alt={data.name} />
      <div>
        <h2 style={{ textTransform: 'capitalize' }}>{data.name} #{data.id}</h2>
        <button onClick={() => toggleFavorite(data.name)}>
          {isFav ? '★ Remove Favorite' : '☆ Add Favorite'}
        </button>
        <p><strong>Types:</strong> {data.types.join(', ')}</p>
        <p><strong>Height:</strong> {data.height} | <strong>Weight:</strong> {data.weight}</p>
        <h3>Stats</h3>
        <ul className="stats">
          {data.stats.map((s) => (
            <li key={s.name}>
              <span style={{ textTransform: 'capitalize' }}>{s.name}</span>
              <div className="bar" style={{ width: `${Math.min(100, s.value)}%` }} />
              <span>{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
