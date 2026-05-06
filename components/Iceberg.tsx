'use client'
import { useEffect, useRef, useState } from 'react'

const TIERS = [
  { id: 'events',  pct: '10%',  label: 'Events',        title: 'What you can see',         body: 'Workshop output. The slide deck. The launched feature. The town hall. The metric on the dashboard.' },
  { id: 'patterns', pct: '25%', label: 'Patterns',      title: 'What keeps happening',      body: 'The same conflict in three teams. The same hire that doesn't stick. The retro item that returns every quarter.' },
  { id: 'structure', pct: '30%', label: 'Structures',   title: 'The shape that holds it',   body: 'Org charts, incentives, calendars, who-reports-to-whom, who-gets-to-veto-what. The architecture of attention.' },
  { id: 'models',  pct: '25%',  label: 'Mental models', title: 'What we believe is true',   body: 'Engineers don\'t talk to customers. Speed beats care. We don\'t have time. The unexamined defaults that draw the rest.' },
  { id: 'purpose', pct: '10%',  label: 'Purpose',       title: 'What the system is actually for', body: 'The deepest leverage point. Change this and the structure has to redraw itself. This is where I prefer\u00a0to\u00a0work.' },
]

export default function Iceberg() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setActive(a => (a + 1) % TIERS.length), 3200)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const tier = TIERS[active]

  return (
    <section className="iceberg" id="iceberg" data-screen-label="04 Iceberg">
      <div className="section-head">
        <span className="tag">03 Iceberg model</span>
        <h2 className="display-2">
          <span className="reveal-line"><span>What you see</span></span>{' '}
          <span className="reveal-line"><span className="italic">isn&apos;t where I work.</span></span>
        </h2>
        <p className="lede">Most of any team — like most of any iceberg — is below the waterline. The visible events are 10%. The other 90% is where the leverage lives. This is the map I use.</p>
      </div>
      <div className="ice-stage">
        <div className="ice-canvas">
          <svg viewBox="0 0 800 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{width:'100%',height:'100%',position:'absolute',inset:0}}>
            <defs>
              <linearGradient id="iceTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FAF8F3"/>
                <stop offset="1" stopColor="#DCE5FF"/>
              </linearGradient>
              <linearGradient id="iceBot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1D4FFF" stopOpacity=".22"/>
                <stop offset="1" stopColor="#0A2EE6" stopOpacity=".05"/>
              </linearGradient>
            </defs>
            <path d="M 400 80 L 270 320 L 530 320 Z" fill="url(#iceTop)" stroke="#0A0E1A" strokeWidth="1.4"/>
            <line x1="40" y1="320" x2="760" y2="320" stroke="#1D4FFF" strokeWidth="1" strokeDasharray="6 5"/>
            <text x="40" y="312" fontFamily="Geist Mono,monospace" fontSize="11" fill="#1D4FFF" letterSpacing="2">WATERLINE</text>
            <text x="760" y="312" fontFamily="Geist Mono,monospace" fontSize="11" fill="#1D4FFF" textAnchor="end" letterSpacing="2">10% VISIBLE</text>
            <path d="M 270 320 L 530 320 L 660 600 L 580 820 L 220 820 L 140 600 Z" fill="url(#iceBot)" stroke="#1D4FFF" strokeWidth="1.2" strokeOpacity=".5"/>
            {TIERS.map((t, i) => (
              <g key={t.id} style={{cursor:'pointer'}} onClick={() => setActive(i)}>
                <rect
                  x="300" y={340 + i * 96} width="200" height="72" rx="8"
                  fill={active === i ? '#DCE5FF' : 'transparent'}
                  stroke={active === i ? '#1D4FFF' : 'rgba(29,79,255,.3)'}
                  strokeWidth={active === i ? 1.5 : 1}
                  style={{transition:'fill .3s,stroke .3s'}}
                />
                <text x="400" y={340 + i * 96 + 30} fontFamily="Geist Mono,monospace" fontSize="10" fill="#1D4FFF" textAnchor="middle" letterSpacing="2">{t.pct}</text>
                <text x="400" y={340 + i * 96 + 50} fontFamily="Geist,system-ui,sans-serif" fontSize="13" fontWeight="600" fill="#0A0E1A" textAnchor="middle">{t.label}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="ice-side">
          <div className="ice-side-head">
            <span className="tag">Active layer</span>
            <span className="ice-side-hint">Click to explore</span>
          </div>
          <div className="ice-deck" style={{minHeight:300}}>
            <div className="ice-card is-active" key={tier.id}>
              <div className="ice-card-meta">
                <span className="ice-card-pct">{tier.pct}</span>
                <span>{tier.label}</span>
              </div>
              <h3>{tier.title}</h3>
              <p>{tier.body}</p>
            </div>
          </div>
          <div className="ice-strip">
            {TIERS.map((t, i) => (
              <button key={t.id} className={active === i ? 'is-active' : ''} onClick={() => setActive(i)}>
                <span className="ice-strip-pct">{t.pct}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
