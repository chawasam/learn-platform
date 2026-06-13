'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  q: string
  opts: string[]
  ans: number
  hint: string
  onCorrect?: () => void
  onAnswered?: (correct: boolean) => void
  questionNumber?: number
}

export default function QuizMC({ q, opts, ans, hint, onCorrect, onAnswered, questionNumber }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)

  const answered = selected !== null
  const correct = selected === ans

  const handleSelect = (i: number) => {
    if (answered) return
    setSelected(i)
    if (i === ans) onCorrect?.()
    onAnswered?.(i === ans)
  }

  const stateColor = (i: number) => {
    if (!answered) return '#E5E7EB'
    if (i === ans) return '#22C55E'
    if (i === selected) return '#EF4444'
    return '#E5E7EB'
  }

  const stateBg = (i: number) => {
    if (!answered) return 'white'
    if (i === ans) return '#F0FDF4'
    if (i === selected) return '#FEF2F2'
    return 'white'
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Question */}
      <div className="flex gap-3">
        {questionNumber !== undefined && (
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">
            {questionNumber}
          </span>
        )}
        <p className="text-base font-medium leading-relaxed pt-0.5">{q}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2">
        {opts.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            whileTap={answered ? undefined : { scale: 0.98 }}
            className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors disabled:cursor-default"
            style={{
              borderColor: stateColor(i),
              background: stateBg(i),
            }}
          >
            <span className="inline-block w-6 h-6 rounded-full border-2 mr-2 text-center text-xs leading-5 font-bold"
              style={{ borderColor: stateColor(i), color: answered && (i === ans || i === selected) ? stateColor(i) : '#9CA3AF' }}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
            {answered && i === ans && <span className="ml-2 text-green-500">✓</span>}
            {answered && i === selected && i !== ans && <span className="ml-2 text-red-400">✗</span>}
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {correct ? '🎉 ถูกต้อง!' : `❌ ไม่ถูก — คำตอบคือ "${opts[ans]}"`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!answered && (
        <div>
          {showHint ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700"
            >
              💡 {hint}
            </motion.div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              style={{ color: 'var(--muted)' }}
            >
              💡 ดูคำใบ้
            </button>
          )}
        </div>
      )}
    </div>
  )
}
