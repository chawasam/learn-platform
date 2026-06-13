'use client'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Props {
  min?: number
  max?: number
  step?: number
  initialValue?: number
  onChange?: (value: number) => void
  onStateChange?: (state: Record<string, unknown>) => void   // for LessonStory goal gating
  readOnly?: boolean
  targetValue?: number
  markers?: number[]
  showFraction?: boolean
  numerator?: number
  denominator?: number
}

export default function NumberLine({
  min = 0,
  max = 10,
  step = 1,
  initialValue = 0,
  onChange,
  onStateChange,
  readOnly = false,
  targetValue,
  markers,
}: Props) {
  const [value, setValue] = useState(initialValue)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const PAD = 24
  const W = 300, H = 90
  const lineY = 50

  const valToX = useCallback(
    (v: number) => PAD + ((v - min) / (max - min)) * (W - PAD * 2),
    [min, max]
  )

  const toValue = useCallback(
    (clientX: number) => {
      const rect = svgRef.current!.getBoundingClientRect()
      const scale = W / rect.width
      const x = (clientX - rect.left) * scale
      const frac = (x - PAD) / (W - PAD * 2)
      const raw = min + frac * (max - min)
      const snapped = Math.round(raw / step) * step
      return Math.max(min, Math.min(max, parseFloat(snapped.toFixed(4))))
    },
    [min, max, step]
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    if (readOnly) return
    dragging.current = true
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    const v = toValue(e.clientX)
    setValue(v)
    onChange?.(v)
    onStateChange?.({ value: v })
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || readOnly) return
    const v = toValue(e.clientX)
    setValue(v)
    onChange?.(v)
    onStateChange?.({ value: v })
  }
  const handlePointerUp = () => { dragging.current = false }

  const isCorrect = targetValue !== undefined && Math.abs(value - targetValue) < step * 0.5

  // Build ticks
  const ticks: number[] = []
  const count = Math.round((max - min) / step)
  for (let i = 0; i <= count; i++) {
    ticks.push(parseFloat((min + i * step).toFixed(4)))
  }

  const showMarkers = markers ?? ticks.filter((_, i) => i % Math.max(1, Math.floor(ticks.length / 11)) === 0 || _ === max)

  const vx = valToX(value)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          width={W}
          height={H}
          style={{ touchAction: 'none', cursor: readOnly ? 'default' : 'pointer', overflow: 'visible' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Track background */}
          <rect x={PAD} y={lineY - 5} width={W - PAD * 2} height={10} rx={5} fill="#F3F4F6" />
          {/* Filled */}
          {value > min && (
            <rect
              x={PAD} y={lineY - 5}
              width={Math.max(0, vx - PAD)} height={10}
              rx={5} fill="#4F80FF" opacity={0.3}
            />
          )}

          {/* Ticks */}
          {ticks.map(v => {
            const x = valToX(v)
            const isMarker = showMarkers.includes(v)
            return (
              <g key={v}>
                <line
                  x1={x} y1={lineY + 5} x2={x} y2={lineY + (isMarker ? 14 : 9)}
                  stroke={isMarker ? '#6B7280' : '#D1D5DB'} strokeWidth={isMarker ? 2 : 1}
                />
                {isMarker && (
                  <text
                    x={x} y={lineY + 26}
                    textAnchor="middle" fontSize={10} fill="#6B7280"
                  >
                    {v % 1 === 0 ? v : v.toFixed(step < 0.1 ? 2 : 1)}
                  </text>
                )}
              </g>
            )
          })}

          {/* Target marker */}
          {targetValue !== undefined && (
            <g>
              <circle
                cx={valToX(targetValue)} cy={lineY} r={9}
                fill="none" stroke="#22C55E" strokeWidth={2.5} strokeDasharray="4,2"
              />
              <text
                x={valToX(targetValue)} y={lineY - 18}
                textAnchor="middle" fontSize={10} fill="#22C55E"
              >
                ?
              </text>
            </g>
          )}

          {/* Draggable marker */}
          <motion.g animate={{ x: vx - PAD }} style={{ x: vx - PAD }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
            <circle
              cx={PAD} cy={lineY} r={13}
              fill="#4F80FF" stroke="#fff" strokeWidth={2.5}
              style={{ cursor: readOnly ? 'default' : 'grab' }}
            />
            <text
              x={PAD} y={lineY + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={10} fill="#fff" fontWeight="bold"
            >
              {value % 1 === 0 ? value : value.toFixed(step < 0.1 ? 2 : 1)}
            </text>
          </motion.g>
        </svg>
        {isCorrect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            ✓
          </motion.div>
        )}
      </div>
      {!readOnly && (
        <p className="text-xs" style={{ color: 'var(--muted)' }}>ลากเพื่อเลือกค่า</p>
      )}
    </div>
  )
}
