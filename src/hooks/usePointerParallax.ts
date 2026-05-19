import { useEffect } from 'react'

export function usePointerParallax(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      root.style.setProperty('--pointer-x', String(x))
      root.style.setProperty('--pointer-y', String(y))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      root.style.removeProperty('--pointer-x')
      root.style.removeProperty('--pointer-y')
    }
  }, [enabled])
}
