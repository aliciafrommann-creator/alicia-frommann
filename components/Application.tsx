export default function Application() {
  return (
    <section id="application" style={{padding:'var(--pad-y) var(--pad-x)',maxWidth:'1480px',margin:'0 auto',borderTop:'1px solid var(--line)'}}>

      {/* Header */}
      <div style={{marginBottom:'clamp(56px,8vw,96px)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'32px',marginBottom:'clamp(28px,3vw,40px)',flexWrap:'wrap'}}>
          <span className="tag">§ 04 — Application</span>
          <span style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'7px 14px',border:'1px solid var(--blue)',borderRadius:'999px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.04em'}}>
            <i style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--blue)',animation:'pulse 2s ease-out infinite',display:'inline-block'}}></i>
            Gründerszene Startup-Sommercamp 2025
          </span>
        </div>
        <h2 className="display-2">
          <span className="reveal-line"><span>The idea I want</span></span>
          <span className="reveal-line"><span className="italic">to build in Berlin.</span></span>
        </h2>
        <p className="lede" style={{maxWidth:'640px',marginTop:'clamp(24px,3vw,40px)'}}>
          A gamified lifestyle platform that shifts how people consume — not by telling them what to do, but by making the better choice feel natural, social, and rewarding. Because it makes Spaß. Because you belong. Because you help.
        </p>
      </div>

      {/* The idea — two columns */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(40px,6vw,80px)',marginBottom:'clamp(64px,8vw,112px)',alignItems:'start'}}>
        <div>
          <div style={{borderTop:'1px solid var(--line)',paddingTop:'32px',marginBottom:'48px'}}>
            <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'16px'}}>The thesis</p>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.5,color:'var(--ink)',fontWeight:500,letterSpacing:'-.02em',marginBottom:'16px'}}>
              Duolingo proved that gamification + existing motivation scales to hundreds of millions. But Duolingo only reaches people who already want to learn Spanish.
            </p>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.5,color:'var(--blue)',fontWeight:500,letterSpacing:'-.02em',fontStyle:'italic'}}>
              This platform reaches people before they know they want to change.
            </p>
          </div>

          <div style={{borderTop:'1px solid var(--line)',paddingTop:'32px'}}>
            <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'24px'}}>How it works</p>
            <ol style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'20px'}}>
              {[
                { n:'01', t:'Challenges', d:'Weekly micro-challenges on environment, social justice, and local economy — low effort, high reward feeling. Streaks that build, not shame.' },
                { n:'02', t:'Teams', d:'Compete with friends and family. More active teammates = better reward multiplier. The social loop that drives viral growth without asking for it.' },
                { n:'03', t:'Brand Ecosystem', d:'Sustainable brands offer verified rewards for completed challenges. More users → more brand value → better rewards → more users. A real network effect.' },
                { n:'04', t:'AI Layer', d:'"I need a gift." "I need a t-shirt." "Where can I buy local?" The platform knows your values — CO₂, fair trade, local economy — and answers accordingly.' },
              ].map(({ n, t, d }) => (
                <li key={n} style={{display:'grid',gridTemplateColumns:'40px 1fr',gap:'4px 16px',alignItems:'baseline'}}>
                  <span style={{gridRow:'1/3',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.04em',paddingTop:'3px'}}>{n}</span>
                  <span style={{fontWeight:600,fontSize:'16px',color:'var(--ink)',letterSpacing:'-.01em'}}>{t}</span>
                  <span style={{fontSize:'14px',lineHeight:1.6,color:'var(--ink-2)'}}>{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Platform diagram */}
        <div>
          <div style={{background:'var(--paper)',border:'1px solid var(--line)',borderRadius:'12px',overflow:'hidden',marginBottom:'16px'}}>
            <div style={{padding:'12px 16px',borderBottom:'1px solid var(--line)',background:'var(--cream-2)',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.02em',display:'flex',justifyContent:'space-between'}}>
              <span>Platform logic · network effects</span>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--ink-4)',letterSpacing:'.08em',textTransform:'uppercase'}}>Concept</span>
            </div>
            <svg viewBox="0 0 560 420" style={{width:'100%',height:'auto',display:'block',background:'radial-gradient(circle at 50% 50%,rgba(29,79,255,.04),transparent 70%),var(--paper)'}}>
              <defs>
                <marker id="appArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="#1D4FFF"/>
                </marker>
              </defs>
              <path d="M 280 75 Q 430 75 470 190" stroke="#1D4FFF" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#appArr)"/>
              <path d="M 470 230 Q 430 345 280 345" stroke="#1D4FFF" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#appArr)"/>
              <path d="M 240 345 Q 90 345 90 230" stroke="#1D4FFF" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#appArr)"/>
              <path d="M 90 190 Q 90 75 240 75" stroke="#1D4FFF" strokeWidth="1.4" fill="none" strokeDasharray="5 4" markerEnd="url(#appArr)"/>
              <text x="415" y="120" fontFamily="monospace" fontSize="9" fill="#1D4FFF" letterSpacing="1" textAnchor="middle">more users →</text>
              <text x="415" y="310" fontFamily="monospace" fontSize="9" fill="#1D4FFF" letterSpacing="1" textAnchor="middle">better rewards</text>
              <text x="143" y="310" fontFamily="monospace" fontSize="9" fill="#1D4FFF" letterSpacing="1" textAnchor="middle">more brands</text>
              <text x="143" y="120" fontFamily="monospace" fontSize="9" fill="#1D4FFF" letterSpacing="1" textAnchor="middle">brand value ↑</text>
              <circle cx="280" cy="210" r="72" fill="none" stroke="#1D4FFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
              <circle cx="280" cy="210" r="40" fill="var(--paper)" stroke="#1A1A1A" strokeWidth="1.6"/>
              <text x="280" y="206" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#1A1A1A" letterSpacing="1.5">NETWORK</text>
              <text x="280" y="222" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#1D4FFF" letterSpacing="1.5">EFFECT</text>
              {[
                { x:280, y:55, label:'Users', sub:'conscious consumers' },
                { x:490, y:210, label:'Brands', sub:'sustainable partners' },
                { x:280, y:365, label:'Rewards', sub:'vouchers + impact' },
                { x:70, y:210, label:'Teams', sub:'social + viral' },
              ].map(({ x, y, label, sub }) => (
                <g key={label} transform={`translate(${x},${y})`}>
                  <circle r="42" fill="rgba(29,79,255,.05)"/>
                  <circle r="26" fill="var(--paper)" stroke="var(--blue)" strokeWidth="1.4"/>
                  <text y="-36" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#1A1A1A" letterSpacing="1" fontWeight="600">{label}</text>
                  <text y="-24" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#888888" letterSpacing="0.5">{sub}</text>
                </g>
              ))}
            </svg>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
            {['Next.js 14','Supabase','Anthropic API','QR Partnerships','Vercel','10 weeks'].map(t => (
              <span key={t} style={{padding:'6px 12px',background:'var(--paper)',border:'1px solid var(--line)',borderRadius:'999px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-2)',letterSpacing:'.02em'}}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Why Berlin */}
      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,80px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'clamp(24px,3vw,40px)'}}>
          Why Berlin · Why now · Why this.
        </p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--line)',marginBottom:'clamp(48px,5vw,72px)'}}>
          {[
            {
              n:'01',
              title:'Connect.',
              body:'I build mostly alone — evenings, weekends, between lectures. Berlin is where the builders are. Ten weeks in a room that pulls me forward instead of keeping me comfortable.',
            },
            {
              n:'02',
              title:'Find my co-founder.',
              body:'ThinkTogether needs a technical co-founder. Not a LinkedIn connection — someone I build with, argue with, trust. The kind of person who shows up in Berlin in July to make something real.',
            },
            {
              n:'03',
              title:'Build in public.',
              body:"Direct feedback. Full focus. The pressure of shipping in front of people who care. This is not a risk for me. It's the exact condition in which I learn fastest.",
            },
          ].map(({ n, title, body }) => (
            <div key={n} style={{padding:'clamp(28px,4vw,48px)',background:'var(--paper)'}}>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.08em',display:'block',marginBottom:'20px'}}>{n} /</span>
              <h3 style={{fontWeight:600,fontSize:'clamp(22px,2.5vw,32px)',letterSpacing:'-.025em',color:'var(--ink)',lineHeight:1.1,marginBottom:'16px',fontStyle:'italic'}}>{title}</h3>
              <p style={{fontSize:'14px',lineHeight:1.65,color:'var(--ink-2)'}}>{body}</p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center',paddingBottom:'clamp(48px,6vw,80px)'}}>
          <p style={{fontSize:'clamp(20px,2vw,28px)',lineHeight:1.4,color:'var(--ink)',fontWeight:500,letterSpacing:'-.02em',marginBottom:'24px'}}>
            This is not a strategic move.<br/>
            <span style={{color:'var(--blue)',fontStyle:'italic'}}>It is a dream, four times over.</span>
          </p>
          <p style={{fontSize:'15px',lineHeight:1.75,color:'var(--ink-2)',maxWidth:'560px',margin:'0 auto 32px'}}>
            Weil es Spaß macht. Weil man dazugehört. Weil man hilft. And because the best way to understand a system is to build one — in public, with people who care, for ten weeks in Berlin.
          </p>
          <a href="mailto:alicia.frommann@gmail.com"
            style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'14px 24px',background:'var(--blue)',color:'var(--paper)',borderRadius:'999px',fontSize:'14px',fontWeight:500,textDecoration:'none',transition:'background .3s,gap .3s'}}>
            <span>Write to me</span><span>→</span>
          </a>
        </div>
      </div>

    </section>
  )
}
