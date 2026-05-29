'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapMockup } from './MapMockup'
import { AskTheCity } from './AskTheCity'

// ─── STREAK REWARDS ───────────────────────────────────────────────────────────

const milestones = [
  { days: 3, reward: '10% off at partner café', icon: '☕' },
  { days: 7, reward: 'Free item at zero-waste shop', icon: '♻' },
  { days: 14, reward: 'Sustainable brand voucher (€15)', icon: '✦' },
  { days: 30, reward: 'Exclusive local experience', icon: '★' },
  { days: 60, reward: 'District champion status', icon: '◈' },
]

function StreakRewards({ streak }: { streak: number }) {
  const max = 60
  return (
    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '40px', marginTop: '40px' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Streak rewards</p>
      <h3 style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '24px' }}>The longer you show up, the better it gets.</h3>
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '2px', background: 'var(--line)', zIndex: 0 }}>
          <motion.div animate={{ width: `${Math.min((streak / max) * 100, 100)}%` }} transition={{ duration: 0.6 }}
            style={{ height: '100%', background: 'var(--blue)', borderRadius: '2px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '8px', position: 'relative', zIndex: 1 }}>
          {milestones.map(({ days, reward, icon }) => {
            const unlocked = streak >= days
            return (
              <div key={days} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {/* 5d: pulse boxShadow on unlock */}
                <motion.div
                  animate={{
                    background: unlocked ? 'var(--blue)' : 'var(--paper)',
                    boxShadow: unlocked
                      ? '0 0 0 4px rgba(29,79,255,0.15)'
                      : '0 0 0 0px rgba(29,79,255,0)',
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${unlocked ? 'var(--blue)' : 'var(--line)'}`,
                    fontSize: '16px',
                  }}>
                  <span style={{ filter: unlocked ? 'none' : 'grayscale(1)', opacity: unlocked ? 1 : 0.4 }}>{icon}</span>
                </motion.div>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: unlocked ? 'var(--blue)' : 'var(--ink-4)', textAlign: 'center' }}>day {days}</p>
                <p style={{ fontSize: '11px', color: unlocked ? 'var(--ink)' : 'var(--ink-4)', textAlign: 'center', lineHeight: 1.4, fontWeight: unlocked ? 500 : 400 }}>{reward}</p>
                {unlocked && <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', padding: '2px 8px', background: 'rgba(29,79,255,0.1)', color: 'var(--blue)', borderRadius: '999px' }}>unlocked</span>}
              </div>
            )
          })}
        </div>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', textAlign: 'center' }}>
        Rewards are not ads. They are local reinforcement for real-world participation.
      </p>
    </div>
  )
}

// ─── MISSION AI ───────────────────────────────────────────────────────────────

const missionOptions = {
  rhythm: ['daily', 'every 2nd day', 'weekly', 'monthly'],
  time: ['10 min', '30 min', '1 hour', 'full evening'],
  energy: ['low energy', 'social', 'adventurous', 'calm'],
  category: ['move', 'connect', 'discover', 'create', 'reduce', 'learn'],
}

type MissionData = { title: string; body: string; meta: string[] }

const fallbackMissions: Record<string, MissionData> = {
  move: { title: 'Sunset walk before opening Instagram.', body: 'Take 20 minutes. Walk until the light changes. Notice one thing you\'ve never noticed on a route you\'ve walked a hundred times.', meta: ['20 min', 'solo', 'movement'] },
  connect: { title: 'One real message to someone you miss.', body: 'Not a like. Not a story reply. A real message: "Thinking of you. How are you doing?" Send it before you talk yourself out of it.', meta: ['10 min', 'solo', 'connection'] },
  discover: { title: 'Detour home without GPS.', body: 'Leave your usual route. Turn when it feels right. Trust your sense of direction. Arrive home having seen something you\'d never noticed before.', meta: ['20 min', 'solo', 'discovery'] },
  create: { title: 'Cook one thing from scratch tonight.', body: 'No recipe app. Pick 3 ingredients you already have. Make something. It doesn\'t have to be good — it just has to be yours.', meta: ['1 hour', 'solo or flat', 'creative'] },
  reduce: { title: 'Plastic-free grocery run.', body: 'Shop at the farmers market or unpackaged store this week. Bring your own bags. See how far you get. Unlock reward: 10% at Unverpackt.', meta: ['30 min', 'solo', 'sustainability'] },
  learn: { title: 'Sit in a new café and read for 30 minutes.', body: 'No headphones. Order something you\'ve never tried. Finish one chapter. Stay when you feel like leaving early.', meta: ['30 min', 'solo', 'presence'] },
}

// Confetti particles for accept celebration
const CONFETTI_COLORS = ['var(--blue)', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6']

function AcceptConfetti({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <AnimatePresence>
      {show && (
        <>
          {CONFETTI_COLORS.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0, x: (i - 2) * 14, scale: 1 }}
              animate={{ opacity: 0, y: -48 - i * 8, x: (i - 2) * 28, scale: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: color,
                pointerEvents: 'none',
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

function MissionAI({ onStreak }: { onStreak: () => void }) {
  const [sel, setSel] = useState({ rhythm: 'daily', time: '30 min', energy: 'social', category: 'connect' })
  const [mission, setMission] = useState<MissionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const generate = async () => {
    setLoading(true)
    setMission(null)
    setAccepted(false)
    try {
      const res = await fetch('/api/generate-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ energy: sel.energy, group: sel.energy === 'social' ? 'with a friend' : 'solo', time: sel.time }),
      })
      const data = await res.json()
      setMission(data)
    } catch {
      setMission(fallbackMissions[sel.category] || fallbackMissions.connect)
    }
    setLoading(false)
  }

  const accept = () => {
    setAccepted(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 800)
    onStreak()
  }

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>01 / Mission AI</p>
      <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: '8px' }}>Surprise me or customize.</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '28px' }}>
        Set your rhythm, available time, energy, and what you want more of. The AI generates a real-world mission tuned to this exact moment — not a generic tip.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '16px', marginBottom: '24px' }}>
        {(Object.entries(missionOptions) as [keyof typeof missionOptions, string[]][]).map(([key, opts]) => (
          <div key={key}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>{key}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {opts.map(o => (
                <button key={o} onClick={() => setSel(s => ({ ...s, [key]: o }))} style={{
                  padding: '4px 10px', borderRadius: '999px', fontSize: '12px',
                  background: sel[key] === o ? 'var(--blue)' : 'var(--paper)',
                  color: sel[key] === o ? 'var(--paper)' : 'var(--ink-2)',
                  border: `1px solid ${sel[key] === o ? 'var(--blue)' : 'var(--line)'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
                }}>{o}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={generate} disabled={loading} style={{
        padding: '12px 28px', background: 'var(--blue)', color: 'var(--paper)', border: 'none',
        borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        marginBottom: '20px', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
      }}>
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {[0, 0.15, 0.3].map((d, i) => (
              <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', display: 'inline-block' }} />
            ))}
          </span>
        ) : '✦ Generate my mission'}
      </button>

      <AnimatePresence mode="wait">
        {/* 5b: Skeleton loader */}
        {loading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              background: 'var(--paper)', border: '1px solid var(--line)',
              borderRadius: '12px', padding: '28px', marginBottom: '16px',
            }}>
            <div style={{ height: '10px', width: '40%', background: 'var(--line)', borderRadius: '4px', marginBottom: '16px', animation: 'shimmer 1.5s ease-in-out infinite' }} />
            <div style={{ height: '24px', width: '85%', background: 'var(--line)', borderRadius: '4px', marginBottom: '12px', animation: 'shimmer 1.5s ease-in-out 0.1s infinite' }} />
            <div style={{ height: '14px', width: '100%', background: 'var(--line)', borderRadius: '4px', marginBottom: '8px', animation: 'shimmer 1.5s ease-in-out 0.2s infinite' }} />
            <div style={{ height: '14px', width: '70%', background: 'var(--line)', borderRadius: '4px', animation: 'shimmer 1.5s ease-in-out 0.3s infinite' }} />
          </motion.div>
        )}

        {/* 5a: Mission card with improved entrance + glow */}
        {mission && !accepted && !loading && (
          <motion.div
            key="mission"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{
              opacity: 1, y: 0, scale: 1,
              boxShadow: '0 0 0 1px rgba(29,79,255,0.15), 0 8px 32px rgba(29,79,255,0.08)',
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--paper)', border: '1px solid rgba(29,79,255,0.3)',
              borderRadius: '12px', padding: 'clamp(20px,3vw,28px)', marginBottom: '16px',
            }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Mission · {sel.category} · {sel.time}
            </p>
            <h3 style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: 1.3 }}>{mission.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '16px' }}>{mission.body}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {mission.meta?.map((t: string) => (
                <span key={t} style={{ padding: '3px 10px', border: '1px solid var(--line)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {/* 5a: Accept button with spring hover + confetti */}
              <div style={{ position: 'relative' }}>
                <AcceptConfetti show={showConfetti} />
                <motion.button
                  onClick={accept}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  style={{
                    padding: '9px 20px', background: 'var(--blue)', color: 'var(--paper)',
                    border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  }}>
                  Accept · +1 streak
                </motion.button>
              </div>
              <button onClick={generate} style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>
                Another
              </button>
              <button onClick={() => setMission(null)} style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>
                Skip
              </button>
            </div>
          </motion.div>
        )}

        {accepted && (
          <motion.div key="accepted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.2)', borderRadius: '12px', marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--blue)' }}>Mission accepted. Streak growing.</p>
            <button onClick={() => { setMission(null); setAccepted(false) }} style={{ marginLeft: 'auto', padding: '8px 16px', background: 'var(--blue)', color: 'var(--paper)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              Next mission
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── CONTEXT AI ───────────────────────────────────────────────────────────────

const nudgeScenarios: Record<string, { title: string; body: string; cta: string }> = {
  'free evening': {
    title: "You have a free evening. Your flat's streak ends in 3 hours.",
    body: "Sunset walk? 20 minutes. You're one mission away from keeping the week alive. Sarah and Kai are probably in.",
    cta: "Accept mission",
  },
  'good weather': {
    title: "Best weather of the week. Right now.",
    body: "A community bike ride starts 400m away in 15 minutes. Or take the canal route you've been avoiding. Either way — go.",
    cta: "Join bike ride",
  },
  'calendar gap': {
    title: "Free Sunday morning. Your rarest resource.",
    body: "You've saved 'farmers market walk' three times. This is the morning it stops being saved and becomes done.",
    cta: "Start the mission",
  },
  'streak at risk': {
    title: "Your flat loses its 6-day streak in 2:47.",
    body: "Marcus is already out. The mission is a 10-minute walk. The streak is worth more than the scrolling you were about to do.",
    cta: "Join now",
  },
  'saved interest': {
    title: "Ceramic painting event · Kreuzberg · Sat 14:00.",
    body: "You saved 'try something creative' two weeks ago. This is the opening. 4 spots left. Lena is going.",
    cta: "Join event",
  },
}

function ContextAI() {
  const [active, setActive] = useState<keyof typeof nudgeScenarios>('free evening')
  const nudge = nudgeScenarios[active]

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>02 / Context AI</p>
      <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: '8px' }}>The right nudge at the right moment.</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '28px' }}>
        AI notices the opening — free evening, good weather, group streak at risk — and surfaces a mission that fits. No surveillance. Only the context you choose to share.
      </p>

      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>What's happening right now</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {(Object.keys(nudgeScenarios) as (keyof typeof nudgeScenarios)[]).map(k => (
          /* 5c: Scenario toggle cards with hover spring */
          <motion.button
            key={k}
            onClick={() => setActive(k)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              padding: '6px 14px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer',
              background: active === k ? 'var(--ink)' : 'var(--paper)',
              color: active === k ? 'var(--paper)' : 'var(--ink-2)',
              border: `1px solid ${active === k ? 'var(--ink)' : 'var(--line)'}`,
              fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
            }}>{k}</motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            /* 5c: active nudge card left border glow */
            borderLeft: '3px solid var(--blue)',
            boxShadow: 'inset 4px 0 16px rgba(29,79,255,0.06)',
            borderRadius: '12px',
            padding: 'clamp(20px,3vw,28px)', marginBottom: '16px',
          }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Participation OS · {active}
          </p>
          <h3 style={{ fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: 1.35 }}>{nudge.title}</h3>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '20px' }}>{nudge.body}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* 5c: CTA button hover/tap */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                padding: '9px 20px', background: 'var(--blue)', color: 'var(--paper)',
                border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>{nudge.cta}</motion.button>
            <button style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>Invite friend</button>
            <button style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>Maybe later</button>
          </div>
        </motion.div>
      </AnimatePresence>

      <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.6 }}>
        "AI does not replace reality. It notices the opening and makes participation easier than passive scrolling."
      </p>
    </div>
  )
}

