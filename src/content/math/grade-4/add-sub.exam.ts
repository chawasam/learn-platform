import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ บวกลบจำนวนนับ ป.4 — จำนวน 4-5 หลัก + ปัดเศษ
const templates: QuestionTemplate[] = [
  { id: 'add-4dig', difficulty: 1, gen: r => {
    const a = ri(r,1000,9000), b = ri(r,1000,8000)
    return { type: 'fill', q: `${a} + ${b} = ___`, ans: String(a+b), hint: `บวกหลักตรงกัน` }
  }},
  { id: 'sub-4dig', difficulty: 1, gen: r => {
    const b = ri(r,1000,5000), a = ri(r,b+100,9999)
    return { type: 'fill', q: `${a} − ${b} = ___`, ans: String(a-b), hint: `ลบหลักตรงกัน ยืมถ้าจำเป็น` }
  }},
  { id: 'add-5dig', difficulty: 2, gen: r => {
    const a = ri(r,10000,50000), b = ri(r,10000,40000)
    return mcNum(r, `${a} + ${b} = ?`, a+b, [a+b+1000, a+b-1000, a*2], plain, `จัดหลักตรงกัน บวกทีละหลัก`)
  }},
  { id: 'sub-5dig', difficulty: 2, gen: r => {
    const b = ri(r,10000,40000), a = ri(r,b+1000,99999)
    return mcNum(r, `${a} − ${b} = ?`, a-b, [a-b+1000, a+b, b-1], plain, `ลบจากขวาไปซ้าย ยืมถ้าจำเป็น`)
  }},
  { id: 'round-thousand', difficulty: 2, gen: r => {
    const n = ri(r,1000,9999)
    const rounded = Math.round(n/1000)*1000
    return mcNum(r, `ปัดเศษ ${n} ถึงหลักพัน = ?`, rounded, [Math.floor(n/1000)*1000, Math.ceil(n/1000)*1000, n-n%1000+500], plain, `ดูหลักร้อย ${Math.floor((n%1000)/100)} ${Math.floor((n%1000)/100)>=5?'≥5 ปัดขึ้น':'<5 ปัดทิ้ง'}`)
  }},
  { id: 'round-ten-thousand', difficulty: 2, gen: r => {
    const n = ri(r,10000,99999)
    const rounded = Math.round(n/10000)*10000
    return { type: 'fill', q: `ปัดเศษ ${n} ถึงหลักหมื่น = ___`, ans: String(rounded), hint: `ดูหลักพัน ${Math.floor((n%10000)/1000)}` }
  }},
  { id: 'add-word', difficulty: 2, gen: r => {
    const A = ri(r,2000,8000), B = ri(r,1000,5000)
    return mcNum(r, `โรงเรียน A มีนักเรียน ${A} คน โรงเรียน B มีนักเรียน ${B} คน รวมทั้งหมด = ?`, A+B, [A*B, A-B, A+B+100], plain, `${A}+${B}`)
  }},
  { id: 'sub-word', difficulty: 2, gen: r => {
    const total = ri(r,5000,20000), sold = ri(r,1000,total-1000)
    return mcNum(r, `โกดังมีสินค้า ${total} ชิ้น ขายไป ${sold} ชิ้น เหลือ = ?`, total-sold, [total+sold, sold, total-sold+100], plain, `${total}−${sold}`)
  }},
  { id: 'compare-sum', difficulty: 2, gen: r => {
    const a = ri(r,1000,5000), b = ri(r,1000,5000), c = ri(r,1000,5000), d = ri(r,1000,5000)
    const s1=a+b, s2=c+d
    const bigger = s1 > s2 ? s1 : s2
    return mcNum(r, `${a}+${b} กับ ${c}+${d} ผลรวมใดมากกว่า`, bigger, [s1<s2?s1:s2, a+c, b+d], plain, `${s1} vs ${s2}`)
  }},
  { id: 'missing-addend', difficulty: 2, gen: r => {
    const total = ri(r,5000,20000), a = ri(r,1000,total-1000)
    return { type: 'fill', q: `${a} + ___ = ${total}`, ans: String(total-a), hint: `${total} − ${a}` }
  }},
  { id: 'pattern-add', difficulty: 2, gen: r => {
    const start = ri(r,100,2000), step = ri(r,100,1000)
    const a=start, b=start+step, c=start+2*step, ans=start+3*step
    return mcNum(r, `${a}, ${b}, ${c}, ___ = ?`, ans, [ans+step, ans-step, b], plain, `เพิ่มทีละ ${step}`)
  }},
  { id: 'concept-round', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'การปัดเศษถึงหลักพัน ดูตัวเลขในหลักใด',
    opts: ['หลักร้อย (ถ้า ≥5 ปัดขึ้น)', 'หลักพัน (ดูตัวเอง)', 'หลักหน่วย', 'หลักสิบ'],
    ans: 0, hint: 'ปัดถึงหลักพัน → ดูหลักร้อย'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '3456 + 2789 = ___', ans: '6245', hint: '3456+2789=6245' },
  { type: 'mc', q: 'ปัดเศษ 4,350 ถึงหลักพัน = ?', opts: ['4,000', '5,000', '4,400', '4,300'], ans: 0, hint: 'หลักร้อย=3 < 5 → ปัดทิ้ง = 4,000' },
  { type: 'fill', q: '8000 − 2346 = ___', ans: '5654', hint: '8000-2346=5654' },
]

const addSubExam: ChapterExam = { chapterId: 'math-4-add-sub', templates, bank }
export default addSubExam
