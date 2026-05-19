import { useLocale } from '../i18n/LocaleContext'
import { useTheme } from '../theme/ThemeContext'
import type { Accent, ThemeMode } from '../theme/types'

const MODES: { id: ThemeMode; icon: string }[] = [
  { id: 'dark', icon: '◐' },
  { id: 'light', icon: '◯' },
]

const ACCENTS: { id: Accent; color: string }[] = [
  { id: 'blue', color: '#3b82f6' },
  { id: 'violet', color: '#8b5cf6' },
  { id: 'emerald', color: '#10b981' },
]

export function ThemeToggle() {
  const { mode, accent, setMode, setAccent } = useTheme()
  const { t } = useLocale()

  return (
    <div className="theme-controls">
      <div className="theme-switch" role="group" aria-label={t.a11y.theme}>
        {MODES.map(({ id, icon }) => (
          <button
            key={id}
            type="button"
            className={`theme-switch__btn${mode === id ? ' is-active' : ''}`}
            aria-pressed={mode === id}
            aria-label={id === 'dark' ? t.a11y.darkMode : t.a11y.lightMode}
            onClick={() => setMode(id)}
          >
            <span aria-hidden="true">{icon}</span>
          </button>
        ))}
      </div>
      <div className="accent-switch" role="group" aria-label={t.a11y.accent}>
        {ACCENTS.map(({ id, color }) => (
          <button
            key={id}
            type="button"
            className={`accent-switch__btn${accent === id ? ' is-active' : ''}`}
            aria-pressed={accent === id}
            aria-label={
              id === 'blue'
                ? t.a11y.accentBlue
                : id === 'violet'
                  ? t.a11y.accentViolet
                  : t.a11y.accentEmerald
            }
            onClick={() => setAccent(id)}
          >
            <span className="accent-switch__dot" style={{ background: color }} />
          </button>
        ))}
      </div>
    </div>
  )
}
