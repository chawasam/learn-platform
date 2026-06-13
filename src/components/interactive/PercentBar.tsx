'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Percent as a 100-square grid: set the percent and SEE that many squares fill,
// then read off what it is of a total. Reports { percent } for goal gating.

interface Props {
  initialPercent?: number
  total?: number
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const clamp = (n: number) => Math.max(0, Math.min(100, n))

export default function PercentBar({ initialPercent = 20, total = 500, readOnly = false, onStateChange }: Props) {
  const [percent, setPercent] = useState(initialPercent)
  useEffect(() => { onStateChange?.({ percent }) }, [percent, onStateChange])
  const value = (percent / 100) * total

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(10, 1fr)', width: 220 }}>
        {Array.from({ length: 100 }, (_, i) => (
          <motion.div key={i}
            animate={{ background: i < percent ? '#A855F7' : '#EDE9FE' }}
            className="aspect-square rounded-sm" />
        ))}
      </div>
      <p className="text-xl font-bold" style={{ color: '#1E3A5F' }}>
        {percent}% ของ {total} = <span style={{ color: '#A855F7' }}>{value % 1 === 0 ? value : value.toFixed(1)}</span>
      </p>
      {!readOnly && (
        <div className="flex items-center gap-3">
          <button onClick={() => setPercent(p => clamp(p - 10))} disabled={percent <= 0}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 disabled:opacity-25">−10</button>
          <span className="text-sm font-semibold w-16 text-center" style={{ color: 'var(--muted)' }}>ปรับ %</span>
          <button onClick={() => setPercent(p => clamp(p + 10))} disabled={percent >= 100}
            className="w-9 h-9 rounded-full text-white font-bold hover:opacity-80 disabled:opacity-25" style={{ background: '#A855F7' }}>+10</button>
        </div>
      )}
    </div>
  )
}
