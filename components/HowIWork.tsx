export default function HowIWork() {
  return (
    <section id="how" style={{ padding:'var(--pad-y) var(--pad-x)', maxWidth:1480, margin:'0 auto', borderTop:'1px solid var(--line)' }}>
      <div className="section-head">
        <span className="tag">§ 04 — How I work</span>
        <h2 className="display-2">
          <span className="reveal-line"><span>One loop.</span></span>
          <span className="reveal-line"><span className="italic">Two beneficiaries.</span></span>
        </h2>
        <p className="lede">
          The work is the same in either direction. <strong>Listen → Map → Reframe → Intervene → Listen again.</strong> What changes is who’s in the room, and which loop you start with.
        </p>
      </div>

      <div style={{ overflowX:'auto', width:'100%' }}>
        <svg viewBox="0 0 1200 720" style={{ width:'100%', minWidth:700, height:'auto', display:'block' }}>
          <defs>
            <marker id="howA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF" /></marker>
            <marker id="howC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#FF5C3A" /></marker>
            <radialGradient id="howGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1D4FFF" stopOpacity=".22" /><stop offset="100%" stopColor="#1D4FFF" stopOpacity="0" /></radialGradient>
            <radialGradient id="howGlowC" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF5C3A" stopOpacity=".18" /><stop offset="100%" stopColor="#FF5C3A" stopOpacity="0" /></radialGradient>
          </defs>

          <text x="240" y="80" fontFamily="var(--font-geist-mono)" fontSize="12" fill="#6B7080" letterSpacing="3" textAnchor="middle">→ BUSINESSES</text>
          <text x="960" y="80" fontFamily="var(--font-geist-mono)" fontSize="12" fill="#6B7080" letterSpacing="3" textAnchor="middle">→ SOCIETIES</text>

          <g fill="none" strokeLinecap="round">
            <path id="hp1" d="M 600 180 Q 540 250 600 320" stroke="#0A0E1A" strokeWidth="1.4" markerEnd="url(#howA)" />
            <path id="hp2" d="M 600 320 Q 660 380 600 440" stroke="#0A0E1A" strokeWidth="1.4" markerEnd="url(#howA)" />
            <path id="hp3" d="M 600 440 Q 540 510 600 580" stroke="#0A0E1A" strokeWidth="1.4" markerEnd="url(#howA)" />
            <path id="hpR" d="M 600 580 C 760 660 760 100 600 180" stroke="#0A0E1A" strokeWidth="1.4" strokeDasharray="4 4" markerEnd="url(#howA)" />
            <path id="hbL1" d="M 540 250 Q 380 230 280 250" stroke="#1D4FFF" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howA)" />
            <path id="hbL2" d="M 280 290 Q 380 350 540 380" stroke="#1D4FFF" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howA)" />
            <path id="hbL3" d="M 540 480 Q 380 500 280 480" stroke="#1D4FFF" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howA)" />
            <path id="hsR1" d="M 660 250 Q 820 230 920 250" stroke="#FF5C3A" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howC)" />
            <path id="hsR2" d="M 920 290 Q 820 350 660 380" stroke="#FF5C3A" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howC)" />
            <path id="hsR3" d="M 660 480 Q 820 500 920 480" stroke="#FF5C3A" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howC)" />
          </g>

          <g>
            <circle r="3.5" fill="#0A0E1A"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#hp1" /></animateMotion></circle>
            <circle r="3.5" fill="#0A0E1A"><animateMotion dur="6s" repeatCount="indefinite" begin="1.5s"><mpath href="#hp2" /></animateMotion></circle>
            <circle r="3.5" fill="#0A0E1A"><animateMotion dur="6s" repeatCount="indefinite" begin="3s"><mpath href="#hp3" /></animateMotion></circle>
            <circle r="3" fill="#1D4FFF"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#hbL1" /></animateMotion></circle>
            <circle r="3" fill="#1D4FFF"><animateMotion dur="5s" repeatCount="indefinite" begin="1.5s"><mpath href="#hbL2" /></animateMotion></circle>
            <circle r="3" fill="#1D4FFF"><animateMotion dur="5s" repeatCount="indefinite" begin="3s"><mpath href="#hbL3" /></animateMotion></circle>
            <circle r="3" fill="#FF5C3A"><animateMotion dur="5s" repeatCount="indefinite" begin="0.8s"><mpath href="#hsR1" /></animateMotion></circle>
            <circle r="3" fill="#FF5C3A"><animateMotion dur="5s" repeatCount="indefinite" begin="2.3s"><mpath href="#hsR2" /></animateMotion></circle>
            <circle r="3" fill="#FF5C3A"><animateMotion dur="5s" repeatCount="indefinite" begin="3.8s"><mpath href="#hsR3" /></animateMotion></circle>
          </g>

          {[{x:600,y:160,label:'Listen',n:'01'},{x:600,y:320,label:'Map',n:'02'},{x:600,y:460,label:'Reframe',n:'03'},{x:600,y:600,label:'Intervene',n:'04'}].map(({x,y,label,n})=>(
            <g key={n} transform={`translate(${x} ${y})`}>
              <circle r="64" fill="url(#howGlow)" />
              <circle r="38" fill="#FAF8F3" stroke="#0A0E1A" strokeWidth="1.6" />
              <text y="-2" textAnchor="middle" fontFamily="var(--font-geist)" fontWeight="600" fontSize="14" fill="#0A0E1A">{label}</text>
              <text y="14" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="9" fill="#6B7080" letterSpacing="2">{n}</text>
            </g>
          ))}

          {[{x:220,y:250,l:'Clearer decisions'},{x:220,y:380,l:'Less re-org churn'},{x:220,y:510,l:'Teams that talk'}].map(({x,y,l})=>(
            <g key={l} transform={`translate(${x} ${y})`}>
              <rect x="-100" y="-22" width="200" height="44" rx="22" fill="#FAF8F3" stroke="#1D4FFF" strokeWidth="1.2" />
              <text textAnchor="middle" y="5" fontFamily="var(--font-geist)" fontWeight="500" fontSize="13" fill="#0A0E1A">{l}</text>
            </g>
          ))}
          {[{x:980,y:250,l:'Sustainable strategy'},{x:980,y:380,l:'Wider participation'},{x:980,y:510,l:'Healthier institutions'}].map(({x,y,l})=>(
            <g key={l} transform={`translate(${x} ${y})`}>
              <rect x="-100" y="-22" width="200" height="44" rx="22" fill="#FAF8F3" stroke="#FF5C3A" strokeWidth="1.2" />
              <text textAnchor="middle" y="5" fontFamily="var(--font-geist)" fontWeight="500" fontSize="13" fill="#0A0E1A">{l}</text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:'12px 32px', marginTop:32 }}>
        {[['#0A0E1A','The work','Listen · Map · Reframe · Intervene'],['#1D4FFF','For businesses','Strategy that survives contact with the team'],['#FF5C3A','For societies','Institutions that take more people seriously']].map(([col,label,desc])=>(
          <div key={label} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--ink-2)' }}>
            <span style={{ width:10, height:10, borderRadius:'50%', background:col, flexShrink:0, display:'inline-block' }} />
            <span><strong style={{ color:'var(--ink)' }}>{label}</strong> · {desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
