import type { ChapterExam } from '@/types/exam'

// Per-chapter exam banks. Adding an exam = author <chapter>.exam.ts + ONE entry here
// (และเพิ่มใน scripts/verify-exam.mjs EXAMS ด้วย — dev gate ใช้ relative import).
// Lazy import keeps exam code out of the lesson bundle (mirrors INTERACTIVE_COMPONENTS).
// Keyed by ChapterV2.id.
export const EXAM_TEMPLATES: Record<string, () => Promise<{ default: ChapterExam }>> = {
  'math-6-number-calc': () => import('@/content/math/grade-6/number-calc.exam'),
  'math-6-factors': () => import('@/content/math/grade-6/factors.exam'),
  'math-6-fraction-calc': () => import('@/content/math/grade-6/fraction-calc.exam'),
  'math-6-decimals': () => import('@/content/math/grade-6/decimals.exam'),
  'math-6-decimal-calc': () => import('@/content/math/grade-6/decimal-calc.exam'),
  'math-6-parallel-angles': () => import('@/content/math/grade-6/parallel-angles.exam'),
  'math-6-equations': () => import('@/content/math/grade-6/equations.exam'),
  'math-6-scale': () => import('@/content/math/grade-6/scale.exam'),
  'math-6-quad-area': () => import('@/content/math/grade-6/quad-area.exam'),
  'math-6-circle-area': () => import('@/content/math/grade-6/circle-area.exam'),
  'math-6-percent': () => import('@/content/math/grade-6/percent.exam'),
  'math-6-volume': () => import('@/content/math/grade-6/volume.exam'),
  'math-6-statistics': () => import('@/content/math/grade-6/statistics.exam'),
  // ป.5
  'math-5-number-calc': () => import('@/content/math/grade-5/number-calc.exam'),
  'math-5-angles': () => import('@/content/math/grade-5/angles.exam'),
  'math-5-parallel': () => import('@/content/math/grade-5/parallel-lines.exam'),
  'math-5-probability': () => import('@/content/math/grade-5/probability.exam'),
  'math-5-equiv-fractions': () => import('@/content/math/grade-5/equivalent-fractions.exam'),
  'math-5-fraction-arith': () => import('@/content/math/grade-5/fraction-arithmetic.exam'),
  'math-5-decimals': () => import('@/content/math/grade-5/decimals.exam'),
  'math-5-decimal-arith': () => import('@/content/math/grade-5/decimal-arithmetic.exam'),
  'math-5-word-problems': () => import('@/content/math/grade-5/word-problems.exam'),
  'math-5-quadrilaterals': () => import('@/content/math/grade-5/quadrilaterals.exam'),
  'math-5-triangles': () => import('@/content/math/grade-5/triangles.exam'),
  'math-5-circles': () => import('@/content/math/grade-5/circles.exam'),
  'math-5-volume': () => import('@/content/math/grade-5/volume.exam'),
}

export const hasExam = (chapterId: string): boolean => chapterId in EXAM_TEMPLATES
