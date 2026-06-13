'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { AnyChapter, SubjectMeta } from '@/types/curriculum'
import { isChapterV2 } from '@/types/curriculum'
import ExplainTab from '@/components/lesson/ExplainTab'
import DemoTab from '@/components/lesson/DemoTab'
import PracticeTab from '@/components/lesson/PracticeTab'
import LessonStory from '@/components/lesson/LessonStory'
import { GRADE_LABEL } from '@/types/curriculum'

type Tab = 'explain' | 'demo' | 'practice'

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'explain',  label: 'อธิบาย',  emoji: '📚' },
  { id: 'demo',     label: 'สาธิต',   emoji: '🎮' },
  { id: 'practice', label: 'ฝึกหัด',  emoji: '✏️' },
]

interface Props {
  chapter: AnyChapter
  subject: SubjectMeta
  gradeNum: number
}

export default function ChapterView({ chapter, subject, gradeNum }: Props) {
  const [tab, setTab] = useState<Tab>('explain')

  const header = (
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
  )

  // v2 story-based lesson — single continuous flow, no tabs
  if (isChapterV2(chapter)) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-6">
        {header}
        <LessonStory chapter={chapter} color={subject.color} />
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      {header}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all relative"
            style={{ color: tab === t.id ? '#fff' : 'var(--muted)' }}
          >
            {tab === t.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-xl"
                style={{ background: subject.color }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.emoji} {t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {tab === 'explain' && <ExplainTab blocks={chapter.explain} />}
          {tab === 'demo' && (
            <DemoTab
              component={chapter.demo.component}
              config={chapter.demo.config}
              steps={chapter.demo.steps}
            />
          )}
          {tab === 'practice' && <PracticeTab questions={chapter.practice} />}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
