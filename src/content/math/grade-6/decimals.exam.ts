import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, pick, mcStr } from '@/content/exams/helpers'

// แนวข้อสอบ ทศนิยม ป.6 — ส่วนสิบ/ร้อย/พัน + แปลง ↔ เศษส่วน + เทียบค่า
const F2D: [string, string][] = [['1/2', '0.5'], ['1/4', '0.25'], ['3/4', '0.75'], ['1/5', '0.2'], ['2/5', '0.4'], ['1/10', '0.1'], ['3/10', '0.3'], ['1/8', '0.125'], ['1/100', '0.01']]

const templates: QuestionTemplate[] = [
  { id: 'place-to-dec', difficulty: 1, gen: r => { const X = ri(r, 1, 9), Y = ri(r, 1, 9); return { type: 'fill', q: `${X} ส่วนสิบ กับ ${Y} ส่วนร้อย เขียนเป็นทศนิยม = ___`, ans: `0.${X}${Y}`, hint: 'หลังจุด: สิบ แล้วร้อย' } } },
  { id: 'dec-to-frac10', difficulty: 1, gen: r => { const n = ri(r, 1, 9); return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`, `${n}/10`, [`${n}/100`, `${n}/1`, `1/${n}`, `${n + 1}/10`], 'หลังจุด 1 ตัว = ส่วนสิบ') } },
  { id: 'dec-to-frac100', difficulty: 2, gen: r => { const n = ri(r, 11, 99); return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`, `${n}/100`, [`${n}/10`, `${n}/1000`, `1/${n}`], 'หลังจุด 2 ตัว = ส่วนร้อย') } },
  { id: 'frac-to-dec', difficulty: 2, gen: r => { const p = pick(r, F2D); const ds = F2D.map(x => x[1]).filter(x => x !== p[1]); return mcStr(r, `${p[0]} เขียนเป็นทศนิยม = ?`, p[1], [ds[0], ds[1], ds[2]], `${p[0]} = ${p[1]}`) } },
  { id: 'frac-to-dec-fill', difficulty: 2, gen: r => { const p = pick(r, F2D); return { type: 'fill', q: `${p[0]} เขียนเป็นทศนิยม = ___`, ans: p[1], hint: 'หารบน ÷ ล่าง' } } },
  { id: 'compare-min', difficulty: 2, gen: r => { const X = ri(r, 1, 9); return mcStr(r, `ตัวใดน้อยที่สุด: 0.${X} , 0.0${X} , 0.${X}${X}`, `0.0${X}`, [`0.${X}`, `0.${X}${X}`, `0.${X}1`, '0.95'], 'เทียบหลักส่วนสิบก่อน') } },
  { id: 'thousandth', difficulty: 3, gen: r => { const n = ri(r, 101, 999); return mcStr(r, `0.${n} เท่ากับเศษส่วนใด`, `${n}/1000`, [`${n}/100`, `${n}/10`, `1/${n}`], 'หลังจุด 3 ตัว = ส่วนพัน') } },
  { id: 'equal', difficulty: 1, gen: r => { const n = ri(r, 1, 9); return mcStr(r, `0.${n} กับ 0.${n}0 ต่างกันไหม`, 'เท่ากัน', [`0.${n} มากกว่า`, `0.${n}0 มากกว่า`, 'บอกไม่ได้'], 'เติม 0 ท้ายไม่เปลี่ยนค่า') } },
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: '0.125 เท่ากับเศษส่วนใด', opts: ['125/1000', '125/100', '1/125', '125/10'], ans: 0, hint: '3 หลักหลังจุด = ส่วนพัน' },
  { type: 'fill', q: 'เขียน 1/4 เป็นทศนิยม = ___', ans: '0.25', hint: '1 ÷ 4' },
  { type: 'mc', q: 'จาก 0.5, 0.05, 0.55 ตัวใดน้อยสุด', opts: ['0.05', '0.5', '0.55', 'เท่ากัน'], ans: 0, hint: 'หลักส่วนสิบ 0 น้อยสุด' },
]

const decimalsExam: ChapterExam = { chapterId: 'math-6-decimals', templates, bank }
export default decimalsExam
