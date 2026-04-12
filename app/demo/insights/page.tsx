'use client'

import { useState } from 'react'
import { AI_INSIGHTS } from '@/lib/mockData'
import { exportInsightsPDF, exportInsightsPPTX } from '@/lib/exportInsights'

const ACCENT = '#34D399'

const TYPE_META: Record<string, { border: string; bg: string; icon: string; label: string; dimBg: string }> = {
  opportunity: { border: '#059669', bg: 'rgba(5,150,105,.12)',   dimBg: 'rgba(5,150,105,.06)',  icon: '↗', label: 'Opportunity' },
  risk:        { border: '#DC2626', bg: 'rgba(220,38,38,.12)',   dimBg: 'rgba(220,38,38,.06)',  icon: '⚠', label: 'Risk' },
  efficiency:  { border: '#3B82F6', bg: 'rgba(59,130,246,.12)',  dimBg: 'rgba(59,130,246,.06)', icon: '⚡', label: 'Efficiency' },
  growth:      { border: '#8B5CF6', bg: 'rgba(139,92,246,.12)',  dimBg: 'rgba(139,92,246,.06)', icon: '◆', label: 'Growth' },
}

const SUMMARY_STATS = [
  { label: 'Total insights',      value: '6',         color: '#F0FDF4' },
  { label: 'High priority',       value: '2',         color: '#EF4444' },
  { label: 'Revenue opportunity', value: 'SAR 415K+', color: ACCENT },
  { label: 'Est. savings / mo',   value: 'SAR 32K',   color: '#3B82F6' },
]

const PRIORITY_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  high:   { bg: 'rgba(239,68,68,.15)',   color: '#EF4444', label: 'High priority' },
  medium: { bg: 'rgba(245,158,11,.15)',  color: '#F59E0B', label: 'Medium' },
  low:    { bg: 'rgba(107,114,128,.15)', color: '#9CA3AF', label: 'Low' },
}

export default function InsightsPage() {
  const [exporting, setExporting] = useState<'pdf' | 'pptx' | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleExport = async (type: 'pdf' | 'pptx') => {
    setMenuOpen(false)
    setExporting(type)
    try {
      if (type === 'pdf') await exportInsightsPDF()
      else await exportInsightsPPTX()
    } finally {
      setExporting(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Page header ──────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>
            AI Insights · White Space KSA
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#F0FDF4', letterSpacing: '-0.01em', margin: 0 }}>
            Operational Intelligence
          </h1>
          <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4, lineHeight: 1.5 }}>
            6 insights generated from real-time data across 7 branches · Last refreshed just now
          </p>
        </div>

        {/* Export dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(o => !o)}
            disabled={!!exporting}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 8, cursor: exporting ? 'wait' : 'pointer',
              background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.3)',
              color: ACCENT, fontSize: 12, fontWeight: 500,
              opacity: exporting ? 0.6 : 1,
            }}
          >
            {exporting ? `Generating ${exporting.toUpperCase()}…` : '↓ Export report'}
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute', top: 38, right: 0, zIndex: 50,
              background: '#1a1f1c', border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 10, overflow: 'hidden', minWidth: 170,
              boxShadow: '0 8px 24px rgba(0,0,0,.5)',
            }}>
              {[
                { type: 'pdf'  as const, icon: '📄', label: 'Download PDF',  sub: 'A4 report' },
                { type: 'pptx' as const, icon: '📊', label: 'Download PPTX', sub: 'Slide deck' },
              ].map(opt => (
                <button
                  key={opt.type}
                  onClick={() => handleExport(opt.type)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '11px 14px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(52,211,153,.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: 16 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#F0FDF4' }}>{opt.label}</div>
                    <div style={{ fontSize: 10, color: '#6B7280' }}>{opt.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Summary stats ────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {SUMMARY_STATS.map((s, i) => (
          <div
            key={i}
            style={{
              background: '#111814', border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 12, padding: '14px 18px',
              animation: `fadeSlide .4s ease ${i * .07}s both`,
            }}
          >
            <div style={{ fontSize: 10, color: '#6B7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {s.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Type filter tabs ─────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All', count: 6 },
          { key: 'risk', label: 'Risk', count: 1 },
          { key: 'opportunity', label: 'Opportunity', count: 2 },
          { key: 'efficiency', label: 'Efficiency', count: 1 },
          { key: 'growth', label: 'Growth', count: 2 },
        ].map(tab => {
          const meta = tab.key !== 'all' ? TYPE_META[tab.key] : null
          return (
            <div
              key={tab.key}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 20,
                background: tab.key === 'all' ? 'rgba(52,211,153,.1)' : 'rgba(255,255,255,.04)',
                border: `1px solid ${tab.key === 'all' ? 'rgba(52,211,153,.3)' : 'rgba(255,255,255,.07)'}`,
                fontSize: 11, fontWeight: 500, cursor: 'pointer',
                color: tab.key === 'all' ? ACCENT : (meta?.border ?? '#9CA3AF'),
              }}
            >
              {meta && <span style={{ fontSize: 9 }}>{meta.icon}</span>}
              {tab.label}
              <span style={{
                fontSize: 9, padding: '1px 5px', borderRadius: 8,
                background: tab.key === 'all' ? 'rgba(52,211,153,.15)' : 'rgba(255,255,255,.07)',
                color: tab.key === 'all' ? ACCENT : '#6B7280', fontWeight: 600,
              }}>
                {tab.count}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Insight cards ────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {AI_INSIGHTS.map((ins, i) => {
          const ts = TYPE_META[ins.type]
          const badge = PRIORITY_BADGE[ins.priority]
          return (
            <div
              key={i}
              style={{
                background: '#111814',
                border: '1px solid rgba(255,255,255,.07)',
                borderLeft: `3px solid ${ts.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                animation: `fadeSlide .5s ease ${i * .08}s both`,
              }}
            >
              <div style={{ padding: '16px 20px' }}>
                {/* Row 1: type + priority */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 7,
                    background: ts.bg, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: ts.border,
                  }}>
                    {ts.icon}
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: ts.border,
                    textTransform: 'uppercase', letterSpacing: '.07em',
                  }}>
                    {ts.label}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 9px', borderRadius: 10, background: badge.bg, color: badge.color, fontWeight: 500 }}>
                    {badge.label}
                  </span>
                </div>

                {/* Row 2: title */}
                <div style={{ fontSize: 14, fontWeight: 600, color: '#F0FDF4', marginBottom: 6, lineHeight: 1.45, letterSpacing: '-0.01em' }}>
                  {ins.title}
                </div>

                {/* Row 3: body */}
                <div style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.7, marginBottom: 14 }}>
                  {ins.body}
                </div>

                {/* Row 4: action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button style={{
                    fontSize: 12, fontWeight: 500, color: ACCENT,
                    background: 'rgba(52,211,153,.08)', border: '1px solid rgba(52,211,153,.2)',
                    borderRadius: 7, padding: '7px 14px', cursor: 'pointer',
                  }}>
                    {ins.action} →
                  </button>
                  <span style={{ fontSize: 10, color: '#4B5563' }}>
                    Meridian AI · just now
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Footer note ──────────────────────────────────────── */}
      <div style={{
        background: 'rgba(52,211,153,.04)',
        border: '1px solid rgba(52,211,153,.12)',
        borderRadius: 10, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ color: ACCENT, fontSize: 14, flexShrink: 0 }}>✦</span>
        <span style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>
          Insights are generated from live operational data across all branches. Use <strong style={{ color: '#9CA3AF' }}>Ask Meridian</strong> in the sidebar for a deeper breakdown on any item.
        </span>
      </div>

    </div>
  )
}
