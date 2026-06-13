'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Division as fair sharing: deal candies one round at a time (one per plate),
// so every plate stays equal and the leftover that can't fill a full round
// becomes the remainder (เศษ). Reports { perPlate, remainder, done }.

interface Props {
  total?: number
  plates?: number
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const Candy = ({ d = 0 }: { d?: number }) => (
  <motion.div
    initial={{ scale: 0 }} animate={{ scale: 1 }}
    transition={{ delay: d, type: 'spring', stiffness: 320, damping: 18 }}
    className="w-3.5 h-3.5 rounded-full" style={{ background: '#EF4444' }}
  />
)

export default function DivideShare({
  total = 12, plates = 3, readOnly = false, onStateChange,
}: Props) {
  const maxRounds = Math.floor(total / plates)
  const [rounds, setRounds] = useState(readOnly ? maxRounds : 0)
  const remaining = total - rounds * plates
  const done = remaining < plates // can't deal another full round

  useEffect(() => {
    onStateChange?.({ perPlate: rounds, remainder: remaining, done: done ? 1 : 0 })
  }, [rounds, remaining, done, onStateChange])

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      {/* leftover pile */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>กองรวม (เหลือ {remaining})</span>
        <div className="flex flex-wrap gap-1 justify-center max-w-64 min-h-5">
          {Array.from({ length: remaining }, (_, i) => <Candy key={i} />)}
        </div>
      </div>

      {/* plates */}
      <div className="flex gap-2 justify-center flex-wrap">
        {Array.from({ length: plates }, (_, p) => (
          <div key={p} className="flex flex-col items-center gap-1">
            <div className="w-16 min-h-16 rounded-2xl bg-slate-100 border-2 border-slate-300 p-1.5 flex flex-wrap gap-1 content-start justify-center">
              {Array.from({ length: rounds }, (_, i) => <Candy key={i} d={i * 0.04} />)}
            </div>
            <span className="text-[11px]" style={{ color: 'var(--muted)' }}>จาน {p + 1}</span>
          </div>
        ))}
      </div>

      {/* equation / progress */}
      <div className="text-center">
        {done ? (
          <p className="text-xl font-bold" style={{ color: '#1E3A5F' }}>
            {total} ÷ {plates} = <span style={{ color: '#22C55E' }}>{maxRounds}</span>
            {remaining > 0 && <span style={{ color: '#EF4444' }}> เศษ {remaining}</span>}
          </p>
        ) : (
          <p className="text-sm" style={{ color: 'var(--muted)' }}>จานละ {rounds} เม็ด · เหลือ {remaining} ในกอง</p>
        )}
      </div>

      {!readOnly && (
        <div className="flex gap-2">
          {!done ? (
            <button onClick={() => setRounds(r => r + 1)}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85 transition-opacity"
              style={{ background: '#EF4444' }}>
              แจกอีก 1 รอบ (จานละ 1) ▶
            </button>
          ) : (
            <button onClick={() => setRounds(0)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors">
              ↺ เริ่มใหม่
            </button>
          )}
        </div>
      )}
    </div>
  )
}
