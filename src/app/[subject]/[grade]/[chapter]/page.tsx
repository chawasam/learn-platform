import { notFound } from 'next/navigation'
import { SUBJECTS, GRADE_LABEL } from '@/types/curriculum'
import { getChapter, getAllChapterParams } from '@/lib/content'
import type { Subject } from '@/types/curriculum'
import ChapterView from './ChapterView'

export async function generateStaticParams() {
  return getAllChapterParams()
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ subject: string; grade: string; chapter: string }>
}) {
  const { subject, grade, chapter } = await params
  const meta = SUBJECTS.find(s => s.id === subject)
  if (!meta) notFound()

  const chapterData = await getChapter(subject as Subject, parseInt(grade), chapter)
  if (!chapterData) notFound()

  return (
    <ChapterView
      chapter={chapterData}
      subject={meta}
      gradeNum={parseInt(grade)}
    />
  )
}
