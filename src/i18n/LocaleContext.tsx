import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations } from './translations'
import type { Copy, Locale } from './types'

const STORAGE_KEY = 'visitka-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Copy
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ru') return saved
  } catch {
    /* ignore */
  }
  return typeof navigator !== 'undefined' &&
    navigator.language.toLowerCase().startsWith('ru')
    ? 'ru'
    : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const t = translations[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title

    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t.meta.description)
  }, [locale, t.meta.description, t.meta.title])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
