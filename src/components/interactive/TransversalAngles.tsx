'use client'
import { useState, useEffect } from 'react'

// Two parallel lines cut by a transversal. Tap "มุมแย้ง" to highlight the Z-pair
// (alternate interior angles — always EQUAL) or "มุมภายในข้างเดียวกัน" to highlight
// the C-pair (co-interior — always sum to 180°). Adjust the angle to see the
// relationship holds at ANY tilt. Reports { angle, highlight, explored } for goal gating.

type Highlight = 'none' | 'alt' | 'co'

interface Props {
  initialAngle?: number          // acute angle the transversal makes (40–75)
  mode?: Highlight               // initial highlight (for read-only recap scenes)
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const ORANGE = '#FF7A2F'   // the θ angles (alternate pair — equal)
const BLUE = '#4F80FF'     // the 180−θ angles

// marker position along the bisector of the angle between two rays from a vertex
function place(vx: number, vy: number, r1x: number, r1y: number, r2x: number, r2y: number, r: number) {
  const bx = r1x + r2x, by = r1y + r2y
  const bl = Math.hypot(bx, by) || 1
  return { x: Math.round(vx + (bx / bl) * r), y: Math.round(vy + (by / bl) * r) }
}

export default function TransversalAngles({
  initialAngle = 60, mode = 'none', readOnly = false, onStateChange,
}: Props) {
  const [angle, setAngle] = useState(Math.max(40, Math.min(75, initialAngle)))
  const [highlight, setHighlight] = useState<Highlight>(mode)
  const [explored, setExplored] = useState(mode !== 'none')

  useEffect(() => {
    onStateChange?.({ angle, highlight, explored: explored ? 1 : 0 })
  }, [angle, highlight, explored, onStateChange])

  const reveal = (h: Highlight) => { if (readOnly) return; setHighlight(h); setExplored(true) }

  // geometry (viewBox 280 x 215). Two horizontal parallels; transversal crosses
  // the top line at P1 and the bottom line at P2 (down-right).
  const topY = 62, botY = 150
  const p1x = 118, p1y = topY
  const rad = (angle * Math.PI) / 180
  const dx = Math.round(90 / Math.tan(rad))      // horizontal run between crossings
  const p2x = p1x + dx, p2y = botY
  const len = Math.hypot(dx, 90)
  const ux = dx / len, uy = 90 / len             // unit vector P1→P2 (down-right)
  const E = 50
  const tStart = { x: Math.round(p1x - ux * E), y: Math.round(p1y - uy * E) }
  const tEnd = { x: Math.round(p2x + ux * E), y: Math.round(p2y + uy * E) }

  const sup = 180 - angle
  // four interior angle markers
  const A = { ...place(p1x, p1y, 1, 0, ux, uy, 38), val: angle, color: ORANGE }   // lower-right @P1 = θ
  const B = { ...place(p1x, p1y, -1, 0, ux, uy, 38), val: sup, color: BLUE }      // lower-left  @P1 = 180−θ
  const C = { ...place(p2x, p2y, -1, 0, -ux, -uy, 38), val: angle, color: ORANGE }// upper-left  @P2 = θ
  const D = { ...place(p2x, p2y, 1, 0, -ux, -uy, 38), val: sup, color: BLUE }     // upper-right @P2 = 180−θ

  // which markers are lit per mode
  const litAlt = highlight === 'alt'   // A + C
  const litCo = highlight === 'co'     // A + D
  const isLit = (m: 'A' | 'B' | 'C' | 'D') =>
    (litAlt && (m === 'A' || m === 'C')) || (litCo && (m === 'A' || m === 'D'))

  const markers: { k: 'A' | 'B' | 'C' | 'D'; m: typeof A }[] = [
    { k: 'A', m: A }, { k: 'B', m: B }, { k: 'C', m: C }, { k: 'D', m: D },
  ]
  const pair = litAlt ? [A, C] : litCo ? [A, D] : null

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <svg viewBox="0 0 280 215" width={300} height={230}>
        {/* parallel lines */}
        <line x1={12} y1={topY} x2={268} y2={topY} stroke="#94A3B8" strokeWidth={3.5} strokeLinecap="round" />
        <line x1={12} y1={botY} x2={268} y2={botY} stroke="#94A3B8" strokeWidth={3.5} strokeLinecap="round" />
        <text x={258} y={topY - 8} textAnchor="end" fontSize={11} fill="#94A3B8">∥ ขนาน</text>

        {/* transversal */}
        <line x1={tStart.x} y1={tStart.y} x2={tEnd.x} y2={tEnd.y} stroke="#1E3A5F" strokeWidth={3} strokeLinecap="round" />

        {/* connector between the highlighted pair (the "Z" for แย้ง / "C" for ข้างเดียวกัน) */}
        {pair && (
          <line x1={pair[0].x} y1={pair[0].y} x2={pair[1].x} y2={pair[1].y}
            stroke="#22C55E" strokeWidth={2} strokeDasharray="5 4" />
        )}

        {/* angle markers */}
        {markers.map(({ k, m }) => {
          const lit = isLit(k)
          const dim = highlight !== 'none' && !lit
          return (
            <g key={k} opacity={dim ? 0.25 : 1}>
              <circle cx={m.x} cy={m.y} r={lit ? 17 : 14}
                fill={m.color + (lit ? '55' : '22')} stroke={m.color} strokeWidth={lit ? 3 : 1.5} />
              <text x={m.x} y={m.y + 4} textAnchor="middle" fontSize={lit ? 12 : 10}
                fontWeight="bold" fill={m.color}>{m.val}°</text>
            </g>
          )
        })}
      </svg>

      {/* relationship banner */}
      <div className="px-5 py-2 rounded-xl font-bold text-center text-sm min-h-[2.5rem] flex items-center"
        style={{
          background: highlight === 'none' ? '#F1F5F9' : '#F0FDF4',
          color: highlight === 'none' ? '#64748B' : '#16A34A',
        }}>
        {highlight === 'alt' && `มุมแย้ง (รูปตัว Z) เท่ากันเสมอ · ${angle}° = ${angle}°`}
        {highlight === 'co' && `มุมภายในข้างเดียวกัน รวม 180° · ${angle}° + ${sup}° = 180°`}
        {highlight === 'none' && 'เส้นตัดผ่านเส้นขนาน เกิดมุมที่สัมพันธ์กัน'}
      </div>

      {!readOnly && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => setAngle(a => Math.max(40, a - 5))}
            className="px-3 py-2 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50">− แคบ</button>
          <button onClick={() => setAngle(a => Math.min(75, a + 5))}
            className="px-3 py-2 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50">กว้าง +</button>
          <button onClick={() => reveal('alt')}
            className="px-4 py-2 rounded-xl text-white font-bold text-sm hover:opacity-85"
            style={{ background: highlight === 'alt' ? '#16A34A' : ORANGE }}>มุมแย้ง</button>
          <button onClick={() => reveal('co')}
            className="px-4 py-2 rounded-xl text-white font-bold text-sm hover:opacity-85"
            style={{ background: highlight === 'co' ? '#16A34A' : BLUE }}>มุมภายในข้างเดียวกัน</button>
        </div>
      )}
    </div>
  )
}
