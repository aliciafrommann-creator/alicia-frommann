'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type MissionResult = {
  title: string
  body: string
  meta: string[]
  trigger?: string
  actions?: string[]
  visibility?: string
  feedPost?: string
  reward?: string
}

const aiDemoModes = [
  { id: 'mission', label: 'Mission AI', title: 'Surprise me or customize.', note: 'generate one real-world action' },
  { id: 'context', label: 'Context AI', title: 'The right nudge at the right moment.', note: 'calendar, weather, streaks, saved interests' },
  { id: 'local', label: 'Local Discovery AI', title: 'When consumption happens anyway, choose local first.', note: 'later layer, local options first' },
]

const aiControls = {
  style: ['surprise me', 'customize'],
  time: ['10 min', '30 min', 'evening'],
  mood: ['low energy', 'social', 'adventurous', 'calm'],
  energy: ['tired', 'restless', 'open', 'focused'],
  group: ['solo', 'with a friend', 'flatmates', 'team'],
  category: ['friends', 'nature', 'environment', 'learning', 'movement', 'comfort zone', 'local discovery'],
}

const contextSignals = ['free evening', 'good weather', 'calendar gap', 'group streak at risk', 'nearby community mission', 'saved interest', 'typical scroll time']
const contextExamples = [
  'Your flat is one mission away from maintaining the streak. Sunset walk?',
  'A girls walk starts 400m away. Want to join?',
  'Your Sunday morning is free. Want to turn it into a weekly ritual?',
]

