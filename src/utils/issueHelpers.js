// ── Issue constants ────────────────────────────────────────────────────────────
export const ESTADOS = ['Pendiente', 'En Progreso', 'Resuelto']
export const PRIORIDADES = ['Baja', 'Media', 'Alta']

// ── Status config ──────────────────────────────────────────────────────────────
export const statusConfig = {
  Pendiente: {
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border border-amber-400/20',
    dot: 'bg-amber-400',
    dotColor: 'rgba(251,191,36,0.6)',
    label: 'Pendiente',
  },
  'En Progreso': {
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border border-cyan-400/20',
    dot: 'bg-cyan-400',
    dotColor: 'rgba(6,182,212,0.6)',
    label: 'En Progreso',
  },
  Resuelto: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border border-emerald-400/20',
    dot: 'bg-emerald-400',
    dotColor: 'rgba(52,211,153,0.6)',
    label: 'Resuelto',
  },
}

// ── Priority config ────────────────────────────────────────────────────────────
export const priorityConfig = {
  Baja: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border border-emerald-400/20',
    icon: '▼',
    level: 1,
  },
  Media: {
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border border-amber-400/20',
    icon: '◆',
    level: 2,
  },
  Alta: {
    color: 'text-rose-400',
    bg: 'bg-rose-400/10 border border-rose-400/20',
    icon: '▲',
    level: 3,
  },
}

// ── Date formatter ─────────────────────────────────────────────────────────────
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// ── Issue ID formatter ─────────────────────────────────────────────────────────
export function formatIssueId(id) {
  return `#${String(id).padStart(4, '0')}`
}

// ── Stats from issues array ────────────────────────────────────────────────────
export function computeStats(issues) {
  return {
    total: issues.length,
    pendiente: issues.filter((i) => i.estado === 'Pendiente').length,
    enProgreso: issues.filter((i) => i.estado === 'En Progreso').length,
    resuelto: issues.filter((i) => i.estado === 'Resuelto').length,
    alta: issues.filter((i) => i.prioridad === 'Alta').length,
  }
}
