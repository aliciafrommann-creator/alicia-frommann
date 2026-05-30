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
            initial={{ scale: 1.15, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ fontSize: '52px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em', color: broken ? 'rgba(255,255,255,0.3)' : 'var(--blue)' }}
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
                    ? broken && i === Math.min(streak, 7) - 1 ? 'rgba(255,255,255,0.18)' : '#1D4FFF'
                    : 'rgba(255,255,255,0.08)',
                }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
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
                style={{ fontSize: '12px', color: broken ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: warned && !broken ? '6px' : '0' }}
              >
                {broken
                  ? 'Tomorrow is a new day. Keep going.'
                  : `Sarah just headed out. ${m}:${String(s).padStart(2, '0')} to join her`}
              </motion.p>
            )}
          </AnimatePresence>
          {warned && !broken && (
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%', borderRadius: '2px', background: 'var(--blue)' }}
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', marginBottom: '14px' }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2D1B69', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0 }}>S</div>
              <div>
                <p style={{ fontSize: '13px', color: 'white', marginBottom: '3px', lineHeight: 1.4 }}>
                  <strong>Sarah</strong> just headed out. "Join me for tonight's walk?"
                </p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.28)' }}>
                  Evening window · {m}:{String(s).padStart(2, '0')} left
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={complete}
          className="po-primary-action"
          style={{ padding: '9px 18px', background: 'var(--blue)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          Complete mission
        </button>
        <button
          onClick={skip}
          className="po-soft-action"
          style={{ padding: '9px 18px', background: 'transparent', color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
        >
          Skip today
        </button>
      </div>
    </div>
  )
}
