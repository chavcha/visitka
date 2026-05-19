import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const WORDS = ['React', 'Vue', 'RN'] as const

const TYPE_MS = 85
const DELETE_MS = 55
const PAUSE_MS = 2200

export function TypingRotator() {
  const reduced = usePrefersReducedMotion()
  const [text, setText] = useState<string>(WORDS[0])
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (reduced) return

    const cursorTimer = window.setInterval(() => {
      setShowCursor((v) => !v)
    }, 530)

    return () => window.clearInterval(cursorTimer)
  }, [reduced])

  useEffect(() => {
    if (reduced) {
      setText(WORDS[0])
      return
    }

    let wordIndex = 0
    let charIndex = WORDS[0].length
    let deleting = false
    let timer = 0

    const tick = () => {
      const word = WORDS[wordIndex]

      if (!deleting) {
        charIndex += 1
        setText(word.slice(0, charIndex))
        if (charIndex >= word.length) {
          deleting = true
          timer = window.setTimeout(tick, PAUSE_MS)
          return
        }
        timer = window.setTimeout(tick, TYPE_MS)
        return
      }

      charIndex -= 1
      setText(word.slice(0, charIndex))
      if (charIndex <= 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % WORDS.length
        timer = window.setTimeout(tick, TYPE_MS)
        return
      }
      timer = window.setTimeout(tick, DELETE_MS)
    }

    timer = window.setTimeout(tick, PAUSE_MS)

    return () => window.clearTimeout(timer)
  }, [reduced])

  return (
    <p className="hero__rotator" aria-live="polite">
      <span className="hero__rotator-word text-gradient">{text}</span>
      <span
        className={`hero__rotator-cursor${showCursor ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        |
      </span>
    </p>
  )
}
