'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Scroll progress bar
    ScrollTrigger.create({
      trigger: document.body, start: 'top top', end: 'bottom bottom',
      onUpdate: s => {
        const el = document.getElementById('scrollFill')
        if (el) el.style.width = (s.progress * 100).toFixed(2) + '%'
      },
    })

    // Reveal lines in this section
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-line > span').forEach(el => {
        gsap.fromTo(el, { y: '110%' }, {
          y: 0, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, sectionRef)

    // Canvas — extract to typed const so TS narrowing holds inside nested functions
    if (!canvasRef.current) return
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx2 = canvas.getContext('2d')!
    const dpr = Math.min(2, devicePixelRatio || 1)
    let W = 0, H = 0, raf: number
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let nodes: { x:number; y:number; vx:number; vy:number; r:number }[] = []

    function resize() {
      W = canvas.parentElement!.clientWidth
      H = canvas.parentElement!.clientHeight
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(110, Math.round(W * H / 15000))
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
        r: .8 + Math.random() * 1.5,
      }))
    }
    window.addEventListener('resize', resize)
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      m.tx = e.clientX - r.left; m.ty = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMove)
    resize()

    function draw() {
      m.x += (m.tx - m.x) * .07; m.y += (m.ty - m.y) * .07
      ctx2.clearRect(0, 0, W, H)
      // cursor bloom
      if (m.x > -1000) {
        const g = ctx2.createRadialGradient(m.x, m.y, 0, m.x, m.y, 340)
        g.addColorStop(0, 'rgba(29,79,255,0.06)')
        g.addColorStop(1, 'rgba(29,79,255,0)')
        ctx2.fillStyle = g; ctx2.fillRect(0, 0, W, H)
      }
      for (const p of nodes) {
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy)
        if (d < 240 && m.x > -1000) {
          const f = (1 - d / 240) * .4
          p.vx += (dx / d) * f * .04; p.vy += (dy / d) * f * .04
        }
        p.vx *= .988; p.vy *= .988
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = W+10; if (p.x > W+10) p.x = -10
        if (p.y < -10) p.y = H+10; if (p.y > H+10) p.y = -10
        ctx2.fillStyle = 'rgba(10,14,26,0.45)'
        ctx2.beginPath(); ctx2.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx2.fill()
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const d2 = (a.x-b.x)**2 + (a.y-b.y)**2
          if (d2 < 130*130) {
            const op = (1 - Math.sqrt(d2)/130) * .28
            ctx2.strokeStyle = `rgba(29,79,255,${op})`
            ctx2.lineWidth = .7
            ctx2.beginPath(); ctx2.moveTo(a.x,a.y); ctx2.lineTo(b.x,b.y); ctx2.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    // Text reveal after loader
    gsap.timeline({ delay: 2.3 })
      .to('.ht-word',      { y:0, duration:1.2, ease:'expo.out', stagger:0.1 }, 0)
      .to('.hero-eyebrow', { opacity:1, y:0, duration:.7 }, 0.05)
      .to('.hero-sub',     { opacity:1, y:0, duration:.9 }, 0.6)
      .to('.hero-actions', { opacity:1, y:0, duration:.7 }, 0.85)
      .to('.hero-pills',   { opacity:1, y:0, duration:.7 }, 1.0)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="hero" style={{ position:'relative', minHeight:'100vh', overflow:'hidden', background:'var(--cream)', padding:'0 var(--pad-x)', display:'grid', gridTemplateRows:'1fr auto' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} />

      {/* Corner labels */}
      <div style={{ position:'absolute', inset:'80px var(--pad-x) 28px', zIndex:3, pointerEvents:'none', fontFamily:'var(--font-geist-mono)', fontSize:11, letterSpacing:'.04em', color:'var(--ink-3)', textTransform:'uppercase' }}>
        <div style={{ position:'absolute', top:0, left:0, display:'inline-flex', alignItems:'center', gap:8 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--blue)', boxShadow:'0 0 0 4px rgba(29,79,255,.15)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
          Available · Summer 2026
        </div>
        <div style={{ position:'absolute', top:0, right:0 }}>Austria · Europe</div>
        <div style={{ position:'absolute', bottom:0, left:0 }}>01 / 09 — Index</div>
        <div style={{ position:'absolute', bottom:0, right:0, display:'inline-flex', alignItems:'center', gap:8 }}>
          Scroll
          <svg width="10" height="22" viewBox="0 0 10 22"><path d="M5 0 V20 M1 16 L5 20 L9 16" stroke="currentColor" fill="none" strokeWidth="1.2"/></svg>
        </div>
      </div>

      {/* Main content */}
      <div style={{ position:'relative', zIndex:2, alignSelf:'end', paddingBottom:'9vh', maxWidth:1480, margin:'0 auto', width:'100%' }}>
        <div className="hero-eyebrow" style={{ marginBottom:'clamp(28px,4vw,48px)', opacity:0, transform:'translateY(12px)' }}>
          <span style={{ display:'inline-flex', alignItems:'center', padding:'7px 14px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:999, fontFamily:'var(--font-geist-mono)', fontSize:11, letterSpacing:'.04em', color:'var(--ink-2)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', marginRight:8, display:'inline-block' }} />
            Application — Gründerszene Summer Internship
          </span>
        </div>

        <h1 style={{ fontWeight:600, fontSize:'clamp(64px,13vw,220px)', lineHeight:.92, letterSpacing:'-.045em', color:'var(--ink)' }}>
          {[['Systems',''],['thinking,',''],['in motion.','blue']].map(([word, col], i) => (
            <span key={i} style={{ display:'block', overflow:'hidden', paddingBottom:'.1em', lineHeight:1 }}>
              <span className="ht-word" style={{ display:'inline-block', transform:'translateY(110%)', color:col==='blue'?'var(--blue)':'var(--ink)', fontStyle:col==='blue'?'italic':'normal', fontWeight:col==='blue'?500:600 }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub" style={{ marginTop:'clamp(32px,4vw,48px)', maxWidth:560, fontSize:'clamp(17px,1.15vw,19px)', lineHeight:1.55, color:'var(--ink-2)', opacity:0, transform:'translateY(12px)' }}>
          I&apos;m <strong style={{ fontWeight:600, color:'var(--ink)' }}>Alicia Frommann</strong> — founder of{' '}
          <a href="#thinktogether" style={{ color:'var(--blue)', paddingBottom:1, borderBottom:'1px solid var(--blue)' }}>ThinkTogether</a>,
          MSc candidate at MCI Innsbruck, and a person who believes the most useful question is rarely the loudest one.
        </p>

        <div className="hero-actions" style={{ marginTop:32, display:'flex', gap:10, flexWrap:'wrap', opacity:0, transform:'translateY(12px)' }}>
          <a href="#thinktogether" className="btn-ink"
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px', borderRadius:999, fontSize:14, fontWeight:500, background:'var(--ink)', color:'var(--paper)', transition:'background .3s,gap .3s var(--ease-soft)', textDecoration:'none' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--blue)';(e.currentTarget as HTMLElement).style.gap='14px'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--ink)';(e.currentTarget as HTMLElement).style.gap='10px'}}>
            <span>See the work</span><span style={{ transition:'transform .3s' }}>→</span>
          </a>
          <a href="#contact"
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px', borderRadius:999, fontSize:14, fontWeight:500, border:'1px solid var(--line-2)', color:'var(--ink)', transition:'border-color .3s', textDecoration:'none' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--ink)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--line-2)'}}>
            Write to me
          </a>
        </div>

        <div className="hero-pills" style={{ marginTop:'clamp(40px,5vw,60px)', display:'flex', gap:8, flexWrap:'wrap', opacity:0, transform:'translateY(12px)' }}>
          {['Systems thinking','Causal loop diagrams','Org transformation','DE · EN · FR'].map(p => (
            <span key={p} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 14px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:999, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-2)', letterSpacing:'.02em' }}>
              <i style={{ width:5, height:5, borderRadius:'50%', background:'var(--blue)', display:'inline-block' }} />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
