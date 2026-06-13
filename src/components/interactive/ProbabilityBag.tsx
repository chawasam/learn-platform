'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Probability bag: a bag of coloured balls. Drawing repeatedly builds a tally so
// kids SEE the colour with more balls comes up more often (โอกาส = สัดส่วน).
// Reports { draws } for goal gating.

interface Ball { color: string; name: string; count: number }
interface Props {
  balls?: Ball[]
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const DEFAULT: Ball[] = [
  { color: '#EF4444', name: 'แดง', count: 5 },
  { color: '#3B82F6', name: 'น้ำเงิน', count: 3 },
  { color: '#22C55E', name: 'เขียว', count: 2 },
]

export default function ProbabilityBag({ balls = DEFAULT, readOnly = false, onStateChange }: Props) {
  const total = balls.reduce((s, b) => s + b.count, 0)
  const [tally, setTally] = useState<Record<string, number>>({})
  const [last, setLast] = useState<Ball | null>(null)
  const draws = Object.values(tally).reduce((s, n) => s + n, 0)

  useEffect(() => { onStateChange?.({ draws }) }, [draws, onStateChange])

  const draw = () => {
    // weighted pick by count (runtime randomness is fine — not a workflow script)
    let r = Math.floor(Math.random() * total)
    let picked = balls[0]
    for (const b of balls) { if (r < b.count) { picked = b; break } r -= b.count }
    setLast(picked)
    setTally(t => ({ ...t, [picked.name]: (t[picked.name] ?? 0) + 1 }))
  }

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      {/* the bag */}
      <div className="flex flex-wrap gap-1.5 justify-center max-w-56 p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
        {balls.flatMap(b => Array.from({ length: b.count }, (_, i) => (
          <div key={`${b.name}-${i}`} className="w-6 h-6 rounded-full shadow-sm" style={{ background: b.color }} />
        )))}
      </div>

      {/* chance per colour */}
      <div className="flex gap-3 text-sm font-semibold">
        {balls.map(b => (
          <span key={b.name} style={{ color: b.color }}>{b.name} {b.count}/{total}</span>
        ))}
      </div>

      {last && (
        <AnimatePresence mode="wait">
          <motion.div key={draws} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-sm">
            <span style={{ color: 'var(--muted)' }}>หยิบได้:</span>
            <span className="w-5 h-5 rounded-full inline-block" style={{ background: last.color }} />
            <span className="font-bold" style={{ color: last.color }}>{last.name}</span>
          </motion.div>
        </AnimatePresence>
      )}

      {/* tally */}
      {draws > 0 && (
        <div className="flex flex-col gap-1 w-52">
          {balls.map(b => (
            <div key={b.name} className="flex items-center gap-2">
              <span className="text-xs w-12" style={{ color: b.color }}>{b.name}</span>
              <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ background: b.color, width: `${draws ? ((tally[b.name] ?? 0) / draws) * 100 : 0}%` }} />
              </div>
              <span className="text-xs w-6 text-right" style={{ color: 'var(--muted)' }}>{tally[b.name] ?? 0}</span>
            </div>
          ))}
          <p className="text-xs text-center mt-1" style={{ color: 'var(--muted)' }}>หยิบทั้งหมด {draws} ครั้ง</p>
        </div>
      )}

      {!readOnly && (
        <button onClick={draw}
          className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85" style={{ background: '#A855F7' }}>
          🎲 หยิบ 1 ลูก
        </button>
      )}
    </div>
  )
}
