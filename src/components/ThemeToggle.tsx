import { useThemeStore, type ThemeMode } from '../store/useThemeStore'

const OPTIONS: { id: ThemeMode; icon: string; label: string }[] = [
  { id: 'light', icon: '☀️', label: 'Light' },
  { id: 'auto', icon: '🖥️', label: 'Auto' },
  { id: 'dark', icon: '🌙', label: 'Dark' },
]

export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode)
  const setMode = useThemeStore((s) => s.setMode)

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-ink-200 bg-ink-100 p-0.5">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => setMode(o.id)}
          title={`${o.label} theme`}
          aria-pressed={mode === o.id}
          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-colors ${
            mode === o.id ? 'bg-surface shadow-sm ring-1 ring-ink-300' : 'opacity-60 hover:opacity-100'
          }`}
        >
          {o.icon}
        </button>
      ))}
    </div>
  )
}
