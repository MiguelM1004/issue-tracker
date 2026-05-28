import { useState, useEffect } from 'react'
import { ESTADOS, PRIORIDADES } from '../utils/issueHelpers'
import Spinner from './Spinner'

const EMPTY_FORM = {
  titulo: '',
  descripcion: '',
  estado: 'Pendiente',
  prioridad: 'Media',
}

export default function IssueModal({ isOpen, onClose, onSubmit, editingIssue, loading }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const isEditing = !!editingIssue

  useEffect(() => {
    if (editingIssue) {
      setForm({
        titulo: editingIssue.titulo || '',
        descripcion: editingIssue.descripcion || '',
        estado: editingIssue.estado || 'Pendiente',
        prioridad: editingIssue.prioridad || 'Media',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingIssue, isOpen])

  const validate = () => {
    const e = {}
    if (!form.titulo.trim()) e.titulo = 'El título es obligatorio'
    else if (form.titulo.trim().length < 5) e.titulo = 'Mínimo 5 caracteres'
    if (!form.descripcion.trim()) e.descripcion = 'La descripción es obligatoria'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#060810]/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg animate-slide-up bg-[#161b22] border border-[#21262d] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Cyan top accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#21262d]">
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-wide">
              {isEditing ? 'EDITAR INCIDENCIA' : 'NUEVA INCIDENCIA'}
            </h2>
            <p className="text-xs text-[#8b949e] mt-0.5">
              {isEditing ? 'Modifica los campos que necesites' : 'Completa el formulario para registrar'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Título */}
          <div>
            <label className="block text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-1.5">
              Título <span className="text-rose-400">*</span>
            </label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Error al cargar el módulo de pagos"
              className={`form-input ${errors.titulo ? 'border-rose-500/60 focus:border-rose-500' : ''}`}
              disabled={loading}
            />
            {errors.titulo && (
              <p className="text-rose-400 text-xs mt-1 font-mono">{errors.titulo}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-1.5">
              Descripción <span className="text-rose-400">*</span>
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describe el problema con detalle..."
              rows={3}
              className={`form-input resize-none ${errors.descripcion ? 'border-rose-500/60' : ''}`}
              disabled={loading}
            />
            {errors.descripcion && (
              <p className="text-rose-400 text-xs mt-1 font-mono">{errors.descripcion}</p>
            )}
          </div>

          {/* Estado + Prioridad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-1.5">
                Estado
              </label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-1.5">
                Prioridad
              </label>
              <select
                name="prioridad"
                value={form.prioridad}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#21262d] text-sm text-[#8b949e] hover:text-white hover:border-[#30363d] transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#060810] text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Guardando...</span>
                </>
              ) : (
                isEditing ? 'Guardar cambios' : 'Crear incidencia'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
