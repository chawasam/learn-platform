'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Equation as a balance scale: x + c = r. Tap to remove c from BOTH sides — the
// scale stays balanced and x is left alone, so x = r − c. Reports { solved }.

interface Props {
  c?: number          // constant added to x
  r?: number          // right-hand value (must be ≥ c)
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const Dot = () => <div className="w-5 h-5 rounded-full" style={{ background: '#F59E0B' }} />

export default function EquationBalance({ c = 3, r = 7, readOnly = false, onStateChange }: Props) {
  const [removed, setRemoved] = useState(readOnly)
  const x = r - c
  useEffect(() => { onStateChange?.({ solved: removed ? 1 : 0 }) }, [removed, onStateChange])

  const leftDots = removed ? 0 : c
  const rightDots = removed ? x : r

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <p className="text-2xl font-bold" style={{ color: '#1E3A5F' }}>
        x + {c} = {r}
      </p>

      {/* balance beam */}
      <div className="flex items-start gap-2 w-full max-w-sm justify-center">
        {[0, 1].map(side => (
          <div key={side} className="flex flex-col items-center flex-1">
            <div className="min-h-20 w-full rounded-2xl bg-slate-100 border-2 border-slate-300 p-2 flex flex-wrap gap-1.5 items-center justify-center">
              {side === 0 ? (
                <>
                  <div className="px-3 py-2 rounded-lg bg-blue-500 text-white font-bold text-lg">x</div>
                  <AnimatePresence>
                    {Array.from({ length: leftDots }, (_, i) => (
                      <motion.div key={i} exit={{ scale: 0, opacity: 0 }}><Dot /></motion.div>
                    ))}
                  </AnimatePresence>
                </>
              ) : (
                <AnimatePresence mode="popLayout">
                  {Array.from({ length: rightDots }, (_, i) => (
                    <motion.div key={i} layout exit={{ scale: 0, opacity: 0 }}><Dot /></motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            <div className="w-1 h-5 bg-slate-400" />
          </div>
        ))}
      </div>
      <div className="w-56 h-1.5 rounded-full bg-slate-500 -mt-3" />
      <span className="text-2xl">⚖️</span>

      {removed && (
        <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-xl font-bold text-green-600">x = {x}</motion.p>
      )}

      {!readOnly && (
        <button onClick={() => setRemoved(v => !v)}
          className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85"
          style={{ background: removed ? '#94A3B8' : '#A855F7' }}>
          {removed ? '↺ เริ่มใหม่' : `หยิบ ${c} ออกทั้งสองข้าง`}
        </button>
      )}
    </div>
  )
}
