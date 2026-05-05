'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LAYERS = [
  { pct:'10%', tier:'Events',         h:'What you can see',       body:'Workshop output. The slide deck. The launched feature. The town hall. The metric on the dashboard.', right:true },
  { pct:'25%', tier:'Patterns',       h:'What keeps happening',   body:'The same conflict in three teams. The same hire that doesn’t stick. The retro item that returns every quarter.', right:false },
  { pct:'30%', tier:'Structures',     h:'The shape that holds it', body:'Org charts, incentives, calendars, who-reports-to-whom, who-gets-to-veto-what. The architecture of attention.', right:true },
  { pct:'25%', tier:'Mental models',  h:'What we believe is true', body:'“Engineers don’t talk to customers.” “Speed beats care.” The unexamined defaults that draw the rest.', right:false },
  { pct:'10%', tier:'Purpose',        h:'What the system is actually for', body:'The deepest leverage point. Change this and the structure has to redraw itself. This is where I prefer to work.', right:true, accent:true },
]

export default function Iceberg() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ice-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity:0, y:24 }, {
          opacity:1, y:0, duration:.8, ease:'power3.out',
          scrollTrigger: { trigger:el, start:'top 85%' }, delay: i * .08
        })
      })
      gsap.utils.toArray<HTMLElement>('.reveal-line > span').forEach(el => {
        gsap.fromTo(el, { y:'110%' }, {
          y:0, duration:1.0, ease:'expo.out',
          scrollTrigger: { trigger:el, start:'top 88%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="iceberg" style={{ padding:'var(--pad-y) var(--pad-x)', maxWidth:1480, margin:'0 auto', borderTop:'1px solid var(--line)' }}>
      <div className="section-head">
        <span className="tag">§ 03 — Iceberg model</span>
        <h2 className="display-2">
          <span className="reveal-line"><span>What you see</span></span>
          <span className="reveal-line"><span className="italic">isn’t where I work.</span></span>
        </h2>
        <p className="lede">Most of any team — like most of any iceberg — is below the waterline. The visible events are 10%. The other 90% is where the leverage lives. This is the map I use.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'minmax(320px,560px) 1fr', gap:'clamp(48px,6vw,96px)', alignItems:'start' }}>
        {/* SVG iceberg */}
        <div style={{ position:'sticky', top:'10vh' }}>
          <svg viewBox="0 0 800 900" style={{ width:'100%', height:'auto', display:'block' }}>
            <defs>
              <linearGradient id="iceTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FAF8F3" /><stop offset="100%" stopColor="#DCE5FF" />
              </linearGradient>
              <linearGradient id="iceBot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D4FFF" stopOpacity=".22" /><stop offset="100%" stopColor="#0A2EE6" stopOpacity=".05" />
              </linearGradient>
              <linearGradient id="waterFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D4FFF" stopOpacity=".18" /><stop offset="100%" stopColor="#1D4FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 400 80 L 270 320 L 530 320 Z" fill="url(#iceTop)" stroke="#0A0E1A" strokeWidth="1.4" />
            <line x1="40" y1="320" x2="760" y2="320" stroke="#1D4FFF" strokeWidth="1" strokeDasharray="6 5" />
            <text x="40" y="312" fontFamily="var(--font-geist-mono)" fontSize="11" fill="#1D4FFF" letterSpacing="2">WATERLINE</text>
            <text x="760" y="312" fontFamily="var(--font-geist-mono)" fontSize="11" fill="#1D4FFF" textAnchor="end" letterSpacing="2">10% VISIBLE</text>
            <rect x="0" y="320" width="800" height="60" fill="url(#waterFade)" />
            <path d="M 270 320 L 530 320 L 660 600 L 580 820 L 220 820 L 140 600 Z" fill="url(#iceBot)" stroke="#1D4FFF" strokeWidth="1.2" strokeOpacity=".5" />
            <circle cx="400" cy="500" r="2.5" fill="#1D4FFF" opacity=".6">
              <animate attributeName="cy" values="500;480;500" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="340" cy="640" r="2" fill="#1D4FFF" opacity=".5">
              <animate attributeName="cy" values="640;620;640" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="470" cy="720" r="2" fill="#1D4FFF" opacity=".5">
              <animate attributeName="cy" values="720;700;720" dur="5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Layers list */}
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {LAYERS.map((l, i) => (
            <div key={i} className="ice-row" style={{
              display:'grid', gridTemplateColumns:'72px 1fr', gap:'12px 20px', alignItems:'baseline',
              padding:'28px 0',
              borderBottom: i < LAYERS.length - 1 ? '1px solid var(--line)' : undefined,
              opacity:0,
            }}>
              <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.04em', paddingTop:3 }}>{l.pct}</span>
              <div>
                <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color: l.accent ? 'var(--blue)' : 'var(--ink-3)', display:'block', marginBottom:6 }}>{l.tier}</span>
                <h3 style={{ fontSize:20, fontWeight:600, letterSpacing:'-.02em', color:'var(--ink)', marginBottom:8 }}>{l.h}</h3>
                <p style={{ fontSize:14, lineHeight:1.6, color:'var(--ink-2)' }}>{l.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
