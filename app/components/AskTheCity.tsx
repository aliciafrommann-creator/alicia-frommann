'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Mission = { read: string; title: string; body: string; meta: string[]; why: string }
type NearbyPlace = { name: string; type: string; distance: string }

const PROMPTS = [
  "I have 30 minutes and feel a bit lonely",
  "It's raining and I don't want to leave the house",
  "My flatmates and I are bored tonight",
  "I've been scrolling for an hour, help",
  "I want to do something but have no energy",
  "Need a quiet break from screens",
  "Looking for something to do with a friend",
]

function filterByMission(places: NearbyPlace[], category: string, body: string): NearbyPlace[] {
  const text = `${category} ${body}`.toLowerCase()
  const keywords =
    /cafe|bakery|coffee|eat|food|hunger|hungry|bread/.test(text) ? ['cafe', 'bakery', 'coffee'] :
    /park|walk|run|sport|movement|garden|outdoor|nature/.test(text) ? ['park', 'sports', 'garden'] :
    /gallery|museum|art|creative|ceramic|paint/.test(text) ? ['gallery', 'museum', 'community'] :
    /book|library|read|learn/.test(text) ? ['library', 'book'] :
    /repair|bike|bicycle/.test(text) ? ['bicycle'] :
    /organic|zero.waste|grocer/.test(text) ? ['organic', 'bakery'] :
    /viewpoint|calm|quiet|mindful/.test(text) ? ['viewpoint', 'park', 'garden'] :
    []
  const filtered = keywords.length
    ? places.filter(p => keywords.some(k => p.type.toLowerCase().includes(k)))
    : places
  return (filtered.length ? filtered : places).slice(0, 3)
}

