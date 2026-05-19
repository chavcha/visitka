import { useLocale } from '../i18n/LocaleContext'
import type { Locale } from '../i18n/types'

const LOCALES: { id: Locale; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'RU' },
]

export function LocaleToggle() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="locale-switch" role="group" aria-label={t.a11y.language}>
      {LOCALES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`locale-switch__btn${locale === id ? ' is-active' : ''}`}
          aria-pressed={locale === id}
          onClick={() => setLocale(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
