export default function Values() {
  return (
    <section id="values" style={{ borderTop:'1px solid var(--line)' }}>
      <span className="tag" style={{ display:'block', padding:'clamp(60px,8vw,100px) var(--pad-x) 0' }}>§ 06 — Three points of the compass</span>

      {[{
        num:'i.', word:'Freedom', accent:false,
        text:'Not the cheap kind — the kind that costs you something. The right of every person to author their own life inside the constraints they did not choose. Most of my work is making the constraints visible, so what’s left can actually be chosen.',
      },{
        num:'ii.', word:'Love', accent:true,
        text:'The technical word for taking another person seriously. In organizations this looks like listening past the agenda. In design it looks like refusing the lazy default. It is the most underrated method in the change management literature.',
      },{
        num:'iii.', word:'Justice', accent:false,
        text:'Distribution is not an afterthought of the design — it is the design. Whose feedback enters the loop? Whose names appear on the org chart? Who is in the room when the metric gets chosen?',
      }].map((v, i) => (
        <article key={i} style={{
          borderBottom:'1px solid var(--line)',
          padding:'clamp(60px,8vw,100px) var(--pad-x)',
          display:'grid', gridTemplateColumns:'80px 1fr', gap:'0 clamp(32px,5vw,72px)', alignItems:'baseline',
        }}>
          <span style={{ fontFamily:'var(--font-geist-mono)', fontSize:13, color:'var(--ink-3)', letterSpacing:'.04em', paddingTop:8 }}>{v.num}</span>
          <div>
            <h2 style={{
              fontFamily:'var(--font-geist)', fontWeight:600,
              fontSize:'clamp(56px,11vw,160px)', lineHeight:.92, letterSpacing:'-.04em',
              color: v.accent ? 'var(--blue)' : 'var(--ink)',
              fontStyle: v.accent ? 'italic' : undefined,
              marginBottom:'clamp(28px,3vw,40px)',
              overflow:'hidden', paddingBottom:'.1em',
            }}>
              <span style={{ display:'inline-block' }}>{v.word}</span>
            </h2>
            <p style={{ fontSize:'clamp(15px,1.2vw,18px)', lineHeight:1.65, color:'var(--ink-2)', maxWidth:680 }}>{v.text}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
