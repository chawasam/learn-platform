import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcDec, plain, round2 } from '@/content/exams/helpers'

// แนวข้อสอบ การคำนวณทศนิยม ป.6 — คูณ (นับจุดรวม) + หาร. คำตอบทศนิยม (mcDec)
const templates: QuestionTemplate[] = [
  { id: 'dec-int', difficulty: 2, gen: r => { const A = (ri(r, 1, 9) * 10 + ri(r, 1, 9)), a = round2(A / 10), c = ri(r, 2, 9), v = round2(a * c); return mcDec(r, `${a} × ${c} = ?`, v, [round2(a + c), A * c, a], plain, `${A}×${c} แล้วใส่จุด 1 ตำแหน่ง`) } },
  { id: 'dec-dec', difficulty: 3, gen: r => { const A = ri(r, 1, 9), B = ri(r, 1, 9), v = round2(A * B / 100); return mcDec(r, `0.${A} × 0.${B} = ?`, v, [round2(A * B / 10), A * B, round2(A * B / 1000)], plain, `${A}×${B} ใส่จุด 2 ตำแหน่ง`) } },
  { id: 'dec-div', difficulty: 3, gen: r => { const A = (ri(r, 1, 9) * 10 + ri(r, 1, 9)), v = round2(A / 10), c = ri(r, 2, 9), dividend = round2(v * c); return mcDec(r, `${dividend} ÷ ${c} = ?`, v, [round2(dividend), round2(v / c), round2(v * 10)], plain, `${dividend} ÷ ${c} แล้วใส่จุดกลับ`) } },
  { id: 'fill-dec-int', difficulty: 2, gen: r => { const A = (ri(r, 1, 9) * 10 + ri(r, 1, 9)), a = round2(A / 10), c = ri(r, 2, 9); return { type: 'fill', q: `${a} × ${c} = ___`, ans: String(round2(a * c)), hint: `${A}×${c} ใส่จุด` } } },
  { id: 'fill-dec-dec', difficulty: 3, gen: r => { const A = ri(r, 1, 9), B = ri(r, 1, 9); return { type: 'fill', q: `0.${A} × 0.${B} = ___`, ans: String(round2(A * B / 100)), hint: `${A}×${B} จุด 2 ตำแหน่ง` } } },
  { id: 'concept', difficulty: 1, gen: () => ({ type: 'mc', q: 'คูณทศนิยม นับจำนวนจุดอย่างไร', opts: ['นับหลังจุดรวมกัน', 'บวกจำนวนจุด', 'ไม่ต้องนับ', 'ลบจำนวนจุด'], ans: 0, hint: 'รวมตำแหน่งหลังจุดทั้งสองตัว' }) },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '2.5 × 4 = ___', ans: '10', hint: '25×4=100 จุด 1 ตำแหน่ง' },
  { type: 'mc', q: '1.2 × 0.5 = ?', opts: ['0.6', '6', '0.06', '1.7'], ans: 0, hint: '12×5=60 จุด 2 ตำแหน่ง' },
  { type: 'fill', q: '0.6 ÷ 2 = ___', ans: '0.3', hint: '6÷2=3 ใส่จุด' },
]

const decimalCalcExam: ChapterExam = { chapterId: 'math-6-decimal-calc', templates, bank }
export default decimalCalcExam
