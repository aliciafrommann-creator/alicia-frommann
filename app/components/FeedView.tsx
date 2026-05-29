'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── POST DATA ────────────────────────────────────────────────────────────────

type Post = {
  id: number
  user: string
  district: string
  mission: string
  missionType: 'walk' | 'run' | 'café' | 'dinner' | 'bike' | 'local'
  caption: string
  streak: number
  kudos: number
  time: string
  color: string
  emoji: string
  tag?: string
  visibility: 'private' | 'friends' | 'team' | 'community' | 'public'
  postedTo: string
  savedAs: string
}

const initialPosts: Post[] = [
  {
    id: 1, user: 'Sarah & the flat',
    district: 'Prenzlauer Berg',
    mission: 'No-phone dinner',
    missionType: 'dinner',
    caption: 'Flatmates cooking mission #7. Someone made pasta from scratch. We talked for 3 hours. This app is making us weird in the best way.',
    streak: 7, kudos: 23, time: '12 min ago',
    color: '#2D1B69', emoji: '🍝', tag: '7-day streak',
    visibility: 'team', postedTo: 'flatmates', savedAs: 'recipe ritual',
  },
  {
    id: 2, user: 'Marcus',
    district: 'Neukölln',
    mission: 'Sunset walk',
    missionType: 'walk',
    caption: "Took the canal route I've been ignoring for two years. Found a bookshop I never knew existed. Bought something I didn't need. Worth it.",
    streak: 14, kudos: 41, time: '34 min ago',
    color: '#1a3a4a', emoji: '🌅', tag: undefined,
    visibility: 'friends', postedTo: 'close friends', savedAs: 'walk',
  },
  {
    id: 3, user: 'Neukölln Run Club',
    district: 'Neukölln',
    mission: 'Tuesday ritual',
    missionType: 'run',
    caption: '23 people tonight. Started with 4 in January. This district is different now. See you next Tuesday.',
    streak: 22, kudos: 89, time: '1 hr ago',
    color: '#2d3a1a', emoji: '🏃', tag: 'Community ritual',
    visibility: 'community', postedTo: 'Neukölln Run Club', savedAs: 'weekly ritual',
  },
  {
    id: 4, user: 'Lena',
    district: 'Mitte',
    mission: 'Shop locally mission',
    missionType: 'local',
    caption: 'Needed a birthday gift. AI said try the ceramic studio on Rosenthaler. Found something actually beautiful for once. Zero Amazon guilt.',
    streak: 5, kudos: 17, time: '2 hr ago',
    color: '#3d1a1a', emoji: '🏺', tag: undefined,
    visibility: 'friends', postedTo: 'following', savedAs: 'local shop',
  },
  {
    id: 5, user: 'Kai & partner',
    district: 'Kreuzberg',
    mission: 'Café ritual',
    missionType: 'café',
    caption: "Saturday morning mission: find a new cafe we've never been to. Ended up staying for 3 hours reading. This is what weekends are supposed to feel like.",
    streak: 9, kudos: 31, time: '3 hr ago',
    color: '#2a1f35', emoji: '☕', tag: undefined,
    visibility: 'friends', postedTo: 'couple ritual', savedAs: 'cafe',
  },
  {
    id: 6, user: 'The Tuesday Bikers',
    district: 'Friedrichshain',
    mission: 'Bike commute challenge',
    missionType: 'bike',
    caption: "Week 3 of biking to work instead of the U-Bahn. Friedrichshain is winning the district challenge. Don't @ us.",
    streak: 21, kudos: 54, time: '5 hr ago',
    color: '#1a2d1a', emoji: '🚴', tag: 'District #1',
    visibility: 'community', postedTo: 'The Tuesday Bikers', savedAs: 'commute route',
  },
]

// ─── VISUAL PHOTO PLACEHOLDER ──────────────────────────────────────────────

function PhotoBlock({ color, emoji, size = 'full' }: { color: string, emoji: string, size?: 'full' | 'square' }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: size === 'square' ? '1' : '16/9',
      background: `linear-gradient(135deg, ${color} 0%, ${color}88 100%)`,
      borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <span style={{ fontSize: '48px', position: 'relative' }}>{emoji}</span>
    </div>
  )
}

// ─── SINGLE POST CARD ────────────────────────────────────────────────────────

