'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  maxParts?: number
  initialParts?: number
  initialFilled?: number
  onChange?: (parts: number, filled: number) => void
  readOnly?: boolean
  targetParts?: number
  targetFilled?: number
}

export default function FractionCutter({
  maxParts = 12,
  initialParts = 1,
  initialFilled = 0,
  onChange,
  readOnly = false,
  targetParts,
  targetFilled,
}: Props) {
  const [parts, setParts]   = useState(initialParts)
  const [filled, setFilled] = useState(initialFilled)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef(false)

  const cx = 100, cy = 100, r = 80

  // Convert pointer position to angle (0 at top, clockwise)
  const toAngle = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const x = clientX - rect.left - (rect.width / 200) * cx
    const y = clientY - rect.top  - (rect.height / 200) * cy
    const scale = 200 / rect.width
    return Math.atan2(x * scale, -y * scale) * (180 / Math.PI) + 180
  }, [])

  const updateFromAngle = useCallback((angle: number) => {
    const newParts = Math.max(1, Math.min(maxParts, Math.round((angle / 360) * maxParts) || 1))
    setParts(newParts)
    onChange?.(newParts, filled)
  }, [maxParts, filled, onChange])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (readOnly) return
    dragging.current = true
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
    updateFromAngle(toAngle(e.clientX, e.clientY))
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || readOnly) return
    updateFromAngle(toAngle(e.clientX, e.clientY))
  }
  const handlePointerUp = () => { dragging.current = false }

  // Draw pie slices
  const slices = Array.from({ length: parts }, (_, i) => {
    const startAngle = (i / parts) * 360 - 90
    const endAngle   = ((i + 1) / parts) * 360 - 90
    const s = (a: number) => ({ x: cx + r * Math.cos(a * Math.PI / 180), y: cy + r * Math.sin(a * Math.PI / 180) })
    const large = (1 / parts) > 0.5 ? 1 : 0
    const start = s(startAngle), end = s(endAngle)
    const isFilled = i < filled
    return { i, start, end, large, isFilled, startAngle, endAngle }
  })

  const toggleFill = (i: number) => {
    if (readOnly) return
    const newFilled = i < filled ? i : i + 1
    setFilled(newFilled)
    onChange?.(parts, newFilled)
  }

  const isCorrect = targetParts !== undefined && targetFilled !== undefined &&
    parts === targetParts && filled === targetFilled

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          width={220}
          height={220}
          style={{ touchAction: 'none', cursor: readOnly ? 'default' : 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Background circle */}
          <circle cx={cx} cy={cy} r={r} fill="#FFF8F0" stroke="#E5E7EB" strokeWidth={2} />

          {/* Slices */}
          {slices.map(({ i, start, end, large, isFilled }) => (
            <motion.path
              key={i}
              d={parts === 1
                ? `M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
                : `M ${cx},${cy} L ${start.x},${start.y} A ${r},${r} 0 ${large},1 ${end.x},${end.y} Z`
              }
              fill={isFilled ? '#FF7A2F' : '#FFDDB3'}
              stroke="#fff"
              strokeWidth={2}
              animate={{ fill: isFilled ? '#FF7A2F' : '#FFDDB3' }}
              transition={{ duration: 0.2 }}
              onClick={() => toggleFill(i)}
              style={{ cursor: readOnly ? 'default' : 'pointer' }}
            />
          ))}

          {/* Divider lines */}
          {parts > 1 && slices.map(({ i, start }) => (
            <line key={i} x1={cx} y1={cy} x2={start.x} y2={start.y} stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
          ))}

          {/* Drag handle ring */}
          {!readOnly && (
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="transparent" strokeWidth={20} style={{ cursor: 'grab' }} />
          )}

          {/* Center dot */}
          <circle cx={cx} cy={cy} r={4} fill="#FF7A2F" />
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

      {/* Fraction display */}
      <motion.div
        key={`${filled}/${parts}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="inline-flex flex-col items-center bg-white rounded-2xl px-6 py-3 shadow-md border-2"
          style={{ borderColor: filled > 0 ? '#FF7A2F' : '#E5E7EB' }}>
          <span className="text-3xl font-bold" style={{ color: '#FF7A2F' }}>{filled}</span>
          <div className="w-10 h-0.5 bg-gray-800 my-0.5" />
          <span className="text-3xl font-bold text-gray-800">{parts}</span>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>
          {filled === 0 ? 'แตะชิ้นส้มเพื่อเลือก' : `ได้ ${filled} จาก ${parts} ส่วน`}
        </p>
      </motion.div>

      {/* Controls */}
      {!readOnly && (
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
            <span style={{ color: 'var(--muted)' }}>แบ่ง</span>
            <button onClick={() => { const n = Math.max(1, parts-1); setParts(n); setFilled(Math.min(filled, n)); onChange?.(n, Math.min(filled, n)) }}
              className="w-7 h-7 rounded-full bg-gray-100 font-bold hover:bg-gray-200 transition-colors">−</button>
            <span className="font-bold w-5 text-center">{parts}</span>
            <button onClick={() => { const n = Math.min(maxParts, parts+1); setParts(n); onChange?.(n, filled) }}
              className="w-7 h-7 rounded-full bg-orange-100 font-bold text-orange-600 hover:bg-orange-200 transition-colors">+</button>
            <span style={{ color: 'var(--muted)' }}>ส่วน</span>
          </div>
        </div>
      )}
    </div>
  )
}
