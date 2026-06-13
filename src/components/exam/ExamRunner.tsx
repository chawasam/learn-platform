'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { QuizQuestion } from '@/types/curriculum'
import QuizMC from '@/components/quiz/QuizMC'
import QuizFill from '@/components/quiz/QuizFill'
import QuizSlider from '@/components/quiz/QuizSlider'
import { EXAM_TEMPLATES } from '@/content/exams/registry'
import { generateExam } from '@/lib/examGen'
import { grade } from '@/lib/examScore'
import { fireConfetti } from '@/lib/confetti'

const PER_PAGE = 10
const TOTAL = 100

interface Props {
  chapterId: string
  title: string
  color: string
  backHref: string
}

function QuizItem({ q, i, onAnswered }: { q: QuizQuestion; i: number; onAnswered: (idx: number, c: boolean) => void }) {
  const n = i + 1
  if (q.type === 'mc') return <QuizMC q={q.q} opts={q.opts} ans={q.ans} hint={q.hint} questionNumber={n} onAnswered={c => onAnswered(i, c)} />
  if (q.type === 'fill') return <QuizFill q={q.q} ans={q.ans} hint={q.hint} questionNumber={n} onAnswered={c => onAnswered(i, c)} />
  if (q.type === 'slider') return <QuizSlider q={q.q} min={q.min} max={q.max} step={q.step} ans={q.ans} unit={q.unit} hint={q.hint} questionNumber={n} onAnswered={c => onAnswered(i, c)} />
  return null
}

export default function ExamRunner({ chapterId, color, backHref }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null)
  const [results, setResults] = useState<(boolean | null)[]>([])
  const [page, setPage] = useState(0)
  const [seed, setSeed] = useState(0)         // 0 = first mount (pick random); >0 = a re-roll
  const [done, setDone] = useState(false)

  // Generate CLIENT-SIDE on mount + each re-roll. Done in useEffect (not render) so
  // SSG prerender shows the loader and there's no hydration mismatch, and Math.random
  // is safe here (browser runtime).
  useEffect(() => {
    let alive = true
    const loader = EXAM_TEMPLATES[chapterId]
    if (!loader) { setQuestions([]); return }
    loader().then(mod => {
      if (!alive) return
      const s = seed || Math.floor(Math.random() * 1e9) + 1
      const qs = generateExam(mod.default, TOTAL, s)
      setQuestions(qs)
      setResults(Array(qs.length).fill(null))
      setPage(0)
      setDone(false)
    })
    return () => { alive = false }
  }, [chapterId, seed])

  const onAnswered = useCallback((idx: number, correct: boolean) => {
    setResults(prev => {
      if (prev[idx] !== null) return prev
      const next = [...prev]
      next[idx] = correct
      return next
    })
  }, [])

  if (questions === null) {
    return (
      <div className="flex flex-col items-center gap-3 py-20" style={{ color: 'var(--muted)' }}>
        <div className="animate-spin w-8 h-8 border-4 rounded-full" style={{ borderColor: color, borderTopColor: 'transparent' }} />
        <p className="text-sm font-semibold">กำลังออกข้อสอบ 100 ข้อ…</p>
      </div>
    )
  }
  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-base mb-4" style={{ color: 'var(--muted)' }}>บทนี้ยังไม่มีชุดข้อสอบ</p>
        <Link href={backHref} className="px-5 py-3 rounded-2xl border-2 border-gray-200 bg-white font-semibold text-sm">← กลับบทเรียน</Link>
      </div>
    )
  }

  const total = questions.length
  const answered = results.filter(r => r !== null).length
  const correct = results.filter(r => r === true).length
  const pct = Math.round((correct / total) * 100)
  const pages = Math.ceil(total / PER_PAGE)
  const g = grade(pct)

  const reroll = () => setSeed(Math.floor(Math.random() * 1e9) + 1)
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const finish = () => { setDone(true); toTop(); if (pct >= 70) fireConfetti() }

  return (
    <div className="flex flex-col gap-5">
      {/* progress (answered, not correct) */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: color }}
            animate={{ width: `${(answered / total) * 100}%` }} transition={{ type: 'spring', stiffness: 60 }} />
        </div>
        <span className="text-sm font-bold" style={{ color }}>{answered}/{total}</span>
      </div>

      {!done && (
        <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>หน้า {page + 1} / {pages}</p>
      )}

      {/* all questions mounted; only the current page is visible so answered state survives paging */}
      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <div key={i} className={Math.floor(i / PER_PAGE) === page && !done ? 'block' : 'hidden'}>
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2"
              style={{ borderColor: results[i] === null ? '#F3F4F6' : results[i] ? '#BBF7D0' : '#FECACA' }}>
              <QuizItem q={q} i={i} onAnswered={onAnswered} />
            </div>
          </div>
        ))}
      </div>

      {/* page nav */}
      {!done && (
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => { setPage(p => Math.max(0, p - 1)); toTop() }} disabled={page === 0}
            className="px-5 py-3 rounded-2xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-30">← ก่อนหน้า</button>
          {page < pages - 1 ? (
            <button onClick={() => { setPage(p => p + 1); toTop() }}
              className="flex-1 max-w-60 py-3.5 rounded-2xl text-white font-bold text-base hover:opacity-90 transition-opacity" style={{ background: color }}>หน้าถัดไป ▶</button>
          ) : (
            <button onClick={finish}
              className="flex-1 max-w-60 py-3.5 rounded-2xl text-white font-bold text-base hover:opacity-90 transition-opacity" style={{ background: color }}>ดูผลคะแนน 🏁</button>
          )}
        </div>
      )}

      {/* summary */}
      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 px-5 rounded-2xl border-2" style={{ borderColor: g.color + '55', background: g.color + '12' }}>
          <p className="text-5xl mb-3">{g.emoji}</p>
          <p className="text-xl font-bold" style={{ color: g.color }}>{g.title}</p>
          <p className="text-3xl font-extrabold mt-3" style={{ color: '#1E3A5F' }}>
            {correct} <span className="text-lg font-bold text-gray-400">/ {total} ข้อ</span>
          </p>
          <div className="flex flex-wrap justify-center gap-1 mt-4 max-w-md mx-auto">
            {results.map((r, i) => (
              <span key={i} className="w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center text-white"
                style={{ background: r === null ? '#CBD5E1' : r ? '#22C55E' : '#EF4444' }}>{i + 1}</span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <Link href={backHref} className="px-5 py-3 rounded-2xl border-2 border-gray-200 bg-white font-semibold text-sm hover:bg-gray-50 transition-colors">← กลับบทเรียน</Link>
            <button onClick={() => { setDone(false); setPage(0); toTop() }}
              className="px-5 py-3 rounded-2xl border-2 border-gray-200 bg-white font-semibold text-sm hover:bg-gray-50 transition-colors">ดูเฉลยย้อน</button>
            <button onClick={reroll}
              className="px-6 py-3 rounded-2xl text-white font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: g.color }}>สุ่มชุดใหม่ ↻</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