// ─── LOCAL DISCOVERY ──────────────────────────────────────────────────────────

type ShopResult = {
  local: { name: string; type: string; why: string; address: string }[]
  online: { name: string; url: string; why: string; certifications: string[] }[]
  impact: string
}

const categories = ['gift', 'clothing', 'food & drink', 'home', 'wellness', 'books', 'other']
const values = ['local first', 'organic', 'fair trade', 'zero waste', 'second-hand', 'vegan']

function LocalDiscovery() {
  const [query, setQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [result, setResult] = useState<ShopResult | null>(null)
  const [loading, setLoading] = useState(false)

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/shop-consciously', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, categories: selectedCategories, values: selectedValues }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        local: [
          { name: 'Manufactum', type: 'Curated quality goods', why: 'Long-lasting products made with traditional craft. Buys once, lasts forever.', address: 'Hardenbergstr. 4–5, Charlottenburg' },
          { name: 'Gruene Erde Berlin', type: 'Organic lifestyle', why: 'Certified organic materials, fair production, beautiful basics.', address: 'Rosenthaler Str. 40, Mitte' },
          { name: 'The Slow Stores', type: 'Conscious fashion collective', why: 'Curated brands meeting strict ethical criteria. Worth it.', address: 'Torstr. 70, Mitte' },
        ],
        online: [
          { name: 'Armed Angels', url: 'armed-angels.com', why: 'German brand, GOTS certified, fair wages, lovely cuts.', certifications: ['GOTS', 'Fair Wear'] },
          { name: 'Vinted', url: 'vinted.de', why: 'Second-hand is always the most sustainable option.', certifications: ['Circular economy'] },
          { name: 'Avocadostore', url: 'avocadostore.de', why: "Germany's largest sustainable marketplace. Curated and verified.", certifications: ['Various'] },
        ],
        impact: "Choosing locally made or second-hand reduces transport emissions by up to 70% and supports Berlin's local economy directly.",
      })
    }
    setLoading(false)
  }

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>03 / Local Discovery</p>
      <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: '8px' }}>When consumption happens anyway, choose local first.</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '28px' }}>
        Local Discovery AI redirects necessary consumption toward local and values-aligned choices. The core product is participation — this is what happens when shopping is unavoidable.
      </p>

      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
          What do you need?
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder="e.g. birthday gift for a friend who loves cooking"
            style={{
              flex: 1, padding: '12px 16px', fontSize: '15px',
              border: '1px solid var(--line)', borderRadius: '10px',
              background: 'var(--paper)', color: 'var(--ink)',
              outline: 'none', fontFamily: 'Arial, sans-serif',
            }}
          />
          <button onClick={search} disabled={loading || !query.trim()} style={{
            padding: '12px 24px', background: 'var(--blue)', color: 'var(--paper)',
            border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
            cursor: query.trim() ? 'pointer' : 'default', opacity: query.trim() ? 1 : 0.5,
            whiteSpace: 'nowrap',
          }}>
            {loading ? '...' : 'Find it'}
          </button>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Category</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {categories.map(c => (
              <button key={c} onClick={() => toggleArr(selectedCategories, c, setSelectedCategories)} style={{
                padding: '5px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer',
                background: selectedCategories.includes(c) ? 'var(--blue)' : 'var(--paper)',
                color: selectedCategories.includes(c) ? 'var(--paper)' : 'var(--ink-2)',
                border: `1px solid ${selectedCategories.includes(c) ? 'var(--blue)' : 'var(--line)'}`,
                fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>What matters to you</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {values.map(v => (
              <button key={v} onClick={() => toggleArr(selectedValues, v, setSelectedValues)} style={{
                padding: '5px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer',
                background: selectedValues.includes(v) ? 'var(--ink)' : 'var(--paper)',
                color: selectedValues.includes(v) ? 'var(--paper)' : 'var(--ink-2)',
                border: `1px solid ${selectedValues.includes(v) ? 'var(--ink)' : 'var(--line)'}`,
                fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', color: 'var(--ink-2)', fontSize: '14px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 0.15, 0.3].map((d, i) => (
                <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, delay: d, repeat: Infinity }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
              ))}
            </div>
            Searching local shops and sustainable options in Berlin...
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                In Berlin · Local first
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line)' }}>
                {result.local.map((shop, i) => (
                  <div key={i} style={{ padding: 'clamp(16px,2.5vw,24px)', background: 'var(--paper)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>{shop.name}</h3>
                        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)' }}>{shop.type}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '6px' }}>{shop.why}</p>
                      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)' }}>📍 {shop.address}</p>
                    </div>
                    <span style={{ padding: '4px 10px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', flexShrink: 0 }}>local</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '16px 20px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.15)', borderRadius: '10px' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Impact note</p>
              <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{result.impact}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type AITab = 'ask' | 'mission' | 'context' | 'local' | 'map'

export function ShopConsciously() {
  const [tab, setTab] = useState<AITab>('ask')
  const [streak, setStreak] = useState(0)

  const tabs: { id: AITab; label: string; dot?: boolean }[] = [
    { id: 'ask', label: 'Ask the City', dot: true },
    { id: 'mission', label: 'Mission AI' },
    { id: 'context', label: 'Context AI' },
    { id: 'local', label: 'Local Discovery' },
    { id: 'map', label: 'City Map' },
  ]

  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>

        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
          AI feature demo
        </p>
        <h1 style={{ fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '6px' }}>
          AI coordination,
        </h1>
        <h1 style={{ fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.0, fontStyle: 'italic', marginBottom: '20px' }}>
          not AI noise.
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '580px', marginBottom: '36px' }}>
          Four modules. Mission AI generates challenges. Context AI times nudges. Local Discovery redirects consumption. City Map reveals real nearby opportunities.
        </p>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '1px', background: 'var(--line)', marginBottom: '40px', borderRadius: '10px', overflow: 'hidden' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '11px 10px', background: tab === t.id ? (t.id === 'ask' ? 'var(--ink)' : 'var(--paper)') : 'var(--cream)',
              border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? (t.id === 'ask' ? 'var(--paper)' : 'var(--ink)') : 'var(--ink-3)',
              transition: 'all 0.25s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
            }}>
              {t.dot && tab === t.id && (
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', flexShrink: 0 }} />
              )}
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {tab === 'ask' && (
              <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(24px,4vw,48px)', minHeight: '400px', display: 'flex', alignItems: 'flex-start' }}>
                <AskTheCity />
              </div>
            )}
            {tab === 'mission' && <MissionAI onStreak={() => setStreak(s => s + 1)} />}
            {tab === 'context' && <ContextAI />}
            {tab === 'local' && <LocalDiscovery />}
            {tab === 'map' && <MapMockup />}
          </motion.div>
        </AnimatePresence>

        <StreakRewards streak={streak} />
      </div>
    </div>
  )
}
