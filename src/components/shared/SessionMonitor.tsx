import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/authStore'

export default function SessionMonitor() {
  const { user, updateActivity, checkSession, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    // Check session on mount
    checkSession()

    // Activity events to track
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']

    const handleActivity = () => {
      updateActivity()
    }

    // Add activity listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, true)
    })

    // Check session every minute
    const interval = setInterval(() => {
      checkSession()
      
      // If user was logged out, redirect to login
      if (!useAuthStore.getState().user) {
        navigate('/login')
      }
    }, 60 * 1000) // Check every 60 seconds

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity, true)
      })
      clearInterval(interval)
    }
  }, [user, updateActivity, checkSession, logout, navigate])

  return null
}
