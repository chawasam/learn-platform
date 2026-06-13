'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  q: string
  ans: string
  hint: string
  onCorrect?: () => void
  onAnswered?: (correct: boolean) => void
  questionNumber?: number
  unit?: string
}

export default function QuizFill({ q, ans, hint, onCorrect, onAnswered, questionNumber, unit }: Props) {
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [reported, setReported] = useState(false)   // score locks on first submit; retry doesn't re-report

  const normalise = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase()
  const correct = normalise(input) === normalise(ans)

  const submit = () => {
    if (!input.trim() || submitted) return
    setSubmitted(true)
    if (correct) onCorrect?.()
    if (!reported) { onAnswered?.(correct); setReported(true) }
  }

  const retry = () => {
    setInput('')
    setSubmitted(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {questionNumber !== undefined && (
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">
            {questionNumber}
          </span>
        )}
        <p className="text-base font-medium leading-relaxed pt-0.5">{q}</p>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={e => !submitted && setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="พิมพ์คำตอบ..."
          disabled={submitted}
          className="flex-1 px-4 py-3 rounded-xl border-2 text-base font-medium outline-none transition-colors disabled:bg-gray-50"
          style={{
            borderColor: submitted ? (correct ? '#22C55E' : '#EF4444') : '#E5E7EB',
          }}
        />
        {unit && <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{unit}</span>}
        {!submitted ? (
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="px-5 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-colors disabled:opacity-40"
          >
            ตอบ
          </button>
        ) : !correct ? (
          <button
            onClick={retry}
            className="px-4 py-3 rounded-xl bg-gray-100 font-bold text-sm hover:bg-gray-200 transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            ลองใหม่
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {correct ? '🎉 ถูกต้อง!' : `❌ คำตอบที่ถูกคือ "${ans}"`}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div>
          {showHint ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
