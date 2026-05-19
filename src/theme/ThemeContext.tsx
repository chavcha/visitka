import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Accent, ThemeMode } from './types'

const MODE_KEY = 'visitka-theme'
const ACCENT_KEY = 'visitka-accent'

type ThemeContextValue = {
  mode: ThemeMode
  accent: Accent
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: Accent) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(MODE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore */
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light'
  }
  return 'dark'
}

function readAccent(): Accent {
  try {
    const saved = localStorage.getItem(ACCENT_KEY)
    if (saved === 'blue' || saved === 'violet' || saved === 'emerald') return saved
  } catch {
    /* ignore */
  }
  return 'blue'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readMode)
  const [accent, setAccentState] = useState<Accent>(readAccent)

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    try {
      localStorage.setItem(MODE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next)
    try {
      localStorage.setItem(ACCENT_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = mode
    root.dataset.accent = accent
    root.style.colorScheme = mode
  }, [mode, accent])

  const value = useMemo(
    () => ({ mode, accent, setMode, setAccent }),
    [mode, accent, setMode, setAccent],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
