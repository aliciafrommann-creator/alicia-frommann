'use client'
import { useEffect, useRef, useState } from 'react'

// Two states: BEFORE (personal conflict) and AFTER (task conflict)
// The map animates between them on scroll.

const BEFORE_NODES = [
  { id:'A', x:120, y:120, label:'Person A', sub:'Frustrated', personal:true },
  { id:'B', x:480, y:120, label:'Person B', sub:'Defensive', personal:true },
  { id:'C', x:120, y:360, label:'Person C', sub:'Disengaged', personal:true },
  { id:'D', x:480, y:360, label:'Person D', sub:'Confused', personal:true },
  { id:'E', x:300, y:240, label:'The problem', sub:'undefined', personal:false },
]

const AFTER_NODES = [
  { id:'A', x:120, y:120, label:'Person A', sub:'Aligned', personal:false },
  { id:'B', x:480, y:120, label:'Person B', sub:'Aligned', personal:false },
  { id:'C', x:120, y:360, label:'Person C', sub:'Aligned', personal:false },
  { id:'D', x:480, y:360, label:'Person D', sub:'Aligned', personal:false },
  { id:'E', x:300, y:240, label:'The system', sub:'mapped', personal:false },
]

const BEFORE_EDGES = [
  { from:'A', to:'B', label:'blame', curved:true, dir:'top' },
  { from:'B', to:'C', label:'deflect', curved:true, dir:'right' },
  { from:'C', to:'D', label:'vent', curved:true, dir:'bottom' },
  { from:'D', to:'A', label:'escalate', curved:true, dir:'left' },
]

const AFTER_EDGES = [
  { from:'A', to:'E', label:'+', curved:false, dir:'' },
  { from:'B', to:'E', label:'+', curved:false, dir:'' },
  { from:'C', to:'E', label:'+', curved:false, dir:'' },
  { from:'D', to:'E', label:'+', curved:false, dir:'' },
  { from:'E', to:'A', label:'→', curved:false, dir:'' },
  { from:'E', to:'B', label:'→', curved:false, dir:'' },
  { from:'E', to:'C', label:'→', curved:false, dir:'' },
  { from:'E', to:'D', label:'→', curved:false, dir:'' },
]

function getNodePos(nodes: typeof BEFORE_NODES, id: string) {
  return nodes.find(n => n.id === id) ?? { x:300, y:240 }
}

function EdgePath({ from, to, nodes, label, isAfter }: { from:string; to:string; nodes:typeof BEFORE_NODES; label:string; isAfter:boolean }) {
  const a = getNodePos(nodes, from)
  const b = getNodePos(nodes, to)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const cx = mx + (a.y - b.y) * 0.25
  const cy = my + (b.x - a.x) * 0.25
  const d = isAfter
    ? `M${a.x},${a.y} L${b.x},${b.y}`
    : `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`
  const col = isAfter ? '#1D4FFF' : '#E05A5A'
  const mid = isAfter
    ? { x: mx, y: my }
    : { x: cx * 0.5 + mx * 0.5, y: cy * 0.5 + my * 0.5 }
  return (
    <g>
      <path d={d} stroke={col} strokeWidth="1.3" fill="none" strokeDasharray="4 3"
        opacity={isAfter ? 0.7 : 0.55}
        style={{ animation:'dash 20s linear infinite' }}
        markerEnd={`url(#arr-${isAfter ? 'blue' : 'red'})`}
      />
      <text x={mid.x} y={mid.y - 5} textAnchor="middle"
        style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:col, letterSpacing:'.06em', textTransform:'uppercase' } as React.CSSProperties}>
        {label}
      </text>
    </g>
  )
}

