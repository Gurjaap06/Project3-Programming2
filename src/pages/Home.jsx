import { useEffect, useMemo, useState } from 'react'
import { getTypes, listByPage, listByType } from '../api/pokeapi.js'
import SearchBar from '../components/SearchBar.jsx'
import Filters from '../components/Filters.jsx'
import PokemonCard from '../components/PokemonCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [types, setTypes] = useState([])
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [pageData, setPageData] = useState({ count: 0, results: [] })
  const [typeData, setTypeData] = useState([])

  useEffect(() => {
    getTypes().then(setTypes).catch(() => {})
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    const go = async () => {
      try {
        if (type === 'all') {
          const data = await listByPage({ limit: 24, offset: page * 24 })
          if (active) setPageData(data)
        } else {
          const data = await listByType(type)
          if (active) setTypeData(data)
        }
      } catch (e) {
        if (active) setError(e.message || 'Error loading Pokémon')
      } finally {
        if (active) setLoading(false)
      }
    }
    go()
    return () => { active = false }
  }, [type, page])

  const items = useMemo(() => {
    const arr = type === 'all' ? pageData.results : typeData
    return arr.filter((p) => p.name.includes(query.toLowerCase()))
  }, [type, pageData, typeData, query])

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      <Filters
        type={type}
        onTypeChange={(t) => { setType(t); setPage(0) }}
        types={types}
      />

      {loading && <Loader />}
      {error && <ErrorMessage msg={error} />}
      {!loading && !error && items.length === 0 && <p>No Pokémon found.</p>}

      <div className="grid">
        {items.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
      </div>

      {type === 'all' && (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page + 1}</span>
          <button disabled={(page + 1) * 24 >= pageData.count} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </>
  )
}
