import { useEffect, type RefObject } from 'react'
import { unlockUiAudio } from '../audio/hoverSound'
import { useSound } from '../audio/SoundContext'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function isSoundTarget(target: EventTarget | null, selector: string) {
  if (!(target instanceof Element)) return null
  if (target.closest('.sound-toggle__btn')) return null
  return target.closest(selector)
}

export function useHoverSoundRoot(rootRef: RefObject<HTMLElement | null>) {
  const { enabled, playHover, playClick, soundSelector } = useSound()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled || reducedMotion) return

    const onOver = (event: MouseEvent) => {
      const el = isSoundTarget(event.target, soundSelector)
      if (!el) return

      const from = event.relatedTarget
      if (from instanceof Node && el.contains(from)) return

      playHover()
    }

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return
      void unlockUiAudio()
      if (isSoundTarget(event.target, soundSelector)) playClick()
    }

    root.addEventListener('mouseover', onOver)
    root.addEventListener('click', onClick, true)
    return () => {
      root.removeEventListener('mouseover', onOver)
      root.removeEventListener('click', onClick, true)
    }
  }, [enabled, reducedMotion, playHover, playClick, soundSelector, rootRef])
}
