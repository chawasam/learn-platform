import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, pick, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ทศนิยม ป.5 — ทศนิยม 3 ตำแหน่ง + เทียบเศษส่วน + เปรียบเทียบ + ปัดเศษ
const F2D: [string, string][] = [
  ['1/2','0.5'],['1/4','0.25'],['3/4','0.75'],['1/5','0.2'],['2/5','0.4'],
  ['4/5','0.8'],['1/8','0.125'],['3/8','0.375'],['1/10','0.1'],['3/10','0.3'],
  ['1/100','0.01'],['1/1000','0.001']
]

const templates: QuestionTemplate[] = [
  { id: 'place-tenths', difficulty: 1, gen: r => {
    const X = ri(r,1,9), Y = ri(r,0,9), Z = ri(r,0,9)
    return { type: 'fill', q: `${X}.${Y}${Z} ตัวเลขในหลักส่วนสิบ = ___`, ans: String(Y), hint: 'หลักแรกหลังจุดทศนิยม' }
  }},
  { id: 'place-thousandths', difficulty: 2, gen: r => {
    const X = ri(r,1,9), Y = ri(r,0,9), Z = ri(r,1,9)
    return mcNum(r, `0.${X}${Y}${Z} ตัวเลขในหลักส่วนพัน = ?`, Z, [X, Y, X+Y], plain, 'หลักที่ 3 หลังจุดทศนิยม')
  }},
  { id: 'dec-to-frac1000', difficulty: 2, gen: r => {
    const n = ri(r,101,999)
    return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`,
      `${n}/1000`, [`${n}/100`, `${n}/10`, `1/${n}`],
      'หลังจุด 3 ตัว = ส่วนพัน')
  }},
  { id: 'dec-to-frac100', difficulty: 1, gen: r => {
    const n = ri(r,11,99)
    return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`,
      `${n}/100`, [`${n}/10`, `${n}/1000`, `1/${n}`],
      'หลังจุด 2 ตัว = ส่วนร้อย')
  }},
  { id: 'frac-to-dec', difficulty: 2, gen: r => {
    const p = pick(r, F2D)
    const others = F2D.map(x => x[1]).filter(x => x !== p[1])
    return mcStr(r, `${p[0]} เขียนเป็นทศนิยม = ?`,
      p[1], [others[0], others[1], others[2]],
      `${p[0]} = ${p[1]}`)
  }},
  { id: 'compare-two', difficulty: 2, gen: r => {
    const X = ri(r,1,9)
    return mcStr(r, `ตัวใดมีค่ามากกว่า: 0.${X} กับ 0.0${X}`,
      `0.${X}`,
      [`0.0${X}`, 'เท่ากัน', 'บอกไม่ได้'],
      `0.${X} มีค่า ${X} ในหลักส่วนสิบ > 0.0${X}`)
  }},
  { id: 'compare-three', difficulty: 2, gen: r => {
    const X = ri(r,2,8)
    return mcStr(r, `ตัวใดน้อยที่สุด: 0.${X} , 0.0${X} , 0.${X}${X}`,
      `0.0${X}`,
      [`0.${X}`, `0.${X}${X}`, `0.${X}0`],
      'เปรียบหลักส่วนสิบก่อน: 0 น้อยกว่า X')
  }},
  { id: 'round-tenths', difficulty: 2, gen: r => {
    const whole = ri(r,1,9), dec1 = ri(r,0,9), dec2 = ri(r,0,9)
    const rounded = dec2 >= 5 ? dec1 + 1 : dec1
    const roundedWhole = rounded >= 10 ? whole + 1 : whole
    const roundedDec = rounded >= 10 ? 0 : rounded
    const ans = `${roundedWhole}.${roundedDec}`
    return { type: 'fill', q: `ปัดเศษ ${whole}.${dec1}${dec2} ถึงทศนิยม 1 ตำแหน่ง = ___`, ans, hint: `ดูตำแหน่งที่ 2 (${dec2}) ${dec2>=5?'≥5 ปัดขึ้น':'<5 ปัดทิ้ง'}` }
  }},
  { id: 'trailing-zero', difficulty: 1, gen: r => {
    const n = ri(r,1,9)
    return mcStr(r, `0.${n} กับ 0.${n}00 มีค่าเท่ากันไหม`,
      'เท่ากัน',
      [`0.${n}00 มากกว่า`, `0.${n} มากกว่า`, 'ขึ้นอยู่กับบริบท'],
      'เติม 0 ต่อท้ายทศนิยม ไม่เปลี่ยนค่า')
  }},
  { id: 'concept-place', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ทศนิยม 3 ตำแหน่ง 0.001 อ่านว่าอะไร',
    opts: ['หนึ่งในพัน (ส่วนพัน)', 'หนึ่งในสิบ (ส่วนสิบ)', 'หนึ่งในร้อย (ส่วนร้อย)', 'หนึ่งในหมื่น'],
    ans: 0, hint: '3 หลักหลังจุด = ส่วนพัน'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: '0.375 เท่ากับเศษส่วนใด', opts: ['3/8', '375/100', '3/80', '37/100'], ans: 0, hint: '0.375 = 375/1000 = 3/8' },
  { type: 'fill', q: 'เขียน 3/4 เป็นทศนิยม = ___', ans: '0.75', hint: '3÷4=0.75' },
  { type: 'mc', q: 'ปัดเศษ 2.36 ถึงทศนิยม 1 ตำแหน่ง = ?', opts: ['2.4', '2.3', '2.0', '3.0'], ans: 0, hint: 'ตัวที่ 2 คือ 6 ≥ 5 ปัดขึ้น' },
]

const decimalsExam: ChapterExam = { chapterId: 'math-5-decimals', templates, bank }
export default decimalsExam
