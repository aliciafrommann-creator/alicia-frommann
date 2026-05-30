import { NextRequest, NextResponse } from 'next/server'
import { getAnthropicClient } from '@/app/lib/anthropicClient'

type MissionResponse = {
  title: string
  body: string
  meta: string[]
  duration: string
  category: string
  trigger: string
  actions: string[]
  visibility: string
  invite: string
  proof: string
  streakValue: string
  whyFits: string
  feedPost: string
  reward: string
}

const variedFallbacks: MissionResponse[] = [
  {
    title: 'One honest voice note',
    body: 'Send a 20-second voice note to someone you like but have not properly checked in with. No performance, no long explanation — just one real sentence.',
    meta: ['5 min', 'solo', 'connection'],
    duration: '5 min',
    category: 'friends',
    trigger: 'You asked for something other than another outdoor reset, so this nudge moves toward low-pressure connection.',
    actions: ['save', 'invite friend', 'add to calendar'],
    visibility: 'private',
    invite: 'one trusted person',
    proof: 'short note after',
    streakValue: '+1 presence ritual',
    whyFits: 'It creates real-world contact without requiring a walk, public sharing or extra planning.',
    feedPost: 'Sent one honest voice note instead of disappearing.',
    reward: 'connection streak progress',
  },
  {
    title: 'Make one corner kinder',
    body: 'Choose one tiny place near you — desk, kitchen, room, bag — and make it easier to return to. Put one thing away, add one good thing, stop there.',
    meta: ['10 min', 'solo', 'low energy'],
    duration: '10 min',
    category: 'care',
    trigger: 'A low-energy moment can become real participation without forcing movement or social exposure.',
    actions: ['save', 'complete', 'maybe later'],
    visibility: 'private',
    invite: 'no one needed',
    proof: 'private before/after',
    streakValue: '+1 ritual point',
    whyFits: 'It gives immediate felt value even when the network is not involved.',
    feedPost: 'Made one small corner easier to live in.',
    reward: 'home ritual progress',
  },
  {
    title: 'Cook the tiny version',
    body: 'Make the smallest version of something nourishing: tea, toast, fruit, soup, anything real. While it is happening, do not open another feed.',
    meta: ['12 min', 'solo', 'grounding'],
    duration: '12 min',
    category: 'food',
    trigger: 'The fastest useful mission right now may be something embodied, simple and indoors.',
    actions: ['complete', 'save', 'post privately'],
    visibility: 'private',
    invite: 'solo first',
    proof: 'recipe saved',
    streakValue: '+1 weekly ritual',
    whyFits: 'It creates a small reward in your body and environment without becoming moral or complicated.',
    feedPost: 'Chose the tiny nourishing version.',
    reward: 'cafe ritual progress',
  },
]

function wantsDifferentMission(text: string) {
  return /anything else|something else|not that|else than|do something else|ander|nicht.*(raus|spazier|walk|outside|look up)|kein.*(spazier|walk|outside|raus)|no (walk|outside|sky|step out)|don't.*(walk|outside|look up)/i.test(text)
}

function suggestsOutdoorOnly(mission: Partial<MissionResponse>) {
  const text = `${mission.title || ''} ${mission.body || ''} ${mission.category || ''}`.toLowerCase()
  return /step outside|look up|sky|sunset|walk|canal|park|go outside|spazier|raus/.test(text)
}

function fallbackFor(input = '') {
  const normalized = input.toLowerCase()
  if (/cook|food|eat|kitchen|meal|hungry|kaffee|cafe|tea/.test(normalized)) return variedFallbacks[2]
  if (/room|home|desk|clean|chaos|tired|low|zimmer/.test(normalized)) return variedFallbacks[1]
  return variedFallbacks[0]
}

