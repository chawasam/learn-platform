'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Area as tiling: lay floor tiles one ROW at a time. Kids see that a room is
// "W tiles per row × H rows" — so area = width × length without counting each
// tile. Reports { rows, full, area } via onStateChange for goal gating.

interface Props {
  width?: number
  height?: number
  readOnly?: boolean
  onStateChange?: (state: Record<string, unknown>) => void
}

export default function AreaTiles({
  width = 5, height = 3, readOnly = false, onStateChange,
}: Props) {
  const [rows, setRows] = useState(readOnly ? height : 0)
  const full = rows >= height
  const area = width * height

  useEffect(() => {
    onStateChange?.({ rows, full: full ? 1 : 0, area })
  }, [rows, full, area, onStateChange])

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      {/* the room */}
      <div className="flex flex-col gap-1 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
        {Array.from({ length: height }, (_, r) => (
          <div key={r} className="flex gap-1">
            {Array.from({ length: width }, (_, c) => {
              const laid = r < rows
              return laid ? (
                <motion.div
                  key={c}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: c * 0.04, type: 'spring', stiffness: 320, damping: 18 }}
                  className="w-7 h-7 rounded-md"
                  style={{ background: '#14B8A6', border: '1.5px solid #0D9488' }}
                />
              ) : (
                <div key={c} className="w-7 h-7 rounded-md border-2 border-dashed border-gray-300" />
              )
            })}
          </div>
        ))}
      </div>

      {/* equation / progress */}
      <div className="text-center">
        {full ? (
          <p className="text-xl font-bold" style={{ color: '#1E3A5F' }}>
            {width} × {height} = <span style={{ color: '#22C55E' }}>{area}</span> ตร.หน่วย
          </p>
        ) : (
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            ปูแล้ว {rows} แถว ({rows * width} แผ่น) · แถวละ {width} แผ่น
          </p>
        )}
      </div>

      {!readOnly && (
        <div className="flex gap-2">
          {!full ? (
            <button onClick={() => setRows(r => Math.min(height, r + 1))}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-85 transition-opacity"
              style={{ background: '#14B8A6' }}>
              ปูอีก 1 แถว ▶
            </button>
          ) : (
            <button onClick={() => setRows(0)}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors">
              ↺ เริ่มใหม่
            </button>
          )}
        </div>
      )}
    </div>
  )
}
