import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
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
    } = await req.json()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 520,
      messages: [{
        role: 'user',
        content: `Generate a live product-demo response for Participation OS, an AI-native platform for real-world participation.

Demo mode: ${mode}
Berlin context:
- Energy level: ${energy}
- Mood: ${mood}
- Who they're with: ${group}
- Time available: ${time}
- Category: ${category}
- District: ${district}
- Team context: ${streak}
- Optional interests: ${interests || 'none'}

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
  "feedPost": "A short optional feed post after completion, max 16 words",
  "reward": "A small local reward or milestone, max 10 words"
}

Rules:
- No apps, no screens, no productivity
- Real places (parks, canals, streets, markets, cafes)
- Poetic but practical
- Make the person want to go NOW`,
      }],
    })

    const text = (message.content[0] as { type: string; text: string }).text.trim()
    const clean = text.replace(/```json\n?|\n?```/g, '').trim()
    return NextResponse.json(JSON.parse(clean))

  } catch {
    const fallbacks = [
      {
        title: 'Sunset walk. 25 minutes.',
        body: 'Leave your screen and walk until the sky changes color. Notice one thing you have never noticed before on a street you know by heart.',
        meta: ['25 min', 'trusted group', 'low energy'],
        duration: '25 min',
        category: 'movement',
        trigger: 'Free evening, good weather and a group streak make this a good opening.',
        actions: ['join', 'add to calendar', 'invite friend'],
        visibility: 'team',
        invite: 'flatmates',
        proof: 'one sunset photo',
        feedPost: 'We kept the streak alive with one quiet sunset walk.',
        reward: '7-day cafe ritual unlocked',
      },
      {
        title: 'Find a canal bench.',
        body: 'Pick a canal edge you usually pass without stopping. Sit for ten minutes, then send one friend a photo of the water.',
        meta: ['20 min', 'solo or friend', 'calm'],
        duration: '20 min',
        category: 'nature',
        trigger: 'Low energy and a short time window point toward a nearby quiet mission.',
        actions: ['save', 'maybe later', 'invite friend'],
        visibility: 'friends',
        invite: 'one close friend',
        proof: 'photo of the water',
        feedPost: 'Found a bench that made Berlin feel slower.',
        reward: 'bookstore reward progress',
      },
      {
        title: 'No-phone cafe ritual.',
        body: 'Meet at a nearby cafe and put phones away for the first twenty minutes. Ask everyone what they want to remember about this week.',
        meta: ['45 min', 'flatmates', 'social'],
        duration: '45 min',
        category: 'friends',
        trigger: 'Your team has momentum, and a saved cafe is open nearby.',
        actions: ['join', 'add to calendar', 'mute community'],
        visibility: 'team',
        invite: 'your flat',
        proof: 'table photo, faces optional',
        feedPost: 'Twenty minutes without phones changed the whole table.',
        reward: 'bakery surprise unlocked',
      },
    ]
    return NextResponse.json(fallbacks[Math.floor(Math.random() * fallbacks.length)])
  }
}