export async function POST(req: NextRequest) {
  try {
    const client = getAnthropicClient()
    const {
      energy = 'low energy',
      group = 'solo',
      time = '30 min',
      mode = 'mission',
      mood = 'calm',
      category = 'movement',
      district = 'Berlin',
      streak = 'weekly streak at risk',
      interests = '',
      rhythm = 'weekly',
      calendarContext = '',
      contextSignals = [],
      liveContext = null,
      nearbyPlaces = [],
      weather = '',
      sunset = '',
      missionType = '',
      ritualMotto = '',
      publicLearningSignals = [],
      userPrompt = '',
      prompt = '',
      query = '',
    } = await req.json()

    const userNeed = typeof userPrompt === 'string' && userPrompt.trim()
      ? userPrompt.trim()
      : typeof prompt === 'string' && prompt.trim()
        ? prompt.trim()
        : typeof query === 'string' && query.trim()
          ? query.trim()
      : typeof interests === 'string'
        ? interests.trim()
        : ''
    const placesText = Array.isArray(nearbyPlaces) && nearbyPlaces.length
      ? nearbyPlaces.map((place: { name?: string; type?: string; distance?: string }) => `${place.name || 'nearby place'} (${place.type || 'place'}, ${place.distance || 'nearby'})`).join(', ')
      : 'none'
    const learningText = Array.isArray(publicLearningSignals) && publicLearningSignals.length
      ? publicLearningSignals.join(', ')
      : 'none'

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 520,
      system: `You are the Mission AI for Participation OS.

Listen to the user's actual words first. If they ask for "anything else", reject a walk, reject outside, reject sky/look up, or ask for a different idea, do not repeat that category.
Never default to "step outside and look up" unless the user explicitly asks for movement, nature, outside, a walk, or a reset that fits outdoors.
Use location only as approximate optional context. Never imply surveillance, exact tracking, private friend locations, Instagram, Strava, ads, or hidden data access.
Prefer varied real-world categories: friends, food, creativity, repair, learning, helping, local discovery, movement, nature, care.
If no live location or event source is connected, make the response grounded with plausible public places and rituals such as Mauerpark, Tempelhofer Feld, Landwehrkanal, Maybachufer, repair cafes, run clubs, girls walks, bookstores and small cafes.
If the input suggests distress, do not diagnose and do not gamify it. Use private, low-pressure care language.`,
      messages: [{
        role: 'user',
        content: `Generate a live product response for Participation OS, an AI-native platform for real-world participation.

Mode: ${mode}
User context:
- User free text / stated need: ${userNeed || 'none'}
- Energy level: ${energy}
- Mood: ${mood}
- Who they're with: ${group}
- Time available: ${time}
- Category: ${category}
- District: ${district}
- Team context: ${streak}
- Optional interests: ${interests || 'none'}
- Desired rhythm: ${rhythm}
- Mission type: ${missionType || 'weekly challenge or individual ritual'}
- Weekly ritual motto: ${ritualMotto || 'be present'}
- Optional calendar context: ${calendarContext || 'none'}
- Active context signals: ${Array.isArray(contextSignals) ? contextSignals.join(', ') : 'none'}
- Live context active: ${liveContext ? 'yes' : 'no'}
- Weather: ${weather || 'not connected'}
- Sunset: ${sunset || 'not connected'}
- Public nearby places from OpenStreetMap: ${placesText}
- Anonymized public/community learning signals from completed missions: ${learningText}

Return ONLY a JSON object (no markdown, no explanation) with exactly these fields:
{
  "title": "Short, evocative mission title (max 8 words)",
  "body": "2-3 sentences describing the mission. Concrete, specific, Berlin-flavored. Make it feel alive.",
  "meta": ["time estimate", "group type", "mood/vibe"],
  "duration": "duration such as 10 min, 30 min, evening",
  "category": "one category",
  "trigger": "One sentence explaining why the AI suggests this now. No surveillance language.",
  "actions": ["join", "add to calendar", "invite friend"],
  "visibility": "private/friends/team/community/public recommendation",
  "invite": "who to invite, max 6 words",
  "proof": "optional completion proof idea, max 10 words",
  "streakValue": "short streak value, e.g. +1 team streak",
  "whyFits": "one sentence explaining why this fits the user's context",
  "feedPost": "A short optional feed post after completion, max 16 words",
  "reward": "A small local reward or milestone, max 10 words"
}

Rules:
- No apps, no screens, no productivity
- Real-world action can be indoors, social, creative, helpful, local, food-based, repair-based, movement-based or reflective.
- If live nearby places are provided, use one of them only when it fits the user's words.
- If public/community learning signals are provided, use them only as aggregate inspiration. Do not imply private tracking.
- Poetic but practical
- Make the person think: "that actually fits me right now"`,
      }],
    })

    const text = (message.content[0] as { type: string; text: string }).text.trim()
    const clean = text.replace(/```json\n?|\n?```/g, '').trim()
    const parsed = JSON.parse(clean) as MissionResponse
    if (wantsDifferentMission(userNeed) && suggestsOutdoorOnly(parsed)) {
      return NextResponse.json(fallbackFor(userNeed))
    }
    return NextResponse.json(parsed)

  } catch {
    return NextResponse.json(fallbackFor())
  }
}
