import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function pagesBase(): string {
  const repo = process.env.GITHUB_REPOSITORY
  if (!repo) return '/'

  const repoName = repo.split('/')[1]
  if (!repoName || repoName.endsWith('.github.io')) return '/'

  return `/${repoName}/`
}

// https://vite.dev/config/
export default defineConfig({
  base: pagesBase(),
  plugins: [react()],
})
