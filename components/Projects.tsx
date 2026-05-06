'use client'
import { useState } from 'react'

const PROJECTS = [
  {
    id: 'thinktogether',
    num: '01',
    title: 'ThinkTogether',
    role: 'Founder & Builder',
    period: '2025 – now',
    tag: 'Active',
    tagBlue: true,
    short: 'A SaaS platform that turns messy team conversations into shared causal loop diagrams — so groups can argue with the system, not with each other.',
    detail: 'Built with Next.js, Supabase, Anthropic API and D3. Voice and text input gets parsed into variables and causal links. The diagram builds itself in real time. Reinforcing loops in blue, balancing loops in coral. Teams can run interventions on the model before running them on people.',
    url: 'https://thinktogetherapp.vercel.app',
    urlLabel: 'thinktogetherapp.vercel.app',
    chips: ['Next.js', 'Supabase', 'Anthropic', 'D3', 'TypeScript'],
  },
  {
    id: 'dkms',
    num: '02',
    title: 'DKMS',
    role: 'Volunteer Activist',
    period: '2019 – 2023',
    tag: 'Social Impact',
    short: 'Organized donor registration drives at universities and events across Baden-Württemberg. Reached over 400 potential stem cell donors.',
    detail: 'DKMS is the world\'s largest bone marrow donor center. I ran registration tables, trained new volunteers, and learned early what it means to activate people toward something that costs them something — a blood draw, a swab, a maybe. That lesson shows up everywhere in my work on participation and consent.',
    chips: ['Community organizing', 'Activation', 'Social impact'],
  },
  {
    id: 'podcast',
    num: '03',
    title: 'UNESCO Chair Podcast',
    role: 'Producer & Host',
    period: '2023 – 2024',
    tag: 'Storytelling',
    short: 'Produced a podcast series for the UNESCO Chair at ESB Business School — long-form conversations about sustainability, education, and the future of business.',
    detail: 'Researched guests, wrote interview frameworks, recorded and edited in GarageBand, and published the series. Learned that a good question is not a question at all — it\'s an invitation. The format forced me to listen more slowly and speak more precisely. Both are now non-negotiable in my consulting work.',
    chips: ['GarageBand', 'Long-form interview', 'Sustainability', 'ESB Reutlingen'],
  },
  {
    id: 'cvjm',
    num: '04',
    title: 'CVJM Plochingen',
    role: 'Youth Leader',
    period: '2016 – 2021',
    tag: 'Community',
    short: 'Led weekly youth groups, organized camps, and built a small community that lasted well beyond my own involvement.',
    detail: 'Five years of showing up every Friday. Planning retreats, running group dynamics, mediating conflict, writing programs. My first experience of being responsible for a room — and for the people in it. The skills I use now in workshops (holding tension, naming what\'s unspoken, designing for safety) started here.',
    chips: ['Youth leadership', 'Community building', 'Event planning'],
  },
  {
    id: 'skiclub',
    num: '05',
    title: 'Skiclub Plochingen',
    role: 'Active Member & Trainer',
    period: '2014 – now',
    tag: 'Movement',
    short: 'Competed in alpine racing, then shifted to coaching younger athletes — teaching edge control, fear management, and reading terrain.',
    detail: 'Racing taught me that speed comes from relaxation, not force. Coaching taught me that the same is true for people. I now trail-run 40–50 km a week and treat mountain terrain the same way I treat complex systems: you don\'t conquer them, you read them, respect their logic, and move with them.',
    chips: ['Alpine racing', 'Coaching', 'Trail running'],
  },
]

export default function Projects() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="projects" id="projects" data-screen-label="03b Projects">
      <div className="section-head">
        <span className="tag">02b Projects &amp; involvement</span>
        <h2 className="display-2">
          <span className="reveal-line"><span>More than</span></span>{' '}
          <span className="reveal-line"><span className="italic">one line of work.</span></span>
        </h2>
        <p className="lede">The CV shows the roles. This shows the rest — the organizations I built things inside of, the communities I chose to be responsible for, the work that didn&apos;t come with a title.</p>
      </div>
      <div className="proj-grid">
        {PROJECTS.map(p => (
          <article
            key={p.id}
            className={`proj-card${open === p.id ? ' is-open' : ''}`}
            onClick={() => setOpen(open === p.id ? null : p.id)}
          >
            <div className="proj-top">
              <div className="proj-meta">
                <span className="proj-num">{p.num}</span>
                <span className={`proj-tag${p.tagBlue ? ' proj-tag--blue' : ''}`}>{p.tag}</span>
              </div>
              <div className="proj-chevron">{open === p.id ? '−' : '+'}</div>
            </div>
            <h3 className="proj-title">{p.title}</h3>
            <div className="proj-sub">
              <span className="proj-role">{p.role}</span>
              <span className="proj-period">{p.period}</span>
            </div>
            <p className="proj-short">{p.short}</p>
            {open === p.id && (
              <div className="proj-detail">
                <p>{p.detail}</p>
                <div className="proj-chips">
                  {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-link" onClick={e => e.stopPropagation()}>
                    {p.urlLabel} ↗
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