function PostCard({ post, onKudo }: { post: Post, onKudo: (id: number) => void }) {
  const [kudoed, setKudoed] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleKudo = () => {
    if (!kudoed) {
      setKudoed(true)
      onKudo(post.id)
    }
  }

  const missionColors: Record<string, string> = {
    walk: 'var(--blue)',
    run: '#22c55e',
    café: '#f59e0b',
    dinner: '#8b5cf6',
    bike: '#06b6d4',
    local: '#ec4899',
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }}
      className="po-interactive-card"
      style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>

      <PhotoBlock color={post.color} emoji={post.emoji} />

      <div style={{ padding: 'clamp(14px,2vw,20px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>{post.user}</p>
              {post.streak >= 7 && (
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', background: 'rgba(29,79,255,0.08)', padding: '2px 8px', borderRadius: '999px' }}>
                  {post.streak}d streak
                </span>
              )}
            </div>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.03em' }}>
              {post.district} · {post.time} · {post.visibility}
            </p>
          </div>
          <span style={{
            padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 500,
            background: `${missionColors[post.missionType]}15`,
            color: missionColors[post.missionType],
            border: `1px solid ${missionColors[post.missionType]}25`,
            whiteSpace: 'nowrap', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
          }}>{post.mission}</span>
        </div>

        {post.tag && (
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', marginBottom: '8px', letterSpacing: '0.02em' }}>{post.tag}</p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', background: 'rgba(29,79,255,0.08)', border: '1px solid rgba(29,79,255,0.16)', padding: '3px 9px', borderRadius: '999px' }}>
            posted to: {post.postedTo}
          </span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', border: '1px solid var(--line)', padding: '3px 9px', borderRadius: '999px' }}>
            visibility: {post.visibility}
          </span>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '14px' }}>{post.caption}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="po-soft-action" onClick={handleKudo} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 500,
              background: kudoed ? 'rgba(29,79,255,0.08)' : 'transparent',
              color: kudoed ? 'var(--blue)' : 'var(--ink-3)',
              border: `1px solid ${kudoed ? 'rgba(29,79,255,0.2)' : 'var(--line)'}`,
              cursor: kudoed ? 'default' : 'pointer', transition: 'all 0.2s',
            }}>
              <motion.span animate={{ scale: kudoed ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
                {kudoed ? '★' : '☆'}
              </motion.span>
              {post.kudos + (kudoed ? 1 : 0)} kudos
            </button>
            <button className="po-soft-action" onClick={() => setSaved(s => !s)} style={{
              padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 500,
              background: saved ? 'rgba(29,79,255,0.08)' : 'transparent',
              color: saved ? 'var(--blue)' : 'var(--ink-3)',
              border: `1px solid ${saved ? 'rgba(29,79,255,0.2)' : 'var(--line)'}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {saved ? `saved as ${post.savedAs}` : `save ${post.savedAs}`}
            </button>
          </div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-4)' }}>
            {post.district}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── POST COMPOSER ────────────────────────────────────────────────────────────

function PostComposer({ onPost }: { onPost: (post: Post) => void }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'completed' | 'create'>('completed')
  const [caption, setCaption] = useState('')
  const [mission, setMission] = useState('')
  const [visibility, setVisibility] = useState<Post['visibility']>('friends')
  const [postedTo, setPostedTo] = useState('close friends')
  const [securityChecked, setSecurityChecked] = useState(false)
  const [posted, setPosted] = useState(false)
  const composerRef = useRef<HTMLDivElement | null>(null)

  const missionTypes = ['Sunset walk', 'Run club', 'Cafe ritual', 'No-phone dinner', 'Bike commute', 'Local shop mission']
  const createTypes = ['Team mission', 'Community event', 'Shop ritual', 'Weekly challenge']
  const visibilityOptions: Post['visibility'][] = ['private', 'friends', 'team', 'community', 'public']
  const targets = mode === 'completed'
    ? ['close friends', 'flatmates', 'team streak', 'Neukolln Run Club', 'public feed']
    : ['flatmates', 'Neukolln Run Club', 'Girls Walk Berlin', 'Coffee & Bike', 'Book Club Walk']
  const colors = ['#1a3a4a', '#2D1B69', '#2d3a1a', '#3d1a1a', '#2a1f35', '#1a2d1a']
  const emojis: Record<string, string> = {
    'Sunset walk': '🌅', 'Run club': '🏃', 'Cafe ritual': '☕',
    'No-phone dinner': '🍽', 'Bike commute': '🚴', 'Local shop mission': '🛍',
    'Team mission': '✦', 'Community event': '◎', 'Shop ritual': '☕', 'Weekly challenge': '◇',
  }

  const submit = () => {
    if (!caption.trim() || !mission) return
    if (mode === 'create' && !securityChecked) return
    const newPost: Post = {
      id: Date.now(),
      user: mode === 'create' ? `You / ${postedTo}` : 'You',
      district: 'Berlin',
      mission,
      missionType: mode === 'create' ? 'local' : 'walk',
      caption,
      streak: Math.floor(Math.random() * 20) + 1,
      kudos: 0,
      time: 'just now',
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[mission] || '✦',
      visibility,
      postedTo,
      savedAs: mode === 'create' ? 'event idea' : 'activity',
    }
    onPost(newPost)
    setCaption('')
    setMission('')
    setSecurityChecked(false)
    setOpen(false)
    setPosted(true)
    setTimeout(() => setPosted(false), 3000)
  }

  const canSubmit = Boolean(caption.trim() && mission && (mode === 'completed' || securityChecked))

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (composerRef.current && !composerRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div>
      <AnimatePresence>
        {posted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: '12px 16px', background: 'rgba(29,79,255,0.08)', border: '1px solid rgba(29,79,255,0.2)', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', color: 'var(--blue)', fontWeight: 500 }}>
            Mission posted. Let your city see it.
          </motion.div>
        )}
      </AnimatePresence>

      {!open ? (
        <button onClick={() => setOpen(true)} style={{
          width: '100%', padding: '14px 20px', background: 'var(--paper)', border: '1px solid var(--line)',
          borderRadius: '12px', fontSize: '14px', color: 'var(--ink-3)', cursor: 'pointer',
          textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px',
        }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0, color: 'var(--paper)' }}>+</span>
          Share completed mission or create a team/community mission...
        </button>
      ) : (
        <motion.div ref={composerRef} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Participation composer</p>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', background: 'var(--cream-2)', border: '1px solid var(--line)', borderRadius: '999px', padding: '4px', marginBottom: '14px' }}>
            {[
              ['completed', 'Share completed mission'],
              ['create', 'Create team/community mission'],
            ].map(([key, label]) => (
              <button key={key} onClick={() => { setMode(key as 'completed' | 'create'); setMission(''); setSecurityChecked(false); setVisibility(key === 'completed' ? 'friends' : 'community'); setPostedTo(key === 'completed' ? 'close friends' : 'Neukolln Run Club') }} style={{
                padding: '7px 12px',
                borderRadius: '999px',
                background: mode === key ? 'var(--blue)' : 'transparent',
                color: mode === key ? 'var(--paper)' : 'var(--ink-3)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
              }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
            {(mode === 'completed' ? missionTypes : createTypes).map(m => (
              <button key={m} onClick={() => setMission(m)} style={{
                padding: '5px 12px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer',
                background: mission === m ? 'var(--blue)' : 'var(--cream-2)',
                color: mission === m ? 'var(--paper)' : 'var(--ink-2)',
                border: `1px solid ${mission === m ? 'var(--blue)' : 'var(--line)'}`,
                transition: 'all 0.2s', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
              }}>{m}</button>
            ))}
          </div>

          <textarea value={caption} onChange={e => setCaption(e.target.value)}
            placeholder={mode === 'completed' ? 'What happened after completion? Optional photo would appear here in the real app.' : 'What are you inviting people into? Keep it free, safe, specific and real-world.'}
            style={{
              width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '10px',
              background: 'var(--cream-2)', color: 'var(--ink)', fontSize: '14px', lineHeight: 1.6,
              resize: 'vertical', minHeight: '80px', fontFamily: 'Arial, sans-serif', outline: 'none',
              boxSizing: 'border-box',
            }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '10px', marginTop: '12px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Visibility</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {visibilityOptions.map(v => (
                  <button key={v} onClick={() => setVisibility(v)} style={{
                    padding: '5px 9px', borderRadius: '999px', border: `1px solid ${visibility === v ? 'rgba(29,79,255,0.24)' : 'var(--line)'}`,
                    background: visibility === v ? 'rgba(29,79,255,0.08)' : 'transparent', color: visibility === v ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '9px',
                  }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Posted to</p>
              <select value={postedTo} onChange={e => setPostedTo(e.target.value)} style={{ width: '100%', border: '1px solid var(--line)', borderRadius: '999px', background: 'var(--cream-2)', color: 'var(--ink-2)', padding: '8px 10px', fontSize: '12px' }}>
                {targets.map(target => <option key={target}>{target}</option>)}
              </select>
            </div>
          </div>

          {mode === 'completed' ? (
            <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5 }}>
              Only completed missions become posts. Nothing is shared unless you choose visibility and destination.
            </p>
          ) : (
            <button onClick={() => setSecurityChecked(s => !s)} style={{
              width: '100%', marginTop: '12px', textAlign: 'left', padding: '11px 12px', borderRadius: '10px',
              border: `1px solid ${securityChecked ? 'rgba(29,79,255,0.24)' : 'var(--line)'}`,
              background: securityChecked ? 'rgba(29,79,255,0.08)' : 'var(--cream-2)',
              color: securityChecked ? 'var(--blue)' : 'var(--ink-3)',
              fontSize: '12px', lineHeight: 1.5,
            }}>
              {securityChecked ? '✓ ' : ''}Security check: no harmful missions, no exact private locations, host/community visibility, mute/report available.
            </button>
          )}

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={submit} disabled={!canSubmit} className="po-primary-action" style={{
              padding: '9px 20px', background: 'var(--blue)', color: 'var(--paper)', border: 'none',
              borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: canSubmit ? 'pointer' : 'default',
              opacity: canSubmit ? 1 : 0.5,
            }}>{mode === 'completed' ? 'Share completed mission' : 'Create mission'}</button>
            <button onClick={() => setOpen(false)} className="po-soft-action" style={{
              padding: '9px 16px', background: 'transparent', border: '1px solid var(--line)',
              borderRadius: '8px', fontSize: '13px', color: 'var(--ink-3)', cursor: 'pointer',
            }}>Cancel</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function FeedView() {
  const [posts, setPosts] = useState(initialPosts)
  const [filter, setFilter] = useState<string>('all')
  const [liveCount, setLiveCount] = useState(847)

  useEffect(() => {
    const t = setInterval(() => setLiveCount(c => c + Math.floor(Math.random() * 3)), 3000)
    return () => clearInterval(t)
  }, [])

  const handleKudo = (id: number) => {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, kudos: p.kudos + 1 } : p))
  }

  const handlePost = (post: Post) => {
    setPosts(ps => [post, ...ps])
  }

  const missionFilters = ['all', 'walk', 'run', 'café', 'dinner', 'bike', 'local']

  const filtered = filter === 'all' ? posts : posts.filter(p => p.missionType === filter)

  return (
    <div style={{ background: 'var(--cream)', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,4vw,40px)' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Not an attention feed. A participation feed.</p>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Berlin is participating.
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: '420px', marginTop: '8px' }}>
              Completed challenges, team streaks, community rituals and saved activities. You decide what you see and who gets to see what.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--ink-4)', lineHeight: 1.55, maxWidth: '460px', marginTop: '6px' }}>
              One person can belong to multiple teams and communities. The feed follows those layers without forcing everything public.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <motion.p key={liveCount} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {liveCount.toLocaleString()}
            </motion.p>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.04em' }}>missions today</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {missionFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 14px', borderRadius: '999px', fontSize: '12px', cursor: 'pointer',
              background: filter === f ? 'var(--ink)' : 'var(--paper)',
              color: filter === f ? 'var(--paper)' : 'var(--ink-2)',
              border: `1px solid ${filter === f ? 'var(--ink)' : 'var(--line)'}`,
              transition: 'all 0.2s', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.02em',
            }}>{f}</button>
          ))}
        </div>

        <PostComposer onPost={handlePost} />

        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <AnimatePresence>
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <PostCard post={post} onKudo={handleKudo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--ink-3)' }}>
            <p style={{ fontSize: '32px', marginBottom: '12px' }}>◎</p>
            <p style={{ fontSize: '14px', fontStyle: 'italic' }}>No missions in this category yet. Be the first.</p>
          </div>
        )}

        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--ink-4)', textAlign: 'center', marginTop: '32px', letterSpacing: '0.04em' }}>
          Prototype uses visual placeholders · posts and filters update live in this browser
        </p>
      </div>
    </div>
  )
}
