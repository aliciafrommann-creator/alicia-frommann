import Anthropic from '@anthropic-ai/sdk'

export function getAnthropicClient() {
  const apiKey =
    process.env.ANTHROPIC_API_KEY ||
    process.env.CLAUDE_API_KEY ||
    process.env.CLAUDE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('Missing Anthropic API key. Set ANTHROPIC_API_KEY or CLAUDE_API_KEY in Vercel.')
  }

  return new Anthropic({ apiKey })
}
