import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  playClickSound,
  playHoverSound,
  playTerminalSound,
  unlockHoverAudio,
  type TerminalSound,
} from './hoverSound'

const STORAGE_KEY = 'visitka-sound'

export const UI_SOUND_SELECTOR = [
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
  playClick: () => void
  playTerminal: (variant: TerminalSound) => void
  soundSelector: string
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
      playClickSound()
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
        playClickSound()
      }
      return next
    })
  }, [])

  const playHover = useCallback(() => {
    if (!enabled) return
    playHoverSound()
  }, [enabled])

  const playClick = useCallback(() => {
    if (!enabled) return
    playClickSound()
  }, [enabled])

  const playTerminal = useCallback(
    (variant: TerminalSound) => {
      if (!enabled) return
      playTerminalSound(variant)
    },
    [enabled],
  )

  const value = useMemo(
    () => ({
      enabled,
      setEnabled,
      toggleEnabled,
      playHover,
      playClick,
      playTerminal,
      soundSelector: UI_SOUND_SELECTOR,
    }),
    [enabled, setEnabled, toggleEnabled, playHover, playClick, playTerminal],
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
