import { useState, useEffect, useCallback } from 'react'
import { issueService } from '../services/issueService'

export function useIssues() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchIssues = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await issueService.getAll()
      setIssues(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchIssues() }, [fetchIssues])

  const createIssue = useCallback(async (payload) => {
    const created = await issueService.create(payload)
    setIssues((prev) => [created, ...prev])
    return created
  }, [])

  const updateIssue = useCallback(async (id, payload) => {
    const updated = await issueService.update(id, payload)
    setIssues((prev) => prev.map((i) => (i.id === id ? updated : i)))
    return updated
  }, [])

  const deleteIssue = useCallback(async (id) => {
    await issueService.remove(id)
    setIssues((prev) => prev.filter((i) => i.id !== id))
  }, [])

  return {
    issues,
    loading,
    error,
    fetchIssues,
    createIssue,
    updateIssue,
    deleteIssue,
  }
}
