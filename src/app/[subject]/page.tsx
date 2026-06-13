import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SUBJECTS, GRADE_LABEL } from '@/types/curriculum'
import type { Subject, SubjectMeta } from '@/types/curriculum'
import { availableGrades } from '@/lib/content'

export function generateStaticParams() {
  return SUBJECTS.map(s => ({ subject: s.id }))
}

function GradeCard({ g, subject, meta, hasContent }: { g: number; subject: string; meta: SubjectMeta; hasContent: boolean }) {
  if (!hasContent) {
    return (
      <div className="flex flex-col items-center py-5 rounded-2xl bg-gray-50 border-2 border-gray-200 font-bold text-xl text-gray-300 select-none">
        {GRADE_LABEL(g)}
        <span className="text-[10px] font-normal mt-1 text-gray-400">เร็วๆ นี้</span>
      </div>
    )
  }
  return (
    <Link
      href={`/${subject}/${g}`}
      className="flex flex-col items-center py-5 rounded-2xl bg-white shadow border-2 font-bold text-xl transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
      style={{ borderColor: meta.color, color: meta.color }}
    >
      {GRADE_LABEL(g)}
    </Link>
  )
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params
  const meta = SUBJECTS.find(s => s.id === subject)
  if (!meta) notFound()

  const ready = new Set(availableGrades(subject as Subject))
  const primaryGrades  = meta.grades.filter(g => g <= 6)
  const secondaryGrades = meta.grades.filter(g => g > 6)

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-sm px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          ← หน้าหลัก
        </Link>
        <h1 className="text-2xl font-bold">
          {meta.icon} {meta.title}
        </h1>
      </div>

      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--muted)' }}>ประถมศึกษา</h2>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {primaryGrades.map(g => (
            <GradeCard key={g} g={g} subject={subject} meta={meta} hasContent={ready.has(g)} />
          ))}
        </div>
      </section>

      {secondaryGrades.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--muted)' }}>มัธยมศึกษา</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {secondaryGrades.map(g => (
              <GradeCard key={g} g={g} subject={subject} meta={meta} hasContent={ready.has(g)} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
