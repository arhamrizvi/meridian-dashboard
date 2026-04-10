'use client'

import { useState, useEffect, useRef } from "react";

const COLORS = {
  emerald: { bg: "#0A2A1B", accent: "#34D399", muted: "#065F46", light: "#D1FAE5", mid: "#10B981" },
  amber: { accent: "#F59E0B", light: "#FEF3C7" },
  red: { accent: "#EF4444", light: "#FEE2E2" },
  blue: { accent: "#3B82F6", light: "#DBEAFE" },
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "◎" },
  { id: "spaces", label: "Spaces", icon: "⊞" },
  { id: "members", label: "Members", icon: "⊕" },
  { id: "finance", label: "Finance", icon: "◈" },
  { id: "marketing", label: "Marketing", icon: "◇" },
  { id: "insights", label: "AI Insights", icon: "✦" },
];

const METRICS = [
  { label: "Occupancy rate", value: "78%", delta: "+4.2%", trend: "up", sparkline: [62, 65, 68, 70, 71, 74, 76, 78] },
  { label: "Monthly revenue", value: "PKR 4.2M", delta: "+12.3%", trend: "up", sparkline: [3.1, 3.3, 3.5, 3.6, 3.7, 3.8, 4.0, 4.2] },
  { label: "Active members", value: "186", delta: "+8", trend: "up", sparkline: [152, 158, 162, 168, 170, 175, 180, 186] },
  { label: "Churn rate", value: "3.1%", delta: "-0.8%", trend: "down", sparkline: [5.2, 4.8, 4.5, 4.2, 3.9, 3.6, 3.4, 3.1] },
];

const REVENUE_DATA = [
  { month: "Sep", desk: 2800, meeting: 420, events: 310 },
  { month: "Oct", desk: 2950, meeting: 480, events: 280 },
  { month: "Nov", desk: 3100, meeting: 510, events: 350 },
  { month: "Dec", desk: 3050, meeting: 460, events: 420 },
  { month: "Jan", desk: 3200, meeting: 520, events: 380 },
  { month: "Feb", desk: 3400, meeting: 550, events: 410 },
  { month: "Mar", desk: 3600, meeting: 580, events: 440 },
  { month: "Apr", desk: 3780, meeting: 610, events: 470 },
];

const SPACE_UTIL = [
  { name: "Hot desks", capacity: 60, used: 48, color: COLORS.emerald.accent },
  { name: "Private offices", capacity: 24, used: 22, color: COLORS.amber.accent },
  { name: "Meeting rooms", capacity: 8, used: 5, color: COLORS.blue.accent },
  { name: "Event space", capacity: 3, used: 2, color: "#A78BFA" },
];

const AI_INSIGHTS = [
  { type: "opportunity", title: "Revenue opportunity detected", body: "Meeting room utilization peaks Mon-Wed but drops to 31% Thu-Fri. Launching a 'Thursday focus day' package at 40% discount could generate ~PKR 180K/month in recovered revenue.", priority: "high", action: "Create Thursday package" },
  { type: "risk", title: "Churn risk — 12 members flagged", body: "12 members haven't used the space in 14+ days. Historical pattern: 73% of members inactive >21 days cancel within 60 days. Proactive outreach now could save ~PKR 360K ARR.", priority: "high", action: "View at-risk members" },
  { type: "efficiency", title: "HVAC cost reduction", body: "Zone 3 (east wing) averages 2.1 occupants after 5 PM but runs full climate control until 9 PM. Reducing to standby mode after 6 PM would save ~PKR 45K/month.", priority: "medium", action: "Adjust schedule" },
  { type: "growth", title: "Expansion signal — waitlist growing", body: "Private office waitlist has grown 34% in 8 weeks (now 18 companies). Current average wait: 47 days. This suggests demand supports a 15-20% price increase or floor expansion.", priority: "medium", action: "View waitlist analysis" },
];

