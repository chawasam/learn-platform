'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Factors: tap every number that divides n evenly. Wrong taps shake. Builds the
// full factor list so kids find divisors themselves. Reports { found, complete }.

interface Props {
  n?: number
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

function factorsOf(n: number): number[] {
  const f: number[] = []
  for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i)
  return f
}

export default function FactorBuilder({ n = 12, readOnly = false, onStateChange }: Props) {
  const allFactors = factorsOf(n)
  const [found, setFound] = useState<Set<number>>(() => readOnly ? new Set(allFactors) : new Set())
  const [shake, setShake] = useState(0)
  const complete = found.size === allFactors.length

  useEffect(() => { onStateChange?.({ found: found.size, complete: complete ? 1 : 0 }) }, [found, complete, onStateChange])

  const tap = (i: number) => {
    if (readOnly) return
    if (n % i === 0) setFound(prev => new Set(prev).add(i))
    else setShake(i)
  }

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>แตะตัวเลขที่หาร {n} ลงตัว</p>
      <div className="grid grid-cols-6 gap-1.5" style={{ maxWidth: 280 }}>
        {Array.from({ length: n }, (_, idx) => {
          const i = idx + 1
          const isFound = found.has(i)
          const isWrong = shake === i
          return (
            <motion.button
              key={i}
              onClick={() => tap(i)}
              animate={isWrong ? { x: [0, -4, 4, 0] } : {}}
              onAnimationComplete={() => isWrong && setShake(0)}
              className="w-10 h-10 rounded-lg font-bold text-sm border-2 transition-colors"
              style={{
                background: isFound ? '#22C55E' : 'white',
                color: isFound ? 'white' : '#64748B',
                borderColor: isFound ? '#16A34A' : '#E2E8F0',
              }}
            >{i}</motion.button>
          )
        })}
      </div>
      <div className="px-4 py-2 rounded-xl font-bold"
        style={{ background: complete ? '#F0FDF4' : '#F1F5F9', color: complete ? '#22C55E' : '#1E3A5F' }}>
        ตัวประกอบของ {n}: {allFactors.filter(f => found.has(f)).join(', ') || '—'}
        {complete && ' ✓ ครบ!'}
      </div>
    </div>
  )
}
