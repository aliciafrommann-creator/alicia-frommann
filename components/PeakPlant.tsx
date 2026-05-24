const S = {
  bg:      '#08080A',
  bg2:     '#0F0F0D',
  border:  '#1C1C1A',
  border2: '#3A3935',
  text:    '#F0EAE0',
  text2:   '#857E74',
  text3:   '#3A3935',
  green:   '#6B9E5E',
}

export default function PeakPlant() {
  return (
    <section id="peakplant" style={{
      background: S.bg,
      borderTop: `1px solid ${S.border}`,
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px)',
    }}>
      <div style={{maxWidth:'1480px',margin:'0 auto'}}>

        {/* Tag + status */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'16px',marginBottom:'clamp(24px,3vw,40px)'}}>
          <span style={{fontSize:'11px',fontWeight:500,letterSpacing:'0.22em',textTransform:'uppercase' as const,color:S.green}}>
            § 03 — Second project
          </span>
          <span style={{display:'inline-flex',alignItems:'center',gap:'8px',fontSize:'11px',color:S.text2,letterSpacing:'0.04em',fontFamily:'var(--font-geist-mono)'}}>
            <i style={{width:'6px',height:'6px',borderRadius:'50%',background:S.green,display:'inline-block',animation:'pulse 2s ease-out infinite'}} />
            Launching August 2026 · peak-plant.com
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
          marginBottom: 'clamp(48px,7vw,96px)',
        }}>
          PeakPlant.<br/>
          <em style={{color:S.text2}}>safe. soft. wild.</em>
        </h2>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(40px,6vw,96px)',alignItems:'start'}}>

          {/* Left */}
          <div>
            <p style={{
              fontFamily: 'var(--font-cormorant, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px,2vw,26px)',
              lineHeight: 1.55,
              color: S.text2,
              marginBottom: '40px',
              maxWidth: '520px',
            }}>
              PeakPlant creates emotional space: in a very personal context, people experience that openness and vulnerability are not weakness — but the prerequisite for real connection. Edition 01. 6 condoms. 6 reflection cards. 1 seed paper card. Vegan, fair rubber latex. Launching August 2026.
            </p>
            <p style={{fontSize:'14px',lineHeight:1.75,color:S.text2,maxWidth:'480px',marginBottom:'40px'}}>
              PeakPlant lives at the same intersection as ThinkTogether: the belief that the quality of our inner life shapes everything we build together. ThinkTogether creates cognitive space for teams. PeakPlant creates emotional space for two people.
            </p>

            <ol style={{listStyle:'none',borderTop:`1px solid ${S.border}`,marginBottom:'40px'}}>
              {[
                { n:'01', h:'The product', p:'6 condoms. 6 reflection cards. 1 seed paper card. Each card: a question that opens something. Each edition: a different world inside the same box.' },
                { n:'02', h:'The ritual', p:"Intimacy as practice. Not performance. The reflection cards invite the kind of conversation most couples want to have but don't know how to start." },
                { n:'03', h:'The brand', p:'safe. soft. wild. A visual and verbal language that treats the personal with the same rigor as the professional.' },
              ].map(({ n, h, p }) => (
                <li key={n} style={{padding:'24px 0',display:'grid',gridTemplateColumns:'52px 1fr',gap:'4px 16px',borderBottom:`1px solid ${S.border}`}}>
                  <span style={{gridRow:'1/3',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:S.green,letterSpacing:'0.06em',paddingTop:'3px'}}>{n}</span>
                  <span style={{fontFamily:'var(--font-cormorant, Georgia, serif)',fontWeight:600,fontSize:'20px',letterSpacing:'-0.01em',color:S.text}}>{h}</span>
                  <span style={{fontSize:'13px',lineHeight:1.65,color:S.text2}}>{p}</span>
                </li>
              ))}
            </ol>

            <a href="https://peak-plant.com/en" target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex',alignItems:'center',gap:'10px',
              padding:'12px 20px',
              border:`1px solid ${S.border2}`,
              color:S.text,
              borderRadius:'999px',
              fontSize:'12px',
              letterSpacing:'0.04em',
              textDecoration:'none',
              transition:'border-color .3s',
            }}>
              <span>Visit peak-plant.com</span><span style={{color:S.green}}>↗</span>
            </a>
          </div>

          {/* Right — quotes + stats */}
          <div style={{display:'flex',flexDirection:'column' as const,gap:'16px'}}>

            {/* Beta quotes */}
            <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:'12px',padding:'32px',display:'flex',flexDirection:'column' as const,gap:'28px'}}>
              <div style={{fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase' as const,color:S.text3,marginBottom:'4px'}}>
                Beta feedback · edition 01
              </div>
              {[
                { quote:'"we hadn\'t talked like that in years. not because we didn\'t want to — we just didn\'t know how to start."', loc:'— beta tester, stuttgart' },
                { quote:'"i didn\'t know this could bring us even closer together."', loc:'— beta tester, münchen' },
              ].map(({ quote, loc }, i) => (
                <div key={i} style={{paddingLeft:'16px',borderLeft:`2px solid ${S.green}`}}>
                  <p style={{
                    fontFamily:'var(--font-cormorant, Georgia, serif)',
                    fontStyle:'italic',
                    fontSize:'18px',
                    lineHeight:1.55,
                    color:S.text,
                    marginBottom:'8px',
                  }}>{quote}</p>
                  <p style={{fontSize:'11px',color:S.text2,letterSpacing:'0.04em'}}>{loc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:S.border}}>
              {[
                { n:'6', label:'condoms', sub:'vegan · fair rubber' },
                { n:'6', label:'reflection cards', sub:'one question each' },
                { n:'∞', label:'editions', sub:'same box · new world' },
              ].map(({ n, label, sub }) => (
                <div key={label} style={{padding:'24px 20px',background:S.bg2,textAlign:'center' as const}}>
                  <div style={{fontFamily:'var(--font-cormorant, Georgia, serif)',fontWeight:300,fontSize:'52px',lineHeight:1,color:S.text,marginBottom:'8px'}}>{n}</div>
                  <div style={{fontSize:'12px',fontWeight:600,color:S.text,marginBottom:'4px',letterSpacing:'-0.01em'}}>{label}</div>
                  <div style={{fontSize:'10px',color:S.text2,letterSpacing:'0.04em'}}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
