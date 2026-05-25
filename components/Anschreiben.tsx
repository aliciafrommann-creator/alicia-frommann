export default function Anschreiben() {
  return (
    <section id="anschreiben" style={{padding:'var(--pad-y) var(--pad-x)',maxWidth:'1480px',margin:'0 auto',borderTop:'1px solid var(--line)'}}>

      <div className="section-head">
        <span className="tag">§ 01 — Anschreiben</span>
        <span style={{display:'inline-flex',alignItems:'center',gap:'8px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.02em'}}>
          <i style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--blue)',animation:'pulse 2s var(--ease-out) infinite',display:'inline-block'}} />
          Gründerszene Startup-Sommercamp 2025
        </span>
      </div>

      <h2 className="display-2">
        <span className="reveal-line"><span>Diese Website</span></span>
        <span className="reveal-line"><span className="italic">ist meine Bewerbung.</span></span>
      </h2>

      <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.06em',lineHeight:1.9,marginBottom:'clamp(32px,4vw,56px)'}}>
        An: Gründerszene · Axel Springer SE · Berlin<br/>
        Von: Alicia Frommann · Innsbruck · Mai 2026
      </p>

      <div style={{height:'1px',background:'var(--line)',marginBottom:'clamp(32px,4vw,56px)'}} />

      <div style={{maxWidth:'760px',marginBottom:'clamp(48px,6vw,80px)'}}>
        <p className="lede" style={{marginBottom:'clamp(24px,3vw,36px)'}}>
          I don’t lead with what I’ve built. I lead with what I believe — because that’s the part that doesn’t change when the roadmap does.
        </p>

        <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'clamp(16px,2vw,24px)'}}>
          I believe the world changes not through better information, but through better systems. Systems that make the right choice the easy choice. The rewarding choice. The social choice. I’ve believed this since I started studying systems thinking — and for a long time, I kept that belief at a safe intellectual distance.
        </p>

        <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'clamp(16px,2vw,24px)'}}>
          What changed is that I stopped waiting for permission to live it operationally. Two ideas are taking shape:{' '}
          <a href="#thinktogether" style={{color:'var(--ink)',borderBottom:'1px solid var(--line)',textDecoration:'none',paddingBottom:'1px'}}>ThinkTogether</a>
          {' '}— tested with real teams at the Center of Entrepreneurship at ESB Business School Reutlingen and Robert Bosch GmbH, actively looking for a technical co-founder. And{' '}
          <a href="#peakplant" style={{color:'var(--ink)',borderBottom:'1px solid var(--line)',textDecoration:'none',paddingBottom:'1px'}}>PeakPlant</a>
          {' '}— in conversations with suppliers, close to market. Both are experiments in the same thesis. Neither is the application you’re reading right now.
        </p>

        <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'clamp(16px,2vw,24px)'}}>
          Since the end of my Abitur, I’ve had a third idea I keep returning to. Every time I shop online — which is most of the time, because it’s fast and frictionless — I feel the gap between what I value and what I do. I know that every order from a big chain is one less sale for a small business that might carry the same thing, made better, by someone I could actually support. Ecologically. Socially. Economically. I know. And I click anyway.
        </p>

        <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'clamp(16px,2vw,24px)'}}>
          That gap — between knowing and doing — is the product. Not a sustainability app. A platform that makes the better choice feel like winning. The way Too Good To Go made reducing food waste feel like getting a deal. The way Strava made running feel like belonging. Streaks. Challenges. Real rewards from real small brands. An AI that knows whether you care more about CO₂, fair wages, or keeping money in your city — and finds the right option accordingly.
        </p>

        <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'clamp(24px,3vw,40px)'}}>
          The goal is not better consumer behavior. It’s changed mental models — primed, subtly, through experience. Until the gap between what people value and what they do gets smaller. Not through lectures.{' '}
          <a href="#application" style={{color:'var(--blue)',borderBottom:'1px solid var(--blue)',textDecoration:'none',paddingBottom:'1px'}}>Through a platform that makes the right choice the obvious one.</a>
        </p>

        <p style={{fontStyle:'italic',fontSize:'clamp(18px,1.8vw,24px)',lineHeight:1.55,color:'var(--blue)',letterSpacing:'-.01em'}}>
          Weil es Spaß macht. Weil man dazugehört. Weil man hilft.
        </p>
      </div>

      <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',letterSpacing:'.1em',textTransform:'uppercase' as const,color:'var(--ink-3)',marginBottom:'24px'}}>
        Was dich erwartet — klick dich durch
      </p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1px',background:'var(--line)',marginBottom:'clamp(48px,6vw,80px)'}}>
        {[
          {href:'#thinktogether',tag:'§ 02',title:'ThinkTogether',desc:'AI-gestützte SaaS-Plattform für systemisches Denken. Live. Pilot-Testing mit ESB Business School Reutlingen und Robert Bosch GmbH.',cta:'Zum Produkt →'},
          {href:'#peakplant',tag:'§ 03',title:'PeakPlant',desc:'Premium Intimacy Brand. Edition 01 launching August 2026. 6 condoms. 6 reflection cards. 1 seed paper card.',cta:'Zur Brand →'},
          {href:'#application',tag:'§ 04',title:'Application',desc:'Die Plattform die ich in Berlin bauen möchte — vollständig: Mechanic, Business Model, Cold Start, 10-Wochen-Plan.',cta:'Zur Bewerbung →'},
          {href:'#how',tag:'§ 05–09',title:'Who I am',desc:'Eisbergmodell. Wie ich arbeite. Werte. Curriculum Vitae. Alle Schichten — von der Oberfläche bis zum Fundament.',cta:'Zur Person →'},
        ].map(({href,tag,title,desc,cta})=>(
          <a key={tag} href={href} className="cta-card" style={{background:'var(--paper)',padding:'clamp(28px,4vw,48px)',display:'flex',flexDirection:'column' as const,gap:'10px',textDecoration:'none',transition:'background .3s'}}>
            <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',letterSpacing:'.1em',textTransform:'uppercase' as const,color:'var(--ink-3)'}}>{tag}</span>
            <span style={{fontSize:'clamp(20px,2vw,28px)',fontWeight:600,letterSpacing:'-.02em',color:'var(--ink)',lineHeight:1.1}}>{title}</span>
            <span style={{fontSize:'14px',lineHeight:1.65,color:'var(--ink-2)'}}>{desc}</span>
            <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.04em',marginTop:'4px'}}>{cta}</span>
          </a>
        ))}
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'16px',borderTop:'1px solid var(--line)',paddingTop:'32px'}}>
        <div>
          <p style={{fontSize:'18px',fontWeight:500,fontStyle:'italic',color:'var(--ink)',marginBottom:'4px',letterSpacing:'-.01em'}}>Alicia Frommann</p>
          <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.06em'}}>Innsbruck · Mai 2026</p>
        </div>
        <a href="#application" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 20px',border:'1px solid var(--blue)',color:'var(--blue)',borderRadius:'999px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',letterSpacing:'.06em',textDecoration:'none',transition:'background .2s, color .2s'}}>
          Zur Bewerbung <span>→</span>
        </a>
      </div>

    </section>
  )
}
