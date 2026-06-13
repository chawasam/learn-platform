import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ เส้นขนาน ป.5 — มุมภายในสลับ/สอดคล้อง/ข้างเดียวกัน + มุมตรงข้าม
const templates: QuestionTemplate[] = [
  { id: 'alt-int', difficulty: 2, gen: r => {
    const x = ri(r,30,150)
    return { type: 'fill', q: `เส้นตัดเส้นขนาน มุมภายในสลับกับมุม ${x}° = ___°`, ans: String(x), hint: 'มุมภายในสลับ (Z-shape) = เท่ากัน' }
  }},
  { id: 'co-int', difficulty: 2, gen: r => {
    const x = ri(r,30,150), v = 180-x
    return mcNum(r, `เส้นตัดเส้นขนาน มุมภายในข้างเดียวกับมุม ${x}° = ___°`, v, [x, 360-x, 90-x>0?90-x:x+30], plain, 'มุมภายในข้างเดียวกัน (C-shape) รวม = 180°')
  }},
  { id: 'corresponding', difficulty: 2, gen: r => {
    const x = ri(r,30,150)
    return { type: 'fill', q: `เส้นตัดเส้นขนาน มุมสอดคล้องกับมุม ${x}° = ___°`, ans: String(x), hint: 'มุมสอดคล้อง (F-shape) = เท่ากัน' }
  }},
  { id: 'vert-opp', difficulty: 1, gen: r => {
    const x = ri(r,30,150)
    return mcNum(r, `เส้นสองเส้นตัดกัน มุมตรงข้ามกับมุม ${x}° = ___°`, x, [180-x, 360-x, 90-x>0?90-x:x+10], plain, 'มุมตรงข้ามกัน = เท่ากันเสมอ')
  }},
  { id: 'on-line-pair', difficulty: 1, gen: r => {
    const x = ri(r,20,160), v = 180-x
    return { type: 'fill', q: `มุมสองมุมบนเส้นตรง มุมหนึ่ง ${x}° อีกมุม = ___°`, ans: String(v), hint: `${x} + ? = 180°` }
  }},
  { id: 'find-angle-parallel', difficulty: 3, gen: r => {
    const a = ri(r,40,140), b = 180-a
    return mcNum(r, `เส้นขนานถูกตัดโดยเส้นตัด มุมสอดคล้องมุมหนึ่ง ${a}° มุมภายในข้างเดียวกันอีกมุม = ___°`, b, [a, 360-a, 90], plain, 'สอดคล้อง=a°, ข้างเดียวกัน=180−a°')
  }},
  { id: 'perp-90', difficulty: 1, gen: r => {
    const x = ri(r,20,70), v = 90-x
    return mcNum(r, `เส้นตั้งฉากถูกตัดโดยเส้นเฉียง มุมหนึ่ง ${x}° มุมที่เหลือในมุมฉากนั้น = ___°`, v, [90, 180-x, x], plain, 'มุมฉาก 90°, ส่วนที่เหลือ = 90-x')
  }},
  { id: 'concept-alt', difficulty: 1, gen: () => ({
    type: 'mc', q: 'มุมภายในสลับ (alternate interior angles) เกิดเมื่อใด และมีสมบัติอย่างไร',
    opts: ['เส้นตัดเส้นขนาน อยู่คนละฝั่งของเส้นตัด — เท่ากัน', 'เส้นตัดเส้นขนาน อยู่ฝั่งเดียวกัน — บวกกัน 180°', 'เส้นตั้งฉาก — รวมกัน 90°', 'เส้นตัดกัน — บวกกัน 360°'],
    ans: 0, hint: 'มุม Z = มุมภายในสลับ = เท่ากัน'
  })},
  { id: 'concept-coInt', difficulty: 1, gen: () => ({
    type: 'mc', q: 'มุมภายในข้างเดียวกัน (co-interior) รวมกันเท่ากับ?',
    opts: ['180°', '90°', '360°', 'เท่ากันเสมอ'],
    ans: 0, hint: 'มุม C รวม = 180°'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'เส้นตัดเส้นขนาน มุมสอดคล้องกับมุม 70° = ___°', ans: '70', hint: 'มุมสอดคล้อง F-shape = เท่ากัน' },
  { type: 'mc', q: 'เส้นตัดเส้นขนาน มุมภายในข้างเดียวกัน 65° อีกมุมเท่ากับ?', opts: ['115°', '65°', '90°', '25°'], ans: 0, hint: '180-65=115°' },
  { type: 'fill', q: 'มุมตรงข้ามกับมุม 110° = ___°', ans: '110', hint: 'มุมตรงข้ามกัน = เท่ากัน' },
]

const parallelLinesExam: ChapterExam = { chapterId: 'math-5-parallel', templates, bank }
export default parallelLinesExam
