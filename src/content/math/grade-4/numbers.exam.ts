import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ จำนวนนับถึง 100,000 ป.4 — ค่าประจำหลัก, อ่าน/เขียน, เปรียบเทียบ, ปัดเศษ
const templates: QuestionTemplate[] = [
  { id: 'place-value-ten-thousands', difficulty: 1, gen: r => {
    const n = ri(r,10000,99999)
    const digit = Math.floor(n/10000)
    return { type: 'fill', q: `${n} — ตัวเลขในหลักหมื่น = ___`, ans: String(digit), hint: `หลักซ้ายสุด (5 หลัก)` }
  }},
  { id: 'place-value-thousands', difficulty: 1, gen: r => {
    const n = ri(r,10000,99999)
    const digit = Math.floor(n/1000)%10
    return mcNum(r, `${n} — ค่าของตัวเลขในหลักพัน = ?`, digit*1000, [digit*100, digit*10000, digit], plain, `หลักพัน × 1,000`)
  }},
  { id: 'expand-form', difficulty: 1, gen: r => {
    const a = ri(r,1,9), b = ri(r,0,9), c = ri(r,0,9), d = ri(r,0,9), e = ri(r,0,9)
    const n = a*10000+b*1000+c*100+d*10+e
    return { type: 'fill', q: `${n} = ${a*10000} + ${b*1000} + ${c*100} + ${d*10} + ___`, ans: String(e), hint: `ค่าหลักหน่วย` }
  }},
  { id: 'read-number', difficulty: 1, gen: r => {
    const a = ri(r,1,9), b = ri(r,0,9), c = ri(r,0,9), d = ri(r,0,9), e = ri(r,0,9)
    const n = a*10000+b*1000+c*100+d*10+e
    const words = `${a} หมื่น ${b} พัน ${c} ร้อย ${d} สิบ ${e} หน่วย`
    return { type: 'fill', q: `"${words}" = ___`, ans: String(n), hint: `รวมแต่ละหลัก` }
  }},
  { id: 'compare-5dig', difficulty: 1, gen: r => {
    const a = ri(r,10000,90000), b = ri(r,10000,90000)
    if (a === b) return { type: 'fill', q: `${a} เปรียบกับ ${b+1}: ใช้สัญลักษณ์ใด`, ans: '<', hint: `${a} < ${b+1}` }
    const sym = a > b ? '>' : '<'
    return { type: 'fill', q: `${a} ___ ${b} (ใส่ > หรือ < หรือ =)`, ans: sym, hint: `เทียบหลักสูงสุดก่อน` }
  }},
  { id: 'order-asc', difficulty: 2, gen: r => {
    const base = ri(r,10000,50000)
    const nums = [base, base+ri(r,100,2000), base+ri(r,2001,5000), base-ri(r,100,2000)]
    const sorted = [...nums].sort((a,b)=>a-b)
    return { type: 'fill', q: `เรียงจากน้อยไปมาก: ${nums.join(', ')}`, ans: sorted.join(', '), hint: `เทียบหลักสูงสุดก่อน` }
  }},
  { id: 'round-hundred', difficulty: 1, gen: r => {
    const n = ri(r,10000,99999)
    const rounded = Math.round(n/100)*100
    return mcNum(r, `ปัดเศษ ${n} ถึงหลักร้อย = ?`, rounded, [Math.floor(n/100)*100, Math.ceil(n/100)*100, rounded+100], plain, `ดูหลักสิบ ${Math.floor((n%100)/10)}`)
  }},
  { id: 'round-thousand', difficulty: 2, gen: r => {
    const n = ri(r,10000,99999)
    const rounded = Math.round(n/1000)*1000
    return { type: 'fill', q: `ปัดเศษ ${n} ถึงหลักพัน = ___`, ans: String(rounded), hint: `ดูหลักร้อย ${Math.floor((n%1000)/100)}` }
  }},
  { id: 'round-ten-thousand', difficulty: 2, gen: r => {
    const n = ri(r,10000,99999)
    const rounded = Math.round(n/10000)*10000
    return mcNum(r, `ปัดเศษ ${n} ถึงหลักหมื่น = ?`, rounded, [Math.floor(n/10000)*10000, Math.ceil(n/10000)*10000, rounded+10000], plain, `ดูหลักพัน ${Math.floor((n%10000)/1000)}`)
  }},
  { id: 'before-after', difficulty: 1, gen: r => {
    const n = ri(r,10001,99998)
    return { type: 'fill', q: `จำนวนที่มากกว่า ${n} อยู่ 1 = ___`, ans: String(n+1), hint: `+1` }
  }},
  { id: 'missing-digit', difficulty: 2, gen: r => {
    const a = ri(r,1,9), b = ri(r,0,9), c = ri(r,0,9), d = ri(r,0,9)
    const n = a*10000+b*1000+c*100+d*10
    return { type: 'fill', q: `${a}${b}${c}${d}? = ${n + ri(r,1,9)} ตัวเลขหลักหน่วย = ___`, ans: String((n + ri(r,1,9)) % 10), hint: `ดูหลักขวาสุด` }
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'จำนวน 45,678 — ตัวเลข 5 อยู่ในหลักใด',
    opts: ['หลักพัน', 'หลักหมื่น', 'หลักร้อย', 'หลักสิบ'],
    ans: 0, hint: '4-หมื่น 5-พัน 6-ร้อย 7-สิบ 8-หน่วย'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '32,450 — ตัวเลขในหลักพัน = ___', ans: '2', hint: '3-หมื่น 2-พัน 4-ร้อย 5-สิบ 0-หน่วย' },
  { type: 'mc', q: 'ปัดเศษ 67,830 ถึงหลักพัน = ?', opts: ['68,000', '67,000', '70,000', '67,800'], ans: 0, hint: 'หลักร้อย=8≥5 ปัดขึ้น' },
  { type: 'fill', q: '29,500 > ___ (ใส่จำนวน 5 หลักที่น้อยกว่า)', ans: '29499', hint: '29,500-1=29,499' },
]

const numbersExam: ChapterExam = { chapterId: 'math-4-numbers', templates, bank }
export default numbersExam
