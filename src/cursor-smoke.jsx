import { useEffect, useRef } from 'react'

export function CursorSmoke() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const preference = window.matchMedia('(any-pointer: fine) and (prefers-reduced-motion: no-preference)')
    const puff = document.createElement('canvas')
    puff.width = puff.height = 96
    const texture = puff.getContext('2d')
    if (!texture) return

    const lime = getComputedStyle(document.documentElement).getPropertyValue('--lime').trim()
    const gradient = texture.createRadialGradient(48, 48, 0, 48, 48, 48)
    gradient.addColorStop(0, lime || '#c8f000')
    gradient.addColorStop(0.3, '#b9ef0088')
    gradient.addColorStop(0.7, '#83b90030')
    gradient.addColorStop(1, '#83b90000')
    texture.fillStyle = gradient
    texture.fillRect(0, 0, 96, 96)

    const particles = []
    const lifetime = 900
    let frame = 0
    let previous

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.globalCompositeOperation = 'screen'
      previous = undefined
    }

    function draw(now) {
      frame = 0
      context.clearRect(0, 0, canvas.width, canvas.height)
      while (particles.length && now - particles[0].born >= lifetime) particles.shift()

      for (const particle of particles) {
        const age = Math.max(0, (now - particle.born) / lifetime)
        const spread = age ** 0.8
        const size = particle.size + spread * particle.expansion
        const curl = Math.sin(age * 5 + particle.phase) - Math.sin(particle.phase)
        const x = particle.x + particle.drift * spread + curl * age * 15
        const y = particle.y - particle.lift * spread
        context.globalAlpha = 0.18 * (1 - age) ** 1.8
        context.drawImage(puff, x - size / 2, y - size * 0.38, size, size * 0.76)
        context.globalAlpha *= 0.45
        context.drawImage(puff, x - size * 0.2 + curl * 8, y - size * 0.52, size * 0.66, size * 0.82)
      }
      if (particles.length) frame = requestAnimationFrame(draw)
    }

    function move(event) {
      if (!preference.matches || event.pointerType !== 'mouse') return
      const point = { x: event.clientX, y: event.clientY }
      const start = previous ?? point
      const distance = Math.hypot(point.x - start.x, point.y - start.y)
      if (previous && distance < 5) return

      // Break the trail after large jumps, such as re-entering the window.
      const origin = distance > 180 ? point : start
      const count = Math.max(1, Math.min(12, Math.ceil(distance / 8)))
      const born = performance.now()
      for (let index = 1; index <= count; index += 1) {
        const step = index / count
        particles.push({
          x: origin.x + (point.x - origin.x) * step + (Math.random() - 0.5) * 8,
          y: origin.y + (point.y - origin.y) * step + (Math.random() - 0.5) * 8,
          born,
          size: 22 + Math.random() * 20,
          expansion: 52 + Math.random() * 26,
          drift: (Math.random() - 0.5) * 76,
          lift: 28 + Math.random() * 16,
          phase: Math.random() * 2 * Math.PI,
        })
      }
      if (particles.length > 110) particles.splice(0, particles.length - 110)
      previous = point
      if (!frame) frame = requestAnimationFrame(draw)
    }

    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      particles.length = 0
      previous = undefined
      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    function syncPreference() {
      reset()
      if (preference.matches) resize()
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', reset)
    window.addEventListener('resize', syncPreference)
    preference.addEventListener('change', syncPreference)
    syncPreference()
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', reset)
      window.removeEventListener('resize', syncPreference)
      preference.removeEventListener('change', syncPreference)
      reset()
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-smoke" aria-hidden="true" />
}
