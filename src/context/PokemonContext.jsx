import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const PokemonContext = createContext()

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export function PokemonProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('pfavorites', [])

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const value = useMemo(() => ({ favorites, toggleFavorite }), [favorites])

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}

export function usePokemon() {
  return useContext(PokemonContext)
}
