import axios from 'axios'

// ── Replace BASE_URL with your MockAPI endpoint ──────────────────────────────
// Example: https://64abc123def.mockapi.io/api/v1
// The resource/endpoint name should be "issues"
const BASE_URL = import.meta.env.VITE_API_URL || 'https://67f9d3d3094de2fe6ea1d25c.mockapi.io/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Response interceptor: normalize errors ────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Error de conexión con el servidor'
    return Promise.reject(new Error(message))
  }
)

// ── Issue endpoints ───────────────────────────────────────────────────────────
export const issueService = {
  getAll: () => api.get('/issues').then((r) => r.data),

  getById: (id) => api.get(`/issues/${id}`).then((r) => r.data),

  create: (payload) => api.post('/issues', payload).then((r) => r.data),

  update: (id, payload) => api.put(`/issues/${id}`, payload).then((r) => r.data),

  remove: (id) => api.delete(`/issues/${id}`).then((r) => r.data),
}

export default api
