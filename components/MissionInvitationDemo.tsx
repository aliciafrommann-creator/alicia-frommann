'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function MissionInvitationDemo() {
  const [step, setStep] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [cityCount, setCityCount] = useState(847)

  const next = () => {
    if (step === 0) setStep(1)
    else if (step === 1) acceptMission()
  }

  const acceptMission = () => {
    setStep(2)
    let n = 1
    const si = setInterval(() => { setStreakCount(n); n++; if (n > 7) clearInterval(si) }, 120)
    let c = 847
    const ci = setInterval(() => { c++; setCityCount(c); if (c >= 852) clearInterval(ci) }, 200)
  }

  const restart = () => { setStep(0); setStreakCount(0); setCityCount(847) }

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>The product moment</p>
      <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '4px' }}>One notification.</h2>
      <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: 'var(--blue)', fontStyle: 'italic', letterSpacing: '-0.025em', marginBottom: '32px' }}>The whole product in 10 seconds.</h2>

      <div style={{ maxWidth: '360px', margin: '0 auto', background: 'var(--cream-2)', borderRadius: '16px', padding: 'clamp(16px,3vw,28px)' }}>
        {/* Notification 1: mission invite */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 18px', marginBottom: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Participation OS</span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-3)', marginLeft: 'auto' }}>now</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E6F1FB', color: '#185FA5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 500, marginRight: '10px', flexShrink: 0 }}>SL</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>Sarah is inviting you to a mission.</div>
              </div>
              <div style={{ background: 'var(--cream-2)', borderRadius: '10px', padding: '12px 14px', marginBottom: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)', marginBottom: '6px' }}>Sunset walk before dinner. 25 minutes.</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                  {['25 min', '2 people', 'Prenzlauer Berg'].map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', padding: '3px 8px', border: '0.5px solid var(--line)', borderRadius: '999px', color: 'var(--ink-3)', letterSpacing: '0.04em' }}>{t}</span>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: 500, marginBottom: step === 1 ? '12px' : '0' }}>
                ↗ Your flat’s 6-day streak is on the line.
              </motion.div>
              {step === 1 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button onClick={acceptMission} style={{ flex: 1, padding: '9px', background: 'var(--blue)', color: 'var(--paper)', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Accept mission</button>
                  <button style={{ flex: 1, padding: '9px', background: 'transparent', color: 'var(--ink-3)', border: '0.5px solid var(--line)', borderRadius: '10px', fontSize: '13px', cursor: 'pointer' }} onClick={() => {}}>Later</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification 2: streak */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ background: 'var(--blue)', borderRadius: '12px', padding: '16px 18px', marginBottom: '12px' }}>
              <div style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '10px', opacity: 0.7, color: 'white' }}>Streak maintained</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
                <div style={{ fontSize: '28px', fontWeight: 500, color: 'white', lineHeight: 1 }}>{streakCount}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'white', marginBottom: '6px' }}>days together</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} style={{ width: '18px', height: '18px', borderRadius: '50%', background: i < streakCount ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)', transition: `background 0.3s ${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '13px', opacity: 0.75, fontStyle: 'italic', color: 'white' }}>„Your flat has walked 18km together this month.“</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification 3: city */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
              style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Prenzlauer Berg</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '6px' }}>
                <div style={{ fontSize: '28px', fontWeight: 500, color: 'var(--blue)', lineHeight: 1 }}>{cityCount.toLocaleString()}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>missions today</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', marginBottom: '10px' }}>„Sunset walks are active across the district tonight.“</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', padding: '3px 8px', border: '0.5px solid var(--line)', borderRadius: '999px', color: 'var(--ink-3)' }}>+1 your contribution</span>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', padding: '3px 8px', border: '0.5px solid var(--blue)', borderRadius: '999px', color: 'var(--blue)' }}>leading this week</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ textAlign: 'center' as const, marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {step < 2 && (
          <button onClick={next} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: 'var(--blue)', color: 'var(--paper)', border: 'none', borderRadius: '999px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
            {step === 0 ? '▶ Start the demo' : '▶ Accept the mission'}
          </button>
        )}
        {step >= 2 && (
          <button onClick={restart} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: '999px', fontSize: '13px', cursor: 'pointer' }}>
            ↺ Restart
          </button>
        )}
      </div>

      {/* Psychology cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginTop: '32px' }}>
        {[
          { n: '01', title: 'Loss aversion', body: 'Breaking the streak feels worse than building it feels good. Shared streaks amplify this — you don’t just let yourself down.' },
          { n: '02', title: 'Social invitation', body: 'A notification from a friend creates FOMO and belonging simultaneously. Not an app prompt — a human moment.' },
          { n: '03', title: 'Tribal identity', body: '„Prenzlauer Berg is leading.“ District competition activates in-group identity at city scale. This is culture forming.' },
          { n: '04', title: 'Memory creation', body: '„Your flat has walked 18km together.“ Cumulative moments that make participation feel real, permanent, meaningful.' },
        ].map(({ n, title, body }) => (
          <div key={n} style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>{n} / psychology</p>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)', marginBottom: '6px' }}>{title}</p>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
