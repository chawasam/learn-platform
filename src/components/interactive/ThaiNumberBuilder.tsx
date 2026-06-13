'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Place-value builder up to 6 digits (หน่วย→แสน) with live Thai number reading.
// The whole point of this chapter: see the number AND hear how it reads in Thai
// as you build it, place by place. Reports { value } via onStateChange for goals.

interface Props {
  initialValue?: number
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

// หลักจากซ้าย (สูงสุด) → ขวา (ต่ำสุด)
const PLACES = [
  { name: 'แสน', value: 100000, color: '#EC4899' },
  { name: 'หมื่น', value: 10000, color: '#A855F7' },
  { name: 'พัน', value: 1000, color: '#8B5CF6' },
  { name: 'ร้อย', value: 100, color: '#4F80FF' },
  { name: 'สิบ', value: 10, color: '#FF7A2F' },
  { name: 'หน่วย', value: 1, color: '#22C55E' },
]
const LEN = PLACES.length

const DIGIT_WORDS = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
const PLACE_WORDS = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน']

// อ่านจำนวนเต็ม 0–999,999 เป็นคำไทยตามกฎจริง (เอ็ด/ยี่สิบ/สิบ)
function readThai(n: number): string {
  if (n === 0) return 'ศูนย์'
  const s = String(n)
  const len = s.length
  let out = ''
  for (let i = 0; i < len; i++) {
    const d = Number(s[i])
    const place = len - 1 - i // 0 = หน่วย, 1 = สิบ, ...
    if (d === 0) continue
    if (place === 1) {
      out += d === 1 ? 'สิบ' : d === 2 ? 'ยี่สิบ' : DIGIT_WORDS[d] + 'สิบ'
    } else if (place === 0) {
      out += d === 1 && len > 1 ? 'เอ็ด' : DIGIT_WORDS[d]
    } else {
      out += DIGIT_WORDS[d] + PLACE_WORDS[place]
    }
  }
  return out
}

function toDigits(value: number): number[] {
  const v = Math.max(0, Math.min(999999, value))
  return PLACES.map(p => Math.floor(v / p.value) % 10)
}

export default function ThaiNumberBuilder({
  initialValue = 0,
  readOnly = false,
  onStateChange,
}: Props) {
  const [digits, setDigits] = useState<number[]>(() => toDigits(initialValue))

  const value = digits.reduce((sum, d, i) => sum + d * PLACES[i].value, 0)

  useEffect(() => {
    onStateChange?.({ value })
  }, [value, onStateChange])

  const setDigit = (idx: number, d: number) => {
    if (readOnly) return
    setDigits(prev => prev.map((cur, i) => (i === idx ? Math.max(0, Math.min(9, d)) : cur)))
  }

  return (
    <div className="flex flex-col items-center gap-5 select-none">
      {/* Place columns */}
      <div className="flex gap-1.5 items-end">
        {PLACES.map((p, idx) => (
          <div key={p.name} className="flex flex-col items-center gap-1.5">
            {!readOnly && (
              <button
                onClick={() => setDigit(idx, digits[idx] + 1)}
                className="w-8 h-7 rounded-lg font-bold text-white text-sm hover:opacity-80 transition-opacity disabled:opacity-25"
                style={{ background: p.color }}
                disabled={digits[idx] >= 9}
                aria-label={`เพิ่มหลัก${p.name}`}
              >+</button>
            )}
            <motion.div
              key={`${idx}-${digits[idx]}`}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              className="w-11 h-14 rounded-xl flex items-center justify-center text-3xl font-bold border-2 shadow-sm"
              style={{
                background: digits[idx] > 0 ? p.color + '18' : '#F9FAFB',
                borderColor: p.color,
                color: p.color,
              }}
            >
              {digits[idx]}
            </motion.div>
            {!readOnly && (
              <button
                onClick={() => setDigit(idx, digits[idx] - 1)}
                className="w-8 h-7 rounded-lg bg-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-25"
                disabled={digits[idx] <= 0}
                aria-label={`ลดหลัก${p.name}`}
              >−</button>
            )}
            <span className="text-[11px] font-semibold" style={{ color: p.color }}>
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* Number with comma grouping */}
      <div className="bg-white rounded-2xl px-7 py-3 shadow-md border-2 border-gray-100 text-center">
        <span className="text-4xl font-bold tracking-wide" style={{ color: '#374151' }}>
          {value.toLocaleString('en-US')}
        </span>
      </div>

      {/* Live Thai reading — the heart of the chapter */}
      <div className="flex items-center gap-2 min-h-9">
        <span className="text-2xl">🗣️</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="text-xl font-bold"
            style={{ color: '#1E3A5F' }}
          >
            “{readThai(value)}”
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
