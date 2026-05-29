'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { LoopDiagram } from './LoopDiagram'

const mono = 'var(--font-geist-mono)'

const ecosystemStakeholders = [
  {
    name: 'Users',
    give: 'complete rituals',
    get: 'identity, streaks, rewards',
    next: 'Friends see proof that participation feels good.',
  },
  {
    name: 'Friend groups',
    give: 'shared missions',
    get: 'rituals and memories',
    next: 'Team streaks make return behavior social.',
  },
  {
    name: 'Communities',
    give: 'missions and events',
    get: 'belonging and energy',
    next: 'More openings make the map feel alive.',
  },
  {
    name: 'Local shops',
    give: 'rewards or rituals',
    get: 'real visits, not ads',
    next: 'Local reinforcement makes completion feel tangible.',
  },
  {
    name: 'Universities',
    give: 'student groups',
    get: 'belonging and identity',
    next: 'Dense groups create repeatable test environments.',
  },
  {
    name: 'Cities',
    give: 'district context',
    get: 'participation without surveillance',
    next: 'The city becomes easier to join.',
  },
]

const reinforcingLoops = [
  {
    title: 'Individual ritual loop',
    short: 'Solo value first.',
    steps: ['Weekly motto', 'small ritual', 'personal streak', 'better next challenge'],
    result: 'The app is useful before the network is big.',
    proof: 'Be present -> 20-minute walk -> 3-day streak -> next mission fits better',
  },
  {
    title: 'Team loop',
    short: 'Friends make it sticky.',
    steps: ['Team mission', 'completion', 'group streak', 'shared memory', 'return behavior'],
    result: 'Participation becomes something people protect together.',
    proof: 'Flatmates accept sunset walk -> streak stays alive -> someone invites again tomorrow',
  },
  {
    title: 'Community loop',
    short: 'The city creates openings.',
    steps: ['Club or shop event', 'map discovery', 'join', 'local reward or ritual'],
    result: 'Communities and shops become ways into real life, not ad slots.',
    proof: 'Run club or cafe ritual appears nearby -> join -> save -> repeat',
  },
  {
    title: 'Trust loop',
    short: 'Safety creates repetition.',
    steps: ['Privacy choice', 'safe participation', 'confidence', 'repeated use'],
    result: 'People come back because they stay in control.',
    proof: 'Private by default -> post only after completion -> choose friends, team or community',
  },
]

const trustPrinciples = [
  {
    title: 'User control',
    line: 'You decide what you see and who sees what.',
    details: ['private by default', 'post only after completion', 'friends, team, community or public'],
  },
  {
    title: 'AI boundary',
    line: 'AI serves the user, not advertisers.',
    details: ['no paid interruption', 'calendar and location optional', 'AI should know when not to nudge'],
  },
  {
    title: 'Map boundary',
    line: 'The map reveals opportunities, not people.',
    details: ['events, missions and shared posts', 'no exact public live location', 'mute communities anytime'],
  },
  {
    title: 'Reward boundary',
    line: 'Rewards reinforce participation, not ads.',
    details: ['earned through streaks', 'local partners get real visits', 'shops host or reward, not interrupt'],
  },
  {
    title: 'Care boundary',
    line: 'Participation OS should never gamify distress.',
    details: ['no diagnosis', 'no harmful missions', 'pause nudges and route toward care if signals are sensitive'],
  },
]

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: mono, fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '18px' }}>
      {children}
    </p>
  )
}

function MiniPills({ items, active = 0 }: { items: string[], active?: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {items.map((item, i) => (
        <span key={item} style={{
          padding: '5px 10px',
          borderRadius: '999px',
          border: `1px solid ${i === active ? 'rgba(29,79,255,0.28)' : 'var(--line)'}`,
          background: i === active ? 'rgba(29,79,255,0.08)' : 'transparent',
          color: i === active ? 'var(--blue)' : 'var(--ink-3)',
          fontFamily: mono,
          fontSize: '10px',
          lineHeight: 1.3,
        }}>
          {item}
        </span>
      ))}
    </div>
  )
}

