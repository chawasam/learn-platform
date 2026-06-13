'use client'
import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Metaphor } from '@/types/curriculum'
import { INTERACTIVE_COMPONENTS } from '@/components/interactive/registry'

// Dual-coding "memory hook" — a vivid imagined picture + story tied to the
// concept. Multiple metaphors (Spiro: single analogy is a double-edged sword)
// are flipped through one at a time so kids aren't overloaded.

interface Props {
  metaphors: Metaphor[]
  color: string
  onClose: () => void
}

export default function MetaphorModal({ metaphors, color, onClose }: Props) {
  const [idx, setIdx] = useState(0)
  const m = metaphors[idx]
  const many = metaphors.length > 1
  const Visual = m.visual ? INTERACTIVE_COMPONENTS[m.visual.component] : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[88vh] overflow-y-auto"
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
          <span className="font-bold text-sm" style={{ color }}>💡 ภาพช่วยจำ{many ? ` (${idx + 1}/${metaphors.length})` : ''}</span>
          <button onClick={onClose} aria-label="ปิด"
            className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 font-bold text-lg flex items-center justify-center">✕</button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="p-6 flex flex-col items-center gap-4 text-center"
          >
            <h3 className="text-lg font-bold" style={{ color: '#1E3A5F' }}>{m.title}</h3>

            {/* visual: image > interactive > big emoji */}
            {m.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.image} alt={m.title} className="max-h-56 rounded-2xl object-contain" />
            ) : Visual && m.visual ? (
              <div className="bg-slate-50 rounded-2xl p-4 w-full flex justify-center">
                <Suspense fallback={<div className="h-32" />}>
                  <Visual {...m.visual.config} readOnly />
                </Suspense>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                className="text-7xl"
              >{m.emoji ?? '💡'}</motion.div>
            )}

            <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: '#374151' }}>
              {m.story}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* flip to next metaphor */}
        {many && (
          <div className="flex items-center justify-center gap-3 pb-5">
            <div className="flex gap-1.5">
              {metaphors.map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full transition-colors"
                  style={{ background: i === idx ? color : '#D1D5DB' }} />
              ))}
            </div>
            <button
              onClick={() => setIdx(i => (i + 1) % metaphors.length)}
              className="px-4 py-2 rounded-xl text-white font-bold text-sm hover:opacity-85"
              style={{ background: color }}
            >อีกแบบ →</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
