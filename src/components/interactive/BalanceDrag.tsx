'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const WEIGHT_OPTIONS = [1, 2, 5, 10, 20]

interface Props {
  readOnly?: boolean
  onChange?: (left: number[], right: number[]) => void
  initialLeft?: number[]
  initialRight?: number[]
  targetLeftSum?: number
  targetRightSum?: number
}

export default function BalanceDrag({
  readOnly = false,
  onChange,
  initialLeft = [],
  initialRight = [],
  targetLeftSum,
  targetRightSum,
}: Props) {
  const [left, setLeft] = useState<number[]>(initialLeft)
  const [right, setRight] = useState<number[]>(initialRight)

  const leftSum = left.reduce((a, b) => a + b, 0)
  const rightSum = right.reduce((a, b) => a + b, 0)
  // SVG rotate: positive = clockwise = left side rises. Heavier left must SINK, so invert.
  const diff = rightSum - leftSum
  const tilt = Math.max(-28, Math.min(28, diff * 1.8))

  const addWeight = (side: 'left' | 'right', w: number) => {
    if (readOnly) return
    if (side === 'left') {
      const n = [...left, w]
      setLeft(n)
      onChange?.(n, right)
    } else {
      const n = [...right, w]
      setRight(n)
      onChange?.(left, n)
    }
  }

  const removeWeight = (side: 'left' | 'right', idx: number) => {
    if (readOnly) return
    if (side === 'left') {
      const n = left.filter((_, i) => i !== idx)
      setLeft(n)
      onChange?.(n, right)
    } else {
      const n = right.filter((_, i) => i !== idx)
      setRight(n)
      onChange?.(left, n)
    }
  }

  const balanced = leftSum === rightSum && leftSum > 0
  const isCorrect =
    (targetLeftSum === undefined || leftSum === targetLeftSum) &&
    (targetRightSum === undefined || rightSum === targetRightSum)

  const panColor = (sum: number, other: number) => {
    if (balanced) return '#22C55E'
    if (sum > other) return '#4F80FF'
    return '#E5E7EB'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scale visual */}
      <div className="relative">
        <svg viewBox="0 0 280 170" width={280} height={170}>
          {/* Stand */}
          <rect x={128} y={135} width={24} height={25} rx={4} fill="#9CA3AF" />
          <rect x={108} y={152} width={64} height={10} rx={5} fill="#6B7280" />
          {/* Pole */}
          <line x1={140} y1={135} x2={140} y2={55} stroke="#6B7280" strokeWidth={5} strokeLinecap="round" />
          {/* Pivot dot */}
          <circle cx={140} cy={55} r={6} fill="#374151" />

          {/* Tilting arm + pans */}
          <motion.g
            animate={{ rotate: tilt }}
            style={{ originX: '140px', originY: '55px' }}
            transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          >
            {/* Arm */}
            <line x1={35} y1={55} x2={245} y2={55} stroke="#374151" strokeWidth={5} strokeLinecap="round" />

            {/* Left strings */}
            <line x1={55} y1={55} x2={45} y2={92} stroke="#9CA3AF" strokeWidth={1.5} />
            <line x1={55} y1={55} x2={65} y2={92} stroke="#9CA3AF" strokeWidth={1.5} />

            {/* Right strings */}
            <line x1={225} y1={55} x2={215} y2={92} stroke="#9CA3AF" strokeWidth={1.5} />
            <line x1={225} y1={55} x2={235} y2={92} stroke="#9CA3AF" strokeWidth={1.5} />

            {/* Left pan */}
            <ellipse cx={55} cy={95} rx={32} ry={7} fill={panColor(leftSum, rightSum)} stroke="#D1D5DB" strokeWidth={1.5} />
            {/* Left weights */}
            {left.slice(0, 5).map((w, i) => (
              <g key={i}>
                <rect
                  x={38 + (i % 3) * 12} y={82 - Math.floor(i / 3) * 14}
                  width={22} height={12} rx={3}
                  fill="#4F80FF" stroke="#fff" strokeWidth={1}
                />
                <text
                  x={49 + (i % 3) * 12} y={91 - Math.floor(i / 3) * 14}
                  textAnchor="middle" fontSize={8} fill="#fff" fontWeight="bold"
                >{w}</text>
              </g>
            ))}

            {/* Right pan */}
            <ellipse cx={225} cy={95} rx={32} ry={7} fill={panColor(rightSum, leftSum)} stroke="#D1D5DB" strokeWidth={1.5} />
            {/* Right weights */}
            {right.slice(0, 5).map((w, i) => (
              <g key={i}>
                <rect
                  x={208 + (i % 3) * 12} y={82 - Math.floor(i / 3) * 14}
                  width={22} height={12} rx={3}
                  fill="#FF7A2F" stroke="#fff" strokeWidth={1}
                />
                <text
                  x={219 + (i % 3) * 12} y={91 - Math.floor(i / 3) * 14}
                  textAnchor="middle" fontSize={8} fill="#fff" fontWeight="bold"
                >{w}</text>
              </g>
            ))}
          </motion.g>

          {/* Sum labels */}
          <text x={55} y={130} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#4F80FF">
            {leftSum} kg
          </text>
          <text x={225} y={130} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#FF7A2F">
            {rightSum} kg
          </text>
        </svg>
        {isCorrect && (targetLeftSum !== undefined || targetRightSum !== undefined) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            ✓
          </motion.div>
        )}
      </div>

      {balanced && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 font-bold text-sm"
        >
          ⚖️ สมดุล! {leftSum} = {rightSum}
        </motion.p>
      )}

      {!readOnly && (
        <div className="flex gap-6">
          {(['left', 'right'] as const).map(side => (
            <div key={side} className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: side === 'left' ? '#4F80FF' : '#FF7A2F' }}>
                {side === 'left' ? 'ด้านซ้าย' : 'ด้านขวา'}
              </span>
              <div className="flex gap-1 flex-wrap justify-center">
                {WEIGHT_OPTIONS.map(w => (
                  <button
                    key={w}
                    onClick={() => addWeight(side, w)}
                    className="w-9 h-9 rounded-lg font-bold text-xs transition-colors"
                    style={{
                      background: side === 'left' ? '#DBEAFE' : '#FFEDD5',
                      color: side === 'left' ? '#4F80FF' : '#FF7A2F',
                    }}
                  >
                    +{w}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 min-h-7 max-w-32 justify-center">
                {(side === 'left' ? left : right).map((w, i) => (
                  <button
                    key={i}
                    onClick={() => removeWeight(side, i)}
                    className="px-2 py-0.5 rounded text-white text-xs font-bold hover:opacity-70 transition-opacity"
                    style={{ background: side === 'left' ? '#4F80FF' : '#FF7A2F' }}
                  >
                    {w} ✕
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
