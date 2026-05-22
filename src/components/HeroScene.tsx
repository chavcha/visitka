import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useTheme } from '../theme/ThemeContext'
import { importWithTimeout } from '../utils/importWithTimeout'
import type { Accent } from '../theme/types'

const ACCENT_HEX: Record<Accent, number> = {
  blue: 0x3b82f6,
  violet: 0x8b5cf6,
  emerald: 0x10b981,
}

type HeroSceneProps = {
  ready: boolean
}

export function HeroScene({ ready }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { mode, accent } = useTheme()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setActive(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let frame = 0

    const boot = async () => {
      let THREE: typeof import('three')
      try {
        THREE = await importWithTimeout(() => import('three'), 12_000)
      } catch {
        return
      }

      if (disposed || !canvasRef.current) return

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
      camera.position.z = 5.2

      const isLight = mode === 'light'
      const accentColor = new THREE.Color(ACCENT_HEX[accent])
      const particleColor = accentColor.clone().lerp(
        new THREE.Color(isLight ? 0x111118 : 0xffffff),
        isLight ? 0.35 : 0.55,
      )

      const count = window.innerWidth < 768 ? 900 : 1600
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i += 1) {
        const radius = 2.2 + Math.random() * 2.8
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const points = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color: particleColor,
          size: window.innerWidth < 768 ? 0.028 : 0.022,
          transparent: true,
          opacity: isLight ? 0.55 : 0.75,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      scene.add(points)

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.05, 1),
        new THREE.MeshBasicMaterial({
          color: accentColor,
          wireframe: true,
          transparent: true,
          opacity: isLight ? 0.35 : 0.5,
        }),
      )
      scene.add(core)

      const glow = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.35, 0),
        new THREE.MeshBasicMaterial({
          color: accentColor,
          wireframe: true,
          transparent: true,
          opacity: isLight ? 0.12 : 0.18,
        }),
      )
      scene.add(glow)

      const resize = () => {
        const parent = canvas.parentElement
        if (!parent) return
        const w = parent.clientWidth
        const h = parent.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }

      resize()
      window.addEventListener('resize', resize)
      setActive(true)

      const pointer = { x: 0, y: 0 }
      const onPointerMove = () => {
        const px = Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--pointer-x') || '0',
        )
        const py = Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--pointer-y') || '0',
        )
        pointer.x = px
        pointer.y = py
      }
      window.addEventListener('pointermove', onPointerMove, { passive: true })

      const animate = () => {
        if (disposed) return
        frame = requestAnimationFrame(animate)

        const t = performance.now() * 0.00025
        core.rotation.x = t * 1.4 + pointer.y * 0.35
        core.rotation.y = t * 1.8 + pointer.x * 0.45
        glow.rotation.x = -t * 0.9
        glow.rotation.y = t * 1.1
        points.rotation.y = t * 0.35

        camera.position.x = pointer.x * 0.45
        camera.position.y = -pointer.y * 0.3
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onPointerMove)
        cancelAnimationFrame(frame)
        geometry.dispose()
        points.material.dispose()
        core.geometry.dispose()
        ;(core.material as import('three').Material).dispose()
        glow.geometry.dispose()
        ;(glow.material as import('three').Material).dispose()
        renderer.dispose()
      }
    }

    let cleanupScene: (() => void) | undefined

    boot().then((cleanup) => {
      cleanupScene = cleanup
    })

    return () => {
      disposed = true
      setActive(false)
      cleanupScene?.()
    }
  }, [accent, mode, reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className={`hero__canvas${ready && active ? ' hero__canvas--ready' : ''}`}
      aria-hidden="true"
    />
  )
}
