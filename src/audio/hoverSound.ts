let ctx: AudioContext | null = null
let lastHoverPlay = 0
let lastClickPlay = 0
let lastTerminalPlay = 0

const HOVER_GAP_MS = 72
const CLICK_GAP_MS = 48
const TERMINAL_GAP_MS = 30

export type TerminalSound = 'key' | 'backspace' | 'enter'

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') {
    void ctx.resume()
    return null
  }
  return ctx
}

export function unlockHoverAudio() {
  if (typeof window === 'undefined') return
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
}

function playTone(
  kind: 'hover' | 'click' | 'terminal',
  type: OscillatorType,
  startHz: number,
  endHz: number,
  peakGain: number,
  duration: number,
  gapMs?: number,
) {
  const audio = ensureContext()
  if (!audio) return

  const now = performance.now()
  const gap =
    gapMs ??
    (kind === 'hover'
      ? HOVER_GAP_MS
      : kind === 'click'
        ? CLICK_GAP_MS
        : TERMINAL_GAP_MS)
  const lastPlay =
    kind === 'hover'
      ? lastHoverPlay
      : kind === 'click'
        ? lastClickPlay
        : lastTerminalPlay
  if (now - lastPlay < gap) return
  if (kind === 'hover') lastHoverPlay = now
  else if (kind === 'click') lastClickPlay = now
  else lastTerminalPlay = now

  const t = audio.currentTime
  const osc = audio.createOscillator()
  const gain = audio.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(startHz, t)
  osc.frequency.exponentialRampToValueAtTime(endHz, t + duration * 0.55)

  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(peakGain, t + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)

  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(t)
  osc.stop(t + duration + 0.01)
}

export function playHoverSound() {
  playTone('hover', 'triangle', 1040, 720, 0.028, 0.06)
}

export function playClickSound() {
  playTone('click', 'sine', 620, 420, 0.038, 0.045)
}

export function playTerminalSound(variant: TerminalSound) {
  if (variant === 'backspace') {
    playTone('terminal', 'square', 880, 620, 0.016, 0.03, 24)
    return
  }
  if (variant === 'enter') {
    playTone('terminal', 'sine', 520, 780, 0.03, 0.055, 0)
    return
  }
  playTone('terminal', 'sine', 1320, 1080, 0.014, 0.022, 24)
}
