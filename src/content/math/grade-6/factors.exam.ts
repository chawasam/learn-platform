import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ตัวประกอบ / ห.ร.ม. / ค.ร.น. ป.6 — distractor = สับสน ห.ร.ม.↔ค.ร.น.
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
const countDiv = (n: number) => { let c = 0; for (let i = 1; i <= n; i++) if (n % i === 0) c++; return c }

const templates: QuestionTemplate[] = [
  { id: 'hrm', difficulty: 2, gen: r => { const g = ri(r, 2, 9), m = ri(r, 2, 8), n = ri(r, 2, 8), a = g * m, b = g * n, v = gcd(a, b); return mcNum(r, `ห.ร.ม. ของ ${a} และ ${b} คือ?`, v, [a * b / v, Math.min(a, b), 2], plain, 'ตัวหารร่วมที่มากที่สุด') } },
  { id: 'krn', difficulty: 3, gen: r => { const g = ri(r, 2, 6), m = ri(r, 2, 6), n = ri(r, 2, 6), a = g * m, b = g * n, v = a * b / gcd(a, b); return mcNum(r, `ค.ร.น. ของ ${a} และ ${b} คือ?`, v, [a * b, a + b, gcd(a, b)], plain, 'ตัวคูณร่วมที่น้อยที่สุด') } },
  { id: 'count', difficulty: 2, gen: r => { const N = ri(r, 6, 40), v = countDiv(N); return mcNum(r, `${N} มีตัวประกอบกี่ตัว`, v, [Math.round(N / 2), v + 2, N], plain, `นับจำนวนที่หาร ${N} ลงตัว`) } },
  { id: 'is-factor', difficulty: 1, gen: r => { const N = ri(r, 2, 6) * ri(r, 2, 7); const facs: number[] = []; for (let i = 2; i < N; i++) if (N % i === 0) facs.push(i); const f = facs[Math.floor(r() * facs.length)]; const d: string[] = []; for (let i = 2; d.length < 3 && i <= N + 8; i++) if (N % i !== 0 && i !== f) d.push(String(i)); return mcStr(r, `ข้อใดเป็นตัวประกอบของ ${N}`, String(f), d, `${N} ÷ ตัวนั้นลงตัว`) } },
  { id: 'fill-hrm', difficulty: 2, gen: r => { const g = ri(r, 2, 9), m = ri(r, 2, 8), n = ri(r, 2, 8), a = g * m, b = g * n; return { type: 'fill', q: `ห.ร.ม. ของ ${a} และ ${b} = ___`, ans: String(gcd(a, b)), hint: 'ตัวหารร่วมมากที่สุด' } } },
  { id: 'fill-krn', difficulty: 3, gen: r => { const g = ri(r, 2, 6), m = ri(r, 2, 6), n = ri(r, 2, 6), a = g * m, b = g * n; return { type: 'fill', q: `ค.ร.น. ของ ${a} และ ${b} = ___`, ans: String(a * b / gcd(a, b)), hint: 'ตัวคูณร่วมน้อยที่สุด' } } },
  { id: 'concept', difficulty: 1, gen: () => ({ type: 'mc', q: 'ห.ร.ม. ใช้ทำอะไร', opts: ['แบ่งของให้ลงตัวพอดี', 'หารอบที่มาเจอกัน', 'บวกเลข', 'วัดมุม'], ans: 0, hint: 'ตัวหารร่วม = แบ่งลงตัว' }) },
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'ห.ร.ม. ของ 12 และ 18 คือ?', opts: ['6', '2', '3', '36'], ans: 0, hint: 'ตัวหารร่วม 1,2,3,6 → มากสุด 6' },
  { type: 'mc', q: 'ค.ร.น. ของ 4 และ 6 คือ?', opts: ['12', '24', '2', '10'], ans: 0, hint: '4,8,12 / 6,12 เจอที่ 12' },
  { type: 'fill', q: 'ตัวประกอบของ 10 คือ 1, 2, 5, ___', ans: '10', hint: '10 หาร 10 ลงตัว' },
]

const factorsExam: ChapterExam = { chapterId: 'math-6-factors', templates, bank }
export default factorsExam
