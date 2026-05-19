import type { Locale } from '../i18n/types'

const SECRET = 'hire'

export function logConsoleEasterEgg(locale: Locale) {
  const en = [
    '%c hire me ',
    'font-size:18px;font-weight:700;padding:8px 14px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;',
    '\n%cLooking for a frontend developer? Let’s talk → waldemar.vs@yandex.ru',
    'font-size:12px;color:#8b5cf6;',
  ] as const

  const ru = [
    '%c hire me ',
    'font-size:18px;font-weight:700;padding:8px 14px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;',
    '\n%cИщете фронтенд-разработчика? Пишите → waldemar.vs@yandex.ru',
    'font-size:12px;color:#8b5cf6;',
  ] as const

  const msg = locale === 'ru' ? ru : en
  console.log(msg[0], msg[1], msg[2], msg[3])
  const tip =
    locale === 'ru'
      ? '%cПодсказка:%c наберите hire на странице'
      : '%cTip:%c type "hire" on the page'
  console.log(tip, 'font-weight:700;color:#3b82f6;', 'color:inherit;')
}

export function listenForHireMeSecret(onMatch: () => void) {
  let buffer = ''

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (e.key.length !== 1) return

    buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length)
    if (buffer === SECRET) {
      buffer = ''
      onMatch()
    }
  }

  window.addEventListener('keydown', onKeyDown)
  return () => window.removeEventListener('keydown', onKeyDown)
}