function ParticipationAiLab() {
  const [mode, setMode] = useState('mission')
  const [controls, setControls] = useState({
    style: 'surprise me',
    time: '30 min',
    mood: 'calm',
    energy: 'open',
    group: 'flatmates',
    category: 'movement',
  })
  const [result, setResult] = useState<MissionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const generate = async () => {
    setLoading(true)
    setCompleted(false)
    try {
      const res = await fetch('/api/generate-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...controls,
          mode,
          district: 'Berlin',
          streak: mode === 'streak' ? 'group streak at risk tonight' : 'team momentum rising',
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        title: 'Sunset walk. 25 minutes.',
        body: 'Leave your screen and walk until the sky changes color. Notice one thing you have never noticed before on a street you know by heart.',
        meta: ['25 min', 'trusted group', 'low energy'],
        trigger: 'Free evening, good weather and a group streak make this a good opening.',
        actions: ['join', 'add to calendar', 'invite friend'],
        visibility: 'team',
        feedPost: 'We kept the streak alive with one quiet sunset walk.',
        reward: '7-day cafe ritual unlocked',
      })
    }
    setLoading(false)
  }

  return (
    <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px', marginBottom: '48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)', gap: 'clamp(20px,4vw,36px)', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
            Try AI Coordination · live
          </p>
          <h2 style={{ fontSize: 'clamp(24px,3.8vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>
            AI does not replace reality. It notices the opening and makes participation easier.
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '18px' }}>
            This is the core product logic: context in, real-world mission out. No chatbot pattern, no ads, no passive feed.
          </p>

          <div style={{ display: 'grid', gap: '8px', marginBottom: '18px' }}>
            {aiDemoModes.map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode(item.id)}
                className="po-hover-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: `1px solid ${mode === item.id ? 'rgba(29,79,255,0.28)' : 'var(--line)'}`,
                  background: mode === item.id ? 'rgba(29,79,255,0.08)' : 'var(--paper)',
                  textAlign: 'left',
                }}>
                <span>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: mode === item.id ? 'var(--blue)' : 'var(--ink)' }}>{item.label}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', marginTop: '3px' }}>{item.note}</span>
                </span>
                <span className="po-map-dot" style={{ width: '9px', height: '9px', borderRadius: '50%', background: mode === item.id ? 'var(--blue)' : 'var(--line-2)' }} />
              </motion.button>
            ))}
          </div>

          <button onClick={mode === 'local' ? () => document.getElementById('local-discovery-ai')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : generate} disabled={loading} className="po-primary-action" style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '999px',
            background: 'var(--blue)',
            color: 'var(--paper)',
            fontSize: '14px',
            fontWeight: 700,
            opacity: loading ? 0.74 : 1,
          }}>
            {loading ? 'AI is coordinating...' : mode === 'local' ? 'Try local discovery below' : 'Generate live participation moment'}
          </button>
        </div>

        <div className="po-interactive-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '12px' }}>{aiDemoModes.find(item => item.id === mode)?.title}</p>
          {mode === 'context' && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>AI notices</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                {contextSignals.map((signal, i) => (
                  <span key={signal} style={{ padding: '5px 9px', borderRadius: '999px', background: i < 4 ? 'rgba(29,79,255,0.08)' : 'transparent', border: `1px solid ${i < 4 ? 'rgba(29,79,255,0.16)' : 'var(--line)'}`, color: i < 4 ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{signal}</span>
                ))}
              </div>
              {contextExamples.map(example => (
                <p key={example} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5, padding: '8px 0', borderTop: '1px solid var(--line)' }}>{example}</p>
              ))}
            </div>
          )}
          {mode === 'local' && (
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>
              Local Discovery AI is a later layer. It redirects necessary consumption toward local and values-aligned options, but the emotional core remains real-world participation.
            </p>
          )}
          <div style={{ display: 'grid', gap: '13px', marginBottom: '16px' }}>
            {(Object.entries(aiControls) as [keyof typeof aiControls, string[]][]).map(([key, options]) => (
              <div key={key}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>{key}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {options.map(option => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setControls(s => ({ ...s, [key]: option }))}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '999px',
                        border: `1px solid ${controls[key] === option ? 'var(--blue)' : 'var(--line)'}`,
                        background: controls[key] === option ? 'rgba(29,79,255,0.08)' : 'transparent',
                        color: controls[key] === option ? 'var(--blue)' : 'var(--ink-3)',
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '10px',
                        transition: 'all 0.2s',
                      }}>
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-3)', fontSize: '13px' }}>
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.span key={i} animate={{ scale: [1, 1.45, 1], opacity: [0.35, 1, 0.35] }} transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
                ))}
                reading time, mood, group rhythm
              </motion.div>
            )}

            {result && !loading && (
              <motion.div key={result.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>AI trigger</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: '12px' }}>{result.trigger}</p>
                <h3 style={{ fontSize: '22px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '8px' }}>{result.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '12px' }}>{result.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {result.meta?.map(item => (
                    <span key={item} style={{ padding: '4px 9px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{item}</span>
                  ))}
                  {result.visibility && (
                    <span style={{ padding: '4px 9px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', border: '1px solid rgba(29,79,255,0.16)', color: 'var(--blue)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>visibility: {result.visibility}</span>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '14px' }}>
                  {(result.actions || ['join', 'add to calendar', 'invite friend']).map(action => (
                    <button key={action} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{action}</button>
                  ))}
                  <button onClick={() => setCompleted(true)} className="po-primary-action" style={{ padding: '7px 12px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>mark complete</button>
                </div>
                <AnimatePresence>
                  {completed && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'grid', gap: '8px', padding: '13px', borderRadius: '12px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.15)' }}>
                      <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700 }}>Completion state</p>
                      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.45 }}>Feed draft: {result.feedPost}</p>
                      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)' }}>reward: {result.reward}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── STREAK → VOUCHER VISUAL ─────────────────────────────────────────────────

const milestones = [
  { days: 3, reward: '10% off at partner cafe', icon: '☕', type: 'local', unlocked: true },
  { days: 7, reward: 'Free item at zero-waste shop', icon: '♻', type: 'local', unlocked: true },
  { days: 14, reward: 'Sustainable brand voucher (€15)', icon: '✦', type: 'brand', unlocked: false },
  { days: 30, reward: 'Exclusive local experience', icon: '★', type: 'experience', unlocked: false },
  { days: 60, reward: 'District champion status + partner perks', icon: '◈', type: 'status', unlocked: false },
]

function StreakRewards() {
  const [streak, setStreak] = useState(7)

  return (
    <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px', marginBottom: '48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Streak rewards
          </p>
          <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em' }}>
            The longer you show up, the better it gets.
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--cream-2)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--line)' }}>
          <button onClick={() => setStreak(s => Math.max(0, s - 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
          <div style={{ textAlign: 'center', minWidth: '60px' }}>
            <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1 }}>{streak}</p>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)' }}>day streak</p>
          </div>
          <button onClick={() => setStreak(s => Math.min(60, s + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '2px', background: 'var(--line)', zIndex: 0 }}>
          <motion.div
            animate={{ width: `${Math.min((streak / 60) * 100, 100)}%` }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ height: '100%', background: 'var(--blue)', borderRadius: '2px' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', position: 'relative', zIndex: 1 }}>
          {milestones.map(({ days, reward, icon }) => {
            const isUnlocked = streak >= days
            return (
              <div key={days} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  animate={{
                    background: isUnlocked ? 'var(--blue)' : 'var(--paper)',
                    scale: isUnlocked && streak === days ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${isUnlocked ? 'var(--blue)' : 'var(--line)'}`,
                    fontSize: '16px',
                  }}>
                  <span style={{ filter: isUnlocked ? 'none' : 'grayscale(1)', opacity: isUnlocked ? 1 : 0.4 }}>{icon}</span>
                </motion.div>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: isUnlocked ? 'var(--blue)' : 'var(--ink-4)', letterSpacing: '0.04em', textAlign: 'center' }}>day {days}</p>
                <p style={{ fontSize: '11px', color: isUnlocked ? 'var(--ink)' : 'var(--ink-4)', textAlign: 'center', lineHeight: 1.4, fontWeight: isUnlocked ? 500 : 400 }}>{reward}</p>
                {isUnlocked && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', padding: '2px 8px', background: 'rgba(29,79,255,0.1)', color: 'var(--blue)', borderRadius: '999px', letterSpacing: '0.06em' }}>
                    unlocked
                  </motion.span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', marginTop: '20px', textAlign: 'center' }}>
        Tap the streak counter to see rewards unlock. Local reinforcement for real participation.
      </p>
    </div>
  )
}

// ─── CONSCIOUS SHOPPING ASSISTANT ─────────────────────────────────────────────

type ShopResult = {
  local: { name: string; type: string; why: string; address: string }[]
  online: { name: string; url: string; why: string; certifications: string[] }[]
  impact: string
}

const categories = ['gift', 'clothing', 'food & drink', 'home', 'wellness', 'books', 'other']
const values = ['local first', 'organic', 'fair trade', 'zero waste', 'second-hand', 'vegan']

export function ShopConsciously() {
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
          { name: 'Vinted', url: 'vinted.de', why: 'Second-hand is always the most sustainable option. Huge German selection.', certifications: ['Circular economy'] },
          { name: 'Avocadostore', url: 'avocadostore.de', why: "Germany's largest sustainable marketplace. Curated and verified.", certifications: ['Various'] },
        ],
        impact: "Choosing locally made or second-hand reduces transport emissions by up to 70% and supports Berlin's local economy directly.",
      })
    }
    setLoading(false)
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>

        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>
          Try AI Coordination
        </p>

        <h1 style={{ fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '8px' }}>
          Try the
        </h1>
        <h1 style={{ fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.0, fontStyle: 'italic', marginBottom: '24px' }}>
          participation AI.
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px' }}>
          Test how the product turns time, mood, team rhythm and local context into real-world missions, streaks, feed moments and rewards.
        </p>

        <ParticipationAiLab />
        <StreakRewards />

        {/* Search */}
        <div id="local-discovery-ai" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Local discovery layer
          </p>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: '620px', marginBottom: '16px' }}>
            A later pull mechanic: when participation leads to a real need, AI can suggest local options first.
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
              cursor: query.trim() ? 'pointer' : 'default', opacity: query.trim() ? 1 : 0.5, transition: 'opacity 0.2s',
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
                  padding: '5px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
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
                  padding: '5px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
                  background: selectedValues.includes(v) ? 'var(--ink)' : 'var(--paper)',
                  color: selectedValues.includes(v) ? 'var(--paper)' : 'var(--ink-2)',
                  border: `1px solid ${selectedValues.includes(v) ? 'var(--ink)' : 'var(--line)'}`,
                  fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
                }}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading */}
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

        {/* Results */}
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
                          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.015em' }}>{shop.name}</h3>
                          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.04em' }}>{shop.type}</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '6px' }}>{shop.why}</p>
                        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.02em' }}>📍 {shop.address}</p>
                      </div>
                      <span style={{ padding: '4px 10px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', letterSpacing: '0.04em', flexShrink: 0 }}>local</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Online · If you must
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line)' }}>
                  {result.online.map((shop, i) => (
                    <div key={i} style={{ padding: 'clamp(16px,2.5vw,24px)', background: 'var(--paper)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.015em' }}>{shop.name}</h3>
                          <a href={`https://${shop.url}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', textDecoration: 'none' }}>{shop.url}</a>
                        </div>
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          {shop.certifications.map(c => (
                            <span key={c} style={{ padding: '2px 8px', border: '1px solid var(--line)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-3)' }}>{c}</span>
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{shop.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '16px 20px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.15)', borderRadius: '10px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Impact note</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{result.impact}</p>
              </div>

              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-4)', marginTop: '16px', textAlign: 'center', letterSpacing: '0.02em' }}>
                AI-generated suggestions · Always verify before purchasing
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
