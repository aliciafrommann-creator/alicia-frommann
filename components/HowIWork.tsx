export default function HowIWork() {
  return (
    <section className="how" id="how" data-screen-label="05 How">
      <div className="section-head">
        <span className="tag">04 How I work</span>
        <h2 className="display-2">
          <span className="reveal-line"><span>One loop.</span></span>{' '}
          <span className="reveal-line"><span className="italic">Two beneficiaries.</span></span>
        </h2>
        <p className="lede">The work is the same in either direction. <strong>Listen → Map → Reframe → Intervene → Listen again.</strong> What changes is who&apos;s in the room, and which loop you start with.</p>
      </div>
      <div className="how-stage">
        <div className="how-svg-wrap">
          <svg className="how-svg" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid meet" aria-label="Systems thinking loop showing how Alicia works">
            <defs>
              <marker id="howA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF"/>
              </marker>
              <marker id="howC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#FF5C3A"/>
              </marker>
              <radialGradient id="howGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#1D4FFF" stopOpacity=".22"/>
                <stop offset="1" stopColor="#1D4FFF" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="howGlowC" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#FF5C3A" stopOpacity=".18"/>
                <stop offset="1" stopColor="#FF5C3A" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <text x="240" y="80" fontFamily="Geist Mono,monospace" fontSize="12" fill="#6B7080" letterSpacing="3" textAnchor="middle">BUSINESSES</text>
            <text x="960" y="80" fontFamily="Geist Mono,monospace" fontSize="12" fill="#6B7080" letterSpacing="3" textAnchor="middle">SOCIETIES</text>
            <g className="how-edges" fill="none" strokeLinecap="round">
              <path id="hp1" d="M 600 180 Q 540 250 600 320" stroke="#0A0E1A" strokeWidth="1.4" markerEnd="url(#howA)"/>
              <path id="hp2" d="M 600 320 Q 660 380 600 440" stroke="#0A0E1A" strokeWidth="1.4" markerEnd="url(#howA)"/>
              <path id="hp3" d="M 600 440 Q 540 510 600 580" stroke="#0A0E1A" strokeWidth="1.4" markerEnd="url(#howA)"/>
              <path id="hbL1" d="M 540 250 Q 380 230 280 250" stroke="#1D4FFF" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howA)"/>
              <path id="hbL2" d="M 280 290 Q 380 350 540 380" stroke="#1D4FFF" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howA)"/>
              <path id="hsR1" d="M 660 250 Q 820 230 920 250" stroke="#FF5C3A" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howC)"/>
              <path id="hsR2" d="M 920 290 Q 820 350 660 380" stroke="#FF5C3A" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#howC)"/>
            </g>
            {[['Listen','01',600,160],['Map','02',600,320],['Reframe','03',600,460],['Intervene','04',600,600]].map(([label,num,x,y]) => (
              <g key={String(label)} transform={`translate(${x} ${y})`}>
                <circle r="64" fill="url(#howGlow)"/>
                <circle r="38" fill="#FAF8F3" stroke="#0A0E1A" strokeWidth="1.6"/>
                <text y="-2" textAnchor="middle" fontFamily="Geist,system-ui,sans-serif" fontWeight="600" fontSize="14" fill="#0A0E1A">{label}</text>
                <text y="14" textAnchor="middle" fontFamily="Geist Mono,monospace" fontSize="9" fill="#6B7080" letterSpacing="2">{num}</text>
              </g>
            ))}
            {[['Clearer decisions',220,250],['Less re-org churn',220,380],['Teams that talk',220,510]].map(([label,x,y]) => (
              <g key={String(label)} transform={`translate(${x} ${y})`}>
                <rect x="-100" y="-22" width="200" height="44" rx="22" fill="#FAF8F3" stroke="#1D4FFF" strokeWidth="1.2"/>
                <text textAnchor="middle" y="5" fontFamily="Geist,system-ui,sans-serif" fontWeight="500" fontSize="13" fill="#0A0E1A">{label}</text>
              </g>
            ))}
            {[['Sustainable strategy',980,250],['Wider participation',980,380],['Healthier institutions',980,510]].map(([label,x,y]) => (
              <g key={String(label)} transform={`translate(${x} ${y})`}>
                <rect x="-100" y="-22" width="200" height="44" rx="22" fill="#FAF8F3" stroke="#FF5C3A" strokeWidth="1.2"/>
                <text textAnchor="middle" y="5" fontFamily="Geist,system-ui,sans-serif" fontWeight="500" fontSize="13" fill="#0A0E1A">{label}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="how-legend">
          <div className="how-leg"><span className="how-dot" style={{background:'#0A0E1A'}}/><span><strong>The work</strong> Listen → Map → Reframe → Intervene</span></div>
          <div className="how-leg"><span className="how-dot" style={{background:'#1D4FFF'}}/><span><strong>For businesses</strong> Strategy that survives contact with the team</span></div>
          <div className="how-leg"><span className="how-dot" style={{background:'#FF5C3A'}}/><span><strong>For societies</strong> Institutions that take more people seriously</span></div>
        </div>
      </div>
    </section>
  )
}
