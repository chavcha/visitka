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

## Быстрый старт

```bash
git clone https://github.com/chavcha/visitka.git
cd visitka
npm ci
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173).

### Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | dev-сервер |
| `npm run build` | production-сборка в `dist/` |
| `npm run preview` | просмотр сборки |
| `npm run lint` | ESLint |

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

## Деплой

При push в ветку `main` срабатывает [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

`base` для GitHub Pages задаётся в [`vite.config.ts`](vite.config.ts) из `GITHUB_REPOSITORY` (для репозитория `visitka` это `/visitka/`).

Ручной запуск: **Actions → Deploy to GitHub Pages → Run workflow**.

---

## Контакты

- **Email:** waldemar.vs@yandex.ru
- **Telegram:** [@camefromwayabove](https://t.me/camefromwayabove)
- **GitHub:** [@chavcha](https://github.com/chavcha)

---

## License

MIT — свободно использовать код в учебных и личных целях; для коммерческого копирования дизайна лучше связаться напрямую.
