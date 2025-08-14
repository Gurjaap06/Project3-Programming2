import { useEffect, useState } from 'react'
import { usePokemon } from '../context/PokemonContext.jsx'
import { getPokemonBasic } from '../api/pokeapi.js'
import PokemonCard from '../components/PokemonCard.jsx'
import Loader from '../components/Loader.jsx'

export default function Favorites() {
  const { favorites } = usePokemon()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      const data = await Promise.all(favorites.map((n) => getPokemonBasic(n).catch(() => null)))
      if (active) setItems(data.filter(Boolean))
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [favorites])

  if (loading) return <Loader />
  if (favorites.length === 0) return <p>No favorites yet.</p>

  return (
    <div className="grid">
      {items.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
    </div>
  )
}
