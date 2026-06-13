// Verify the GENERATORS, not 3,900 hand-checked outputs. Per exam: sample every
// template many times + structural invariants, then confirm generateExam yields 100
// unique. Run: npx tsx scripts/verify-exam.mjs
// (.exam.ts / examGen.ts import only `import type` from '@/...', stripped by esbuild,
//  so tsx loads them with no path-alias resolution. Keep this list in sync with
//  src/content/exams/registry.ts.)
import { generateExam } from '../src/lib/examGen.ts'

const EXAMS = [
  ['math-6-number-calc', () => import('../src/content/math/grade-6/number-calc.exam.ts')],
  ['math-6-percent', () => import('../src/content/math/grade-6/percent.exam.ts')],
  ['math-6-volume', () => import('../src/content/math/grade-6/volume.exam.ts')],
]

let fail = 0
const err = (m) => { console.error('  ✗', m); fail++ }
const stemOf = (q) => (q.type === 'mc' ? `${q.q}|${[...q.opts].sort().join(',')}` : q.q)

function checkQ(label, q) {
  if (!q || !q.q || !q.q.trim()) return err(`${label}: empty question`)
  if (q.type === 'mc') {
    if (!Array.isArray(q.opts) || q.opts.length < 4) return err(`${label}: <4 options`)
    if (!Number.isInteger(q.ans) || q.ans < 0 || q.ans >= q.opts.length) return err(`${label}: ans out of range (${q.ans})`)
    if (new Set(q.opts).size !== q.opts.length) return err(`${label}: duplicate options [${q.opts.join(', ')}]`)
    if (q.opts.some(o => o === '' || o == null)) return err(`${label}: empty option`)
    if (/NaN|undefined/.test(q.opts.join(' '))) return err(`${label}: NaN/undefined option [${q.opts.join(', ')}]`)
  } else if (q.type === 'fill') {
    if (typeof q.ans !== 'string' || !q.ans.trim()) return err(`${label}: empty fill ans`)
    if (/NaN|undefined/.test(q.ans)) return err(`${label}: NaN/undefined ans`)
  } else if (q.type === 'slider') {
    if (!(q.min <= 0 && 0 <= q.max)) return err(`${label}: slider must include 0 (min ${q.min}, max ${q.max})`)
    if (!(q.min <= q.ans && q.ans <= q.max)) return err(`${label}: slider ans ${q.ans} out of [${q.min},${q.max}]`)
    if (!q.unit && q.unit !== '') return err(`${label}: slider missing unit`)
    if (!(q.step > 0)) return err(`${label}: slider step must be > 0`)
  } else {
    return err(`${label}: unexpected type ${q.type}`)
  }
}

const SAMPLES = 80
for (const [id, loader] of EXAMS) {
  const mod = await loader()
  const exam = mod?.default ?? mod
  if (exam.chapterId !== id) err(`${id}: chapterId mismatch (${exam.chapterId})`)
  for (const t of exam.templates) {
    for (let s = 1; s <= SAMPLES; s++) {
      let q
      try { q = t.gen((() => { let a = (s * 7919 + 13) >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296 } })()) }
      catch (e) { err(`${id}/${t.id} threw: ${e.message}`); continue }
      checkQ(`${id}/${t.id}`, q)
    }
  }
  for (let i = 0; i < (exam.bank ?? []).length; i++) checkQ(`${id}/bank[${i}]`, exam.bank[i])
  for (const seed of [1, 2, 3, 42, 99, 1000, 123456]) {
    const qs = generateExam(exam, 100, seed)
    if (qs.length !== 100) err(`${id} seed ${seed}: got ${qs.length}/100`)
    if (new Set(qs.map(stemOf)).size !== qs.length) err(`${id} seed ${seed}: duplicates`)
    for (const q of qs) checkQ(`${id}/gen`, q)
  }
  console.log(`  ✓ ${id}: ${exam.templates.length} tpl × ${SAMPLES} + bank ${(exam.bank ?? []).length} + 100 unique × 7 seeds`)
}

if (fail) { console.error(`\nFAILED: ${fail} issue(s)`); process.exit(1) }
console.log(`\n✓ all ${EXAMS.length} exams passed`)
