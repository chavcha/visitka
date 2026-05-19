import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function CursorSpotlight() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const root = document.documentElement
    const onMove = (e: PointerEvent) => {
      root.style.setProperty('--spot-x', `${e.clientX}px`)
      root.style.setProperty('--spot-y', `${e.clientY}px`)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      root.style.removeProperty('--spot-x')
      root.style.removeProperty('--spot-y')
    }
  }, [reduced])

  if (reduced) return null

  return <div className="cursor-spotlight" aria-hidden="true" />
}
