'use client'
import { useState, useEffect } from 'react'

// Parallel lines: tilt line 2 and SEE that only at 0° tilt do the lines stay an
// equal distance apart and never meet (ขนาน). Any tilt → they cross (ตัดกัน).
// Reports { angle, parallel } for goal gating.

interface Props {
  readOnly?: boolean
  initialAngle?: number
  onStateChange?: (state: Record<string, unknown>) => void
}

export default function ParallelLines({ readOnly = false, initialAngle = 18, onStateChange }: Props) {
  const [angle, setAngle] = useState(initialAngle)
  const parallel = angle === 0
  useEffect(() => { onStateChange?.({ angle, parallel: parallel ? 1 : 0 }) }, [angle, parallel, onStateChange])

  const rad = (angle * Math.PI) / 180
  const dx = Math.round(Math.cos(rad) * 150)
  const dy = Math.round(Math.sin(rad) * 150)

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <svg viewBox="0 0 320 170" width={300} height={160}>
        <line x1={10} y1={55} x2={310} y2={55} stroke="#4F80FF" strokeWidth={4} strokeLinecap="round" />
        <line x1={160 - dx} y1={115 - dy} x2={160 + dx} y2={115 + dy} stroke="#FF7A2F" strokeWidth={4} strokeLinecap="round" />
        {parallel && (
          <>
            <line x1={70} y1={55} x2={70} y2={115} stroke="#22C55E" strokeWidth={1.5} strokeDasharray="4 3" />
            <line x1={250} y1={55} x2={250} y2={115} stroke="#22C55E" strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={160} y={95} textAnchor="middle" fontSize={12} fill="#22C55E" fontWeight="bold">ห่างเท่ากันตลอด</text>
          </>
        )}
      </svg>
      <div className="px-5 py-2 rounded-xl font-bold text-lg"
        style={{ background: parallel ? '#F0FDF4' : '#FEF2F2', color: parallel ? '#22C55E' : '#EF4444' }}>
        {parallel ? 'ขนาน ∥ ไม่ตัดกัน' : 'ตัดกัน ✕ (ไม่ขนาน)'}
      </div>
      {!readOnly && (
        <div className="flex gap-2">
          <button onClick={() => setAngle(a => a - 6)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50">↺ เอียงซ้าย</button>
          <button onClick={() => setAngle(0)}
            className="px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-sm hover:opacity-85">ทำให้ขนาน</button>
          <button onClick={() => setAngle(a => a + 6)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50">เอียงขวา ↻</button>
        </div>
      )}
    </div>
  )
}
