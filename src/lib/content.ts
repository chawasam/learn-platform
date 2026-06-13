import type { AnyChapter, Subject } from '@/types/curriculum'
import { isChapterV2 } from '@/types/curriculum'
import { METAPHORS } from '@/content/math/metaphors'

// Central subject/grade registry.
// Adding a subject or grade = add ONE entry here + a content folder. No refactor.
// Each grade dir exports an array of chapters (v1 tab-based or v2 story-based, mixed OK).

type ContentModule = { default: AnyChapter[] }

const registry: Partial<Record<Subject, Record<number, () => Promise<ContentModule>>>> = {
  math: {
    4: () => import('@/content/math/grade-4/index'),
    5: () => import('@/content/math/grade-5/index'),
    6: () => import('@/content/math/grade-6/index'),
  },
}

/** Grades that actually have content for a subject (drives the grade grid). */
export function availableGrades(subject: Subject): number[] {
  return Object.keys(registry[subject] ?? {}).map(Number).sort((a, b) => a - b)
}

export async function getChapters(subject: Subject, grade: number): Promise<AnyChapter[]> {
  const loader = registry[subject]?.[grade]
  if (!loader) return []
  const mod = await loader()
  // Inject metaphors (kept in one central map, not scattered across 39 files)
  return mod.default.map(c =>
    isChapterV2(c) && METAPHORS[c.id] ? { ...c, metaphors: METAPHORS[c.id] } : c
  )
}

export async function getChapter(subject: Subject, grade: number, slug: string): Promise<AnyChapter | undefined> {
  const chapters = await getChapters(subject, grade)
  return chapters.find(c => c.slug === slug)
}

export async function getAllChapterParams() {
  const params: { subject: string; grade: string; chapter: string }[] = []
  for (const [subject, grades] of Object.entries(registry)) {
    for (const [grade, loader] of Object.entries(grades)) {
      const mod = await loader()
      for (const ch of mod.default) {
        params.push({ subject, grade, chapter: ch.slug })
      }
    }
  }
  return params
}
