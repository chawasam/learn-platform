'use client'
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { QuizQuestion } from '@/types/curriculum'
import QuizMC from '@/components/quiz/QuizMC'
import QuizFill from '@/components/quiz/QuizFill'
import QuizSlider from '@/components/quiz/QuizSlider'
import QuizDragPlace from '@/components/quiz/QuizDragPlace'
import { fireConfetti } from '@/lib/confetti'
import { grade } from '@/lib/examScore'

interface Props {
  questions: QuizQuestion[]
  backHref?: string        // shown as "back" button on the summary; omit to hide
  examHref?: string        // when set, show a CTA to the 100-question exam below the questions
}

export default function PracticeTab({ questions, backHref, examHref }: Props) {
  const total = questions.length
  // null = ยังไม่ตอบ · true/false = ถูก/ผิด ครั้งแรก (คะแนนล็อกครั้งแรก ไม่นับ retry)
  const [results, setResults] = useState<(boolean | null)[]>(() => Array(total).fill(null))
  const [attempt, setAttempt] = useState(0)   // bump to remount all quizzes on "ทำใหม่"

  const handleAnswered = useCallback((idx: number, correct: boolean) => {
    setResults(prev => {
      if (prev[idx] !== null) return prev
      const next = [...prev]
      next[idx] = correct
      return next
    })
  }, [])

  const answeredCount = results.filter(r => r !== null).length
  const correctCount = results.filter(r => r === true).length
  const allAnswered = answeredCount === total
  const pct = Math.round((correctCount / total) * 100)
  const g = grade(pct)

  useEffect(() => {
    if (allAnswered && pct >= 70) fireConfetti()
  }, [allAnswered, pct])

  const resetAll = () => {
    setResults(Array(total).fill(null))
    setAttempt(a => a + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress: how many answered (not how many correct) */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-400 rounded-full"
            animate={{ width: `${(answeredCount / total) * 100}%` }}
            transition={{ type: 'spring', stiffness: 60 }}
          />
        </div>
        <span className="text-sm font-bold" style={{ color: '#4F80FF' }}>{answeredCount}/{total}</span>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <motion.div
            key={`${attempt}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl p-5 shadow-sm border-2 transition-colors"
            style={{ borderColor: results[i] === null ? '#F3F4F6' : results[i] ? '#BBF7D0' : '#FECACA' }}
          >
            {q.type === 'mc' && (
              <QuizMC q={q.q} opts={q.opts} ans={q.ans} hint={q.hint} questionNumber={i + 1}
                onAnswered={c => handleAnswered(i, c)} />
            )}
            {q.type === 'fill' && (
              <QuizFill q={q.q} ans={q.ans} hint={q.hint} questionNumber={i + 1}
                onAnswered={c => handleAnswered(i, c)} />
            )}
            {q.type === 'slider' && (
              <QuizSlider q={q.q} min={q.min} max={q.max} step={q.step} ans={q.ans} unit={q.unit} hint={q.hint}
                questionNumber={i + 1} onAnswered={c => handleAnswered(i, c)} />
            )}
            {q.type === 'drag-place' && (
              <QuizDragPlace q={q.q} items={q.items} hint={q.hint} questionNumber={i + 1}
                onAnswered={c => handleAnswered(i, c)} />
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA to the full 100-question exam (entrance-exam style) */}
      {examHref && (
        <Link
          href={examHref}
          className="block text-center px-6 py-4 rounded-2xl text-white font-bold text-base shadow-sm hover:opacity-90 transition-opacity"
          style={{ background: '#7C3AED' }}
        >
          📝 พร้อมแล้ว? ลองทำข้อสอบ 100 ข้อ →
        </Link>
      )}

      {/* Summary — shows once every question has been answered (right OR wrong) */}
      <AnimatePresence>
        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center py-8 px-5 rounded-2xl border-2"
            style={{ borderColor: g.color + '55', background: g.color + '12' }}
          >
            <p className="text-5xl mb-3">{g.emoji}</p>
            <p className="text-xl font-bold" style={{ color: g.color }}>{g.title}</p>
            <p className="text-3xl font-extrabold mt-3" style={{ color: '#1E3A5F' }}>
              {correctCount} <span className="text-lg font-bold text-gray-400">/ {total} ข้อ</span>
            </p>

            {/* per-question dots */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {results.map((r, i) => (
                <span key={i} className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: r ? '#22C55E' : '#EF4444' }}>
                  {i + 1}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              {backHref && (
                <Link
                  href={backHref}
                  className="px-5 py-3 rounded-2xl border-2 border-gray-200 bg-white font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  ← กลับไปเลือกบท
                </Link>
              )}
              <button
                onClick={resetAll}
                className="px-6 py-3 rounded-2xl text-white font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: g.color }}
              >
                ทำอีกครั้ง ↻
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
