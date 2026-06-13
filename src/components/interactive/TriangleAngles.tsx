'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Triangle angle sum: tap "รวมมุม" to tear the 3 corners off and line them up —
// they always make a straight line = 180°. Reports { combined } for goal gating.

interface Props {
  a?: number
  b?: number
  c?: number          // a+b+c must = 180
  readOnly?: boolean
  combined?: boolean  // start already combined (readOnly recap)
  onStateChange?: (state: Record<string, unknown>) => void
}

const COLORS = ['#EF4444', '#3B82F6', '#22C55E']

export default function TriangleAngles({
  a = 50, b = 60, c = 70, readOnly = false, combined = false, onStateChange,
}: Props) {
  const [merged, setMerged] = useState(combined)
  const angles = [a, b, c]
  useEffect(() => { onStateChange?.({ combined: merged ? 1 : 0 }) }, [merged, onStateChange])

  // triangle vertices (viewBox 240x170)
  const V = [[120, 25], [210, 145], [30, 145]] as const

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      {!merged ? (
        <svg viewBox="0 0 240 170" width={250} height={180}>
          <polygon points={V.map(p => p.join(',')).join(' ')} fill="#F8FAFC" stroke="#CBD5E1" strokeWidth={2} />
          {V.map((v, i) => (
            <g key={i}>
              <circle cx={v[0]} cy={v[1]} r={16} fill={COLORS[i] + '33'} stroke={COLORS[i]} strokeWidth={2} />
              <text x={v[0]} y={v[1] + 4} textAnchor="middle" fontSize={12} fontWeight="bold" fill={COLORS[i]}>{angles[i]}°</text>
            </g>
          ))}
        </svg>
      ) : (
        <svg viewBox="0 0 240 130" width={250} height={140}>
          {/* straight line */}
          <line x1={20} y1={110} x2={220} y2={110} stroke="#94A3B8" strokeWidth={2} />
          {/* three angle wedges laid side by side summing to a half-turn */}
          {(() => {
            let start = 180 // degrees, measured from +x going CCW; semicircle 180→0
            const cx = 120, cy = 110, r = 80
            return angles.map((ang, i) => {
              const a0 = start, a1 = start - ang
              start = a1
              const p0 = [cx + r * Math.cos(a0 * Math.PI / 180), cy - r * Math.sin(a0 * Math.PI / 180)]
              const p1 = [cx + r * Math.cos(a1 * Math.PI / 180), cy - r * Math.sin(a1 * Math.PI / 180)]
              return (
                <motion.path key={i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.25 }}
                  d={`M ${cx} ${cy} L ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${r} ${r} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Z`}
                  fill={COLORS[i] + '55'} stroke={COLORS[i]} strokeWidth={2} />
              )
            })
          })()}
          <text x={120} y={128} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#1E3A5F">
            {a} + {b} + {c} = 180° (เส้นตรง)
          </text>
        </svg>
      )}

      <p className="text-base font-bold" style={{ color: merged ? '#22C55E' : '#1E3A5F' }}>
        {merged ? '3 มุมต่อกัน = เส้นตรง = 180° เสมอ!' : 'สามเหลี่ยม 3 มุม'}
      </p>

      {!readOnly && (
        <button onClick={() => setMerged(m => !m)}
          className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85"
          style={{ background: merged ? '#94A3B8' : '#A855F7' }}>
          {merged ? '↺ ดูสามเหลี่ยม' : '✂️ รวม 3 มุม'}
        </button>
      )}
    </div>
  )
}