function SystemMapSection() {
  const [active, setActive] = useState(0)
  const loop = reinforcingLoops[active]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>04 / Retention logic</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>
        A few loops make people come back.
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '22px' }}>
        The product is not endless customization. It is a small set of reinforcing loops: solo value, social momentum, city discovery and trust.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '12px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          {reinforcingLoops.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              className="po-soft-action"
              style={{
                textAlign: 'left',
                background: active === i ? 'rgba(29,79,255,0.08)' : 'var(--paper)',
                border: `1px solid ${active === i ? 'rgba(29,79,255,0.22)' : 'var(--line)'}`,
                borderRadius: '14px',
                padding: '16px',
              }}
            >
              <p style={{ fontFamily: mono, fontSize: '10px', color: active === i ? 'var(--blue)' : 'var(--ink-3)', letterSpacing: '0.08em', marginBottom: '8px' }}>{String(i + 1).padStart(2, '0')} / {item.short}</p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{item.title}</p>
            </button>
          ))}
        </div>
        <div className="po-interactive-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '18px', padding: 'clamp(20px,3vw,30px)', minHeight: '330px' }}>
          <p style={{ fontFamily: mono, fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Loop {String(active + 1).padStart(2, '0')}</p>
          <h3 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '22px' }}>{loop.title}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            {loop.steps.map((step, i) => (
              <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '8px 11px',
                  borderRadius: '999px',
                  background: i === 0 ? 'var(--blue)' : 'rgba(29,79,255,0.07)',
                  color: i === 0 ? 'var(--paper)' : 'var(--blue)',
                  border: '1px solid rgba(29,79,255,0.16)',
                  fontFamily: mono,
                  fontSize: '10px',
                }}>{step}</span>
                {i < loop.steps.length - 1 && <span style={{ color: 'var(--blue)', opacity: 0.45 }}>→</span>}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.35, marginBottom: '12px' }}>{loop.result}</p>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, paddingLeft: '14px', borderLeft: '2px solid rgba(29,79,255,0.24)' }}>{loop.proof}</p>
          <div style={{ marginTop: '24px', height: '8px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', overflow: 'hidden' }}>
            <div style={{ width: `${25 + active * 25}%`, height: '100%', borderRadius: '999px', background: 'var(--blue)', transition: 'width .35s var(--ease-soft)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function IcebergLoopSection() {
  const layers = [
    {
      num: '01', pct: '10%', label: 'Features',
      title: 'What people see',
      body: 'Missions, feed posts, map events, streaks and rewards. This is the visible app surface.',
      tierY: 0, tierH: 200,
    },
    {
      num: '02', pct: '20%', label: 'Behavior',
      title: 'What keeps happening',
      body: 'People repeat small actions, complete weekly challenges and come back because progress becomes visible.',
      tierY: 200, tierH: 115,
    },
    {
      num: '03', pct: '25%', label: 'Social system',
      title: 'What reinforces it',
      body: 'Friends, teams, communities and local partners turn individual action into shared rituals and real-world opportunities.',
      tierY: 315, tierH: 138,
    },
    {
      num: '04', pct: '25%', label: 'Identity',
      title: 'Why people return',
      body: 'The user is not told to be sustainable. They start to see themselves as someone who participates, shows up and belongs.',
      tierY: 453, tierH: 112,
    },
    {
      num: '05', pct: '20%', label: 'Purpose',
      title: 'What the system is for',
      body: 'A different optimization goal: not more attention, but more presence, coordination, aliveness and local participation.',
      tierY: 565, tierH: 90,
    },
  ]
  const icePath = 'M 240,20 L 188,68 L 207,96 L 156,148 L 177,194 L 96,200 C 40,295 12,408 54,508 C 96,600 172,648 240,655 C 308,648 384,600 426,508 C 468,408 440,295 384,200 L 305,194 L 326,148 L 275,96 L 294,68 Z'
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const current = hovered ?? active

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>03 / Open gap</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, maxWidth: '760px', marginBottom: '12px' }}>
        Features are not enough. The loop is what changes behavior.
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '760px', marginBottom: '32px' }}>
        A mission, a feed post or a reward is only the surface. Underneath are the structures that make participation repeat: identity, belonging, timing, trust and local opportunity.
      </p>
      <div className="ice-stage" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px,430px) 1fr', gap: 'clamp(28px,5vw,72px)', alignItems: 'start' }}>
        <svg viewBox="0 0 480 680" style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}>
          <defs>
            <clipPath id="participation-ice-clip"><path d={icePath} /></clipPath>
            <linearGradient id="participation-ice-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF8F3" />
              <stop offset="55%" stopColor="#EEF2FF" />
              <stop offset="100%" stopColor="#DCE5FF" />
            </linearGradient>
            <linearGradient id="participation-ice-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(29,79,255,0.13)" />
              <stop offset="100%" stopColor="rgba(29,79,255,0.03)" />
            </linearGradient>
          </defs>
          <rect x="0" y="200" width="480" height="480" fill="url(#participation-ice-water)" />
          <path d={icePath} fill="url(#participation-ice-fill)" stroke="rgba(10,14,26,0.14)" strokeWidth="1.5" />
          <g clipPath="url(#participation-ice-clip)">
            {layers.map((l, i) => (
              <rect key={l.label} x="0" y={l.tierY} width="480" height={l.tierH}
                fill={current === i ? 'rgba(29,79,255,0.20)' : 'transparent'}
                style={{ transition: 'fill 0.3s ease', cursor: 'pointer' }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </g>
          {[200, 315, 453, 565].map(y => <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(10,14,26,0.08)" strokeWidth="1" clipPath="url(#participation-ice-clip)" />)}
          <line x1="0" y1="200" x2="480" y2="200" stroke="var(--blue)" strokeWidth="1" strokeDasharray="5 4" strokeOpacity="0.5" />
          <text x="8" y="194" fontFamily="monospace" fontSize="9" fill="var(--blue)" fillOpacity="0.6" letterSpacing="1.5">WATERLINE</text>
          <text x="472" y="194" fontFamily="monospace" fontSize="9" fill="var(--blue)" fillOpacity="0.6" textAnchor="end" letterSpacing="1.5">VISIBLE APP</text>
          {layers.map((l, i) => (
            <text key={l.label} x="240" y={l.tierY + l.tierH / 2 + 4} fontFamily="monospace" fontSize="10" textAnchor="middle" fill={current === i ? 'rgba(29,79,255,0.9)' : 'rgba(10,14,26,0.26)'} letterSpacing="2" style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {l.label.toUpperCase()}
            </text>
          ))}
        </svg>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--line)', fontFamily: mono, fontSize: '11px', letterSpacing: '0.04em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
            <span>Layer {layers[current].num} / 05</span>
            <span style={{ color: 'var(--blue)' }}>Hover · click</span>
          </div>
          <div style={{ minHeight: '330px', paddingTop: '24px' }}>
            <p style={{ display: 'flex', alignItems: 'baseline', gap: '10px', fontFamily: mono, fontSize: '11px', letterSpacing: '0.06em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>
              <span>{layers[current].num}</span><span>/</span><span>{layers[current].label}</span>
            </p>
            <p style={{ fontSize: 'clamp(54px,7vw,88px)', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--blue)', lineHeight: 1, marginBottom: '16px' }}>{layers[current].pct}</p>
            <h3 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: '12px' }}>{layers[current].title}</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '480px' }}>{layers[current].body}</p>
          </div>
          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '8px' }}>
            {layers.map((l, i) => (
              <button key={l.label} onClick={() => setActive(i)} style={{ textAlign: 'left', padding: '8px 0 8px 10px', borderLeft: `1px solid ${active === i ? 'var(--blue)' : 'var(--line)'}`, color: active === i ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '9px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', marginBottom: '2px' }}>{l.pct}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EcosystemRing() {
  const [active, setActive] = useState(0)
  const current = ecosystemStakeholders[active]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>05 / Network upside</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, maxWidth: '760px', marginBottom: '12px' }}>
        More participation makes the whole ecosystem stronger.
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '22px' }}>
        Participation OS sits in the middle: AI coordinates timing, people create meaning, communities create openings and local places reinforce the loop.
      </p>
      <div className="po-ecosystem-ring" style={{ minHeight: '620px' }}>
        <div className="po-ecosystem-center">
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Participation OS</p>
          <h3 style={{ fontSize: 'clamp(22px,3vw,34px)', color: 'var(--paper)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '10px' }}>Participation OS</h3>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>Missions, streaks, map discovery, local rewards and privacy controls reinforce each other.</p>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(58%, 520px)', aspectRatio: 1, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(29,79,255,.16)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', left: '50%', top: '-5px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 0 10px rgba(29,79,255,.09)', animation: 'poOrbit 7s linear infinite' }} />
        </div>
        {ecosystemStakeholders.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setActive(i)}
            className={`po-ecosystem-node node-${i + 1}`}
            style={{
              textAlign: 'left',
              borderColor: active === i ? 'rgba(29,79,255,.34)' : undefined,
              boxShadow: active === i ? '0 18px 50px rgba(29,79,255,.12)' : undefined,
            }}
          >
            <p style={{ fontSize: '14px', color: active === i ? 'var(--blue)' : 'var(--ink)', fontWeight: 700, marginBottom: '5px' }}>{item.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.45 }}>{item.give} {'->'} {item.get}</p>
          </button>
        ))}
        <div className="po-ecosystem-detail" style={{ position: 'absolute', left: '50%', bottom: '28px', transform: 'translateX(-50%)', width: 'min(520px, calc(100% - 48px))', background: 'rgba(250,248,243,.94)', border: '1px solid rgba(29,79,255,.18)', borderRadius: '16px', padding: '18px', zIndex: 4, boxShadow: '0 18px 60px rgba(10,14,26,.08)' }}>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>{current.name} reinforce the loop</p>
          <p style={{ fontSize: '18px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '8px' }}>{current.give} {'->'} {current.get}</p>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>{current.next}</p>
        </div>
      </div>
    </div>
  )
}

function ProductProofBlock({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', marginBottom: '22px' }}>
        <div>
      <SectionLabel>07 / Product proof</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            The loop is already testable in small pieces.
          </h2>
        </div>
        <button onClick={() => onNav('shop')} className="po-primary-action" style={{ padding: '10px 16px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '11px' }}>
          Try live AI
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '12px' }}>
        {[
          ['Rituals', 'Individual streaks are built around weekly mottos.', ['be brave', 'be present', 'be sporty']],
          ['Map', 'Join club missions, shop events and shared friend activity.', ['clubs', 'shops', 'friends']],
          ['Rewards', 'Unlock local gifts by completing missions, like Strava rewards but across real life.', ['QR ready', 'valid one month', 'not ads']],
        ].map(([title, copy, pills], i) => (
          <div key={title as string} className="po-interactive-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '22px', minHeight: '220px' }}>
            <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>{String(i + 1).padStart(2, '0')} / {title as string}</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '16px' }}>{copy as string}</p>
            <MiniPills items={pills as string[]} active={i} />
            <div style={{ marginTop: '20px', height: '72px', borderRadius: '12px', background: i === 0 ? 'linear-gradient(135deg,#eef2ff,var(--paper))' : i === 1 ? 'rgba(29,79,255,0.08)' : 'var(--ink)', border: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
              {i === 0 && ['18%', '56%', '78%'].map((left, j) => (
                <span key={left} style={{ position: 'absolute', left, top: `${22 + j * 13}%`, width: '12px', height: '12px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 0 8px rgba(29,79,255,0.1)' }} />
              ))}
              {i === 1 && <p style={{ position: 'absolute', inset: '20px', fontFamily: mono, fontSize: '11px', color: 'var(--blue)' }}>10 streak points {'->'} surprise reward</p>}
              {i === 2 && <div style={{ position: 'absolute', inset: '16px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>{['18', '7d', '+18%', '3'].map(v => <span key={v} style={{ color: 'var(--paper)', fontWeight: 700, fontSize: '16px' }}>{v}</span>)}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BuiltAgainstExtraction() {
  const [active, setActive] = useState(0)
  const principle = trustPrinciples[active]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>08 / Trust boundary</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, maxWidth: '760px', marginBottom: '12px' }}>
        Trust is part of the product, not a footnote.
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '22px' }}>
        Participation only repeats when people feel in control. The product avoids the mechanics that make the current internet feel extractive.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
        {[
          ['Current internet', ['screen time', 'ads', 'passive attention', 'data extraction']],
          ['Participation OS', ['presence', 'participation', 'user-serving AI', 'no ads', 'optional calendar/location', 'privacy by choice']],
        ].map(([title, items]) => (
          <div key={title as string} style={{ background: title === 'Participation OS' ? 'rgba(29,79,255,0.06)' : 'var(--paper)', padding: 'clamp(22px,3vw,32px)' }}>
            <h2 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 700, color: title === 'Participation OS' ? 'var(--blue)' : 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>{title as string}</h2>
            {(items as string[]).map(item => (
              <p key={item} style={{ fontSize: '13px', color: 'var(--ink-2)', padding: '9px 0', borderTop: '1px solid var(--line)' }}>{item}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '12px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          {trustPrinciples.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              className="po-soft-action"
              style={{
                textAlign: 'left',
                padding: '14px',
                borderRadius: '12px',
                border: `1px solid ${active === i ? 'rgba(29,79,255,0.24)' : 'var(--line)'}`,
                background: active === i ? 'rgba(29,79,255,0.07)' : 'var(--paper)',
              }}
            >
              <p style={{ fontFamily: mono, fontSize: '10px', color: active === i ? 'var(--blue)' : 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.title}</p>
            </button>
          ))}
        </div>
        <div style={{ background: active === 4 ? 'var(--ink)' : 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: 'clamp(20px,3vw,28px)', minHeight: '230px' }}>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{principle.title}</p>
          <h3 style={{ fontSize: 'clamp(22px,3vw,36px)', color: active === 4 ? 'var(--paper)' : 'var(--ink)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '16px' }}>
            {principle.line}
          </h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {principle.details.map(detail => (
              <p key={detail} style={{ fontSize: '13px', color: active === 4 ? 'rgba(255,255,255,0.6)' : 'var(--ink-2)', lineHeight: 1.5, paddingTop: '8px', borderTop: active === 4 ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--line)' }}>{detail}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BerlinExecutionSection() {
  const pilot = ['AI mission generator', 'rituals + weekly challenge', 'mission hub', 'optional feed posts', 'lightweight map', 'simple rewards']
  const later = ['community host tools', 'partner reward wallet', 'team dashboards', 'verified hosts', 'better local AI matching', 'university/community pilots']

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>09 / Resolution</SectionLabel>
      <h2 style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '12px' }}>
        First prove one loop in Berlin.
      </h2>
      <p style={{ fontSize: '16px', color: 'var(--blue)', fontWeight: 700, lineHeight: 1.55, maxWidth: '760px', marginBottom: '24px' }}>
        Will people repeatedly complete real-world missions together?
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '12px', marginBottom: '12px' }}>
        <div style={{ background: 'var(--ink)', borderRadius: '18px', padding: 'clamp(22px,3vw,30px)' }}>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>10 weeks. One loop.</p>
          <h3 style={{ fontSize: 'clamp(22px,3vw,36px)', color: 'var(--paper)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '16px' }}>
            The test is small enough to build and real enough to matter.
          </h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.64)', lineHeight: 1.65, marginBottom: '18px' }}>
            20-30 friend groups, 3-5 communities, 5-10 local partners, founder-led rituals and one simple question: does the behavioral loop repeat?
          </p>
          <p style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 700, lineHeight: 1.55 }}>
            The goal is not to prove a platform in 10 weeks. The goal is to prove one repeatable behavioral loop.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px' }}>
          {[
            ['Build in Berlin', pilot],
            ['After validation', later],
          ].map(([title, items], i) => (
            <div key={title as string} style={{ background: i === 0 ? 'rgba(29,79,255,0.06)' : 'var(--paper)', border: `1px solid ${i === 0 ? 'rgba(29,79,255,0.14)' : 'var(--line)'}`, borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', color: i === 0 ? 'var(--blue)' : 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px' }}>{title as string}</h3>
              {(items as string[]).map(item => (
                <p key={item} style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.45, padding: '7px 0', borderTop: '1px solid var(--line)' }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '12px' }}>
        <div style={{ background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '16px', padding: '22px' }}>
          <SectionLabel>Why Alicia</SectionLabel>
          <p style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '12px' }}>
            I think in systems, behavioral loops and social change.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            I don't want AI to only make consumption more efficient. I want to use it to make presence easier.
          </p>
        </div>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '22px' }}>
          <SectionLabel>Why the Sommercamp</SectionLabel>
          <p style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '12px' }}>
            This is where the idea becomes real: feedback, community, density and the environment to scale.
          </p>
          <MiniPills items={['Berlin density', 'critical feedback', 'founder community', 'product sparring', 'technical sparring', 'test environments']} active={0} />
        </div>
      </div>
    </div>
  )
}

function MVPBlock() {
  return (
    <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(28px,4vw,48px)', marginBottom: '64px' }}>
      <SectionLabel>10 weeks. Berlin. One loop.</SectionLabel>
      <h2 style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '18px' }}>
        Will people repeatedly complete real-world missions together?
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
        {['personalized AI challenges', 'streaks', 'simple rewards', 'optional feed posts', '20-30 friend groups', '3-5 communities', '5-10 local partners', 'lightweight map', 'basic dashboard'].map(item => (
          <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.72)', fontFamily: mono, fontSize: '11px' }}>{item}</span>
        ))}
      </div>
      <p style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: 700, lineHeight: 1.6 }}>
        The goal is not to prove a platform in 10 weeks. The goal is to prove one repeatable behavioral loop.
      </p>
    </div>
  )
}

