import type { QuizQuestion } from '@/types/curriculum'
import type { Rng } from '@/types/exam'

// Shared exam-authoring helpers — every <chapter>.exam.ts imports these so the
// distractor logic / formatting lives in ONE place (no copy-drift across 39 files).

export const ri = (r: Rng, lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1))
export const pick = <T,>(r: Rng, a: T[]) => a[Math.floor(r() * a.length)]
export const round2 = (n: number) => Math.round(n * 100) / 100

export const baht = (n: number) => `${n} บาท`
export const plain = (n: number) => `${n}`
export const ppl = (n: number) => `${n} คน`
export const pctf = (n: number) => `${n}%`
export const unitf = (u: string) => (n: number) => `${n} ${u}`

function shuffle<T>(r: Rng, v: T[]): T[] {
  for (let i = v.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [v[i], v[j]] = [v[j], v[i]] }
  return v
}

// integer-answer mc: numeric correct + wrong-guesses → 4 DISTINCT options, ans on
// the correct one after shuffle. Fallbacks use plausible magnitudes (×2, ÷2, ±10),
// never correct±1 (reads like a typo when guesses collide, e.g. at 50%).
export function mcNum(r: Rng, q: string, correct: number, wrong: number[], fmt: (n: number) => string, hint: string): QuizQuestion {
  const ds: number[] = []
  const add = (c: number) => { if (Number.isInteger(c) && c > 0 && c !== correct && !ds.includes(c) && ds.length < 3) ds.push(c) }
  for (const w of wrong) add(w)
  for (const c of [correct * 2, Math.round(correct / 2), correct + 10, correct - 10, Math.round(correct * 1.5), correct + 5, correct - 5]) add(c)
  let d = 3
  while (ds.length < 3) { add(correct + d); add(correct - d); d += 4 }
  const vals = shuffle(r, [correct, ...ds])
  return { type: 'mc', q, opts: vals.map(fmt), ans: vals.indexOf(correct), hint }
}

// decimal-answer mc (π, money with satang, etc). Same idea, epsilon-distinct.
export function mcDec(r: Rng, q: string, correct: number, wrong: number[], fmt: (n: number) => string, hint: string): QuizQuestion {
  const eq = (a: number, b: number) => Math.abs(a - b) < 1e-9
  const ds: number[] = []
  const add = (c0: number) => { const c = round2(c0); if (Number.isFinite(c) && c > 0 && !eq(c, correct) && !ds.some(d => eq(d, c)) && ds.length < 3) ds.push(c) }
  for (const w of wrong) add(w)
  const step = correct < 10 ? 0.5 : correct < 100 ? 5 : 50
  for (const c of [correct * 2, correct / 2, correct + step, correct - step, correct * 1.5]) add(c)
  let d = step * 2
  while (ds.length < 3) { add(correct + d); add(correct - d); d += step }
  const vals = shuffle(r, [correct, ...ds])
  return { type: 'mc', q, opts: vals.map(fmt), ans: vals.indexOf(correct), hint }
}

// string-answer mc (fractions like "1/6", directions). Caller MUST supply >=3
// distinct distractors (verify-exam flags <4 options otherwise).
export function mcStr(r: Rng, q: string, correct: string, distractors: string[], hint: string): QuizQuestion {
  const ds: string[] = []
  for (const d of distractors) if (d !== correct && !ds.includes(d) && ds.length < 3) ds.push(d)
  const vals = shuffle(r, [correct, ...ds])
  return { type: 'mc', q, opts: vals, ans: vals.indexOf(correct), hint }
}
