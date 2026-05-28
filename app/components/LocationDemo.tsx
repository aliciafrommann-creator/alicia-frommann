'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Location = { city: string; district: string; lat: number; lon: number }

export function LocationDemo() {
  const [loc, setLoc] = useState<Location | null>(null)
  const [loading, setLoading] = useState(false)
  const [denied, setDenied] = useState(false)
  const [missions] = useState([
    { type: 'sunset walk', count: Math.floor(Math.random() * 15) + 8, active: true },
    { type: 'run club', count: Math.floor(Math.random() * 8) + 3, active: true },
    { type: 'café ritual', count: Math.floor(Math.random() * 20) + 12, active: false },
  ])

  const detect = () => {
    if (!navigator.geolocation) return
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          setLoc({
            city: data.address?.city || data.address?.town || data.address?.village || 'your city',
            district: data.address?.suburb || data.address?.quarter || data.address?.neighbourhood || 'your area',
            lat,
            lon,
          })
        } catch {
          setLoc({ city: 'your city', district: 'your area', lat, lon })
        }
        setLoading(false)
      },
      () => { setDenied(true); setLoading(false) }
    )
  }

  return (
    <div style={{ maxWidth: '560px', marginTop: '48px', paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
        AI coordination demo · live
      </p>

      <AnimatePresence mode="wait">
        {!loc && !denied && (
          <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 style={{ fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 700, color: 'white', letterSpacing: '-0.025em', marginBottom: '8px', lineHeight: 1.2 }}>
              What's active near you right now?
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '20px', maxWidth: '400px' }}>
              Share your location. See how Participation OS would surface what's happening in your city tonight.
            </p>
            <button
              onClick={detect}
              disabled={loading}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 22px', background: 'var(--blue)', color: 'white',
                border: 'none', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '12px', height: '12px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block' }}
                  />
                  Detecting...
                </>
              ) : '◎ Detect my location'}
            </button>
          </motion.div>
        )}

        {denied && (
          <motion.div key="denied" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.6 }}>
              Location access denied. In the real app, you'd set your city manually instead.
            </p>
          </motion.div>
        )}

        {loc && (
          <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: '6px' }}>
                📍 {loc.district}, {loc.city}
              </p>
              <h3 style={{ fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 700, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
                {loc.city} is participating tonight.
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              {missions.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', background: 'rgba(255,255,255,0.025)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {m.active && (
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }}
                      />
                    )}
                    <span style={{ fontSize: '13px', color: m.active ? 'white' : 'rgba(255,255,255,0.35)', fontStyle: m.active ? 'normal' : 'italic' }}>
                      {m.type}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: m.active ? 'var(--blue)' : 'rgba(255,255,255,0.22)' }}>
                    {m.count} {m.active ? 'active tonight' : 'completed'}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ background: 'rgba(29,79,255,0.12)', border: '1px solid rgba(29,79,255,0.25)', borderRadius: '12px', padding: '16px 18px' }}
            >
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                AI suggests · right now
              </p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '5px' }}>
                Good evening in {loc.district}.
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.6 }}>
                {missions[0].count} people are out on sunset walks near you. Your group hasn't done one this week. 25 minutes before it gets dark.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
