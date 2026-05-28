export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#8b949e] border border-[#21262d] bg-[#161b22] hover:border-cyan-500/30 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Anterior
      </button>

      {/* Páginas */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg text-xs font-mono transition-all duration-200 ${
              currentPage === page
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-[#8b949e] border border-transparent hover:border-[#21262d] hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#8b949e] border border-[#21262d] bg-[#161b22] hover:border-cyan-500/30 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        Siguiente
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}