'use client'
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

type ShapeType = 'rectangle' | 'triangle' | 'parallelogram'

interface Props {
  shape?: ShapeType
  initialWidth?: number
  initialHeight?: number
  maxWidth?: number
  maxHeight?: number
  unit?: string
  onChange?: (width: number, height: number, area: number, perimeter: number) => void
  readOnly?: boolean
  targetArea?: number
}

export default function ShapeMeasure({
  shape = 'rectangle',
  initialWidth = 6,
  initialHeight = 4,
  maxWidth = 12,
  maxHeight = 10,
  unit = 'ซม.',
  onChange,
  readOnly = false,
  targetArea,
}: Props) {
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragging = useRef<'width' | 'height' | 'corner' | null>(null)

  const PAD = 30
  const W = 280, H = 220
  const scaleX = (W - PAD * 2) / maxWidth
  const scaleY = (H - PAD * 2) / maxHeight

  const rx = width * scaleX
  const ry = height * scaleY
  const originX = PAD + (W - PAD * 2) / 2 - rx / 2
  const originY = PAD + (H - PAD * 2) / 2 - ry / 2

  const svgToWorld = useCallback(
    (clientX: number, clientY: number) => {
      const rect = svgRef.current!.getBoundingClientRect()
      const sx = (clientX - rect.left) * (W / rect.width)
      const sy = (clientY - rect.top) * (H / rect.height)
      const w = Math.max(1, Math.min(maxWidth, Math.round((sx - originX) / scaleX)))
      const h = Math.max(1, Math.min(maxHeight, Math.round((originY + ry - sy) / scaleY + (sy < originY + ry / 2 ? 0 : 0))))
      const ww = Math.max(1, Math.min(maxWidth, Math.round((sx - originX) / scaleX)))
      const hh = Math.max(1, Math.min(maxHeight, Math.round((sy - originY) / scaleY)))
      return { w: ww, h: hh }
    },
    [originX, originY, scaleX, scaleY, maxWidth, maxHeight, ry]
  )

  const handlePointerDown = (type: 'width' | 'height' | 'corner') => (e: React.PointerEvent) => {
    if (readOnly) return
    dragging.current = type
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || readOnly) return
    const rect = svgRef.current!.getBoundingClientRect()
    const sx = (e.clientX - rect.left) * (W / rect.width)
    const sy = (e.clientY - rect.top) * (H / rect.height)

    let newW = width, newH = height
    if (dragging.current === 'width' || dragging.current === 'corner') {
      newW = Math.max(1, Math.min(maxWidth, Math.round((sx - originX) / scaleX)))
    }
    if (dragging.current === 'height' || dragging.current === 'corner') {
      newH = Math.max(1, Math.min(maxHeight, Math.round((sy - originY) / scaleY)))
    }
    if (newW !== width) setWidth(newW)
    if (newH !== height) setHeight(newH)
    const a = calcArea(newW, newH)
    const p = calcPerimeter(newW, newH)
    onChange?.(newW, newH, a, p)
  }

  const handlePointerUp = () => { dragging.current = null }

  const calcArea = (w: number, h: number) => {
    if (shape === 'triangle') return (w * h) / 2
    return w * h
  }
  const calcPerimeter = (w: number, h: number) => {
    if (shape === 'triangle') return parseFloat((w + h + Math.sqrt(w * w + h * h)).toFixed(1))
    return 2 * (w + h)
  }

  const area = calcArea(width, height)
  const perimeter = calcPerimeter(width, height)
  const isCorrect = targetArea !== undefined && Math.abs(area - targetArea) < 0.5

  // Shape points
  let points = ''
  if (shape === 'rectangle') {
    points = `${originX},${originY} ${originX + rx},${originY} ${originX + rx},${originY + ry} ${originX},${originY + ry}`
  } else if (shape === 'triangle') {
    points = `${originX + rx / 2},${originY} ${originX + rx},${originY + ry} ${originX},${originY + ry}`
  } else {
    // Parallelogram
    const offset = 20
    points = `${originX + offset},${originY} ${originX + rx + offset},${originY} ${originX + rx},${originY + ry} ${originX},${originY + ry}`
  }

  return (
    <div className="flex flex-col items-center gap-4">
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
          {/* Grid */}
          {Array.from({ length: maxWidth + 1 }, (_, i) => (
            <line key={`v${i}`} x1={PAD + i * scaleX} y1={PAD} x2={PAD + i * scaleX} y2={H - PAD}
              stroke="#F3F4F6" strokeWidth={1} />
          ))}
          {Array.from({ length: maxHeight + 1 }, (_, i) => (
            <line key={`h${i}`} x1={PAD} y1={PAD + i * scaleY} x2={W - PAD} y2={PAD + i * scaleY}
              stroke="#F3F4F6" strokeWidth={1} />
          ))}

          {/* Shape */}
          <polygon
            points={points}
            fill="#4F80FF"
            fillOpacity={0.18}
            stroke="#4F80FF"
            strokeWidth={2.5}
          />

          {/* Width dimension line */}
          <line x1={originX} y1={originY + ry + 18} x2={originX + rx} y2={originY + ry + 18}
            stroke="#FF7A2F" strokeWidth={1.5} markerEnd="url(#arrowR)" markerStart="url(#arrowL)" />
          <text x={originX + rx / 2} y={originY + ry + 32} textAnchor="middle" fontSize={11} fill="#FF7A2F" fontWeight="bold">
            {width} {unit}
          </text>

          {/* Height dimension line */}
          <line x1={originX - 18} y1={originY} x2={originX - 18} y2={originY + ry}
            stroke="#22C55E" strokeWidth={1.5} />
          <text x={originX - 22} y={originY + ry / 2} textAnchor="middle" dominantBaseline="middle"
            fontSize={11} fill="#22C55E" fontWeight="bold" transform={`rotate(-90, ${originX - 22}, ${originY + ry / 2})`}>
            {height} {unit}
          </text>

          {/* Drag handles */}
          {!readOnly && (
            <>
              {/* Width handle */}
              <circle cx={originX + rx} cy={originY + ry / 2} r={9}
                fill="#FF7A2F" stroke="#fff" strokeWidth={2}
                style={{ cursor: 'ew-resize' }}
                onPointerDown={handlePointerDown('width')}
              />
              {/* Height handle */}
              <circle cx={originX + rx / 2} cy={originY + ry} r={9}
                fill="#22C55E" stroke="#fff" strokeWidth={2}
                style={{ cursor: 'ns-resize' }}
                onPointerDown={handlePointerDown('height')}
              />
              {/* Corner handle */}
              <circle cx={originX + rx} cy={originY + ry} r={9}
                fill="#8B5CF6" stroke="#fff" strokeWidth={2}
                style={{ cursor: 'nwse-resize' }}
                onPointerDown={handlePointerDown('corner')}
              />
            </>
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

      {/* Stats */}
      <motion.div
        key={`${width}x${height}`}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        className="flex gap-3"
      >
        <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
          <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>พื้นที่</p>
          <span className="text-xl font-bold" style={{ color: '#4F80FF' }}>{area}</span>
          <span className="text-xs ml-1" style={{ color: 'var(--muted)' }}>{unit}²</span>
        </div>
        <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
          <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>เส้นรอบรูป</p>
          <span className="text-xl font-bold" style={{ color: '#FF7A2F' }}>{perimeter}</span>
          <span className="text-xs ml-1" style={{ color: 'var(--muted)' }}>{unit}</span>
        </div>
      </motion.div>
    </div>
  )
}
