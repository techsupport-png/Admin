import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore, { SESSION_TIMEOUT } from '@/store/authStore'

export default function SessionMonitor() {
  const { user, updateActivity, checkSession, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    // Check session on mount
    checkSession()

    // Activity events to track
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']

    let timer: number | undefined
    const handleActivity = () => {
      updateActivity()
      if (timer) clearTimeout(timer)
      timer = scheduleImmediate()
    }

    // Add activity listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, true)
    })

    // Immediate schedule based on remaining time
    const scheduleImmediate = () => {
      const { lastActivity } = useAuthStore.getState()
      const last = lastActivity ?? Date.now()
      const remaining = Math.max(0, SESSION_TIMEOUT - (Date.now() - last))
      return window.setTimeout(() => {
        checkSession()
        if (!useAuthStore.getState().user) {
          navigate('/login')
        }
      }, remaining + 250) // small buffer
    }

    // Frequent check as a safety net (every 5s)
    const interval = setInterval(() => {
      checkSession()
      if (!useAuthStore.getState().user) {
        navigate('/login')
      }
    }, 5 * 1000)

    // Also check when tab becomes visible again
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkSession()
        if (!useAuthStore.getState().user) navigate('/login')
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

  timer = scheduleImmediate()

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity, true)
      })
      clearInterval(interval)
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [user, updateActivity, checkSession, logout, navigate])

  return null
}