function ProductRoadmap() {
  const lanes = [
    ['Berlin pilot', ['AI mission generator', 'rituals + weekly challenge', 'mission hub', 'optional feed posts', 'lightweight map', 'simple rewards']],
    ['After validation', ['community host tools', 'partner reward wallet', 'team dashboards', 'verified hosts', 'better local AI matching', 'university/community pilots']],
  ]

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>Roadmap</SectionLabel>
      <h2 style={{ fontSize: 'clamp(24px,4vw,52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
        Build the loop first. Expand only after it repeats.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '12px' }}>
        {lanes.map(([title, items], i) => (
          <div key={title as string} style={{ background: i === 0 ? 'rgba(29,79,255,0.06)' : 'var(--paper)', border: `1px solid ${i === 0 ? 'rgba(29,79,255,0.14)' : 'var(--line)'}`, borderRadius: '16px', padding: '22px' }}>
            <h3 style={{ fontSize: '20px', color: i === 0 ? 'var(--blue)' : 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '14px' }}>{title as string}</h3>
            {(items as string[]).map(item => (
              <p key={item} style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, padding: '8px 0', borderTop: '1px solid var(--line)' }}>{item}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function FounderClose() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '12px' }}>
        <div style={{ background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '16px', padding: '22px' }}>
          <SectionLabel>Why Alicia</SectionLabel>
          <p style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '12px' }}>
            I think in systems, behavioral loops and social change.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            I don't want AI to only make consumption more efficient. I want to use it to make presence easier.
          </p>
        </div>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '22px' }}>
          <SectionLabel>Why the Sommercamp</SectionLabel>
          <p style={{ fontSize: '20px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '12px' }}>
            I want to use the 10 weeks to turn a strong thesis into a tested behavioral loop.
          </p>
          <MiniPills items={['Berlin density', 'critical feedback', 'founder community', 'product sparring', 'technical sparring', 'test environments']} active={0} />
        </div>
      </div>
    </div>
  )
}

