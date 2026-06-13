'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DragItem {
  id: string
  label: string
  targetSlot: string
}

interface Slot {
  id: string
  label: string
}

interface Props {
  q: string
  items: DragItem[]
  slots?: Slot[]
  hint: string
  onCorrect?: () => void
  onAnswered?: (correct: boolean) => void
  questionNumber?: number
}

export default function QuizDragPlace({ q, items, slots, hint, onCorrect, onAnswered, questionNumber }: Props) {
  const derivedSlots: Slot[] = slots ?? [...new Set(items.map(i => i.targetSlot))].map(id => ({ id, label: id }))

  const [placed, setPlaced] = useState<Record<string, string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const unplaced = items.filter(item => !Object.values(placed).flat().includes(item.id))

  const placeItem = (itemId: string, slotId: string) => {
    if (submitted) return
    setPlaced(prev => {
      const next = { ...prev }
      // remove from any current slot
      for (const sid of Object.keys(next)) {
        next[sid] = next[sid].filter(id => id !== itemId)
      }
      next[slotId] = [...(next[slotId] ?? []), itemId]
      return next
    })
  }

  const removeItem = (itemId: string) => {
    if (submitted) return
    setPlaced(prev => {
      const next = { ...prev }
      for (const sid of Object.keys(next)) {
        next[sid] = next[sid].filter(id => id !== itemId)
      }
      return next
    })
  }

  const checkAnswer = () => {
    const allCorrect = items.every(item => (placed[item.targetSlot] ?? []).includes(item.id))
    setSubmitted(true)
    if (allCorrect) onCorrect?.()
    onAnswered?.(allCorrect)
    return allCorrect
  }

  const allPlaced = unplaced.length === 0

  const isItemCorrect = (itemId: string, slotId: string) => {
    const item = items.find(i => i.id === itemId)
    return item?.targetSlot === slotId
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {questionNumber !== undefined && (
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex items-center justify-center">
            {questionNumber}
          </span>
        )}
        <p className="text-base font-medium leading-relaxed pt-0.5">{q}</p>
      </div>

      {/* Unplaced items bank */}
      {unplaced.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-3 border border-dashed border-gray-300">
          <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>แตะเพื่อเลือก แล้วแตะช่องที่ต้องการ</p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map(item => (
              <motion.button
                key={item.id}
                layout
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg bg-white border-2 border-blue-300 text-sm font-bold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Target slots */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(derivedSlots.length, 3)}, 1fr)` }}>
        {derivedSlots.map(slot => {
          const slotItems = (placed[slot.id] ?? []).map(id => items.find(i => i.id === id)!)
          return (
            <div key={slot.id} className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-center" style={{ color: 'var(--muted)' }}>{slot.label}</p>
              <div
                className="min-h-16 rounded-xl border-2 border-dashed p-2 flex flex-wrap gap-1 items-start content-start transition-colors"
                style={{ borderColor: submitted ? '#E5E7EB' : '#D1D5DB', background: '#F9FAFB' }}
                onClick={() => {
                  /* handled by item buttons */
                }}
              >
                <AnimatePresence>
                  {slotItems.map(item => (
                    <motion.button
                      key={item.id}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={() => !submitted && removeItem(item.id)}
                      className="px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm"
                      style={{
                        background: submitted
                          ? isItemCorrect(item.id, slot.id) ? '#22C55E' : '#EF4444'
                          : '#4F80FF',
                        cursor: submitted ? 'default' : 'pointer',
                      }}
                    >
                      {item.label}
                      {!submitted && <span className="ml-1 opacity-60">✕</span>}
                      {submitted && (isItemCorrect(item.id, slot.id) ? ' ✓' : ' ✗')}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick place: click item then click slot */}
      {!submitted && unplaced.length > 0 && derivedSlots.length > 1 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>หรือกด "วาง" ใต้แต่ละช่อง:</p>
          {unplaced.slice(0, 3).map(item => (
            <div key={item.id} className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-white border-2 border-blue-300 text-sm font-bold text-blue-600">
                {item.label}
              </span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>→</span>
              {derivedSlots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => placeItem(item.id, slot.id)}
                  className="px-2 py-1 rounded-lg bg-gray-100 text-xs hover:bg-gray-200 transition-colors"
                >
                  {slot.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {!submitted && allPlaced && (
        <button
          onClick={checkAnswer}
          className="px-6 py-3 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-colors self-start"
        >
          ตรวจคำตอบ
        </button>
      )}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              items.every(item => isItemCorrect(item.id, Object.keys(placed).find(sid => placed[sid].includes(item.id)) ?? ''))
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {items.every(item => isItemCorrect(item.id, Object.keys(placed).find(sid => placed[sid].includes(item.id)) ?? ''))
              ? '🎉 ถูกต้องทั้งหมด!'
              : '❌ บางอันยังไม่ถูก — ดูที่สีแดง'}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div>
          {showHint ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
              💡 {hint}
            </motion.div>
          ) : (
            <button onClick={() => setShowHint(true)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              style={{ color: 'var(--muted)' }}>
              💡 ดูคำใบ้
            </button>
          )}
        </div>
      )}
    </div>
  )
}
