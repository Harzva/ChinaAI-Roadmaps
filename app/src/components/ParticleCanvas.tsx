import { useEffect, useRef, memo } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  phase: number
}

const ParticleCanvas = memo(function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const noise2D = createNoise2D()
    let animationId: number
    let time = 0

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 35 : 90
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        const nx = noise2D(p.x * 0.001 + time, p.phase) * 0.5
        const ny = noise2D(p.y * 0.001 + time, p.phase + 100) * 0.5
        p.vx += nx * 0.02
        p.vy += ny * 0.02
        p.vx *= 0.95
        p.vy *= 0.95
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x += canvas.width
        if (p.x > canvas.width) p.x -= canvas.width
        if (p.y < 0) p.y += canvas.height
        if (p.y > canvas.height) p.y -= canvas.height

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#00F0FF'
        ctx.fill()
      }
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
})

export default ParticleCanvas