function ParticipationFlywheel() {
  const steps = [
    { n: '01', t: 'Solo value', d: 'Missions work from day one — alone. No network needed to start.' },
    { n: '02', t: 'Streaks', d: 'Completion builds identity. Missing feels costly.' },
    { n: '03', t: 'Social proof', d: 'Friends see your streak. Participation becomes visible.' },
    { n: '04', t: 'Friends join', d: 'Shared streaks amplify loss aversion by 10×.' },
    { n: '05', t: 'Communities', d: 'Kiez rituals, district leaderboards, shared identity.' },
    { n: '06', t: 'Local shops', d: 'Foot traffic grows. QR rewards close the loop.' },
    { n: '07', t: 'Better AI', d: 'More data → smarter missions → higher completion.' },
  ]
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '48px', marginBottom: '64px' }}>
      <SectionLabel>06 / Participation flywheel</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(280px,0.8fr)', gap: 'clamp(32px,5vw,64px)', alignItems: 'start', marginBottom: '0' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(20px,2.6vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '14px' }}>
            The product compounds through participation, not attention.
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '400px' }}>
            Not a one-player habit app. Every friend group, community, local partner and completed mission makes it more valuable.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {[
              'Every completed mission makes the next one more likely.',
              'The more people participate, the more alive the city feels.',
              'AI coordinates timing. People create the meaning.',
            ].map(line => (
              <p key={line} style={{ fontSize: '13px', color: 'var(--blue)', lineHeight: 1.6, fontWeight: 600, paddingLeft: '12px', borderLeft: '2px solid rgba(29,79,255,0.25)' }}>{line}</p>
            ))}
          </div>
        </div>

        {/* Animated loop diagram */}
        <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(16px,3vw,28px)' }}>
          <LoopDiagram />
        </div>
      </div>
    </div>
  )
}

