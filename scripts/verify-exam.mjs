// Verify the GENERATORS, not 3,900 hand-checked outputs. Per exam: sample every
// template many times + structural invariants, then confirm generateExam yields 100
// unique. Run: npx tsx scripts/verify-exam.mjs
// (.exam.ts / examGen.ts import only `import type` from '@/...', stripped by esbuild,
//  so tsx loads them with no path-alias resolution. Keep this list in sync with
//  src/content/exams/registry.ts.)
import { generateExam } from '../src/lib/examGen.ts'

const EXAMS = [
  ['math-6-number-calc', () => import('../src/content/math/grade-6/number-calc.exam.ts')],
  ['math-6-factors', () => import('../src/content/math/grade-6/factors.exam.ts')],
  ['math-6-fraction-calc', () => import('../src/content/math/grade-6/fraction-calc.exam.ts')],
  ['math-6-decimals', () => import('../src/content/math/grade-6/decimals.exam.ts')],
  ['math-6-decimal-calc', () => import('../src/content/math/grade-6/decimal-calc.exam.ts')],
  ['math-6-statistics', () => import('../src/content/math/grade-6/statistics.exam.ts')],
  ['math-6-parallel-angles', () => import('../src/content/math/grade-6/parallel-angles.exam.ts')],
  ['math-6-equations', () => import('../src/content/math/grade-6/equations.exam.ts')],
  ['math-6-scale', () => import('../src/content/math/grade-6/scale.exam.ts')],
  ['math-6-quad-area', () => import('../src/content/math/grade-6/quad-area.exam.ts')],
  ['math-6-circle-area', () => import('../src/content/math/grade-6/circle-area.exam.ts')],
  ['math-6-percent', () => import('../src/content/math/grade-6/percent.exam.ts')],
  ['math-6-volume', () => import('../src/content/math/grade-6/volume.exam.ts')],
  // ป.5
  ['math-5-number-calc', () => import('../src/content/math/grade-5/number-calc.exam.ts')],
  ['math-5-angles', () => import('../src/content/math/grade-5/angles.exam.ts')],
  ['math-5-parallel', () => import('../src/content/math/grade-5/parallel-lines.exam.ts')],
  ['math-5-probability', () => import('../src/content/math/grade-5/probability.exam.ts')],
  ['math-5-equiv-fractions', () => import('../src/content/math/grade-5/equivalent-fractions.exam.ts')],
  ['math-5-fraction-arith', () => import('../src/content/math/grade-5/fraction-arithmetic.exam.ts')],
  ['math-5-decimals', () => import('../src/content/math/grade-5/decimals.exam.ts')],
  ['math-5-decimal-arith', () => import('../src/content/math/grade-5/decimal-arithmetic.exam.ts')],
  ['math-5-word-problems', () => import('../src/content/math/grade-5/word-problems.exam.ts')],
  ['math-5-quadrilaterals', () => import('../src/content/math/grade-5/quadrilaterals.exam.ts')],
  ['math-5-triangles', () => import('../src/content/math/grade-5/triangles.exam.ts')],
  ['math-5-circles', () => import('../src/content/math/grade-5/circles.exam.ts')],
  ['math-5-volume', () => import('../src/content/math/grade-5/volume.exam.ts')],
  // ป.4
  ['math-4-numbers', () => import('../src/content/math/grade-4/numbers.exam.ts')],
  ['math-4-add-sub', () => import('../src/content/math/grade-4/add-sub.exam.ts')],
  ['math-4-multiply', () => import('../src/content/math/grade-4/multiply.exam.ts')],
  ['math-4-divide', () => import('../src/content/math/grade-4/divide.exam.ts')],
  ['math-4-mixed', () => import('../src/content/math/grade-4/mixed.exam.ts')],
  ['math-4-fractions', () => import('../src/content/math/grade-4/fractions.exam.ts')],
  ['math-4-decimals', () => import('../src/content/math/grade-4/decimals.exam.ts')],
  ['math-4-length', () => import('../src/content/math/grade-4/length.exam.ts')],
  ['math-4-money', () => import('../src/content/math/grade-4/money.exam.ts')],
  ['math-4-time', () => import('../src/content/math/grade-4/time.exam.ts')],
  ['math-4-area', () => import('../src/content/math/grade-4/area.exam.ts')],
  ['math-4-shapes', () => import('../src/content/math/grade-4/shapes.exam.ts')],
  ['math-4-bar-chart', () => import('../src/content/math/grade-4/bar-chart.exam.ts')],
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
