'use client'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Props {
  initialHour?: number
  initialMinute?: number
  onChange?: (h: number, m: number) => void
  onStateChange?: (state: Record<string, unknown>) => void   // for LessonStory goal gating
  readOnly?: boolean
  targetHour?: number
  targetMinute?: number
}

export default function ClockDrag({
  initialHour = 3,
  initialMinute = 0,
  onChange,
  onStateChange,
  readOnly = false,
  targetHour,
  targetMinute,
}: Props) {
  const [hour, setHour] = useState(initialHour)
  const [minute, setMinute] = useState(initialMinute)
  const [dragging, setDragging] = useState<'hour' | 'minute' | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const cx = 100, cy = 100, r = 82
  // Round SVG coords so prerender (Node V8) and hydration (browser V8) emit
  // identical attribute strings — trig ulp differences otherwise cause a
  // hydration mismatch on this clock (the only trig-heavy interactive).
  const R = (n: number) => Math.round(n * 1000) / 1000

  const toAngle = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const x = clientX - rect.left - (rect.width / 200) * cx
    const y = clientY - rect.top - (rect.height / 200) * cy
    const angle = Math.atan2(x, -y) * (180 / Math.PI)
    return (angle + 360) % 360
  }, [])

  const handlePointerMove = (e: React.PointerEvent<SVGElement>) => {
    if (!dragging || readOnly) return
    const angle = toAngle(e.clientX, e.clientY)
    if (dragging === 'hour') {
      const h = Math.round(angle / 30) % 12 || 12
      setHour(h)
      onChange?.(h, minute)
      onStateChange?.({ hour: h, minute })
    } else {
      const m = Math.round(angle / 6) % 60
      setMinute(m)
      onChange?.(hour, m)
      onStateChange?.({ hour, minute: m })
    }
  }

  const makeHandPointerDown = (hand: 'hour' | 'minute') => (e: React.PointerEvent) => {
    if (readOnly) return
    e.stopPropagation()
    setDragging(hand)
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  }

  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30 - 90
  const minuteAngle = (minute / 60) * 360 - 90

  const handEnd = (angle: number, length: number) => ({
    x: R(cx + length * Math.cos((angle * Math.PI) / 180)),
    y: R(cy + length * Math.sin((angle * Math.PI) / 180)),
  })

  const hourTip = handEnd(hourAngle, 44)
  const minuteTip = handEnd(minuteAngle, 62)

  const isCorrect =
    targetHour !== undefined &&
    targetMinute !== undefined &&
    hour === targetHour &&
    minute === targetMinute

  const pad = (n: number) => String(n).padStart(2, '0')

  const markers = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * 360 - 90
    const major = i % 5 === 0
    const inner = major ? r - 14 : r - 7
    return {
      x1: R(cx + inner * Math.cos((a * Math.PI) / 180)),
      y1: R(cy + inner * Math.sin((a * Math.PI) / 180)),
      x2: R(cx + (r - 2) * Math.cos((a * Math.PI) / 180)),
      y2: R(cy + (r - 2) * Math.sin((a * Math.PI) / 180)),
      major,
      label: major ? i / 5 || 12 : null,
      labelX: R(cx + (r - 24) * Math.cos((a * Math.PI) / 180)),
      labelY: R(cy + (r - 24) * Math.sin((a * Math.PI) / 180)),
    }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          width={220}
          height={220}
          style={{ touchAction: 'none' }}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setDragging(null)}
        >
          <circle cx={cx} cy={cy} r={r} fill="#FAFAFA" stroke="#E5E7EB" strokeWidth={3} />
          {markers.map((m, i) => (
            <g key={i}>
              <line
                x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
                stroke={m.major ? '#374151' : '#D1D5DB'}
                strokeWidth={m.major ? 2.5 : 1.5}
                strokeLinecap="round"
              />
              {m.major && m.label && (
                <text
                  x={m.labelX} y={m.labelY}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={10} fill="#374151" fontWeight="600"
                >
                  {m.label}
                </text>
              )}
            </g>
          ))}
          {/* Hour hand */}
          <line
            x1={cx} y1={cy} x2={hourTip.x} y2={hourTip.y}
            stroke="#1E293B" strokeWidth={6} strokeLinecap="round"
            style={{ cursor: readOnly ? 'default' : 'grab' }}
            onPointerDown={makeHandPointerDown('hour')}
          />
          {/* Minute hand */}
          <line
            x1={cx} y1={cy} x2={minuteTip.x} y2={minuteTip.y}
            stroke="#4F80FF" strokeWidth={4} strokeLinecap="round"
            style={{ cursor: readOnly ? 'default' : 'grab' }}
            onPointerDown={makeHandPointerDown('minute')}
          />
          <circle cx={cx} cy={cy} r={6} fill="#FF7A2F" />
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
      <motion.div
        key={`${hour}:${minute}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="bg-white rounded-2xl px-8 py-3 shadow-md border-2 border-blue-200">
          <span className="text-4xl font-bold font-mono" style={{ color: '#4F80FF' }}>
            {pad(hour)}:{pad(minute)}
          </span>
        </div>
        {!readOnly && (
          <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
            ลากเข็มสั้น (ชั่วโมง) และเข็มยาว (นาที)
          </p>
        )}
      </motion.div>
    </div>
  )
}
