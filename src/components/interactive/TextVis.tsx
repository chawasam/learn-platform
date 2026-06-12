'use client'
import { motion } from 'framer-motion'

interface HighlightWord {
  text: string
  color?: string
  bold?: boolean
  note?: string
}

interface Props {
  sentence?: string
  words?: HighlightWord[]
  showUnderline?: boolean
  type?: 'sentence' | 'wordFamily' | 'syllable' | 'definition'
  term?: string
  definition?: string
  example?: string
}

const DEFAULT_COLORS = ['#4F80FF', '#FF7A2F', '#22C55E', '#8B5CF6', '#F59E0B']

export default function TextVis({
  sentence,
  words,
  showUnderline = true,
  type = 'sentence',
  term,
  definition,
  example,
}: Props) {
  if (type === 'definition') {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 max-w-sm">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">📖</span>
          <div>
            <p className="font-bold text-lg" style={{ color: '#4F80FF' }}>{term}</p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#374151' }}>{definition}</p>
          </div>
        </div>
        {example && (
          <div className="bg-blue-50 rounded-xl px-4 py-2 border-l-4 border-blue-300">
            <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--muted)' }}>ตัวอย่าง</p>
            <p className="text-sm" style={{ color: '#374151' }}>{example}</p>
          </div>
        )}
      </div>
    )
  }

  if (type === 'wordFamily' && words) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="relative group"
          >
            <div
              className="px-4 py-2 rounded-xl font-bold text-white shadow-sm cursor-default"
              style={{ background: w.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }}
            >
              {w.text}
            </div>
            {w.note && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {w.note}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'syllable' && words) {
    return (
      <div className="flex flex-wrap gap-1 items-center justify-center">
        {words.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: 'spring' }}
            className="flex flex-col items-center"
          >
            <span
              className="text-2xl font-bold px-3 py-1.5 rounded-xl"
              style={{
                color: w.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                background: (w.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]) + '18',
                textDecoration: showUnderline ? 'underline' : 'none',
                textDecorationColor: w.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
              }}
            >
              {w.text}
            </span>
            {w.note && (
              <span className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{w.note}</span>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  // Default: sentence with highlighted words
  if (sentence && words) {
    let remaining = sentence
    const parts: Array<{ text: string; highlight?: HighlightWord }> = []

    for (const word of words) {
      const idx = remaining.indexOf(word.text)
      if (idx >= 0) {
        if (idx > 0) parts.push({ text: remaining.slice(0, idx) })
        parts.push({ text: word.text, highlight: word })
        remaining = remaining.slice(idx + word.text.length)
      }
    }
    if (remaining) parts.push({ text: remaining })

    return (
      <div className="text-xl leading-relaxed text-center max-w-md">
        {parts.map((part, i) =>
          part.highlight ? (
            <motion.span
              key={i}
              initial={{ backgroundColor: 'transparent' }}
              animate={{ backgroundColor: (part.highlight.color ?? '#4F80FF') + '22' }}
              className="rounded px-0.5"
              style={{
                color: part.highlight.color ?? '#4F80FF',
                fontWeight: part.highlight.bold ? 'bold' : undefined,
                textDecoration: showUnderline ? 'underline' : 'none',
                textDecorationColor: part.highlight.color ?? '#4F80FF',
              }}
            >
              {part.text}
            </motion.span>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </div>
    )
  }

  return <p className="text-lg text-center">{sentence}</p>
}
