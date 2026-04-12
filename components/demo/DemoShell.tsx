'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AskMeridianChat from './AskMeridianChat'

const ACCENT = '#34D399'

const NAV = [
  { href: '/demo',          label: 'Overview',    icon: '◎' },
  { href: '/demo/spaces',   label: 'Spaces',      icon: '⊞' },
  { href: '/demo/members',  label: 'Members',     icon: '⊕' },
  { href: '/demo/finance',  label: 'Finance',     icon: '◈' },
  { href: '/demo/insights', label: 'AI Insights', icon: '✦', badge: '6' },
]

export default function DemoShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const pathname = usePathname()

  const activeLabel = NAV.find(n => n.href === pathname)?.label ?? 'Overview'

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      fontFamily: 'var(--font-geist-sans, system-ui)',
      background: '#0D1210',
      '--color-bg-primary': '#0A0F0C',
      '--color-bg-secondary': '#111814',
      '--color-bg-tertiary': '#0D1210',
      '--color-text-primary': '#F0FDF4',
      '--color-text-secondary': '#9CA3AF',
      '--color-text-tertiary': '#6B7280',
      '--color-border': 'rgba(255,255,255,0.07)',
    } as React.CSSProperties}>
      <style>{`
        @keyframes fadeSlide { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarOpen ? 224 : 56, transition: 'width .25s ease',
        background: 'var(--color-bg-secondary, #111814)',
        borderRight: '1px solid var(--color-border, rgba(255,255,255,.07))',
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
      }}>
        {/* Logo */}
        <div
          onClick={() => setSidebarOpen(o => !o)}
          style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <img src="/logo-icon.svg" alt="Meridian" style={{ width: 30, height: 30, flexShrink: 0 }} />
          {sidebarOpen && (
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary, #F0FDF4)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              Meridian
            </span>
          )}
        </div>

        {/* Workspace label */}
        {sidebarOpen && (
          <div style={{ padding: '0 16px 16px', borderBottom: '1px solid var(--color-border, rgba(255,255,255,.07))' }}>
            <div style={{ fontSize: 10, color: 'var(--color-text-tertiary, #6B7280)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.06em' }}>Workspace</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-primary, #F0FDF4)', fontWeight: 500 }}>White Space — KSA</div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {NAV.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, marginBottom: 2,
                transition: 'all .15s ease', whiteSpace: 'nowrap',
                background: active ? 'rgba(52,211,153,.1)' : 'transparent',
                color: active ? ACCENT : 'var(--color-text-secondary, #9CA3AF)',
              }}>
                <span style={{ fontSize: 15, flexShrink: 0, width: 20, textAlign: 'center' }}>{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <span style={{ fontSize: 13, fontWeight: active ? 500 : 400 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{ marginLeft: 'auto', fontSize: 10, padding: '1px 6px', borderRadius: 8, background: 'rgba(52,211,153,.15)', color: ACCENT, fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Ask Meridian toggle */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--color-border, rgba(255,255,255,.07))' }}>
          <div
            onClick={() => setChatOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
              background: chatOpen ? 'rgba(52,211,153,.15)' : 'transparent',
              color: chatOpen ? ACCENT : 'var(--color-text-secondary, #9CA3AF)',
              transition: 'all .15s ease',
            }}
          >
            <span style={{ fontSize: 15, flexShrink: 0, width: 20, textAlign: 'center' }}>✦</span>
            {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500 }}>Ask Meridian</span>}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '14px 24px', borderBottom: '1px solid var(--color-border, rgba(255,255,255,.07))',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--color-bg-secondary, #111814)',
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-text-primary, #F0FDF4)', letterSpacing: '-0.01em' }}>{activeLabel}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary, #6B7280)', marginTop: 2 }}>Last synced: just now · 7 branches · Saudi Arabia</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--color-border, rgba(255,255,255,.07))', fontSize: 12, color: 'var(--color-text-secondary, #9CA3AF)', cursor: 'pointer', background: 'var(--color-bg-primary, #0A0F0C)' }}>
              Export ↓
            </div>
            <div style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, color: '#fff', cursor: 'pointer', background: ACCENT, fontWeight: 500 }}>
              + Connect data
            </div>
          </div>
        </div>

        {/* Content + chat */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
          {chatOpen && <AskMeridianChat onClose={() => setChatOpen(false)} />}
        </div>
      </div>
    </div>
  )
}
