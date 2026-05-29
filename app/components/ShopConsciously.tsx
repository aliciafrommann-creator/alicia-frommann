'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapMockup } from './MapMockup'
import { copyInvite, downloadCalendarEvent } from '../lib/demoActions'
import { AskTheCity } from './AskTheCity'
import { toast } from './toast'
import { inviteFriend, addToCalendar } from '../lib/actions'

// ─── QR PLACEHOLDER ───────────────────────────────────────────────────────────
// Deterministic pseudo-QR grid from a string seed — looks like a real code.
function FakeQR({ seed, size = 96 }: { seed: string; size?: number }) {
  const cells = 13
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const rng = (n: number) => {
    h = (h * 1103515245 + 12345 + n) >>> 0
    return (h >>> 8) % 100 / 100
  }
  const cell = size / cells
  const rects: { x: number; y: number }[] = []
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const corner = (x < 4 && y < 4) || (x >= cells - 4 && y < 4) || (x < 4 && y >= cells - 4)
      if (corner || rng(y * cells + x) > 0.52) rects.push({ x, y })
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: '8px', background: 'white' }}>
      {rects.map(({ x, y }, i) => (
        <rect key={i} x={x * cell} y={y * cell} width={cell} height={cell} fill="#0A0E1A" />
      ))}
      {/* finder pattern centers in white */}
      {[[1, 1], [cells - 3, 1], [1, cells - 3]].map(([fx, fy], i) => (
        <rect key={`f${i}`} x={fx * cell} y={fy * cell} width={cell * 1} height={cell * 1} fill="white" />
      ))}
    </svg>
  )
}

// ─── STREAK REWARDS ───────────────────────────────────────────────────────────

const milestones = [
  { days: 3, reward: '10% off at partner café', icon: '☕', partner: 'Bonanza Coffee · Kreuzberg', discount: '10% off any drink' },
  { days: 7, reward: 'Free item at zero-waste shop', icon: '♻', partner: 'Original Unverpackt · Berlin', discount: 'One free pantry item' },
  { days: 14, reward: 'Sustainable brand voucher (€15)', icon: '✦', partner: 'Avocadostore', discount: '€15 voucher' },
  { days: 30, reward: 'Exclusive local experience', icon: '★', partner: 'Park Studio · Kreuzberg', discount: 'Free ceramics workshop seat' },
  { days: 60, reward: 'District champion status', icon: '◈', partner: 'Participation OS', discount: 'District champion badge' },
]
type Milestone = typeof milestones[number]

