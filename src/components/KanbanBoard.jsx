import { useState } from 'react'
import IssueCard from './IssueCard'
import EmptyState from './EmptyState'

const COLUMNAS = [
  {
    id: 'Pendiente',
    label: 'PENDIENTE',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.15)',
    icon: '◐',
  },
  {
    id: 'En Progreso',
    label: 'EN PROGRESO',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.06)',
    border: 'rgba(6,182,212,0.15)',
    icon: '◑',
  },
  {
    id: 'Resuelto',
    label: 'RESUELTO',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.06)',
    border: 'rgba(52,211,153,0.15)',
    icon: '◉',
  },
]

export default function KanbanBoard({ issues, onEdit, onDelete, onDrop }) {
  const [draggingId, setDraggingId] = useState(null)
  const [overColumn, setOverColumn] = useState(null)

  const handleDragStart = (e, issue) => {
    setDraggingId(issue.id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('issueId', issue.id)
    e.dataTransfer.setData('fromStatus', issue.estado)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setOverColumn(null)
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverColumn(columnId)
  }

  const handleDrop = (e, toStatus) => {
    e.preventDefault()
    const issueId = e.dataTransfer.getData('issueId')
    const fromStatus = e.dataTransfer.getData('fromStatus')
    if (fromStatus !== toStatus) {
      onDrop(issueId, toStatus)
    }
    setDraggingId(null)
    setOverColumn(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNAS.map((col) => {
        const colIssues = issues.filter((i) => i.estado === col.id)
        const isOver = overColumn === col.id

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
            onDragLeave={() => setOverColumn(null)}
            className="rounded-xl p-3 transition-all duration-200"
            style={{
              background: isOver ? col.bg : 'rgba(22,27,34,0.5)',
              border: `1px solid ${isOver ? col.border : '#21262d'}`,
              minHeight: '400px',
            }}
          >
            {/* Cabecera columna */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span style={{ color: col.color }} className="text-sm">{col.icon}</span>
                <span
                  className="text-xs font-mono font-bold tracking-widest"
                  style={{ color: col.color }}
                >
                  {col.label}
                </span>
              </div>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: col.bg,
                  border: `1px solid ${col.border}`,
                  color: col.color,
                }}
              >
                {colIssues.length}
              </span>
            </div>

            {/* Separador */}
            <div
              className="h-px mb-3"
              style={{ background: `linear-gradient(90deg, ${col.color}40, transparent)` }}
            />

            {/* Tarjetas */}
            <div className="space-y-3">
              {colIssues.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-10 rounded-lg border border-dashed text-center"
                  style={{ borderColor: col.border }}
                >
                  <p className="text-xs font-mono" style={{ color: col.color, opacity: 0.5 }}>
                    Sin incidencias
                  </p>
                </div>
              ) : (
                colIssues.map((issue, i) => (
                  <div
                    key={issue.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, issue)}
                    onDragEnd={handleDragEnd}
                    className="transition-all duration-200"
                    style={{
                      opacity: draggingId === issue.id ? 0.4 : 1,
                      cursor: 'grab',
                      transform: draggingId === issue.id ? 'scale(0.97)' : 'scale(1)',
                    }}
                  >
                    <IssueCard
                      issue={issue}
                      index={i}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}