'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Column add/subtract, revealed one place at a time so kids SEE the carry (ทด)
// pop up to the next column, or the borrow (ยืม) reduce the column to the left
// — borrow chains correctly through zeros (e.g. 700 − 345). Reports { done }.

interface Props {
  a: number
  b: number
  op?: '+' | '-'
  readOnly?: boolean
  initialStep?: number
  onStateChange?: (state: Record<string, unknown>) => void
}

// digits from the RIGHT: index 0 = ones
function digitsOf(n: number, len: number): number[] {
  const s = String(n)
  return Array.from({ length: len }, (_, i) => Number(s[s.length - 1 - i] ?? 0))
}

interface AddStep { res: number; carryOut: number }
interface SubStep { res: number; mods: { col: number; val: number }[] }

function buildAdd(A: number[], B: number[], len: number) {
  const steps: AddStep[] = []
  let carry = 0
  for (let i = 0; i < len; i++) {
    const s = A[i] + B[i] + carry
    carry = s >= 10 ? 1 : 0
    steps.push({ res: s % 10, carryOut: carry })
  }
  return { steps, finalCarry: carry }
}

function buildSub(A: number[], B: number[], len: number) {
  const arr = [...A]
  const steps: SubStep[] = []
  for (let i = 0; i < len; i++) {
    const mods: { col: number; val: number }[] = []
    if (arr[i] < B[i]) {
      arr[i] += 10
      mods.push({ col: i, val: arr[i] })
      let k = i + 1
      while (arr[k] === 0) { arr[k] = 9; mods.push({ col: k, val: 9 }); k++ }
      arr[k] -= 1
      mods.push({ col: k, val: arr[k] })
    }
    steps.push({ res: arr[i] - B[i], mods })
  }
  return { steps }
}

export default function AddSubCarry({
  a, b, op = '+', readOnly = false, initialStep = 0, onStateChange,
}: Props) {
  const len = Math.max(String(a).length, String(b).length)
  const A = digitsOf(a, len)
  const B = digitsOf(b, len)
  const add = op === '+' ? buildAdd(A, B, len) : null
  const sub = op === '-' ? buildSub(A, B, len) : null
  const finalCarry = add?.finalCarry ?? 0
  const totalCols = op === '+' && finalCarry ? len + 1 : len

  const [rev, setRev] = useState(Math.min(initialStep, len))
  const shown = readOnly ? Math.min(initialStep, len) : rev
  const done = shown >= len

  useEffect(() => {
    onStateChange?.({ done: done ? 1 : 0, step: shown })
  }, [done, shown, onStateChange])

  // current top values + which columns changed (subtraction borrow), up to `shown`
  const topVals = [...A]
  const changed: Record<number, boolean> = {}
  if (sub) {
    for (let i = 0; i < shown; i++) {
      for (const m of sub.steps[i].mods) { topVals[m.col] = m.val; changed[m.col] = true }
    }
  }

  const colColor = op === '+' ? '#FF7A2F' : '#EF4444'
  const cols = Array.from({ length: totalCols }, (_, d) => totalCols - 1 - d) // left→right

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="rounded-2xl bg-slate-50 px-5 py-4 border border-gray-100">
        <div className="flex gap-1.5 font-bold text-3xl" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {cols.map((c, d) => {
            const isLeftmost = d === 0
            const carryHere = !!add && c >= 1 && shown > c - 1 && add.steps[c - 1].carryOut === 1
            const topChanged = !!sub && changed[c]
            return (
              <div key={c} className="flex flex-col items-center w-10">
                {/* carry / borrow marker */}
                <div className="h-6 flex items-end justify-center">
                  <AnimatePresence>
                    {carryHere && (
                      <motion.span
                        key="carry"
                        initial={{ opacity: 0, y: 10, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="text-sm font-bold"
                        style={{ color: colColor }}
                      >1</motion.span>
                    )}
                    {topChanged && (
                      <motion.span
                        key="borrow"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-sm font-bold"
                        style={{ color: colColor }}
                      >{topVals[c]}</motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {/* top number (A) */}
                <span
                  className={topChanged ? 'text-gray-300 line-through' : ''}
                  style={{ color: topChanged ? undefined : '#1E3A5F' }}
                >
                  {c < len ? A[c] : ''}
                </span>
                {/* bottom number (B) with operator on the far left */}
                <span className="relative" style={{ color: '#1E3A5F' }}>
                  {isLeftmost && (
                    <span className="absolute -left-5" style={{ color: colColor }}>{op}</span>
                  )}
                  {c < len ? B[c] : ''}
                </span>
                {/* divider + result */}
                <div className="w-full h-0.5 bg-gray-400 my-1" />
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {shown > c ? (
                      <motion.span
                        key={`r-${c}`}
                        initial={{ opacity: 0, y: -8, scale: 1.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        style={{ color: '#22C55E' }}
                      >
                        {c < len ? (add ? add.steps[c].res : sub!.steps[c].res) : finalCarry}
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
              onClick={() => setRev(r => Math.min(len, r + 1))}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85 transition-opacity"
              style={{ background: colColor }}
            >
              {op === '+' ? 'บวก' : 'ลบ'}หลักถัดไป ▶
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
