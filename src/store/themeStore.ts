import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  cycleMode: () => void
  apply: (mode?: ThemeMode) => void
}

const storageKey = 'theme:mode'

function prefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function setHtmlDarkClass(enable: boolean) {
  const root = document.documentElement
  if (enable) root.classList.add('dark')
  else root.classList.remove('dark')
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: ((): ThemeMode => {
    const saved = (typeof window !== 'undefined' && (localStorage.getItem(storageKey) as ThemeMode)) || 'system'
    return saved || 'system'
  })(),
  setMode: (mode) => {
    console.log('🎨 Theme setMode called:', mode)
    localStorage.setItem(storageKey, mode)
    set({ mode })
    get().apply(mode)
  },
  cycleMode: () => {
    const order: ThemeMode[] = ['light', 'dark', 'system']
    const current = get().mode
    const next = order[(order.indexOf(current) + 1) % order.length]
    get().setMode(next)
  },
  apply: (modeParam) => {
    const mode = modeParam ?? get().mode
    const useDark = mode === 'dark' || (mode === 'system' && prefersDark())
    console.log('🎨 Theme apply called:', { mode, useDark, htmlHasDark: document.documentElement.classList.contains('dark') })
    setHtmlDarkClass(useDark)
    console.log('🎨 After setHtmlDarkClass:', document.documentElement.classList.contains('dark'))
  },
}))

// Initialize listener for system changes when in system mode
export function initTheme() {
  const store = useThemeStore.getState()
  store.apply()
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (useThemeStore.getState().mode === 'system') {
        useThemeStore.getState().apply('system')
      }
    }
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler)
    else
      (mq as any).addListener?.(handler)
  }
}