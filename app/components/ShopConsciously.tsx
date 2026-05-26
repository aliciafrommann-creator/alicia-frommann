'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        Drag the streak counter to see rewards unlock. Real vouchers, real shops, real incentive.
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
          AI feature demo
        </p>

        <h1 style={{ fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '8px' }}>
          Need something?
        </h1>
        <h1 style={{ fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.0, fontStyle: 'italic', marginBottom: '24px' }}>
          Shop consciously.
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px' }}>
          Tell the AI what you need. It finds where to get it locally in Berlin, or the most sustainable option online. This is the pull mechanic — you come when you need something, you leave knowing you made the right choice.
        </p>

        <StreakRewards />

        {/* Search */}
        <div style={{ marginBottom: '48px' }}>
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
