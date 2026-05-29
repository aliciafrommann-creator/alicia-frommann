'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { copyInvite, downloadCalendarEvent } from '../lib/demoActions'

const mono = 'var(--font-geist-mono)'

type MapSpot = {
  name: string
  type: string
  x: string
  y: string
  distance?: string
  learned?: boolean
}

type ActiveMission = {
  id: number
  title: string
  body: string
  type: 'ritual' | 'weekly challenge' | 'mission'
  status: 'active' | 'completed'
  visibility: string
}

const missions = [
  {
    title: 'Sunset walk mission',
    body: 'Take a 20-minute walk before sunset. Invite one person or keep it solo.',
    proof: 'Optional photo. Private by default.',
  },
  {
    title: 'No-phone reset',
    body: 'Put your phone away for 10 minutes and step outside before opening another feed.',
    proof: 'One sentence note, only if you want.',
  },
  {
    title: 'Cafe walk',
    body: "Walk to a nearby cafe you haven't tried yet. Save it as a local discovery.",
    proof: 'Save the place, photo optional.',
  },
  {
    title: 'Friend check-in',
    body: "Send one voice note to someone you've been meaning to call.",
    proof: 'No public proof needed.',
  },
  {
    title: 'Park mission',
    body: 'Find one calm outdoor place nearby and stay for 12 minutes.',
    proof: 'Optional photo. Private by default.',
  },
]

const seededPlaces: MapSpot[] = [
  { name: 'Volkspark Friedrichshain', type: 'park', x: '34%', y: '32%' },
  { name: 'Tempelhofer Feld', type: 'open space', x: '51%', y: '70%' },
  { name: 'Landwehrkanal', type: 'canal walk', x: '43%', y: '55%' },
  { name: 'Kornerpark', type: 'quiet park', x: '61%', y: '62%' },
  { name: 'Mauerpark', type: 'group walk', x: '46%', y: '25%' },
  { name: 'Tiergarten', type: 'green route', x: '25%', y: '44%' },
  { name: 'Maybachufer', type: 'water route', x: '54%', y: '52%' },
  { name: 'Viktoriapark', type: 'sunset spot', x: '39%', y: '61%' },
]

const learnedSeedSpots: MapSpot[] = [
  { name: 'Cafe ritual spot', type: '3 public completions', x: '68%', y: '39%', learned: true },
  { name: 'Quiet walk route', type: '5 saved walks', x: '29%', y: '68%', learned: true },
]

