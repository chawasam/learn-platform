'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Column long-division step-through (left-to-right, single-digit divisor).
// Each click reveals one quotient digit + the work for that step.
// Reports { done, step } via onStateChange — same contract as MultiplyColumn.

interface Props {
  a: number
  b: number
  readOnly?: boolean
  initialStep?: number
  onStateChange?: (s: Record<string, unknown>) => void
}

function buildDiv(a: number, b: number) {
  const digits = String(a).split('').map(Number)
  const steps: { working: number; q: number; prod: number; rem: number }[] = []
  let working = 0
  for (const d of digits) {
    working = working * 10 + d
    const q = Math.floor(working / b)
    const prod = q * b
    const rem = working - prod
    steps.push({ working, q, prod, rem })
    working = rem
  }
  return steps
}

const COLOR = '#7C3AED'
const GREEN = '#22C55E'
const CELL = '2.5rem'
const PREFIX = '3.5rem'

export default function DivideColumn({
  a, b, readOnly = false, initialStep = 0, onStateChange,
}: Props) {
  const aStr = String(a)
  const len = aStr.length
  const steps = buildDiv(a, b)

  const [rev, setRev] = useState(Math.min(initialStep, len))
  const shown = readOnly ? Math.min(initialStep, len) : rev
  const done = shown >= len

  useEffect(() => {
    onStateChange?.({ done: done ? 1 : 0, step: shown })
  }, [done, shown, onStateChange])

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="rounded-2xl bg-slate-50 px-6 py-5 border border-gray-100">
        <div style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700, fontSize: '1.875rem' }}>

          {/* Quotient row — offset by PREFIX to align above dividend digits */}
          <div style={{ display: 'flex', marginLeft: PREFIX }}>
            {steps.map((s, i) => (
              <div key={i} style={{ width: CELL, textAlign: 'center', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                  {shown > i ? (
                    <motion.span
                      key={`q${i}`}
                      initial={{ opacity: 0, y: -8, scale: 1.3 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{ color: GREEN }}
                    >{s.q}</motion.span>
                  ) : (
                    <span style={{ color: '#D1D5DB' }}>·</span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Vinculum — horizontal line above dividend */}
          <div style={{ marginLeft: PREFIX, borderTop: '2px solid #9CA3AF', marginBottom: '2px' }} />

          {/* Divisor + dividend */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: PREFIX, textAlign: 'right', paddingRight: '0.25rem', color: COLOR }}>
              {b} )
            </div>
            {aStr.split('').map((d, i) => (
              <div key={i} style={{ width: CELL, textAlign: 'center', color: '#1E3A5F' }}>{d}</div>
            ))}
          </div>
        </div>

        {/* Step work area — accumulated as quotient digits are revealed */}
        {shown > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-3 space-y-2">
            {steps.slice(0, shown).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold"
              >
                <span className="px-1.5 py-0.5 rounded text-base" style={{ background: '#EDE9FE', color: '#5B21B6' }}>
                  {s.working}
                </span>
                <span className="text-gray-400">÷ {b} =</span>
                <span style={{ color: GREEN, fontSize: '1rem', fontWeight: 700 }}>{s.q}</span>
                <span className="text-gray-300">│</span>
                <span className="text-gray-500">{s.q}×{b}={s.prod}</span>
                <span className="text-gray-300">│</span>
                {i < len - 1 ? (
                  <span style={{ color: COLOR }}>เหลือ {s.rem} → ดึง {aStr[i + 1]}</span>
                ) : (
                  <span style={{ color: s.rem === 0 ? GREEN : COLOR, fontWeight: 700 }}>
                    {s.rem === 0 ? '✓ ลงตัว' : `เศษ ${s.rem}`}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="flex gap-2">
          {!done ? (
            <button
              onClick={() => setRev(r => Math.min(len, r + 1))}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85 transition-opacity"
              style={{ background: COLOR }}
            >หารหลักถัดไป ▶</button>
          ) : (
            <button
              onClick={() => setRev(0)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >↺ เริ่มใหม่</button>
          )}
        </div>
      )}
    </div>
  )
}
