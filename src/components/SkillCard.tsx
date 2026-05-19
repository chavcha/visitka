import { useRef, type PointerEvent } from 'react'
import { Reveal } from './Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type SkillCardProps = {
  name: string
  size: 'lg' | 'md' | 'sm'
  delay: number
}

export function SkillCard({ name, size, delay }: SkillCardProps) {
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced) return
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-x', `${-y * 10}deg`)
    el.style.setProperty('--tilt-y', `${x * 10}deg`)
    el.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`)
  }

  const onPointerLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Reveal
      delay={delay}
      className={`bento__item bento__item--${size} skill-card`}
    >
      <div
        ref={cardRef}
        className="skill-card__inner"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <span>{name}</span>
        <span className="skill-card__glare" aria-hidden="true" />
      </div>
    </Reveal>
  )
}
