// Dump a generated exam to eyeball quality (math, language, distractors, type mix).
// Run: npx tsx scripts/audit-exam.mjs <key> [seed]   e.g. number-calc 7
import { generateExam } from '../src/lib/examGen.ts'

const EXAMS = {
  'number-calc': () => import('../src/content/math/grade-6/number-calc.exam.ts'),
  'percent': () => import('../src/content/math/grade-6/percent.exam.ts'),
  'volume': () => import('../src/content/math/grade-6/volume.exam.ts'),
}

const key = process.argv[2] || 'percent'
const seed = Number(process.argv[3] || 7)
const mod = await (EXAMS[key] ?? EXAMS.percent)()
const exam = mod?.default ?? mod
const qs = generateExam(exam, 100, seed)
const byType = qs.reduce((a, q) => ((a[q.type] = (a[q.type] || 0) + 1), a), {})
console.log(`exam=${exam.chapterId} seed=${seed} n=${qs.length} types=${JSON.stringify(byType)}\n`)
qs.forEach((q, i) => {
  const n = String(i + 1).padStart(3, ' ')
  if (q.type === 'mc') {
    console.log(`${n}. [mc] ${q.q}`)
    console.log(`      ${q.opts.map((o, j) => (j === q.ans ? `*${o}*` : o)).join('  |  ')}`)
  } else if (q.type === 'fill') console.log(`${n}. [fill] ${q.q}  =>  ${q.ans}`)
  else if (q.type === 'slider') console.log(`${n}. [slider ${q.min}-${q.max}] ${q.q}  =>  ${q.ans} ${q.unit}`)
})
