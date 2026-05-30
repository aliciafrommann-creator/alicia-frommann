import { NextRequest, NextResponse } from 'next/server'

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

export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get('lat'))
  const lon = Number(req.nextUrl.searchParams.get('lon'))

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ places: [] }, { status: 400 })
  }

  const overpassQuery = `
    [out:json][timeout:8];
    (
      node(around:5000,${lat},${lon})["leisure"~"park|garden|sports_centre"];
      way(around:5000,${lat},${lon})["leisure"~"park|garden|sports_centre"];
      node(around:5000,${lat},${lon})["amenity"~"cafe|library|community_centre|theatre|restaurant"];
      node(around:5000,${lat},${lon})["shop"~"books|bicycle|coffee|organic|bakery"];
      node(around:5000,${lat},${lon})["tourism"~"gallery|museum|viewpoint"];
    );
    out center 24;
  `

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 9000)
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': 'ParticipationOSPrototype/1.0',
      },
      body: new URLSearchParams({ data: overpassQuery }),
      next: { revalidate: 300 },
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) return NextResponse.json({ places: [] }, { status: 200 })
    const osm = await res.json()
    const places = (osm.elements || [])
      .map((item: any) => {
        const itemLat = item.lat ?? item.center?.lat
        const itemLon = item.lon ?? item.center?.lon
        const name = item.tags?.name
        if (!itemLat || !itemLon || !name) return null
        const type = item.tags?.amenity || item.tags?.leisure || item.tags?.shop || item.tags?.tourism || 'place'
        const meters = distanceInMeters(lat, lon, itemLat, itemLon)
        return {
          name,
          type: String(type).replace(/_/g, ' '),
          distance: formatDistance(meters),
          meters,
          lat: itemLat,
          lon: itemLon,
        }
      })
      .filter(Boolean)
      .sort((a: { meters: number }, b: { meters: number }) => a.meters - b.meters)
      .slice(0, 8)

    return NextResponse.json({ places })
  } catch {
    return NextResponse.json({ places: [] }, { status: 200 })
  }
}
