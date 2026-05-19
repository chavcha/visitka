type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  w: number
  h: number
  rot: number
  vr: number
}

function themeColors(): string[] {
  const style = getComputedStyle(document.documentElement)
  const accent = style.getPropertyValue('--accent').trim()
  const accent2 = style.getPropertyValue('--accent-2').trim()
  return [accent, accent2, '#f59e0b', '#f472b6', '#e2e8f0'].filter(Boolean)
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.floor(window.innerWidth * dpr)
  canvas.height = Math.floor(window.innerHeight * dpr)
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return dpr
}

export function fireConfetti(originX = 0.5, originY = 0.5) {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:9999'
  document.body.appendChild(canvas)

  resizeCanvas(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }

  const colors = themeColors()
  const w = window.innerWidth
  const h = window.innerHeight
  const ox = originX * w
  const oy = originY * h
  const particles: Particle[] = []

  for (let i = 0; i < 80; i++) {
    const angle = (Math.random() * Math.PI * 2)
    const speed = 5 + Math.random() * 9
    particles.push({
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 7,
      color: colors[i % colors.length] ?? '#3b82f6',
      w: 5 + Math.random() * 5,
      h: 3 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
    })
  }

  let frame = 0
  const maxFrames = 95

  const onResize = () => resizeCanvas(canvas)
  window.addEventListener('resize', onResize)

  const tick = () => {
    ctx.clearRect(0, 0, w, h)

    for (const p of particles) {
      p.vy += 0.24
      p.vx *= 0.985
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }

    frame += 1
    if (frame < maxFrames) {
      requestAnimationFrame(tick)
      return
    }

    window.removeEventListener('resize', onResize)
    canvas.remove()
  }

  requestAnimationFrame(tick)
}
