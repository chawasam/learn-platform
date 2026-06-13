import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ พื้นที่รูปสี่เหลี่ยม ป.6 — distractor = หาเส้นรอบรูปแทนพื้นที่ / ลืม ½ (คางหมู)
const templates: QuestionTemplate[] = [
  { id: 'rect', difficulty: 1, gen: r => { const l = ri(r, 2, 20), w = ri(r, 2, 20), v = l * w; return mcNum(r, `ผืนผ้ากว้าง ${l} ยาว ${w} พื้นที่กี่ตร.หน่วย`, v, [2 * (l + w), l + w, l * l], plain, `${l} × ${w}`) } },
  { id: 'square', difficulty: 1, gen: r => { const s = ri(r, 2, 20), v = s * s; return mcNum(r, `จัตุรัสด้าน ${s} พื้นที่กี่ตร.หน่วย`, v, [4 * s, 2 * s, s * 3], plain, `${s} × ${s}`) } },
  { id: 'parallelogram', difficulty: 2, gen: r => { const b = ri(r, 3, 20), h = ri(r, 2, 15), v = b * h; return mcNum(r, `สี่เหลี่ยมด้านขนาน ฐาน ${b} สูง ${h} พื้นที่เท่าไร`, v, [b + h, 2 * (b + h), b * 2], plain, `ฐาน × สูง = ${b} × ${h}`) } },
  { id: 'trapezoid', difficulty: 3, gen: r => { const a = 2 * ri(r, 1, 8), b = 2 * ri(r, 1, 8), h = ri(r, 2, 9), v = (a + b) / 2 * h; return mcNum(r, `คางหมู ด้านขนาน ${a} และ ${b} สูง ${h} พื้นที่เท่าไร`, v, [(a + b) * h, a * b, (a + b) + h], plain, `½ × (${a}+${b}) × ${h}`) } },
  { id: 'fill-rect', difficulty: 1, gen: r => { const l = ri(r, 2, 20), w = ri(r, 2, 20); return { type: 'fill', q: `ผืนผ้ากว้าง ${l} ยาว ${w} พื้นที่ = ___ ตร.หน่วย`, ans: String(l * w), hint: 'กว้าง × ยาว' } } },
  { id: 'fill-square', difficulty: 1, gen: r => { const s = ri(r, 2, 20); return { type: 'fill', q: `จัตุรัสด้าน ${s} พื้นที่ = ___ ตร.หน่วย`, ans: String(s * s), hint: `${s} × ${s}` } } },
  { id: 'concept', difficulty: 1, gen: () => ({ type: 'mc', q: 'พื้นที่สี่เหลี่ยมผืนผ้าหาอย่างไร', opts: ['กว้าง × ยาว', 'กว้าง + ยาว', '(กว้าง + ยาว) × 2', 'ด้าน × 4'], ans: 0, hint: 'พื้นที่ = ก × ย' }) },
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'คางหมูด้านขนาน 4 และ 6 สูง 5 พื้นที่เท่าไร', opts: ['25', '50', '30', '15'], ans: 0, hint: '½ × (4+6) × 5 = ½ × 10 × 5' },
  { type: 'fill', q: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่ = ___ ตร.หน่วย', ans: '54', hint: '6 × 9' },
  { type: 'mc', q: 'ด้านขนานฐาน 8 สูง 5 พื้นที่เท่าไร', opts: ['40', '13', '20', '45'], ans: 0, hint: 'ฐาน × สูง = 8×5' },
]

const quadAreaExam: ChapterExam = { chapterId: 'math-6-quad-area', templates, bank }
export default quadAreaExam
