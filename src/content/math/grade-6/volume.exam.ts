import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ปริมาตร + พื้นที่ผิว ป.6 — ทุกผลจำนวนเต็ม
// distractor = สับสนสูตร (ปริมาตร↔พื้นที่ผิว, คูณ↔บวกมิติ)
const templates: QuestionTemplate[] = [
  { id: 'box-vol', difficulty: 1, gen: r => { const l = ri(r, 2, 10), w = ri(r, 2, 10), h = ri(r, 2, 10), v = l * w * h; return mcNum(r, `กล่องกว้าง ${l} ยาว ${w} สูง ${h} ปริมาตรเท่าไร (ลบ.หน่วย)`, v, [l + w + h, l * w, w * h], plain, `${l} × ${w} × ${h}`) } },
  { id: 'cube-vol', difficulty: 2, gen: r => { const s = ri(r, 2, 10), v = s * s * s; return mcNum(r, `ลูกบาศก์ด้านยาว ${s} ปริมาตรเท่าไร (ลบ.หน่วย)`, v, [s * s, 6 * s * s, 3 * s], plain, `${s} × ${s} × ${s}`) } },
  { id: 'cube-surface', difficulty: 3, gen: r => { const s = ri(r, 2, 9), v = 6 * s * s; return mcNum(r, `ลูกบาศก์ด้านยาว ${s} พื้นที่ผิวรวมเท่าไร (ตร.หน่วย)`, v, [s * s * s, s * s, 4 * s * s], plain, `6 หน้า × (${s}×${s})`) } },
  { id: 'base-count', difficulty: 1, gen: r => { const l = ri(r, 2, 9), w = ri(r, 2, 9), v = l * w; return mcNum(r, `ฐานกว้าง ${l} ยาว ${w} วางลูกบาศก์ชั้นเดียวได้กี่ก้อน`, v, [l + w, 2 * (l + w), l * l], plain, `${l} × ${w}`) } },
  { id: 'base-height', difficulty: 2, gen: r => { const B = ri(r, 4, 30), h = ri(r, 2, 9), v = B * h; return mcNum(r, `ฐาน ${B} ลูกบาศก์ ซ้อนสูง ${h} ชั้น ปริมาตรเท่าไร`, v, [B + h, B, h], plain, `${B} × ${h}`) } },
  { id: 'find-height', difficulty: 3, gen: r => { const l = ri(r, 2, 8), w = ri(r, 2, 8), h = ri(r, 2, 9), vol = l * w * h; return mcNum(r, `กล่องปริมาตร ${vol} ฐานกว้าง ${l} ยาว ${w} สูงเท่าไร`, h, [vol - l * w, l * w, l + w], plain, `${vol} ÷ (${l}×${w})`) } },
  { id: 'fill-box', difficulty: 1, gen: r => { const l = ri(r, 2, 10), w = ri(r, 2, 10), h = ri(r, 2, 10); return { type: 'fill', q: `กล่อง ${l} × ${w} × ${h} ปริมาตร = ___ ลบ.หน่วย`, ans: String(l * w * h), hint: 'กว้าง×ยาว×สูง' } } },
  { id: 'fill-cube', difficulty: 2, gen: r => { const s = ri(r, 2, 10); return { type: 'fill', q: `ลูกบาศก์ด้าน ${s} ปริมาตร = ___ ลบ.หน่วย`, ans: String(s * s * s), hint: `${s}×${s}×${s}` } } },
  { id: 'faces', difficulty: 1, gen: () => ({ type: 'mc', q: 'กล่องทรงสี่เหลี่ยม (ลูกบาศก์) มีกี่หน้า', opts: ['6', '4', '8', '12'], ans: 0, hint: 'บน ล่าง + 4 ข้าง' }) },
  { id: 'unit', difficulty: 1, gen: () => ({ type: 'mc', q: 'ปริมาตรวัดเป็นหน่วยอะไร', opts: ['ลูกบาศก์หน่วย', 'ตารางหน่วย', 'หน่วย', 'องศา'], ans: 0, hint: '3 มิติ' }) },
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'กล่อง 2 × 3 × 4 ปริมาตรเท่าไร (ลบ.หน่วย)', opts: ['24', '9', '14', '20'], ans: 0, hint: '2×3×4' },
  { type: 'fill', q: 'ลูกบาศก์ด้าน 10 ปริมาตร = ___ ลบ.หน่วย', ans: '1000', hint: '10×10×10' },
  { type: 'mc', q: 'ลูกบาศก์ด้าน 3 พื้นที่ผิวรวมเท่าไร (ตร.หน่วย)', opts: ['54', '27', '36', '9'], ans: 0, hint: '6 × (3×3) = 6×9' },
]

const volumeExam: ChapterExam = { chapterId: 'math-6-volume', templates, bank }
export default volumeExam