const MEMBER_SEGMENTS = [
  { segment: "Freelancers", count: 68, revenue: "1.2M", avgStay: "4.2 mo", satisfaction: 8.1 },
  { segment: "Startups (2-5)", count: 42, revenue: "1.8M", avgStay: "9.8 mo", satisfaction: 8.6 },
  { segment: "SMEs (6-15)", count: 31, revenue: "2.4M", avgStay: "14.2 mo", satisfaction: 7.9 },
  { segment: "Enterprise", count: 8, revenue: "1.6M", avgStay: "18.5 mo", satisfaction: 8.3 },
];

function Sparkline({ data, color = COLORS.emerald.accent, width = 80, height = 28 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2} r="2.5" fill={color} />
    </svg>
  );
}

function MiniBarChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.desk + d.meeting + d.events));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140, padding: "0 4px" }}>
      {data.map((d, i) => {
        const total = d.desk + d.meeting + d.events;
        const h = (total / maxVal) * 120;
        const deskH = (d.desk / total) * h;
        const meetH = (d.meeting / total) * h;
        const eventH = (d.events / total) * h;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: eventH, background: "#A78BFA", transition: "height 0.6s ease" }} />
              <div style={{ height: meetH, background: COLORS.blue.accent, transition: "height 0.6s ease" }} />
              <div style={{ height: deskH, background: COLORS.emerald.accent, transition: "height 0.6s ease" }} />
            </div>
            <span style={{ fontSize: 10, color: "#6B7280", marginTop: 4, fontFamily: "var(--font-mono, monospace)" }}>{d.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function UtilizationBar({ name, capacity, used, color }) {
  const pct = Math.round((used / capacity) * 100);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
        <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{name}</span>
        <span style={{ color: "var(--color-text-secondary)" }}>{used}/{capacity} — {pct}%</span>
      </div>
      <div style={{ height: 6, background: "var(--color-background-tertiary)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

function InsightCard({ insight, index }) {
  const typeColors = {
    opportunity: { bg: "#064E3B", border: "#059669", icon: "↗", label: "Opportunity" },
    risk: { bg: "#7F1D1D", border: "#DC2626", icon: "⚠", label: "Risk" },
    efficiency: { bg: "#1E3A5F", border: "#3B82F6", icon: "⚡", label: "Efficiency" },
    growth: { bg: "#4A1D7A", border: "#8B5CF6", icon: "◆", label: "Growth" },
  };
  const tc = typeColors[insight.type];
  return (
    <div style={{
      background: "var(--color-background-secondary)",
      border: "1px solid var(--color-border-tertiary)",
      borderLeft: `3px solid ${tc.border}`,
      borderRadius: 10,
      padding: "16px 18px",
      animation: `fadeSlide 0.5s ease ${index * 0.1}s both`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 14 }}>{tc.icon}</span>
        <span style={{ fontSize: 11, fontWeight: 500, color: tc.border, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tc.label}</span>
        {insight.priority === "high" && (
          <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "rgba(239,68,68,0.15)", color: "#EF4444", fontWeight: 500 }}>High priority</span>
        )}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 6 }}>{insight.title}</div>
      <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>{insight.body}</div>
      <button style={{
        fontSize: 12, fontWeight: 500, color: COLORS.emerald.accent, background: "rgba(52,211,153,0.1)",
        border: "1px solid rgba(52,211,153,0.25)", borderRadius: 6, padding: "6px 14px", cursor: "pointer",
      }}>{insight.action} →</button>
    </div>
  );
}

export function MeridianDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hey — I've been analyzing White Space's data. Occupancy is strong at 78%, but I've flagged a few things worth your attention. Want to start with revenue opportunities or churn risks?" }
  ]);

  const cardStyle = {
    background: "var(--color-background-secondary)",
    border: "1px solid var(--color-border-tertiary)",
    borderRadius: 12,
    padding: 20,
  };

  const renderOverview = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ ...cardStyle, animation: `fadeSlide 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.02em" }}>{m.label}</div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-mono, monospace)", letterSpacing: "-0.02em" }}>{m.value}</div>
                <span style={{ fontSize: 12, color: m.trend === "up" ? COLORS.emerald.accent : (m.label === "Churn rate" ? COLORS.emerald.accent : COLORS.red.accent), fontWeight: 500 }}>{m.delta}</span>
              </div>
              <Sparkline data={m.sparkline} color={m.trend === "up" && m.label !== "Churn rate" ? COLORS.emerald.accent : (m.label === "Churn rate" ? COLORS.emerald.accent : COLORS.red.accent)} />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Space utilization row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>Revenue breakdown (PKR '000)</span>
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--color-text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.emerald.accent, display: "inline-block" }} />Desks</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.blue.accent, display: "inline-block" }} />Meeting</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#A78BFA", display: "inline-block" }} />Events</span>
            </div>
          </div>
          <MiniBarChart data={REVENUE_DATA} />
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 16 }}>Space utilization</div>
          {SPACE_UTIL.map((s, i) => <UtilizationBar key={i} {...s} />)}
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 16, color: COLORS.emerald.accent }}>✦</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>AI action plan</span>
          <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 10, background: "rgba(52,211,153,0.12)", color: COLORS.emerald.accent, fontWeight: 500, marginLeft: 4 }}>4 new</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {AI_INSIGHTS.map((ins, i) => <InsightCard key={i} insight={ins} index={i} />)}
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 16 }}>Member segments</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border-tertiary)" }}>
                {["Segment", "Members", "Monthly Rev", "Avg. Tenure", "NPS"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "var(--color-text-secondary)", fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEMBER_SEGMENTS.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--color-border-tertiary)", cursor: "pointer" }}>
                  <td style={{ padding: "12px", color: "var(--color-text-primary)", fontWeight: 500 }}>{s.segment}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono, monospace)" }}>{s.count}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono, monospace)" }}>PKR {s.revenue}</td>
                  <td style={{ padding: "12px", color: "var(--color-text-secondary)" }}>{s.avgStay}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 10, fontSize: 12, fontWeight: 500, background: s.satisfaction >= 8.5 ? "rgba(52,211,153,0.12)" : s.satisfaction >= 8 ? "rgba(59,130,246,0.12)" : "rgba(245,158,11,0.12)", color: s.satisfaction >= 8.5 ? COLORS.emerald.accent : s.satisfaction >= 8 ? COLORS.blue.accent : COLORS.amber.accent }}>{s.satisfaction}/10</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinance = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { label: "Gross margin", value: "64.2%", delta: "+2.1%", sub: "PKR 2.7M / 4.2M" },
          { label: "OpEx / seat", value: "PKR 18.4K", delta: "-3.2%", sub: "Down from 19K last quarter" },
          { label: "LTV:CAC ratio", value: "4.8x", delta: "+0.6x", sub: "Healthy — target >3x" },
        ].map((m, i) => (
          <div key={i} style={{ ...cardStyle, animation: `fadeSlide 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>{m.label}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-mono, monospace)" }}>{m.value}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 12, color: COLORS.emerald.accent, fontWeight: 500 }}>{m.delta}</span>
              <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "members": return renderMembers();
      case "finance": return renderFinance();
      default: return (
        <div style={{ ...cardStyle, textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>◎</div>
          <div style={{ fontSize: 15, color: "var(--color-text-primary)", fontWeight: 500, marginBottom: 6 }}>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>This module is ready for data connection</div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--font-sans, system-ui)", background: "var(--color-background-tertiary)" }}>
      <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--color-border-secondary); border-radius: 2px; }
      `}</style>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 220 : 56, transition: "width 0.3s ease",
        background: "var(--color-background-secondary)", borderRight: "1px solid var(--color-border-tertiary)",
        display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.emerald.accent}, ${COLORS.emerald.muted})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 700, flexShrink: 0 }}>M</div>
          {sidebarOpen && <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Meridian</span>}
        </div>

        {/* Client label */}
        {sidebarOpen && (
          <div style={{ padding: "0 16px 16px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Workspace</div>
            <div style={{ fontSize: 13, color: "var(--color-text-primary)", fontWeight: 500 }}>White Space — Islamabad</div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ padding: "12px 8px", flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                marginBottom: 2, transition: "all 0.15s ease", whiteSpace: "nowrap",
                background: activeTab === item.id ? "rgba(52,211,153,0.1)" : "transparent",
                color: activeTab === item.id ? COLORS.emerald.accent : "var(--color-text-secondary)",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: "center" }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 13, fontWeight: activeTab === item.id ? 500 : 400 }}>{item.label}</span>}
              {item.id === "insights" && sidebarOpen && (
                <span style={{ marginLeft: "auto", fontSize: 10, padding: "1px 6px", borderRadius: 8, background: "rgba(52,211,153,0.15)", color: COLORS.emerald.accent, fontWeight: 600 }}>4</span>
              )}
            </div>
          ))}
        </nav>

        {/* AI Chat toggle */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid var(--color-border-tertiary)" }}>
          <div
            onClick={() => setAiChatOpen(!aiChatOpen)}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer",
              background: aiChatOpen ? "rgba(52,211,153,0.15)" : "transparent",
              color: aiChatOpen ? COLORS.emerald.accent : "var(--color-text-secondary)",
              transition: "all 0.15s ease",
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: "center" }}>✦</span>
            {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500 }}>Ask Meridian</span>}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--color-border-tertiary)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--color-background-secondary)" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>Last synced: 12 minutes ago</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid var(--color-border-tertiary)", fontSize: 12, color: "var(--color-text-secondary)", cursor: "pointer", background: "var(--color-background-primary)" }}>Export ↓</div>
            <div style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, color: "#fff", cursor: "pointer", background: COLORS.emerald.accent, fontWeight: 500 }}>+ Connect data</div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: "auto", padding: 24, display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            {renderTab()}
          </div>

          {/* AI Chat panel */}
          {aiChatOpen && (
            <div style={{
              width: 340, flexShrink: 0, background: "var(--color-background-secondary)",
              border: "1px solid var(--color-border-tertiary)", borderRadius: 12,
              display: "flex", flexDirection: "column", animation: "fadeSlide 0.3s ease",
            }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: COLORS.emerald.accent, fontSize: 14 }}>✦</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>Meridian AI</span>
                <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "rgba(52,211,153,0.12)", color: COLORS.emerald.accent }}>Live</span>
              </div>
              <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    padding: "10px 14px", borderRadius: 10, fontSize: 13, lineHeight: 1.6,
                    background: msg.role === "user" ? "rgba(52,211,153,0.1)" : "var(--color-background-primary)",
                    color: "var(--color-text-primary)",
                    border: msg.role === "user" ? "1px solid rgba(52,211,153,0.2)" : "1px solid var(--color-border-tertiary)",
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "90%",
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 16px", borderTop: "1px solid var(--color-border-tertiary)" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask about your data..."
                    style={{
                      flex: 1, padding: "9px 12px", borderRadius: 8, border: "1px solid var(--color-border-tertiary)",
                      background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 13, outline: "none",
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter" && chatInput.trim()) {
                        setChatMessages(prev => [...prev, { role: "user", text: chatInput }]);
                        setChatInput("");
                        setTimeout(() => {
                          setChatMessages(prev => [...prev, { role: "assistant", text: "Looking at your data — I'll have an analysis ready in a moment. Based on current trends, your private office segment is your highest-value cohort with 14.2 month average tenure and PKR 2.4M monthly revenue from just 31 members." }]);
                        }, 1000);
                      }
                    }}
                  />
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.emerald.accent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "#fff" }}>↑</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
