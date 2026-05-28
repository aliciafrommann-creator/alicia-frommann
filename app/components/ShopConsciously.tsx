'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type MissionResult = {
  title: string
  body: string
  meta: string[]
  duration?: string
  category?: string
  trigger?: string
  actions?: string[]
  visibility?: string
  invite?: string
  proof?: string
  streakValue?: string
  whyFits?: string
  feedPost?: string
  reward?: string
  missionType?: string
  ritualMotto?: string
}

type PrototypeMission = MissionResult & {
  id: number
  status: 'accepted' | 'completed' | 'saved'
}

type NearbyPlace = {
  name: string
  type: string
  distance: string
}

type LiveContext = {
  area: string
  weather: string
  sunset: string
  places: NearbyPlace[]
  sourceNote: string
}

const aiDemoModes = [
  { id: 'mission', label: 'Mission AI', title: 'Surprise me or customize.', note: 'generate one real-world action' },
  { id: 'context', label: 'Context AI', title: 'The right nudge at the right moment.', note: 'calendar, weather, streaks, saved interests' },
  { id: 'local', label: 'Local Discovery AI', title: 'When consumption happens anyway, choose local first.', note: 'later layer, local options first' },
]

const aiControls = {
  ritualMotto: ['be present', 'be brave', 'be sporty', 'be social', 'be local'],
  missionType: ['individual ritual', 'weekly challenge', 'extra mission', 'team mission', 'community mission'],
  time: ['10 min', '30 min', 'evening', 'weekend'],
  mood: ['low energy', 'social', 'adventurous', 'calm'],
}

const aiControlLabels: Record<keyof typeof aiControls, string> = {
  ritualMotto: 'weekly motto',
  missionType: 'mission type',
  time: 'time',
  mood: 'mood',
}

const contextSignals = ['free evening', 'good weather', 'calendar gap', 'group streak at risk', 'nearby community mission', 'saved interest', 'typical scroll time']
const contextExamples = [
  'Your flat is one mission away from maintaining the streak. Sunset walk?',
  'A girls walk starts 400m away. Want to join?',
  'Your Sunday morning is free. Want to turn it into a weekly ritual?',
]

const fallbackPlaces: NearbyPlace[] = [
  { name: 'Volkspark Friedrichshain', type: 'park', distance: 'demo nearby' },
  { name: 'Landwehrkanal', type: 'walk', distance: 'demo nearby' },
  { name: 'Tempelhofer Feld', type: 'open space', distance: 'demo nearby' },
]

function distanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 6371000
  const toRad = (n: number) => n * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return Math.round(r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

function formatDistance(meters: number) {
  if (meters < 1000) return `${Math.max(50, Math.round(meters / 50) * 50)}m`
  return `${(meters / 1000).toFixed(1)}km`
}

function weatherLabel(code?: number) {
  if (code === undefined) return 'weather available'
  if (code === 0) return 'clear sky'
  if ([1, 2, 3].includes(code)) return 'good weather'
  if ([45, 48].includes(code)) return 'misty'
  if (code >= 51 && code <= 67) return 'light rain'
  if (code >= 71 && code <= 77) return 'snowy'
  if (code >= 80) return 'showers nearby'
  return 'weather available'
}

function parseMissionMinutes(duration?: string) {
  const match = duration?.match(/\d+/)
  return match ? Number(match[0]) : 30
}

function missionStartTime(time: string, duration?: string, sunset?: string) {
  const now = new Date()
  const minutes = parseMissionMinutes(duration)
  const start = new Date(now.getTime() + 60 * 60 * 1000)

  if ((time === 'evening' || duration?.toLowerCase().includes('sunset')) && sunset) {
    const [hour, minute] = sunset.split(':').map(Number)
    if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
      start.setHours(hour, Math.max(0, minute - minutes), 0, 0)
      if (start.getTime() < now.getTime()) start.setDate(start.getDate() + 1)
    }
  }

  if (time === 'weekend') {
    const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7
    start.setDate(now.getDate() + daysUntilSaturday)
    start.setHours(11, 0, 0, 0)
  }

  return { start, end: new Date(start.getTime() + minutes * 60 * 1000) }
}

