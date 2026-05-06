export default function CTA() {
  return (
    <section className="cta" id="contact" data-screen-label="10 CTA">
      <span className="tag">07 Coordinates</span>
      <h2 className="display-1">
        <span className="reveal-line"><span>Let&apos;s build</span></span>
        <span className="reveal-line"><span>something <span className="italic">that matters.</span></span></span>
      </h2>
      <p className="lede center">
        I&apos;m applying to the Gründerszene Summer Internship because I want to be in a room with people who take building seriously.
        If that room is yours, here&apos;s how to find me.
      </p>
      <div className="cta-grid">
        <a href="mailto:alicia.frommann@gmail.com" className="cta-card" data-mag>
          <span className="cc-label">Email</span>
          <span className="cc-value">alicia.frommann@gmail.com</span>
          <span className="cc-arrow">↗</span>
        </a>
        <a href="https://linkedin.com/in/alicia-f-a4a21a224" target="_blank" rel="noopener noreferrer" className="cta-card" data-mag>
          <span className="cc-label">LinkedIn</span>
          <span className="cc-value">in/alicia-f-a4a21a224</span>
          <span className="cc-arrow">↗</span>
        </a>
        <a href="https://thinktogetherapp.vercel.app" target="_blank" rel="noopener noreferrer" className="cta-card" data-mag>
          <span className="cc-label">The product</span>
          <span className="cc-value">thinktogetherapp.vercel.app</span>
          <span className="cc-arrow">↗</span>
        </a>
      </div>
    </section>
  )
}
