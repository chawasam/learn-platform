import type { QuizQuestion } from '@/types/curriculum'
import type { Rng } from '@/types/exam'

// Shared exam-authoring helpers — every <chapter>.exam.ts imports these so the
// distractor logic / formatting lives in ONE place (no copy-drift across 39 files).

export const ri = (r: Rng, lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1))
export const pick = <T,>(r: Rng, a: T[]) => a[Math.floor(r() * a.length)]

export const baht = (n: number) => `${n} บาท`
export const plain = (n: number) => `${n}`
export const ppl = (n: number) => `${n} คน`
export const pctf = (n: number) => `${n}%`
export const unitf = (u: string) => (n: number) => `${n} ${u}`

// Build an mc from a numeric correct answer + numeric wrong-guesses. Guarantees 4
// DISTINCT options with `ans` pointing at the correct one after shuffle. Fallback
// distractors use plausible magnitudes (×2, ÷2, ±10) — never correct±1, which reads
// like a typo when a template's guesses collide (e.g. at 50%).
export function mcNum(r: Rng, q: string, correct: number, wrong: number[], fmt: (n: number) => string, hint: string): QuizQuestion {
  const ds: number[] = []
  const add = (c: number) => { if (Number.isInteger(c) && c > 0 && c !== correct && !ds.includes(c) && ds.length < 3) ds.push(c) }
  for (const w of wrong) add(w)
  for (const c of [correct * 2, Math.round(correct / 2), correct + 10, correct - 10, Math.round(correct * 1.5), correct + 5, correct - 5]) add(c)
  let d = 3
  while (ds.length < 3) { add(correct + d); add(correct - d); d += 4 }
  const vals = [correct, ...ds]
  for (let i = vals.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [vals[i], vals[j]] = [vals[j], vals[i]] }
  return { type: 'mc', q, opts: vals.map(fmt), ans: vals.indexOf(correct), hint }
}
