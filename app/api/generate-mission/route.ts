import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { energy, group, time } = await req.json()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `Generate a real-world participation mission for someone in Berlin with these parameters:
- Energy level: ${energy}
- Who they're with: ${group}
- Time available: ${time}

Return ONLY a JSON object (no markdown, no explanation) with exactly these fields:
{
  "title": "Short, evocative mission title (max 8 words)",
  "body": "2-3 sentences describing the mission. Concrete, specific, Berlin-flavored. Make it feel alive.",
  "meta": ["time estimate", "group type", "mood/vibe"]
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
      { title: 'Sunset walk. 25 minutes.', body: 'Leave your screen. Walk until the sky changes color. Notice one thing you have never noticed before on a street you have walked a hundred times.', meta: ['25 min', 'solo', 'low energy'] },
      { title: 'Find a canal bench.', body: 'Berlin has more canals than Venice. Find one you have never sat by. Bring nothing to do. Stay until you feel the city slow down.', meta: ['20 min', 'solo', 'calm'] },
      { title: 'Coffee somewhere new.', body: 'Walk until you find a cafe you have never been to. Order something you would not normally order. Stay long enough to notice the regulars.', meta: ['45 min', 'solo', 'social'] },
    ]
    return NextResponse.json(fallbacks[Math.floor(Math.random() * fallbacks.length)])
  }
}
