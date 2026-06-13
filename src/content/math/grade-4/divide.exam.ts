import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain, ppl } from '@/content/exams/helpers'

// แนวข้อสอบ การหาร ป.4 — หาร 1-3 หลัก ÷ 1 หลัก, หารมีเศษ, โจทย์ปัญหา
const templates: QuestionTemplate[] = [
  { id: 'div-exact-2dig', difficulty: 1, gen: r => {
    const b = ri(r,2,9), ans = ri(r,2,12)
    return { type: 'fill', q: `${ans*b} ÷ ${b} = ___`, ans: String(ans), hint: `หาจำนวนที่คูณ ${b} แล้วได้ ${ans*b}` }
  }},
  { id: 'div-exact-3dig', difficulty: 1, gen: r => {
    const b = ri(r,2,9), ans = ri(r,10,50)
    return mcNum(r, `${ans*b} ÷ ${b} = ?`, ans, [ans+1, ans-1, ans*2], plain, `${ans*b}÷${b}`)
  }},
  { id: 'div-remainder', difficulty: 2, gen: r => {
    const b = ri(r,3,9), ans = ri(r,5,20), rem = ri(r,1,b-1)
    const dividend = ans*b + rem
    return { type: 'fill', q: `${dividend} ÷ ${b} = ___ เศษ ___`, ans: `${ans} เศษ ${rem}`, hint: `${b}×${ans}=${ans*b} เหลือ ${rem}` }
  }},
  { id: 'div-word-share', difficulty: 1, gen: r => {
    const ppl2 = ri(r,3,8), items = ri(r,2,10)*ppl2
    return mcNum(r, `ของ ${items} ชิ้น แบ่งให้ ${ppl2} คนเท่าๆ กัน คนละ = ?`, items/ppl2, [items*ppl2, items-ppl2, items/ppl2+1], ppl, `${items}÷${ppl2}`)
  }},
  { id: 'div-word-row', difficulty: 2, gen: r => {
    const rows = ri(r,4,8), total = ri(r,2,8)*rows
    return mcNum(r, `จัดเก้าอี้ ${total} ตัว เป็น ${rows} แถวเท่าๆ กัน แถวละ = ?`, total/rows, [total+rows, total-rows, total/rows+2], ppl, `${total}÷${rows}`)
  }},
  { id: 'div-check-remainder', difficulty: 2, gen: r => {
    const b = ri(r,4,9), ans = ri(r,10,20), rem = ri(r,1,b-1)
    const dividend = ans*b + rem
    return mcNum(r, `${dividend} ÷ ${b} เศษเท่ากับ ?`, rem, [b-rem, ans, rem+b], plain, `${dividend}−${ans}×${b}=${rem}`)
  }},
  { id: 'div-100-1dig', difficulty: 2, gen: r => {
    const b = ri(r,2,5), ans = ri(r,20,40)
    return { type: 'fill', q: `${ans*b*10} ÷ ${b} = ___`, ans: String(ans*10), hint: `หารตัวเลขก่อน แล้วเติม 0` }
  }},
  { id: 'missing-dividend', difficulty: 2, gen: r => {
    const b = ri(r,2,9), q = ri(r,5,20)
    return { type: 'fill', q: `___ ÷ ${b} = ${q}`, ans: String(q*b), hint: `${q} × ${b}` }
  }},
  { id: 'div-vs-mul', difficulty: 2, gen: r => {
    const b = ri(r,3,8), q = ri(r,4,12)
    return { type: 'fill', q: `ถ้า ${b} × ${q} = ${b*q} แล้ว ${b*q} ÷ ${b} = ___`, ans: String(q), hint: `การหารคือการคูณผกผัน` }
  }},
  { id: 'div-group', difficulty: 2, gen: r => {
    const perGroup = ri(r,4,8), total = ri(r,2,6)*perGroup
    return mcNum(r, `มีขนมทั้งหมด ${total} ชิ้น จัดใส่ถุงๆ ละ ${perGroup} ชิ้น ได้กี่ถุง`, total/perGroup, [total*perGroup, total+perGroup, total/perGroup+1], plain, `${total}÷${perGroup}`)
  }},
  { id: 'div-pattern', difficulty: 2, gen: r => {
    const base = ri(r,2,5)
    const a=base*36, b=base*12, c=base*4, d=Math.round(base*4/3)
    // ensure clean pattern: divide by 3 each time
    const start = ri(r,2,5)*27
    return mcNum(r, `${start*4}, ${start*4/4*3}, ??? (หารด้วย 4 ทุกครั้ง): ${start*4}, ${start}, ___ = ?`, start/4, [start/4+1, start*4, start/2], plain, `÷4`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: '72 ÷ 8 = 9 เพราะ?',
    opts: ['8 × 9 = 72', '9 + 8 = 72', '72 − 8 = 9', '72 + 8 = 9'],
    ans: 0, hint: 'การหารตรวจสอบด้วยการคูณ'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '56 ÷ 7 = ___', ans: '8', hint: '7×8=56' },
  { type: 'mc', q: '85 ÷ 4 = ?', opts: ['21 เศษ 1', '21 เศษ 2', '20 เศษ 5', '22'], ans: 0, hint: '4×21=84 เหลือ 1' },
  { type: 'fill', q: 'มีดินสอ 48 แท่ง แจกเด็ก 6 คนเท่ากัน คนละ = ___ แท่ง', ans: '8', hint: '48÷6=8' },
]

const divideExam: ChapterExam = { chapterId: 'math-4-divide', templates, bank }
export default divideExam
