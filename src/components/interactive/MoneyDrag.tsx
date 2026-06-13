'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DENOMINATIONS = [
  { value: 1000, label: '฿1000', emoji: '🟣', color: '#8B5CF6' },
  { value: 500,  label: '฿500',  emoji: '🔵', color: '#3B82F6' },
  { value: 100,  label: '฿100',  emoji: '🔴', color: '#EF4444' },
  { value: 50,   label: '฿50',  emoji: '🟡', color: '#EAB308' },
  { value: 20,   label: '฿20',  emoji: '🟢', color: '#22C55E' },
  { value: 10,   label: '10฿',  emoji: '🪙', color: '#D97706' },
  { value: 5,    label: '5฿',   emoji: '🪙', color: '#9CA3AF' },
  { value: 1,    label: '1฿',   emoji: '🪙', color: '#6B7280' },
]

interface Props {
  onChange?: (total: number) => void
  onStateChange?: (state: Record<string, unknown>) => void   // for LessonStory goal gating
  readOnly?: boolean
  targetTotal?: number
  availableDenominations?: number[]
  initialCounts?: Record<number, number>
}

export default function MoneyDrag({
  onChange,
  onStateChange,
  readOnly = false,
  targetTotal,
  availableDenominations,
  initialCounts = {},
}: Props) {
  const [counts, setCounts] = useState<Record<number, number>>(initialCounts)

  const denoms = availableDenominations
    ? DENOMINATIONS.filter(d => availableDenominations.includes(d.value))
    : DENOMINATIONS

  const total = denoms.reduce((sum, d) => sum + (counts[d.value] ?? 0) * d.value, 0)

  const adjust = (value: number, delta: number) => {
    if (readOnly) return
    const next = { ...counts, [value]: Math.max(0, (counts[value] ?? 0) + delta) }
    setCounts(next)
    const newTotal = denoms.reduce((sum, d) => sum + (next[d.value] ?? 0) * d.value, 0)
    onChange?.(newTotal)
    onStateChange?.({ total: newTotal })
  }

  const isCorrect = targetTotal !== undefined && total === targetTotal

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Wallet total */}
      <div className="relative">
        <motion.div
          key={total}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl px-8 py-4 shadow-md border-2 text-center min-w-48"
          style={{ borderColor: isCorrect ? '#22C55E' : '#E5E7EB' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>👛 รวมทั้งหมด</p>
          <span className="text-3xl font-bold" style={{ color: '#374151' }}>
            {total.toLocaleString()} บาท
          </span>
          {targetTotal !== undefined && (
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              เป้าหมาย: {targetTotal.toLocaleString()} บาท
              {total > targetTotal && <span className="text-red-400 ml-1">(เกิน {total - targetTotal})</span>}
              {total < targetTotal && <span className="text-blue-400 ml-1">(ขาด {targetTotal - total})</span>}
            </p>
          )}
        </motion.div>
        {isCorrect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            ✓
          </motion.div>
        )}
      </div>

      {/* Denomination controls */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {denoms.map(d => {
          const count = counts[d.value] ?? 0
          return (
            <div
              key={d.value}
              className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100"
            >
              {/* Note/coin visual */}
              <div
                className="w-12 h-7 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0"
                style={{ background: d.color }}
              >
                {d.label}
              </div>
              {!readOnly ? (
                <>
                  <button
                    onClick={() => adjust(d.value, -1)}
                    disabled={count === 0}
                    className="w-6 h-6 rounded-full bg-gray-100 font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-30"
                  >−</button>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={count}
                      initial={{ y: -4, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 4, opacity: 0 }}
                      className="w-5 text-center font-bold text-sm"
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                  <button
                    onClick={() => adjust(d.value, 1)}
                    className="w-6 h-6 rounded-full text-white font-bold text-sm hover:opacity-80 transition-opacity"
                    style={{ background: d.color }}
                  >+</button>
                </>
              ) : (
                <span className="font-bold text-sm ml-1">{count}</span>
              )}
            </div>
          )
        })}
      </div>

      {!readOnly && total > 0 && (
        <button
          onClick={() => { setCounts({}); onChange?.(0) }}
          className="text-xs px-4 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          ล้างทั้งหมด
        </button>
      )}
    </div>
  )
}
