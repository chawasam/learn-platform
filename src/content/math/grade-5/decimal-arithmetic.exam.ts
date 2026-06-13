import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcDec, round2, plain } from '@/content/exams/helpers'

// แนวข้อสอบ การคำนวณทศนิยม ป.5 — บวกลบทศนิยม 1-2 ตำแหน่ง + คูณด้วยจำนวนเต็ม
const templates: QuestionTemplate[] = [
  { id: 'add-1dec', difficulty: 1, gen: r => {
    const a = ri(r,10,59), b = ri(r,10,39)
    const v = round2((a+b)/10)
    return { type: 'fill', q: `${round2(a/10)} + ${round2(b/10)} = ___`, ans: String(v), hint: 'จัดทศนิยมตรงตำแหน่ง แล้วบวก' }
  }},
  { id: 'sub-1dec', difficulty: 1, gen: r => {
    const b = ri(r,10,49), a = ri(r,b+1,90)
    const v = round2((a-b)/10)
    return { type: 'fill', q: `${round2(a/10)} − ${round2(b/10)} = ___`, ans: String(v), hint: 'จัดทศนิยมตรงตำแหน่ง แล้วลบ' }
  }},
  { id: 'add-2dec', difficulty: 2, gen: r => {
    const a = ri(r,100,450), b = ri(r,100,299)
    const v = round2((a+b)/100)
    return { type: 'fill', q: `${round2(a/100)} + ${round2(b/100)} = ___`, ans: String(v), hint: 'จัดจุดตรงกัน บวกทีละหลัก' }
  }},
  { id: 'sub-2dec', difficulty: 2, gen: r => {
    const b = ri(r,100,299), a = ri(r,b+50,750)
    const v = round2((a-b)/100)
    return { type: 'fill', q: `${round2(a/100)} − ${round2(b/100)} = ___`, ans: String(v), hint: 'จัดจุดตรงกัน ลบทีละหลัก' }
  }},
  { id: 'mult-dec-int', difficulty: 2, gen: r => {
    const A = ri(r,1,9)*10 + ri(r,1,9), c = ri(r,2,6)
    const v = round2(A*c/10)
    return mcDec(r, `${round2(A/10)} × ${c} = ?`, v, [round2(A+c/10), round2(A/10+c), round2(A*c)], plain, `${A}×${c} ใส่จุด 1 ตำแหน่ง`)
  }},
  { id: 'add-whole-dec', difficulty: 1, gen: r => {
    const whole = ri(r,1,9), dec = ri(r,1,9)
    const v = round2(whole + dec/10)
    return { type: 'fill', q: `${whole} + 0.${dec} = ___`, ans: String(v), hint: `${whole}.0 + 0.${dec}` }
  }},
  { id: 'sub-from-whole', difficulty: 2, gen: r => {
    const whole = ri(r,2,9), dec = ri(r,1,9)
    const v = round2(whole - dec/10)
    return mcDec(r, `${whole} − 0.${dec} = ?`, v, [round2(whole+dec/10), round2(dec/10), round2(whole-dec)], plain, `${whole}.0 − 0.${dec}`)
  }},
  { id: 'chain-sum', difficulty: 2, gen: r => {
    const a = ri(r,10,40), b = ri(r,10,30), c = ri(r,10,25)
    const v = round2((a+b+c)/10)
    return mcDec(r, `${round2(a/10)} + ${round2(b/10)} + ${round2(c/10)} = ?`, v, [round2((a+b)/10), round2((a+c)/10), round2(v+1)], plain, 'บวกทีละคู่')
  }},
  { id: 'missing-addend', difficulty: 2, gen: r => {
    const total = ri(r,30,80), a = ri(r,10,total-10)
    const v = round2((total-a)/10)
    return { type: 'fill', q: `${round2(a/10)} + ___ = ${round2(total/10)}`, ans: String(v), hint: `${round2(total/10)} − ${round2(a/10)}` }
  }},
  { id: 'concept-align', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'บวกลบทศนิยม สิ่งสำคัญที่สุดคือ',
    opts: ['จัดจุดทศนิยมให้ตรงกัน', 'บวกซ้ายไปขวาเสมอ', 'ละทศนิยมไปก่อน แล้วค่อยใส่จุด', 'ทำตัวบน-ล่างเสมอ'],
    ans: 0, hint: 'จัดจุดตรงกัน ไม่งั้นหลักผิด'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '3.4 + 2.7 = ___', ans: '6.1', hint: '34+27=61 ใส่จุด 1 ตำแหน่ง' },
  { type: 'fill', q: '5.6 − 1.9 = ___', ans: '3.7', hint: '56-19=37 ใส่จุด 1 ตำแหน่ง' },
  { type: 'fill', q: '1.5 × 4 = ___', ans: '6', hint: '15×4=60 ใส่จุด → 6.0 = 6' },
]

const decimalArithExam: ChapterExam = { chapterId: 'math-5-decimal-arith', templates, bank }
export default decimalArithExam
