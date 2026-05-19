import { useEffect, type RefObject } from 'react'
import { useSound } from '../audio/SoundContext'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useHoverSoundRoot(rootRef: RefObject<HTMLElement | null>) {
  const { enabled, playHover, hoverSelector } = useSound()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled || reducedMotion) return

    const onOver = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('.sound-toggle__btn')) return

      const el = target.closest(hoverSelector)
      if (!el) return

      const from = event.relatedTarget
      if (from instanceof Node && el.contains(from)) return

      playHover()
    }

    root.addEventListener('mouseover', onOver)
    return () => root.removeEventListener('mouseover', onOver)
  }, [enabled, reducedMotion, playHover, hoverSelector, rootRef])
}
