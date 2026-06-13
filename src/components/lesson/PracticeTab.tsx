'use client'
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion } from '@/types/curriculum'
import { fireConfetti } from '@/lib/confetti'
import QuizMC from '@/components/quiz/QuizMC'
import QuizFill from '@/components/quiz/QuizFill'
import QuizSlider from '@/components/quiz/QuizSlider'
import QuizDragPlace from '@/components/quiz/QuizDragPlace'

interface Props {
  questions: QuizQuestion[]
}

export default function PracticeTab({ questions }: Props) {
  const [scores, setScores] = useState<boolean[]>(Array(questions.length).fill(false))
  const [showSummary, setShowSummary] = useState(false)

  const markCorrect = useCallback((idx: number) => {
    setScores(prev => {
      const next = [...prev]
      next[idx] = true
      return next
    })
  }, [])

  const correct = scores.filter(Boolean).length
  const total = questions.length
  const allDone = scores.every(Boolean)

  useEffect(() => {
    if (allDone) fireConfetti()
  }, [allDone])

  return (
    <div className="flex flex-col gap-6">
      {/* Score bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-400 rounded-full"
            animate={{ width: `${(correct / total) * 100}%` }}
            transition={{ type: 'spring', stiffness: 60 }}
          />
        </div>
        <span className="text-sm font-bold" style={{ color: '#22C55E' }}>{correct}/{total}</span>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl p-5 shadow-sm border-2 transition-colors"
            style={{ borderColor: scores[i] ? '#BBF7D0' : '#F3F4F6' }}
          >
            {q.type === 'mc' && (
              <QuizMC
                q={q.q}
                opts={q.opts}
                ans={q.ans}
                hint={q.hint}
                questionNumber={i + 1}
                onCorrect={() => markCorrect(i)}
              />
            )}
            {q.type === 'fill' && (
              <QuizFill
                q={q.q}
                ans={q.ans}
                hint={q.hint}
                questionNumber={i + 1}
                onCorrect={() => markCorrect(i)}
              />
            )}
            {q.type === 'slider' && (
              <QuizSlider
                q={q.q}
                min={q.min}
                max={q.max}
                step={q.step}
                ans={q.ans}
                unit={q.unit}
                hint={q.hint}
                questionNumber={i + 1}
                onCorrect={() => markCorrect(i)}
              />
            )}
            {q.type === 'drag-place' && (
              <QuizDragPlace
                q={q.q}
                items={q.items}
                hint={q.hint}
                questionNumber={i + 1}
                onCorrect={() => markCorrect(i)}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Completion */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center py-8 rounded-2xl border-2 border-green-200 bg-green-50"
          >
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-xl font-bold text-green-700">เยี่ยม! ทำถูกหมดเลย</p>
            <p className="text-sm mt-1 text-green-600">{correct} จาก {total} ข้อ</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
