'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const chip = (active: boolean): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  padding: '6px 14px', borderRadius: '999px', fontSize: '13px',
  cursor: 'pointer', margin: '4px', transition: 'all 0.2s',
  border: `1px solid ${active ? 'var(--blue)' : 'var(--line)'}`,
  background: active ? 'var(--blue)' : 'var(--paper)',
  color: active ? 'var(--paper)' : 'var(--ink-2)',
  fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
})

const blueBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '10px 20px', background: 'var(--blue)', color: 'var(--paper)',
  borderRadius: '999px', fontSize: '13px', fontWeight: 600,
  border: 'none', cursor: 'pointer',
}

// ─── 1. MISSION GENERATOR ────────────────────────────────────────────────────

export function MissionGenerator() {
  const [energy, setEnergy] = useState('low energy')
  const [group, setGroup] = useState('solo')
  const [time, setTime] = useState('10 min')
  const [mission, setMission] = useState<{title:string,body:string,meta:string[]} | null>(null)
  const [loading, setLoading] = useState(false)
  const [streak, setStreak] = useState(0)
  const [accepted, setAccepted] = useState(false)

  const generate = async () => {
    setLoading(true)
    setMission(null)
    setAccepted(false)
    const res = await fetch('/api/generate-mission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ energy, group, time }),
    })
    const data = await res.json()
    setMission(data)
    setLoading(false)
  }

  const accept = () => {
    setAccepted(true)
    setStreak(s => s + 1)
    setMission(null)
  }

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'clamp(40px,5vw,64px)', marginTop: 'clamp(40px,5vw,64px)' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
        Try the AI · Mission generator
      </p>
      <h3 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '8px' }}>
        Generate your mission.
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '480px' }}>
        Tell the AI your energy and context. Get a real-world mission. This is the core product in 30 seconds.
      </p>

      {[
        { label: 'Energy right now', state: energy, set: setEnergy, options: ['low energy', 'social', 'need movement', 'need calm', 'need courage'] },
        { label: 'Who are you with', state: group, set: setGroup, options: ['solo', 'one friend', 'group', 'flatmates'] },
        { label: 'Time available', state: time, set: setTime, options: ['10 min', '30 min', '1 hour', 'full evening'] },
      ].map(({ label, state, set, options }) => (
        <div key={label} style={{ marginBottom: '16px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.04em', marginBottom: '8px' }}>{label}</p>
          {options.map(o => (
            <span key={o} style={chip(state === o)} onClick={() => set(o)}>{o}</span>
          ))}
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <button style={blueBtn} onClick={generate} disabled={loading}>
          {loading ? 'Generating...' : '✦ Generate my mission'}
        </button>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', fontSize: '13px', color: 'var(--ink-3)' }}>
            <span style={{ display: 'flex', gap: '4px' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.span key={i} animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, delay: d, repeat: Infinity }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
              ))}
            </span>
            AI is finding your mission...
          </motion.div>
        )}

        {mission && !accepted && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '20px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>
              Mission · Berlin
            </p>
            <h4 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.3 }}>
              {mission.title}
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '16px' }}>{mission.body}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '16px' }}>
              {mission.meta.map((t: string) => (
                <span key={t} style={{ padding: '4px 10px', border: '1px solid var(--line)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
              <button style={blueBtn} onClick={accept}>✓ Accept mission</button>
              <button style={{ ...blueBtn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }} onClick={generate}>Generate another</button>
            </div>
          </motion.div>
        )}

        {accepted && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '20px', background: 'var(--cream-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>{streak}</div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>Mission accepted. Streak started.</p>
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div key={i} initial={{ background: 'var(--line)' }}
                    animate={{ background: i < streak ? 'var(--blue)' : 'var(--line)' }}
                    transition={{ delay: i * 0.1 }}
                    style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ─── 2. SCROLL INTERRUPT ─────────────────────────────────────────────────────

export function ScrollInterrupt() {
  const [visible, setVisible] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shown.current) { shown.current = true; setVisible(true) }
    }, 30000)
    return () => clearTimeout(timer)
  }, [])

  if (dismissed || accepted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed', bottom: '24px', right: '24px',
            background: 'var(--paper)', border: '1px solid var(--line)',
            borderRadius: '12px', padding: '20px 24px', width: '300px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)', zIndex: 9999,
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', animation: 'pulse 2s infinite' }} />
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: 0 }}>
              Participation OS · scroll detected
            </p>
          </div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
            You’ve been scrolling for 30 seconds.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: '16px' }}>
            Sunset in 90 minutes. Your group is nearby. Quick walk mission?
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ ...blueBtn, fontSize: '12px', padding: '8px 14px' }}
              onClick={() => { setVisible(false); setAccepted(true) }}>
              Accept mission
            </button>
            <button style={{ padding: '8px 14px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '12px', cursor: 'pointer', color: 'var(--ink-3)' }}
              onClick={() => { setVisible(false); setDismissed(true) }}>
              Keep scrolling
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


// ─── 3. CITY PULSE ───────────────────────────────────────────────────────────

export function CityPulse() {
  const [missions, setMissions] = useState<{id:number,x:number,y:number,label:string}[]>([])
  const [count, setCount] = useState(847)
  const nextId = useRef(0)

  const labels = ['sunset walk','café ritual','no-phone dinner','local discovery','group streak','flatmate tradition','urban exploration','movement mission']
  const spots = [{x:42,y:35},{x:58,y:28},{x:71,y:42},{x:55,y:55},{x:38,y:62},{x:62,y:68},{x:48,y:48},{x:75,y:30},{x:30,y:45},{x:65,y:52}]

  useEffect(() => {
    const add = () => {
      const spot = spots[Math.floor(Math.random() * spots.length)]
      const id = nextId.current++
      setMissions(ms => [...ms, { id, x: spot.x + (Math.random() - 0.5) * 8, y: spot.y + (Math.random() - 0.5) * 8, label: labels[Math.floor(Math.random() * labels.length)] }])
      setCount(c => c + 1)
      setTimeout(() => setMissions(ms => ms.filter(m => m.id !== id)), 3000)
    }
    const iv = setInterval(add, 1200)
    add()
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'clamp(40px,5vw,64px)', marginTop: 'clamp(40px,5vw,64px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap' as const, gap: '12px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '6px' }}>Live · Berlin participation</p>
          <h3 style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0 }}>The city is already participating.</h3>
        </div>
        <div style={{ textAlign: 'right' as const }}>
          <motion.p key={count} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '32px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
            {count.toLocaleString()}
          </motion.p>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.04em', margin: 0 }}>missions today</p>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', paddingBottom: '52%', background: 'var(--cream-2)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 100 52" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <path d="M20,10 Q35,5 50,8 Q65,5 78,12 Q85,18 82,30 Q80,40 72,45 Q60,52 45,50 Q30,52 22,44 Q15,38 15,28 Q13,18 20,10 Z"
              fill="none" stroke="var(--line)" strokeWidth="0.5" />
            {spots.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="1" fill="var(--ink-4)" opacity="0.4" />)}
          </svg>
          {missions.map(m => (
            <motion.div key={m.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.8] }}
              transition={{ duration: 3, ease: 'easeOut' }}
              style={{ position: 'absolute', left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}>
              <div style={{ position: 'relative' }}>
                <motion.div animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1px solid var(--blue)', opacity: 0.3 }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue)' }} />
                <motion.div initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 10 }}
                  style={{ position: 'absolute', top: '-4px', left: '8px', whiteSpace: 'nowrap', fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', background: 'var(--paper)', padding: '2px 6px', borderRadius: '4px', border: '0.5px solid var(--line)' }}>
                  {m.label}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.04em', marginTop: '10px', textAlign: 'right' as const }}>
        Simulated data · real product concept
      </p>
    </div>
  )
}
