'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NumberLine from '@/components/interactive/NumberLine'

interface Props {
  q: string
  min: number
  max: number
  step: number
  ans: number
  unit: string
  hint: string
  onCorrect?: () => void
  questionNumber?: number
}

export default function QuizSlider({ q, min, max, step, ans, unit, hint, onCorrect, questionNumber }: Props) {
  const [value, setValue] = useState(min)
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const correct = Math.abs(value - ans) < step * 0.5

  const submit = () => {
    if (submitted) return
    setSubmitted(true)
    if (correct) onCorrect?.()
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

      <div className="bg-gray-50 rounded-2xl p-4">
        <NumberLine
          min={min}
          max={max}
          step={step}
          initialValue={min}
          onChange={setValue}
          readOnly={submitted}
          targetValue={submitted ? ans : undefined}
        />
        <p className="text-center mt-3 text-lg font-bold" style={{ color: '#4F80FF' }}>
          {value % 1 === 0 ? value : value.toFixed(step < 0.1 ? 2 : 1)} {unit}
        </p>
      </div>

      {!submitted && (
        <button
          onClick={submit}
          className="px-6 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-colors self-start"
        >
          ยืนยันคำตอบ
        </button>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {correct ? `🎉 ถูกต้อง! ${ans} ${unit}` : `❌ คำตอบที่ถูกคือ ${ans} ${unit}`}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div>
          {showHint ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
              💡 {hint}
            </motion.div>
          ) : (
            <button onClick={() => setShowHint(true)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              style={{ color: 'var(--muted)' }}>
              💡 ดูคำใบ้
            </button>
          )}
        </div>
      )}
    </div>
  )
}
