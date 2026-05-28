import { ESTADOS, PRIORIDADES } from '../utils/issueHelpers'

export default function Filters({ search, onSearch, filterStatus, onFilterStatus, filterPriority, onFilterPriority }) {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]"
          width="13" height="13" viewBox="0 0 13 13" fill="none"
        >
          <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar incidencias..."
          className="form-input pl-8 text-xs"
        />
      </div>

      {/* Status filter */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterStatus(e.target.value)}
        className="form-input w-auto text-xs"
      >
        <option value="">Todos los estados</option>
        {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
      </select>

      {/* Priority filter */}
      <select
        value={filterPriority}
        onChange={(e) => onFilterPriority(e.target.value)}
        className="form-input w-auto text-xs"
      >
        <option value="">Todas las prioridades</option>
        {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  )
}
