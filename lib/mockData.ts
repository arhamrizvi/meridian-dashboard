// White Space — Saudi Arabia mock data (7 branches, ~400 units, ~40 tenants, SAR)

export const BRANCHES = [
  { id: "ruh-hq",  name: "Riyadh HQ",             city: "Riyadh",    units: 80, occupied: 66, tenants: 8,  revenue: 312000 },
  { id: "kafd",    name: "KAFD Tower",             city: "Riyadh",    units: 70, occupied: 58, tenants: 7,  revenue: 278000 },
  { id: "jed-1",   name: "Jeddah Central",         city: "Jeddah",    units: 60, occupied: 47, tenants: 6,  revenue: 215000 },
  { id: "mak-rd",  name: "Makkah Road",            city: "Riyadh",    units: 52, occupied: 40, tenants: 5,  revenue: 186000 },
  { id: "dmm-1",   name: "Dammam Business Hub",    city: "Dammam",    units: 55, occupied: 41, tenants: 5,  revenue: 174000 },
  { id: "kaust",   name: "KAUST Innovation Hub",   city: "Thuwal",    units: 45, occupied: 36, tenants: 4,  revenue: 148000 },
  { id: "akh-1",   name: "Al Khobar Plaza",        city: "Al Khobar", units: 40, occupied: 30, tenants: 5,  revenue: 127000 },
];

export const TOTAL_UNITS    = BRANCHES.reduce((s, b) => s + b.units, 0);       // 402
export const TOTAL_OCCUPIED = BRANCHES.reduce((s, b) => s + b.occupied, 0);    // 318
export const TOTAL_TENANTS  = BRANCHES.reduce((s, b) => s + b.tenants, 0);     // 40
export const TOTAL_REVENUE  = BRANCHES.reduce((s, b) => s + b.revenue, 0);     // 1,440,000

export const KPI_METRICS = [
  {
    label: "Occupancy rate",
    value: "79.1%",
    delta: "+4.3%",
    trend: "up" as const,
    sparkline: [64, 67, 70, 72, 73, 76, 78, 79],
  },
  {
    label: "Monthly revenue",
    value: "SAR 1.44M",
    delta: "+11.8%",
    trend: "up" as const,
    sparkline: [980, 1050, 1120, 1170, 1210, 1270, 1360, 1440],
  },
  {
    label: "Active tenants",
    value: "40",
    delta: "+5",
    trend: "up" as const,
    sparkline: [28, 30, 32, 34, 35, 37, 38, 40],
  },
  {
    label: "Churn rate",
    value: "2.8%",
    delta: "-0.7%",
    trend: "down" as const,
    sparkline: [5.1, 4.7, 4.3, 4.0, 3.7, 3.4, 3.1, 2.8],
  },
];

export const REVENUE_DATA = [
  { month: "Sep", desk: 720, meeting: 110, events: 80 },
  { month: "Oct", desk: 780, meeting: 120, events: 90 },
  { month: "Nov", desk: 820, meeting: 135, events: 110 },
  { month: "Dec", desk: 800, meeting: 125, events: 120 },
  { month: "Jan", desk: 860, meeting: 140, events: 105 },
  { month: "Feb", desk: 920, meeting: 155, events: 115 },
  { month: "Mar", desk: 980, meeting: 165, events: 125 },
  { month: "Apr", desk: 1040, meeting: 175, events: 135 },
];

export const SPACE_UTIL = [
  { name: "Hot desks",       capacity: 180, used: 148, color: "#34D399" },
  { name: "Private offices", capacity: 112, used:  95, color: "#F59E0B" },
  { name: "Meeting rooms",   capacity:  62, used:  48, color: "#3B82F6" },
  { name: "Event space",     capacity:  48, used:  27, color: "#A78BFA" },
];

