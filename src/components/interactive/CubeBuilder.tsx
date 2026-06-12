'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  gridSize?: number
  onChange?: (volume: number) => void
  readOnly?: boolean
  targetVolume?: number
  initialGrid?: boolean[][]
}

export default function CubeBuilder({
  gridSize = 5,
  onChange,
  readOnly = false,
  targetVolume,
  initialGrid,
}: Props) {
  const [grid, setGrid] = useState<boolean[][]>(
    initialGrid ?? Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
  )

  const volume = grid.flat().filter(Boolean).length
  const isCorrect = targetVolume !== undefined && volume === targetVolume

  const toggle = (row: number, col: number) => {
    if (readOnly) return
    const next = grid.map((r, ri) => r.map((c, ci) => ri === row && ci === col ? !c : c))
    setGrid(next)
    onChange?.(next.flat().filter(Boolean).length)
  }

  // Isometric cube drawing in SVG
  const CUBE_W = 32, CUBE_H = 18
  const COLS = gridSize, ROWS = gridSize
  const SVG_W = COLS * CUBE_W + 80
  const SVG_H = ROWS * CUBE_H + 60

  const cubeToSVG = (row: number, col: number) => {
    // Offset so grid is centered and goes top-right
    const x = 40 + col * CUBE_W - row * (CUBE_W / 2)
    const y = 20 + row * (CUBE_H / 2) + col * (CUBE_H / 2) * 0 + row * (CUBE_H * 0.5)
    return { x, y }
  }

  // Draw top face (parallelogram)
  const drawCube = (x: number, y: number, filled: boolean, hovered: boolean) => {
    const w = CUBE_W, h = CUBE_H
    const off = w / 2

    const top    = `${x},${y} ${x + off},${y - h / 2} ${x + w + off},${y - h / 2} ${x + w},${y}`
    const left   = `${x},${y} ${x},${y + h} ${x + off},${y + h + h / 2} ${x + off},${y - h / 2}`
    const right  = `${x + w},${y} ${x + w},${y + h} ${x + w + off},${y + h + h / 2} ${x + w + off},${y - h / 2}`

    const topFill   = filled ? (hovered ? '#6B9FFF' : '#4F80FF') : (hovered ? '#E0E7FF' : '#EFF2FF')
    const leftFill  = filled ? (hovered ? '#2F5FBB' : '#2563EB') : (hovered ? '#CBD5E1' : '#DDE3EE')
    const rightFill = filled ? (hovered ? '#3B76E0' : '#3B82F6') : (hovered ? '#D1D9E6' : '#E8ECF5')

    return { top, left, right, topFill, leftFill, rightFill }
  }

  const [hovered, setHovered] = useState<[number, number] | null>(null)

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H + 20}`}
        width={Math.min(SVG_W, 320)}
        height={Math.min(SVG_H + 20, 240)}
        style={{ overflow: 'visible' }}
      >
        {/* Render back-to-front for proper z-order */}
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => {
            const { x, y } = cubeToSVG(row, col)
            const filled = grid[row][col]
            const isHov = hovered?.[0] === row && hovered?.[1] === col
            const { top, left, right, topFill, leftFill, rightFill } = drawCube(x, y, filled, isHov)

            return (
              <g
                key={`${row}-${col}`}
                style={{ cursor: readOnly ? 'default' : 'pointer' }}
                onClick={() => toggle(row, col)}
                onMouseEnter={() => setHovered([row, col])}
                onMouseLeave={() => setHovered(null)}
              >
                <polygon points={left}  fill={leftFill}  stroke="#fff" strokeWidth={0.5} />
                <polygon points={right} fill={rightFill} stroke="#fff" strokeWidth={0.5} />
                <polygon points={top}   fill={topFill}   stroke="#fff" strokeWidth={0.5} />
                {!filled && !readOnly && (
                  <polygon points={top} fill="transparent" />
                )}
              </g>
            )
          })
        )}
      </svg>

      {/* Volume display */}
      <div className="relative">
        <motion.div
          key={volume}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 text-center"
          style={{ borderColor: isCorrect ? '#22C55E' : '#E5E7EB' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>ปริมาตร</p>
          <span className="text-3xl font-bold" style={{ color: '#4F80FF' }}>{volume}</span>
          <span className="text-sm ml-1" style={{ color: 'var(--muted)' }}>ลูกบาศก์</span>
          {targetVolume !== undefined && (
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              เป้าหมาย: {targetVolume}
            </p>
          )}
        </motion.div>
        {isCorrect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            ✓
          </motion.div>
        )}
      </div>

      {!readOnly && (
        <div className="flex gap-3">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>แตะช่องเพื่อเพิ่ม/ลบลูกบาศก์</p>
          <button
            onClick={() => {
              const next = Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
              setGrid(next)
              onChange?.(0)
            }}
            className="text-xs px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-50"
            style={{ color: 'var(--muted)' }}
          >
            ล้าง
          </button>
        </div>
      )}
    </div>
  )
}
