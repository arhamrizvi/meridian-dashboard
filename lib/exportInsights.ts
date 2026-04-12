import { AI_INSIGHTS, BRANCHES, KPI_METRICS } from './mockData'

const COMPANY = 'White Space — Saudi Arabia'
const REPORT_DATE = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/* ─── PDF ─────────────────────────────────────────────────────────────── */
export async function exportInsightsPDF() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const W = 210
  const MARGIN = 18
  const COL = W - MARGIN * 2
  let y = 0

  const hex = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16)
    const g = parseInt(h.slice(3, 5), 16)
    const b = parseInt(h.slice(5, 7), 16)
    return [r, g, b] as [number, number, number]
  }

  const pageBreakCheck = (needed = 20) => {
    if (y + needed > 270) {
      doc.addPage()
      y = MARGIN
    }
  }

  // ── Cover header
  doc.setFillColor(...hex('#0D1210'))
  doc.rect(0, 0, W, 42, 'F')
  doc.setFillColor(...hex('#34D399'))
  doc.rect(0, 42, W, 1, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(240, 253, 244)
  doc.text('Meridian AI Insights', MARGIN, 20)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(156, 163, 175)
  doc.text(COMPANY, MARGIN, 29)
  doc.text(`Generated ${REPORT_DATE}`, MARGIN, 36)

  y = 54

  // ── KPI summary row
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(240, 253, 244)
  doc.text('Portfolio Snapshot', MARGIN, y)
  y += 6

  const kpiColW = COL / 4
  KPI_METRICS.forEach((k, i) => {
    const x = MARGIN + i * kpiColW
    doc.setFillColor(17, 24, 20)
    doc.roundedRect(x, y, kpiColW - 2, 22, 2, 2, 'F')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(107, 114, 128)
    doc.text(k.label.toUpperCase(), x + 4, y + 7)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(240, 253, 244)
    doc.text(k.value, x + 4, y + 15)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...hex('#34D399'))
    doc.text(k.delta, x + 4, y + 20)
  })
  y += 30

  // ── Section: Insights
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(240, 253, 244)
  doc.text('AI-Generated Insights', MARGIN, y)
  y += 2
  doc.setDrawColor(...hex('#34D399'))
  doc.setLineWidth(0.4)
  doc.line(MARGIN, y + 1, MARGIN + 60, y + 1)
  y += 7

  const TYPE_COLOR: Record<string, string> = {
    opportunity: '#059669',
    risk:        '#DC2626',
    efficiency:  '#3B82F6',
    growth:      '#8B5CF6',
  }
  const TYPE_LABEL: Record<string, string> = {
    opportunity: 'OPPORTUNITY',
    risk:        'RISK',
    efficiency:  'EFFICIENCY',
    growth:      'GROWTH',
  }

  AI_INSIGHTS.forEach((ins) => {
    const cardH = 36
    pageBreakCheck(cardH + 4)

    const col = TYPE_COLOR[ins.type]
    const [cr, cg, cb] = hex(col)

    // card background
    doc.setFillColor(17, 24, 20)
    doc.roundedRect(MARGIN, y, COL, cardH, 2, 2, 'F')
    // left accent bar
    doc.setFillColor(cr, cg, cb)
    doc.rect(MARGIN, y, 2.5, cardH, 'F')

    // type tag
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(cr, cg, cb)
    doc.text(TYPE_LABEL[ins.type], MARGIN + 6, y + 7)

    // priority badge
    if (ins.priority === 'high') {
      doc.setFillColor(239, 68, 68, 0.15)
      doc.setTextColor(239, 68, 68)
      doc.setFontSize(6.5)
      doc.text('HIGH PRIORITY', W - MARGIN - 24, y + 7)
    } else if (ins.priority === 'medium') {
      doc.setTextColor(245, 158, 11)
      doc.setFontSize(6.5)
      doc.text('MEDIUM', W - MARGIN - 14, y + 7)
    }

    // title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(240, 253, 244)
    doc.text(ins.title, MARGIN + 6, y + 15)

    // body — wrap text
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(156, 163, 175)
    const lines = doc.splitTextToSize(ins.body, COL - 12)
    doc.text(lines.slice(0, 2), MARGIN + 6, y + 22)

    // action
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...hex('#34D399'))
    doc.text(`→ ${ins.action}`, MARGIN + 6, y + 33)

    y += cardH + 4
  })

  // ── Branch table
  pageBreakCheck(50)
  y += 4
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(240, 253, 244)
  doc.text('Branch Performance Summary', MARGIN, y)
  y += 7

  const cols = ['Branch', 'City', 'Units', 'Occupied', 'Occ. %', 'Revenue (SAR)']
  const colW = [46, 28, 18, 22, 18, 42]
  let cx = MARGIN

  // header row
  doc.setFillColor(17, 24, 20)
  doc.rect(MARGIN, y, COL, 8, 'F')
  cols.forEach((h, i) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(107, 114, 128)
    doc.text(h, cx + 2, y + 5.5)
    cx += colW[i]
  })
  y += 8

  BRANCHES.forEach((b, ri) => {
    const occ = Math.round((b.occupied / b.units) * 100)
    const row = [b.name, b.city, String(b.units), String(b.occupied), `${occ}%`, b.revenue.toLocaleString()]
    cx = MARGIN
    if (ri % 2 === 0) {
      doc.setFillColor(14, 20, 16)
      doc.rect(MARGIN, y, COL, 7, 'F')
    }
    row.forEach((cell, i) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(i === 0 ? 240 : 156, i === 0 ? 253 : 163, i === 0 ? 244 : 175)
      doc.text(cell, cx + 2, y + 5)
      cx += colW[i]
    })
    y += 7
  })

  // ── Footer
  const pages = doc.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(75, 85, 99)
    doc.text(`Meridian · ${COMPANY} · ${REPORT_DATE}`, MARGIN, 290)
    doc.text(`${p} / ${pages}`, W - MARGIN, 290, { align: 'right' })
  }

  doc.save(`Meridian_AI_Insights_${new Date().toISOString().slice(0, 10)}.pdf`)
}

