import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ความยาว ป.4 — หน่วย กม./ม./ซม./มม. + แปลงหน่วย + โจทย์ปัญหา
const templates: QuestionTemplate[] = [
  { id: 'mm-to-cm', difficulty: 1, gen: r => {
    const cm = ri(r,2,20), mm = ri(r,1,9)
    return { type: 'fill', q: `${cm*10+mm} มม. = ___ ซม. ___ มม.`, ans: `${cm} ซม. ${mm} มม.`, hint: `10 มม. = 1 ซม.` }
  }},
  { id: 'cm-to-m', difficulty: 1, gen: r => {
    const m = ri(r,1,9), cm = ri(r,0,99)
    return { type: 'fill', q: `${m*100+cm} ซม. = ___ ม. ___ ซม.`, ans: `${m} ม. ${cm} ซม.`, hint: `100 ซม. = 1 ม.` }
  }},
  { id: 'm-to-km', difficulty: 2, gen: r => {
    const km = ri(r,1,9), m = ri(r,0,999)
    return { type: 'fill', q: `${km*1000+m} ม. = ___ กม. ___ ม.`, ans: `${km} กม. ${m} ม.`, hint: `1,000 ม. = 1 กม.` }
  }},
  { id: 'km-to-m', difficulty: 1, gen: r => {
    const km = ri(r,2,15)
    return mcNum(r, `${km} กม. = ___ ม.`, km*1000, [km*100, km+1000, km*1000+1], plain, `${km}×1,000`)
  }},
  { id: 'm-to-cm', difficulty: 1, gen: r => {
    const m = ri(r,3,20)
    return mcNum(r, `${m} ม. = ___ ซม.`, m*100, [m*10, m*1000, m*100+1], plain, `${m}×100`)
  }},
  { id: 'cm-to-mm', difficulty: 1, gen: r => {
    const cm = ri(r,5,30)
    return mcNum(r, `${cm} ซม. = ___ มม.`, cm*10, [cm*100, cm+10, cm*10+5], plain, `${cm}×10`)
  }},
  { id: 'add-length', difficulty: 2, gen: r => {
    const a = ri(r,10,80), b = ri(r,10,60)
    const total = a+b
    return mcNum(r, `ด้าย ${a} ซม. กับ ${b} ซม. รวม = ?`, total, [a*b, a-b>0?a-b:total+10, total+10], plain, `${a}+${b}`)
  }},
  { id: 'sub-length', difficulty: 2, gen: r => {
    const total = ri(r,50,200), cut = ri(r,10,total-10)
    return mcNum(r, `เชือก ${total} ซม. ตัดออก ${cut} ซม. เหลือ = ?`, total-cut, [total+cut, cut, total-cut+10], plain, `${total}−${cut}`)
  }},
  { id: 'compare-unit', difficulty: 2, gen: r => {
    const km = ri(r,2,5)
    const mVal = ri(r,km*1000+50, km*1000+900)
    return mcStr(r, `${km} กม. กับ ${mVal} ม. ระยะใดยาวกว่า`,
      `${mVal} ม.`,
      [`${km} กม.`, 'เท่ากัน', 'บอกไม่ได้'],
      `${km} กม. = ${km*1000} ม. < ${mVal} ม.`)
  }},
  { id: 'word-fence', difficulty: 2, gen: r => {
    const l = ri(r,5,20), w = ri(r,3,12)
    return mcNum(r, `รั้วรูปสี่เหลี่ยมผืนผ้า กว้าง ${w} ม. ยาว ${l} ม. ต้องใช้รั้วทั้งหมด = ?`, 2*(l+w), [l+w, l*w, 2*l+w], plain, `2×(${l}+${w})`)
  }},
  { id: 'ruler-read', difficulty: 1, gen: r => {
    const cm = ri(r,2,20), mm = ri(r,0,9)
    return { type: 'fill', q: `ไม้บรรทัดชี้ที่ ${cm} ซม. ${mm} มม. = ___ มม. ทั้งหมด`, ans: String(cm*10+mm), hint: `${cm}×10 + ${mm}` }
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: '1 กิโลเมตร เท่ากับกี่เมตร',
    opts: ['1,000 เมตร', '100 เมตร', '10,000 เมตร', '10 เมตร'],
    ans: 0, hint: 'กิโล = 1,000'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '3 กม. = ___ ม.', ans: '3000', hint: '3×1,000=3,000' },
  { type: 'mc', q: '250 ซม. = ? ม. ? ซม.', opts: ['2 ม. 50 ซม.', '25 ม.', '2 ม. 5 ซม.', '25 ม. 0 ซม.'], ans: 0, hint: '250÷100=2เหลือ50' },
  { type: 'fill', q: '45 มม. = ___ ซม. ___ มม.', ans: '4 ซม. 5 มม.', hint: '45÷10=4เหลือ5' },
]

const lengthExam: ChapterExam = { chapterId: 'math-4-length', templates, bank }
export default lengthExam
