const S = {
  bg:      '#08080A',
  bg2:     '#0F0F0D',
  border:  '#1C1C1A',
  text:    '#F0EAE0',
  text2:   '#857E74',
  text3:   '#3A3935',
  green:   '#6B9E5E',
  amber:   '#C8834A',
}

export default function Application() {
  return (
    <section id="application" style={{
      background: S.bg,
      borderTop: `1px solid ${S.border}`,
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)',
    }}>
      <div style={{maxWidth:'1480px',margin:'0 auto'}}>

        {/* Tag */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'16px',marginBottom:'clamp(24px,3vw,40px)'}}>
          <span style={{fontSize:'11px',fontWeight:500,letterSpacing:'0.22em',textTransform:'uppercase' as const,color:S.green}}>
            § 04 — Application
          </span>
          <span style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'7px 14px',border:`1px solid ${S.green}`,borderRadius:'999px',fontSize:'11px',color:S.green,letterSpacing:'0.06em',fontFamily:'var(--font-geist-mono)'}}>
            <i style={{width:'6px',height:'6px',borderRadius:'50%',background:S.green,animation:'pulse 2s ease-out infinite',display:'inline-block'}} />
            Gründerszene Startup-Sommercamp 2025
          </span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'var(--font-cormorant, Georgia, serif)',
          fontWeight: 300,
          fontSize: 'clamp(56px,8vw,120px)',
          lineHeight: 0.92,
          letterSpacing: '-0.025em',
          color: S.text,
          marginBottom: 'clamp(24px,3vw,40px)',
        }}>
          The idea I want<br/>
          <em style={{color:S.text2}}>to build in Berlin.</em>
        </h2>

        <p style={{
          fontFamily: 'var(--font-cormorant, Georgia, serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(18px,2vw,26px)',
          lineHeight: 1.55,
          color: S.text2,
          maxWidth: '680px',
          marginBottom: 'clamp(56px,8vw,96px)',
        }}>
          A gamified lifestyle platform that shifts how people consume — because it makes Spaß. Because you belong. Because you help.
        </p>

        {/* Two columns */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(40px,6vw,80px)',marginBottom:'clamp(64px,8vw,112px)',alignItems:'start'}}>

          {/* Left */}
          <div>
            <div style={{borderTop:`1px solid ${S.border}`,paddingTop:'32px',marginBottom:'48px'}}>
              <p style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase' as const,color:S.green,marginBottom:'20px',fontFamily:'var(--font-geist-mono)'}}>The thesis</p>
              <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.5,color:S.text,fontWeight:400,letterSpacing:'-0.02em',marginBottom:'16px'}}>
                Duolingo proved that gamification + existing motivation scales to hundreds of millions. But Duolingo only reaches people who already want to learn Spanish.
              </p>
              <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.5,color:S.amber,fontWeight:400,letterSpacing:'-0.02em',fontStyle:'italic'}}>
                This platform reaches people before they know they want to change.
              </p>
            </div>

            <div style={{borderTop:`1px solid ${S.border}`,paddingTop:'32px'}}>
              <p style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase' as const,color:S.text2,marginBottom:'24px',fontFamily:'var(--font-geist-mono)'}}>How it works</p>
              <ol style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'20px'}}>
                {[
                  { n:'01', t:'Challenges', d:'Weekly micro-challenges on environment, social justice, and local economy — low effort, high reward feeling. Streaks that build, not shame.' },
                  { n:'02', t:'Teams', d:'Compete with friends and family. More active teammates = better reward multiplier. The social loop that drives viral growth without asking for it.' },
                  { n:'03', t:'Brand Ecosystem', d:'Sustainable brands offer verified rewards. More users → more brand value → better rewards → more users. A real network effect.' },
                  { n:'04', t:'AI Layer', d:'"I need a gift." "I need a t-shirt." The platform knows your values — CO₂, fair trade, local economy — and answers accordingly.' },
                ].map(({ n, t, d }) => (
                  <li key={n} style={{display:'grid',gridTemplateColumns:'40px 1fr',gap:'4px 16px',alignItems:'baseline'}}>
                    <span style={{gridRow:'1/3',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:S.green,letterSpacing:'0.06em',paddingTop:'3px'}}>{n}</span>
                    <span style={{fontFamily:'var(--font-cormorant, Georgia, serif)',fontWeight:600,fontSize:'18px',color:S.text,letterSpacing:'-0.01em'}}>{t}</span>
                    <span style={{fontSize:'13px',lineHeight:1.65,color:S.text2}}>{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right — SVG diagram dark */}
          <div>
            <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:'12px',overflow:'hidden',marginBottom:'16px'}}>
              <div style={{padding:'12px 16px',borderBottom:`1px solid ${S.border}`,fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:S.text3,letterSpacing:'0.04em',display:'flex',justifyContent:'space-between'}}>
                <span>Platform logic · network effects</span>
                <span style={{fontSize:'10px',letterSpacing:'0.08em',textTransform:'uppercase' as const,color:S.text3}}>Concept</span>
              </div>
              <svg viewBox="0 0 560 420" style={{width:'100%',height:'auto',display:'block',background:`radial-gradient(circle at 50% 50%,rgba(107,158,94,.06),transparent 70%),${S.bg2}`}}>
                <defs>
                  <marker id="gArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="#6B9E5E"/>
                  </marker>
                </defs>
                <path d="M 280 75 Q 430 75 470 190" stroke="#6B9E5E" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#gArr)"/>
                <path d="M 470 230 Q 430 345 280 345" stroke="#6B9E5E" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#gArr)"/>
                <path d="M 240 345 Q 90 345 90 230" stroke="#6B9E5E" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#gArr)"/>
                <path d="M 90 190 Q 90 75 240 75" stroke="#6B9E5E" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#gArr)"/>
                <text x="415" y="120" fontFamily="monospace" fontSize="9" fill="#6B9E5E" letterSpacing="1" textAnchor="middle">more users →</text>
                <text x="415" y="310" fontFamily="monospace" fontSize="9" fill="#6B9E5E" letterSpacing="1" textAnchor="middle">better rewards</text>
                <text x="143" y="310" fontFamily="monospace" fontSize="9" fill="#6B9E5E" letterSpacing="1" textAnchor="middle">more brands</text>
                <text x="143" y="120" fontFamily="monospace" fontSize="9" fill="#6B9E5E" letterSpacing="1" textAnchor="middle">brand value ↑</text>
                <circle cx="280" cy="210" r="72" fill="none" stroke="#6B9E5E" strokeWidth="1" strokeDasharray="3 3" opacity="0.2"/>
                <circle cx="280" cy="210" r="40" fill="#0F0F0D" stroke="#3A3935" strokeWidth="1.6"/>
                <text x="280" y="206" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#857E74" letterSpacing="1.5">NETWORK</text>
                <text x="280" y="222" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6B9E5E" letterSpacing="1.5">EFFECT</text>
                {[
                  { x:280, y:55,  label:'Users',   sub:'conscious consumers' },
                  { x:490, y:210, label:'Brands',  sub:'sustainable partners' },
                  { x:280, y:365, label:'Rewards', sub:'vouchers + impact' },
                  { x:70,  y:210, label:'Teams',   sub:'social + viral' },
                ].map(({ x, y, label, sub }) => (
                  <g key={label} transform={`translate(${x},${y})`}>
                    <circle r="42" fill="rgba(107,158,94,.06)"/>
                    <circle r="26" fill="#0F0F0D" stroke="#6B9E5E" strokeWidth="1.4"/>
                    <text y="-36" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#F0EAE0" letterSpacing="1" fontWeight="600">{label}</text>
                    <text y="-24" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#857E74" letterSpacing="0.5">{sub}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div style={{display:'flex',flexWrap:'wrap' as const,gap:'6px'}}>
              {['Next.js 14','Supabase','Anthropic API','QR Partnerships','Vercel','10 weeks'].map(t => (
                <span key={t} style={{padding:'6px 12px',background:S.bg2,border:`1px solid ${S.border}`,borderRadius:'999px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:S.text2,letterSpacing:'0.02em'}}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Why Berlin */}
        <div style={{borderTop:`1px solid ${S.border}`,paddingTop:'clamp(48px,6vw,80px)'}}>
          <p style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase' as const,color:S.green,marginBottom:'clamp(24px,3vw,40px)',fontFamily:'var(--font-geist-mono)'}}>
            Why Berlin · Why now · Why this.
          </p>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:S.border,marginBottom:'clamp(48px,5vw,72px)'}}>
            {[
              { n:'01', title:'Connect.',         body:'I build mostly alone — evenings, weekends, between lectures. Berlin is where the builders are. Ten weeks in a room that pulls me forward instead of keeping me comfortable.' },
              { n:'02', title:'Find my co-founder.', body:"ThinkTogether needs a technical co-founder. Not a LinkedIn connection — someone I build with, argue with, trust. The kind of person who shows up in Berlin in July to make something real." },
              { n:'03', title:'Build in public.',  body:"Direct feedback. Full focus. The pressure of shipping in front of people who care. This is not a risk for me. It's the exact condition in which I learn fastest." },
            ].map(({ n, title, body }) => (
              <div key={n} style={{padding:'clamp(28px,4vw,48px)',background:S.bg}}>
                <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:S.green,letterSpacing:'0.08em',display:'block',marginBottom:'20px'}}>{n} /</span>
                <h3 style={{
                  fontFamily:'var(--font-cormorant, Georgia, serif)',
                  fontWeight:300,
                  fontSize:'clamp(28px,3vw,44px)',
                  letterSpacing:'-0.025em',
                  color:S.text,
                  lineHeight:1.0,
                  marginBottom:'16px',
                  fontStyle:'italic',
                }}>{title}</h3>
                <p style={{fontSize:'14px',lineHeight:1.75,color:S.text2}}>{body}</p>
              </div>
            ))}
          </div>

          {/* Closing */}
          <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center' as const,paddingBottom:'clamp(48px,6vw,80px)'}}>
            <blockquote style={{
              fontFamily:'var(--font-cormorant, Georgia, serif)',
              fontWeight:300,
              fontSize:'clamp(28px,4vw,56px)',
              lineHeight:1.05,
              letterSpacing:'-0.025em',
              color:S.text,
              marginBottom:'32px',
            }}>
              This is not a strategic move.<br/>
              <em style={{color:S.amber}}>It is a dream, four times over.</em>
            </blockquote>
            <p style={{fontSize:'15px',lineHeight:1.75,color:S.text2,maxWidth:'520px',margin:'0 auto 32px'}}>
              Weil es Spaß macht. Weil man dazugehört. Weil man hilft. And because the best way to understand a system is to build one — in public, with people who care, for ten weeks in Berlin.
            </p>
            <a href="mailto:alicia.frommann@gmail.com" style={{
              display:'inline-flex',alignItems:'center',gap:'10px',
              padding:'14px 28px',
              background:S.green,
              color:'#08080A',
              borderRadius:'999px',
              fontSize:'12px',
              fontWeight:700,
              letterSpacing:'0.06em',
              textTransform:'uppercase' as const,
              textDecoration:'none',
              transition:'background .3s',
            }}>
              <span>Write to me</span><span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
