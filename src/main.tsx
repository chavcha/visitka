import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LocaleProvider } from './i18n/LocaleContext.tsx'
import { SoundProvider } from './audio/SoundContext.tsx'
import { ThemeProvider } from './theme/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