export default function ConflictShift() {
  const [progress, setProgress] = useState(0) // 0=before, 1=after
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Animate section header words in
      gsap.from('.cs-word', {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.cs-headline', start: 'top 85%' },
      })

      // Map transition on scroll
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => setProgress(self.progress),
        })
      }
    })()
    return () => ctx?.revert()
  }, [])

  // Interpolate node positions
  const t = Math.min(1, Math.max(0, (progress - 0.15) / 0.7))
  const nodes = BEFORE_NODES.map((bn, i) => {
    const an = AFTER_NODES[i]
    return {
      ...bn,
      x: bn.x + (an.x - bn.x) * t,
      y: bn.y + (an.y - bn.y) * t,
      label: t > 0.5 ? an.label : bn.label,
      sub:   t > 0.5 ? an.sub   : bn.sub,
      personal: t < 0.5 ? bn.personal : an.personal,
    }
  })
  const showBefore = t < 0.5
  const edges = showBefore ? BEFORE_EDGES : AFTER_EDGES

  const stateLabel = t < 0.3 ? 'personal conflict' : t > 0.7 ? 'task conflict' : 'shifting…'
  const stateColor = t < 0.3 ? '#E05A5A' : t > 0.7 ? '#1D4FFF' : 'var(--ink-2)'

  return (
    <section
      ref={sectionRef}
      id="conflict-shift"
      style={{ position:'relative', height:'250vh', background:'var(--cream)' }}
    >
      <div style={{
        position:'sticky', top:0, height:'100vh',
        display:'grid', gridTemplateColumns:'1fr 1.1fr',
        gap:'clamp(40px,6vw,96px)',
        padding:'clamp(80px,10vw,120px) var(--pad-x)',
        maxWidth:1480, margin:'0 auto',
        alignItems:'center',
      }}>
        {/* LEFT — copy */}
        <div>
          <span className="tag" style={{ display:'block', marginBottom:24 }}>§ 02.5 — The shift</span>
          <h2 className="cs-headline display-2" style={{ marginBottom:'clamp(24px,3vw,36px)' }}>
            <span className="cs-word" style={{ display:'block' }}>High-performing</span>
            <span className="cs-word" style={{ display:'block' }}>teams don&apos;t avoid</span>
            <span className="cs-word italic" style={{ display:'block', color:'var(--blue)' }}>conflict.</span>
          </h2>
          <p style={{ fontSize:'clamp(15px,1.1vw,17px)', lineHeight:1.65, color:'var(--ink-2)', maxWidth:480, marginBottom:32 }}>
            They keep it about the <em>work</em>, not the people. Adam Grant calls this the difference between dysfunction and high performance. ThinkTogether makes that shift the default — not a leadership exercise, but a structural property of every session.
          </p>
          <p style={{ fontSize:13, lineHeight:1.65, color:'var(--ink-3)', maxWidth:440, fontStyle:'italic', borderLeft:'2px solid var(--blue)', paddingLeft:16 }}>
            &ldquo;Task conflict — disagreement about ideas — is healthy. Relationship conflict — friction between people — is toxic. The best teams develop the ability to separate the two.&rdquo;
          </p>
          <p style={{ marginTop:8, fontSize:11, fontFamily:'var(--font-geist-mono)', color:'var(--ink-3)', letterSpacing:'.04em' }}>
            — Grant, A. (2021). <em>Think Again.</em> Viking.
          </p>

          {/* Progress indicator */}
          <div style={{ marginTop:48, display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ flex:1, height:2, background:'var(--line)', borderRadius:99, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${t * 100}%`, background:'var(--blue)', transition:'width .1s linear', borderRadius:99 }} />
            </div>
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:11, color:stateColor, letterSpacing:'.04em', whiteSpace:'nowrap', transition:'color .3s' }}>
              {stateLabel}
            </span>
          </div>

          {/* Two outcome chips */}
          <div style={{ marginTop:24, display:'flex', gap:10, flexWrap:'wrap' }}>
            {[
              { label:'Faster alignment', active: t > 0.5 },
              { label:'Decisions that hold', active: t > 0.65 },
              { label:'Less wasted change effort', active: t > 0.8 },
            ].map(chip => (
              <span key={chip.label} style={{
                padding:'7px 14px',
                background: chip.active ? 'var(--blue)' : 'var(--paper)',
                border: `1px solid ${chip.active ? 'var(--blue)' : 'var(--line)'}`,
                borderRadius:999,
                fontFamily:'var(--font-geist-mono)', fontSize:11,
                color: chip.active ? 'var(--paper)' : 'var(--ink-3)',
                letterSpacing:'.02em',
                transition:'background .4s, color .4s, border-color .4s',
              }}>{chip.label}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — animated SVG map */}
        <div style={{ position:'relative' }}>
          <div style={{
            background:'var(--paper)', border:'1px solid var(--line)', borderRadius:16,
            overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,.06)',
          }}>
            {/* top bar */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'12px 16px', borderBottom:'1px solid var(--line)',
              background:'var(--cream-2)', fontFamily:'var(--font-geist-mono)',
              fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em',
            }}>
              <span style={{ textTransform:'uppercase', letterSpacing:'.06em' }}>conflict type</span>
              <span style={{ color:stateColor, transition:'color .3s', fontWeight:500 }}>{stateLabel}</span>
            </div>

            <svg viewBox="0 0 600 480" style={{ width:'100%', height:'auto', display:'block', background:'var(--paper)' }}>
              <defs>
                <marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF" />
                </marker>
                <marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="#E05A5A" />
                </marker>
                <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1D4FFF" stopOpacity=".2" />
                  <stop offset="100%" stopColor="#1D4FFF" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glow-red" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E05A5A" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#E05A5A" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* edges */}
              {edges.map((e, i) => (
                <EdgePath key={i} from={e.from} to={e.to} nodes={nodes as typeof BEFORE_NODES} label={e.label} isAfter={!showBefore} />
              ))}

              {/* nodes */}
              {nodes.map((n) => {
                const isCenter = n.id === 'E'
                const r = isCenter ? 52 : 36
                const glowId = n.personal ? 'glow-red' : 'glow-blue'
                const strokeCol = n.personal ? '#E05A5A' : (isCenter ? 'var(--ink)' : 'var(--blue)')
                return (
                  <g key={n.id} transform={`translate(${Math.round(n.x)},${Math.round(n.y)})`}
                    style={{ transition:'transform .05s linear' }}>
                    <circle r={r + 20} fill={`url(#${glowId})`} />
                    <circle r={r} fill="var(--paper)" stroke={strokeCol} strokeWidth={isCenter ? 2 : 1.5}
                      style={{ transition:'stroke .4s' }} />
                    <text y={-8} textAnchor="middle"
                      style={{ fontFamily:'var(--font-geist-mono)', fontSize: isCenter ? 10 : 9, fill:'var(--ink)', fontWeight:600, letterSpacing:'.03em', textTransform:'uppercase' } as React.CSSProperties}>
                      {n.label}
                    </text>
                    <text y={8} textAnchor="middle"
                      style={{ fontFamily:'var(--font-geist-mono)', fontSize:8, fill:n.personal ? '#E05A5A' : 'var(--blue)', letterSpacing:'.04em' } as React.CSSProperties}>
                      {n.sub}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* caption */}
          <p style={{ marginTop:14, fontFamily:'var(--font-geist-mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'.02em' }}>
            Fig. 02 — Scroll to watch the conflict type shift. Loops animate on the live platform.
          </p>
        </div>
      </div>
    </section>
  )
}
