import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, round2, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ทศนิยม ป.4 — ส่วนสิบ/ส่วนร้อย + เทียบเศษส่วน + เปรียบเทียบ
const templates: QuestionTemplate[] = [
  { id: 'place-tenth', difficulty: 1, gen: r => {
    const X = ri(r,1,9), Y = ri(r,0,9)
    return { type: 'fill', q: `${X}.${Y} ตัวเลขในหลักส่วนสิบ = ___`, ans: String(Y), hint: 'หลักแรกหลังจุดทศนิยม' }
  }},
  { id: 'place-hundredth', difficulty: 1, gen: r => {
    const X = ri(r,1,9), Y = ri(r,0,9), Z = ri(r,0,9)
    return mcNum(r, `${X}.${Y}${Z} ตัวเลขในหลักส่วนร้อย = ?`, Z, [Y, X, Y+Z], plain, 'หลักที่ 2 หลังจุดทศนิยม')
  }},
  { id: 'dec-to-frac10', difficulty: 1, gen: r => {
    const n = ri(r,1,9)
    return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`,
      `${n}/10`, [`${n}/100`, `${n}/1`, `1/${n}`, `${n+1}/10`],
      'หลังจุด 1 ตัว = ส่วนสิบ')
  }},
  { id: 'dec-to-frac100', difficulty: 2, gen: r => {
    const n = ri(r,11,99)
    return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`,
      `${n}/100`, [`${n}/10`, `${n}/1000`, `1/${n}`, `${n}/100+1`],
      'หลังจุด 2 ตัว = ส่วนร้อย')
  }},
  { id: 'frac-to-dec', difficulty: 2, gen: r => {
    const pairs: [string,string][] = [['1/2','0.5'],['1/4','0.25'],['3/4','0.75'],['1/5','0.2'],['1/10','0.1'],['3/10','0.3'],['1/100','0.01']]
    const p = pairs[Math.floor(r()*pairs.length)]
    return { type: 'fill', q: `${p[0]} เขียนเป็นทศนิยม = ___`, ans: p[1], hint: 'หารบน ÷ ล่าง' }
  }},
  { id: 'compare-dec', difficulty: 2, gen: r => {
    const a = ri(r,1,9), b = ri(r,0,9)
    return mcStr(r, `0.${a} กับ 0.0${b} ตัวใดมีค่ามากกว่า`,
      `0.${a}`,
      [`0.0${b}`, 'เท่ากัน', 'บอกไม่ได้'],
      `0.${a} มีค่า ${a} ในหลักส่วนสิบ ซึ่ง > 0`)
  }},
  { id: 'add-dec', difficulty: 1, gen: r => {
    const a = ri(r,10,50), b = ri(r,10,40)
    const v = round2((a+b)/10)
    return { type: 'fill', q: `${round2(a/10)} + ${round2(b/10)} = ___`, ans: String(v), hint: 'จัดจุดทศนิยมตรงกัน' }
  }},
  { id: 'sub-dec', difficulty: 1, gen: r => {
    const b = ri(r,10,40), a = ri(r,b+5,80)
    const v = round2((a-b)/10)
    return { type: 'fill', q: `${round2(a/10)} − ${round2(b/10)} = ___`, ans: String(v), hint: 'จัดจุดทศนิยมตรงกัน' }
  }},
  { id: 'order-dec', difficulty: 2, gen: r => {
    const X = ri(r,2,8)
    return mcStr(r, `เรียงลำดับจากน้อยไปมาก: 0.${X}, 0.0${X}, 0.${X}${X}`,
      `0.0${X} < 0.${X} < 0.${X}${X}`,
      [`0.${X} < 0.0${X} < 0.${X}${X}`, `0.${X}${X} < 0.${X} < 0.0${X}`, `0.0${X} < 0.${X}${X} < 0.${X}`],
      'เปรียบหลักส่วนสิบก่อน')
  }},
  { id: 'read-write', difficulty: 1, gen: r => {
    const whole = ri(r,0,5), tenth = ri(r,1,9)
    return { type: 'fill', q: `"${whole} จุด ${tenth}" เขียนเป็นตัวเลข = ___`, ans: `${whole}.${tenth}`, hint: 'จุดคือจุดทศนิยม' }
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ทศนิยม 0.1 เท่ากับเศษส่วนใด',
    opts: ['1/10', '1/100', '10/1', '1/1'],
    ans: 0, hint: '0.1 = 1 ในหลักส่วนสิบ'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: '0.75 เท่ากับเศษส่วนใด', opts: ['75/100', '75/10', '7/5', '7/100'], ans: 0, hint: '2 หลักหลังจุด = ส่วนร้อย' },
  { type: 'fill', q: '1/4 เขียนเป็นทศนิยม = ___', ans: '0.25', hint: '1÷4=0.25' },
  { type: 'mc', q: '0.3 กับ 0.03 ตัวใดมากกว่า', opts: ['0.3', '0.03', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: 'หลักส่วนสิบ: 3>0' },
]

const decimalsExam: ChapterExam = { chapterId: 'math-4-decimals', templates, bank }
export default decimalsExam
