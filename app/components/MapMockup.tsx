'use client'

import { useEffect, useRef, useState } from 'react'
import { copyInvite, downloadCalendarEvent } from '../lib/demoActions'

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

export function MapMockup() {
  const [activeFilter, setActiveFilter] = useState('movement')
  const [activeEvent, setActiveEvent] = useState(seedEvents[0])
  const [joined, setJoined] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])
  const [calendarAdded, setCalendarAdded] = useState<string[]>([])
  const [invited, setInvited] = useState<string[]>([])
  const [mapNote, setMapNote] = useState('')
  const [interests, setInterests] = useState<string[]>(['movement', 'local discovery'])
  const [mapSearch, setMapSearch] = useState('')
  const [mapReady, setMapReady] = useState(false)
  const mapEl = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const markerLayer = useRef<any>(null)

  const filteredEvents = seedEvents.filter(event => {
    if (activeFilter === 'community') return ['movement', 'culture', 'mindfulness', 'social courage'].includes(event.category)
    if (activeFilter === 'local') return event.category === 'local shops'
    if (activeFilter === 'cafes') return event.category === 'cafes'
    if (activeFilter === 'friends') return event.category === 'friends'
    return event.category === activeFilter || (activeFilter === 'movement' && event.category === 'social courage')
  })

  const searchTerms = mapSearch.toLowerCase().split(/\s+/).filter(Boolean)
  const recommendedEvent = seedEvents.find(event => {
    const haystack = `${event.title} ${event.category} ${event.district} ${event.host} ${event.reward}`.toLowerCase()
    return searchTerms.some(term => haystack.includes(term)) || interests.some(interest => event.category.includes(interest) || event.title.toLowerCase().includes(interest))
  }) || seedEvents[0]

  const mapAction = async (action: string, event: typeof seedEvents[number]) => {
    if (action === 'join') {
      setJoined(prev => prev.includes(event.title) ? prev : [...prev, event.title])
      setMapNote(`Joined ${event.title}. It now appears in My missions.`)
      return
    }
    if (action === 'save') {
      setSaved(prev => prev.includes(event.title) ? prev : [...prev, event.title])
      setMapNote(`Saved ${event.title} for later.`)
      return
    }
    if (action === 'add to calendar') {
      downloadCalendarEvent({
        title: `Participation OS · ${event.title}`,
        description: `${event.time} · ${event.host}. Privacy note: ${event.privacy}`,
        filename: `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`,
      })
      setCalendarAdded(prev => prev.includes(event.title) ? prev : [...prev, event.title])
      setMapNote(`Calendar file downloaded for ${event.title}.`)
      return
    }
    if (action === 'invite friend') {
      await copyInvite(`Want to join ${event.title}? ${event.time} · ${event.district}. Participation OS.`)
      setInvited(prev => prev.includes(event.title) ? prev : [...prev, event.title])
      setMapNote(`Invite text copied for ${event.title}.`)
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
        Missions, clubs, shop events and followed friends appear as opportunities — never private live locations. The map makes the city feel more alive.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '8px', marginBottom: '12px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '10px' }}>
        <input
          value={mapSearch}
          onChange={e => setMapSearch(e.target.value)}
          placeholder="What are you looking for? e.g. quiet cafe, run club, book walk"
          style={{ minWidth: 0, border: '0', outline: '0', background: 'transparent', color: 'var(--ink)', fontSize: '13px' }}
        />
        <span style={{ alignSelf: 'center', padding: '6px 10px', borderRadius: '999px', background: 'rgba(29,79,255,0.08)', color: 'var(--blue)', fontFamily: mono, fontSize: '10px' }}>personalized</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {filters.map(f => (
          <button onClick={() => setActiveFilter(f)} key={f} style={{ padding: '6px 12px', borderRadius: '999px', border: `1px solid ${activeFilter === f ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: activeFilter === f ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: activeFilter === f ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px', cursor: 'pointer' }}>{f}</button>
        ))}
      </div>

      <div style={{ position: 'relative', minHeight: '380px', background: 'linear-gradient(135deg, #EEF2FF, var(--paper))', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' }}>
        <div ref={mapEl} style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', left: '14px', bottom: '14px', background: 'rgba(250,248,243,0.92)', border: '1px solid var(--line)', borderRadius: '12px', padding: '12px', maxWidth: '260px', backdropFilter: 'blur(8px)' }}>
          <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>AI match</p>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
            You like {interests.join(', ')}. <strong>{recommendedEvent.title}</strong> fits best.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: '14px', padding: '16px', marginBottom: '12px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '14px', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{activeEvent.category} · {activeEvent.district}</p>
          <h3 style={{ fontSize: '18px', color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '5px' }}>{activeEvent.title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.5 }}>{activeEvent.time} · {activeEvent.host} · {activeEvent.privacy}</p>
          <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '6px' }}>reward: {activeEvent.reward}</p>
          {mapNote && <p style={{ fontFamily: mono, fontSize: '10px', color: 'var(--blue)', marginTop: '6px' }}>{mapNote}</p>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '6px' }}>
          {['join', 'add to calendar', 'invite friend', 'save'].map(action => (
            <button key={action} onClick={() => mapAction(action, activeEvent)} style={{ padding: '7px 11px', borderRadius: '999px', background: action === 'join' ? 'var(--blue)' : 'transparent', color: action === 'join' ? 'var(--paper)' : 'var(--ink-2)', border: `1px solid ${action === 'join' ? 'var(--blue)' : 'var(--line)'}`, fontFamily: mono, fontSize: '10px', cursor: 'pointer' }}>
              {action === 'join' && joined.includes(activeEvent.title)
                ? 'joined ✓'
                : action === 'save' && saved.includes(activeEvent.title)
                  ? 'saved ✓'
                  : action === 'add to calendar' && calendarAdded.includes(activeEvent.title)
                    ? 'calendar ✓'
                    : action === 'invite friend' && invited.includes(activeEvent.title)
                      ? 'invite copied ✓'
                      : action}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {interestOptions.map(interest => (
          <button key={interest} onClick={() => setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])} style={{ padding: '5px 10px', borderRadius: '999px', border: `1px solid ${interests.includes(interest) ? 'rgba(29,79,255,0.25)' : 'var(--line)'}`, background: interests.includes(interest) ? 'rgba(29,79,255,0.08)' : 'var(--paper)', color: interests.includes(interest) ? 'var(--blue)' : 'var(--ink-3)', fontFamily: mono, fontSize: '10px', cursor: 'pointer' }}>
            {interest}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.5, fontStyle: 'italic' }}>
        No private live locations shared. The map reveals missions, clubs, shop events and friend activity — not people.
      </p>
    </div>
  )
}
