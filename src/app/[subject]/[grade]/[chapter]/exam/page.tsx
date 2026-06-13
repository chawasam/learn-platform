import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SUBJECTS, GRADE_LABEL } from '@/types/curriculum'
import type { Subject } from '@/types/curriculum'
import { getChapter, getExamParams } from '@/lib/content'
import { hasExam } from '@/content/exams/registry'
import ExamRunner from '@/components/exam/ExamRunner'

export async function generateStaticParams() {
  return getExamParams()
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ subject: string; grade: string; chapter: string }>
}) {
  const { subject, grade, chapter } = await params
  const meta = SUBJECTS.find(s => s.id === subject)
  if (!meta) notFound()

  const ch = await getChapter(subject as Subject, parseInt(grade), chapter)
  if (!ch || !hasExam(ch.id)) notFound()

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-start gap-3 mb-6">
        <Link
          href={`/${subject}/${grade}/${chapter}`}
          className="flex-shrink-0 text-sm px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors mt-0.5"
        >
          ←
        </Link>
        <div>
          <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>
            {meta.icon} {meta.title} · {GRADE_LABEL(parseInt(grade))} · ข้อสอบ 100 ข้อ
          </p>
          <h1 className="text-xl font-bold leading-snug">📝 ข้อสอบ {ch.title}</h1>
        </div>
      </div>
      <ExamRunner chapterId={ch.id} title={ch.title} color={meta.color} backHref={`/${subject}/${grade}/${chapter}`} />
    </main>
  )
}
