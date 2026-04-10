'use client'

import { KPI_METRICS, REVENUE_DATA, SPACE_UTIL, AI_INSIGHTS } from '@/lib/mockData'

const ACCENT = '#34D399'

function Sparkline({ data, color = ACCENT }: { data: number[]; color?: string }) {
  const w = 80, h = 28
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 5) - 2}`
  ).join(' ')
  const lastX = w, lastY = h - ((data[data.length - 1] - min) / range) * (h - 5) - 2
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  )
}

function BarChart() {
  const maxVal = Math.max(...REVENUE_DATA.map(d => d.desk + d.meeting + d.events))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 140, padding: '0 4px' }}>
      {REVENUE_DATA.map((d, i) => {
        const total = d.desk + d.meeting + d.events
        const h = (total / maxVal) * 120
        const deskH = (d.desk / total) * h
        const meetH = (d.meeting / total) * h
        const eventH = (d.events / total) * h
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: eventH, background: '#A78BFA' }} />
              <div style={{ height: meetH, background: '#3B82F6' }} />
              <div style={{ height: deskH, background: ACCENT }} />
            </div>
            <span style={{ fontSize: 10, color: '#6B7280', marginTop: 4, fontFamily: 'monospace' }}>{d.month}</span>
          </div>
        )
      })}
    </div>
  )
}

function UtilBar({ name, capacity, used, color }: { name: string; capacity: number; used: number; color: string }) {
  const pct = Math.round((used / capacity) * 100)
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
        <span style={{ color: '#F0FDF4', fontWeight: 500 }}>{name}</span>
        <span style={{ color: '#9CA3AF' }}>{used}/{capacity} — {pct}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,.07)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width .8s ease' }} />
      </div>
    </div>
  )
}

const TYPE_STYLE: Record<string, { border: string; icon: string; label: string }> = {
  opportunity: { border: '#059669', icon: '↗', label: 'Opportunity' },
  risk:        { border: '#DC2626', icon: '⚠', label: 'Risk' },
  efficiency:  { border: '#3B82F6', icon: '⚡', label: 'Efficiency' },
  growth:      { border: '#8B5CF6', icon: '◆', label: 'Growth' },
}

const card = {
  background: '#111814',
  border: '1px solid rgba(255,255,255,.07)',
  borderRadius: 12,
  padding: 20,
}

export default function OverviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {KPI_METRICS.map((m, i) => {
          const isDown = m.label === 'Churn rate'
          const deltaColor = (m.trend === 'up' && !isDown) || (m.trend === 'down' && isDown) ? ACCENT : '#EF4444'
          return (
            <div key={i} style={{ ...card, animation: `fadeSlide .4s ease ${i * .08}s both` }}>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6, fontWeight: 500, letterSpacing: '.02em' }}>{m.label}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 600, color: '#F0FDF4', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{m.value}</div>
                  <span style={{ fontSize: 12, color: deltaColor, fontWeight: 500 }}>{m.delta}</span>
                </div>
                <Sparkline data={m.sparkline} color={deltaColor} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Revenue + Space utilisation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4' }}>Revenue breakdown (SAR &#x2019;000)</span>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#9CA3AF' }}>
              {[['Desks', ACCENT], ['Meeting', '#3B82F6'], ['Events', '#A78BFA']].map(([l, c]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c as string, display: 'inline-block' }} />{l}
                </span>
              ))}
            </div>
          </div>
          <BarChart />
        </div>

        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4', marginBottom: 16 }}>Space utilisation</div>
          {SPACE_UTIL.map((s, i) => <UtilBar key={i} {...s} />)}
        </div>
      </div>

      {/* AI action plan */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 16, color: ACCENT }}>✦</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#F0FDF4' }}>AI action plan</span>
          <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 10, background: 'rgba(52,211,153,.12)', color: ACCENT, fontWeight: 500, marginLeft: 4 }}>6 new</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {AI_INSIGHTS.slice(0, 4).map((ins, i) => {
            const ts = TYPE_STYLE[ins.type]
            return (
              <div key={i} style={{
                background: '#111814',
                border: '1px solid rgba(255,255,255,.07)',
                borderLeft: `3px solid ${ts.border}`,
                borderRadius: 10, padding: '16px 18px',
                animation: `fadeSlide .5s ease ${i * .1}s both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 13 }}>{ts.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: ts.border, textTransform: 'uppercase', letterSpacing: '.05em' }}>{ts.label}</span>
                  {ins.priority === 'high' && (
                    <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(239,68,68,.15)', color: '#EF4444', fontWeight: 500 }}>High priority</span>
                  )}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: '#F0FDF4', marginBottom: 6 }}>{ins.title}</div>
                <div style={{ fontSize: 12.5, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 12 }}>{ins.body}</div>
                <button style={{ fontSize: 12, fontWeight: 500, color: ACCENT, background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.25)', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>
                  {ins.action} →
                </button>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
