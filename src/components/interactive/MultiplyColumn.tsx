'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Column multiply (top × single-digit) — reveals result one place at a time.
// Carry from each column floats above the next, same visual language as AddSubCarry.
// Reports { done, step } via onStateChange.

interface Props {
  a: number
  b: number
  readOnly?: boolean
  initialStep?: number
  onStateChange?: (state: Record<string, unknown>) => void
}

function digitsOf(n: number, len: number): number[] {
  const s = String(n)
  return Array.from({ length: len }, (_, i) => Number(s[s.length - 1 - i] ?? 0))
}

function buildMul(A: number[], b: number, len: number) {
  const steps: { res: number; carryOut: number }[] = []
  let carry = 0
  for (let i = 0; i < len; i++) {
    const prod = A[i] * b + carry
    carry = Math.floor(prod / 10)
    steps.push({ res: prod % 10, carryOut: carry })
  }
  return { steps, finalCarry: carry }
}

const COLOR = '#7C3AED'

export default function MultiplyColumn({
  a, b, readOnly = false, initialStep = 0, onStateChange,
}: Props) {
  const len = String(a).length
  const A = digitsOf(a, len)
  const { steps, finalCarry } = buildMul(A, b, len)
  const totalCols = finalCarry > 0 ? len + 1 : len

  const [rev, setRev] = useState(Math.min(initialStep, totalCols))
  const shown = readOnly ? Math.min(initialStep, totalCols) : rev
  const done = shown >= totalCols

  useEffect(() => {
    onStateChange?.({ done: done ? 1 : 0, step: shown })
  }, [done, shown, onStateChange])

  // cols: place-value indices rendered left→right (highest first)
  const cols = Array.from({ length: totalCols }, (_, d) => totalCols - 1 - d)

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="rounded-2xl bg-slate-50 px-5 py-4 border border-gray-100">
        <div className="flex gap-1.5 font-bold text-3xl" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {cols.map((c) => {
            // carry from computing column c-1 appears above column c
            const carryVal = c > 0 && c < len ? steps[c - 1].carryOut : 0
            const showCarry = carryVal > 0 && shown > c - 1

            return (
              <div key={c} className="flex flex-col items-center w-10">
                {/* carry (ตัวทด) marker */}
                <div className="h-6 flex items-end justify-center">
                  <AnimatePresence>
                    {showCarry && (
                      <motion.span
                        key={`carry-${c}`}
                        initial={{ opacity: 0, y: 10, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="text-sm font-bold"
                        style={{ color: COLOR }}
                      >{carryVal}</motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {/* top number (A) — blank for the extra leading-carry column */}
                <span style={{ color: '#1E3A5F' }}>
                  {c < len ? A[c] : ''}
                </span>
                {/* multiplier row — b lives in ones column only; × sign to its left */}
                <span className="relative" style={{ color: '#1E3A5F' }}>
                  {c === 0 && (
                    <span className="absolute -left-5" style={{ color: COLOR }}>×</span>
                  )}
                  {c === 0 ? b : ''}
                </span>
                {/* divider */}
                <div className="w-full h-0.5 bg-gray-400 my-1" />
                {/* result digit, revealed step by step */}
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {shown > c ? (
                      <motion.span
                        key={`r-${c}`}
                        initial={{ opacity: 0, y: -8, scale: 1.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        style={{ color: '#22C55E' }}
                      >
                        {c < len ? steps[c].res : finalCarry}
                      </motion.span>
                    ) : (
                      <span className="text-gray-200">·</span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!readOnly && (
        <div className="flex gap-2">
          {!done ? (
            <button
              onClick={() => setRev(r => Math.min(totalCols, r + 1))}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85 transition-opacity"
              style={{ background: COLOR }}
            >
              คูณหลักถัดไป ▶
            </button>
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
