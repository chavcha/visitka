let ctx: AudioContext | null = null
let lastPlay = 0

const MIN_GAP_MS = 72

export function unlockHoverAudio() {
  if (typeof window === 'undefined') return
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
}

export function playHoverSound() {
  if (typeof window === 'undefined') return

  const now = performance.now()
  if (now - lastPlay < MIN_GAP_MS) return
  lastPlay = now

  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') {
    void ctx.resume()
    return
  }

  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1040, t)
  osc.frequency.exponentialRampToValueAtTime(720, t + 0.035)

  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.028, t + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.06)
}
