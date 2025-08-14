export default function SearchBar({ value, onChange }) {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search Pokémon"
      />
    </form>
  )
}
