'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode, delay?: number, style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} style={style}>
      {children}
    </motion.div>
  )
}

function LossAversion() {
  const [streak, setStreak] = useState(7)
  const [broken, setBroken] = useState(false)
  const [warned, setWarned] = useState(false)
  useEffect(() => { const t = setTimeout(() => setWarned(true), 4000); return () => clearTimeout(t) }, [])
  const grow = () => { setStreak(s => Math.min(s + 1, 10)); setBroken(false); setWarned(false) }
  const skip = () => { setStreak(s => Math.max(0, s - 1)); setBroken(true); setWarned(true) }
  return (
    <div style={{ background: 'var(--cream-2)', borderRadius: '12px', padding: 'clamp(20px,3vw,32px)', display: 'flex', alignItems: 'flex-start', gap: 'clamp(16px,3vw,32px)', flexWrap: 'wrap' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.04em', marginBottom: '4px' }}>Your streak</p>
        <motion.div key={streak} animate={{ color: broken ? '#E24B4A' : 'var(--blue)' }}
          style={{ fontSize: 'clamp(48px,6vw,72px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' }}>
          {streak}
        </motion.div>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>days</p>
      </div>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div key={i}
              animate={{ background: i < Math.min(streak, 7) ? (broken && i === Math.min(streak, 7) - 1 ? '#E24B4A' : 'var(--blue)') : 'var(--line)', scale: broken && i === Math.min(streak, 7) - 1 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
          ))}
        </div>
        <AnimatePresence>
          {warned && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ fontSize: '13px', color: '#E24B4A', fontWeight: 600, marginBottom: '12px' }}>
              {broken ? `Streak broken. You're back to ${streak}.` : 'Your streak ends in 3 hours.'}
            </motion.p>
          )}
        </AnimatePresence>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={grow} style={{ padding: '8px 16px', background: 'var(--blue)', color: 'var(--paper)', border: 'none', borderRadius: '999px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Complete mission</button>
          <button onClick={skip} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>Skip today</button>
        </div>
      </div>
    </div>
  )
}

