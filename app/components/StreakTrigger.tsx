'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StreakTrigger() {
  const [streak, setStreak] = useState(7)
  const [broken, setBroken] = useState(false)
  const [warned, setWarned] = useState(false)
  const [secs, setSecs] = useState(167)

  useEffect(() => {
    const t = setTimeout(() => setWarned(true), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (broken) return
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [broken])

  const m = Math.floor(secs / 60)
  const s = secs % 60
  const pct = Math.round(((167 - secs) / 167) * 100)

  const complete = () => {
    setStreak(prev => Math.min(prev + 1, 14))
    setBroken(false)
    setWarned(false)
    setSecs(167)
  }

  const skip = () => {
    setStreak(prev => Math.max(0, prev - 1))
    setBroken(true)
  }

  return (
    <div style={{ maxWidth: '520px', marginTop: '48px', paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
        Psychology demo · loss aversion
      </p>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px', lineHeight: 1.6 }}>
        Breaking the streak feels worse than building it feels good. Try it.
      </p>

      {/* Streak display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '14px', padding: '16px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em', marginBottom: '4px' }}>YOUR STREAK</p>
          <motion.p
            key={streak}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ fontSize: '52px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em', color: broken ? '#E24B4A' : 'var(--blue)' }}
          >
            {streak}
          </motion.p>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  background: i < Math.min(streak, 7)
                    ? broken && i === Math.min(streak, 7) - 1 ? '#E24B4A' : '#1D4FFF'
                    : 'rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ width: '22px', height: '22px', borderRadius: '50%' }}
              />
            ))}
          </div>
          <AnimatePresence>
            {(warned || broken) && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: '12px', color: '#E24B4A', fontWeight: 600, marginBottom: warned && !broken ? '6px' : '0' }}
              >
                {broken
                  ? `Streak broken. Back to ${streak}.`
                  : `⚠ Streak ends in ${m}:${String(s).padStart(2, '0')}`}
              </motion.p>
            )}
          </AnimatePresence>
          {warned && !broken && (
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${pct}%`, background: pct > 50 ? '#E24B4A' : '#1D4FFF' }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%', borderRadius: '2px' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Social notification */}
      <AnimatePresence>
        {warned && !broken && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', marginBottom: '14px' }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2D1B69', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0 }}>S</div>
              <div>
                <p style={{ fontSize: '13px', color: 'white', marginBottom: '3px', lineHeight: 1.4 }}>
                  <strong>Sarah</strong> is waiting. "Are you doing tonight's mission?"
                </p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.28)' }}>
                  Your flat loses its streak in {m}:{String(s).padStart(2, '0')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={complete}
          style={{ padding: '9px 18px', background: 'var(--blue)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          Complete mission
        </button>
        <button
          onClick={skip}
          style={{ padding: '9px 18px', background: 'transparent', color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
        >
          Skip today
        </button>
      </div>
    </div>
  )
}
