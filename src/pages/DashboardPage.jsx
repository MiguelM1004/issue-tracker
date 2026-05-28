import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import StatsBar from '../components/StatsBar'
import IssueCard from '../components/IssueCard'
import IssueModal from '../components/IssueModal'
import Filters from '../components/Filters'
import EmptyState from '../components/EmptyState'
import SkeletonCard from '../components/SkeletonCard'
import KanbanBoard from '../components/KanbanBoard'
import IssueChart from '../components/IssueChart'
import Toast from '../components/Toast'
import { useIssues } from '../hooks/useIssues'
import { useAuth } from '../context/AuthContext'
import { useDebounce } from '../hooks/useDebounce'
import { useToast } from '../hooks/useToast'

export default function DashboardPage() {
  const { session } = useAuth()
  const { issues, loading, error, fetchIssues, createIssue, updateIssue, deleteIssue } = useIssues()
  const { toasts, addToast, removeToast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIssue, setEditingIssue] = useState(null)
  const [mutating, setMutating] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriority, setFilterPriority] = useState('')

  const debouncedSearch = useDebounce(search, 300)
  const isFiltered = !!(search || filterStatus || filterPriority)

  const filtered = useMemo(() => {
    return issues.filter((issue) => {
      const matchSearch =
        !debouncedSearch ||
        issue.titulo?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        issue.descripcion?.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchStatus = !filterStatus || issue.estado === filterStatus
      const matchPriority = !filterPriority || issue.prioridad === filterPriority
      return matchSearch && matchStatus && matchPriority
    })
  }, [issues, debouncedSearch, filterStatus, filterPriority])

  const openCreate = () => { setEditingIssue(null); setIsModalOpen(true) }
  const openEdit = (issue) => { setEditingIssue(issue); setIsModalOpen(true) }
  const closeModal = () => { if (!mutating) { setIsModalOpen(false); setEditingIssue(null) } }

  const handleDrop = async (issueId, newStatus) => {
    try {
      const issue = issues.find((i) => i.id === issueId)
      if (!issue) return
      await updateIssue(issueId, { ...issue, estado: newStatus })
      addToast({ type: 'success', title: 'Estado actualizado', message: `Movido a "${newStatus}"` })
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'No se pudo actualizar el estado.' })
    }
  }

  const handleSubmit = async (form) => {
    setMutating(true)
    try {
      if (editingIssue) {
        await updateIssue(editingIssue.id, form)
        addToast({ type: 'success', title: '¡Actualizado!', message: 'Incidencia actualizada correctamente.' })
      } else {
        await createIssue(form)
        addToast({ type: 'success', title: '¡Creado!', message: 'Nueva incidencia registrada.' })
      }
      setIsModalOpen(false)
      setEditingIssue(null)
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'No se pudo guardar.' })
    } finally {
      setMutating(false)
    }
  }

  const handleDelete = (issue) => {
    Swal.fire({
      title: '¿Eliminar incidencia?',
      html: `<span style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#8b949e">#${String(issue.id).padStart(4,'0')}</span><br/><strong style="color:#e6edf3">${issue.titulo}</strong><br/><br/><span style="font-size:0.8rem">Esta acción no se puede deshacer.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'swal2-popup' },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteIssue(issue.id)
          addToast({ type: 'info', title: 'Eliminado', message: 'La incidencia fue eliminada.' })
        } catch (err) {
          addToast({ type: 'error', title: 'Error al eliminar', message: err.message || 'No se pudo eliminar.' })
        }
      }
    })
  }

  if (error) {
    return (
      <div className="noise-bg min-h-screen grid-bg">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#f43f5e" strokeWidth="1.5"/>
              <path d="M12 7v6M12 16v.01" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-center">
            <h2 className="font-display text-sm text-white mb-1">ERROR DE CONEXIÓN</h2>
            <p className="text-xs text-[#8b949e] max-w-xs font-mono">{error}</p>
          </div>
          <button
            onClick={fetchIssues}
            className="px-5 py-2 rounded-lg bg-[#161b22] border border-[#21262d] hover:border-cyan-500/30 text-sm text-[#e6edf3] transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="noise-bg min-h-screen grid-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-slide-up">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[#8b949e] uppercase tracking-widest">
                {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <h1 className="text-xl font-display font-bold text-white tracking-wide">
              PANEL DE <span className="text-cyan-400">INCIDENCIAS</span>
            </h1>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Bienvenido, <span className="text-[#e6edf3]">{session?.name}</span>
              <span className="text-[#21262d] mx-1.5">·</span>
              <span className="font-mono text-[10px]">{session?.role}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center bg-[#161b22] border border-[#21262d] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="7" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="1" y="7" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="7" y="7" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  viewMode === 'kanban'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="1" width="2" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="5" y="1" width="2" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="9" y="1" width="2" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Kanban
              </button>
            </div>

            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#060810] font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Nueva incidencia
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsBar issues={issues} />

        {/* Gráficas */}
        {!loading && <IssueChart issues={issues} />}

        {/* Filters */}
        <Filters
          search={search}
          onSearch={setSearch}
          filterStatus={filterStatus}
          onFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          onFilterPriority={setFilterPriority}
        />

        {/* Results count */}
        {!loading && (
          <div className="flex items-center justify-between mb-4 animate-fade-in">
            <p className="text-xs text-[#8b949e] font-mono">
              {isFiltered
                ? `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} de ${issues.length}`
                : `${issues.length} incidencia${issues.length !== 1 ? 's' : ''}`}
            </p>
            {isFiltered && (
              <button
                onClick={() => { setSearch(''); setFilterStatus(''); setFilterPriority('') }}
                className="text-[10px] font-mono text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {/* Contenido */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState filtered={isFiltered} />
        ) : viewMode === 'kanban' ? (
          <KanbanBoard
            issues={filtered}
            onEdit={openEdit}
            onDelete={handleDelete}
            onDrop={handleDrop}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((issue, i) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                index={i}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />

      <IssueModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingIssue={editingIssue}
        loading={mutating}
      />
    </div>
  )
}