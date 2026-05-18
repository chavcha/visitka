# Визитка — Владимир Сидоров

Одностраничный сайт-резюме (React + TypeScript + Vite).

**После деплоя:** `https://chavcha.github.io/visitka/` (если репозиторий называется `visitka`).

## Локально

```bash
npm install
npm run dev
```

## Деплой на GitHub Pages (один раз)

1. Войти в GitHub CLI (откроется браузер):

   ```bash
   gh auth login
   ```

   Выберите: GitHub.com → HTTPS → Login with a web browser.

2. Создать репозиторий и отправить код:

   ```bash
   cd d:\visitka
   gh repo create visitka --public --source=. --remote=origin --push
   ```

   Если репозиторий `visitka` уже есть на GitHub:

   ```bash
   git remote add origin https://github.com/chavcha/visitka.git
   git push -u origin main
   ```

3. Включить Pages: **Settings → Pages → Build and deployment → Source: GitHub Actions** (не «Deploy from a branch» — иначе workflow упадёт с 404).

4. Дождаться зелёной галочки у workflow **Deploy to GitHub Pages** (вкладка Actions).

Дальше каждый `git push` в `main` автоматически обновляет сайт.
