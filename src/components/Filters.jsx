export default function Filters({ type, onTypeChange, types }) {
  return (
    <div className="filters">
      <label>
        Type:&nbsp;
        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="all">All</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
    </div>
  )
}
