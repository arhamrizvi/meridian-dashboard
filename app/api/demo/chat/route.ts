import Anthropic from '@anthropic-ai/sdk'
import { MOCK_SUMMARY } from '@/lib/mockData'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are Meridian AI, the operational intelligence assistant for White Space — a premium coworking operator with 7 branches across Saudi Arabia.

Current business context:
${MOCK_SUMMARY}

Your role: Answer operational questions, surface actionable insights, and help the White Space CEO make data-driven decisions. Be concise, specific, and reference the mock data above. Always use SAR for currency. Keep responses under 120 words unless asked to elaborate.`

export async function POST(req: Request) {
  const { messages } = await req.json()

  const anthropicMessages = messages
    .filter((m: { role: string; text: string }) => m.role === 'user' || m.role === 'assistant')
    .map((m: { role: string; text: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.text,
    }))

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: anthropicMessages,
  })

  const reply = response.content[0].type === 'text' ? response.content[0].text : ''
  return Response.json({ reply })
}
