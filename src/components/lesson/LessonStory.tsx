'use client'
import { useState, Suspense, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChapterV2, Scene, QuizQuestion } from '@/types/curriculum'
import { INTERACTIVE_COMPONENTS } from '@/components/interactive/registry'
import PracticeTab from '@/components/lesson/PracticeTab'
import QuizMC from '@/components/quiz/QuizMC'
import QuizFill from '@/components/quiz/QuizFill'
import QuizSlider from '@/components/quiz/QuizSlider'
import { fireConfetti } from '@/lib/confetti'
import MetaphorModal from '@/components/lesson/MetaphorModal'

interface Props {
  chapter: ChapterV2
  color: string
  examHref?: string
}

function InlineQuestion({ question, onCorrect }: { question: QuizQuestion; onCorrect: () => void }) {
  if (question.type === 'mc')
    return <QuizMC q={question.q} opts={question.opts} ans={question.ans} hint={question.hint} questionNumber={0} onCorrect={onCorrect} />
  if (question.type === 'fill')
    return <QuizFill q={question.q} ans={question.ans} hint={question.hint} questionNumber={0} onCorrect={onCorrect} />
  if (question.type === 'slider')
    return <QuizSlider q={question.q} min={question.min} max={question.max} step={question.step} ans={question.ans} unit={question.unit} hint={question.hint} questionNumber={0} onCorrect={onCorrect} />
  return null
}

export default function LessonStory({ chapter, color, examHref }: Props) {
  const scenes = chapter.scenes
  // idx === scenes.length → final practice
  const [idx, setIdx] = useState(0)
  const [met, setMet] = useState<Record<string, boolean>>({})
  const [showHint, setShowHint] = useState(false)
  const [showMetaphor, setShowMetaphor] = useState(false)
  const hasMetaphor = !!chapter.metaphors?.length

  const inPractice = idx >= scenes.length
  const scene: Scene | undefined = inPractice ? undefined : scenes[idx]

  const markMet = useCallback((sceneId: string) => {
    setMet(prev => {
      if (prev[sceneId]) return prev
      fireConfetti()
      return { ...prev, [sceneId]: true }
    })
  }, [])

  const goalDone = !scene?.goal || met[scene.id]
  const isDiscovery = !!scene?.revealAfterGoal
  const showNarration = !isDiscovery || goalDone

  // Declarative goal checking — components report state via onStateChange.
  // 'interact' unlocks on any reported state change (more reliable than the
  // wrapper onPointerDown, which misses components that stopPropagation, e.g. ClockDrag).
  const handleStateChange = useCallback((state: Record<string, unknown>) => {
    if (!scene?.goal) return
    if (scene.goal.type === 'interact') { markMet(scene.id); return }
    if (scene.goal.type === 'reach-value' && state[scene.goal.key] === scene.goal.value) {
      markMet(scene.id)
    }
  }, [scene, markMet])

  const handleInteract = useCallback(() => {
    if (scene?.goal?.type === 'interact') markMet(scene.id)
  }, [scene, markMet])

  const goNext = () => {
    if (!goalDone) return
    setShowHint(false)
    setIdx(i => Math.min(scenes.length, i + 1))
  }
  const goPrev = () => {
    setShowHint(false)
    setIdx(i => Math.max(0, i - 1))
  }

  const Visual = scene?.visual ? INTERACTIVE_COMPONENTS[scene.visual.component] : null

  return (
    <div className="flex flex-col gap-4">
      {/* Progress dots */}
      <div className="flex gap-1.5">
        {[...scenes.map((_, i) => i), scenes.length].map(i => (
          <button
            key={i}
            onClick={() => i <= idx && setIdx(i)}
            className="flex-1 h-1.5 rounded-full transition-colors"
            style={{ background: i < idx ? color : i === idx ? color : '#E5E7EB', opacity: i === idx ? 1 : i < idx ? 0.5 : 1 }}
            aria-label={i === scenes.length ? 'ฝึกหัด' : `ฉาก ${i + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!inPractice && scene ? (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4"
          >
            {/* Narration — always visible normally; hidden until goal met in discovery mode */}
            {showNarration && (
              <motion.p
                key={`say-${scene.id}-${String(showNarration)}`}
                initial={isDiscovery && goalDone ? { opacity: 0, y: -8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-lg font-semibold leading-relaxed text-center px-2"
                style={{ color: '#1E3A5F' }}
              >
                {scene.say}
              </motion.p>
            )}

            {/* Visual — full focus, large */}
            {Visual && scene.visual && (
              <div
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex justify-center items-center min-h-72"
                onPointerDown={handleInteract}
              >
                <Suspense fallback={
                  <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full" />
                }>
                  <Visual key={scene.id} {...scene.visual.config} onStateChange={handleStateChange} />
                </Suspense>
              </div>
            )}

            {/* Inline answer goal */}
            {scene.goal?.type === 'answer' && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <InlineQuestion question={scene.goal.question} onCorrect={() => markMet(scene.id)} />
              </div>
            )}

            {/* Hint */}
            {scene.hint && !goalDone && (
              <div className="text-center">
                {showHint ? (
                  <p className="text-sm bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 inline-block text-amber-800">
                    💡 {scene.hint}
                  </p>
                ) : (
                  <button onClick={() => setShowHint(true)} className="text-sm text-gray-400 underline">
                    ขอคำใบ้
                  </button>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="practice"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
          >
            <p className="text-lg font-bold text-center mb-4" style={{ color: '#1E3A5F' }}>
              ✏️ ลองทำเองดูเลย!
            </p>
            <PracticeTab
              questions={chapter.finalPractice}
              backHref={`/${chapter.subject}/${chapter.grade}`}
              examHref={examHref}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metaphor "memory hook" button (floating) + modal */}
      {hasMetaphor && (
        <button
          onClick={() => setShowMetaphor(true)}
          className="fixed top-16 right-4 z-40 px-3.5 py-2.5 rounded-2xl text-white font-bold text-xs shadow-lg hover:opacity-90 transition-opacity"
          style={{ background: color }}
        >💡 ภาพช่วยจำ</button>
      )}
      <AnimatePresence>
        {showMetaphor && hasMetaphor && (
          <MetaphorModal metaphors={chapter.metaphors!} color={color} onClose={() => setShowMetaphor(false)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      {!inPractice && (
        <div className="flex items-center justify-between gap-3 mt-1">
          <button
            onClick={goPrev}
            disabled={idx === 0}
            className="px-5 py-3 rounded-2xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-30"
          >
            ← ย้อน
          </button>
          <motion.button
            onClick={goNext}
            disabled={!goalDone}
            // single pop when the goal unlocks — not an infinite pulse (distracting + breaks test actionability)
            key={`next-${scene?.id}-${goalDone}`}
            initial={goalDone && scene?.goal ? { scale: 0.9 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="flex-1 max-w-60 py-3.5 rounded-2xl text-white font-bold text-base transition-opacity disabled:opacity-35"
            style={{ background: color }}
          >
            {goalDone ? (idx === scenes.length - 1 ? 'ไปฝึกหัดกัน ✏️' : 'ถัดไป ▶') : 'ลองทำตามก่อนนะ 👆'}
          </motion.button>
        </div>
      )}
    </div>
  )
}