export function AskTheCity({ onShowOnMap }: { onShowOnMap?: () => void } = {}) {
  const [input, setInput] = useState('')
  const [mission, setMission] = useState<Mission | null>(null)
  const [loading, setLoading] = useState(false)
  const [streak, setStreak] = useState(0)
  const [placeholder, setPlaceholder] = useState(PROMPTS[0])
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([])
  const [loadingNearby, setLoadingNearby] = useState(false)
  const [nearbyOpen, setNearbyOpen] = useState(false)

  useEffect(() => {
    if (input) return
    let i = 0
    const t = setInterval(() => {
      i = (i + 1) % PROMPTS.length
      setPlaceholder(PROMPTS[i])
    }, 3400)
    return () => clearInterval(t)
  }, [input])

  const timeContext = () => {
    const h = new Date().getHours()
    if (h < 6) return 'late night'
    if (h < 11) return 'morning'
    if (h < 14) return 'midday'
    if (h < 18) return 'afternoon'
    if (h < 21) return 'evening'
    return 'night'
  }

  const findNearby = async () => {
    setNearbyOpen(true)
    if (nearbyPlaces.length || loadingNearby) return
    setLoadingNearby(true)
    const coords = await new Promise<{ lat: number; lon: number }>(resolve => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          p => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
          () => resolve({ lat: 52.515, lon: 13.405 })
        )
      } else {
        resolve({ lat: 52.515, lon: 13.405 })
      }
    })
    try {
      const res = await fetch(`/api/nearby-places?lat=${coords.lat}&lon=${coords.lon}`)
      const data = await res.json()
      setNearbyPlaces(filterByMission(data.places || [], mission?.meta?.[2] ?? '', mission?.body ?? ''))
    } catch { /* silent */ }
    setLoadingNearby(false)
  }

  const ask = async () => {
    const text = input.trim()
    if (!text) return
    setLoading(true)
    setMission(null)
    setNearbyPlaces([])
    setNearbyOpen(false)
    try {
      const r = await fetch('/api/ask-the-city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, timeOfDay: timeContext() }),
      })
      setMission(await r.json())
    } catch {
      setMission({
        read: 'Whatever it is right now, it gets lighter the moment you move toward something real.',
        title: 'Walk to the nearest water',
        body: "Wherever you are, there's water within reach: a river, a canal, a fountain. Walk toward it. Sit for five minutes. Let the city move around you.",
        meta: ['20 min', 'solo', 'presence'],
        why: 'Movement plus a destination beats sitting with the restless feeling.',
      })
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
        Ask the city · live Claude API
      </p>
      <h3 style={{ fontSize: 'clamp(20px,2.8vw,32px)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '8px' }}>
        Tell it how you feel.
      </h3>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '24px', maxWidth: '420px' }}>
        Type how you actually feel. The AI reads your mood and the time of day, then gives you one real-world mission.
      </p>

      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask() } }}
          placeholder={placeholder}
          rows={2}
          style={{
            width: '100%', padding: '14px 16px', fontSize: '15px', lineHeight: 1.55,
            background: 'rgba(255,255,255,0.06)', color: 'white',
            border: '1px solid rgba(255,255,255,0.13)', borderRadius: '12px',
            outline: 'none', resize: 'none', fontFamily: 'inherit',
            boxSizing: 'border-box', transition: 'border-color 0.2s',
          }}
        />
      </div>

      <button
        onClick={ask}
        disabled={loading || !input.trim()}
        className="po-primary-action"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '11px 24px', background: 'var(--blue)', color: 'white',
          border: 'none', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
          cursor: input.trim() && !loading ? 'pointer' : 'default',
          opacity: input.trim() && !loading ? 1 : 0.45,
          transition: 'opacity 0.2s',
        }}>
        {loading ? (
          <>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: '12px', height: '12px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block' }} />
            Reading...
          </>
        ) : 'Ask →'}
      </button>

      <AnimatePresence mode="wait">
        {mission && (
          <motion.div
            key={mission.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(8px)' }}
          >
            {/* The emotional read — arrives first, no label */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '18px', paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              {mission.read}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Your mission · {timeContext()}
              </p>
              <h4 style={{ fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 700, color: 'white', letterSpacing: '-0.025em', marginBottom: '10px', lineHeight: 1.25 }}>
                {mission.title}
              </h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '14px' }}>
                {mission.body}
              </p>
              {mission.why && (
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '16px', paddingLeft: '12px', borderLeft: '2px solid rgba(29,79,255,0.45)' }}>
                  {mission.why}
                </p>
              )}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {mission.meta?.map(t => (
                  <span key={t} style={{ padding: '4px 11px', border: '1px solid rgba(255,255,255,0.13)', borderRadius: '999px', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { setStreak(s => s + 1); setMission(null); setInput('') }}
                  className="po-primary-action"
                  style={{ padding: '8px 18px', background: 'var(--blue)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Accept · {streak > 0 ? `day ${streak + 1}` : 'start streak'}
                </button>
                <button
                  onClick={() => { setMission(null); setTimeout(() => inputRef.current?.focus(), 100) }}
                  className="po-soft-action"
                  style={{ padding: '8px 16px', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                >
                  Ask again
                </button>
              </div>

              {/* Nearby places */}
              <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={findNearby}
                  className="po-soft-action"
                  style={{ padding: '7px 14px', background: 'transparent', color: loadingNearby ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                >
                  {loadingNearby ? 'Finding places…' : nearbyOpen ? 'Nearby ↑' : 'Find it nearby →'}
                </button>

                <AnimatePresence>
                  {nearbyOpen && !loadingNearby && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {nearbyPlaces.length === 0 ? (
                          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>No matching places found nearby.</p>
                        ) : nearbyPlaces.map(p => (
                          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{p.name}</span>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-geist-mono)', whiteSpace: 'nowrap', marginLeft: '8px' }}>{p.type} · {p.distance}</span>
                          </div>
                        ))}
                        {onShowOnMap && (
                          <button
                            onClick={onShowOnMap}
                            className="po-soft-action"
                            style={{ marginTop: '4px', padding: '7px 14px', background: 'transparent', color: 'var(--blue)', border: '1px solid rgba(29,79,255,0.3)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', alignSelf: 'flex-start' }}
                          >
                            See all on map →
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}

        {streak > 0 && !mission && (
          <motion.div
            key="streak"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: 'rgba(29,79,255,0.14)', border: '1px solid rgba(29,79,255,0.28)', borderRadius: '12px' }}
          >
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>{streak}</span>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '5px' }}>day streak. The city remembers.</p>
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ background: i < streak ? 'var(--blue)' : 'rgba(255,255,255,0.1)' }}
                    transition={{ delay: i * 0.07 }}
                    style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                  />
                ))}
              </div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>One mission per day counts.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