function ParticipationAiLab() {
  const [mode, setMode] = useState('mission')
  const [controls, setControls] = useState({
    ritualMotto: 'be present',
    missionType: 'weekly challenge',
    time: '30 min',
    mood: 'calm',
  })
  const [result, setResult] = useState<MissionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [interests, setInterests] = useState('')
  const [missions, setMissions] = useState<PrototypeMission[]>([])
  const [calendarState, setCalendarState] = useState('')
  const [feedDraft, setFeedDraft] = useState('')
  const [calendarContext, setCalendarContext] = useState('')
  const [activeSignals, setActiveSignals] = useState<string[]>(['free evening', 'good weather', 'group streak at risk'])
  const [streakPoints, setStreakPoints] = useState(0)
  const [rewardUnlocked, setRewardUnlocked] = useState(false)
  const [liveContext, setLiveContext] = useState<LiveContext | null>(null)
  const [liveContextStatus, setLiveContextStatus] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [inviteDraft, setInviteDraft] = useState('')
  const [visibilityChoice, setVisibilityChoice] = useState('private')
  const [locationChoice, setLocationChoice] = useState('off')
  const [demoRunning, setDemoRunning] = useState(false)
  const [careDemo, setCareDemo] = useState(false)
  const [showAdvancedControls, setShowAdvancedControls] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('participation-os-demo')
    if (stored) setMissions(JSON.parse(stored))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('participation-os-demo', JSON.stringify(missions))
  }, [missions])

  const rememberMission = (status: PrototypeMission['status']) => {
    if (!result) return
    const mission = { ...result, id: Date.now(), status }
    setMissions(prev => [mission, ...prev].slice(0, 5))
    setCalendarState(status === 'accepted' ? `${result.title} accepted` : '')
  }

  const addToCalendar = (title: string, body: string) => {
    const { start, end } = missionStartTime(controls.time, result?.duration, liveContext?.sunset)
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
      `SUMMARY:${title}`,
      `DESCRIPTION:${body}\\n\\nOptional proof. Private by default. Location is not public.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'mission'}.ics`
    a.click()
    URL.revokeObjectURL(url)
    setCalendarState(`calendar file downloaded · ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
  }

  const buildInviteDraft = () => {
    if (!result) return
    const text = `Want to do this with me? "${result.title}" ${result.duration || controls.time}. Private by default.`
    setInviteDraft(text)
    navigator.clipboard?.writeText(text).then(() => {
      setCalendarState('invite copied to clipboard')
    }).catch(() => {
      setCalendarState('invite draft ready')
    })
  }

  const completeMission = () => {
    if (!result) return
    setCompleted(true)
    rememberMission('completed')
    setFeedDraft(result.feedPost || '')
    setStreakPoints(p => {
      const next = Math.min(10, p + 1)
      if (next >= 10) setRewardUnlocked(true)
      return next
    })
  }

  const useLiveContext = async () => {
    if (!navigator.geolocation) {
      setLiveContextStatus('Location is not supported in this browser. Berlin demo mode stays active.')
      return
    }

    setLiveContextStatus('Waiting for location permission...')
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const approxLat = Number(lat.toFixed(3))
      const approxLon = Number(lon.toFixed(3))
      setLiveContextStatus('Reading weather and public places nearby...')

      try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${approxLat}&longitude=${approxLon}&current=weather_code&daily=sunrise,sunset&timezone=auto&forecast_days=1`
        const overpassQuery = `
          [out:json][timeout:8];
          (
            node(around:1600,${lat},${lon})["leisure"~"park|garden|sports_centre"];
            way(around:1600,${lat},${lon})["leisure"~"park|garden|sports_centre"];
            node(around:1600,${lat},${lon})["amenity"~"cafe|library|community_centre|theatre"];
            node(around:1600,${lat},${lon})["shop"~"books|bicycle|coffee|organic|bakery"];
            node(around:1600,${lat},${lon})["tourism"~"gallery|museum"];
          );
          out center 18;
        `
        const [weatherRes, osmRes] = await Promise.all([
          fetch(weatherUrl),
          fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            body: overpassQuery,
          }),
        ])
        const weather = await weatherRes.json()
        const osm = await osmRes.json()
        const places = (osm.elements || [])
          .map((item: any) => {
            const itemLat = item.lat ?? item.center?.lat
            const itemLon = item.lon ?? item.center?.lon
            const name = item.tags?.name
            if (!itemLat || !itemLon || !name) return null
            const type = item.tags?.amenity || item.tags?.leisure || item.tags?.shop || item.tags?.tourism || 'place'
            return {
              name,
              type: String(type).replace(/_/g, ' '),
              meters: distanceInMeters(lat, lon, itemLat, itemLon),
            }
          })
          .filter(Boolean)
          .sort((a: any, b: any) => a.meters - b.meters)
          .slice(0, 5)
          .map((place: any) => ({ name: place.name, type: place.type, distance: formatDistance(place.meters) }))

        const nextContext: LiveContext = {
          area: `approx. ${approxLat}, ${approxLon}`,
          weather: weatherLabel(weather.current?.weather_code),
          sunset: weather.daily?.sunset?.[0] ? new Date(weather.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'later today',
          places: places.length ? places : fallbackPlaces,
          sourceNote: 'Used approximate browser location, Open-Meteo weather and public OpenStreetMap places.',
        }
        setLiveContext(nextContext)
        setActiveSignals(prev => Array.from(new Set([...prev, 'nearby community mission', 'good weather'])))
        setCalendarContext(current => current || `Live context: ${nextContext.weather}, sunset ${nextContext.sunset}, nearby ${nextContext.places.map(p => `${p.name} (${p.distance})`).join(', ')}`)
        setLiveContextStatus('Live context active. Exact location is not posted or shown publicly.')
      } catch {
        setLiveContext({
          area: 'Berlin demo mode',
          weather: 'good weather',
          sunset: '20:47',
          places: fallbackPlaces,
          sourceNote: 'Live fetch failed, so the prototype stayed in seeded Berlin demo mode.',
        })
        setLiveContextStatus('Live sources were unavailable. Berlin demo mode is active.')
      }
    }, () => {
      setLiveContextStatus('Location permission denied. Berlin demo mode stays active.')
    }, { enableHighAccuracy: false, timeout: 9000, maximumAge: 10 * 60 * 1000 })
  }

  const generate = async () => {
    setLoading(true)
    setCompleted(false)
    setShowOptions(false)
    setInviteDraft('')
    try {
      const res = await fetch('/api/generate-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...controls,
          interests,
          calendarContext,
          contextSignals: activeSignals,
          mode,
          district: 'Berlin',
          streak: mode === 'context' ? activeSignals.join(', ') : 'team momentum rising',
          liveContext,
          nearbyPlaces: liveContext?.places || [],
          weather: liveContext?.weather || '',
          sunset: liveContext?.sunset || '',
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        title: 'Sunset walk. 25 minutes.',
        body: 'Leave your screen and walk until the sky changes color. Notice one thing you have never noticed before on a street you know by heart.',
        meta: ['25 min', 'trusted group', 'low energy'],
        duration: '25 min',
          category: controls.ritualMotto,
          missionType: controls.missionType,
          ritualMotto: controls.ritualMotto,
        trigger: 'Free evening, good weather and a group streak make this a good opening.',
        actions: ['join', 'add to calendar', 'invite friend'],
        visibility: 'team',
        invite: 'flatmates',
        proof: 'one sunset photo',
        streakValue: '+1 team streak',
        whyFits: 'It fits a low-energy evening and protects the group rhythm without needing much planning.',
        feedPost: 'We kept the streak alive with one quiet sunset walk.',
        reward: '7-day cafe ritual unlocked',
      })
    }
    setLoading(false)
  }

  const runGuidedDemo = () => {
    setDemoRunning(true)
    setCompleted(false)
    setShowOptions(false)
    setInviteDraft('')
    setStreakPoints(8)
    setRewardUnlocked(false)
    const demoContext: LiveContext = liveContext || {
      area: 'Berlin demo mode',
      weather: 'good weather',
      sunset: '20:47',
      places: fallbackPlaces,
      sourceNote: 'Demo mode uses seeded public Berlin opportunities.',
    }
    setLiveContext(demoContext)
    setResult(null)
    setCalendarState('context detected')
    window.setTimeout(() => {
      const mission = {
        title: 'Sunset walk mission',
        body: `Take a 20-minute walk near ${demoContext.places[0]?.name || 'a nearby park'}. Invite one person or keep it solo. Optional photo, private by default.`,
        meta: ['20 min', 'low-friction', demoContext.weather],
        duration: '20 min',
        category: 'movement',
        trigger: `${demoContext.weather}, sunset ${demoContext.sunset}, and a lightweight real-world opening make this a good moment.`,
        actions: ['join', 'add to calendar', 'invite friend'],
        visibility: 'private',
        invite: 'one trusted friend',
        proof: 'one optional photo',
        streakValue: '+1 streak point',
        whyFits: `It matches ${controls.mood}, ${controls.time}, and this week's "${controls.ritualMotto}" ritual without exposing your location.`,
        feedPost: 'Kept the streak alive with a quiet walk.',
        reward: 'surprise reward progress',
      }
      setResult(mission)
      setCalendarState('mission generated')
    }, 650)
    window.setTimeout(() => {
      setShowOptions(true)
      setCalendarState('nearby options ready')
    }, 1400)
    window.setTimeout(() => {
      setCalendarState('mission accepted')
    }, 2200)
    window.setTimeout(() => {
      setCompleted(true)
      setFeedDraft('Kept the streak alive with a quiet walk.')
      setStreakPoints(10)
      setRewardUnlocked(true)
      setCalendarState('complete · surprise reward unlocked')
      setDemoRunning(false)
    }, 3300)
  }

  const runCareDemo = () => {
    setCareDemo(true)
    setCompleted(false)
    setShowOptions(false)
    setInviteDraft('')
    setResult({
      title: 'Private grounding reset',
      body: 'This is not a social challenge. Take three slow breaths, put both feet on the floor, and consider contacting someone you trust if this feels serious.',
      meta: ['private', 'support-first', 'no streak pressure'],
      duration: '5 min',
      category: 'care',
      trigger: 'The input suggests this may be a moment for support, not a participation nudge.',
      actions: ['save', 'contact trusted person', 'pause nudges'],
      visibility: 'private',
      invite: 'trusted person if wanted',
      proof: 'none required',
      streakValue: 'no streak pressure',
      whyFits: 'The system should not gamify distress or push social exposure when someone may need care.',
      feedPost: '',
      reward: 'missions paused',
    })
    setVisibilityChoice('private')
    setLocationChoice('off')
    setCalendarState('care mode · no diagnosis · no public post')
  }

  return (
    <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px', marginBottom: '48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)', gap: 'clamp(20px,4vw,36px)', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
            Try AI Coordination · live
          </p>
          <h2 style={{ fontSize: 'clamp(24px,3.8vw,48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '12px' }}>
            AI does not replace reality. It notices the opening and makes participation easier.
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: '18px' }}>
            This is the core product logic: context in, real-world mission out. No chatbot pattern, no ads, no passive feed.
          </p>

          <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Start here</p>
            <p style={{ fontSize: '20px', color: 'var(--paper)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '12px' }}>
              Watch the whole loop in one click.
            </p>
            <button onClick={runGuidedDemo} disabled={demoRunning} className="po-primary-action" style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '999px',
              background: 'var(--blue)',
              color: 'var(--paper)',
              fontWeight: 700,
              fontSize: '14px',
            }}>
              {demoRunning ? 'Running product loop...' : 'Run 10-second product demo'}
            </button>
          </div>

          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '14px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '5px' }}>Live Context Mode</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  Use approximate location, weather and public places nearby to make the mission feel real.
                </p>
              </div>
              <button onClick={useLiveContext} className="po-soft-action" style={{ flexShrink: 0, padding: '8px 12px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>
                Use my location
              </button>
            </div>
            {liveContext && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'grid', gap: '8px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[liveContext.weather, `sunset ${liveContext.sunset}`, liveContext.area].map(item => (
                    <span key={item} style={{ padding: '4px 9px', borderRadius: '999px', background: 'rgba(29,79,255,0.07)', border: '1px solid rgba(29,79,255,0.14)', color: 'var(--blue)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{item}</span>
                  ))}
                </div>
                <div style={{ display: 'grid', gap: '5px' }}>
                  {liveContext.places.slice(0, 3).map(place => (
                    <p key={`${place.name}-${place.distance}`} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.45 }}>
                      {place.name} · {place.type} · {place.distance}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
            {liveContextStatus && (
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', lineHeight: 1.45, marginTop: '9px' }}>{liveContextStatus}</p>
            )}
          </div>

          <div style={{ display: 'grid', gap: '8px', marginBottom: '18px' }}>
            {aiDemoModes.map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode(item.id)}
                className="po-hover-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: `1px solid ${mode === item.id ? 'rgba(29,79,255,0.28)' : 'var(--line)'}`,
                  background: mode === item.id ? 'rgba(29,79,255,0.08)' : 'var(--paper)',
                  textAlign: 'left',
                }}>
                <span>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: mode === item.id ? 'var(--blue)' : 'var(--ink)' }}>{item.label}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', marginTop: '3px' }}>{item.note}</span>
                </span>
                <span className="po-map-dot" style={{ width: '9px', height: '9px', borderRadius: '50%', background: mode === item.id ? 'var(--blue)' : 'var(--line-2)' }} />
              </motion.button>
            ))}
          </div>

          <button onClick={mode === 'local' ? () => document.getElementById('local-discovery-ai')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : generate} disabled={loading} className="po-primary-action" style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '999px',
            background: 'var(--paper)',
            color: 'var(--blue)',
            border: '1px solid rgba(29,79,255,0.22)',
            fontSize: '14px',
            fontWeight: 700,
            opacity: loading ? 0.74 : 1,
          }}>
            {loading ? 'AI is coordinating...' : mode === 'local' ? 'Try local discovery below' : 'Generate custom mission'}
          </button>
          <button onClick={runCareDemo} className="po-soft-action" style={{
            width: '100%',
            marginTop: '8px',
            padding: '11px 16px',
            borderRadius: '999px',
            border: '1px solid var(--line)',
            background: careDemo ? 'rgba(29,79,255,0.06)' : 'var(--paper)',
            color: careDemo ? 'var(--blue)' : 'var(--ink-2)',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
          }}>
            Try care & safety response
          </button>
        </div>

        <div className="po-interactive-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.025em', marginBottom: '12px' }}>{aiDemoModes.find(item => item.id === mode)?.title}</p>
          {mode === 'context' && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>AI notices</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                {contextSignals.map(signal => (
                  <button
                    key={signal}
                    onClick={() => setActiveSignals(prev => prev.includes(signal) ? prev.filter(item => item !== signal) : [...prev, signal])}
                    className="po-soft-action"
                    style={{ padding: '5px 9px', borderRadius: '999px', background: activeSignals.includes(signal) ? 'rgba(29,79,255,0.08)' : 'transparent', border: `1px solid ${activeSignals.includes(signal) ? 'rgba(29,79,255,0.16)' : 'var(--line)'}`, color: activeSignals.includes(signal) ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>
                    {signal}
                  </button>
                ))}
              </div>
              {contextExamples.map(example => (
                <p key={example} style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5, padding: '8px 0', borderTop: '1px solid var(--line)' }}>{example}</p>
              ))}
            </div>
          )}
          {mode === 'local' && (
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '16px' }}>
              Local Discovery AI is a later layer. It redirects necessary consumption toward local and values-aligned options, but the emotional core remains real-world participation.
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: showAdvancedControls ? '14px' : '0' }}>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
              Default demo uses one weekly challenge and this week's ritual motto.
            </p>
            <button onClick={() => setShowAdvancedControls(prev => !prev)} className="po-soft-action" style={{ flexShrink: 0, padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>
              {showAdvancedControls ? 'Hide inputs' : 'Customize'}
            </button>
          </div>
          {showAdvancedControls && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ overflow: 'hidden', display: 'grid', gap: '13px', marginBottom: '16px' }}>
              {(Object.entries(aiControls) as [keyof typeof aiControls, string[]][]).map(([key, options]) => (
              <div key={key}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>{aiControlLabels[key]}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {options.map(option => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setControls(s => ({ ...s, [key]: option }))}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '999px',
                        border: `1px solid ${controls[key] === option ? 'var(--blue)' : 'var(--line)'}`,
                        background: controls[key] === option ? 'rgba(29,79,255,0.08)' : 'transparent',
                        color: controls[key] === option ? 'var(--blue)' : 'var(--ink-3)',
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '10px',
                        transition: 'all 0.2s',
                      }}>
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>Interests</p>
              <input
                value={interests}
                onChange={e => setInterests(e.target.value)}
                placeholder="optional: books, canals, coffee, courage..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>Calendar context</p>
              <input
                value={calendarContext}
                onChange={e => setCalendarContext(e.target.value)}
                placeholder="optional: free before dinner, Sunday open..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </motion.div>
          )}

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-3)', fontSize: '13px' }}>
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.span key={i} animate={{ scale: [1, 1.45, 1], opacity: [0.35, 1, 0.35] }} transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)' }} />
                ))}
                reading time, mood, group rhythm
              </motion.div>
            )}

            {result && !loading && (
              <motion.div key={result.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>AI trigger</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: '12px' }}>{result.trigger}</p>
                <h3 style={{ fontSize: '22px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: '8px' }}>{result.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '12px' }}>{result.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {result.meta?.map(item => (
                    <span key={item} style={{ padding: '4px 9px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{item}</span>
                  ))}
                  {result.duration && <span style={{ padding: '4px 9px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>duration: {result.duration}</span>}
                  {result.category && <span style={{ padding: '4px 9px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>category: {result.category}</span>}
                  {result.visibility && (
                    <span style={{ padding: '4px 9px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', border: '1px solid rgba(29,79,255,0.16)', color: 'var(--blue)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>visibility: {result.visibility}</span>
                  )}
                  {result.streakValue && <span style={{ padding: '4px 9px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', border: '1px solid rgba(29,79,255,0.16)', color: 'var(--blue)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{result.streakValue}</span>}
                </div>
                {result.whyFits && (
                  <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: '12px' }}>
                    Why it fits: {result.whyFits}
                  </p>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  {[
                    controls.mood,
                    controls.time,
                    liveContext?.weather,
                    liveContext ? `sunset ${liveContext.sunset}` : '',
                    liveContext?.places[0]?.distance ? `${liveContext.places[0].distance} place` : '',
                  ].filter(Boolean).map((chip, i, arr) => (
                    <span key={chip} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ padding: '4px 9px', borderRadius: '999px', background: i === arr.length - 1 ? 'rgba(29,79,255,0.08)' : 'transparent', border: '1px solid var(--line)', color: i === arr.length - 1 ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{chip}</span>
                      {i < arr.length - 1 && <span style={{ color: 'var(--blue)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>→</span>}
                    </span>
                  ))}
                  <span style={{ padding: '4px 9px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>{result.category || 'mission'}</span>
                </div>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(29,79,255,0.055)', border: '1px solid rgba(29,79,255,0.12)', marginBottom: '12px' }}>
                  <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '5px' }}>AI trust</p>
                  <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.5 }}>
                    Used: {liveContext ? 'approximate location, weather, public nearby places, ' : ''}your ritual motto, mission type, mood and time. Not used: exact public location, contacts, Instagram, Strava or ads.
                    {careDemo ? ' This is a safety fallback: no diagnosis, no streak pressure, no public post.' : ''}
                  </p>
                </div>
                {careDemo && (
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--ink)', marginBottom: '12px' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '5px' }}>Care response</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.5 }}>
                      Participation OS is not a therapist. When distress appears, the safer behavior is to pause the game mechanics and point toward care.
                    </p>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--paper)' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '7px' }}>Visibility</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {['private', 'friends', 'team', 'community'].map(option => (
                        <button key={option} onClick={() => setVisibilityChoice(option)} className="po-soft-action" style={{ padding: '4px 8px', borderRadius: '999px', border: `1px solid ${visibilityChoice === option ? 'var(--blue)' : 'var(--line)'}`, background: visibilityChoice === option ? 'rgba(29,79,255,0.08)' : 'transparent', color: visibilityChoice === option ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '9px' }}>{option}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--paper)' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '7px' }}>Location</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {['off', 'approximate', 'during mission'].map(option => (
                        <button key={option} onClick={() => setLocationChoice(option)} className="po-soft-action" style={{ padding: '4px 8px', borderRadius: '999px', border: `1px solid ${locationChoice === option ? 'var(--blue)' : 'var(--line)'}`, background: locationChoice === option ? 'rgba(29,79,255,0.08)' : 'transparent', color: locationChoice === option ? 'var(--blue)' : 'var(--ink-3)', fontFamily: 'var(--font-geist-mono)', fontSize: '9px' }}>{option}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px,1fr))', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(10,14,26,0.035)' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '4px' }}>Invite</p>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>{result.invite || 'trusted friend'}</p>
                  </div>
                  <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(10,14,26,0.035)' }}>
                    <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '4px' }}>Proof idea</p>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>{result.proof || 'short note, photo optional'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '14px' }}>
                  <button onClick={() => rememberMission('accepted')} className="po-primary-action" style={{ padding: '7px 12px', borderRadius: '999px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>Accept mission</button>
                  <button onClick={() => setShowOptions(prev => !prev)} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>Show nearby options</button>
                  <button onClick={() => rememberMission('saved')} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>Save</button>
                  <button onClick={() => addToCalendar(result.title, result.body)} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>add to calendar</button>
                  <button onClick={buildInviteDraft} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>Invite friend</button>
                  <button onClick={completeMission} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>Complete</button>
                  <button onClick={() => setFeedDraft(result.feedPost || '')} className="po-soft-action" style={{ padding: '7px 11px', borderRadius: '999px', border: '1px solid var(--line)', color: 'var(--ink-2)', fontFamily: 'var(--font-geist-mono)', fontSize: '10px' }}>Post to feed</button>
                </div>
                <AnimatePresence>
                  {showOptions && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px,1fr))', gap: '8px' }}>
                        {(liveContext?.places.length ? liveContext.places : fallbackPlaces).slice(0, 4).map(place => (
                          <div key={`${place.name}-${place.distance}`} style={{ padding: '10px', borderRadius: '10px', background: 'var(--paper)', border: '1px solid var(--line)' }}>
                            <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700, marginBottom: '4px' }}>{place.name}</p>
                            <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--blue)' }}>{place.type} · {place.distance}</p>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45, marginTop: '8px' }}>Nearby options use public places. They do not reveal private user locations.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {inviteDraft && (
                  <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5, background: 'rgba(10,14,26,0.035)', borderRadius: '10px', padding: '10px', marginBottom: '12px' }}>
                    Invite draft: {inviteDraft}
                  </p>
                )}
                {calendarState && <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', marginBottom: '12px' }}>{calendarState}</p>}
                <AnimatePresence>
                  {completed && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                      style={{ display: 'grid', gap: '8px', padding: '13px', borderRadius: '12px', background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.15)' }}>
                      <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700 }}>Completion state</p>
                      <div style={{ height: '7px', background: 'rgba(29,79,255,0.12)', borderRadius: '999px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: '0%' }} animate={{ width: `${Math.min(streakPoints * 10, 100)}%` }} transition={{ duration: 0.7 }} style={{ height: '100%', background: 'var(--blue)' }} />
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.45 }}>Feed draft: {result.feedPost || 'Private completion saved.'}</p>
                      <p style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.45 }}>Visibility: {visibilityChoice}. Location: {locationChoice}. Nothing posts unless you choose it.</p>
                      <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)' }}>reward: {result.reward}</p>
                      {rewardUnlocked && (
                        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ borderRadius: '10px', background: 'var(--paper)', border: '1px solid rgba(29,79,255,0.18)', padding: '10px' }}>
                          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', marginBottom: '4px' }}>SURPRISE UNLOCKED · QR READY</p>
                          <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700 }}>Local reward unlocked for one month.</p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '12px' }}>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '16px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>My missions</p>
          {missions.length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5 }}>Accepted and saved missions appear here.</p>
          ) : missions.map(mission => (
            <div key={mission.id} style={{ padding: '8px 0', borderTop: '1px solid var(--line)' }}>
              <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700 }}>{mission.title}</p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--ink-3)' }}>{mission.status} · {mission.visibility || 'friends'}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(29,79,255,0.06)', border: '1px solid rgba(29,79,255,0.14)', borderRadius: '14px', padding: '16px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Simulated feed post</p>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>{feedDraft || 'Complete a mission to generate a voluntary feed post draft.'}</p>
          <div style={{ height: '7px', background: 'rgba(29,79,255,0.12)', borderRadius: '999px', overflow: 'hidden', marginTop: '12px' }}>
            <motion.div animate={{ width: `${Math.min(streakPoints * 10, 100)}%` }} transition={{ duration: 0.6 }} style={{ height: '100%', background: 'var(--blue)' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: 'var(--blue)', marginTop: '10px' }}>{streakPoints}/10 streak points {rewardUnlocked ? '· surprise reward unlocked' : '· complete missions to unlock reward'}</p>
          {rewardUnlocked && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '10px', padding: '10px', borderRadius: '10px', background: 'var(--paper)', border: '1px solid rgba(29,79,255,0.16)' }}>
              <p style={{ fontSize: '12px', color: 'var(--ink)', fontWeight: 700 }}>Bookstore reward · QR ready</p>
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-3)', marginTop: '4px' }}>valid one month · disappears after redemption</p>
            </motion.div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '14px', padding: '13px 16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--paper)' }}>
        <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.55 }}>
          AI serves the user, not advertisers. No ads. No paid interruption. Calendar and location are optional. The user controls what is connected. Works anywhere with public nearby places; Berlin remains the focused pilot.
        </p>
      </div>
    </div>
  )
}

