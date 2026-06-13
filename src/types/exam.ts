import type { QuizQuestion } from './curriculum'

// Exam questions are GENERATED CLIENT-SIDE from these templates. Unlike ChapterV2
// (which crosses the server→client boundary as a serializable prop and therefore
// must be function-free, see curriculum.ts), templates here CAN hold functions —
// ExamRunner is a client component that imports them directly, so they never
// become props that get serialized.

export type Rng = () => number      // returns 0..1, like Math.random

export type QuestionTemplate = {
  id: string                        // stable id (dedup / debugging)
  difficulty?: 1 | 2 | 3            // 1 easy → 3 hard (metadata; reserved for ordering)
  gen: (rng: Rng) => QuizQuestion   // builds a concrete question AND computes its answer
}

export type ChapterExam = {
  chapterId: string                 // matches ChapterV2.id, e.g. 'math-6-percent'
  templates: QuestionTemplate[]     // parametric bulk — designed from real-exam archetypes
  bank?: QuizQuestion[]             // static hand-authored items (tricky / word-problem)
}
