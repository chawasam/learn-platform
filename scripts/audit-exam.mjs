// Dump a full generated exam so a human (or Claude) can audit the ACTUAL output
// quality: math correctness, language, difficulty, distractor plausibility, type mix.
// Run: npx tsx scripts/audit-exam.mjs [seed]
import { generateExam } from '../src/lib/examGen.ts'
import _percent from '../src/content/math/grade-6/percent.exam.ts'
const exam = _percent?.default ?? _percent
const seed = Number(process.argv[2] || 7)

const qs = generateExam(exam, 100, seed)
const byType = qs.reduce((a, q) => ((a[q.type] = (a[q.type] || 0) + 1), a), {})
console.log(`exam=${exam.chapterId} seed=${seed} n=${qs.length} types=${JSON.stringify(byType)}\n`)

qs.forEach((q, i) => {
  const n = String(i + 1).padStart(3, ' ')
  if (q.type === 'mc') {
    console.log(`${n}. [mc] ${q.q}`)
    console.log(`      ${q.opts.map((o, j) => (j === q.ans ? `*${o}*` : o)).join('  |  ')}`)
  } else if (q.type === 'fill') {
    console.log(`${n}. [fill] ${q.q}  =>  ${q.ans}`)
  } else if (q.type === 'slider') {
    console.log(`${n}. [slider ${q.min}-${q.max}] ${q.q}  =>  ${q.ans} ${q.unit}`)
  }
})
