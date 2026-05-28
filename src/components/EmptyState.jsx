export default function EmptyState({ filtered }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-[#161b22] border border-[#21262d] flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="4" stroke="#21262d" strokeWidth="1.5"/>
          <path d="M10 14h8M14 10v8" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
      <h3 className="font-display text-sm text-[#e6edf3] mb-1">
        {filtered ? 'SIN RESULTADOS' : 'SIN INCIDENCIAS'}
      </h3>
      <p className="text-xs text-[#8b949e] max-w-xs">
        {filtered
          ? 'Ninguna incidencia coincide con los filtros aplicados. Intenta con otros criterios.'
          : 'No hay incidencias registradas aún. Crea la primera usando el botón "Nueva incidencia".'}
      </p>
    </div>
  )
}
