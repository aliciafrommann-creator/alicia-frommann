export default function PeakPlant() {
  return (
    <section id="peakplant" style={{padding:'var(--pad-y) var(--pad-x)',maxWidth:'1480px',margin:'0 auto',borderTop:'1px solid var(--line)'}}>

      <div style={{marginBottom:'clamp(56px,8vw,112px)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'32px',marginBottom:'clamp(28px,3vw,40px)',flexWrap:'wrap' as const}}>
          <span className="tag">§ 03 — Second project</span>
          <span style={{display:'inline-flex',alignItems:'center',gap:'8px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.02em'}}>
            <i style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--blue)',animation:'pulse 2s var(--ease-out) infinite',display:'inline-block'}} />
            Launching August 2026 · peak-plant.com
          </span>
        </div>
        <h2 className="display-2">
          <span className="reveal-line"><span>PeakPlant.</span></span>
          <span className="reveal-line"><span className="italic">safe. soft. wild.</span></span>
        </h2>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1.05fr',gap:'clamp(40px,6vw,96px)',alignItems:'start'}}>

        {/* Left */}
        <div>
          <p className="lede" style={{marginBottom:'48px',maxWidth:'520px'}}>
            Edition 01. 6 condoms. 6 reflection cards. 1 seed paper card. Made for the moments that stay with you — vegan, fair rubber latex, launching August 2026.
          </p>
          <p style={{fontSize:'14px',lineHeight:1.65,color:'var(--ink-2)',maxWidth:'480px',marginBottom:'40px'}}>
            PeakPlant lives at the same intersection as ThinkTogether: the belief that the quality of our inner life shapes everything we build together. ThinkTogether creates cognitive space for teams. PeakPlant creates emotional space for two people. Both work on the same thing — the willingness to be honest in a room with another person.
          </p>

          <ol style={{listStyle:'none',borderTop:'1px solid var(--line)',marginBottom:'36px'}}>
            {[
              { n:'01', h:'The product', p:'6 condoms. 6 reflection cards. 1 seed paper card. Each card: a question that opens something. Each edition: a different world.' },
              { n:'02', h:'The ritual', p:"Intimacy as practice. Not performance. The reflection cards invite the kind of conversation most couples want to have but don't know how to start." },
              { n:'03', h:'The brand', p:'safe. soft. wild. A visual and verbal language that treats the personal with the same rigor as the professional.' },
            ].map(({ n, h, p }) => (
              <li key={n} style={{padding:'26px 0',display:'grid',gridTemplateColumns:'56px 1fr',gap:'6px 16px',alignItems:'baseline',borderBottom:'1px solid var(--line)'}}>
                <span style={{gridRow:'1/3',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.04em',paddingTop:'4px'}}>{n}</span>
                <h3 style={{fontWeight:600,fontSize:'22px',letterSpacing:'-.015em',color:'var(--ink)'}}>{h}</h3>
                <p style={{fontSize:'14px',lineHeight:1.55,color:'var(--ink-2)',maxWidth:'460px'}}>{p}</p>
              </li>
            ))}
          </ol>

          <a href="https://peak-plant.com/en" target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex',alignItems:'center',gap:'10px',
            fontFamily:'var(--font-geist-mono)',fontSize:'13px',letterSpacing:'.02em',
            padding:'12px 18px',background:'var(--ink)',color:'var(--paper)',
            borderRadius:'999px',transition:'gap .3s var(--ease-soft),background .3s',textDecoration:'none',
          }}>
            <span>Visit peak-plant.com</span><span>↗</span>
          </a>
        </div>

        {/* Right */}
        <div style={{display:'flex',flexDirection:'column' as const,gap:'16px'}}>
          <div style={{background:'var(--paper)',border:'1px solid var(--line)',borderRadius:'12px',overflow:'hidden'}}>
            <div style={{padding:'12px 16px',borderBottom:'1px solid var(--line)',background:'var(--cream-2)',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.02em',display:'flex',justifyContent:'space-between'}}>
              <span>Beta feedback · edition 01</span>
              <span style={{color:'var(--blue)'}}>Stuttgart · München</span>
            </div>
            <div style={{padding:'32px',display:'flex',flexDirection:'column' as const,gap:'24px'}}>
              {[
                { quote:'“we hadn\'t talked like that in years. not because we didn\'t want to — we just didn\'t know how to start.”', loc:'— beta tester, stuttgart' },
                { quote:'“i\'m definitely part of the hook-up culture. but moments of real intimacy are just beautiful. i didn\'t know this could bring us even closer together.”', loc:'— beta tester, münchen' },
              ].map(({ quote, loc }, i) => (
                <div key={i} style={{paddingLeft:'16px',borderLeft:'2px solid var(--blue)'}}>
                  <p style={{fontSize:'15px',lineHeight:1.65,color:'var(--ink)',fontStyle:'italic',marginBottom:'8px'}}>{quote}</p>
                  <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.04em'}}>{loc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--line)',borderRadius:'12px',overflow:'hidden'}}>
            {[
              { n:'6', label:'condoms', sub:'vegan · fair rubber' },
              { n:'6', label:'reflection cards', sub:'one question each' },
              { n:'∞', label:'editions', sub:'same box · new world' },
            ].map(({ n, label, sub }) => (
              <div key={label} style={{padding:'24px 20px',background:'var(--paper)',textAlign:'center' as const}}>
                <div style={{fontWeight:600,fontSize:'48px',lineHeight:1,letterSpacing:'-.04em',color:'var(--ink)',marginBottom:'8px'}}>{n}</div>
                <div style={{fontSize:'13px',fontWeight:600,color:'var(--ink)',marginBottom:'4px'}}>{label}</div>
                <div style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--ink-3)',letterSpacing:'.04em'}}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
