import { computeStats } from '../utils/issueHelpers'

function StatCard({ label, value, accent, delay, icon }) {
  return (
    <div
      className={`animate-slide-up stagger-${delay} relative overflow-hidden rounded-xl bg-[#161b22] border border-[#21262d] p-5 hover:border-[${accent}]/30 transition-all duration-300 group`}
    >
      {/* Subtle gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#8b949e] font-mono uppercase tracking-widest mb-2">{label}</p>
          <p className="text-3xl font-display font-bold" style={{ color: accent }}>{value}</p>
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function StatsBar({ issues }) {
  const stats = computeStats(issues)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard label="Total" value={stats.total} accent="#06b6d4" delay={1} icon="◈" />
      <StatCard label="Pendiente" value={stats.pendiente} accent="#fbbf24" delay={2} icon="◐" />
      <StatCard label="En progreso" value={stats.enProgreso} accent="#22d3ee" delay={3} icon="◑" />
      <StatCard label="Resueltos" value={stats.resuelto} accent="#34d399" delay={4} icon="◉" />
    </div>
  )
}
