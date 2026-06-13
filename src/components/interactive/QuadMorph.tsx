'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Quadrilateral morph: tap a type and watch the same 4-sided shape change between
// square / rectangle / parallelogram / rhombus — kids see how sides & angles
// define each. Reports { shape } for goal gating.

interface Props {
  shape?: string
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const SHAPES: Record<string, { pts: number[][]; name: string; note: string }> = {
  square:        { pts: [[60, 30], [180, 30], [180, 150], [60, 150]], name: 'จัตุรัส', note: '4 ด้านเท่ากัน · 4 มุมฉาก' },
  rectangle:     { pts: [[35, 45], [205, 45], [205, 135], [35, 135]], name: 'ผืนผ้า', note: 'ด้านตรงข้ามเท่ากัน · 4 มุมฉาก' },
  parallelogram: { pts: [[60, 45], [215, 45], [180, 135], [25, 135]], name: 'ด้านขนาน', note: 'ด้านตรงข้ามขนาน · มุมเอียง' },
  rhombus:       { pts: [[120, 30], [200, 90], [120, 150], [40, 90]], name: 'ขนมเปียกปูน', note: '4 ด้านเท่ากัน · มุมไม่ฉาก' },
}
const ORDER = ['square', 'rectangle', 'parallelogram', 'rhombus']

export default function QuadMorph({ shape = 'square', readOnly = false, onStateChange }: Props) {
  const [cur, setCur] = useState(shape)
  useEffect(() => { onStateChange?.({ shape: cur }) }, [cur, onStateChange])
  const def = SHAPES[cur]

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <svg viewBox="0 0 240 180" width={250} height={185}>
        <motion.polygon
          points={def.pts.map(p => p.join(',')).join(' ')}
          animate={{ points: def.pts.map(p => p.join(',')).join(' ') }}
          fill="#4F80FF18" stroke="#4F80FF" strokeWidth={3} strokeLinejoin="round"
        />
      </svg>
      <p className="text-lg font-bold" style={{ color: '#1E3A5F' }}>{def.name}</p>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>{def.note}</p>
      {!readOnly && (
        <div className="flex gap-2 flex-wrap justify-center">
          {ORDER.map(s => (
            <button key={s} onClick={() => setCur(s)}
              className="px-3 py-2 rounded-xl font-semibold text-sm transition-colors"
              style={{
                background: cur === s ? '#4F80FF' : 'white',
                color: cur === s ? 'white' : '#4F80FF',
                border: '2px solid #4F80FF',
              }}>
              {SHAPES[s].name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
