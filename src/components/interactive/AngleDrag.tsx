'use client'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Props {
  initialAngle?: number
  onChange?: (angle: number) => void
  readOnly?: boolean
  targetAngle?: number
  minAngle?: number
  maxAngle?: number
}

export default function AngleDrag({
  initialAngle = 45,
  onChange,
  readOnly = false,
  targetAngle,
  minAngle = 0,
  maxAngle = 180,
}: Props) {
  const [angle, setAngle] = useState(initialAngle)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const cx = 110, cy = 150, armLen = 90

  const toAngle = useCallback(
    (clientX: number, clientY: number) => {
      const rect = svgRef.current!.getBoundingClientRect()
      const scaleX = 240 / rect.width
      const scaleY = 200 / rect.height
      const x = (clientX - rect.left) * scaleX - cx
      const y = (clientY - rect.top) * scaleY - cy
      const deg = -Math.atan2(y, x) * (180 / Math.PI)
      return Math.max(minAngle, Math.min(maxAngle, Math.round(deg)))
    },
    [minAngle, maxAngle]
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    if (readOnly) return
    dragging.current = true
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    const a = toAngle(e.clientX, e.clientY)
    setAngle(a)
    onChange?.(a)
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || readOnly) return
    const a = toAngle(e.clientX, e.clientY)
    setAngle(a)
    onChange?.(a)
  }
  const handlePointerUp = () => { dragging.current = false }

  const rad = (angle * Math.PI) / 180
  const armX = cx + armLen * Math.cos(rad)
  const armY = cy - armLen * Math.sin(rad)

  const arcR = 32
  const arcX = cx + arcR * Math.cos(rad)
  const arcY = cy - arcR * Math.sin(rad)
  const largeArc = angle > 180 ? 1 : 0

  const isCorrect = targetAngle !== undefined && Math.abs(angle - targetAngle) <= 1

  const getLabel = (a: number) => {
    if (a === 0) return 'ไม่มีมุม'
    if (a < 90) return 'มุมแหลม'
    if (a === 90) return 'มุมฉาก ⊾'
    if (a < 180) return 'มุมป้าน'
    return 'มุมตรง'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox="0 0 240 200"
          width={260}
          height={220}
          style={{ touchAction: 'none', cursor: readOnly ? 'default' : 'crosshair' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Protractor arc background */}
          <path
            d={`M ${cx - armLen},${cy} A ${armLen},${armLen} 0 0,1 ${cx + armLen},${cy}`}
            fill="#F3F4F6" stroke="#E5E7EB" strokeWidth={1.5}
          />
          {/* Degree marks */}
          {Array.from({ length: 19 }, (_, i) => {
            const deg = i * 10
            const r2 = (deg % 30 === 0) ? armLen - 14 : armLen - 8
            const a = (deg * Math.PI) / 180
            return (
              <g key={deg}>
                <line
                  x1={cx + armLen * Math.cos(a)} y1={cy - armLen * Math.sin(a)}
                  x2={cx + r2 * Math.cos(a)} y2={cy - r2 * Math.sin(a)}
                  stroke="#9CA3AF" strokeWidth={deg % 30 === 0 ? 2 : 1}
                />
                {deg % 30 === 0 && deg > 0 && deg < 180 && (
                  <text
                    x={cx + (armLen - 22) * Math.cos(a)}
                    y={cy - (armLen - 22) * Math.sin(a)}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={9} fill="#9CA3AF"
                  >{deg}</text>
                )}
              </g>
            )
          })}
          {/* Base line */}
          <line x1={cx - armLen} y1={cy} x2={cx + armLen} y2={cy} stroke="#D1D5DB" strokeWidth={2} />
          {/* Angle arc fill */}
          {angle > 2 && (
            <path
              d={`M ${cx + arcR},${cy} A ${arcR},${arcR} 0 ${largeArc},0 ${arcX},${arcY}`}
              fill="none" stroke="#FF7A2F" strokeWidth={3}
            />
          )}
          {/* Right angle mark */}
          {angle === 90 && (
            <path d={`M ${cx + 14},${cy} L ${cx + 14},${cy - 14} L ${cx},${cy - 14}`}
              fill="none" stroke="#FF7A2F" strokeWidth={2} />
          )}
          {/* Movable arm */}
          <line
            x1={cx} y1={cy} x2={armX} y2={armY}
            stroke="#4F80FF" strokeWidth={3.5} strokeLinecap="round"
          />
          {/* Drag tip */}
          <circle
            cx={armX} cy={armY} r={10}
            fill="#4F80FF" stroke="#fff" strokeWidth={2}
            style={{ cursor: readOnly ? 'default' : 'grab' }}
          />
          {/* Origin */}
          <circle cx={cx} cy={cy} r={5} fill="#FF7A2F" />
          {/* Angle text */}
          {angle >= 10 && (
            <text
              x={cx + 42 * Math.cos(rad / 2)}
              y={cy - 42 * Math.sin(rad / 2)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={12} fill="#FF7A2F" fontWeight="bold"
            >
              {angle}°
            </text>
          )}
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
        key={angle}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-orange-200">
          <span className="text-4xl font-bold" style={{ color: '#FF7A2F' }}>{angle}°</span>
          <p className="text-sm mt-1 font-semibold" style={{ color: 'var(--muted)' }}>
            {getLabel(angle)}
          </p>
        </div>
        {!readOnly && (
          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>ลากแขนสีน้ำเงินเพื่อเปลี่ยนมุม</p>
        )}
      </motion.div>
    </div>
  )
}
