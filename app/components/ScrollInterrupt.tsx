'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mono = 'var(--font-geist-mono)'

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

const places = [
  { name: 'Volkspark Friedrichshain', type: 'park', x: '34%', y: '32%' },
  { name: 'Tempelhofer Feld', type: 'open space', x: '51%', y: '70%' },
  { name: 'Landwehrkanal', type: 'canal walk', x: '43%', y: '55%' },
  { name: 'Kornerpark', type: 'quiet park', x: '61%', y: '62%' },
  { name: 'Mauerpark', type: 'group walk', x: '46%', y: '25%' },
  { name: 'Tiergarten', type: 'green route', x: '25%', y: '44%' },
  { name: 'Maybachufer', type: 'water route', x: '54%', y: '52%' },
  { name: 'Viktoriapark', type: 'sunset spot', x: '39%', y: '61%' },
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
  const [geoStatus, setGeoStatus] = useState('Berlin demo mode')
  const fired = useRef(false)
  const mission = missions[missionIndex]

  useEffect(() => {
    const t = setTimeout(() => {
      if (!fired.current) { fired.current = true; setVisible(true) }
    }, 30000)
    return () => clearTimeout(t)
  }, [])

  const generateNew = () => {
    setMissionIndex(i => (i + 1) % missions.length)
    setStatus('New mission generated')
  }

  const later = () => {
    setStatus('Saved for later')
    setTimeout(() => { setVisible(false); setDone(true) }, 900)
  }

  const addToCalendar = () => {
    const start = new Date(Date.now() + 90 * 60 * 1000)
    const end = new Date(start.getTime() + 30 * 60 * 1000)
    const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Participation OS Demo//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@participation-os.demo`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      'SUMMARY:Participation OS · Sunset walk mission',
      'DESCRIPTION:Take a walk before sunset. Optional photo. Private by default.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'participation-os-sunset-walk.ics'
    a.click()
    URL.revokeObjectURL(url)
    setStatus('Added to calendar')
  }

  const useLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('Location unavailable · staying in Berlin demo mode')
      return
    }
    setGeoStatus('Requesting location...')
    navigator.geolocation.getCurrentPosition(
      () => setGeoStatus('Using approximate location · exact location stays private'),
      () => setGeoStatus('Location denied · staying in Berlin demo mode'),
      { enableHighAccuracy: false, timeout: 6000 },
    )
  }

  const startMission = () => {
    setStatus('Mission active · complete it first, then choose whether to post')
    setCompleted(false)
    setCompletionOpen(true)
  }

  const finishMission = () => {
    setCompleted(true)
    setVisibility('private')
    setStatus('Mission completed · private by default')
  }

  const postCompletion = () => {
    setStatus(`Posted to ${visibility}`)
    setTimeout(() => { setModalOpen(false); setVisible(false); setDone(true) }, 900)
  }

  if (done) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                Participation OS · demo
              </p>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
              You've been reading for 30 seconds.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: '12px' }}>
              Sunset in 90 minutes. Your group is nearby. Quick walk mission?
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
              style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,14,26,0.18)', display: 'grid', placeItems: 'center', padding: '20px' }}>
              <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
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
                        <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Participation map · demo mode</p>
                        <p style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Beautiful places nearby. Opportunities, not people.</p>
                      </div>
                      <button onClick={useLocation} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Use my location</button>
                    </div>
                    <div style={{ position: 'relative', height: '220px', borderRadius: '14px', border: '1px solid rgba(29,79,255,0.18)', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(29,79,255,0.10), rgba(250,248,243,0.94))' }}>
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(29,79,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(29,79,255,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
                      <div style={{ position: 'absolute', left: '8%', right: '6%', top: '50%', height: '2px', background: 'rgba(29,79,255,0.18)', transform: 'rotate(-8deg)' }} />
                      <div style={{ position: 'absolute', left: '19%', right: '15%', top: '36%', height: '2px', background: 'rgba(29,79,255,0.14)', transform: 'rotate(18deg)' }} />
                      {places.map((place, i) => (
                        <motion.button
                          key={place.name}
                          whileHover={{ scale: 1.14 }}
                          onClick={() => setStatus(`${place.name} selected`)}
                          style={{
                            position: 'absolute',
                            left: place.x,
                            top: place.y,
                            transform: 'translate(-50%,-50%)',
                            padding: i < 3 ? '8px 10px' : '7px',
                            borderRadius: i < 3 ? '999px' : '50%',
                            border: '1px solid rgba(29,79,255,0.28)',
                            background: i < 3 ? 'var(--blue)' : 'var(--paper)',
                            color: i < 3 ? 'var(--paper)' : 'var(--blue)',
                            boxShadow: '0 8px 22px rgba(29,79,255,0.16)',
                            fontFamily: mono,
                            fontSize: '9px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {i < 3 ? place.name : ''}
                        </motion.button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '8px', marginTop: '10px', marginBottom: '10px' }}>
                      {places.map((place, i) => (
                        <div key={place.name} style={{ padding: '10px', borderRadius: '10px', border: '1px solid rgba(29,79,255,0.14)', background: i < 3 ? 'rgba(29,79,255,0.07)' : 'rgba(250,248,243,0.75)' }}>
                          <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700 }}>{place.name}</p>
                          <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--ink-3)' }}>{i < 3 ? 'good fit' : place.type}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, maxWidth: '420px' }}>The map reveals opportunities, not people. Exact location is off by default.</p>
                    </div>
                    <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '8px' }}>{geoStatus}</p>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button onClick={() => setMapOpen(true)} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Open map</button>
                  <button onClick={addToCalendar} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Add to calendar</button>
                  <button onClick={() => setStatus('Invite drafted')} className="po-soft-action" style={{ padding: '9px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: mono, fontSize: '10px' }}>Invite friend</button>
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
                              {['private', 'friends', 'team', 'community'].map(option => (
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
    </AnimatePresence>
  )
}
