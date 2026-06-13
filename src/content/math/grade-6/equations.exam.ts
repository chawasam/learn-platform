import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ สมการ ป.6 — ตาชั่งสมดุล หา x. distractor = บวกแทนลบ / คูณแทนหาร
const templates: QuestionTemplate[] = [
  { id: 'add', difficulty: 1, gen: r => { const x = ri(r, 1, 40), a = ri(r, 1, 30), b = x + a; return mcNum(r, `x + ${a} = ${b} แล้ว x = ?`, x, [b + a, a, b], plain, `${b} − ${a}`) } },
  { id: 'sub', difficulty: 1, gen: r => { const a = ri(r, 1, 20), x = ri(r, a + 1, a + 40), b = x - a; return mcNum(r, `x − ${a} = ${b} แล้ว x = ?`, x, [b - a, a, b], plain, `${b} + ${a}`) } },
  { id: 'mul', difficulty: 2, gen: r => { const x = ri(r, 2, 12), a = ri(r, 2, 9), b = a * x; return mcNum(r, `${a}x = ${b} แล้ว x = ?`, x, [b * a, b - a, b + a], plain, `${b} ÷ ${a}`) } },
  { id: 'fill-add', difficulty: 1, gen: r => { const x = ri(r, 1, 40), a = ri(r, 1, 30); return { type: 'fill', q: `x + ${a} = ${x + a} แล้ว x = ___`, ans: String(x), hint: `ลบ ${a} ทั้งสองข้าง` } } },
  { id: 'fill-sub', difficulty: 1, gen: r => { const a = ri(r, 1, 20), x = ri(r, a + 1, a + 40); return { type: 'fill', q: `x − ${a} = ${x - a} แล้ว x = ___`, ans: String(x), hint: `บวก ${a} ทั้งสองข้าง` } } },
  { id: 'fill-mul', difficulty: 2, gen: r => { const x = ri(r, 2, 12), a = ri(r, 2, 9); return { type: 'fill', q: `${a}x = ${a * x} แล้ว x = ___`, ans: String(x), hint: `หาร ${a} ทั้งสองข้าง` } } },
  { id: 'concept', difficulty: 1, gen: () => ({ type: 'mc', q: 'แก้สมการต้องทำอย่างไร', opts: ['ทำสองข้างเหมือนกัน', 'ทำข้างเดียว', 'ลบมั่วๆ', 'เดา'], ans: 0, hint: 'ตาชั่งต้องสมดุล' }) },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'x + 5 = 12 แล้ว x = ___', ans: '7', hint: 'ลบ 5 ทั้งสองข้าง' },
  { type: 'mc', q: 'ถ้า 3x = 15 แล้ว x = ?', opts: ['5', '3', '12', '45'], ans: 0, hint: 'หาร 3 ทั้งสองข้าง' },
  { type: 'fill', q: 'x − 4 = 10 แล้ว x = ___', ans: '14', hint: 'บวก 4 ทั้งสองข้าง' },
]

const equationsExam: ChapterExam = { chapterId: 'math-6-equations', templates, bank }
export default equationsExam
