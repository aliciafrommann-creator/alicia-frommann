'use client'

// app/components/PitchSlides.tsx
// The centerpiece. Cinematic. Every slide performs what it describes.

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// ─── AMBIENT GRAIN ────────────────────────────────────────────────────────────

function Grain({ dark }: { dark: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      opacity: dark ? 0.06 : 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }} />
  )
}

// ─── WORD REVEAL ──────────────────────────────────────────────────────────────

function WordReveal({ text, color = 'var(--paper)', size = '56px', delay = 0, weight = 700 }: {
  text: string, color?: string, size?: string, delay?: number, weight?: number
}) {
  const words = text.split(' ')
  return (
    <span style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'inline-block', marginRight: '0.28em', fontSize: size, fontWeight: weight, color, letterSpacing: '-0.04em', lineHeight: 1.0 }}>
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ─── MISSION GENERATOR (live Claude API) ─────────────────────────────────────

const missionOptions = {
  energy: ['low energy', 'social', 'need movement', 'need calm', 'need courage'],
  group: ['solo', 'with a friend', 'group', 'flatmates'],
  time: ['10 min', '30 min', '1 hour', 'full evening'],
}

function MissionDemo() {
  const [selections, setSelections] = useState({ energy: 'low energy', group: 'solo', time: '30 min' })
  const [mission, setMission] = useState<{ title: string, body: string, meta: string[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [streak, setStreak] = useState(0)

  const generate = async () => {
    setLoading(true)
    setMission(null)
    try {
      const res = await fetch('/api/generate-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selections),
      })
      const data = await res.json()
      setMission(data)
    } catch {
      setMission({ title: 'Sunset walk. 25 minutes.', body: 'Leave your screen. Walk until the sky changes color. Notice one thing you\'ve never noticed before on a street you\'ve walked a hundred times.', meta: ['25 min', 'solo', 'low energy'] })
    }
    setLoading(false)
  }

  return (
    <div style={{ width: '100%', maxWidth: '680px', margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
        Try the AI · live mission generator
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
        {(Object.entries(missionOptions) as [keyof typeof missionOptions, string[]][]).map(([key, opts]) => (
          <div key={key}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>{key}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {opts.map(o => (
                <button key={o} onClick={() => setSelections(s => ({ ...s, [key]: o }))} style={{
                  padding: '5px 10px', borderRadius: '6px', fontSize: '12px', textAlign: 'left',
                  background: selections[key] === o ? 'var(--blue)' : 'rgba(255,255,255,0.06)',
                  color: selections[key] === o ? 'var(--paper)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${selections[key] === o ? 'var(--blue)' : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{o}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={generate} disabled={loading} style={{
        width: '100%', padding: '12px', background: 'var(--blue)', color: 'var(--paper)',
        border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        marginBottom: '16px', transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1,
      }}>
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {[0, 0.15, 0.3].map((d, i) => (
              <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', display: 'inline-block' }} />
            ))}
          </span>
        ) : '✦ Generate my mission'}
      </button>

      <AnimatePresence mode="wait">
        {mission && (
          <motion.div key={mission.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '20px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Mission · Berlin</p>
            <h3 style={{ fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: 1.3 }}>{mission.title}</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '14px' }}>{mission.body}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {mission.meta?.map((t: string) => (
                <span key={t} style={{ padding: '3px 10px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setStreak(s => s + 1); setMission(null) }} style={{
                padding: '8px 16px', background: 'var(--blue)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              }}>Accept +1 streak</button>
              <button onClick={generate} style={{
                padding: '8px 16px', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
              }}>Another</button>
            </div>
          </motion.div>
        )}
        {streak > 0 && !mission && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'rgba(29,79,255,0.15)', border: '1px solid rgba(29,79,255,0.3)', borderRadius: '12px' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>{streak}</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--paper)', marginBottom: '6px' }}>day streak. Keep going.</p>
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div key={i} initial={{ background: 'rgba(255,255,255,0.1)' }}
                    animate={{ background: i < streak ? 'var(--blue)' : 'rgba(255,255,255,0.1)' }}
                    transition={{ delay: i * 0.08 }}
                    style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── TRIBAL LEADERBOARD ───────────────────────────────────────────────────────

function CityPulse() {
  const [data, setData] = useState([
    { name: 'Neukölln', count: 1247 },
    { name: 'Prenzlauer Berg', count: 1089, yours: true },
    { name: 'Mitte', count: 967 },
    { name: 'Kreuzberg', count: 834 },
  ])

  useEffect(() => {
    const t = setInterval(() => {
      setData(d => [...d.map(item => ({ ...item, count: item.count + Math.floor(Math.random() * 4) }))].sort((a, b) => b.count - a.count))
    }, 1800)
    return () => clearInterval(t)
  }, [])

  const max = Math.max(...data.map(d => d.count))

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Berlin · this week</p>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
          live
        </span>
      </div>
      {data.map((d, i) => (
        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', background: (d as any).yours ? 'rgba(29,79,255,0.05)' : 'transparent' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', width: '18px' }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ flex: 1, fontSize: '14px', fontWeight: (d as any).yours ? 600 : 400, color: 'var(--paper)' }}>
            {d.name} {(d as any).yours && <span style={{ fontSize: '10px', color: 'var(--blue)', fontFamily: 'var(--font-geist-mono)' }}>← you</span>}
          </span>
          <div style={{ width: '80px', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${Math.round(d.count / max * 100)}%` }} transition={{ duration: 0.8 }}
              style={{ height: '100%', background: (d as any).yours ? 'var(--blue)' : 'rgba(255,255,255,0.25)', borderRadius: '2px' }} />
          </div>
          <motion.span key={d.count} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', minWidth: '36px', textAlign: 'right' }}>
            {d.count.toLocaleString()}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

function ProductMomentSlide() {
  const steps = [
    ['friend joins', 'Mila accepted'],
    ['sunset walk', 'mission active'],
    ['feed post', 'moment shared'],
    ['7-day streak', 'unlocked'],
    ['cafe reward', 'QR ready'],
    ['city dashboard', 'PBerg +1'],
  ]

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', width: '100%' }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '26px' }}>One product moment</motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(20px,4vw,44px)', alignItems: 'center' }}>
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(54px,8vw,104px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.06em', lineHeight: 0.9, marginBottom: '20px' }}>
            18:42
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '18px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>AI notices</p>
            {['free evening', 'good weather', 'group streak at risk'].map(item => (
              <p key={item} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.68)', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>+ {item}</p>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }}
            style={{ background: 'var(--paper)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Notification</p>
            <p style={{ fontSize: 'clamp(20px,2.7vw,34px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1.12 }}>
              "Your flat is one mission away from maintaining the streak."
            </p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
            {steps.map(([title, detail], i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.12 }}
                style={{ background: 'rgba(29,79,255,0.14)', border: '1px solid rgba(29,79,255,0.28)', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontSize: '12px', color: 'var(--paper)', fontWeight: 700, marginBottom: '4px' }}>{title}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SLIDES DATA ──────────────────────────────────────────────────────────────

const slides = [
  {
    id: 'opening', dark: true,
    render: () => (
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '40px' }}>
          Application · Gründerszene Startup-Sommercamp 2025
        </motion.p>
        <div style={{ marginBottom: '20px' }}>
          <WordReveal text="The internet optimized consumption." size="clamp(32px,5.5vw,80px)" delay={0.2} />
        </div>
        <div>
          <WordReveal text="What if it optimized participation instead?" size="clamp(24px,4vw,60px)" color="var(--blue)" delay={0.8} weight={700} />
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          style={{ marginTop: '48px', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
          → press space or click next
        </motion.p>
      </div>
    ),
  },
  {
    id: 'contradiction', dark: false,
    render: () => (
      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>Most of us</motion.p>
        {[
          { a: 'We care deeply.', b: null, delay: 0.15 },
          { a: 'And still we fail.', b: null, delay: 0.3 },
          { a: 'We want to support ethical brands —', b: 'but we buy the cheaper option.', delay: 0.5 },
          { a: 'We want to shop locally —', b: 'but Amazon arrives tomorrow.', delay: 0.7 },
          { a: 'We want deeper connection —', b: 'but passive scrolling wins another evening.', delay: 0.9 },
        ].map(({ a, b, delay }, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay }}
            style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: 'clamp(20px,2.8vw,40px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.15, margin: 0 }}>{a}</p>
            {b && <p style={{ fontSize: 'clamp(16px,2vw,28px)', color: 'var(--ink-3)', fontStyle: 'italic', letterSpacing: '-0.02em', margin: '2px 0 0' }}>{b}</p>}
          </motion.div>
        ))}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ fontSize: 'clamp(14px,1.6vw,20px)', color: 'var(--blue)', fontStyle: 'italic', marginTop: '28px' }}>
          Not because we don't care. Because the system is designed to win.
        </motion.p>
      </div>
    ),
  },
  {
    id: 'os', dark: true,
    render: () => (
      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '48px' }}>The operating system</motion.p>
        {['Every click.', 'Every notification.', 'Every recommendation.', 'Every frictionless reward.'].map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontSize: 'clamp(28px,5vw,72px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '4px' }}>
            {line}
          </motion.p>
        ))}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{ fontSize: 'clamp(14px,1.6vw,20px)', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginTop: '28px' }}>
          ... is the real operating system beneath modern behavior.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ fontSize: 'clamp(14px,1.6vw,20px)', color: 'var(--blue)', fontWeight: 600, marginTop: '12px' }}>
          Design for humans as they are. Not as we wish they were.
        </motion.p>
      </div>
    ),
  },
  {
    id: 'proof', dark: false,
    render: () => (
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>The apps that actually changed behavior</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(22px,3.5vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            didn't compete against dopamine.<br />
            <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>They used it.</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--line)' }}>
          {[
            { name: 'Strava', q: "I don't use it only to track my runs.", r: "I love the kudos and the community." },
            { name: 'Too Good To Go', q: "I don't use it only to reduce food waste.", r: "It's cheap, surprising, feels like a win." },
            { name: 'Duolingo', q: "I don't open it because lessons are meaningful.", r: "Look at my streak." },
            { name: 'Pokemon Go', q: "I don't go outside for the game.", r: "I go outside because everyone else is." },
          ].map(({ name, q, r }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              style={{ padding: 'clamp(16px,2.5vw,28px)', background: 'var(--paper)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{name}</p>
              <p style={{ fontSize: '13px', color: 'var(--ink-2)', fontStyle: 'italic', marginBottom: '10px', lineHeight: 1.6 }}>"{q}"</p>
              <p style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 600 }}>{r}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'failure', dark: true,
    render: () => (
      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '48px' }}>Why they failed</motion.p>
        {[
          { t: 'Most sustainability apps failed.', c: 'var(--paper)', d: 0.2 },
          { t: 'They built for morality.', c: 'var(--paper)', d: 0.5 },
          { t: 'Modern consumer platforms built for emotional reinforcement.', c: 'rgba(255,255,255,0.4)', d: 0.9 },
          { t: 'Emotional reinforcement scales faster than intention alone.', c: 'var(--blue)', d: 1.3 },
        ].map(({ t, c, d }, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: d }}
            style={{ fontSize: 'clamp(20px,3.5vw,52px)', fontWeight: 700, color: c, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '14px' }}>{t}</motion.p>
        ))}
      </div>
    ),
  },
  {
    id: 'participation', dark: true,
    render: () => (
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>The human truth</motion.p>
        <div style={{ marginBottom: '8px' }}>
          <WordReveal text="Humans are wired for" size="clamp(28px,5vw,72px)" delay={0.15} />
        </div>
        <div style={{ marginBottom: '40px' }}>
          <WordReveal text="synchronized participation." size="clamp(28px,5vw,72px)" color="var(--blue)" delay={0.5} />
        </div>
        <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
          {['Rituals.', 'Teams.', 'Shared progress.', 'Visible identity.', 'Repeated collective behavior.'].map((word, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.12 }}
              style={{ fontSize: 'clamp(18px,2.5vw,36px)', fontWeight: 600, color: i % 2 === 0 ? 'var(--paper)' : 'var(--blue)', letterSpacing: '-0.025em', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: 0 }}>{word}</motion.p>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          style={{ fontSize: 'clamp(13px,1.4vw,18px)', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginTop: '24px', lineHeight: 1.65 }}>
          That is where belonging forms. That is where habits stick. That is where culture begins.
        </motion.p>
      </div>
    ),
  },
  {
    id: 'product', dark: false,
    render: () => (
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '28px' }}>This is the app</motion.p>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(18px,2.7vw,36px)', fontWeight: 400, color: 'var(--ink-3)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '14px' }}>
          Not primarily a sustainability app.
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ fontSize: 'clamp(28px,5vw,72px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '10px' }}>
          Participation OS is an AI-native platform
        </motion.h2>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
          style={{ fontSize: 'clamp(24px,4vw,56px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.05, fontStyle: 'italic', marginBottom: '26px' }}>
          for real-world missions with trusted groups.
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1px', background: 'var(--line)' }}>
          {['missions', 'trusted groups', 'streaks', 'feed posts', 'map discovery', 'local rewards', 'dashboards', 'privacy controls'].map(t => (
            <span key={t} style={{ padding: '14px 16px', background: 'var(--paper)', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-2)' }}>{t}</span>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ fontSize: 'clamp(14px,1.6vw,20px)', color: 'var(--ink-2)', lineHeight: 1.65, marginTop: '24px', maxWidth: '620px' }}>
          Where sustainability becomes a side effect of identity — not the emotional entry point.
        </motion.p>
      </div>
    ),
  },
  {
    id: 'mission-demo', dark: true,
    render: () => <ProductMomentSlide />,
  },
  {
    id: 'mechanics', dark: false,
    render: () => (
      <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Five mechanics</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(22px,3vw,44px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '32px' }}>
          Choices that feel rewarding and fun.
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: 'var(--line)' }}>
          {[
            { n: '01', t: 'AI-timed missions', d: 'Free evening. Good weather. Streak at risk. The right nudge at the right emotional moment.' },
            { n: '02', t: 'Trusted group rituals', d: 'Friends. Flatmates. Run clubs. Sunday sunset walks. Rituals that repeat become identity.' },
            { n: '03', t: 'Shared streaks', d: "Your flat is one mission away from losing the week. Breaking it isn't just about you." },
            { n: '04', t: 'Anti-scroll layer', d: '"Catch me before I disappear." A 2-minute mission instead of another hour in the feed.' },
            { n: '05', t: 'City feels alive', d: '"Prenzlauer Berg is leading." District vs district. Your participation moves the city.' },
          ].map(({ n, t, d }, i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              style={{ padding: 'clamp(16px,2.5vw,28px)', background: 'var(--paper)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '10px' }}>{n} /</p>
              <h3 style={{ fontSize: 'clamp(14px,1.4vw,17px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: '8px', fontStyle: 'italic' }}>{t}</h3>
              <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.6 }}>{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'city', dark: true,
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px', alignSelf: 'flex-start' }}>The city feels alive</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(24px,4vw,56px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '8px', alignSelf: 'flex-start' }}>
          Berlin is
        </motion.h2>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ fontSize: 'clamp(24px,4vw,56px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.05, fontStyle: 'italic', marginBottom: '32px', alignSelf: 'flex-start' }}>
          participating.
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ width: '100%' }}>
          <CityPulse />
        </motion.div>
      </div>
    ),
  },
  {
    id: 'ai', dark: true,
    render: () => (
      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>The AI layer</motion.p>
        <div style={{ marginBottom: '8px' }}>
          <WordReveal text="AI is not the product." size="clamp(24px,4.5vw,64px)" delay={0.15} />
        </div>
        <div style={{ marginBottom: '36px' }}>
          <WordReveal text="AI is the coordination layer." size="clamp(24px,4.5vw,64px)" color="var(--blue)" delay={0.55} />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '24px' }}>
          {['Timing', 'Location', 'Mood', 'Social context', 'Team momentum', 'Nearby opportunities'].map((item, i) => (
            <div key={item} style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.03)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{String(i + 1).padStart(2, '0')}</p>
              <p style={{ fontSize: 'clamp(13px,1.3vw,16px)', fontWeight: 600, color: 'var(--paper)' }}>{item}</p>
            </div>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ fontSize: 'clamp(13px,1.4vw,18px)', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', lineHeight: 1.65 }}>
          "AI coordinates participation without needing to surveil people."
        </motion.p>
      </div>
    ),
  },
  {
    id: 'human', dark: false,
    render: () => (
      <div style={{ maxWidth: '920px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '28px' }}>Optimization contrast</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(24px,4vw,58px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '14px' }}>
          AI optimized attention first.
        </motion.h2>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          style={{ fontSize: 'clamp(24px,4vw,58px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.05, fontStyle: 'italic', marginBottom: '32px' }}>
          Participation OS explores optimizing presence instead.
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)' }}>
          {[
            { l: 'Current internet', v: 'maximize screen time', blue: false },
            { l: 'Participation OS', v: 'maximize presence', blue: true },
            { l: 'Current internet', v: 'maximize ads and extraction', blue: false },
            { l: 'Participation OS', v: 'maximize meaningful coordination', blue: true },
            { l: 'Current internet', v: 'maximize passive attention', blue: false },
            { l: 'Participation OS', v: 'maximize real-world rituals', blue: true },
          ].map(({ l, v, blue }) => (
            <div key={l} style={{ padding: 'clamp(14px,2.5vw,24px)', background: 'var(--paper)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>{l}</p>
              <p style={{ fontSize: 'clamp(13px,1.4vw,17px)', fontWeight: 600, color: blue ? 'var(--blue)' : 'var(--ink-4)' }}>{v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: 'berlin', dark: false,
    render: () => (
      <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>Why Berlin · Why me · Why now</motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'var(--line)', marginBottom: '36px' }}>
          {[
            { n: '01', t: 'Connect.', b: 'I build mostly alone. Berlin is where the density is. Ten weeks in a room that pulls me forward.' },
            { n: '02', t: 'Find my co-founder.', b: 'ThinkTogether needs a technical co-founder. Not LinkedIn — someone I build with, argue with, trust.' },
            { n: '03', t: 'Build in public.', b: 'Direct feedback. Full focus. Shipping in front of people who care. This is how I learn fastest.' },
          ].map(({ n, t, b }, i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
              style={{ padding: 'clamp(20px,3vw,36px)', background: 'var(--paper)' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', marginBottom: '16px' }}>{n} /</p>
              <h3 style={{ fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '10px', fontStyle: 'italic' }}>{t}</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.65 }}>{b}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '6px' }}>This is not a strategic move.</p>
          <p style={{ fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 600, color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.025em' }}>It is a dream, four times over.</p>
        </motion.div>
      </div>
    ),
  },
  {
    id: 'final', dark: true,
    render: () => (
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '48px' }}>The one thing to prove</motion.p>
        <div style={{ marginBottom: '40px' }}>
          <WordReveal text="Will people repeatedly complete real-world missions together?" size="clamp(24px,4vw,60px)" delay={0.3} />
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          style={{ fontSize: 'clamp(18px,2.5vw,34px)', fontWeight: 600, color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.025em', marginBottom: '8px' }}>
          If yes — we don't just have an app.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
          style={{ fontSize: 'clamp(18px,2.5vw,34px)', fontWeight: 600, color: 'var(--paper)', letterSpacing: '-0.025em', marginBottom: '48px' }}>
          We have the beginning of a new behavioral loop.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
          Weil es Spass macht. Weil man dazugehoert. Weil man hilft.
        </motion.p>
      </div>
    ),
  },
]

// ─── INTRO HERO ───────────────────────────────────────────────────────────────

function IntroHero({ onExplore }: { onExplore: () => void }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#0A0E1A' }}>
      <Grain dark={true} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px,5vw,72px) clamp(24px,6vw,80px)', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: '860px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 700, color: 'var(--paper)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '24px' }}>
            AI will change how we live.{' '}
            <span style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>That is no longer a question.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{ fontSize: 'clamp(22px,3.5vw,52px)', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '20px', fontStyle: 'italic' }}>
            What do we optimize for?
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            style={{ fontSize: 'clamp(22px,3.5vw,52px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '56px' }}>
            I'm building for presence.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            onClick={onExplore}
            style={{
              padding: '14px 36px', background: 'var(--blue)', color: 'var(--paper)',
              border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
            Explore the application →
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function PitchSlides() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), [])
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

  useEffect(() => {
    if (!started) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [next, prev, started])

  if (!started) return <IntroHero onExplore={() => setStarted(true)} />

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* BG transition */}
      <motion.div animate={{ background: slide.dark ? '#0A0E1A' : '#FAF8F3' }} transition={{ duration: 0.6 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <Grain dark={slide.dark} />

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px,5vw,72px) clamp(24px,6vw,80px)', position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -48, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: '100%' }}>
            {slide.render()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: 'clamp(14px,2vw,20px) clamp(24px,6vw,80px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: `1px solid ${slide.dark ? 'rgba(255,255,255,0.07)' : 'var(--line)'}`,
      }}>
        <button onClick={prev} disabled={current === 0} style={{
          padding: '7px 18px', borderRadius: '999px', fontSize: '12px',
          background: 'transparent',
          border: `1px solid ${slide.dark ? 'rgba(255,255,255,0.12)' : 'var(--line)'}`,
          color: current === 0 ? (slide.dark ? 'rgba(255,255,255,0.15)' : 'var(--ink-4)') : (slide.dark ? 'rgba(255,255,255,0.6)' : 'var(--ink-2)'),
          cursor: current === 0 ? 'default' : 'pointer', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.04em',
        }}>prev</button>

        {/* Dot progress */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <motion.button key={i} onClick={() => setCurrent(i)}
              animate={{ width: i === current ? '20px' : '5px', background: i === current ? 'var(--blue)' : (slide.dark ? 'rgba(255,255,255,0.2)' : 'var(--line)') }}
              style={{ height: '5px', borderRadius: '999px', border: 'none', cursor: 'pointer', padding: 0 }} />
          ))}
        </div>

        <button onClick={next} disabled={current === slides.length - 1} style={{
          padding: '7px 18px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
          background: current === slides.length - 1 ? 'transparent' : 'var(--blue)',
          border: current === slides.length - 1 ? `1px solid ${slide.dark ? 'rgba(255,255,255,0.12)' : 'var(--line)'}` : 'none',
          color: current === slides.length - 1 ? (slide.dark ? 'rgba(255,255,255,0.15)' : 'var(--ink-4)') : 'var(--paper)',
          cursor: current === slides.length - 1 ? 'default' : 'pointer', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.04em',
        }}>{current === slides.length - 1 ? 'end' : 'next'}</button>
      </div>
    </div>
  )
}
