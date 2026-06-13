// Dump a generated exam to eyeball quality (math, language, distractors, type mix).
// Run: npx tsx scripts/audit-exam.mjs <key> [seed]   e.g. number-calc 7
import { generateExam } from '../src/lib/examGen.ts'

const EXAMS = {
  'number-calc': () => import('../src/content/math/grade-6/number-calc.exam.ts'),
  'factors': () => import('../src/content/math/grade-6/factors.exam.ts'),
  'fraction-calc': () => import('../src/content/math/grade-6/fraction-calc.exam.ts'),
  'decimals': () => import('../src/content/math/grade-6/decimals.exam.ts'),
  'decimal-calc': () => import('../src/content/math/grade-6/decimal-calc.exam.ts'),
  'statistics': () => import('../src/content/math/grade-6/statistics.exam.ts'),
  'parallel-angles': () => import('../src/content/math/grade-6/parallel-angles.exam.ts'),
  'equations': () => import('../src/content/math/grade-6/equations.exam.ts'),
  'scale': () => import('../src/content/math/grade-6/scale.exam.ts'),
  'quad-area': () => import('../src/content/math/grade-6/quad-area.exam.ts'),
  'circle-area': () => import('../src/content/math/grade-6/circle-area.exam.ts'),
  'percent': () => import('../src/content/math/grade-6/percent.exam.ts'),
  'volume': () => import('../src/content/math/grade-6/volume.exam.ts'),
  // ป.5
  'p5-number-calc': () => import('../src/content/math/grade-5/number-calc.exam.ts'),
  'p5-angles': () => import('../src/content/math/grade-5/angles.exam.ts'),
  'p5-parallel': () => import('../src/content/math/grade-5/parallel-lines.exam.ts'),
  'p5-probability': () => import('../src/content/math/grade-5/probability.exam.ts'),
  'p5-equiv-fractions': () => import('../src/content/math/grade-5/equivalent-fractions.exam.ts'),
  'p5-fraction-arith': () => import('../src/content/math/grade-5/fraction-arithmetic.exam.ts'),
  'p5-decimals': () => import('../src/content/math/grade-5/decimals.exam.ts'),
  'p5-decimal-arith': () => import('../src/content/math/grade-5/decimal-arithmetic.exam.ts'),
  'p5-word-problems': () => import('../src/content/math/grade-5/word-problems.exam.ts'),
  'p5-quadrilaterals': () => import('../src/content/math/grade-5/quadrilaterals.exam.ts'),
  'p5-triangles': () => import('../src/content/math/grade-5/triangles.exam.ts'),
  'p5-circles': () => import('../src/content/math/grade-5/circles.exam.ts'),
  'p5-volume': () => import('../src/content/math/grade-5/volume.exam.ts'),
  // ป.4
  'p4-numbers': () => import('../src/content/math/grade-4/numbers.exam.ts'),
  'p4-add-sub': () => import('../src/content/math/grade-4/add-sub.exam.ts'),
  'p4-multiply': () => import('../src/content/math/grade-4/multiply.exam.ts'),
  'p4-divide': () => import('../src/content/math/grade-4/divide.exam.ts'),
  'p4-mixed': () => import('../src/content/math/grade-4/mixed.exam.ts'),
  'p4-fractions': () => import('../src/content/math/grade-4/fractions.exam.ts'),
  'p4-decimals': () => import('../src/content/math/grade-4/decimals.exam.ts'),
  'p4-length': () => import('../src/content/math/grade-4/length.exam.ts'),
  'p4-money': () => import('../src/content/math/grade-4/money.exam.ts'),
  'p4-time': () => import('../src/content/math/grade-4/time.exam.ts'),
  'p4-area': () => import('../src/content/math/grade-4/area.exam.ts'),
  'p4-shapes': () => import('../src/content/math/grade-4/shapes.exam.ts'),
  'p4-bar-chart': () => import('../src/content/math/grade-4/bar-chart.exam.ts'),
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
