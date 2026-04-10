'use client'

import { MEMBER_SEGMENTS } from '@/lib/mockData'

const ACCENT = '#34D399'

const AT_RISK = [
  { name: 'Riyadh SME — Al Wadi Logistics',     days: 22, spend: 'SAR 18K/mo', risk: 'High' },
  { name: 'KAFD Startup — NovaTech Solutions',  days: 19, spend: 'SAR 12K/mo', risk: 'High' },
  { name: 'Jeddah Freelancer — F. Al Harbi',    days: 18, spend: 'SAR 2.8K/mo', risk: 'Medium' },
  { name: 'Dammam SME — GulfCore Consulting',   days: 18, spend: 'SAR 24K/mo', risk: 'High' },
  { name: 'Al Khobar Startup — PivotX',         days: 16, spend: 'SAR 9K/mo',  risk: 'Medium' },
]

export default function MembersPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { label: 'Active tenants',  value: '40' },
          { label: 'New this month',  value: '5' },
          { label: 'At-risk',         value: '9', warn: true },
          { label: 'Avg tenure',      value: '11.4 mo' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111814', border: `1px solid ${s.warn ? 'rgba(239,68,68,.25)' : 'rgba(255,255,255,.07)'}`, borderRadius: 12, padding: '16px 20px', animation: `fadeSlide .4s ease ${i * .07}s both` }}>
            <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: s.warn ? '#EF4444' : '#F0FDF4', fontFamily: 'monospace' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Segment table */}
      <div style={{ background: '#111814', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4', marginBottom: 16 }}>Member segments</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                {['Segment', 'Tenants', 'Monthly Rev', 'Avg Tenure', 'NPS'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#6B7280', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEMBER_SEGMENTS.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.05)', cursor: 'pointer' }}>
                  <td style={{ padding: '13px 12px', color: '#F0FDF4', fontWeight: 500 }}>{s.segment}</td>
                  <td style={{ padding: '13px 12px', color: '#9CA3AF', fontFamily: 'monospace' }}>{s.count}</td>
                  <td style={{ padding: '13px 12px', color: '#9CA3AF', fontFamily: 'monospace' }}>{s.revenue}</td>
                  <td style={{ padding: '13px 12px', color: '#9CA3AF' }}>{s.avgStay}</td>
                  <td style={{ padding: '13px 12px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 10, fontSize: 12, fontWeight: 500,
                      background: s.satisfaction >= 8.5 ? 'rgba(52,211,153,.12)' : s.satisfaction >= 8 ? 'rgba(59,130,246,.12)' : 'rgba(245,158,11,.12)',
                      color: s.satisfaction >= 8.5 ? ACCENT : s.satisfaction >= 8 ? '#3B82F6' : '#F59E0B',
                    }}>{s.satisfaction}/10</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* At-risk tenants */}
      <div style={{ background: '#111814', border: '1px solid rgba(239,68,68,.2)', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 14 }}>⚠</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#F0FDF4' }}>At-risk tenants</span>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'rgba(239,68,68,.15)', color: '#EF4444', fontWeight: 500 }}>9 flagged</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AT_RISK.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#0A0F0C', borderRadius: 8, border: '1px solid rgba(255,255,255,.05)' }}>
              <div>
                <div style={{ fontSize: 13, color: '#F0FDF4', fontWeight: 500, marginBottom: 3 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>Inactive {t.days} days · {t.spend}</div>
              </div>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 8, fontWeight: 500, background: t.risk === 'High' ? 'rgba(239,68,68,.15)' : 'rgba(245,158,11,.15)', color: t.risk === 'High' ? '#EF4444' : '#F59E0B', flexShrink: 0 }}>{t.risk}</span>
            </div>
          ))}
        </div>
        <button style={{ marginTop: 14, fontSize: 12, fontWeight: 500, color: '#EF4444', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 6, padding: '7px 16px', cursor: 'pointer' }}>
          Send outreach to all 9 →
        </button>
      </div>

    </div>
  )
}
