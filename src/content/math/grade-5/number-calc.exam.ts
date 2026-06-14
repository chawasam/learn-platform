import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ จำนวนนับและการคำนวณ ป.5 — ลำดับการดำเนินการ + วงเล็บ + คูณหารหลายหลัก

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
  { id: 'div-remainder', difficulty: 2, gen: r => {
    const b = ri(r,3,8), q = ri(r,5,20), rem = ri(r,1,b-1)
    const a = b * q + rem
    return { type: 'fill', q: `${a} ÷ ${b} = ___ เศษ ${rem}`, ans: String(q), hint: `${b}×${q}=${b*q}, เหลือ ${rem}` }
  }},
  { id: 'bracket-div', difficulty: 2, gen: r => {
    const a = ri(r,2,8), b = ri(r,2,8), c = ri(r,2,6), s = (a+b)*c
    return mcNum(r, `${s} ÷ (${a} + ${b}) = ?`, c, [Math.floor(s/a), c+1, c-1>0?c-1:c+2], plain, `วงเล็บก่อน ${a}+${b}=${a+b}, แล้ว ${s}÷${a+b}`)
  }},
  { id: 'two-step', difficulty: 3, gen: r => {
    const a = ri(r,5,15), b = ri(r,2,6), c = ri(r,10,30)
    const v = a * b + c
    return mcNum(r, `${a} × ${b} + ${c} = ?`, v, [a*(b+c), (a+c)*b, a*b-c], plain, `คูณก่อน ${a}×${b}=${a*b} แล้วบวก ${c}`)
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
  { id: 'large-mult', difficulty: 3, gen: r => {
    const a = ri(r,10,50), b = ri(r,10,30)
    return { type: 'fill', q: `${a} × ${b} = ___`, ans: String(a*b), hint: `${a}×${b}` }
  }},
  { id: 'order-all', difficulty: 3, gen: r => {
    const a = ri(r,2,6), b = ri(r,2,5), c = ri(r,2,4), d = ri(r,1,5)
    const v = a * b + c * d
    return mcNum(r, `${a} × ${b} + ${c} × ${d} = ?`, v, [(a*b+c)*d, a*(b+c*d), a+b*c+d], plain, `คูณก่อนทั้งสองคู่: ${a}×${b}=${a*b}, ${c}×${d}=${c*d}, รวม ${v}`)
  }},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '12 + 3 × 5 = ___', ans: '27', hint: '3×5=15 ก่อน แล้ว 12+15=27' },
  { type: 'mc', q: '(45 + 15) ÷ 6 = ?', opts: ['10', '47.5', '50', '5'], ans: 0, hint: 'วงเล็บก่อน 45+15=60, แล้ว 60÷6=10' },
  { type: 'fill', q: '100 − 4 × 9 = ___', ans: '64', hint: '4×9=36 ก่อน, แล้ว 100−36=64' },
  { type: 'mc', q: '5 × 8 + 3 × 6 = ?', opts: ['58', '286', '70', '54'], ans: 0, hint: '5×8=40, 3×6=18, รวม 40+18=58' },
  { type: 'fill', q: 'จำนวนที่มากที่สุดในลำดับ 4, 9, 16, 25, ___, 49 คือ?', ans: '36', hint: '1², 2², 3², 4², 5², 6², 7² → ช่องว่างคือ 6²=36' },
]

const numberCalcExam: ChapterExam = { chapterId: 'math-5-number-calc', templates, bank }
export default numberCalcExam
