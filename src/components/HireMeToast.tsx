import { useEffect } from 'react'
import { useLocale } from '../i18n/LocaleContext'

type HireMeToastProps = {
  visible: boolean
  onClose: () => void
}

export function HireMeToast({ visible, onClose }: HireMeToastProps) {
  const { t } = useLocale()

  useEffect(() => {
    if (!visible) return
    const id = window.setTimeout(onClose, 4200)
    return () => window.clearTimeout(id)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="hire-toast" role="status" aria-live="polite">
      <p className="hire-toast__title">{t.easterEgg.title}</p>
      <p className="hire-toast__text">{t.easterEgg.text}</p>
      <a className="hire-toast__link" href="mailto:waldemar.vs@yandex.ru">
        waldemar.vs@yandex.ru
      </a>
    </div>
  )
}
