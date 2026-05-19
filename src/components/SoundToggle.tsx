import { useLocale } from '../i18n/LocaleContext'
import { useSound } from '../audio/SoundContext'

export function SoundToggle() {
  const { enabled, toggleEnabled } = useSound()
  const { t } = useLocale()

  return (
    <button
      type="button"
      className={`sound-toggle__btn${enabled ? ' is-active' : ''}`}
      aria-pressed={enabled}
      aria-label={enabled ? t.a11y.soundOff : t.a11y.soundOn}
      onClick={toggleEnabled}
    >
      <span aria-hidden="true">{enabled ? '♪' : '♫'}</span>
    </button>
  )
}
