import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { energy, group, time } = await req.json()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: `Generate a real-world participation mission for someone in Berlin with these parameters:
- Energy level: ${energy}
- Who they're with: ${group}
- Time available: ${time}

Return ONLY a JSON object (no markdown, no explanation) with exactly these fields:
{
  "title": "short, poetic mission title (max 8 words, no punctuation at end)",
  "body": "2-3 sentences describing the mission. Warm, human, specific. Not preachy. Make it feel like a tiny opening into reality, not a life transformation.",
  "meta": ["time duration", "who", "energy type", "one descriptor word"]
}

The mission should feel emotionally easy, socially safe, and rewarding within minutes. Examples of the right tone: evening walk, café ritual, no-phone moment, local discovery, tiny social courage. Never: productivity, self-improvement lecture, moral obligation.`
      }]
    })

    const text = (message.content[0] as { type: string; text: string }).text
    const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    const data = JSON.parse(clean)

    return NextResponse.json(data)
  } catch (err) {
    console.error('Mission generation error:', err)
    return NextResponse.json(
      { title: 'Take a walk with no destination.', body: 'Leave your usual route behind. Turn when it feels right. Return having seen one thing you hadn\'t noticed before.', meta: ['20 min', 'solo', 'discovery', 'berlin'] },
      { status: 200 }
    )
  }
}
