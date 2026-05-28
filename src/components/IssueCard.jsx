import { StatusBadge, PriorityBadge } from './Badges'
import { formatDate, formatIssueId } from '../utils/issueHelpers'

export default function IssueCard({ issue, onEdit, onDelete, index }) {
  return (
    <article
      className={`animate-slide-up stagger-${Math.min(index + 1, 6)} group relative bg-[#161b22] border border-[#21262d] rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300 cursor-default`}
    >
      {/* Top row: ID + priority */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono text-[#8b949e] tracking-widest">
          {formatIssueId(issue.id)}
        </span>
        <PriorityBadge priority={issue.prioridad} />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-[#e6edf3] mb-2 leading-snug line-clamp-2 group-hover:text-white transition-colors">
        {issue.titulo}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#8b949e] truncate-2 leading-relaxed mb-4">
        {issue.descripcion}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <StatusBadge status={issue.estado} />
        <span className="text-[10px] text-[#8b949e] font-mono">{formatDate(issue.createdAt)}</span>
      </div>

      {/* Actions — appear on hover */}
      <div className="absolute top-3 right-3 hidden group-hover:flex items-center gap-1">
        <button
          onClick={() => onEdit(issue)}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-[#21262d] hover:bg-cyan-500/20 hover:text-cyan-400 text-[#8b949e] transition-all duration-150 border border-transparent hover:border-cyan-500/20"
          title="Editar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.5 1.5a1.414 1.414 0 012 2L3.5 10.5H1v-2.5L8.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => onDelete(issue)}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-[#21262d] hover:bg-rose-500/20 hover:text-rose-400 text-[#8b949e] transition-all duration-150 border border-transparent hover:border-rose-500/20"
          title="Eliminar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 3h9M4.5 3V1.5h3V3M10.5 3l-.75 7.5h-7.5L1.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </article>
  )
}
