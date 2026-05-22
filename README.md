# visitka — портфолио Владимира Сидорова

[![Deploy](https://github.com/chavcha/visitka/actions/workflows/deploy.yml/badge.svg)](https://github.com/chavcha/visitka/actions/workflows/deploy.yml)

Личный сайт-визитка frontend-разработчика: интерактивный hero, терминал, переключение языка и темы, звуки интерфейса.

**Сайт:** [chavcha.github.io/visitka](https://chavcha.github.io/visitka/)

---

## Возможности

- **EN / RU** — переключатель языка, строки в `src/i18n/`
- **Темы** — светлая / тёмная, акценты blue · violet · emerald
- **Hero** — Three.js-сцена (lazy), typing-эффект (React · Vue · RN), parallax
- **Интерактив** — magnetic-кнопки, scroll-spy, count-up, 3D skill cards, timeline
- **Терминал** — команды `help`, `skills`, `contact`, `github`, `clear`
- **Звуки UI** — hover / click / набор в терминале (опционально, ♪ в шапке)
- **Easter egg** — в консоли или ввод `hire` → toast
- **Confetti** — по клику на «Обсудить проект»
- **Производительность** — code-splitting (react / three), prefetch GitHub, async fonts

---

## Стек

| | |
|---|---|
| UI | React 19, TypeScript |
| Сборка | Vite 8 |
| 3D | Three.js |
| Стили | CSS (custom properties, без UI-фреймворка) |
| Деплой | GitHub Actions → GitHub Pages |

---

## Структура проекта

```
src/
  components/   # UI (HeroScene, CodeTerminal, SkillCard, …)
  i18n/         # переводы EN/RU
  theme/        # тема и акценты
  audio/        # Web Audio (hover, click, terminal)
  features/     # easter egg
  hooks/        # scroll-spy, parallax, звуки
  utils/        # confetti, prefetch
```

---

## Контакты

- **Email:** waldemar.vs@yandex.ru
- **Telegram:** [@camefromwayabove](https://t.me/camefromwayabove)
- **GitHub:** [@chavcha](https://github.com/chavcha)

---

## License

MIT — свободно использовать код в учебных и личных целях; для коммерческого копирования дизайна лучше связаться напрямую.
