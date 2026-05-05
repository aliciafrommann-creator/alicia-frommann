export default function CTA() {
  return (
    <section id="contact" style={{ padding:'var(--pad-y) var(--pad-x)', maxWidth:1480, margin:'0 auto', borderTop:'1px solid var(--line)' }}>
      <span className="tag" style={{ marginBottom:'clamp(28px,4vw,48px)', display:'block' }}>§ 07 — Coordinates</span>

      <h2 className="display-1" style={{ marginBottom:'clamp(40px,5vw,60px)' }}>
        <span className="reveal-line"><span>Let’s build</span></span>
        <span className="reveal-line"><span>something <span className="italic" style={{ color:'var(--blue)' }}>that matters.</span></span></span>
      </h2>

      <p className="lede center" style={{ marginBottom:'clamp(48px,6vw,72px)' }}>
        I’m applying to the Gründerszene Summer Internship because I want to be in a room with people who take building seriously. If that room is yours, here’s how to find me.
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line)' }}>
        {[{
          href:'mailto:alicia.frommann@gmail.com',
          label:'Email', value:'alicia.frommann@gmail.com', arrow:'→', external:false,
        },{
          href:'https://linkedin.com/in/alicia-f-a4a21a224',
          label:'LinkedIn', value:'/in/alicia-f-a4a21a224', arrow:'↗', external:true,
        },{
          href:'https://thinktogetherapp.vercel.app',
          label:'The product', value:'thinktogetherapp.vercel.app', arrow:'↗', external:true,
        }].map(c => (
          <a key={c.href}
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noopener noreferrer' : undefined}
            style={{
              background:'var(--paper)', padding:'clamp(28px,4vw,44px)',
              display:'flex', flexDirection:'column', gap:10,
              transition:'background .3s',
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--cream-2)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='var(--paper)'}}>
            <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:10, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink-3)' }}>{c.label}</span>
            <span style={{ fontFamily:'var(--font-geist)', fontWeight:500, fontSize:'clamp(15px,1.4vw,20px)', color:'var(--ink)', letterSpacing:'-.01em' }}>{c.value}</span>
            <span style={{ marginTop:'auto', fontSize:20, color:'var(--blue)' }}>{c.arrow}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
