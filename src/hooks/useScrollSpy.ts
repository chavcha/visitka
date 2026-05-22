import { useEffect, useState } from 'react'

const SCROLL_OFFSET = 120

function sectionTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY
}

export function useScrollSpy(sectionIds: readonly string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const pickActive = () => {
      const position = window.scrollY + SCROLL_OFFSET
      let current = sectionIds[0] ?? ''

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (sectionTop(el) <= position) current = id
      }

      setActive(current)
    }

    pickActive()
    window.addEventListener('scroll', pickActive, { passive: true })
    window.addEventListener('resize', pickActive)
    window.addEventListener('hashchange', pickActive)

    return () => {
      window.removeEventListener('scroll', pickActive)
      window.removeEventListener('resize', pickActive)
      window.removeEventListener('hashchange', pickActive)
    }
  }, [sectionIds])

  return active
}
