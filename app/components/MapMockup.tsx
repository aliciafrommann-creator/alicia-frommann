'use client'

import { useEffect, useRef, useState } from 'react'
import { addToCalendar, inviteFriend } from '../lib/actions'
import { toast } from './toast'

const mono = 'var(--font-geist-mono)'

const filters = ['movement', 'culture', 'cafes', 'local', 'friends', 'mindfulness', 'social courage', 'sustainability', 'community']
const interestOptions = ['movement', 'culture', 'nature', 'friends', 'sustainability', 'learning', 'local discovery', 'creativity']

const seedEvents = [
  { title: 'Girls Walk · Prenzlauer Berg', category: 'movement', district: 'Prenzlauer Berg', time: '18:30', host: 'Girls Walk Berlin', reward: 'cafe ritual progress', lat: 52.538, lng: 13.424, energy: 'high', privacy: 'public event, no private locations' },
  { title: "Mila's shared walk mission", category: 'friends', district: 'Kreuzberg', time: '18:10', host: 'followed friend', reward: 'friend ritual saved', lat: 52.501, lng: 13.41, energy: 'warm', privacy: 'shared mission, no live location' },
  { title: 'Run Club · Neukölln', category: 'movement', district: 'Neukölln', time: '19:00', host: 'Neukölln Run Club', reward: 'team streak +1', lat: 52.481, lng: 13.435, energy: 'rising', privacy: 'meetup point only' },
  { title: 'Painting in the Park · Kreuzberg', category: 'culture', district: 'Kreuzberg', time: 'Sunday 11:00', host: 'Park Studio', reward: 'ceramic voucher progress', lat: 52.498, lng: 13.415, energy: 'warm', privacy: 'community location' },
  { title: 'Coffee & Bike · Friedrichshain', category: 'cafes', district: 'Friedrichshain', time: 'Sat 10:00', host: 'Coffee & Bike', reward: '15% local coffee', lat: 52.515, lng: 13.455, energy: 'steady', privacy: 'hosted by community' },
  { title: 'Book Club Walk · Mitte', category: 'culture', district: 'Mitte', time: '17:30', host: 'Mitte Readers', reward: 'bookstore reward', lat: 52.52, lng: 13.405, energy: 'steady', privacy: 'approximate route' },
  { title: 'No-phone Cafe Ritual', category: 'mindfulness', district: 'Kreuzberg', time: 'Tomorrow 09:00', host: 'Kiez Cafe', reward: 'bakery surprise chance', lat: 52.49, lng: 13.428, energy: 'quiet', privacy: 'shop-hosted ritual' },
  { title: 'Local Repair Mission', category: 'local shops', district: 'Wedding', time: 'Sat 14:00', host: 'Repair Walk-in', reward: 'unpacked store discount', lat: 52.548, lng: 13.365, energy: 'useful', privacy: 'public host location' },
  { title: 'Sunset Walk Mission', category: 'social courage', district: 'Tempelhofer Feld', time: '20:15', host: 'Participation OS', reward: '7-day streak progress', lat: 52.474, lng: 13.403, energy: 'glowing', privacy: 'no user location shown' },
  { title: 'Plastic-free Grocery Mission', category: 'sustainability', district: 'Prenzlauer Berg', time: '16:00', host: 'Local zero-waste shop', reward: 'bio store gift progress', lat: 52.532, lng: 13.413, energy: 'practical', privacy: 'partner location only' },
  { title: 'Ceramic Painting Event', category: 'creativity', district: 'Kreuzberg', time: 'Thu 18:00', host: 'Ceramic studio', reward: 'painting voucher', lat: 52.502, lng: 13.431, energy: 'creative', privacy: 'hosted event' },
]

type MapEvent = typeof seedEvents[number]

