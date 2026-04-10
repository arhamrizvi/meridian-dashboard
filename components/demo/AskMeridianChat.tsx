'use client'

import { useState, useRef, useEffect } from 'react'

const ACCENT = '#34D399'

interface Message { role: 'user' | 'assistant'; text: string }

const INITIAL: Message = {
  role: 'assistant',
  text: "I've been watching White Space's numbers. Occupancy is solid at 79% across 7 branches — but I've flagged a few things worth your attention. Want to start with the SAR 95K meeting-room opportunity or the 9 at-risk tenants?",
}

export default function AskMeridianChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', text }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/demo/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', text: data.reply ?? 'Sorry, I had trouble with that.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: 'Connection error — please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      width: 340, flexShrink: 0,
      background: '#111814',
      border: '1px solid rgba(255,255,255,.07)',
      borderRadius: 12,
      display: 'flex', flexDirection: 'column',
      animation: 'fadeSlide .3s ease',
      maxHeight: 'calc(100vh - 120px)',
    }}>
      {/* Header */}
      <div style={{ padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: ACCENT, fontSize: 13 }}>✦</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4' }}>Meridian AI</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'rgba(52,211,153,.12)', color: ACCENT }}>Live</span>
        <button
          onClick={onClose}
          style={{ marginLeft: 8, background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
        >×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            padding: '10px 13px', borderRadius: 10, fontSize: 13, lineHeight: 1.6,
            background: msg.role === 'user' ? 'rgba(52,211,153,.1)' : '#0A0F0C',
            color: '#F0FDF4',
            border: msg.role === 'user' ? '1px solid rgba(52,211,153,.2)' : '1px solid rgba(255,255,255,.07)',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%',
          }}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ padding: '10px 13px', borderRadius: 10, fontSize: 13, color: ACCENT, background: '#0A0F0C', border: '1px solid rgba(255,255,255,.07)', alignSelf: 'flex-start', animation: 'pulse 1.2s ease infinite' }}>
            thinking…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about your data…"
            style={{
              flex: 1, padding: '9px 12px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,.07)',
              background: '#0A0F0C', color: '#F0FDF4', fontSize: 13, outline: 'none',
            }}
          />
          <button
            onClick={send}
            disabled={loading}
            style={{
              width: 36, height: 36, borderRadius: 8, border: 'none',
              background: loading ? '#065F46' : ACCENT,
              color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >↑</button>
        </div>
      </div>
    </div>
  )
}
