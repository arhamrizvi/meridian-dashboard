'use client'

import { BRANCHES } from '@/lib/mockData'

const ACCENT = '#34D399'

const UNIT_MIX = [
  { type: 'Hot desks',       pct: 45, color: ACCENT },
  { type: 'Private offices', pct: 28, color: '#F59E0B' },
  { type: 'Meeting rooms',   pct: 15, color: '#3B82F6' },
  { type: 'Event space',     pct: 12, color: '#A78BFA' },
]

function OccupancyGrid({ total, occupied }: { total: number; occupied: number }) {
  const cells = Math.min(total, 40)
  const occupiedCells = Math.round((occupied / total) * cells)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 10 }}>
      {Array.from({ length: cells }).map((_, i) => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: 2,
          background: i < occupiedCells ? ACCENT : 'rgba(255,255,255,.08)',
        }} />
      ))}
    </div>
  )
}

export default function SpacesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Summary bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Total units',      value: '402' },
          { label: 'Occupied',         value: '318' },
          { label: 'Branches',         value: '7' },
          { label: 'Avg occupancy',    value: '79.1%' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '16px 20px', animation: `fadeSlide .4s ease ${i * .07}s both` }}>
            <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#F0FDF4', fontFamily: 'monospace' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Branch cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {BRANCHES.map((b, i) => {
          const pct = Math.round((b.occupied / b.units) * 100)
          const statusColor = pct >= 80 ? '#F59E0B' : pct >= 70 ? ACCENT : '#6B7280'
          return (
            <div key={b.id} style={{
              background: '#111814', border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 12, padding: 20,
              animation: `fadeSlide .4s ease ${i * .06}s both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F0FDF4' }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{b.city}</div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 10, fontWeight: 600, background: `${statusColor}20`, color: statusColor }}>
                  {pct}%
                </span>
              </div>

              {/* Occupancy bar */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9CA3AF', marginBottom: 5 }}>
                  <span>Occupancy</span>
                  <span>{b.occupied} / {b.units} units</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,.07)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: statusColor, borderRadius: 3, transition: 'width .8s ease' }} />
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>
                <span><span style={{ color: '#F0FDF4', fontWeight: 500 }}>{b.tenants}</span> tenants</span>
                <span><span style={{ color: '#F0FDF4', fontWeight: 500 }}>SAR {(b.revenue / 1000).toFixed(0)}K</span> / mo</span>
              </div>

              {/* Unit mix */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>Unit mix</div>
                <div style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden', gap: 1 }}>
                  {UNIT_MIX.map(u => (
                    <div key={u.type} style={{ flex: u.pct, background: u.color }} />
                  ))}
                </div>
              </div>

              {/* Occupancy grid */}
              <OccupancyGrid total={b.units} occupied={b.occupied} />
            </div>
          )
        })}
      </div>

      {/* Unit mix legend */}
      <div style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#F0FDF4', marginBottom: 14 }}>Unit mix — network average</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {UNIT_MIX.map(u => (
            <div key={u.type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: u.color }} />
              <span style={{ fontSize: 13, color: '#9CA3AF' }}>{u.type}</span>
              <span style={{ fontSize: 13, color: '#F0FDF4', fontWeight: 500 }}>{u.pct}%</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
