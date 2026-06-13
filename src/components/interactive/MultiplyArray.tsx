'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Multiplication as an array: b rows of a candies. Kids build the array with
// +/- and SEE that a×b = repeated addition = counting fast. Reports
// { a, b, product } via onStateChange for goal gating.

interface Props {
  a?: number              // candies per row
  b?: number              // number of rows
  build?: boolean         // interactive (kids set a & b)
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const clamp = (n: number) => Math.max(1, Math.min(6, n))

export default function MultiplyArray({
  a = 1, b = 1, build = false, readOnly = false, onStateChange,
}: Props) {
  const [ra, setRa] = useState(a)
  const [rb, setRb] = useState(b)
  const interactive = build && !readOnly
  const cols = interactive ? ra : a
  const rows = interactive ? rb : b
  const product = cols * rows

  useEffect(() => {
    onStateChange?.({ a: cols, b: rows, product })
  }, [cols, rows, product, onStateChange])

  const stepper = (label: string, val: number, set: (n: number) => void, color: string) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold w-16 text-right" style={{ color }}>{label}</span>
      <button onClick={() => set(clamp(val - 1))} disabled={val <= 1} aria-label={`ลด${label}`}
        className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-colors disabled:opacity-25">−</button>
      <span className="w-6 text-center text-lg font-bold" style={{ color }}>{val}</span>
      <button onClick={() => set(clamp(val + 1))} disabled={val >= 6} aria-label={`เพิ่ม${label}`}
        className="w-7 h-7 rounded-full font-bold text-white hover:opacity-80 transition-opacity disabled:opacity-25"
        style={{ background: color }}>+</button>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      {/* the array */}
      <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-amber-50 border border-amber-100">
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className="flex gap-1.5">
            {Array.from({ length: cols }, (_, c) => (
              <motion.div
                key={`${r}-${c}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: Math.min((r * cols + c) * 0.02, 0.4), type: 'spring', stiffness: 300, damping: 18 }}
                className="w-7 h-7 rounded-full shadow-sm"
                style={{ background: '#F59E0B' }}
              />
            ))}
          </div>
        ))}
      </div>

      {interactive && (
        <div className="flex flex-col gap-2">
          {stepper('ต่อแถว', ra, setRa, '#F59E0B')}
          {stepper('จำนวนแถว', rb, setRb, '#4F80FF')}
        </div>
      )}

      {/* equation */}
      <div className="text-center">
        <p className="text-2xl font-bold" style={{ color: '#1E3A5F' }}>
          {cols} × {rows} = <span style={{ color: '#22C55E' }}>{product}</span>
        </p>
        {rows <= 6 && (
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {Array.from({ length: rows }, () => cols).join(' + ')} = {product}
          </p>
        )}
      </div>
    </div>
  )
}