function VoucherModal({ milestone, onClose }: { milestone: Milestone; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const code = `POS-${milestone.days}D-${(milestone.partner.replace(/[^A-Z]/gi, '').slice(0, 4) || 'GIFT').toUpperCase()}`
  const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1500, background: 'rgba(10,14,26,0.55)', display: 'grid', placeItems: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{ width: 'min(380px, 100%)', background: 'var(--paper)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 30px 90px rgba(10,14,26,0.3)', position: 'relative' }}
      >
        <button onClick={onClose} aria-label="Close voucher" style={{ position: 'absolute', top: '14px', right: '16px', color: 'var(--paper)', fontSize: '18px', zIndex: 2, cursor: 'pointer' }}>×</button>
        <div style={{ background: 'var(--ink)', padding: '24px', color: 'var(--paper)' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Reward unlocked · day {milestone.days}</p>
          <h3 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '6px' }}>{milestone.discount}</h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{milestone.partner}</p>
        </div>
        {/* perforation */}
        <div style={{ position: 'relative', height: '1px', background: 'var(--line)' }}>
          <div style={{ position: 'absolute', left: '-10px', top: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--cream)' }} />
          <div style={{ position: 'absolute', right: '-10px', top: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--cream)' }} />
        </div>
        <div style={{ padding: '24px', display: 'flex', gap: '18px', alignItems: 'center' }}>
          <FakeQR seed={code} size={92} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px' }}>Show this code in-store</p>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '15px', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.04em', marginBottom: '10px' }}>{code}</p>
            <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.5 }}>Valid until {expiry}. One redemption.</p>
          </div>
        </div>
        <div style={{ padding: '0 24px 22px' }}>
          <button onClick={() => { toast('Voucher saved to wallet', 'success'); onClose() }} className="po-primary-action" style={{ width: '100%', padding: '11px', borderRadius: '10px', background: 'var(--blue)', color: 'var(--paper)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Save to wallet
          </button>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-4)', textAlign: 'center', marginTop: '10px' }}>concept · partner redemption built in the 10 weeks</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StreakRewards({ streak }: { streak: number }) {
  const max = 60
  const [claimed, setClaimed] = useState<number[]>([])
  const [claiming, setClaiming] = useState<number | null>(null)
  const [voucher, setVoucher] = useState<Milestone | null>(null)

  const claim = (m: Milestone) => {
    setClaiming(m.days)
    setTimeout(() => {
      setClaiming(null)
      setClaimed(prev => prev.includes(m.days) ? prev : [...prev, m.days])
      setVoucher(m)
    }, 900)
  }

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
            const isClaimed = claimed.includes(days)
            const isClaiming = claiming === days
            return (
              <div key={days} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{
                    background: unlocked ? 'var(--blue)' : 'var(--paper)',
                    boxShadow: unlocked && !isClaimed
                      ? '0 0 0 4px rgba(29,79,255,0.15)'
                      : '0 0 0 0px rgba(29,79,255,0)',
                    scale: isClaiming ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${unlocked ? 'var(--blue)' : 'var(--line)'}`,
                    fontSize: '16px',
                  }}>
                  <span style={{ filter: unlocked ? 'none' : 'grayscale(1)', opacity: unlocked ? 1 : 0.4 }}>
                    {isClaimed ? '✓' : icon}
                  </span>
                </motion.div>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: unlocked ? 'var(--blue)' : 'var(--ink-4)', textAlign: 'center' }}>day {days}</p>
                <p style={{ fontSize: '11px', color: unlocked ? 'var(--ink)' : 'var(--ink-4)', textAlign: 'center', lineHeight: 1.4, fontWeight: unlocked ? 500 : 400 }}>{reward}</p>
                {unlocked && !isClaimed && (
                  <motion.button
                    onClick={() => claim(milestones.find(m => m.days === days)!)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontFamily: 'var(--font-geist-mono)', fontSize: '9px',
                      padding: '3px 9px', background: isClaiming ? 'var(--blue)' : 'rgba(29,79,255,0.1)',
                      color: isClaiming ? 'var(--paper)' : 'var(--blue)', borderRadius: '999px',
                      border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                    {isClaiming ? 'Claiming...' : 'Claim'}
                  </motion.button>
                )}
                {isClaimed && (
                  <button
                    onClick={() => setVoucher(milestones.find(m => m.days === days)!)}
                    style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', padding: '3px 9px', background: 'rgba(29,79,255,0.06)', color: 'var(--blue)', borderRadius: '999px', border: '1px solid rgba(29,79,255,0.2)', cursor: 'pointer' }}>
                    View voucher
                  </button>
                )}
                {!unlocked && (
                  <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-4)' }}>{days - streak} more {days - streak === 1 ? 'day' : 'days'}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', textAlign: 'center' }}>
        Rewards are not ads. They are local reinforcement for real-world participation.
      </p>
      <AnimatePresence>
        {voucher && <VoucherModal milestone={voucher} onClose={() => setVoucher(null)} />}
      </AnimatePresence>
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
type PrototypeMission = MissionData & {
  id: number
  status: 'active' | 'completed'
  visibility: 'private' | 'friends' | 'team' | 'community' | 'public'
}

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

function MissionAI({
  onStreak,
  onAcceptMission,
  onSaveMission,
  onInviteMission,
  onCalendarMission,
}: {
  onStreak: () => void
  onAcceptMission: (mission: MissionData) => void
  onSaveMission: (mission: MissionData) => void
  onInviteMission: (mission: MissionData) => void
  onCalendarMission: (mission: MissionData) => void
}) {
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
    if (mission) onAcceptMission(mission)
    onStreak()
    toast('Mission accepted · streak +1', 'success')
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
              <button onClick={() => onSaveMission(mission)} style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>
                Save
              </button>
              <button onClick={() => onInviteMission(mission)} style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>
                Invite
              </button>
              <button onClick={() => onCalendarMission(mission)} style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>
                Calendar
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
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--blue)' }}>Mission accepted. It now appears in My missions below.</p>
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
    title: "Sarah and Kai are thinking about a walk tonight.",
    body: "Sunset in about 90 minutes. Could be the canal route, could be anywhere. Good evening to be outside.",
    cta: "See what's on",
  },
  'good weather': {
    title: "Best weather of the week — right now.",
    body: "A community bike ride starts 400m away in 15 minutes. Or just take the canal route you've been meaning to try. Either way, it's a good moment.",
    cta: "Join bike ride",
  },
  'calendar gap': {
    title: "Free Sunday morning. Your rarest resource.",
    body: "You saved 'farmers market walk' a few times. This might be the morning it becomes a real memory instead of a saved idea.",
    cta: "Start the mission",
  },
  'streak at risk': {
    title: "Marcus just headed out — Sarah's thinking about joining him.",
    body: "Day 6 together. There's still a good window for a quick walk if you feel like it. No pressure, just a nice evening for it.",
    cta: "Join them",
  },
  'saved interest': {
    title: "Ceramic painting event · Kreuzberg · Sat 14:00.",
    body: "You saved 'try something creative' a couple of weeks ago. This is the opening. 4 spots left. Lena is going.",
    cta: "Join event",
  },
}

function ContextAI() {
  const [active, setActive] = useState<keyof typeof nudgeScenarios>('free evening')
  const [status, setStatus] = useState('')
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
            onClick={() => { setActive(k); setStatus('') }}
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
              onClick={() => { addToCalendar(nudge.title, nudge.body); setStatus(`${nudge.cta} · added to your calendar.`) }}
              className="po-primary-action"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                padding: '9px 20px', background: 'var(--blue)', color: 'var(--paper)',
                border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>{nudge.cta}</motion.button>
            <button onClick={() => inviteFriend(nudge.title)} className="po-soft-action" style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>Invite friend</button>
            <button onClick={() => { setStatus('Saved for later.'); toast('Saved for later', 'success') }} className="po-soft-action" style={{ padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer' }}>Maybe later</button>
          </div>
          {status && (
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', marginTop: '12px' }}>{status}</p>
          )}
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
                  <a
                    key={i}
                    href={`https://www.google.com/maps/search/${encodeURIComponent(shop.name + ' ' + shop.address)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="po-hover-row"
                    style={{ padding: 'clamp(16px,2.5vw,24px)', background: 'var(--paper)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'start', textDecoration: 'none' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>{shop.name}</h3>
                        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)' }}>{shop.type}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '6px' }}>{shop.why}</p>
                      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)' }}>📍 {shop.address} · open in maps →</p>
                    </div>
                    <span style={{ padding: '4px 10px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', flexShrink: 0 }}>local</span>
                  </a>
                ))}
              </div>
            </div>

            {result.online?.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Online · Verified sustainable
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line)' }}>
                  {result.online.map((shop, i) => (
                    <a
                      key={i}
                      href={shop.url.startsWith('http') ? shop.url : `https://${shop.url}`}
                      target="_blank" rel="noopener noreferrer"
                      className="po-hover-row"
                      style={{ padding: 'clamp(16px,2.5vw,24px)', background: 'var(--paper)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'start', textDecoration: 'none' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>{shop.name}</h3>
                          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)' }}>{shop.url} →</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '8px' }}>{shop.why}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {shop.certifications?.map(c => (
                            <span key={c} style={{ padding: '2px 8px', border: '1px solid var(--line)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-3)' }}>{c}</span>
                          ))}
                        </div>
                      </div>
                      <span style={{ padding: '4px 10px', background: 'rgba(10,14,26,0.05)', color: 'var(--ink-3)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', flexShrink: 0 }}>online</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

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
  const [myMissions, setMyMissions] = useState<PrototypeMission[]>([])
  const [savedActivities, setSavedActivities] = useState<MissionData[]>([])
  const [feedPosts, setFeedPosts] = useState(0)
  const [actionNote, setActionNote] = useState('')

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('participation-os-state')
      if (!raw) return
      const state = JSON.parse(raw)
      if (typeof state.streak === 'number') setStreak(state.streak)
      if (Array.isArray(state.myMissions)) setMyMissions(state.myMissions)
      if (Array.isArray(state.savedActivities)) setSavedActivities(state.savedActivities)
      if (typeof state.feedPosts === 'number') setFeedPosts(state.feedPosts)
    } catch {
      // Local persistence is a convenience layer; the prototype still works without it.
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('participation-os-state', JSON.stringify({ streak, myMissions, savedActivities, feedPosts }))
  }, [streak, myMissions, savedActivities, feedPosts])

  const tabs: { id: AITab; label: string; dot?: boolean }[] = [
    { id: 'ask', label: 'Ask the City', dot: true },
    { id: 'mission', label: 'Mission AI' },
    { id: 'context', label: 'Context AI' },
    { id: 'local', label: 'Local Discovery' },
    { id: 'map', label: 'City Map' },
  ]

  const acceptMission = (mission: MissionData) => {
    setMyMissions(prev => prev.some(item => item.title === mission.title)
      ? prev
      : [{ ...mission, id: Date.now(), status: 'active' as const, visibility: 'private' as const }, ...prev].slice(0, 4)
    )
    setActionNote('Mission added to My missions. Complete it before choosing where to post.')
  }

  const saveMission = (mission: MissionData) => {
    setSavedActivities(prev => prev.some(item => item.title === mission.title) ? prev : [mission, ...prev].slice(0, 4))
    setActionNote('Saved activity. This becomes a private preference signal.')
  }

  const addMissionToCalendar = (mission: MissionData) => {
    downloadCalendarEvent({
      title: `Participation OS · ${mission.title}`,
      description: `${mission.body} Optional proof. Private by default.`,
      filename: `${mission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`,
    })
    setActionNote('Calendar file downloaded.')
  }

  const inviteToMission = async (mission: MissionData) => {
    await copyInvite(`Want to join this Participation OS mission? ${mission.title} — ${mission.body}`)
    setActionNote('Invite text copied.')
  }

  const completeMission = (id: number) => {
    setMyMissions(prev => prev.map(item => item.id === id ? { ...item, status: 'completed', visibility: 'private' } : item))
    setStreak(s => s + 1)
    setActionNote('Mission completed. Now choose if it stays private or becomes a feed post.')
  }

  const updateMissionVisibility = (id: number, visibility: PrototypeMission['visibility']) => {
    setMyMissions(prev => prev.map(item => item.id === id ? { ...item, visibility } : item))
  }

  const postMission = (mission: PrototypeMission) => {
    setMyMissions(prev => prev.filter(item => item.id !== mission.id))
    if (mission.visibility !== 'private') setFeedPosts(p => p + 1)
    setActionNote(mission.visibility === 'private'
      ? 'Saved privately. It will not teach public recommendations.'
      : `Posted to ${mission.visibility}. Public/community posts can improve future map suggestions.`
    )
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px,8vw,96px) clamp(24px,6vw,64px)' }}>

        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Try AI Coordination
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
        <div style={{ marginBottom: '40px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--line)' }}>
          <div className="shop-tab-bar" style={{ display: 'flex', gap: '0', background: 'var(--cream)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: '1 0 auto', padding: '11px 10px', background: tab === t.id ? (t.id === 'ask' ? 'var(--ink)' : 'var(--paper)') : 'var(--cream)',
              border: 'none', borderRight: '1px solid var(--line)', cursor: 'pointer', fontSize: '11px', fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? (t.id === 'ask' ? 'var(--paper)' : 'var(--ink)') : 'var(--ink-3)',
              transition: 'all 0.25s', whiteSpace: 'nowrap',
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
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {tab === 'ask' && (
              <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: 'clamp(24px,4vw,48px)', minHeight: '400px', display: 'flex', alignItems: 'flex-start' }}>
                <AskTheCity />
              </div>
            )}
            {tab === 'mission' && (
              <MissionAI
                onStreak={() => setStreak(s => s + 1)}
                onAcceptMission={acceptMission}
                onSaveMission={saveMission}
                onInviteMission={inviteToMission}
                onCalendarMission={addMissionToCalendar}
              />
            )}
            {tab === 'context' && <ContextAI />}
            {tab === 'local' && <LocalDiscovery />}
            {tab === 'map' && <MapMockup />}
          </motion.div>
        </AnimatePresence>

        {(myMissions.length > 0 || savedActivities.length > 0 || actionNote) && (
          <div style={{ marginTop: '34px', borderTop: '1px solid var(--line)', paddingTop: '28px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Live product state</p>
            <h3 style={{ fontSize: 'clamp(18px,2vw,26px)', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              My missions actually update here.
            </h3>
            {actionNote && <p style={{ padding: '10px 12px', background: 'rgba(29,79,255,0.07)', border: '1px solid rgba(29,79,255,0.16)', borderRadius: '10px', color: 'var(--blue)', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>{actionNote}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '12px' }}>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '16px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>My missions</p>
                {myMissions.length === 0 ? (
                  <p style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Accept a mission to start.</p>
                ) : myMissions.map(item => (
                  <div key={item.id} style={{ padding: '11px 0', borderTop: '1px solid var(--line)' }}>
                    <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700 }}>{item.title}</p>
                    <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45, marginBottom: '8px' }}>{item.status} · {item.visibility}</p>
                    {item.status === 'active' ? (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button onClick={() => completeMission(item.id)} className="po-primary-action" style={{ padding: '6px 10px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontSize: '10px' }}>Complete</button>
                        <button onClick={() => addMissionToCalendar(item)} className="po-soft-action" style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontSize: '10px' }}>Calendar</button>
                        <button onClick={() => inviteToMission(item)} className="po-soft-action" style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontSize: '10px' }}>Invite</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '8px' }}>
                          {(['private', 'friends', 'team', 'community', 'public'] as PrototypeMission['visibility'][]).map(option => (
                            <button key={option} onClick={() => updateMissionVisibility(item.id, option)} className="po-soft-action" style={{ padding: '5px 8px', borderRadius: '999px', border: `1px solid ${item.visibility === option ? 'var(--blue)' : 'var(--line)'}`, background: item.visibility === option ? 'rgba(29,79,255,0.08)' : 'transparent', color: item.visibility === option ? 'var(--blue)' : 'var(--ink-3)', fontSize: '9px' }}>{option}</button>
                          ))}
                        </div>
                        <button onClick={() => postMission(item)} className="po-primary-action" style={{ padding: '6px 10px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontSize: '10px' }}>
                          {item.visibility === 'private' ? 'Save private' : `Post to ${item.visibility}`}
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '16px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Saved + feed</p>
                <p style={{ fontSize: '28px', color: 'var(--blue)', fontWeight: 700, letterSpacing: '-0.04em' }}>{savedActivities.length}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginBottom: '12px' }}>saved activities</p>
                <p style={{ fontSize: '28px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.04em' }}>{feedPosts}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginBottom: '12px' }}>simulated feed posts</p>
                {savedActivities.slice(0, 3).map(item => (
                  <p key={item.title} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.45, paddingTop: '8px', borderTop: '1px solid var(--line)' }}>{item.title}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        <StreakRewards streak={streak} />
      </div>
    </div>
  )
}
