'use client'

import { AI_INSIGHTS } from '@/lib/mockData'

const ACCENT = '#34D399'

const TYPE_STYLE: Record<string, { border: string; bg: string; icon: string; label: string }> = {
  opportunity: { border: '#059669', bg: 'rgba(5,150,105,.08)',    icon: '↗', label: 'Opportunity' },
  risk:        { border: '#DC2626', bg: 'rgba(220,38,38,.08)',    icon: '⚠', label: 'Risk' },
  efficiency:  { border: '#3B82F6', bg: 'rgba(59,130,246,.08)',   icon: '⚡', label: 'Efficiency' },
  growth:      { border: '#8B5CF6', bg: 'rgba(139,92,246,.08)',   icon: '◆', label: 'Growth' },
}

const TOTAL_OPPORTUNITY = 'SAR 415K+'

export default function InsightsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Header summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Total insights',     value: '6',             color: '#F0FDF4' },
          { label: 'High priority',      value: '2',             color: '#EF4444' },
          { label: 'Revenue opportunity',value: TOTAL_OPPORTUNITY, color: ACCENT },
          { label: 'Est. savings/mo',    value: 'SAR 32K',       color: '#3B82F6' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '16px 20px', animation: `fadeSlide .4s ease ${i * .07}s both` }}>
            <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: s.color, fontFamily: 'monospace', letterSpacing: '-0.01em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Insight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {AI_INSIGHTS.map((ins, i) => {
          const ts = TYPE_STYLE[ins.type]
          return (
            <div key={i} style={{
              background: '#111814',
              border: '1px solid rgba(255,255,255,.07)',
              borderLeft: `3px solid ${ts.border}`,
              borderRadius: 10, padding: '18px 20px',
              animation: `fadeSlide .5s ease ${i * .1}s both`,
            }}>
              {/* Type + priority badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: ts.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: ts.border }}>
                  {ts.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, color: ts.border, textTransform: 'uppercase', letterSpacing: '.05em' }}>{ts.label}</span>
                {ins.priority === 'high' && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(239,68,68,.15)', color: '#EF4444', fontWeight: 500 }}>High priority</span>
                )}
                {ins.priority === 'medium' && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(245,158,11,.15)', color: '#F59E0B', fontWeight: 500 }}>Medium</span>
                )}
                {ins.priority === 'low' && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(107,114,128,.15)', color: '#9CA3AF', fontWeight: 500 }}>Low</span>
                )}
              </div>

              <div style={{ fontSize: 14, fontWeight: 600, color: '#F0FDF4', marginBottom: 8, lineHeight: 1.4 }}>{ins.title}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.65, marginBottom: 14 }}>{ins.body}</div>

              <button style={{ fontSize: 12, fontWeight: 500, color: ACCENT, background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.25)', borderRadius: 6, padding: '7px 16px', cursor: 'pointer' }}>
                {ins.action} →
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div style={{ background: 'rgba(52,211,153,.05)', border: '1px solid rgba(52,211,153,.15)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: ACCENT, fontSize: 14 }}>✦</span>
        <span style={{ fontSize: 13, color: '#9CA3AF' }}>Insights are generated from real-time operational data. Ask Meridian AI for a deeper breakdown on any item.</span>
      </div>

    </div>
  )
}
