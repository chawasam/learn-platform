// Verify the GENERATOR, not 3,900 hand-checked outputs. Sample every template many
// times + check structural invariants, then confirm generateExam yields 100 unique.
// Run: npx tsx scripts/verify-exam.mjs
// (the .exam.ts / examGen.ts files import only `import type` from '@/...', which esbuild
//  strips, so tsx loads them with no path-alias resolution needed.)
import { generateExam, mulberry32 } from '../src/lib/examGen.ts'
import _percent from '../src/content/math/grade-6/percent.exam.ts'
const percentExam = _percent?.default ?? _percent   // tsx may wrap default in CJS interop

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

console.log(`Verifying exam: ${percentExam.chapterId}`)

// 1) per-template invariants
const SAMPLES = 80
for (const t of percentExam.templates) {
  for (let s = 1; s <= SAMPLES; s++) {
    const rng = mulberry32(s * 7919 + 13)
    let q
    try { q = t.gen(rng) } catch (e) { err(`template ${t.id} threw: ${e.message}`); continue }
    checkQ(`template ${t.id}`, q)
  }
}
console.log(`  templates checked: ${percentExam.templates.length} × ${SAMPLES} samples`)

// 2) static bank invariants
for (let i = 0; i < (percentExam.bank ?? []).length; i++) checkQ(`bank[${i}]`, percentExam.bank[i])
console.log(`  bank checked: ${(percentExam.bank ?? []).length}`)

// 3) generateExam yields 100 unique across several seeds
for (const seed of [1, 2, 3, 42, 99, 1000, 123456]) {
  const qs = generateExam(percentExam, 100, seed)
  if (qs.length !== 100) err(`seed ${seed}: got ${qs.length}/100`)
  const stems = new Set(qs.map(stemOf))
  if (stems.size !== qs.length) err(`seed ${seed}: ${qs.length - stems.size} duplicate(s)`)
  for (const q of qs) checkQ(`gen seed ${seed}`, q)
}
console.log('  generateExam: 100 unique across 7 seeds')

if (fail) { console.error(`\nFAILED: ${fail} issue(s)`); process.exit(1) }
console.log('\n✓ all exam invariants passed')
