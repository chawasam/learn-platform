import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, pick, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ทิศ + มาตราส่วน ป.6 — distractor = บวกแทนคูณ / ลืมแปลงหน่วย
const RATIOS = [10, 50, 100, 200, 500, 1000]
const DIRS = ['เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก']
const OPP: Record<string, string> = { 'เหนือ': 'ใต้', 'ใต้': 'เหนือ', 'ตะวันออก': 'ตะวันตก', 'ตะวันตก': 'ตะวันออก' }

const templates: QuestionTemplate[] = [
  { id: 'real', difficulty: 1, gen: r => { const s = pick(r, RATIOS), m = ri(r, 2, 20), v = m * s; return mcNum(r, `มาตราส่วน 1:${s} วัดได้ ${m} ซม. ระยะจริงกี่ ซม.`, v, [m + s, m, s], plain, `${m} × ${s}`) } },
  { id: 'real-m', difficulty: 2, gen: r => { const s = pick(r, [100, 200, 500, 1000]), m = ri(r, 2, 20), cm = m * s, v = cm / 100; return mcNum(r, `มาตราส่วน 1:${s} วัดได้ ${m} ซม. ระยะจริงกี่เมตร`, v, [cm, m, Math.round(cm / 10)], plain, `${m}×${s}=${cm} ซม. ÷100`) } },
  { id: 'opp', difficulty: 1, gen: r => { const d = pick(r, DIRS); return mcStr(r, `ทิศตรงข้ามกับทิศ${d}คือ?`, OPP[d], DIRS.filter(x => x !== OPP[d]), 'ทิศตรงข้ามเป็นคู่') } },
  { id: 'fill-real', difficulty: 1, gen: r => { const s = pick(r, RATIOS), m = ri(r, 2, 20); return { type: 'fill', q: `มาตราส่วน 1:${s} วัด ${m} ซม. ระยะจริง = ___ ซม.`, ans: String(m * s), hint: `${m}×${s}` } } },
  { id: 'meaning', difficulty: 2, gen: r => { const s = pick(r, RATIOS); return { type: 'mc', q: `มาตราส่วน 1:${s} หมายถึงอะไร`, opts: [`1 ซม. = ${s} ซม.จริง`, `${s} ซม. = 1 ซม.จริง`, 'ย่อ 2 เท่า', 'ขยาย'], ans: 0, hint: '1 ส่วน = n ส่วนจริง' } } },
  { id: 'top', difficulty: 1, gen: () => ({ type: 'mc', q: 'บนแผนที่ ด้านบนคือทิศใด', opts: ['เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก'], ans: 0, hint: 'แผนที่บน = เหนือเสมอ' }) },
  { id: 'count', difficulty: 1, gen: () => ({ type: 'mc', q: 'ทิศหลักมีกี่ทิศ', opts: ['4', '2', '6', '8'], ans: 0, hint: 'เหนือ ใต้ ออก ตก' }) },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'มาตราส่วน 1:1000 วัด 2 ซม. = ___ เมตร (1 ม.=100 ซม.)', ans: '20', hint: '2×1000=2000 ซม. = 20 ม.' },
  { type: 'mc', q: 'มาตราส่วน 1:100 วัดได้ 5 ซม. ระยะจริงกี่ ซม.', opts: ['500', '105', '5', '50'], ans: 0, hint: '5 × 100' },
]

const scaleExam: ChapterExam = { chapterId: 'math-6-scale', templates, bank }
export default scaleExam