export const AI_INSIGHTS = [
  {
    type: "opportunity",
    title: "Revenue opportunity: Thu–Fri meeting rooms",
    body: "Meeting room utilisation drops to 28% on Thu–Fri across all branches. A 'Focus Day' bundle at 35% discount could recover ~SAR 95K/month in lost capacity.",
    priority: "high",
    action: "Create bundle",
  },
  {
    type: "risk",
    title: "Churn risk — 9 tenants flagged",
    body: "9 tenants haven't badged in for 18+ days. Historically, 71% of tenants inactive >21 days cancel within 45 days. Proactive outreach could protect ~SAR 290K ARR.",
    priority: "high",
    action: "View at-risk list",
  },
  {
    type: "efficiency",
    title: "HVAC savings — KAFD Tower east wing",
    body: "East wing averages 1.8 occupants after 6 PM but runs full climate control until 10 PM. Standby mode after 7 PM would save ~SAR 32K/month across all branches.",
    priority: "medium",
    action: "Adjust schedule",
  },
  {
    type: "growth",
    title: "Expansion signal: private-office waitlist up 41%",
    body: "Private-office waitlist grew 41% in 10 weeks (now 22 companies). Avg wait: 53 days. Demand supports a 12–18% rate increase or a second floor at Riyadh HQ.",
    priority: "medium",
    action: "View waitlist",
  },
  {
    type: "opportunity",
    title: "KAUST partnership — student flex passes",
    body: "KAUST Innovation Hub sits at 80% occupancy yet only 4 tenants. Opening 15 flex-desk passes to KAUST students at SAR 1,200/mo could add ~SAR 18K/month with zero fit-out cost.",
    priority: "medium",
    action: "Draft proposal",
  },
  {
    type: "growth",
    title: "Jeddah Central underperforming vs. peers",
    body: "Jeddah Central occupancy (78%) is 5 pp below network average despite lowest OpEx/seat. A refresh of the shared lounge and a LinkedIn campaign targeting Jeddah SMEs could close the gap.",
    priority: "low",
    action: "View analysis",
  },
];

export const MEMBER_SEGMENTS = [
  { segment: "Freelancers",    count:  8, revenue: "SAR 112K", avgStay: "3.8 mo", satisfaction: 8.2 },
  { segment: "Startups (2–5)", count: 14, revenue: "SAR 384K", avgStay: "8.6 mo", satisfaction: 8.7 },
  { segment: "SMEs (6–15)",    count: 12, revenue: "SAR 560K", avgStay: "13.1 mo", satisfaction: 8.0 },
  { segment: "Enterprise",     count:  6, revenue: "SAR 384K", avgStay: "19.4 mo", satisfaction: 8.4 },
];

export const FINANCE_METRICS = [
  { label: "Gross margin",   value: "62.4%", delta: "+1.9%",  sub: "SAR 899K / SAR 1.44M" },
  { label: "OpEx / seat",    value: "SAR 1,620", delta: "-4.1%",  sub: "Down from SAR 1,690 last quarter" },
  { label: "LTV:CAC ratio",  value: "5.1x",  delta: "+0.8x",  sub: "Healthy — target >3x" },
];

export const PNL_ROWS = [
  { label: "Gross Revenue",          value: 1440000, type: "revenue"  },
  { label: "  Desk & Office Rent",   value:  987000, type: "sub"      },
  { label: "  Meeting Rooms",        value:  307000, type: "sub"      },
  { label: "  Events & Other",       value:  146000, type: "sub"      },
  { label: "COGS",                   value:  542000, type: "cost"     },
  { label: "  Facilities & Ops",     value:  320000, type: "sub"      },
  { label: "  Utilities",            value:  148000, type: "sub"      },
  { label: "  Cleaning & Security",  value:   74000, type: "sub"      },
  { label: "Gross Profit",           value:  898000, type: "profit"   },
  { label: "Operating Expenses",     value:  412000, type: "cost"     },
  { label: "  Salaries",             value:  248000, type: "sub"      },
  { label: "  Marketing",            value:   82000, type: "sub"      },
  { label: "  Admin & Tech",         value:   82000, type: "sub"      },
  { label: "EBITDA",                 value:  486000, type: "ebitda"   },
];

// Summary for Claude system prompt
export const MOCK_SUMMARY = `White Space operates 7 coworking branches in Saudi Arabia (Riyadh HQ, KAFD Tower, Jeddah Central, Makkah Road, Dammam Business Hub, KAUST Innovation Hub, Al Khobar Plaza). Total: 402 units, 318 occupied (79.1%), 40 active tenants. Monthly revenue: SAR 1,440,000. Gross margin: 62.4%. EBITDA: SAR 486,000. Churn: 2.8%. Member mix: 8 freelancers, 14 startups, 12 SMEs, 6 enterprise. Top AI flags: (1) Thu–Fri meeting room underutilisation (~SAR 95K recovery opportunity), (2) 9 at-risk tenants (~SAR 290K ARR at risk), (3) HVAC savings ~SAR 32K/month, (4) Private-office waitlist up 41% (22 companies, 53-day wait).`;