/* ─── PPTX ────────────────────────────────────────────────────────────── */
export async function exportInsightsPPTX() {
  const pptxgen = (await import('pptxgenjs')).default
  const prs = new pptxgen()

  prs.layout = 'LAYOUT_WIDE'
  prs.title = 'Meridian AI Insights'
  prs.author = 'Meridian'

  const BG = '0D1210'
  const CARD_BG = '111814'
  const ACCENT_HEX = '34D399'
  const TEXT_PRI = 'F0FDF4'
  const TEXT_SEC = '9CA3AF'
  const TEXT_TER = '6B7280'

  const TYPE_COLOR: Record<string, string> = {
    opportunity: '059669',
    risk:        'DC2626',
    efficiency:  '3B82F6',
    growth:      '8B5CF6',
  }
  const TYPE_LABEL: Record<string, string> = {
    opportunity: 'OPPORTUNITY',
    risk:        'RISK',
    efficiency:  'EFFICIENCY',
    growth:      'GROWTH',
  }

  // ── Slide 1: Cover
  {
    const s = prs.addSlide()
    s.background = { color: BG }
    s.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.06, fill: { color: ACCENT_HEX } })
    s.addText('Meridian', { x: 0.5, y: 1.2, w: 12, h: 0.7, fontSize: 48, bold: true, color: TEXT_PRI, fontFace: 'Helvetica Neue' })
    s.addText('AI Insights Report', { x: 0.5, y: 1.9, w: 12, h: 0.5, fontSize: 28, color: ACCENT_HEX, fontFace: 'Helvetica Neue' })
    s.addText(COMPANY, { x: 0.5, y: 2.55, w: 12, h: 0.35, fontSize: 14, color: TEXT_SEC })
    s.addText(`Generated ${REPORT_DATE}`, { x: 0.5, y: 2.9, w: 12, h: 0.3, fontSize: 12, color: TEXT_TER })

    // KPI boxes
    KPI_METRICS.forEach((k, i) => {
      const x = 0.5 + i * 3.2
      s.addShape(prs.ShapeType.roundRect, { x, y: 4.0, w: 3.0, h: 1.5, fill: { color: CARD_BG }, line: { color: '1F2937', width: 0.5 }, rectRadius: 0.1 })
      s.addText(k.label.toUpperCase(), { x, y: 4.1, w: 3.0, h: 0.3, fontSize: 7, color: TEXT_TER, align: 'center' })
      s.addText(k.value, { x, y: 4.45, w: 3.0, h: 0.5, fontSize: 22, bold: true, color: TEXT_PRI, align: 'center', fontFace: 'Courier New' })
      s.addText(k.delta, { x, y: 4.95, w: 3.0, h: 0.3, fontSize: 10, color: ACCENT_HEX, align: 'center' })
    })
  }

  // ── Slides 2–7: One insight per slide
  AI_INSIGHTS.forEach((ins, i) => {
    const s = prs.addSlide()
    s.background = { color: BG }

    const col = TYPE_COLOR[ins.type]

    // accent bar top
    s.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.06, fill: { color: col } })

    // slide number / label
    s.addText(`${i + 1} / ${AI_INSIGHTS.length}  ·  ${TYPE_LABEL[ins.type]}`, {
      x: 0.5, y: 0.2, w: 5, h: 0.3, fontSize: 9, color: col, bold: true,
    })

    // priority badge
    if (ins.priority !== 'low') {
      const badgeColor = ins.priority === 'high' ? 'EF4444' : 'F59E0B'
      const badgeText = ins.priority === 'high' ? 'HIGH PRIORITY' : 'MEDIUM'
      s.addShape(prs.ShapeType.roundRect, { x: 11, y: 0.18, w: 1.8, h: 0.34, fill: { color: badgeColor, transparency: 80 }, rectRadius: 0.1 })
      s.addText(badgeText, { x: 11, y: 0.18, w: 1.8, h: 0.34, fontSize: 8, color: badgeColor, bold: true, align: 'center' })
    }

    // type icon circle
    s.addShape(prs.ShapeType.ellipse, { x: 0.5, y: 0.8, w: 0.55, h: 0.55, fill: { color: col, transparency: 85 } })
    const icons: Record<string, string> = { opportunity: '↗', risk: '⚠', efficiency: '⚡', growth: '◆' }
    s.addText(icons[ins.type], { x: 0.5, y: 0.78, w: 0.55, h: 0.58, fontSize: 16, color: col, align: 'center' })

    // title
    s.addText(ins.title, { x: 1.3, y: 0.75, w: 11.2, h: 0.7, fontSize: 22, bold: true, color: TEXT_PRI, fontFace: 'Helvetica Neue' })

    // divider
    s.addShape(prs.ShapeType.rect, { x: 0.5, y: 1.65, w: 12, h: 0.02, fill: { color: '1F2937' } })

    // body card
    s.addShape(prs.ShapeType.roundRect, { x: 0.5, y: 1.85, w: 12, h: 2.2, fill: { color: CARD_BG }, line: { color: '1F2937', width: 0.5 }, rectRadius: 0.12 })
    s.addText(ins.body, { x: 0.75, y: 1.95, w: 11.5, h: 1.9, fontSize: 13, color: TEXT_SEC, wrap: true, valign: 'top' })

    // action button
    s.addShape(prs.ShapeType.roundRect, { x: 0.5, y: 4.3, w: 2.4, h: 0.5, fill: { color: ACCENT_HEX, transparency: 85 }, line: { color: ACCENT_HEX, width: 0.5 }, rectRadius: 0.08 })
    s.addText(`→  ${ins.action}`, { x: 0.5, y: 4.3, w: 2.4, h: 0.5, fontSize: 11, bold: true, color: ACCENT_HEX, align: 'center' })
  })

  // ── Slide: Branch table
  {
    const s = prs.addSlide()
    s.background = { color: BG }
    s.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.06, fill: { color: ACCENT_HEX } })
    s.addText('Branch Performance', { x: 0.5, y: 0.25, w: 12, h: 0.5, fontSize: 24, bold: true, color: TEXT_PRI })

    const rows = BRANCHES.map(b => [
      b.name, b.city,
      `${Math.round((b.occupied / b.units) * 100)}%`,
      `SAR ${b.revenue.toLocaleString()}`,
    ])
    s.addTable(
      [
        [
          { text: 'Branch',    options: { bold: true, color: TEXT_TER, fontSize: 9 } },
          { text: 'City',      options: { bold: true, color: TEXT_TER, fontSize: 9 } },
          { text: 'Occupancy', options: { bold: true, color: TEXT_TER, fontSize: 9 } },
          { text: 'Revenue',   options: { bold: true, color: TEXT_TER, fontSize: 9 } },
        ],
        ...rows.map(r => r.map(cell => ({ text: cell, options: { color: TEXT_PRI, fontSize: 11 } }))),
      ],
      {
        x: 0.5, y: 0.95, w: 12, h: 4.2,
        fill: { color: CARD_BG },
        border: { type: 'solid', color: '1F2937', pt: 0.5 },
        rowH: 0.5,
      }
    )
  }

  prs.writeFile({ fileName: `Meridian_AI_Insights_${new Date().toISOString().slice(0, 10)}.pptx` })
}
