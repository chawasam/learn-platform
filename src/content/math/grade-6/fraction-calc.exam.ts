import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr } from '@/content/exams/helpers'

// แนวข้อสอบ เศษส่วนและการคำนวณ ป.6 — บวกลบส่วนต่าง (ค.ร.น.) + คูณ
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)

const templates: QuestionTemplate[] = [
  { id: 'same-add', difficulty: 1, gen: r => { const d = ri(r, 3, 12), a = ri(r, 1, d - 2), b = ri(r, 1, d - 1 - a); return { type: 'fill', q: `${a}/${d} + ${b}/${d} = ___/${d}`, ans: String(a + b), hint: 'ล่างเท่ากัน บวกตัวบน' } } },
  { id: 'same-sub', difficulty: 1, gen: r => { const d = ri(r, 3, 12), a = ri(r, 2, d - 1), b = ri(r, 1, a - 1); return { type: 'fill', q: `${a}/${d} − ${b}/${d} = ___/${d}`, ans: String(a - b), hint: 'ล่างเท่ากัน ลบตัวบน' } } },
  { id: 'diff-add', difficulty: 2, gen: r => { const d1 = ri(r, 2, 5), k = ri(r, 2, 4), d2 = d1 * k, b = ri(r, 1, k * (d1 - 1)); return { type: 'fill', q: `1/${d1} + ${b}/${d2} = ___/${d2}`, ans: String(k + b), hint: `1/${d1} = ${k}/${d2} แล้วบวก` } } },
  { id: 'mult', difficulty: 2, gen: r => { const b = ri(r, 3, 9), a = ri(r, 1, b - 1), d = ri(r, 3, 9), c = ri(r, 1, d - 1); return mcStr(r, `${a}/${b} × ${c}/${d} = ?`, `${a * c}/${b * d}`, [`${a + c}/${b + d}`, `${a * d}/${b * c}`, `${a * c}/${b + d}`, `${a + c}/${b * d}`, `${a * c}/${b}`, `${a * c}/${d}`, `${a * c + 1}/${b * d}`], 'บน×บน ล่าง×ล่าง') } },
  { id: 'mult-fill', difficulty: 2, gen: r => { const b = ri(r, 3, 9), a = ri(r, 1, b - 1), d = ri(r, 3, 9), c = ri(r, 1, d - 1); return { type: 'fill', q: `${a}/${b} × ${c}/${d} = ___/${b * d}`, ans: String(a * c), hint: 'บน×บน' } } },
  { id: 'lcm-denom', difficulty: 3, gen: r => { const d1 = ri(r, 2, 8); let d2 = ri(r, 2, 9); if (d2 === d1) d2 = d1 === 9 ? 2 : d1 + 1; const v = d1 * d2 / gcd(d1, d2); return mcNum(r, `ตัวส่วนร่วม (ค.ร.น.) ของ ${d1} และ ${d2} = ?`, v, [d1 * d2, d1 + d2, gcd(d1, d2)], n => `${n}`, 'หา ค.ร.น. ของตัวส่วน') } },
  { id: 'concept', difficulty: 1, gen: r => mcStr(r, 'บวกเศษส่วนที่ตัวล่างต่างกัน ต้องทำอะไรก่อน', 'ทำตัวล่างให้เท่ากันก่อน', ['บวกตัวล่างเลย', 'คูณไขว้', 'บวกบน-ล่างตรงๆ'], 'หา ค.ร.น. ของตัวส่วน') },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '1/2 + 1/3 = ___/6', ans: '5', hint: '3/6 + 2/6' },
  { type: 'mc', q: '1/2 × 1/3 = ?', opts: ['1/6', '2/5', '1/5', '2/6'], ans: 0, hint: 'บน×บน ล่าง×ล่าง' },
  { type: 'fill', q: '3/4 − 1/4 = ___/4', ans: '2', hint: 'ล่างเท่ากัน ลบตัวบน' },
]

const fractionCalcExam: ChapterExam = { chapterId: 'math-6-fraction-calc', templates, bank }
export default fractionCalcExam
