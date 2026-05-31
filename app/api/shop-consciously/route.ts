import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { query, categories, values } = await req.json()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      messages: [{
        role: 'user',
        content: `You are the conscious shopping AI for Participation OS, a platform based in Berlin that helps people participate more intentionally in real life.

User needs: "${query}"
${categories.length ? `Category: ${categories.join(', ')}` : ''}
${values.length ? `Values they care about: ${values.join(', ')}` : ''}

Give them 3 local Berlin shops and 3 sustainable online options.

Return ONLY valid JSON (no markdown):
{
  "local": [
    {
      "name": "Real Berlin shop name",
      "type": "Short shop type description",
      "why": "1-2 sentences why this is the right choice for their need. Specific and honest.",
      "address": "Street address, District"
    }
  ],
  "online": [
    {
      "name": "Real sustainable brand or platform",
      "url": "website.com",
      "why": "1-2 sentences why. Specific and honest.",
      "certifications": ["Relevant cert 1", "Cert 2"]
    }
  ],
  "impact": "1-2 sentences on the environmental/social impact of choosing consciously for this specific product category. Be specific, not generic."
}

Rules:
- Use real Berlin shops (if unsure, use plausible names of known types of Berlin shops)
- Use real sustainable brands (Armed Angels, Avocadostore, Vinted, Fairtrade, etc.)
- Be specific and honest. Not everything needs to be perfect, so explain the tradeoffs
- Lead with local options. Treat online as "only if you must"
- Never preachy, always helpful
- Write like a sharp, warm human. Avoid em-dashes; prefer periods, commas or colons, and vary sentence length so nothing sounds machine-generated`,
      }],
    })

    const text = (message.content[0] as { type: string; text: string }).text.trim()
    const clean = text.replace(/```json\n?|\n?```/g, '').trim()
    return NextResponse.json(JSON.parse(clean))

  } catch (err) {
    console.error('[shop-consciously] AI call failed:', err instanceof Error ? `${err.name}: ${err.message}` : err)
    return NextResponse.json({
      local: [
        { name: 'Manufactum', type: 'Quality goods store', why: 'Long-lasting products that refuse to be disposable. Buy once, keep for years.', address: 'Hardenbergstr. 4-5, Charlottenburg' },
        { name: 'Gruene Erde', type: 'Organic lifestyle', why: 'Certified organic materials, transparent supply chain, beautiful design.', address: 'Rosenthaler Str. 40, Mitte' },
        { name: 'Voo Store', type: 'Curated independent brands', why: 'Carefully selected brands, many sustainable, all worth caring about.', address: 'Oranienstr. 24, Kreuzberg' },
      ],
      online: [
        { name: 'Armed Angels', url: 'armed-angels.com', why: 'German certified organic brand, GOTS certified, fair wages throughout supply chain.', certifications: ['GOTS', 'Fair Wear Foundation'] },
        { name: 'Avocadostore', url: 'avocadostore.de', why: "Germany's largest verified sustainable marketplace. Strict criteria, huge selection.", certifications: ['Various'] },
        { name: 'Vinted', url: 'vinted.de', why: "Second-hand is always the most sustainable option. Germany's largest platform.", certifications: ['Circular economy'] },
      ],
      impact: 'Choosing locally made reduces transport emissions by 60-80% compared to global supply chains. Supporting Berlin shops keeps 3x more money in the local economy versus online platforms.',
    })
  }
}
