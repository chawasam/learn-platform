import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ เศษส่วน ป.4 — เศษส่วนเบื้องต้น, numerator/denominator, เปรียบเทียบ, proper vs improper
const templates: QuestionTemplate[] = [
  { id: 'read-frac', difficulty: 1, gen: r => {
    const d = ri(r,2,10), n = ri(r,1,d-1)
    return { type: 'fill', q: `เศษส่วน ${n}/${d} ตัวส่วน (denominator) = ___`, ans: String(d), hint: `ตัวส่วนคือตัวเลขล่าง` }
  }},
  { id: 'read-numerator', difficulty: 1, gen: r => {
    const d = ri(r,3,12), n = ri(r,1,d-1)
    return { type: 'fill', q: `เศษส่วน ${n}/${d} ตัวเศษ (numerator) = ___`, ans: String(n), hint: `ตัวเศษคือตัวเลขบน` }
  }},
  { id: 'shade-frac', difficulty: 1, gen: r => {
    const d = ri(r,3,8), n = ri(r,1,d-1)
    return { type: 'fill', q: `แบ่งรูปเป็น ${d} ส่วน ระบาย ${n} ส่วน เศษส่วนที่ระบาย = ___`, ans: `${n}/${d}`, hint: `ส่วนที่ระบาย/ส่วนทั้งหมด` }
  }},
  { id: 'proper-check', difficulty: 1, gen: r => {
    const d = ri(r,3,9), n = ri(r,1,d-1)
    return mcStr(r, `${n}/${d} เป็นเศษส่วนชนิดใด`,
      'เศษส่วนแท้ (ตัวเศษ < ตัวส่วน)',
      ['เศษส่วนเกิน (ตัวเศษ > ตัวส่วน)', 'จำนวนคละ', 'จำนวนเต็ม'],
      `${n} < ${d} → เศษส่วนแท้`)
  }},
  { id: 'improper-check', difficulty: 2, gen: r => {
    const d = ri(r,2,6), n = ri(r,d+1,d*2)
    return mcStr(r, `${n}/${d} เป็นเศษส่วนชนิดใด`,
      'เศษส่วนเกิน (ตัวเศษ ≥ ตัวส่วน)',
      ['เศษส่วนแท้ (ตัวเศษ < ตัวส่วน)', 'เศษส่วนเท่ากับ 0', 'ไม่ใช่เศษส่วน'],
      `${n} ≥ ${d} → เศษส่วนเกิน`)
  }},
  { id: 'compare-same-d', difficulty: 1, gen: r => {
    const d = ri(r,4,10), n1 = ri(r,1,d-2), n2 = ri(r,n1+1,d-1)
    return mcStr(r, `${n1}/${d} กับ ${n2}/${d} ตัวใดมากกว่า`,
      `${n2}/${d}`,
      [`${n1}/${d}`, 'เท่ากัน', 'บอกไม่ได้'],
      `ตัวส่วนเท่ากัน เปรียบตัวเศษ: ${n2} > ${n1}`)
  }},
  { id: 'compare-same-n', difficulty: 2, gen: r => {
    const n = ri(r,1,4), d1 = ri(r,n+2,10), d2 = ri(r,n+1,d1-1)
    return mcStr(r, `${n}/${d1} กับ ${n}/${d2} ตัวใดมากกว่า`,
      `${n}/${d2}`,
      [`${n}/${d1}`, 'เท่ากัน', 'บอกไม่ได้'],
      `ตัวเศษเท่ากัน ตัวส่วนน้อยกว่า ค่ามากกว่า: ${d2}<${d1}`)
  }},
  { id: 'frac-of-set', difficulty: 2, gen: r => {
    const total = ri(r,2,5)*ri(r,2,4), n = ri(r,1,3), d = [2,3,4][ri(r,0,2)]
    const valid = (total % d === 0) ? total : (Math.ceil(total/d)*d)
    const ans = Math.floor(valid*n/d)
    return mcNum(r, `มีแอปเปิ้ล ${valid} ผล ${n}/${d} ของทั้งหมด = ?`, ans, [valid-ans, valid*n, ans+d], plain, `${valid}×${n}÷${d}`)
  }},
  { id: 'mixed-read', difficulty: 2, gen: r => {
    const whole = ri(r,1,5), n = ri(r,1,3), d = ri(r,n+1,6)
    return { type: 'fill', q: `จำนวนคละ ${whole} และ ${n}/${d} — ส่วนที่เป็นเศษส่วน = ___`, ans: `${n}/${d}`, hint: `จำนวนคละ = จำนวนเต็ม + เศษส่วน` }
  }},
  { id: 'unit-frac', difficulty: 1, gen: r => {
    const d = ri(r,2,10)
    return mcStr(r, `เศษส่วนหน่วย (unit fraction) คือข้อใด`,
      `1/${d}`,
      [`2/${d}`, `${d}/1`, `${d}/${d+1}`, `0/${d}`],
      'unit fraction ตัวเศษ = 1')
  }},
  { id: 'order-frac', difficulty: 2, gen: r => {
    const d = ri(r,4,8), n1=1, n2=ri(r,2,d-2), n3=d-1
    return mcStr(r, `เรียงจากน้อยไปมาก: ${n3}/${d}, ${n1}/${d}, ${n2}/${d}`,
      `${n1}/${d} < ${n2}/${d} < ${n3}/${d}`,
      [`${n3}/${d} < ${n2}/${d} < ${n1}/${d}`, `${n1}/${d} < ${n3}/${d} < ${n2}/${d}`, `${n2}/${d} < ${n1}/${d} < ${n3}/${d}`],
      'ตัวส่วนเท่ากัน เปรียบตัวเศษ')
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'เศษส่วน 3/5 หมายความว่าอย่างไร',
    opts: ['แบ่ง 5 ส่วนเท่ากัน เอา 3 ส่วน', 'แบ่ง 3 ส่วนเท่ากัน เอา 5 ส่วน', '3 บวก 5', '3 คูณ 5'],
    ans: 0, hint: 'ตัวส่วน = แบ่งกี่ส่วน, ตัวเศษ = เอากี่ส่วน'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'เศษส่วน 5/8 ตัวส่วน = ___', ans: '8', hint: 'ตัวส่วน = ตัวเลขล่าง' },
  { type: 'mc', q: '3/7 กับ 5/7 ตัวใดมากกว่า', opts: ['5/7', '3/7', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: 'ตัวส่วนเท่ากัน: 5>3' },
  { type: 'fill', q: 'แอปเปิ้ล 12 ผล 1/3 ของทั้งหมด = ___ ผล', ans: '4', hint: '12÷3=4' },
]

const fractionsExam: ChapterExam = { chapterId: 'math-4-fractions', templates, bank }
export default fractionsExam
