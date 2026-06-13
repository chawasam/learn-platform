import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ลำดับการคำนวณ (order of operations) ป.4 — บวกลบคูณหาร + วงเล็บ
const templates: QuestionTemplate[] = [
  { id: 'mul-before-add', difficulty: 1, gen: r => {
    const a = ri(r,2,8), b = ri(r,2,6), c = ri(r,5,20)
    return { type: 'fill', q: `${c} + ${a} × ${b} = ___`, ans: String(c + a*b), hint: `คูณก่อนบวก: ${c} + ${a*b}` }
  }},
  { id: 'mul-before-sub', difficulty: 1, gen: r => {
    const a = ri(r,2,8), b = ri(r,2,6), c = ri(r,a*b+5, a*b+30)
    return { type: 'fill', q: `${c} − ${a} × ${b} = ___`, ans: String(c - a*b), hint: `คูณก่อนลบ: ${c} − ${a*b}` }
  }},
  { id: 'div-before-add', difficulty: 1, gen: r => {
    const b = ri(r,2,6), q = ri(r,3,10), c = ri(r,5,20)
    return { type: 'fill', q: `${c} + ${b*q} ÷ ${b} = ___`, ans: String(c + q), hint: `หารก่อนบวก: ${c} + ${q}` }
  }},
  { id: 'bracket-first', difficulty: 2, gen: r => {
    const a = ri(r,5,15), b = ri(r,2,8), c = ri(r,2,6)
    return mcNum(r, `(${a} + ${b}) × ${c} = ?`, (a+b)*c, [a + b*c, a*c + b, (a+b)+c], plain, `วงเล็บก่อน: (${a+b})×${c}`)
  }},
  { id: 'bracket-sub-mul', difficulty: 2, gen: r => {
    const a = ri(r,10,30), b = ri(r,2,8), c = ri(r,2,6)
    return mcNum(r, `(${a} − ${b}) × ${c} = ?`, (a-b)*c, [a*c - b, a - b*c, (a-b)+c], plain, `วงเล็บก่อน: (${a-b})×${c}`)
  }},
  { id: 'no-bracket', difficulty: 2, gen: r => {
    const a = ri(r,3,10), b = ri(r,2,5), c = ri(r,2,8)
    const correct = a*b + c
    const wrong = a*(b+c)
    return mcNum(r, `${a} × ${b} + ${c} = ?`, correct, [wrong, a*b*c, correct+a], plain, `คูณก่อน: ${a*b}+${c}`)
  }},
  { id: 'chain-add-mul', difficulty: 2, gen: r => {
    const a = ri(r,2,6), b = ri(r,2,6), c = ri(r,2,6)
    return { type: 'fill', q: `${a} × ${b} + ${b} × ${c} = ___`, ans: String(a*b + b*c), hint: `${a*b} + ${b*c}` }
  }},
  { id: 'bracket-add-div', difficulty: 2, gen: r => {
    const b = ri(r,2,5), a1 = ri(r,2,8), a2 = ri(r,1,8)
    const sum = a1+a2
    const div = ri(r,2,4)
    const a1adj = sum % div === 0 ? a1 : a1 + (div - sum%div)
    const newSum = a1adj + a2
    return mcNum(r, `(${a1adj} + ${a2}) ÷ ${div} = ?`, newSum/div, [newSum+div, a1adj/div + a2, newSum*div], plain, `(${newSum})÷${div}`)
  }},
  { id: 'left-to-right', difficulty: 1, gen: r => {
    const a = ri(r,20,50), b = ri(r,5,a-5), c = ri(r,5,20)
    return { type: 'fill', q: `${a} − ${b} + ${c} = ___`, ans: String(a-b+c), hint: `บวกลบเท่ากัน → ซ้ายไปขวา` }
  }},
  { id: 'compare-brackets', difficulty: 2, gen: r => {
    const a = ri(r,3,8), b = ri(r,2,5), c = ri(r,2,5)
    const withBracket = (a+b)*c
    const noBracket = a + b*c
    const bigger = withBracket > noBracket ? `(${a}+${b})×${c}` : `${a}+${b}×${c}`
    return mcNum(r, `(${a}+${b})×${c} กับ ${a}+${b}×${c} ผลลัพธ์ใดมากกว่า`, Math.max(withBracket, noBracket), [Math.min(withBracket, noBracket), withBracket+noBracket, withBracket-noBracket], plain, `${withBracket} vs ${noBracket}`)
  }},
  { id: 'word-ops', difficulty: 2, gen: r => {
    const price = ri(r,5,20), qty = ri(r,3,8), discount = ri(r,5,price*qty-5)
    return mcNum(r, `ซื้อของ ${qty} ชิ้น ชิ้นละ ${price} บาท ลด ${discount} บาท จ่าย = ?`, price*qty - discount, [price*qty + discount, price + qty - discount, price*qty*discount], plain, `${qty}×${price}−${discount}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ลำดับการคำนวณ: ควรทำอะไรก่อน',
    opts: ['วงเล็บ → คูณ/หาร → บวก/ลบ', 'บวก/ลบ → คูณ/หาร → วงเล็บ', 'ซ้ายไปขวาเสมอ', 'คูณ → วงเล็บ → บวก'],
    ans: 0, hint: 'BODMAS: Brackets → ×÷ → +−'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '5 + 3 × 4 = ___', ans: '17', hint: 'คูณก่อน: 5+12=17' },
  { type: 'mc', q: '(6 + 4) × 3 = ?', opts: ['30', '18', '22', '24'], ans: 0, hint: 'วงเล็บก่อน: 10×3=30' },
  { type: 'fill', q: '20 − 12 ÷ 4 = ___', ans: '17', hint: 'หารก่อน: 20-3=17' },
]

const mixedExam: ChapterExam = { chapterId: 'math-4-mixed', templates, bank }
export default mixedExam