export function ProductView({ onNav }: { onNav: (v: string) => void }) {
  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>
        <SectionLabel>01 / Hook</SectionLabel>

        <h1 style={{ fontSize: 'clamp(36px,6.5vw,88px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '8px' }}>
          Participation OS
        </h1>
        <p style={{ fontSize: 'clamp(18px,2.2vw,28px)', color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: '24px' }}>
          AI-native infrastructure for real-world human coordination.
        </p>
        <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '48px' }}>
          The internet optimized consumption. What if it optimized participation instead? Participation OS is not primarily a sustainability app. It is a platform where sustainability becomes a side effect of identity.
        </p>

        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: 'clamp(24px,4vw,40px)', marginBottom: '64px' }}>
          <SectionLabel>02 / Product answer</SectionLabel>
          <p style={{ fontSize: 'clamp(22px,3.5vw,44px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '24px' }}>
            Participation OS is an AI-native platform where people receive personalized real-world challenges, complete them alone or with trusted groups, build streaks, optionally share moments, discover community missions on a map, and unlock local rewards.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '720px', marginBottom: '18px' }}>
            One person. One challenge. One streak. One reason to come back. Then friends, communities and local places make the loop stronger.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Challenge', 'Complete', 'Streak', 'Reward', 'Optional feed post', 'Better AI suggestion', 'Friends / teams / communities'].map(item => (
              <span key={item} style={{ padding: '7px 12px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', border: '1px solid rgba(29,79,255,0.18)', fontFamily: mono, fontSize: '11px' }}>{item}</span>
            ))}
          </div>
        </div>

        <IcebergLoopSection />
        <SystemMapSection />
        <EcosystemRing />
        <ParticipationFlywheel />
        <ProductProofBlock onNav={onNav} />
        <BuiltAgainstExtraction />
        <BerlinExecutionSection />

        <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--line)' }}>
          <button onClick={() => onNav('pitch')} style={{ padding: '10px 22px', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-2)', background: 'transparent', cursor: 'pointer' }}>
            See the pitch
          </button>
        </div>
      </div>
    </div>
  )
}
