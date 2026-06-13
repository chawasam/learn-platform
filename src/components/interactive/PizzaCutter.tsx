'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Pizza fraction manipulative (CRA: concrete stage).
// Knife cuts along diameters: k cuts → 2k equal slices. Tap a slice to pick it up.
// Reports { parts, filled } via onStateChange for LessonStory goal gating.

interface Props {
  initialParts?: number          // 1 (whole) or an even number 2-8
  initialFilled?: number
  allowCut?: boolean
  allowPick?: boolean
  showLabel?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

const CX = 150
const CY = 150
const R_CRUST = 118
const R_CHEESE = 103
const TAU = Math.PI * 2

function polar(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

function wedgePath(r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(r, a0)
  const [x1, y1] = polar(r, a1)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${CX} ${CY} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`
}

export default function PizzaCutter({
  initialParts = 1,
  initialFilled = 0,
  allowCut = true,
  allowPick = true,
  showLabel = true,
  onStateChange,
}: Props) {
  const [parts, setParts] = useState(Math.max(1, initialParts))
  const [picked, setPicked] = useState<Set<number>>(
    () => new Set(Array.from({ length: Math.min(initialFilled, initialParts) }, (_, i) => i))
  )

  const filled = picked.size

  useEffect(() => {
    onStateChange?.({ parts, filled })
  }, [parts, filled, onStateChange])

  const cut = useCallback(() => {
    setParts(p => {
      const cuts = p <= 1 ? 0 : p / 2
      if (cuts >= 4) return p
      return (cuts + 1) * 2
    })
    setPicked(new Set())
  }, [])

  const reset = useCallback(() => {
    setParts(1)
    setPicked(new Set())
  }, [])

  const toggleSlice = useCallback((i: number) => {
    if (!allowPick || parts <= 1) return
    setPicked(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }, [allowPick, parts])

  const slice = 360 / parts

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 300 300" width={260} height={260}>
          {parts === 1 ? (
            <g>
              <circle cx={CX} cy={CY} r={R_CRUST} fill="#E8A33D" />
              <circle cx={CX} cy={CY} r={R_CHEESE} fill="#FFCE54" />
              {[[-40, -35], [35, -45], [-15, 30], [45, 25], [-55, 8], [5, -8]].map(([dx, dy], i) => (
                <circle key={i} cx={CX + dx} cy={CY + dy} r={11} fill="#D9534F" />
              ))}
            </g>
          ) : (
            Array.from({ length: parts }, (_, i) => {
              const a0 = -90 + i * slice
              const a1 = a0 + slice
              const mid = (a0 + a1) / 2
              const isPicked = picked.has(i)
              const [tx, ty] = polar(isPicked ? 16 : 0, mid)
              return (
                <motion.g
                  key={`${parts}-${i}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1, x: tx - CX, y: ty - CY }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  onPointerDown={() => toggleSlice(i)}
                  style={{ cursor: allowPick ? 'pointer' : 'default' }}
                >
                  <path d={wedgePath(R_CRUST, a0, a1)} fill="#E8A33D" stroke="#fff" strokeWidth={3} />
                  <path d={wedgePath(R_CHEESE, a0, a1)} fill={isPicked ? '#FFB838' : '#FFCE54'} />
                  {slice >= 40 && (
                    <>
                      <circle cx={polar(58, mid)[0]} cy={polar(58, mid)[1]} r={10} fill="#D9534F" />
                      <circle cx={polar(86, mid)[0]} cy={polar(86, mid)[1]} r={9} fill="#D9534F" />
                    </>
                  )}
                  {slice < 40 && (
                    <circle cx={polar(72, mid)[0]} cy={polar(72, mid)[1]} r={9} fill="#D9534F" />
                  )}
                </motion.g>
              )
            })
          )}
        </svg>

        {/* Fraction label — appears only once the pizza is cut */}
        {showLabel && parts > 1 && (
          <div className="flex flex-col items-center w-16">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`n-${filled}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold"
                style={{ color: '#FF7A2F' }}
              >
                {filled}
              </motion.span>
            </AnimatePresence>
            <div className="w-10 h-1 rounded-full bg-gray-700 my-1" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`d-${parts}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold"
                style={{ color: '#1E3A5F' }}
              >
                {parts}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </div>

      {allowCut && (
        <div className="flex gap-2">
          <button
            onClick={cut}
            disabled={parts >= 8}
            className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors disabled:opacity-30"
          >
            🔪 ตัด!
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            ↺ รวมร่าง
          </button>
        </div>
      )}

      {allowPick && parts > 1 && (
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          แตะชิ้นพิซซ่าเพื่อหยิบ · แตะซ้ำเพื่อวางคืน
        </p>
      )}
    </div>
  )
}
