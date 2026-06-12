import type { Chapter, Subject } from '@/types/curriculum'

// Dynamic import all content files
// Each grade dir exports an array of chapters

type ContentModule = { default: Chapter[] }

const moduleMap: Record<string, () => Promise<ContentModule>> = {
  'math-4':  () => import('@/content/math/grade-4/index'),
  'math-5':  () => import('@/content/math/grade-5/index'),
  'math-6':  () => import('@/content/math/grade-6/index'),
}

export async function getChapters(subject: Subject, grade: number): Promise<Chapter[]> {
  const key = `${subject}-${grade}`
  const loader = moduleMap[key]
  if (!loader) return []
  const mod = await loader()
  return mod.default
}

export async function getChapter(subject: Subject, grade: number, slug: string): Promise<Chapter | undefined> {
  const chapters = await getChapters(subject, grade)
  return chapters.find(c => c.slug === slug)
}

export async function getAllChapterParams() {
  const params: { subject: string; grade: string; chapter: string }[] = []
  for (const key of Object.keys(moduleMap)) {
    const [subject, grade] = key.split('-')
    const mod = await moduleMap[key]()
    for (const ch of mod.default) {
      params.push({ subject, grade, chapter: ch.slug })
    }
  }
  return params
}
