'use client'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface BarData {
  label: string
  value: number
  color?: string
}

interface Props {
  initialData: BarData[]
  maxValue?: number
  onChange?: (data: BarData[]) => void
  onStateChange?: (state: Record<string, unknown>) => void   // for LessonStory goal gating
  readOnly?: boolean
  targetData?: BarData[]
  yLabel?: string
}

const DEFAULT_COLORS = ['#4F80FF', '#FF7A2F', '#22C55E', '#8B5CF6', '#F59E0B', '#EC4899']

export default function BarChartDrag({
  initialData,
  maxValue = 100,
  onChange,
  onStateChange,
  readOnly = false,
  targetData,
  yLabel = 'จำนวน',
}: Props) {
  const [data, setData] = useState<BarData[]>(initialData)
  const svgRef = useRef<SVGSVGElement>(null)
  const activeBar = useRef<number | null>(null)

  const PAD_L = 40, PAD_R = 16, PAD_T = 16, PAD_B = 48
  const W = 300, H = 220
  const chartW = W - PAD_L - PAD_R
  const chartH = H - PAD_T - PAD_B
  const barW = Math.min(50, (chartW / data.length) * 0.6)
  const gap = chartW / data.length

  const toValue = useCallback(
    (clientY: number) => {
      const rect = svgRef.current!.getBoundingClientRect()
      const scaleY = H / rect.height
      const y = (clientY - rect.top) * scaleY
      const frac = 1 - (y - PAD_T) / chartH
      return Math.max(0, Math.min(maxValue, Math.round(frac * maxValue)))
    },
    [maxValue, chartH]
  )

  const handlePointerDown = (idx: number) => (e: React.PointerEvent) => {
    if (readOnly) return
    activeBar.current = idx
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    const v = toValue(e.clientY)
    updateBar(idx, v)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (activeBar.current === null || readOnly) return
    const v = toValue(e.clientY)
    updateBar(activeBar.current, v)
  }

  const handlePointerUp = () => { activeBar.current = null }

  const updateBar = (idx: number, value: number) => {
    const next = data.map((d, i) => i === idx ? { ...d, value } : d)
    setData(next)
    onChange?.(next)
    const matches = targetData !== undefined &&
      next.every((d, i) => Math.abs(d.value - (targetData[i]?.value ?? 0)) < 0.5)
    onStateChange?.({ correct: matches ? 1 : 0 })
  }

  const isCorrect = targetData !== undefined &&
    data.every((d, i) => Math.abs(d.value - (targetData[i]?.value ?? 0)) < 0.5)

  // Y-axis ticks
  const yTicks = [0, 25, 50, 75, 100].map(p => Math.round((p / 100) * maxValue))

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          width={W}
          height={H}
          style={{ touchAction: 'none', overflow: 'visible' }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Y gridlines */}
          {yTicks.map(v => {
            const y = PAD_T + chartH - (v / maxValue) * chartH
            return (
              <g key={v}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y}
                  stroke="#F3F4F6" strokeWidth={1} />
                <text x={PAD_L - 5} y={y + 4} textAnchor="end" fontSize={10} fill="#9CA3AF">
                  {v}
                </text>
              </g>
            )
          })}

          {/* Axes */}
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#E5E7EB" strokeWidth={2} />
          <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#E5E7EB" strokeWidth={2} />

          {/* y-label */}
          <text
            x={10} y={H / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize={10} fill="#9CA3AF"
            transform={`rotate(-90, 10, ${H / 2})`}
          >
            {yLabel}
          </text>

          {/* Bars */}
          {data.map((d, i) => {
            const barH = (d.value / maxValue) * chartH
            const x = PAD_L + gap * i + gap / 2 - barW / 2
            const y = PAD_T + chartH - barH
            const color = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]

            return (
              <g key={i}>
                {/* Target ghost */}
                {targetData && (
                  <rect
                    x={x} y={PAD_T + chartH - (targetData[i]?.value / maxValue) * chartH}
                    width={barW}
                    height={(targetData[i]?.value / maxValue) * chartH}
                    fill={color} opacity={0.15} rx={4}
                  />
                )}

                {/* Bar */}
                <motion.rect
                  x={x}
                  animate={{ y, height: Math.max(2, barH) }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  width={barW}
                  rx={4}
                  fill={color}
                  style={{ cursor: readOnly ? 'default' : 'ns-resize' }}
                  onPointerDown={handlePointerDown(i)}
                />

                {/* Value label */}
                <motion.text
                  animate={{ y: y - 5 }}
                  x={x + barW / 2}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight="bold"
                  fill={color}
                >
                  {d.value}
                </motion.text>

                {/* Drag handle */}
                {!readOnly && (
                  <rect
                    x={x + barW / 4}
                    y={y - 6}
                    width={barW / 2}
                    height={12}
                    rx={3}
                    fill={color}
                    opacity={0.5}
                    style={{ cursor: 'ns-resize' }}
                    onPointerDown={handlePointerDown(i)}
                  />
                )}

                {/* X label */}
                <text
                  x={x + barW / 2}
                  y={H - PAD_B + 14}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#6B7280"
                >
                  {d.label}
                </text>
              </g>
            )
          })}
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
        <p className="text-xs" style={{ color: 'var(--muted)' }}>ลากแท่งกราฟขึ้น-ลงเพื่อเปลี่ยนค่า</p>
      )}
    </div>
  )
}
