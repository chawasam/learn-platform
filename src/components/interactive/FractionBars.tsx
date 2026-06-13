'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

// Fraction wall (CRA: pictorial stage) — bars of equal width stacked so equal
// fractions visibly line up (Polypad "fraction wall" pattern).
// Tap square i: fills contiguously from the left up to i+1 (tap last filled to shrink).
// Reports { r0, r1, equal } via onStateChange.

type Row = {
  parts: number
  filled?: number
  color?: string
  fixed?: boolean       // row can't be changed by tapping
}

interface Props {
  rows: Row[]
  showEquals?: boolean   // show the "=" badge + guide line when fractions match
  showLabels?: boolean
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const W = 280
const H = 46
const GAP = 4

export default function FractionBars({
  rows,
  showEquals = false,
  showLabels = true,
  readOnly = false,
  onStateChange,
}: Props) {
  const [filledArr, setFilledArr] = useState<number[]>(() => rows.map(r => r.filled ?? 0))

  const fractions = rows.map((r, i) => filledArr[i] / r.parts)
  const allEqual =
    filledArr.every(f => f > 0) &&
    fractions.every(f => Math.abs(f - fractions[0]) < 1e-9)

  useEffect(() => {
    onStateChange?.({
      r0: filledArr[0] ?? 0,
      r1: filledArr[1] ?? 0,
      equal: allEqual ? 1 : 0,
    })
  }, [filledArr, allEqual, onStateChange])

  const tap = useCallback((row: number, idx: number) => {
    if (readOnly || rows[row].fixed) return
    setFilledArr(prev => {
      const next = [...prev]
      next[row] = idx < prev[row] ? idx : idx + 1
      return next
    })
  }, [readOnly, rows])

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div className="relative flex flex-col" style={{ gap: 14 }}>
        {rows.map((row, ri) => {
          const cellW = (W - GAP * (row.parts - 1)) / row.parts
          const filled = filledArr[ri]
          const color = row.color ?? (ri === 0 ? '#8B5A2B' : '#FF7A2F')
          return (
            <div key={ri} className="flex items-center gap-3">
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
                {Array.from({ length: row.parts }, (_, i) => (
                  <motion.rect
                    key={i}
                    x={i * (cellW + GAP)}
                    y={0}
                    width={cellW}
                    height={H}
                    rx={8}
                    animate={{ fill: i < filled ? color : '#F1EAE2' }}
                    stroke="#D6C7B5"
                    strokeWidth={1.5}
                    onPointerDown={() => tap(ri, i)}
                    style={{ cursor: readOnly || row.fixed ? 'default' : 'pointer' }}
                  />
                ))}
              </svg>
              {showLabels && (
                <div className="flex flex-col items-center w-10 leading-none">
                  <span className="text-xl font-bold" style={{ color }}>{filled}</span>
                  <div className="w-6 h-0.5 bg-gray-600 my-0.5" />
                  <span className="text-xl font-bold" style={{ color: '#1E3A5F' }}>{row.parts}</span>
                </div>
              )}
            </div>
          )
        })}

        {/* Guide line at the shared filled edge when equal */}
        {showEquals && allEqual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 bottom-0 border-l-2 border-dashed border-green-500 pointer-events-none"
            style={{ left: fractions[0] * W }}
          />
        )}
      </div>

      {showEquals && (
        <motion.div
          animate={{ opacity: allEqual ? 1 : 0, scale: allEqual ? 1 : 0.8 }}
          className="px-4 py-1.5 rounded-full bg-green-100 border border-green-300 text-green-700 font-bold text-lg"
        >
          เท่ากันเลย! =
        </motion.div>
      )}
    </div>
  )
}
