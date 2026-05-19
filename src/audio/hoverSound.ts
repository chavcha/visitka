let ctx: AudioContext | null = null
let lastHoverPlay = 0
let lastClickPlay = 0

const HOVER_GAP_MS = 72
const CLICK_GAP_MS = 48

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
  kind: 'hover' | 'click',
  type: OscillatorType,
  startHz: number,
  endHz: number,
  peakGain: number,
  duration: number,
) {
  const audio = ensureContext()
  if (!audio) return

  const now = performance.now()
  const gap = kind === 'hover' ? HOVER_GAP_MS : CLICK_GAP_MS
  const lastPlay = kind === 'hover' ? lastHoverPlay : lastClickPlay
  if (now - lastPlay < gap) return
  if (kind === 'hover') lastHoverPlay = now
  else lastClickPlay = now

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
