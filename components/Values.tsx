const VALUES = [
  {
    num: 'i.',
    word: 'Freedom',
    accent: false,
    text: 'Not the cheap kind — the kind that costs you something. The right of every person to author their own life inside the constraints they did not choose. Most of my work is making the constraints visible, so what\'s left can actually be chosen.',
  },
  {
    num: 'ii.',
    word: 'Love',
    accent: true,
    text: 'The technical word for taking another person seriously. In organizations this looks like listening past the agenda. In design it looks like refusing the lazy default. It is the most underrated method in the change management literature.',
  },
  {
    num: 'iii.',
    word: 'Justice',
    accent: false,
    text: 'Distribution is not an afterthought of the design — it is the design. Whose feedback enters the loop? Whose names appear on the org chart? Who is in the room when the metric gets chosen?',
  },
]

export default function Values() {
  return (
    <section className="values" id="values" data-screen-label="09 Values">
      <span className="tag values-tag">06 Three points of the compass</span>
      {VALUES.map(v => (
        <article className="value" key={v.word}>
          <div className="value-num">{v.num}</div>
          <h2 className={`value-word${v.accent ? ' value-accent' : ''}`}>
            <span className="vw-clip"><span className={v.accent ? 'italic' : ''}>{v.word}</span></span>
          </h2>
          <p className="value-text">{v.text}</p>
        </article>
      ))}
    </section>
  )
}
