'use client'

import { useEffect, useRef } from 'react'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf: number
    let mx = window.innerWidth / 2, my = window.innerHeight / 2

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 38
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  Math.random() * 1.8 + 0.7,
      ph: Math.random() * Math.PI * 2,
    }))

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.ph += 0.018
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy
        if (d2 < 18000) { const f = 0.52; p.vx += dx / d2 * f; p.vy += dy / d2 * f }
      })

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 210) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(107,158,94,${(1 - d / 210) * 0.11})`
            ctx.lineWidth = 0.75
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      pts.forEach(p => {
        const pulse = (Math.sin(p.ph) + 1) / 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(107,158,94,${0.13 + pulse * 0.34})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 px-16 max-w-[1000px]">
        <div
          className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6B9E5E] mb-9"
          style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}
        >
          Founder · Systems Thinker · MSc Candidate · Innsbruck
        </div>

        <h1
          className="font-cormorant font-light leading-[0.88] tracking-[-0.025em] mb-10"
          style={{ fontSize: 'clamp(70px,9.5vw,140px)', animation: 'fadeUp 1s ease 0.5s both' }}
        >
          Alicia<br />
          <em className="text-[#857E74]">Frommann</em>
        </h1>

        <p
          className="font-cormorant font-light italic text-[#857E74] mb-12 max-w-[560px] leading-[1.55]"
          style={{ fontSize: 'clamp(17px,2.2vw,26px)', animation: 'fadeUp 0.8s ease 0.8s both' }}
        >
          Building tools and thinking that help people see{' '}
          <strong className="text-[#F0EAE0] not-italic font-normal">the system beneath the surface.</strong>
        </p>

        <div className="flex gap-3.5 flex-wrap" style={{ animation: 'fadeUp 0.8s ease 1s both' }}>
          <MagneticButton href="#thinktogether" variant="primary">ThinkTogether ↗</MagneticButton>
          <MagneticButton href="#podcast"       variant="secondary">Podcast</MagneticButton>
          <MagneticButton href="#cta"           variant="secondary">Get in touch</MagneticButton>
        </div>
      </div>

      <div
        className="absolute bottom-11 right-16 flex items-center gap-3.5"
        style={{ animation: 'fadeIn 1s ease 1.6s both' }}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#3A3935]">Scroll</span>
        <div className="w-14 h-px bg-[#3A3935] relative overflow-hidden">
          <span
            className="absolute inset-0 bg-[#857E74]"
            style={{ animation: 'slideLine 2s ease 1.8s infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
