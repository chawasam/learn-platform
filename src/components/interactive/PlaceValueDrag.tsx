'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Place = 'ones' | 'tens' | 'hundreds' | 'thousands' | 'tenths' | 'hundredths'

const PLACE_CONFIG: Record<Place, { label: string; thaiLabel: string; color: string; value: number }> = {
  thousands: { label: 'พัน', thaiLabel: 'หลักพัน', color: '#8B5CF6', value: 1000 },
  hundreds:  { label: 'ร้อย', thaiLabel: 'หลักร้อย', color: '#4F80FF', value: 100 },
  tens:      { label: 'สิบ', thaiLabel: 'หลักสิบ', color: '#FF7A2F', value: 10 },
  ones:      { label: 'หน่วย', thaiLabel: 'หลักหน่วย', color: '#22C55E', value: 1 },
  tenths:    { label: '1/10', thaiLabel: 'ทศนิยมตำแหน่งที่ 1', color: '#F59E0B', value: 0.1 },
  hundredths:{ label: '1/100', thaiLabel: 'ทศนิยมตำแหน่งที่ 2', color: '#EC4899', value: 0.01 },
}

interface Props {
  places?: Place[]
  onChange?: (value: number) => void
  onStateChange?: (state: Record<string, unknown>) => void   // for LessonStory goal gating
  readOnly?: boolean
  targetValue?: number
  initialDigits?: Partial<Record<Place, number>>
}

export default function PlaceValueDrag({
  places = ['thousands', 'hundreds', 'tens', 'ones'],
  onChange,
  onStateChange,
  readOnly = false,
  targetValue,
  initialDigits = {},
}: Props) {
  const [digits, setDigits] = useState<Partial<Record<Place, number>>>(initialDigits)

  const total = places.reduce((sum, p) => sum + (digits[p] ?? 0) * PLACE_CONFIG[p].value, 0)

  const setDigit = (place: Place, d: number) => {
    if (readOnly) return
    const next = { ...digits, [place]: d }
    setDigits(next)
    const newTotal = places.reduce((sum, p) => sum + (next[p] ?? 0) * PLACE_CONFIG[p].value, 0)
    onChange?.(newTotal)
    onStateChange?.({ value: newTotal })
  }

  const isCorrect = targetValue !== undefined && Math.abs(total - targetValue) < 0.001

  const totalDisplay = places.some(p => p === 'tenths' || p === 'hundredths')
    ? total.toFixed(places.includes('hundredths') ? 2 : 1)
    : total.toString()

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Place value slots */}
      <div className="flex gap-2 items-end">
        {places.map((place, idx) => {
          const cfg = PLACE_CONFIG[place]
          const digit = digits[place] ?? 0
          return (
            <div key={place} className="flex flex-col items-center gap-1">
              {/* Digit blocks stack */}
              <div className="relative h-24 w-14 flex flex-col-reverse items-center gap-0.5 overflow-hidden">
                <AnimatePresence>
                  {Array.from({ length: digit }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-11 h-7 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{ background: cfg.color }}
                    >
                      {cfg.label}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Digit display */}
              <motion.div
                key={digit}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold border-3 shadow-sm"
                style={{
                  background: digit > 0 ? cfg.color + '20' : '#F9FAFB',
                  borderColor: cfg.color,
                  borderWidth: 2,
                  color: cfg.color,
                }}
              >
                {digit}
              </motion.div>

              {/* Label */}
              <span className="text-xs font-semibold text-center" style={{ color: cfg.color }}>
                {cfg.label}
              </span>

              {/* +/- controls */}
              {!readOnly && (
                <div className="flex gap-1">
                  <button
                    onClick={() => setDigit(place, Math.max(0, digit - 1))}
                    className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                  >−</button>
                  <button
                    onClick={() => setDigit(place, Math.min(9, digit + 1))}
                    className="w-6 h-6 rounded-full font-bold text-sm text-white hover:opacity-80 transition-opacity"
                    style={{ background: cfg.color }}
                  >+</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Total display */}
      <div className="relative">
        <motion.div
          key={total}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl px-8 py-3 shadow-md border-2 text-center"
          style={{ borderColor: isCorrect ? '#22C55E' : '#E5E7EB' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>ค่าทั้งหมด</p>
          <span className="text-4xl font-bold" style={{ color: '#374151' }}>{totalDisplay}</span>
        </motion.div>
        {isCorrect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            ✓
          </motion.div>
        )}
      </div>
    </div>
  )
}