// Turn real OpenStreetMap venues into participation events for whatever city you land in.
const categoryForType = (type: string): { category: string; verb: string; reward: string; energy: string } => {
  const t = type.toLowerCase()
  if (/cafe|coffee/.test(t)) return { category: 'cafes', verb: 'No-phone coffee ritual', reward: 'local cafe reward', energy: 'quiet' }
  if (/bakery/.test(t)) return { category: 'cafes', verb: 'Fresh-bread morning run', reward: 'bakery surprise chance', energy: 'warm' }
  if (/park|garden/.test(t)) return { category: 'movement', verb: 'Sunset walk', reward: 'streak progress', energy: 'glowing' }
  if (/sports/.test(t)) return { category: 'movement', verb: 'Run club meetup', reward: 'team streak +1', energy: 'rising' }
  if (/library|book/.test(t)) return { category: 'culture', verb: 'Reading hour', reward: 'bookstore reward', energy: 'steady' }
  if (/gallery|museum|theatre/.test(t)) return { category: 'culture', verb: 'Slow culture visit', reward: 'culture pass progress', energy: 'curious' }
  if (/community|centre|center/.test(t)) return { category: 'social courage', verb: 'Community drop-in', reward: 'neighbourhood reward', energy: 'open' }
  if (/bicycle/.test(t)) return { category: 'sustainability', verb: 'Repair & ride mission', reward: 'repair-cafe discount', energy: 'useful' }
  if (/organic|greengrocer|farm/.test(t)) return { category: 'sustainability', verb: 'Plastic-free grocery run', reward: 'bio store gift progress', energy: 'practical' }
  if (/viewpoint/.test(t)) return { category: 'mindfulness', verb: 'Quiet viewpoint pause', reward: 'presence ritual', energy: 'calm' }
  return { category: 'local shops', verb: 'Local discovery mission', reward: 'local reward progress', energy: 'steady' }
}

const timeSlots = ['17:30', '18:00', '18:30', '19:00', '20:15', 'Sat 10:00', 'Sun 11:00', 'Tomorrow 09:00', 'Thu 18:00']

// City-localized events when live OSM venues aren't available — keeps the map relevant for any city.
const cityTemplates: { title: string; category: string; host: string; reward: string; energy: string }[] = [
  { title: 'Sunset walk mission', category: 'social courage', host: 'Participation OS', reward: '7-day streak progress', energy: 'glowing' },
  { title: 'No-phone cafe ritual', category: 'cafes', host: 'a local cafe', reward: 'cafe ritual progress', energy: 'quiet' },
  { title: 'Run club meetup', category: 'movement', host: 'local run club', reward: 'team streak +1', energy: 'rising' },
  { title: 'Book club walk', category: 'culture', host: 'local readers', reward: 'bookstore reward', energy: 'steady' },
  { title: 'Plastic-free grocery run', category: 'sustainability', host: 'zero-waste shop', reward: 'bio store gift progress', energy: 'practical' },
  { title: 'Repair & ride mission', category: 'local shops', host: 'repair walk-in', reward: 'repair-cafe discount', energy: 'useful' },
  { title: 'Quiet viewpoint pause', category: 'mindfulness', host: 'Participation OS', reward: 'presence ritual', energy: 'calm' },
  { title: 'Friends evening walk', category: 'friends', host: 'followed friend', reward: 'friend ritual saved', energy: 'warm' },
  { title: 'Creative drop-in', category: 'creativity', host: 'community studio', reward: 'painting voucher', energy: 'creative' },
]

function syntheticCityEvents(lat: number, lng: number, cityLabel: string): MapEvent[] {
  // Scatter markers a few hundred metres to ~2km around the city centre.
  return cityTemplates.map((t, i) => {
    const angle = (i / cityTemplates.length) * Math.PI * 2
    const radius = 0.006 + (i % 3) * 0.005
    return {
      title: `${t.title} · ${cityLabel}`,
      category: t.category,
      district: cityLabel || 'your city',
      time: timeSlots[i % timeSlots.length],
      host: t.host,
      reward: t.reward,
      lat: lat + Math.sin(angle) * radius,
      lng: lng + Math.cos(angle) * radius * 1.5,
      energy: t.energy,
      privacy: 'public venue · no private locations',
    }
  })
}

