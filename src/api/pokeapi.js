const API = 'https://pokeapi.co/api/v2'

export async function getPokemonBasic(nameOrId) {
  const res = await fetch(`${API}/pokemon/${nameOrId}`)
  if (!res.ok) throw new Error('Not found')
  const p = await res.json()
  return {
    id: p.id,
    name: p.name,
    types: p.types.map((t) => t.type.name),
    sprite: p.sprites.other['official-artwork'].front_default || p.sprites.front_default,
    height: p.height,
    weight: p.weight,
    abilities: p.abilities.map((a) => a.ability.name),
    stats: p.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  }
}

export async function listByPage({ limit = 24, offset = 0 } = {}) {
  const res = await fetch(`${API}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Failed to load')
  const data = await res.json()
  const detailed = await Promise.all(
    data.results.map((r) => getPokemonBasic(r.name).catch(() => null))
  )
  return {
    count: data.count,
    results: detailed.filter(Boolean),
  }
}

export async function getTypes() {
  const res = await fetch(`${API}/type`)
  if (!res.ok) throw new Error('Failed to load types')
  const data = await res.json()
  return data.results.map((t) => t.name).filter((n) => !['shadow', 'unknown'].includes(n))
}

export async function listByType(type) {
  const res = await fetch(`${API}/type/${type}`)
  if (!res.ok) throw new Error('Type not found')
  const data = await res.json()
  const names = data.pokemon.map((p) => p.pokemon.name)
  const slice = names.slice(0, 200) // cap for performance
  const detailed = await Promise.all(slice.map((n) => getPokemonBasic(n).catch(() => null)))
  return detailed.filter(Boolean)
}
