import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { playHoverSound, unlockHoverAudio } from './hoverSound'

const STORAGE_KEY = 'visitka-sound'

const HOVER_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  '.btn',
  '.skill-card',
  '.timeline__card[role="button"]',
  '.locale-switch__btn',
  '.theme-switch__btn',
  '.accent-switch__btn',
].join(', ')

type SoundContextValue = {
  enabled: boolean
  setEnabled: (next: boolean) => void
  toggleEnabled: () => void
  playHover: () => void
  hoverSelector: string
}

const SoundContext = createContext<SoundContextValue | null>(null)

function readEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(readEnabled)

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      /* ignore */
    }
    if (next) {
      unlockHoverAudio()
      playHoverSound()
    }
  }, [])

  const toggleEnabled = useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      if (next) {
        unlockHoverAudio()
        playHoverSound()
      }
      return next
    })
  }, [])

  const playHover = useCallback(() => {
    if (!enabled) return
    playHoverSound()
  }, [enabled])

  const value = useMemo(
    () => ({
      enabled,
      setEnabled,
      toggleEnabled,
      playHover,
      hoverSelector: HOVER_SELECTOR,
    }),
    [enabled, setEnabled, toggleEnabled, playHover],
  )

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}
