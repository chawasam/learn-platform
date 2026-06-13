'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Tap each side or each corner to count it — the shape's sides/angles light up
// one at a time so kids build the side/angle count themselves. Reports
// { sides } or { angles } via onStateChange for goal gating.

interface Props {
  shape?: 'triangle' | 'square' | 'rectangle' | 'pentagon' | 'circle'
  count?: 'sides' | 'angles' | 'none'
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

// regular polygon vertices, rounded so SSR and browser agree (no hydration drift)
function regular(n: number, r = 72): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const rad = ((-90 + (i * 360) / n) * Math.PI) / 180
    return [Math.round(100 + r * Math.cos(rad)), Math.round(100 + r * Math.sin(rad))]
  })
}

const SHAPES: Record<string, { pts: [number, number][]; name: string }> = {
  triangle: { pts: regular(3), name: 'สามเหลี่ยม' },
  square: { pts: [[40, 40], [160, 40], [160, 160], [40, 160]], name: 'สี่เหลี่ยมจัตุรัส' },
  rectangle: { pts: [[28, 58], [172, 58], [172, 142], [28, 142]], name: 'สี่เหลี่ยมผืนผ้า' },
  pentagon: { pts: regular(5), name: 'ห้าเหลี่ยม' },
  circle: { pts: [], name: 'วงกลม' },
}

export default function ShapeExplorer({
  shape = 'triangle', count = 'none', readOnly = false, onStateChange,
}: Props) {
  const def = SHAPES[shape]
  const n = def.pts.length
  const [tapped, setTapped] = useState<Set<number>>(new Set())

  const all = new Set(Array.from({ length: n }, (_, i) => i))
  const active = readOnly && count !== 'none' ? all : tapped

  useEffect(() => {
    if (count === 'sides') onStateChange?.({ sides: active.size })
    else if (count === 'angles') onStateChange?.({ angles: active.size })
    else onStateChange?.({ shape })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.size, count, shape, onStateChange])

  const tap = (i: number) => {
    if (readOnly || count === 'none') return
    setTapped(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  const poly = def.pts.map(p => p.join(',')).join(' ')
  const color = count === 'angles' ? '#A855F7' : '#4F80FF'

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <svg viewBox="0 0 200 200" width={240} height={240}>
        {shape === 'circle' ? (
          <circle cx={100} cy={100} r={72} fill="#4F80FF18" stroke="#4F80FF" strokeWidth={4} />
        ) : (
          <>
            <polygon points={poly} fill={color + '14'} stroke="#CBD5E1" strokeWidth={2} />
            {/* clickable sides */}
            {count === 'sides' && def.pts.map((p, i) => {
              const q = def.pts[(i + 1) % n]
              const on = active.has(i)
              return (
                <line
                  key={`s${i}`}
                  x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]}
                  stroke={on ? color : '#94A3B8'}
                  strokeWidth={on ? 9 : 5}
                  strokeLinecap="round"
                  style={{ cursor: readOnly ? 'default' : 'pointer' }}
                  onPointerDown={() => tap(i)}
                />
              )
            })}
            {/* clickable corners */}
            {count === 'angles' && def.pts.map((p, i) => {
              const on = active.has(i)
              return (
                <motion.circle
                  key={`a${i}`}
                  cx={p[0]} cy={p[1]} r={on ? 12 : 9}
                  fill={on ? color : '#94A3B8'}
                  animate={{ scale: on ? 1.1 : 1 }}
                  style={{ cursor: readOnly ? 'default' : 'pointer' }}
                  onPointerDown={() => tap(i)}
                />
              )
            })}
          </>
        )}
      </svg>

      <p className="text-base font-bold" style={{ color: '#1E3A5F' }}>{def.name}</p>

      {count !== 'none' && (
        <div className="px-5 py-2 rounded-xl font-bold text-lg" style={{ background: color + '18', color }}>
          {count === 'sides' ? 'ด้าน' : 'มุม'}: {active.size}
        </div>
      )}
      {!readOnly && count !== 'none' && (
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          แตะ{count === 'sides' ? 'เส้นรอบรูปทีละด้าน' : 'จุดมุมทีละจุด'}เพื่อนับ
        </p>
      )}
    </div>
  )
}
