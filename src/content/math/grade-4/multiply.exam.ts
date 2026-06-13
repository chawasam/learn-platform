import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain, ppl } from '@/content/exams/helpers'

// แนวข้อสอบ การคูณ ป.4 — คูณ 2-4 หลัก × 1 หลัก, 2×2 หลัก, สมบัติ
const templates: QuestionTemplate[] = [
  { id: 'mul-2dig-1dig', difficulty: 1, gen: r => {
    const a = ri(r,12,99), b = ri(r,2,9)
    return { type: 'fill', q: `${a} × ${b} = ___`, ans: String(a*b), hint: `คูณหลักหน่วยก่อน` }
  }},
  { id: 'mul-3dig-1dig', difficulty: 1, gen: r => {
    const a = ri(r,101,999), b = ri(r,2,9)
    return mcNum(r, `${a} × ${b} = ?`, a*b, [a*b+b, a*(b+1), a*b-a], plain, `คูณทีละหลัก`)
  }},
  { id: 'mul-4dig-1dig', difficulty: 2, gen: r => {
    const a = ri(r,1001,4999), b = ri(r,2,9)
    return mcNum(r, `${a} × ${b} = ?`, a*b, [a*b+10, a*(b+1), (a+1)*b], plain, `จัดหลักตรงกัน`)
  }},
  { id: 'mul-2dig-2dig', difficulty: 2, gen: r => {
    const a = ri(r,12,50), b = ri(r,11,30)
    return { type: 'fill', q: `${a} × ${b} = ___`, ans: String(a*b), hint: `คูณแยก หลักหน่วย+หลักสิบ` }
  }},
  { id: 'mul-word-1', difficulty: 1, gen: r => {
    const boxes = ri(r,5,20), perBox = ri(r,4,12)
    return mcNum(r, `กล่อง ${boxes} กล่อง กล่องละ ${perBox} อัน รวม = ?`, boxes*perBox, [boxes+perBox, boxes*perBox+perBox, boxes*perBox-boxes], ppl, `${boxes}×${perBox}`)
  }},
  { id: 'mul-word-2', difficulty: 2, gen: r => {
    const days = ri(r,3,7), perDay = ri(r,100,500)
    return mcNum(r, `ทำงาน ${days} วัน วันละ ${perDay} บาท รวม = ?`, days*perDay, [days+perDay, days*perDay+100, days*perDay-perDay], plain, `${days}×${perDay}`)
  }},
  { id: 'commutative', difficulty: 1, gen: r => {
    const a = ri(r,3,12), b = ri(r,3,12)
    return { type: 'fill', q: `${a} × ${b} = ${b} × ___`, ans: String(a), hint: `สมบัติการสลับที่` }
  }},
  { id: 'associative', difficulty: 2, gen: r => {
    const a = ri(r,2,5), b = ri(r,2,5), c = ri(r,2,5)
    return { type: 'fill', q: `(${a} × ${b}) × ${c} = ${a} × (___ × ${c})`, ans: String(b), hint: `สมบัติการจัดหมู่` }
  }},
  { id: 'distributive', difficulty: 2, gen: r => {
    const a = ri(r,3,9), b = ri(r,10,30), c = ri(r,2,9)
    return mcNum(r, `${a} × (${b} + ${c}) = ?`, a*(b+c), [a*b+c, a*b*c, a*b+a*c+a], plain, `${a}×${b} + ${a}×${c} = ${a*b}+${a*c}`)
  }},
  { id: 'mul-10-100', difficulty: 1, gen: r => {
    const a = ri(r,3,99), m = [10,100][ri(r,0,1)]
    return { type: 'fill', q: `${a} × ${m} = ___`, ans: String(a*m), hint: `ต่อท้ายด้วย ${m===10?'1':'2'} ศูนย์` }
  }},
  { id: 'missing-factor', difficulty: 2, gen: r => {
    const b = ri(r,2,9), ans = ri(r,3,12)
    return { type: 'fill', q: `___ × ${b} = ${ans*b}`, ans: String(ans), hint: `${ans*b} ÷ ${b}` }
  }},
  { id: 'pattern-mul', difficulty: 2, gen: r => {
    const base = ri(r,2,5), step = ri(r,3,6)
    const a=base*step, b=base*step*2, c=base*step*3, d=base*step*4
    return mcNum(r, `${a}, ${b}, ${c}, ___ = ?`, d, [d+step, d-base, b], plain, `คูณ ${base*step} ไปเรื่อยๆ`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'สมบัติการสลับที่ของการคูณ หมายความว่าอย่างไร',
    opts: ['a × b = b × a', 'a × b = a + b', 'a × (b+c) = a×b + a×c', 'a × 1 = a'],
    ans: 0, hint: 'สลับที่ = ผลลัพธ์เท่าเดิม'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '45 × 7 = ___', ans: '315', hint: '45×7=315' },
  { type: 'mc', q: '123 × 4 = ?', opts: ['492', '482', '502', '412'], ans: 0, hint: '100×4+23×4=400+92=492' },
  { type: 'fill', q: '___ × 6 = 54', ans: '9', hint: '54÷6=9' },
]

const multiplyExam: ChapterExam = { chapterId: 'math-4-multiply', templates, bank }
export default multiplyExam
