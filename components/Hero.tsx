'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Scroll progress bar
    ScrollTrigger.create({
      trigger: document.body, start: 'top top', end: 'bottom bottom',
      onUpdate: s => {
        const el = document.getElementById('scrollFill')
        if (el) el.style.width = (s.progress * 100).toFixed(2) + '%'
      },
    })

    // Canvas network
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(2, devicePixelRatio || 1)
    let W = 0, H = 0, raf: number
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let nodes: { x:number; y:number; vx:number; vy:number; r:number }[] = []

    function resize() {
      W = canvas.clientWidth  = canvas.parentElement!.clientWidth
      H = canvas.clientHeight = canvas.parentElement!.clientHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(110, Math.round(W * H / 16000))
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
        r: 1 + Math.random() * 1.6,
      }))
    }
    window.addEventListener('resize', resize)
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      m.tx = e.clientX - r.left; m.ty = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMove)
    resize()

    function tick() {
      m.x += (m.tx - m.x) * .08; m.y += (m.ty - m.y) * .08
      ctx.clearRect(0, 0, W, H)
      if (m.x > -1000) {
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 360)
        g.addColorStop(0, 'rgba(29,79,255,0.07)')
        g.addColorStop(1, 'rgba(29,79,255,0)')
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      }
      for (const p of nodes) {
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy)
        if (d < 220 && m.x > -1000) {
          const f = (1 - d / 220) * .5
          p.vx += (dx / d) * f * .04; p.vy += (dy / d) * f * .04
        }
        p.vx *= .985; p.vy *= .985
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10
        ctx.fillStyle = 'rgba(10,14,26,0.55)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 140 * 140) {
            ctx.strokeStyle = `rgba(29,79,255,${(1 - Math.sqrt(d2) / 140) * .35})`
            ctx.lineWidth = .8
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    // Hero text reveal
    gsap.timeline({ delay: 2.3 })
      .to('.ht-word',    { y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1 }, 0)
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .6 }, 0.1)
      .to('.hero-sub',   { opacity: 1, duration: .8 }, 0.7)
      .to('.hero-actions', { opacity: 1, duration: .6 }, 0.9)
      .to('.hero-pills', { opacity: 1, duration: .6 }, 1.0)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: 'var(--cream)', padding: '0 var(--pad-x)', display: 'grid', gridTemplateRows: '1fr auto' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Corner labels */}
      <div className="absolute z-10 pointer-events-none" style={{
        inset: '80px var(--pad-x) 28px',
        fontFamily: 'var(--font-geist-mono)', fontSize: 11, letterSpacing: '.04em',
        color: 'var(--ink-3)', textTransform: 'uppercase',
      }}>
        <div className="absolute top-0 left-0 flex items-center gap-2">
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--blue)', boxShadow:'0 0 0 4px rgba(29,79,255,.15)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
          <span>Available · Summer 2026</span>
        </div>
        <div className="absolute top-0 right-0">Innsbruck · 47.27°N · 11.40°E</div>
        <div className="absolute bottom-0 left-0">01 / 09 — Index</div>
        <div className="absolute bottom-0 right-0 flex items-center gap-2">
          <span>Scroll</span>
          <svg width="10" height="22" viewBox="0 0 10 22"><path d="M5 0 V20 M1 16 L5 20 L9 16" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 self-end pb-[9vh] w-full" style={{ maxWidth: 1480, margin: '0 auto' }}>
        <div className="hero-eyebrow mb-[clamp(28px,4vw,48px)]" style={{ opacity: 0, transform: 'translateY(8px)' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '7px 14px',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 999,
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, letterSpacing: '.04em', color: 'var(--ink-2)',
          }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', marginRight:8, display:'inline-block' }} />
            Application — Gründerszene Summer Internship
          </span>
        </div>

        <h1 style={{ fontWeight:600, fontSize:'clamp(64px,13vw,220px)', lineHeight:.92, letterSpacing:'-.045em', color:'var(--ink)' }}>
          {[['Systems',''], ['thinking,',''], ['in motion.','italic']].map(([word, cls], i) => (
            <span key={i} style={{ display:'block', overflow:'hidden', paddingBottom:'.1em', lineHeight:1 }}>
              <span className="ht-word" style={{
                display:'inline-block', transform:'translateY(110%)',
                color: cls === 'italic' ? 'var(--blue)' : 'var(--ink)',
                fontStyle: cls === 'italic' ? 'italic' : 'normal',
                fontWeight: cls === 'italic' ? 500 : 600,
              }}>{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub" style={{
          marginTop: 'clamp(32px,4vw,48px)', maxWidth: 540,
          fontFamily: 'var(--font-geist)', fontSize: 'clamp(17px,1.15vw,19px)',
          fontWeight: 400, lineHeight: 1.55, color: 'var(--ink-2)', opacity: 0,
        }}>
          I&apos;m <strong style={{ fontWeight:600, color:'var(--ink)' }}>Alicia Frommann</strong> — founder of{' '}
          <a href="#thinktogether" style={{ color:'var(--blue)', borderBottom:'1px solid var(--blue)' }}>ThinkTogether</a>,
          MSc candidate at MCI Innsbruck, and a person who believes the most useful question is rarely the loudest one.
        </p>

        <div className="hero-actions flex gap-2.5 flex-wrap mt-8" style={{ opacity: 0 }}>
          <a href="#thinktogether" style={{
            display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px',
            borderRadius:999, fontSize:14, fontWeight:500,
            background:'var(--ink)', color:'var(--paper)',
            transition:'background .3s,gap .3s',
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--blue)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--ink)'}}>
            <span>See the work</span> <span>→</span>
          </a>
          <a href="#contact" style={{
            display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px',
            borderRadius:999, fontSize:14, fontWeight:500,
            border:'1px solid var(--line-2)', color:'var(--ink)',
            transition:'border-color .3s',
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--ink)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--line-2)'}}>
            <span>Write to me</span>
          </a>
        </div>

        <div className="hero-pills flex flex-wrap gap-2 mt-[clamp(40px,5vw,60px)]" style={{ opacity: 0 }}>
          {['Systems thinking','Causal loop diagrams','Org transformation','DE · EN · FR'].map(p => (
            <span key={p} style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'7px 14px',
              background:'var(--paper)', border:'1px solid var(--line)', borderRadius:999,
              fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-2)', letterSpacing:'.02em',
            }}>
              <i style={{ width:5, height:5, borderRadius:'50%', background:'var(--blue)', display:'inline-block' }} />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
