import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, Rng } from '@/types/exam'

// Deterministic PRNG (mulberry32) — an exam attempt is reproducible from its seed,
// so a student could be handed the same set, and tests are stable given a seed.
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Dedup key: question text + (for mc) its option set, so the same stem with the
// same options counts as a duplicate even if option order differs.
function stem(q: QuizQuestion): string {
  return q.type === 'mc' ? `${q.q}|${[...q.opts].sort().join(',')}` : q.q
}

// Assemble `count` unique questions: static bank first (shuffled), then fill from
// the parametric templates round-robin until full. Capped so a low-variety template
// set can never loop forever — it logs a shortfall instead of hanging silently.
export function generateExam(exam: ChapterExam, count = 100, seed = 1): QuizQuestion[] {
  const rng = mulberry32(seed)
  const out: QuizQuestion[] = []
  const seen = new Set<string>()
  const push = (q: QuizQuestion) => {
    const s = stem(q)
    if (seen.has(s)) return
    seen.add(s)
    out.push(q)
  }

  const bank = [...(exam.bank ?? [])]
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[bank[i], bank[j]] = [bank[j], bank[i]]
  }
  for (const q of bank) {
    if (out.length >= count) break
    push(q)
  }

  const tpl = exam.templates
  let attempts = 0
  const maxAttempts = count * 60
  while (out.length < count && tpl.length && attempts < maxAttempts) {
    const t = tpl[attempts % tpl.length]
    try {
      push(t.gen(rng))
    } catch {
      /* skip a bad draw and keep going */
    }
    attempts++
  }

  if (out.length < count) {
    console.warn(`[examGen] ${exam.chapterId}: only ${out.length}/${count} unique — add template variety`)
  }
  return out.slice(0, count)
}
