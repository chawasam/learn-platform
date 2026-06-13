'use client'
import { useState, useEffect } from 'react'

// Circle radius vs diameter: change the radius and SEE the diameter is always
// twice it (d = 2r) — the diameter passes through the centre. Reports { r }.

interface Props {
  initialR?: number
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const clamp = (n: number) => Math.max(1, Math.min(6, n))

export default function CircleRadius({ initialR = 3, readOnly = false, onStateChange }: Props) {
  const [r, setR] = useState(initialR)
  useEffect(() => { onStateChange?.({ r }) }, [r, onStateChange])

  const cx = 120, cy = 100
  const px = r * 14 // units → pixels

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <svg viewBox="0 0 240 200" width={250} height={205}>
        <circle cx={cx} cy={cy} r={px} fill="#A855F718" stroke="#A855F7" strokeWidth={3} />
        {/* diameter through centre */}
        <line x1={cx - px} y1={cy} x2={cx + px} y2={cy} stroke="#3B82F6" strokeWidth={2.5} />
        {/* radius */}
        <line x1={cx} y1={cy} x2={cx + px} y2={cy} stroke="#EF4444" strokeWidth={3.5} />
        <circle cx={cx} cy={cy} r={4} fill="#1E3A5F" />
        <text x={cx + px / 2} y={cy - 8} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#EF4444">r = {r}</text>
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#3B82F6">d = {2 * r}</text>
      </svg>
      <div className="text-center">
        <p className="text-lg font-bold" style={{ color: '#1E3A5F' }}>
          รัศมี r = {r} · เส้นผ่านศูนย์กลาง d = 2 × {r} = <span style={{ color: '#3B82F6' }}>{2 * r}</span>
        </p>
      </div>
      {!readOnly && (
        <div className="flex items-center gap-3">
          <button onClick={() => setR(v => clamp(v - 1))} disabled={r <= 1}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 disabled:opacity-25">−</button>
          <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>ปรับรัศมี</span>
          <button onClick={() => setR(v => clamp(v + 1))} disabled={r >= 6}
            className="w-9 h-9 rounded-full text-white font-bold hover:opacity-80 disabled:opacity-25" style={{ background: '#A855F7' }}>+</button>
        </div>
      )}
    </div>
  )
}
