type AnthropicMessage = {
  role: 'user'
  content: string
}

type AnthropicTextBlock = {
  type: 'text'
  text: string
}

type AnthropicResponse = {
  content?: AnthropicTextBlock[]
}

function getAnthropicApiKey() {
  const apiKey =
    process.env.ANTHROPIC_API_KEY ||
    process.env.CLAUDE_API_KEY ||
    process.env.CLAUDE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('Missing Anthropic API key. Set ANTHROPIC_API_KEY or CLAUDE_API_KEY in Vercel.')
  }

  const cleanKey = apiKey.trim()
  if (cleanKey.includes('•') || cleanKey.includes('●') || cleanKey.includes('*') || !cleanKey.startsWith('sk-ant-')) {
    throw new Error('ANTHROPIC_API_KEY does not look like a real Anthropic key. Paste the actual sk-ant-... value, not the masked Vercel placeholder.')
  }

  return cleanKey
}

export async function createAnthropicText({
  model,
  maxTokens,
  system,
  messages,
}: {
  model: string
  maxTokens: number
  system?: string
  messages: AnthropicMessage[]
}) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'anthropic-version': '2023-06-01',
      'x-api-key': getAnthropicApiKey(),
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      ...(system ? { system } : {}),
      messages,
    }),
  })

  const body = await res.text()
  if (!res.ok) {
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 500)}`)
  }

  const json = JSON.parse(body) as AnthropicResponse
  const text = json.content?.find(block => block.type === 'text')?.text
  if (!text) {
    throw new Error('Anthropic API returned no text content.')
  }

  return text
}
