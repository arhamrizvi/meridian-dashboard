'use client'

import { FINANCE_METRICS, PNL_ROWS } from '@/lib/mockData'

const ACCENT = '#34D399'

export default function FinancePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* 3 metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {FINANCE_METRICS.map((m, i) => (
          <div key={i} style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20, animation: `fadeSlide .4s ease ${i * .08}s both` }}>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6, fontWeight: 500 }}>{m.label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: '#F0FDF4', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{m.value}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 12, color: ACCENT, fontWeight: 500 }}>{m.delta}</span>
              <span style={{ fontSize: 11, color: '#6B7280' }}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* P&L table */}
      <div style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4', marginBottom: 16 }}>P&amp;L — current month (SAR)</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              {['Line item', 'Monthly', '% of Revenue'].map(h => (
                <th key={h} style={{ textAlign: h === 'Line item' ? 'left' : 'right', padding: '8px 12px', color: '#6B7280', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PNL_ROWS.map((row, i) => {
              const isSub = row.type === 'sub'
              const isHighlight = ['profit', 'ebitda'].includes(row.type)
              const isRed = row.type === 'cost'
              const pct = ((row.value / 1440000) * 100).toFixed(1)
              return (
                <tr key={i} style={{
                  borderBottom: isHighlight ? '1px solid rgba(255,255,255,.07)' : '1px solid rgba(255,255,255,.03)',
                  background: isHighlight ? 'rgba(52,211,153,.05)' : 'transparent',
                }}>
                  <td style={{ padding: `${isSub ? '8px' : '12px'} 12px`, color: isSub ? '#6B7280' : '#F0FDF4', fontWeight: isHighlight ? 600 : (isSub ? 400 : 500), paddingLeft: isSub ? 28 : 12 }}>
                    {row.label}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: isHighlight ? ACCENT : isRed ? '#EF4444' : '#9CA3AF', fontFamily: 'monospace', fontWeight: isHighlight ? 600 : 400 }}>
                    {isRed ? '−' : ''}{row.value.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: '#6B7280', fontFamily: 'monospace', fontSize: 12 }}>
                    {pct}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Branch revenue breakdown */}
      <div style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4', marginBottom: 16 }}>Revenue by branch</div>
        {[
          { name: 'Riyadh HQ',           rev: 312000 },
          { name: 'KAFD Tower',           rev: 278000 },
          { name: 'Jeddah Central',       rev: 215000 },
          { name: 'Makkah Road',          rev: 186000 },
          { name: 'Dammam Business Hub',  rev: 174000 },
          { name: 'KAUST Innovation Hub', rev: 148000 },
          { name: 'Al Khobar Plaza',      rev: 127000 },
        ].map((b, i) => {
          const pct = Math.round((b.rev / 1440000) * 100)
          return (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                <span style={{ color: '#F0FDF4', fontWeight: 500 }}>{b.name}</span>
                <span style={{ color: '#9CA3AF', fontFamily: 'monospace' }}>SAR {b.rev.toLocaleString()} <span style={{ color: '#6B7280' }}>({pct}%)</span></span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,.07)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: ACCENT, borderRadius: 3 }} />
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