// ─── STREAK → VOUCHER VISUAL ─────────────────────────────────────────────────

const milestones = [
  { days: 3, reward: 'bakery surprise', icon: '☕', partner: 'Kiez bakery', state: 'redeemed' },
  { days: 7, reward: '15% at local coffee shop', icon: '▦', partner: 'Kiez Cafe', state: 'QR ready' },
  { days: 10, reward: 'bookstore reward', icon: '✦', partner: 'Mitte bookshop', state: 'unlocked' },
  { days: 14, reward: 'ceramic painting voucher', icon: '★', partner: 'Kreuzberg studio', state: 'locked' },
  { days: 21, reward: 'bio store gift', icon: '◈', partner: 'Local bio store', state: 'locked' },
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
          {milestones.map(({ days, reward, icon, partner, state }) => {
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
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: isUnlocked ? 'var(--blue)' : 'var(--ink-4)', letterSpacing: '0.04em', textAlign: 'center' }}>{days}-streak</p>
                <p style={{ fontSize: '11px', color: isUnlocked ? 'var(--ink)' : 'var(--ink-4)', textAlign: 'center', lineHeight: 1.4, fontWeight: isUnlocked ? 500 : 400 }}>{reward}</p>
                <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', color: 'var(--ink-4)', textAlign: 'center' }}>{partner}</p>
                {isUnlocked && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '9px', padding: '2px 8px', background: 'rgba(29,79,255,0.1)', color: 'var(--blue)', borderRadius: '999px', letterSpacing: '0.06em' }}>
                    {state}
                  </motion.span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontStyle: 'italic', marginTop: '20px', textAlign: 'center' }}>
        Rewards are not ads. They are local reinforcement for real-world participation. Valid for one month, QR shown at the participating shop, redeemed rewards disappear.
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
          Try AI Coordination
        </p>

        <h1 style={{ fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '8px' }}>
          Try the
        </h1>
        <h1 style={{ fontSize: 'clamp(32px,5.5vw,72px)', fontWeight: 700, color: 'var(--blue)', letterSpacing: '-0.04em', lineHeight: 1.0, fontStyle: 'italic', marginBottom: '24px' }}>
          participation AI.
        </h1>
        <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px' }}>
          Test how the product turns time, mood, team rhythm and local context into real-world missions, streaks, feed moments and rewards.
        </p>

        <ParticipationAiLab />
        <StreakRewards />

        {/* Search */}
        <div id="local-discovery-ai" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Local discovery layer
          </p>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: '620px', marginBottom: '16px' }}>
            A later pull mechanic: when participation leads to a real need, AI can suggest local options first.
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
