import { Moon, Sun, Laptop } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeToggle() {
  const { mode, cycleMode, setMode } = useThemeStore()

  const icon = mode === 'dark' ? (
    <Moon className="h-4 w-4" />
  ) : mode === 'light' ? (
    <Sun className="h-4 w-4" />
  ) : (
    <Laptop className="h-4 w-4" />
  )

  const label = mode === 'dark' ? 'Dark' : mode === 'light' ? 'Light' : 'System'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Toggle theme"
        title={`Theme: ${label} (click to cycle)`}
        onClick={cycleMode}
        className="inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </button>
      <button
        type="button"
        onClick={() => setMode('system')}
        className="hidden"
        aria-hidden
      />
    </div>
  )
}
