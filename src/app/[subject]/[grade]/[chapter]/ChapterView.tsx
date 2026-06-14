'use client'
import Link from 'next/link'
import type { ChapterV2, SubjectMeta } from '@/types/curriculum'
import LessonStory from '@/components/lesson/LessonStory'
import { GRADE_LABEL } from '@/types/curriculum'
import { hasExam } from '@/content/exams/registry'

interface Props {
  chapter: ChapterV2
  subject: SubjectMeta
  gradeNum: number
}

export default function ChapterView({ chapter, subject, gradeNum }: Props) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-start gap-3 mb-6">
        <Link
          href={`/${subject.id}/${gradeNum}`}
          className="flex-shrink-0 text-sm px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors mt-0.5"
        >
          ←
        </Link>
        <div>
          <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>
            {subject.icon} {subject.title} · {GRADE_LABEL(gradeNum)} · บทที่ {chapter.chapter}
          </p>
          <h1 className="text-xl font-bold leading-snug">
            {chapter.icon} {chapter.title}
          </h1>
        </div>
      </div>
      <LessonStory
        chapter={chapter}
        color={subject.color}
        examHref={hasExam(chapter.id) ? `/${subject.id}/${gradeNum}/${chapter.slug}/exam` : undefined}
      />
    </main>
  )
}
