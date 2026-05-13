'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThinkTogether() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-line > span').forEach(el => {
        gsap.fromTo(el, { y: '110%' }, {
          y: 0, duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="thinktogether" style={{ padding:'var(--pad-y) var(--pad-x)', maxWidth:1480, margin:'0 auto' }}>
      {/* Head */}
      <div style={{ marginBottom:'clamp(56px,8vw,112px)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:32, marginBottom:'clamp(28px,3vw,40px)', flexWrap:'wrap' }}>
          <span className="tag">§ 02 — The work</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--blue)', letterSpacing:'.02em' }}>
            <i style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
            Live · v0.4 · thinktogetherapp.vercel.app
          </span>
        </div>
        <h2 className="display-2">
          <span className="reveal-line"><span>ThinkTogether.</span></span>
          <span className="reveal-line"><span className="italic">See the system.</span></span>
          <span className="reveal-line"><span className="italic">Move together.</span></span>
        </h2>
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.05fr', gap:'clamp(40px,6vw,96px)', alignItems:'start' }}>
        {/* Copy */}
        <div>
          <p className="lede" style={{ marginBottom:48, maxWidth:520 }}>
            A SaaS platform that helps teams cut through complexity — turning fragmented perspectives into a shared picture of cause and effect, so decisions stick and change actually moves.
          </p>
          <ol style={{ listStyle:'none', borderTop:'1px solid var(--line)', marginBottom:36 }}>
            {[
              ['01','Surface','Collect input from across the team — text, voice, notes. AI maps the variables and connections that are actually driving the problem.'],
              ['02','Align','The shared picture builds in real time. Everyone sees the same system — reinforcing loops, bottlenecks, leverage points.'],
              ['03','Act','Run interventions on the model before you run them on the organisation. Prioritise. Assign. Move.'],
            ].map(([num, title, desc]) => (
              <li key={num} style={{ padding:'26px 0', display:'grid', gridTemplateColumns:'56px 1fr', gap:'6px 16px', alignItems:'baseline', borderBottom:'1px solid var(--line)' }}>
                <span style={{ gridRow:'1/3', fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--blue)', letterSpacing:'.04em', paddingTop:4 }}>{num}</span>
                <h3 style={{ fontWeight:600, fontSize:22, letterSpacing:'-.015em', color:'var(--ink)' }}>{title}</h3>
                <p style={{ fontSize:14, lineHeight:1.55, color:'var(--ink-2)', maxWidth:460 }}>{desc}</p>
              </li>
            ))}
          </ol>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:32 }}>
            {['Next.js 14','Supabase','Anthropic API','Tailwind','D3'].map(c => (
              <span key={c} style={{ padding:'6px 12px', background:'var(--paper)', border:'1px solid var(--line)', borderRadius:999, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-2)', letterSpacing:'.02em' }}>{c}</span>
            ))}
          </div>
          <a href="https://thinktogetherapp.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            fontFamily:'var(--font-geist-mono)', fontSize:13, letterSpacing:'.02em',
            padding:'12px 18px', background:'var(--blue)', color:'var(--paper)', borderRadius:999,
            transition:'gap .3s var(--ease-soft),background .3s',
          }}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background='var(--blue-deep)'}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background='var(--blue)'}}>
            <span>Visit thinktogetherapp.vercel.app</span><span>↗</span>
          </a>
        </div>

        {/* CLD frame */}
        <figure>
          <div style={{ background:'var(--paper)', border:'1px solid var(--line)', borderRadius:12, overflow:'hidden' }}>
            {/* browser bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom:'1px solid var(--line)', background:'var(--cream-2)', fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>
              <div style={{ display:'flex', gap:6 }}>
                <span style={{ padding:'5px 10px', borderRadius:6, border:'1px solid var(--line)', background:'var(--paper)', color:'var(--ink)' }}>team_complexity.cld</span>
                <span style={{ padding:'5px 10px', borderRadius:6, border:'1px solid transparent', color:'var(--ink-3)' }}>trust_loop.cld</span>
              </div>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'.08em' }}>
                <i style={{ width:6, height:6, borderRadius:'50%', background:'var(--blue)', animation:'pulse 2s var(--ease-out) infinite', display:'inline-block' }} />
                simulating
              </span>
            </div>
            {/* SVG — Reinforcing loop: Mental Models → High Performance Culture */}
            <svg viewBox="0 0 600 520" style={{
              width:'100%', height:'auto', display:'block',
              background:'radial-gradient(circle at 50% 50%,rgba(29,79,255,.05),transparent 70%),var(--paper)',
            }}>
              <defs>
                <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF" /></marker>
                <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1D4FFF" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#1D4FFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* R label */}
              <text x="300" y="28" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:10, fill:'var(--ink-4)', letterSpacing:'.12em', textTransform:'uppercase' } as React.CSSProperties}>R+ · reinforcing</text>
              {/* Edges — curved arcs around the loop */}
              <g fill="none" strokeLinecap="round" strokeWidth="1.3" stroke="#1D4FFF" strokeDasharray="5 4">
                <path id="r1" d="M 318 72 Q 430 80 456 132" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r2" d="M 500 158 Q 528 218 504 278" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r3" d="M 462 318 Q 458 390 428 422" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r4" d="M 388 452 Q 340 478 296 462" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r5" d="M 248 452 Q 192 438 158 400" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r6" d="M 118 358 Q 76 300 80 242" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r7" d="M 96 192 Q 110 130 158 108" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
                <path id="r8" d="M 210 82 Q 252 62 286 66" markerEnd="url(#arrowR)" style={{animation:'dash 28s linear infinite'}} />
              </g>
              {/* Animated particles */}
              <g>
                {['r1','r2','r3','r4','r5','r6','r7','r8'].map((id, i) => (
                  <circle key={id} r="2.8" fill="#1D4FFF" opacity=".8">
                    <animateMotion dur="6s" repeatCount="indefinite" begin={`${i * 0.75}s`}>
                      <mpath href={`#${id}`} />
                    </animateMotion>
                  </circle>
                ))}
              </g>
              {/* Nodes */}
              {[
                {cx:300, cy:72,  label:'Mental Models',    sub:'neuroplasticity'},
                {cx:474, cy:144, label:'Reflection',       sub:'self-leadership'},
                {cx:510, cy:296, label:'Leadership',       sub:'better decisions'},
                {cx:430, cy:440, label:'Trust',            sub:'vulnerability'},
                {cx:272, cy:472, label:'Psych Safety',     sub:'speak up'},
                {cx:128, cy:388, label:'Risk-taking',      sub:'experimentation'},
                {cx: 80, cy:224, label:'Innovation',       sub:'new solutions'},
                {cx:170, cy: 94, label:'Tech Adoption',    sub:'AI · digital tools'},
              ].map((n, i) => (
                <g key={i} transform={`translate(${n.cx} ${n.cy})`}>
                  <circle r="38" fill="url(#glow2)" />
                  <circle r="22" fill="var(--paper)" stroke="var(--blue)" strokeWidth="1.3" />
                  <text y="-32" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:8.5, fill:'var(--ink)', letterSpacing:'.04em', textTransform:'uppercase', fontWeight:600 } as React.CSSProperties}>{n.label}</text>
                  <text y="-20" textAnchor="middle" style={{ fontFamily:'var(--font-geist-mono)', fontSize:7.5, fill:'var(--ink-4)', letterSpacing:'.03em' } as React.CSSProperties}>{n.sub}</text>
                </g>
              ))}
            </svg>
          </div>
          <figcaption style={{ marginTop:14, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>Fig. 01 — The reinforcing loop ThinkTogether is built to accelerate. Every node feeds the next.</figcaption>
        </figure>
      </div>
    </section>
  )
}
