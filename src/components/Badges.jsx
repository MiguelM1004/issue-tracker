import { statusConfig, priorityConfig } from '../utils/issueHelpers'

export function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig['Pendiente']
  return (
    <span className={`badge ${cfg.bg} ${cfg.color}`}>
      <span
        className="pulse-dot w-2 h-2 rounded-full inline-block"
        style={{ backgroundColor: cfg.dotColor, color: cfg.dotColor }}
      />
      {cfg.label}
    </span>
  )
}

export function PriorityBadge({ priority }) {
  const cfg = priorityConfig[priority] || priorityConfig['Baja']
  return (
    <span className={`badge ${cfg.bg} ${cfg.color}`}>
      <span className="text-xs">{cfg.icon}</span>
      {priority}
    </span>
  )
}
