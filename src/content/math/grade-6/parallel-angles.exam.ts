import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ เส้นขนานและมุม ป.6 — มุมแย้งเท่ากัน, มุมภายในข้างเดียวกันรวม 180°
// distractor = สับสนแย้ง(เท่ากัน) กับ ข้างเดียวกัน(180−θ)
const templates: QuestionTemplate[] = [
  { id: 'alt', difficulty: 1, gen: r => { const t = ri(r, 20, 160); return mcNum(r, `เส้นตัดเส้นขนาน มุมหนึ่ง ${t}° มุมแย้งเท่ากับกี่องศา`, t, [180 - t, 90, Math.round(t / 2)], plain, 'มุมแย้งเท่ากันเสมอ') } },
  { id: 'co', difficulty: 2, gen: r => { const t = ri(r, 20, 160), v = 180 - t; return mcNum(r, `มุมหนึ่ง ${t}° มุมภายในข้างเดียวกัน (รวม 180) เท่ากับกี่องศา`, v, [t, 90, 180], plain, `180 − ${t}`) } },
  { id: 'fill-alt', difficulty: 1, gen: r => { const t = ri(r, 20, 160); return { type: 'fill', q: `มุมหนึ่ง ${t}° มุมแย้ง = ___ องศา`, ans: String(t), hint: 'มุมแย้งเท่ากัน' } } },
  { id: 'fill-co', difficulty: 2, gen: r => { const t = ri(r, 20, 160); return { type: 'fill', q: `มุมหนึ่ง ${t}° มุมภายในข้างเดียวกัน (รวม 180) = ___ องศา`, ans: String(180 - t), hint: `180 − ${t}` } } },
  { id: 'concept-alt', difficulty: 1, gen: () => ({ type: 'mc', q: 'มุมแย้งบนเส้นขนานมีความสัมพันธ์อย่างไร', opts: ['เท่ากัน', 'รวม 180°', 'รวม 90°', 'ต่างกัน'], ans: 0, hint: 'รูปตัว Z เท่ากัน' }) },
  { id: 'concept-co', difficulty: 1, gen: () => ({ type: 'mc', q: 'มุมภายในข้างเดียวกันบนเส้นขนานรวมกันได้กี่องศา', opts: ['180°', '90°', '360°', '60°'], ans: 0, hint: 'รูปตัว C รวม 180°' }) },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'มุมหนึ่ง 70° มุมภายในข้างเดียวกัน (รวม 180) = ___ องศา', ans: '110', hint: '180 − 70' },
  { type: 'mc', q: 'มุมหนึ่ง 60° มุมแย้งเท่ากับ?', opts: ['60°', '120°', '90°', '30°'], ans: 0, hint: 'มุมแย้งเท่ากันเสมอ' },
]

const parallelAnglesExam: ChapterExam = { chapterId: 'math-6-parallel-angles', templates, bank }
export default parallelAnglesExam
