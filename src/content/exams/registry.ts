import type { ChapterExam } from '@/types/exam'

// Per-chapter exam banks. Adding an exam = author <chapter>.exam.ts + ONE entry here.
// Lazy import keeps exam code out of the lesson bundle (mirrors INTERACTIVE_COMPONENTS).
// Keyed by ChapterV2.id.
export const EXAM_TEMPLATES: Record<string, () => Promise<{ default: ChapterExam }>> = {
  'math-6-percent': () => import('@/content/math/grade-6/percent.exam'),
}

export const hasExam = (chapterId: string): boolean => chapterId in EXAM_TEMPLATES
