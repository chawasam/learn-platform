import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SUBJECTS, GRADE_LABEL } from '@/types/curriculum'
import { getChapters } from '@/lib/content'
import type { Subject } from '@/types/curriculum'

export async function generateStaticParams() {
  const params: { subject: string; grade: string }[] = []
  for (const s of SUBJECTS) {
    for (const g of s.grades) {
      params.push({ subject: s.id, grade: String(g) })
    }
  }
  return params
}

export default async function GradePage({
  params,
}: {
  params: Promise<{ subject: string; grade: string }>
}) {
  const { subject, grade } = await params
  const meta = SUBJECTS.find(s => s.id === subject)
  if (!meta) notFound()

  const gradeNum = parseInt(grade)
  const chapters = await getChapters(subject as Subject, gradeNum)

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href={`/${subject}`}
          className="text-sm px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          ← {meta.title}
        </Link>
        <h1 className="text-2xl font-bold">
          {meta.icon} {GRADE_LABEL(gradeNum)}
        </h1>
      </div>

      {chapters.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white border border-gray-100">
          <p className="text-5xl mb-4">🚧</p>
          <p className="text-lg font-semibold">กำลังเตรียมเนื้อหา</p>
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>เร็วๆ นี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {chapters.map(ch => (
            <Link
              key={ch.id}
              href={`/${subject}/${grade}/${ch.slug}`}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white shadow border-2 border-gray-100 text-center transition-all hover:-translate-y-1 hover:shadow-md hover:border-current active:scale-95"
              style={{ ['--hover-color' as string]: meta.color }}
            >
              <span className="text-3xl">{ch.icon}</span>
              <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                บทที่ {ch.chapter}
              </span>
              <span className="text-sm font-bold leading-snug">{ch.title}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
