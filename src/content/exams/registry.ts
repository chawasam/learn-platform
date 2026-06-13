import type { ChapterExam } from '@/types/exam'

// Per-chapter exam banks. Adding an exam = author <chapter>.exam.ts + ONE entry here
// (และเพิ่มใน scripts/verify-exam.mjs EXAMS ด้วย — dev gate ใช้ relative import).
// Lazy import keeps exam code out of the lesson bundle (mirrors INTERACTIVE_COMPONENTS).
// Keyed by ChapterV2.id.
export const EXAM_TEMPLATES: Record<string, () => Promise<{ default: ChapterExam }>> = {
  'math-6-number-calc': () => import('@/content/math/grade-6/number-calc.exam'),
  'math-6-percent': () => import('@/content/math/grade-6/percent.exam'),
  'math-6-volume': () => import('@/content/math/grade-6/volume.exam'),
}

export const hasExam = (chapterId: string): boolean => chapterId in EXAM_TEMPLATES
