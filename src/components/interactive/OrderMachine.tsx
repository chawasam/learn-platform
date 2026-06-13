'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Order of operations. In 'solve' mode kids tap the operator to do first — the
// machine refuses +/− while ×/÷ remain ("คูณหารก่อนนะ!"). In 'left'/'correct'
// mode it shows the worked steps so kids SEE left-to-right gives the wrong answer.
// Reports { done, result } via onStateChange.

type Token = number | string
interface Props {
  expression?: Token[]              // e.g. [2,'+',3,'×',4]
  mode?: 'solve' | 'left' | 'correct'
  onStateChange?: (state: Record<string, unknown>) => void
}

const isOp = (t: Token): t is string => typeof t === 'string'
const apply = (a: number, op: string, b: number) =>
  op === '×' ? a * b : op === '÷' ? Math.floor(a / b) : op === '+' ? a + b : a - b

function computeLeft(tokens: Token[]) {
  let t = [...tokens]; const steps: string[] = []
  while (t.length > 1) {
    const [a, op, b] = [t[0] as number, t[1] as string, t[2] as number]
    const r = apply(a, op, b); steps.push(`${a} ${op} ${b} = ${r}`)
    t = [r, ...t.slice(3)]
  }
  return { result: t[0] as number, steps }
}
function computeCorrect(tokens: Token[]) {
  let t = [...tokens]; const steps: string[] = []
  let i = 1
  while (i < t.length) {
    if (t[i] === '×' || t[i] === '÷') {
      const r = apply(t[i - 1] as number, t[i] as string, t[i + 1] as number)
      steps.push(`${t[i - 1]} ${t[i]} ${t[i + 1]} = ${r}`); t.splice(i - 1, 3, r); i = 1
    } else i += 2
  }
  while (t.length > 1) {
    const r = apply(t[0] as number, t[1] as string, t[2] as number)
    steps.push(`${t[0]} ${t[1]} ${t[2]} = ${r}`); t.splice(0, 3, r)
  }
  return { result: t[0] as number, steps }
}

export default function OrderMachine({
  expression = [2, '+', 3, '×', 4], mode = 'solve', onStateChange,
}: Props) {
  const [tokens, setTokens] = useState<Token[]>(expression)
  const [msg, setMsg] = useState('')
  const [shake, setShake] = useState(0)
  const done = tokens.length === 1

  useEffect(() => {
    if (mode === 'solve') onStateChange?.({ done: done ? 1 : 0, result: done ? (tokens[0] as number) : null })
    else onStateChange?.({ mode })
  }, [done, tokens, mode, onStateChange])

  const tapOp = (i: number) => {
    const op = tokens[i] as string
    const high = op === '×' || op === '÷'
    const hasHigh = tokens.some(t => t === '×' || t === '÷')
    if (!high && hasHigh) {
      setMsg('เอ๊ะ! ต้องทำ × ÷ ก่อนนะ'); setShake(s => s + 1); return
    }
    const r = apply(tokens[i - 1] as number, op, tokens[i + 1] as number)
    const nt = [...tokens]; nt.splice(i - 1, 3, r)
    setTokens(nt); setMsg('')
  }

  if (mode !== 'solve') {
    const { result, steps } = mode === 'left' ? computeLeft(expression) : computeCorrect(expression)
    const correctResult = computeCorrect(expression).result
    const wrong = mode === 'left' && result !== correctResult
    return (
      <div className="flex flex-col items-center gap-3 select-none">
        <p className="text-2xl font-bold" style={{ color: '#1E3A5F' }}>{expression.join(' ')}</p>
        <div className="flex flex-col gap-1.5">
          {steps.map((s, i) => (
            <div key={i} className="px-4 py-1.5 rounded-lg bg-slate-100 text-center font-semibold text-slate-700">{s}</div>
          ))}
        </div>
        <div className="px-6 py-2 rounded-xl font-bold text-2xl"
          style={{ background: wrong ? '#FEF2F2' : '#F0FDF4', color: wrong ? '#EF4444' : '#22C55E' }}>
          = {result} {wrong ? '✗' : '✓'}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <motion.div key={shake} animate={shake ? { x: [0, -6, 6, -4, 0] } : {}} transition={{ duration: 0.3 }}
        className="flex items-center gap-1.5 flex-wrap justify-center">
        <AnimatePresence mode="popLayout">
          {tokens.map((t, i) => isOp(t) ? (
            <motion.button
              key={`op-${i}-${t}`}
              layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              onClick={() => tapOp(i)} disabled={done}
              className="w-11 h-11 rounded-xl text-white font-bold text-xl hover:opacity-80 transition-opacity disabled:opacity-40"
              style={{ background: t === '×' || t === '÷' ? '#A855F7' : '#FF7A2F' }}
            >{t}</motion.button>
          ) : (
            <motion.div
              key={`n-${i}-${t}`}
              layout initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              className="min-w-11 h-11 px-2 rounded-xl flex items-center justify-center font-bold text-xl border-2"
              style={{ borderColor: done ? '#22C55E' : '#CBD5E1', background: done ? '#F0FDF4' : 'white', color: '#1E3A5F' }}
            >{t}</motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="h-6 text-center">
        <AnimatePresence>
          {msg && (
            <motion.p key={msg} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-sm font-semibold text-red-500">{msg}</motion.p>
          )}
          {done && (
            <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-base font-bold text-green-600">ถูกต้อง! ผลลัพธ์ = {tokens[0]} 🎉</motion.p>
          )}
        </AnimatePresence>
      </div>

      {!done && (
        <p className="text-xs" style={{ color: 'var(--muted)' }}>แตะเครื่องหมายที่ต้องทำก่อน</p>
      )}
    </div>
  )
}
