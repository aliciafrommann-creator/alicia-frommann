const ROLES = [
  { year: '2025 – Now', title: 'Founder', titleItalic: true, org: 'ThinkTogether · Solo · Innsbruck', line: 'Building software for groups to think together about the systems they\'re inside of.', tag: 'Active' },
  { year: '2025 – Now', title: 'Consultant', org: 'Mücke Roth & Company · Munich', line: 'End-to-end service & sales transformation in the energy sector.' },
  { year: '2024 – Now', title: 'M.Sc. Digital Business', org: 'MCI Innsbruck · GPA 1.3', line: 'Sustainable innovation, data, and the messy interior of digital transformation.' },
  { year: '04/24 – 12/24', title: 'Working Student, CPM', org: 'Robert Bosch GmbH · Stuttgart', line: 'Redesigned global Product Management structures across Mobility BUs and regions.' },
  { year: '02/23 – 08/23', title: 'Intern, Transformation & Leadership', org: 'Robert Bosch GmbH', line: 'Designed the Peer-to-Peer Change Lab — a workshop format for managers translating strategy into practice.' },
  { year: '08/23 – 02/24', title: 'Exchange Semester', org: 'LAB University, Finland · GPA 1.0', line: 'Forests, saunas, and the Nordic version of leadership theory.' },
  { year: '2021 – 2025', title: 'B.Sc. International Business', org: 'ESB Business School · Reutlingen', line: 'Strategic focus, sustainability seat on student initiative IB Vision.' },
]

export default function Journey() {
  return (
    <section className="journey" id="journey" data-screen-label="08 Journey">
      <div className="journey-pin" id="journeyPin">
        <div className="journey-head">
          <span className="tag">05 Curriculum vitae</span>
          <h2 className="display-2">
            <span className="reveal-line"><span>The path,</span></span>{' '}
            <span className="reveal-line"><span className="italic">so far.</span></span>
          </h2>
        </div>
        <div className="journey-track" id="journeyTrack">
          <div className="journey-rail"/>
          {ROLES.map((r, i) => (
            <article className="role" key={i}>
              <span className="role-year">{r.year}</span>
              <h3 className="role-title">{r.titleItalic ? <span className="italic">Founder</span> : null}{r.titleItalic ? ', ThinkTogether' : r.title}</h3>
              <span className="role-org">{r.org}</span>
              <p className="role-line">{r.line}</p>
              {r.tag && <span className="role-tag">{r.tag}</span>}
            </article>
          ))}
          <div className="role role-end">
            <span className="end-glyph"/>
            <p>Origin <span className="italic">Plochingen</span>.<br/>Heading anywhere the systems are still soft enough to&nbsp;move.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