function SocialAccountability() {
  const [secs, setSecs] = useState(167)
  useEffect(() => { const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000); return () => clearInterval(t) }, [])
  const pct = Math.round((167 - secs) / 167 * 100)
  const m = Math.floor(secs / 60)
  const s = secs % 60
  const critical = pct > 70
  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
      {[
        { initials: 'SL', bg: '#E6F1FB', color: '#185FA5', name: 'Sarah', msg: 'is waiting for your response. "Are you joining tonight?"', time: '2 min ago', pressure: false },
        { initials: 'MK', bg: '#EAF3DE', color: '#3B6D11', name: 'Your flat', msg: `loses its 6-day streak in ${m}:${String(s).padStart(2, '0')}`, time: 'deadline', pressure: true },
      ].map(({ initials, bg, color, name, msg, time, pressure }, i) => (
        <div key={i} style={{ padding: '16px 20px', borderBottom: i === 0 ? '1px solid var(--line)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>{initials}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '4px', lineHeight: 1.5 }}><strong>{name}</strong> {msg}</p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: critical && pressure ? '#E24B4A' : 'var(--ink-3)' }}>{time}</p>
              {pressure && (
                <div style={{ marginTop: '8px', height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div animate={{ width: `${pct}%`, background: critical ? '#E24B4A' : 'var(--blue)' }}
                    transition={{ duration: 0.1 }} style={{ height: '100%', borderRadius: '2px' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function VariableReward() {
  const [revealed, setReveal] = useState(false)
  const missions = [
    { title: 'Find a stranger to recommend something.', body: 'Walk up to someone in a cafe, a park, anywhere. Ask them to recommend one thing: a book, a place, a song. Whatever they say, actually try it.', meta: ['15 min', 'solo', 'social courage'] },
    { title: 'Sit somewhere you have never sat before.', body: 'Find a bench, a step, a patch of grass you\'ve walked past a hundred times. Sit. Stay for 10 minutes. Just look at the city from there.', meta: ['10 min', 'solo', 'presence'] },
    { title: 'Take a detour home. No GPS.', body: 'Leave your usual route. Turn when it feels right. Trust your sense of direction. Arrive home having seen something you hadn\'t noticed before.', meta: ['20 min', 'solo', 'discovery'] },
  ]
  const mission = missions[Math.floor(Math.random() * missions.length)]
  return (
    <motion.div onClick={() => !revealed && setReveal(true)}
      style={{ background: revealed ? 'var(--paper)' : 'var(--cream-2)', border: `1px ${revealed ? 'solid' : 'dashed'} ${revealed ? 'var(--blue)' : 'var(--line)'}`, borderRadius: '12px', padding: 'clamp(20px,3vw,32px)', cursor: revealed ? 'default' : 'pointer', transition: 'all 0.4s', textAlign: revealed ? 'left' : 'center' }}>
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div key="locked" exit={{ opacity: 0, scale: 0.95 }}>
            <div style={{ fontSize: '28px', marginBottom: '12px', color: 'var(--blue)' }}>◎</div>
            <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>Today's mission</p>
            <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.6 }}>Tap to reveal. You have no idea what it is.<br />That's why you're going to tap.</p>
          </motion.div>
        ) : (
          <motion.div key="revealed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Mission unlocked</p>
            <h4 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: 1.3 }}>{mission.title}</h4>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '14px' }}>{mission.body}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {mission.meta.map(t => <span key={t} style={{ padding: '4px 10px', border: '1px solid var(--line)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>{t}</span>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TribalIdentity() {
  const [data, setData] = useState([
    { name: 'Neukölln', count: 1247, yours: false },
    { name: 'Prenzlauer Berg', count: 1089, yours: true },
    { name: 'Mitte', count: 967, yours: false },
    { name: 'Kreuzberg', count: 834, yours: false },
    { name: 'Friedrichshain', count: 712, yours: false },
  ])
  useEffect(() => {
    const t = setInterval(() => {
      setData(d => [...d.map(item => ({ ...item, count: item.count + Math.floor(Math.random() * 3) }))].sort((a, b) => b.count - a.count))
    }, 2000)
    return () => clearInterval(t)
  }, [])
  const max = Math.max(...data.map(d => d.count))
  return (
    <div style={{ background: 'var(--cream-2)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Berlin participation · this week</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)' }}>
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
          live
        </span>
      </div>
      {data.map((d, i) => (
        <div key={d.name} style={{ padding: '10px 16px', borderBottom: i < data.length - 1 ? '1px solid var(--line)' : 'none', background: d.yours ? 'rgba(29,79,255,0.04)' : 'transparent', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: d.yours ? 'var(--blue)' : 'var(--ink-4)', width: '20px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ flex: 1, fontSize: '14px', fontWeight: d.yours ? 600 : 400, color: 'var(--ink)' }}>{d.name} {d.yours && <span style={{ fontSize: '11px', fontFamily: 'var(--font-geist-mono)', color: 'var(--blue)', fontWeight: 400 }}>you</span>}</span>
          <div style={{ width: '100px', height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${Math.round(d.count / max * 100)}%` }} transition={{ duration: 0.8 }}
              style={{ height: '100%', background: d.yours ? 'var(--blue)' : 'var(--ink-4)', borderRadius: '2px' }} />
          </div>
          <motion.span key={d.count} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', color: 'var(--ink-3)', minWidth: '40px', textAlign: 'right' }}>
            {d.count.toLocaleString()}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

function RitualVsChallenge() {
  const [selected, setSelected] = useState<'ritual' | 'challenge'>('ritual')
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
        {([
          { type: 'challenge' as const, label: 'Challenge', title: 'Weekly sustainability challenge: bike to work', body: 'Complete 5 bike commutes this week to earn your green badge.', feeling: 'Feels like: homework. Temporary. External motivation.' },
          { type: 'ritual' as const, label: 'Ritual', title: 'Monday morning ritual: the ride that starts your week', body: 'The route your flat has taken 34 times. 8km. 28 minutes. Tuesday feels different without it.', feeling: 'Feels like: identity. Ongoing. Part of who you are.' },
        ]).map(({ type, label, title, body, feeling }) => (
          <div key={type} onClick={() => setSelected(type)}
            style={{ padding: 'clamp(16px,3vw,28px)', background: selected === type ? 'rgba(29,79,255,0.04)' : 'var(--paper)', cursor: 'pointer', transition: 'background 0.2s' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: type === 'ritual' ? 'var(--blue)' : 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>
            <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4, marginBottom: '8px' }}>{title}</p>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '12px' }}>{body}</p>
            <p style={{ fontSize: '12px', fontStyle: 'italic', padding: '8px 12px', borderRadius: '6px', background: type === 'ritual' ? 'rgba(29,79,255,0.08)' : 'var(--cream-2)', color: type === 'ritual' ? 'var(--blue)' : 'var(--ink-3)' }}>{feeling}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--blue)', textAlign: 'center', marginTop: '12px' }}>The behavior is identical. The product design is everything.</p>
    </div>
  )
}

export function PsychologySection() {
  const experiments = [
    { n: '01', title: 'Loss aversion', sub: 'Breaking the streak feels worse than building it feels good. Asymmetric psychology. That\'s the whole mechanism. Try it.', component: <LossAversion /> },
    { n: '02', title: 'Social accountability', sub: 'Shared streaks compound loss aversion. Your flat is waiting. The timer is counting. That pressure is real.', component: <SocialAccountability /> },
    { n: '03', title: 'Variable reward', sub: 'Predictable rewards create weak loops. Surprise creates anticipation. You have no idea what\'s inside. That\'s the point.', component: <VariableReward /> },
    { n: '04', title: 'Tribal identity', sub: 'Neukölln is leading this week. That sentence just made you want to close the gap. In-group psychology at city scale.', component: <TribalIdentity /> },
    { n: '05', title: 'Ritual vs challenge', sub: 'Same behavior. Completely different feeling. Challenges feel temporary. Rituals feel identity-forming. This is the entire product philosophy.', component: <RitualVsChallenge /> },
  ]
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '64px', marginTop: '64px' }}>
      <FadeUp>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'clamp(24px,3vw,40px)' }}>
          The psychology · why you open it tomorrow
        </p>
      </FadeUp>
      <FadeUp delay={0.1} style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
        <h2 style={{ fontSize: 'clamp(28px,4vw,64px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '16px' }}>Features are easy to copy.</h2>
        <h2 style={{ fontSize: 'clamp(28px,4vw,64px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.05, fontStyle: 'italic', marginBottom: '24px' }}>The emotional loops are the moat.</h2>
        <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '560px' }}>
          This section performs the psychology instead of describing it. Every element triggers the exact emotion it&apos;s explaining, so you feel it while you read.
        </p>
      </FadeUp>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,6vw,80px)' }}>
        {experiments.map(({ n, title, sub, component }) => (
          <FadeUp key={n} delay={0.05}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>{n} / {title}</p>
            <h3 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '8px', lineHeight: 1.2 }}>{title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '20px', maxWidth: '560px' }}>{sub}</p>
            {component}
          </FadeUp>
        ))}
      </div>
    </div>
  )
}
