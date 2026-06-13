import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ จำนวนนับและการคำนวณ ป.5 — ลำดับ ops + คูณหารหลายหลัก + ห.ร.ม./ค.ร.น.
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)

const templates: QuestionTemplate[] = [
  { id: 'order-add-mul', difficulty: 2, gen: r => {
    const a = ri(r,2,9), b = ri(r,2,9), c = ri(r,2,6)
    const v = a + b * c
    return mcNum(r, `${a} + ${b} × ${c} = ?`, v, [(a+b)*c, a*b+c, a+b+c], plain, 'คูณก่อน บวกทีหลัง')
  }},
  { id: 'order-sub-mul', difficulty: 2, gen: r => {
    const a = ri(r,10,30), b = ri(r,2,6), c = ri(r,2,5)
    const v = a - b * c
    return mcNum(r, `${a} − ${b} × ${c} = ?`, v, [(a-b)*c, a*b-c, a-b+c], plain, 'คูณก่อน ลบทีหลัง')
  }},
  { id: 'bracket', difficulty: 2, gen: r => {
    const a = ri(r,2,8), b = ri(r,2,8), c = ri(r,2,5)
    return { type: 'fill', q: `(${a} + ${b}) × ${c} = ___`, ans: String((a+b)*c), hint: 'วงเล็บก่อน' }
  }},
  { id: 'mult-2dig', difficulty: 2, gen: r => {
    const a = ri(r,11,99), b = ri(r,3,9)
    return { type: 'fill', q: `${a} × ${b} = ___`, ans: String(a*b), hint: `${a}×${b}` }
  }},
  { id: 'div-exact', difficulty: 2, gen: r => {
    const b = ri(r,3,9), q = ri(r,11,40)
    const a = b * q
    return mcNum(r, `${a} ÷ ${b} = ?`, q, [q+b, q*2, Math.round(a/3)], plain, `${b}×${q}=${a}`)
  }},
  { id: 'hcf', difficulty: 2, gen: r => {
    const g = ri(r,2,6), x = ri(r,2,7), y = ri(r,3,8)
    const a = g*x, b = g*y, v = gcd(a,b), lcmV = a*b/v
    return mcNum(r, `ห.ร.ม. ของ ${a} และ ${b} = ?`, v, [lcmV, Math.min(a,b), v+g], plain, 'ตัวร่วมมากที่สุด')
  }},
  { id: 'lcm', difficulty: 2, gen: r => {
    const a = ri(r,2,8), b = ri(r,3,9), g = gcd(a,b), v = a*b/g
    return mcNum(r, `ค.ร.น. ของ ${a} และ ${b} = ?`, v, [g, a*b, Math.max(a,b)], plain, 'คูณกัน ÷ ห.ร.ม.')
  }},
  { id: 'square', difficulty: 1, gen: r => {
    const n = ri(r,2,15)
    return mcNum(r, `${n}² = ?`, n*n, [n*2, (n+1)*(n+1), n*(n-1)], plain, `${n}×${n}`)
  }},
  { id: 'cube', difficulty: 2, gen: r => {
    const n = ri(r,2,6)
    return { type: 'fill', q: `${n}³ = ___`, ans: String(n*n*n), hint: `${n}×${n}×${n}` }
  }},
  { id: 'factor-cnt', difficulty: 2, gen: r => {
    const N = ri(r,10,36)
    let cnt = 0; for (let i=1;i<=N;i++) if (N%i===0) cnt++
    return mcNum(r, `${N} มีตัวประกอบกี่ตัว`, cnt, [cnt+1, cnt+2, cnt-1>0?cnt-1:cnt+3], plain, 'ลองหาร 1, 2, 3...')
  }},
  { id: 'prime', difficulty: 1, gen: r => {
    const pool = [2,3,5,7,11,13,17,19,4,6,8,9,10,12,14,15]
    const N = pool[Math.floor(r()*16)]
    const isPrime = [2,3,5,7,11,13,17,19].includes(N)
    return mcStr(r, `${N} เป็นจำนวนเฉพาะหรือไม่`, isPrime?'ใช่':'ไม่ใช่',
      isPrime?['ไม่ใช่','บอกไม่ได้','เฉพาะเลขคี่เท่านั้น']:['ใช่','บอกไม่ได้','เฉพาะเลขคี่เท่านั้น'],
      'จำนวนเฉพาะ = มีตัวประกอบ 2 ตัวเท่านั้น (1 กับตัวเอง)')
  }},
  { id: 'pattern', difficulty: 2, gen: r => {
    const s = ri(r,1,8), d = ri(r,2,7)
    const ans = s + 3*d
    return mcNum(r, `${s}, ${s+d}, ${s+2*d}, ___ = ?`, ans, [ans+d, s+2*d, s], plain, `เพิ่มทีละ ${d}`)
  }},
  { id: 'concept-order', difficulty: 1, gen: () => ({
    type: 'mc', q: 'ข้อใดถูกต้องเกี่ยวกับลำดับการคำนวณ',
    opts: ['คูณ/หารก่อน บวก/ลบทีหลัง', 'บวก/ลบก่อน คูณ/หารทีหลัง', 'ทำซ้ายไปขวาเสมอโดยไม่มีข้อยกเว้น', 'ลบก่อนบวกเสมอ'],
    ans: 0, hint: 'วงเล็บ → × ÷ → + −'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '12 + 3 × 5 = ___', ans: '27', hint: '3×5=15 ก่อน แล้ว 12+15=27' },
  { type: 'mc', q: 'ห.ร.ม. ของ 24 และ 36 = ?', opts: ['12', '6', '72', '4'], ans: 0, hint: '24=2³×3, 36=2²×3² → ห.ร.ม.=2²×3=12' },
  { type: 'fill', q: 'ค.ร.น. ของ 6 และ 8 = ___', ans: '24', hint: '6×4=24, 8×3=24 → ค.ร.น.=24' },
  { type: 'mc', q: '5² + 3² = ?', opts: ['34', '64', '16', '30'], ans: 0, hint: '25+9=34' },
  { type: 'fill', q: 'จำนวนเฉพาะที่น้อยกว่า 10 มีกี่จำนวน', ans: '4', hint: '2, 3, 5, 7 = 4 จำนวน' },
]

const numberCalcExam: ChapterExam = { chapterId: 'math-5-number-calc', templates, bank }
export default numberCalcExam