function buildCityEvents(places: { name: string; type: string; lat?: number; lon?: number; distance?: string }[], cityLabel: string): MapEvent[] {
  return places
    .filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lon))
    .slice(0, 9)
    .map((p, i) => {
      const meta = categoryForType(p.type)
      return {
        title: `${meta.verb} · ${p.name}`,
        category: meta.category,
        district: cityLabel || 'your city',
        time: timeSlots[i % timeSlots.length],
        host: p.name,
        reward: meta.reward,
        lat: p.lat as number,
        lng: p.lon as number,
        energy: meta.energy,
        privacy: 'public venue · no private locations',
      }
    })
}

export function MapMockup() {
  const [activeFilter, setActiveFilter] = useState('movement')
  const [events, setEvents] = useState<MapEvent[]>(seedEvents)
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [activeEvent, setActiveEvent] = useState<MapEvent>(seedEvents[0])
  const [joined, setJoined] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])
  const [calendarAdded, setCalendarAdded] = useState<string[]>([])
  const [invited, setInvited] = useState<string[]>([])
  const [mapNote, setMapNote] = useState('')
  const [interests, setInterests] = useState<string[]>(['movement', 'local discovery'])
  const [mapSearch, setMapSearch] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [mapReady, setMapReady] = useState(false)
  const [locating, setLocating] = useState(false)
  const [locLabel, setLocLabel] = useState('')
  const mapEl = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const markerLayer = useRef<any>(null)

  const filteredEvents = (() => {
    const matched = events.filter(event => {
      if (activeFilter === 'community') return ['movement', 'culture', 'mindfulness', 'social courage'].includes(event.category)
      if (activeFilter === 'local') return event.category === 'local shops'
      if (activeFilter === 'cafes') return event.category === 'cafes'
      if (activeFilter === 'friends') return event.category === 'friends'
      return event.category === activeFilter || (activeFilter === 'movement' && event.category === 'social courage')
    })
    // Real-city events may not cover every filter — never show an empty map.
    return matched.length ? matched : events
  })()

  const searchTerms = mapSearch.toLowerCase().split(/\s+/).filter(Boolean)
  const recommendedEvent = events.find(event => {
    const haystack = `${event.title} ${event.category} ${event.district} ${event.host} ${event.reward}`.toLowerCase()
    return searchTerms.some(term => haystack.includes(term)) || interests.some(interest => event.category.includes(interest) || event.title.toLowerCase().includes(interest))
  }) || events[0] || seedEvents[0]

  const mapAction = (action: string, event: typeof seedEvents[number]) => {
    const title = event.title
    if (action === 'join') {
      setJoined(prev => prev.includes(title) ? prev : [...prev, title])
      toast(`Joined · ${title}`, 'success')
    }
    if (action === 'save') {
      setSaved(prev => prev.includes(title) ? prev : [...prev, title])
      toast(`Saved · ${title}`, 'success')
    }
    if (action === 'add to calendar') addToCalendar(title, `${event.time} · ${event.host}`)
    if (action === 'invite friend') inviteFriend(title)
    setMapNote(`${action}: ${title}`)
  }

  const [needsManual, setNeedsManual] = useState(false)

  // Pull real venues near a coordinate from OpenStreetMap and turn them into live events.
  const loadCityEvents = async (lat: number, lng: number, cityLabel: string) => {
    setLoadingEvents(true)
    let cityEvents: MapEvent[] = []
    try {
      const res = await fetch(`/api/nearby-places?lat=${lat}&lon=${lng}`)
      const data = await res.json()
      cityEvents = buildCityEvents(data.places || [], cityLabel)
    } catch {
      // fall through to localized events
    }
    if (cityEvents.length) {
      setMapNote(`${cityEvents.length} live places loaded near ${cityLabel || 'you'}.`)
    } else {
      // No live OSM venues (blocked/rate-limited) — still give the city its own events.
      cityEvents = syntheticCityEvents(lat, lng, cityLabel)
      setMapNote(`Showing ${cityEvents.length} opportunities around ${cityLabel || 'you'}.`)
    }
    setEvents(cityEvents)
    setActiveEvent(cityEvents[0])
    setLoadingEvents(false)
  }

  const goToCity = async (cityName: string) => {
    const q = cityName.trim()
    if (!q) return
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`, { headers: { 'Accept-Language': 'en' } })
      const data = await res.json()
      if (data?.[0] && mapInstance.current) {
        const { lat, lon, display_name } = data[0]
        const flat = parseFloat(lat)
        const flon = parseFloat(lon)
        const label = display_name.split(',').slice(0, 2).join(',').trim()
        mapInstance.current.setView([flat, flon], 13)
        setLocLabel(label)
        setNeedsManual(false)
        toast(`Centered on ${q}`, 'success')
        loadCityEvents(flat, flon, label.split(',')[0] || q)
      } else {
        toast('City not found. Try again.')
      }
    } catch {
      toast('Lookup failed. Check your connection.')
    }
  }

  useEffect(() => {
    let mounted = true
    async function setupMap() {
      if (!mapEl.current || mapInstance.current) return
      const L = await import('leaflet')
      if (!mounted || !mapEl.current) return
      const map = L.map(mapEl.current, { zoomControl: false, scrollWheelZoom: false }).setView([52.515, 13.405], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)
      mapInstance.current = map
      markerLayer.current = L.layerGroup().addTo(map)
      setMapReady(true)

      if (navigator.geolocation) {
        setLocating(true)
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            if (!mounted || !mapInstance.current) return
            const { latitude: lat, longitude: lng } = pos.coords
            mapInstance.current.setView([lat, lng], 13)
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
                { headers: { 'Accept-Language': 'en' } }
              )
              const data = await res.json()
              const district = data.address?.suburb || data.address?.quarter || data.address?.neighbourhood || ''
              const city = data.address?.city || data.address?.town || ''
              if (mounted) setLocLabel(district ? `${district}, ${city}` : city)
              if (mounted) loadCityEvents(lat, lng, district || city || 'you')
            } catch {
              // keep label empty
            }
            if (mounted) setLocating(false)
          },
          () => { if (mounted) { setLocating(false); setNeedsManual(true) } }
        )
      } else {
        setNeedsManual(true)
      }
    }
    setupMap()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    async function renderMarkers() {
      if (!mapReady || !mapInstance.current || !markerLayer.current) return
      const L = await import('leaflet')
      markerLayer.current.clearLayers()
      filteredEvents.forEach(event => {
        const marker = L.marker([event.lat, event.lng], {
          icon: L.divIcon({
            className: 'po-leaflet-marker',
            html: `<span></span>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        })
        marker.on('click', () => setActiveEvent(event))
        marker.addTo(markerLayer.current)
      })
    }
    renderMarkers()
  }, [activeFilter, mapReady, filteredEvents])

  return (
    <div>
      <p style={{ fontFamily: mono, fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>04 / City Map</p>
      <h2 style={{ fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
        The city as your participation layer.
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '24px' }}>
        Missions, clubs, shop events and followed friends appear as opportunities, never private live locations. The map makes the city feel more alive.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '8px', marginBottom: '8px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '10px' }}>
        <input
          value={mapSearch}
          onChange={e => setMapSearch(e.target.value)}
          placeholder="What are you looking for? e.g. quiet cafe, run club, book walk"
          style={{ minWidth: 0, border: '0', outline: '0', background: 'transparent', color: 'var(--ink)', fontSize: '13px' }}
        />
        <span style={{ alignSelf: 'center', padding: '6px 10px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', fontFamily: mono, fontSize: '10px' }}>personalized</span>
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        <input
          value={citySearch}
          onChange={e => setCitySearch(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { goToCity(citySearch); setCitySearch('') } }}
          placeholder="Search city e.g. Paris, Innsbruck, New York"
          style={{ flex: 1, minWidth: 0, border: '1px solid var(--line)', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', background: 'var(--paper)', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit' }}
        />
        <button
          onClick={() => { goToCity(citySearch); setCitySearch('') }}
          className="po-primary-action"
          style={{ padding: '8px 14px', borderRadius: '10px', background: 'var(--blue)', color: 'var(--paper)', fontFamily: mono, fontSize: '10px', cursor: 'pointer', flexShrink: 0, border: 'none' }}
        >{loadingEvents ? '...' : 'Go →'}</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {filters.map(f => (
          <button onClick={() => setActiveFilter(f)} key={f} className="po-soft-action" style={{ padding: '6px 12px', borderRadius: '999px', border: `1px solid ${activeFilter === f ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: activeFilter === f ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: activeFilter === f ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px', cursor: 'pointer' }}>{f}</button>
        ))}
      </div>

      <div style={{ position: 'relative', minHeight: '380px', background: 'linear-gradient(135deg, #EEF2FF, var(--paper))', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' }}>
        <div ref={mapEl} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', left: '14px', bottom: '14px', background: 'rgba(250,248,243,0.92)', border: '1px solid var(--line)', borderRadius: '12px', padding: '12px', maxWidth: '260px', backdropFilter: 'blur(8px)' }}>
          <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
            {locating ? '◎ Locating you...' : loadingEvents ? '◎ Loading live places...' : locLabel ? `📍 ${locLabel} · live` : 'AI match · demo'}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
            You like {interests.join(', ')}. <strong>{recommendedEvent.title}</strong> fits best.
          </p>
          {needsManual && (
            <p style={{ marginTop: '8px', fontFamily: mono, fontSize: '9px', color: 'var(--ink-3)' }}>Location off · use the search bar above to pick a city.</p>
          )}
        </div>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '16px', marginBottom: '12px' }}>
        <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{activeEvent.category} · {activeEvent.district}</p>
        <h3 style={{ fontSize: '18px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '5px' }}>{activeEvent.title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: '6px' }}>{activeEvent.time} · {activeEvent.host} · {activeEvent.privacy}</p>
        <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginBottom: mapNote ? '4px' : '12px' }}>reward: {activeEvent.reward}</p>
        {mapNote && <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginBottom: '12px' }}>{mapNote}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['join', 'add to calendar', 'invite friend', 'save'].map(action => {
            const isJoined = action === 'join' && joined.includes(activeEvent.title)
            const isSaved = action === 'save' && saved.includes(activeEvent.title)
            const filled = action === 'join' || isJoined || isSaved
            return (
              <button key={action} onClick={() => mapAction(action, activeEvent)} className={filled ? 'po-primary-action' : 'po-soft-action'} style={{ padding: '7px 11px', borderRadius: '999px', background: filled ? 'var(--blue)' : 'transparent', color: filled ? 'var(--paper)' : 'var(--ink-2)', border: `1px solid ${filled ? 'var(--blue)' : 'var(--line)'}`, fontFamily: mono, fontSize: '10px', cursor: 'pointer' }}>
                {isJoined ? 'joined ✓' : isSaved ? 'saved ✓' : action}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {interestOptions.map(interest => (
          <button key={interest} className="po-soft-action" onClick={() => setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])} style={{ padding: '5px 10px', borderRadius: '999px', border: `1px solid ${interests.includes(interest) ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: interests.includes(interest) ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: interests.includes(interest) ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px', cursor: 'pointer' }}>
            {interest}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, fontStyle: 'italic' }}>
        No private live locations shared. The map reveals missions, clubs, shop events and friend activity, not people.
      </p>
    </div>
  )
}
