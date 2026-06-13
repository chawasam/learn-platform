import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ลำดับการดำเนินการ ป.6 (วงเล็บ → คูณหาร → บวกลบ) — distractor = ทำผิดลำดับ
// (ซ้ายไปขวา) ซึ่งเป็น mistake ที่ออกข้อสอบจริงเสมอ. ทุกผลเป็นจำนวนเต็ม + ไม่ติดลบ (guarded)
const templates: QuestionTemplate[] = [
  { id: 'add-mul', difficulty: 1, gen: r => { const a = ri(r, 5, 60), b = ri(r, 2, 12), c = ri(r, 2, 9), v = a + b * c; return mcNum(r, `${a} + ${b} × ${c} = ?`, v, [(a + b) * c, b * c, a * b + c], plain, `คูณก่อน ${b}×${c}=${b * c}`) } },
  { id: 'sub-mul', difficulty: 2, gen: r => { const b = ri(r, 2, 9), c = ri(r, 2, 9), bc = b * c, a = bc + ri(r, 5, 50), v = a - bc; return mcNum(r, `${a} − ${b} × ${c} = ?`, v, [(a - b) * c, bc, a - b], plain, `คูณก่อน ${b}×${c}=${bc}`) } },
  { id: 'paren-mul', difficulty: 1, gen: r => { const a = ri(r, 2, 20), b = ri(r, 2, 20), c = ri(r, 2, 9), v = (a + b) * c; return mcNum(r, `(${a} + ${b}) × ${c} = ?`, v, [a + b * c, a + b, a * c], plain, `วงเล็บก่อน ${a}+${b}=${a + b}`) } },
  { id: 'div-add', difficulty: 2, gen: r => { const b = ri(r, 2, 9), q = ri(r, 2, 12), a = b * q, c = ri(r, 2, 30), v = q + c; return mcNum(r, `${a} ÷ ${b} + ${c} = ?`, v, [q * c, q, c], plain, `หารก่อน ${a}÷${b}=${q}`) } },
  { id: 'mul-add-mul', difficulty: 3, gen: r => { const a = ri(r, 2, 9), b = ri(r, 2, 9), c = ri(r, 2, 9), d = ri(r, 2, 9), v = a * b + c * d; return mcNum(r, `${a} × ${b} + ${c} × ${d} = ?`, v, [a * b, c * d, a + b + c + d], plain, `คูณทั้งสองคู่ก่อน`) } },
  { id: 'big-sub-mul', difficulty: 2, gen: r => { const a = ri(r, 2, 9), b = ri(r, 2, 9), ab = a * b, e = ab + ri(r, 2, 30) * 10, v = e - ab; return mcNum(r, `${e} − ${a} × ${b} = ?`, v, [(e - a) * b, ab, e - a], plain, `คูณก่อน ${a}×${b}=${ab}`) } },
  { id: 'div-mul', difficulty: 2, gen: r => { const b = ri(r, 2, 6), q = ri(r, 2, 9), a = b * q, c = ri(r, 2, 6), v = q * c; return mcNum(r, `${a} ÷ ${b} × ${c} = ?`, v, [q + c, q, b * c], plain, `${a}÷${b}=${q} แล้ว ×${c}`) } },
  { id: 'mul-sub', difficulty: 1, gen: r => { const a = ri(r, 3, 12), b = ri(r, 3, 12), ab = a * b, c = ri(r, 1, ab - 1), v = ab - c; return mcNum(r, `${a} × ${b} − ${c} = ?`, v, [ab + c, c, ab], plain, `คูณก่อน ${a}×${b}=${ab}`) } },
  { id: 'fill-add-mul', difficulty: 1, gen: r => { const a = ri(r, 5, 60), b = ri(r, 2, 12), c = ri(r, 2, 9); return { type: 'fill', q: `${a} + ${b} × ${c} = ___`, ans: String(a + b * c), hint: `คูณก่อน ${b}×${c}` } } },
  { id: 'fill-paren', difficulty: 2, gen: r => { const a = ri(r, 2, 20), b = ri(r, 2, 20), c = ri(r, 2, 9); return { type: 'fill', q: `(${a} + ${b}) × ${c} = ___`, ans: String((a + b) * c), hint: `วงเล็บก่อน ${a}+${b}` } } },
  { id: 'concept', difficulty: 1, gen: r => { const a = ri(r, 4, 20), b = ri(r, 2, 9); let c = ri(r, 2, 9); if (c === b) c = b === 9 ? 2 : b + 1; return { type: 'mc', q: `ในโจทย์ ${a} + ${b} × ${c} ต้องทำอะไรก่อน?`, opts: [`${b} × ${c}`, `${a} + ${b}`, 'ซ้ายไปขวา', `${a} + ${c}`], ans: 0, hint: 'คูณก่อนบวก' } } },
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: '100 − (4 + 6) × 5 = ?', opts: ['50', '450', '30', '480'], ans: 0, hint: 'วงเล็บ 10 → ×5=50 → 100−50' },
  { type: 'fill', q: '(12 + 8) ÷ 4 × 3 = ___', ans: '15', hint: 'วงเล็บ 20 ÷4=5 ×3' },
  { type: 'fill', q: '2 × (3 + 4) − 5 = ___', ans: '9', hint: 'วงเล็บ 7 ×2=14 −5' },
  { type: 'mc', q: '8 + 6 × 5 − 3 = ?', opts: ['35', '67', '37', '40'], ans: 0, hint: '6×5=30 → 8+30−3' },
]

const numberCalcExam: ChapterExam = { chapterId: 'math-6-number-calc', templates, bank }
export default numberCalcExam