export function ScrollInterrupt() {
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const [missionIndex, setMissionIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [visibility, setVisibility] = useState('private')
  const [mapOpen, setMapOpen] = useState(false)
  const [completionOpen, setCompletionOpen] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [postNote, setPostNote] = useState('Sunset walk completed. Kept the streak alive.')
  const [status, setStatus] = useState('')
  const [geoStatus, setGeoStatus] = useState('Location optional · using Berlin seed places')
  const [mapPlaces, setMapPlaces] = useState<MapSpot[]>([...seededPlaces, ...learnedSeedSpots])
  const [learningSignals, setLearningSignals] = useState(['popular sunset walks', 'saved cafe rituals'])
  const [activeMissions, setActiveMissions] = useState<ActiveMission[]>([])
  const [savedMissions, setSavedMissions] = useState<{ title: string; body: string }[]>([])
  const [savedOpen, setSavedOpen] = useState(false)
  const fired = useRef(false)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const mission = missions[missionIndex]

  useEffect(() => {
    const t = setTimeout(() => {
      if (!fired.current) { fired.current = true; setVisible(true) }
    }, 60000)
    return () => clearTimeout(t)
  }, [])

  // Shift+D demo shortcut — trigger the notification immediately
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'D') { fired.current = true; setDone(false); setVisible(true) }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === 'd') {
        fired.current = true
        setDone(false)
        setVisible(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [modalOpen])

  const generateNew = () => {
    setMissionIndex(i => (i + 1) % missions.length)
    setStatus('New mission generated')
  }

  const later = () => {
    setSavedMissions(prev => {
      if (prev.some(m => m.title === mission.title)) return prev
      return [...prev, { title: mission.title, body: mission.body }]
    })
    setStatus('Saved for later')
    setTimeout(() => { setVisible(false) }, 900)
  }

  const addToCalendar = (title = mission.title, body = mission.body) => {
    downloadCalendarEvent({
      title: `Participation OS · ${title}`,
      description: `${body} Optional proof. Private by default.`,
      minutesFromNow: 90,
      durationMinutes: 30,
      filename: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`,
    })
    setStatus('Added to calendar')
  }

  const useLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('Location unavailable · using seed places')
      return
    }
    setGeoStatus('Requesting location...')
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude: lat, longitude: lon } = position.coords
      setGeoStatus('Reading public places near you...')
      try {
        const res = await fetch(`/api/nearby-places?lat=${lat}&lon=${lon}`)
        const data = await res.json()
        const liveSpots = (data.places || []).slice(0, 7).map((place: { name: string; type: string; distance: string }, index: number) => ({
          name: place.name,
          type: place.type,
          distance: place.distance,
          x: `${22 + ((index * 17) % 58)}%`,
          y: `${24 + ((index * 23) % 54)}%`,
        }))

        if (liveSpots.length) {
          setMapPlaces([...liveSpots, ...learnedSeedSpots])
          setGeoStatus('Local public places loaded. Exact location stays private.')
          setLearningSignals(['nearby public places', 'public completions', 'saved rituals'])
        } else {
          setGeoStatus('No public places returned nearby · using seed places')
        }
      } catch {
        setGeoStatus('Live place lookup failed · using seed places')
      }
    }, () => setGeoStatus('Location denied · using seed places'), { enableHighAccuracy: false, timeout: 9000, maximumAge: 10 * 60 * 1000 })
  }

  const startMission = () => {
    setActiveMissions(prev => {
      if (prev.some(item => item.title === mission.title)) return prev
      return [
        {
          id: Date.now(),
          title: mission.title,
          body: mission.body,
          type: 'mission' as const,
          status: 'active' as const,
          visibility: 'private',
        },
        ...(prev.length ? prev : [
          {
            id: Date.now() + 1,
            title: 'Be present ritual',
            body: 'One small no-phone reset today.',
            type: 'ritual' as const,
            status: 'active' as const,
            visibility: 'private',
          },
          {
            id: Date.now() + 2,
            title: 'Weekly challenge',
            body: 'Complete one real-world mission before Sunday.',
            type: 'weekly challenge' as const,
            status: 'active' as const,
            visibility: 'private',
          },
        ]),
      ].slice(0, 5)
    })
    setStatus('Mission active in your mission hub')
    setCompleted(false)
    setCompletionOpen(false)
    setModalOpen(false)
    setVisible(false)
  }

  const finishMission = () => {
    setCompleted(true)
    setVisibility('private')
    setStatus('Mission completed · private by default')
  }

  const postCompletion = () => {
    if (visibility === 'community' || visibility === 'public') {
      setLearningSignals(prev => Array.from(new Set(['this completed mission', 'public proof', ...prev])).slice(0, 4))
      setMapPlaces(prev => [
        { name: 'Learned sunset spot', type: 'new public completion', x: '57%', y: '38%', learned: true },
        ...prev,
      ].slice(0, 10))
      setStatus(`Posted to ${visibility} · AI learned from this public signal`)
    } else {
      setStatus(`Saved to ${visibility} · not used for public recommendations`)
    }
    setTimeout(() => { setModalOpen(false); setVisible(false); setDone(true) }, 900)
  }

  const completeActiveMission = (id: number) => {
    setActiveMissions(prev => prev.map(item => item.id === id ? { ...item, status: 'completed', visibility: 'private' } : item))
    setStatus('Mission completed · choose where it goes')
  }

  const setActiveVisibility = (id: number, nextVisibility: string) => {
    setActiveMissions(prev => prev.map(item => item.id === id ? { ...item, visibility: nextVisibility } : item))
  }

  const finishActiveMission = (item: ActiveMission) => {
    if (item.visibility === 'community' || item.visibility === 'public') {
      setLearningSignals(prev => Array.from(new Set([`${item.title} completed`, 'public proof', ...prev])).slice(0, 4))
      setMapPlaces(prev => [
        { name: 'Learned mission spot', type: 'new public completion', x: '58%', y: '37%', learned: true },
        ...prev,
      ].slice(0, 10))
      setStatus(`Posted to ${item.visibility} · AI learned from this public signal`)
    } else {
      setStatus(`Saved to ${item.visibility} · private signal only`)
    }
    setActiveMissions(prev => prev.filter(active => active.id !== item.id))
    if (activeMissions.length <= 1) setDone(true)
  }

  if (done && activeMissions.length === 0) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
              background: 'var(--paper)', border: '1px solid var(--line)',
              borderRadius: '14px', padding: '18px', width: '320px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
            }}>
            <button onClick={() => { setVisible(false); setDone(true) }} aria-label="Dismiss" style={{ position: 'absolute', top: '10px', right: '12px', color: 'var(--ink-4)', fontSize: '16px' }}>x</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
              <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                Participation OS
              </p>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
              Good time to step away for a bit.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: '12px' }}>
              Sunset in about 90 minutes. There's a walk mission ready when you are.
            </p>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700, marginBottom: '3px' }}>{mission.title}</p>
              <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45 }}>{mission.body}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
              <button onClick={() => setModalOpen(true)} className="po-primary-action" style={{ padding: '8px', background: 'var(--blue)', color: 'var(--paper)', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>Accept mission</button>
              <button onClick={generateNew} className="po-soft-action" style={{ padding: '8px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '12px', color: 'var(--ink-2)' }}>Generate new</button>
              <button onClick={later} className="po-soft-action" style={{ padding: '8px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '12px', color: 'var(--ink-2)' }}>Later</button>
              <button onClick={() => { setVisible(false); setDone(true) }} className="po-soft-action" style={{ padding: '8px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '12px', color: 'var(--ink-2)' }}>Dismiss</button>
            </div>
            {status && <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '10px' }}>{status}</p>}
          </motion.div>

          {modalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,14,26,0.18)', display: 'grid', placeItems: 'center', padding: '20px' }}>
              <motion.div ref={modalContentRef} initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                onClick={e => e.stopPropagation()}
                style={{ width: 'min(680px,100%)', maxHeight: '90vh', overflow: 'auto', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px', boxShadow: '0 24px 80px rgba(10,14,26,0.18)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'start', marginBottom: '18px' }}>
                  <div>
                    <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Mission detail</p>
                    <h2 style={{ fontSize: 'clamp(24px,4vw,42px)', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.05 }}>{mission.title}</h2>
                  </div>
                  <button onClick={() => setModalOpen(false)} aria-label="Close mission modal" style={{ color: 'var(--ink-4)', fontSize: '18px' }}>x</button>
                </div>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '18px' }}>{mission.body}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px,1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(10,14,26,0.025)' }}>
                    <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '8px' }}>Why now</p>
                    {['good weather', '90 minutes before sunset', 'group streak active', 'low-friction mission'].map(item => (
                      <p key={item} style={{ fontSize: '12px', color: 'var(--ink-2)', padding: '5px 0', borderTop: '1px solid var(--line)' }}>{item}</p>
                    ))}
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid var(--line)', background: 'rgba(10,14,26,0.025)' }}>
                    <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '8px' }}>Suggested proof</p>
                    <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>{mission.proof}</p>
                    <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, marginTop: '8px' }}>Nothing is posted unless you choose it.</p>
                  </div>
                </div>

                {mapOpen && (
                  <div style={{ border: '1px solid rgba(29,79,255,0.18)', borderRadius: '14px', padding: '14px', marginBottom: '16px', background: 'linear-gradient(135deg,#EEF2FF,var(--paper))' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'start', marginBottom: '10px' }}>
                      <div>
                        <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Participation map</p>
                        <p style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Beautiful places nearby. Opportunities, not people.</p>
                      </div>
                      <button onClick={useLocation} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Use my location</button>
                    </div>
                    <div style={{ position: 'relative', height: '220px', borderRadius: '14px', border: '1px solid rgba(29,79,255,0.18)', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(29,79,255,0.10), rgba(250,248,243,0.94))' }}>
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(29,79,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(29,79,255,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
                      <div style={{ position: 'absolute', left: '8%', right: '6%', top: '50%', height: '2px', background: 'rgba(29,79,255,0.18)', transform: 'rotate(-8deg)' }} />
                      <div style={{ position: 'absolute', left: '19%', right: '15%', top: '36%', height: '2px', background: 'rgba(29,79,255,0.14)', transform: 'rotate(18deg)' }} />
                      {mapPlaces.map((place, i) => (
                        <motion.button
                          key={place.name}
                          whileHover={{ scale: 1.14 }}
                          onClick={() => setStatus(`${place.name} selected`)}
                          style={{
                            position: 'absolute',
                            left: place.x,
                            top: place.y,
                            transform: 'translate(-50%,-50%)',
                            padding: i < 3 || place.learned ? '8px 10px' : '7px',
                            borderRadius: i < 3 || place.learned ? '999px' : '50%',
                            border: '1px solid rgba(29,79,255,0.28)',
                            background: i < 3 ? 'var(--blue)' : place.learned ? 'rgba(29,79,255,0.12)' : 'var(--paper)',
                            color: i < 3 ? 'var(--paper)' : 'var(--blue)',
                            boxShadow: '0 8px 22px rgba(29,79,255,0.16)',
                            fontFamily: mono,
                            fontSize: '9px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {i < 3 || place.learned ? place.name : ''}
                        </motion.button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '8px', marginTop: '10px', marginBottom: '10px' }}>
                      {mapPlaces.map((place, i) => (
                        <div key={place.name} style={{ padding: '10px', borderRadius: '10px', border: '1px solid rgba(29,79,255,0.14)', background: i < 3 ? 'rgba(29,79,255,0.07)' : 'rgba(250,248,243,0.75)' }}>
                          <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700 }}>{place.name}</p>
                          <p style={{ fontFamily: mono, fontSize: '9px', color: place.learned ? 'var(--blue)' : 'var(--ink-3)' }}>{place.learned ? `learned · ${place.type}` : `${place.type}${place.distance ? ` · ${place.distance}` : ''}`}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.12)', marginBottom: '10px' }}>
                      <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>AI learning signals</p>
                      <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45 }}>
                        Learns from voluntary public or community completions, saved rituals and repeated spots. Private, friends and team posts stay out of public recommendations.
                      </p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {learningSignals.map(signal => (
                          <span key={signal} style={{ padding: '4px 8px', borderRadius: '999px', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--blue)', fontFamily: mono, fontSize: '9px' }}>{signal}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, maxWidth: '420px' }}>The map reveals opportunities, not people. Exact location is off by default.</p>
                    </div>
                    <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '8px' }}>{geoStatus}</p>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button onClick={() => setMapOpen(v => !v)} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>{mapOpen ? 'Hide map' : 'Show map'}</button>
                  <button onClick={() => addToCalendar()} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Add to calendar</button>
                  <button onClick={async () => { await copyInvite(`Want to join my ${mission.title}? ${mission.body}`); setStatus('Invite text copied') }} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Invite friend</button>
                  <button onClick={() => setStatus('Saved for later')} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Save for later</button>
                  <button onClick={startMission} className="po-primary-action" style={{ padding: '9px 13px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '10px' }}>Start mission</button>
                </div>

                {completionOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '16px', padding: '14px', borderRadius: '14px', border: '1px solid rgba(29,79,255,0.18)', background: 'rgba(29,79,255,0.055)' }}>
                    <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>After completion</p>
                    {!completed ? (
                      <>
                        <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700, marginBottom: '4px' }}>Mission active</p>
                        <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: '10px' }}>Go do the walk first. Posting to friends, team or community unlocks only after the mission is completed.</p>
                        <button onClick={finishMission} className="po-primary-action" style={{ padding: '9px 13px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '10px' }}>Complete mission</button>
                      </>
                    ) : (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(180px,0.8fr)', gap: '12px', alignItems: 'stretch' }}>
                          <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--paper)', border: '1px solid rgba(29,79,255,0.14)' }}>
                            <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700, marginBottom: '6px' }}>Sunset walk completed</p>
                            <textarea value={postNote} onChange={e => setPostNote(e.target.value)} rows={3} style={{ width: '100%', resize: 'vertical', border: '1px solid var(--line)', borderRadius: '10px', padding: '10px', fontSize: '12px', color: 'var(--ink-2)', background: 'rgba(250,248,243,0.7)' }} />
                            <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45, marginTop: '7px' }}>Optional photo placeholder. Nothing posts unless you choose it.</p>
                          </div>
                          <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--paper)', border: '1px solid rgba(29,79,255,0.14)' }}>
                            <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Post to</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {['private', 'friends', 'team', 'community', 'public'].map(option => (
                                <button key={option} onClick={() => setVisibility(option)} className="po-soft-action" style={{ padding: '6px 10px', borderRadius: '999px', border: `1px solid ${visibility === option ? 'var(--blue)' : 'var(--line)'}`, background: visibility === option ? 'rgba(29,79,255,0.08)' : 'transparent', color: visibility === option ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px' }}>{option}</button>
                              ))}
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45, marginTop: '9px' }}>Like Strava, the share decision comes after the activity. Private is the default.</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                          <button onClick={postCompletion} className="po-primary-action" style={{ padding: '9px 13px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '10px' }}>{visibility === 'private' ? 'Save private completion' : `Post to ${visibility}`}</button>
                          <button onClick={() => setStatus('+1 ritual streak · reward progress')} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Add to streak</button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </>
      )}
      {activeMissions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              style={{
                position: 'fixed',
                left: '24px',
                bottom: '24px',
                zIndex: 998,
                width: 'min(380px, calc(100vw - 48px))',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 10px 34px rgba(10,14,26,0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Mission hub</p>
                  <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700 }}>Active rituals & missions</p>
                </div>
                <span style={{ padding: '4px 8px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', fontFamily: mono, fontSize: '9px' }}>
                  {activeMissions.filter(item => item.status === 'active').length} active
                </span>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {activeMissions.map(item => (
                  <div key={item.id} style={{ padding: '11px', borderRadius: '12px', border: '1px solid rgba(29,79,255,0.13)', background: item.status === 'completed' ? 'rgba(29,79,255,0.06)' : 'rgba(250,248,243,0.78)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'start', marginBottom: '5px' }}>
                      <div>
                        <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700 }}>{item.title}</p>
                        <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45 }}>{item.body}</p>
                      </div>
                      <span style={{ flexShrink: 0, padding: '3px 7px', borderRadius: '999px', border: '1px solid var(--line)', color: item.status === 'completed' ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '8px' }}>
                        {item.status}
                      </span>
                    </div>
                    {item.status === 'active' ? (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '9px' }}>
                        <button onClick={() => completeActiveMission(item.id)} className="po-primary-action" style={{ padding: '7px 10px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '9px' }}>Complete</button>
                        <button onClick={() => addToCalendar(item.title, item.body)} className="po-soft-action" style={{ padding: '7px 10px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: mono, fontSize: '9px' }}>Calendar</button>
                        <button onClick={async () => { await copyInvite(`Want to join my ${item.title}? ${item.body}`); setStatus(`${item.title} invite copied`) }} className="po-soft-action" style={{ padding: '7px 10px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: mono, fontSize: '9px' }}>Invite</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '9px' }}>
                          {['private', 'friends', 'team', 'community', 'public'].map(option => (
                            <button key={option} onClick={() => setActiveVisibility(item.id, option)} className="po-soft-action" style={{ padding: '5px 8px', borderRadius: '999px', border: `1px solid ${item.visibility === option ? 'var(--blue)' : 'var(--line)'}`, background: item.visibility === option ? 'rgba(29,79,255,0.08)' : 'transparent', color: item.visibility === option ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '8px' }}>{option}</button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '9px' }}>
                          <button onClick={() => finishActiveMission(item)} className="po-primary-action" style={{ padding: '7px 10px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '9px' }}>{item.visibility === 'private' ? 'Save private' : `Post to ${item.visibility}`}</button>
                          <span style={{ alignSelf: 'center', fontSize: '10px', color: 'var(--ink-3)' }}>Only public/community teaches the map.</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {status && <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '10px' }}>{status}</p>}
            </motion.div>
      )}

      {/* Saved-for-later missions panel */}
      {savedMissions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          style={{
            position: 'fixed',
            right: '24px',
            bottom: activeMissions.length > 0 ? '260px' : '24px',
            zIndex: 997,
            width: 'min(300px, calc(100vw - 48px))',
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(10,14,26,0.07)',
          }}
        >
          <button
            onClick={() => setSavedOpen(v => !v)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: savedOpen ? '1px solid var(--line)' : 'none',
            }}
          >
            <span style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Saved missions · {savedMissions.length}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--ink-4)' }}>{savedOpen ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {savedOpen && (
              <motion.div
                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {savedMissions.map((m, i) => (
                    <div key={i} style={{ padding: '9px 10px', borderRadius: '10px', border: '1px solid rgba(29,79,255,0.13)', background: 'rgba(29,79,255,0.04)' }}>
                      <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 600, marginBottom: '3px' }}>{m.title}</p>
                      <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45 }}>{m.body}</p>
                      <div style={{ display: 'flex', gap: '5px', marginTop: '7px' }}>
                        <button
                          onClick={() => {
                            setActiveMissions(prev => {
                              if (prev.some(a => a.title === m.title)) return prev
                              return [{ id: Date.now(), title: m.title, body: m.body, type: 'mission', status: 'active', visibility: 'private' }, ...prev]
                            })
                            setSavedMissions(prev => prev.filter((_, idx) => idx !== i))
                          }}
                          className="po-primary-action"
                          style={{ padding: '5px 10px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '9px' }}
                        >Start now</button>
                        <button
                          onClick={() => setSavedMissions(prev => prev.filter((_, idx) => idx !== i))}
                          className="po-soft-action"
                          style={{ padding: '5px 9px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: mono, fontSize: '9px' }}
                        >Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
