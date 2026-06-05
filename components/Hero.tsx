'use client'

import { useEffect, useRef } from 'react'
import MagneticButton from './MagneticButton'

// Canvas colors — Moosgrün + Amber, matching CLDDiagram palette
const GREEN = '107,158,94'  // #6B9E5E
const AMBER = '200,131,74'  // #C8834A

// Connection thresholds
const LINK_DIST   = 200   // node–node line
const CURSOR_DIST = 160   // cursor–node line (subtle, higher alpha than node lines)

type Pt = { x: number; y: number; vx: number; vy: number; r: number; ph: number; col: string }

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    // ── Accessibility: prefers-reduced-motion ────────────────────────────────
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── DPR-aware sizing ─────────────────────────────────────────────────────
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0

    const setSize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      canvas.style.width  = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    // ── Throttled resize ─────────────────────────────────────────────────────
    let resizeTimer = 0
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(setSize, 120) }
    window.addEventListener('resize', onResize)

    // ── Particle system ──────────────────────────────────────────────────────
    // 70 % Moosgrün, 30 % Amber — index-shuffled for spatial mixing
    const N = W < 768 ? 25 : 50
    const pts: Pt[] = Array.from({ length: N }, (_, i) => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      vx:  (Math.random() - 0.5) * 0.38,
      vy:  (Math.random() - 0.5) * 0.38,
      r:   Math.random() * 1.6 + 0.8,
      ph:  Math.random() * Math.PI * 2,
      col: i < Math.round(N * 0.7) ? GREEN : AMBER,
    }))

    // ── Mouse — starts off-screen so cursor lines only appear after first move
    let mx = -9999, my = -9999
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    // ── Visibility: pause rAF when tab is hidden ──────────────────────────────
    let paused = false
    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    // ── Frame ────────────────────────────────────────────────────────────────
    const drawFrame = () => {
      ctx.clearRect(0, 0, W, H)

      // Drift
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.ph += 0.016
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })

      // Node–node connection lines
      // Readability note: lines are intentionally low-alpha (max 0.09) so they
      // never compete with the hero text — WCAG contrast is on the text, not here.
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${pts[i].col},${(1 - d / LINK_DIST) * 0.09})`
            ctx.lineWidth = 0.7
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      // Cursor → node lines (subtle: appear only when cursor is in viewport)
      // Max alpha 0.18 — more visible than node–node lines but still quiet.
      if (mx > 0) {
        pts.forEach(p => {
          const dx = p.x - mx, dy = p.y - my
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CURSOR_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${p.col},${(1 - d / CURSOR_DIST) * 0.18})`
            ctx.lineWidth = 0.65
            ctx.moveTo(mx, my)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        })
      }

      // Nodes — pulsing alpha, very low to let text breathe
      pts.forEach(p => {
        const pulse = (Math.sin(p.ph) + 1) / 2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.col},${0.14 + pulse * 0.28})`
        ctx.fill()
      })
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    let raf = 0

    if (prefersReduced) {
      // Single static frame — no motion for vestibular disorders
      drawFrame()
    } else {
      const loop = () => {
        if (!paused) drawFrame()
        raf = requestAnimationFrame(loop)
      }
      loop()
    }

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimeout(resizeTimer)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Canvas: z=0, pointer-events none — sits behind z-10 content, never blocks clicks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      />

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
