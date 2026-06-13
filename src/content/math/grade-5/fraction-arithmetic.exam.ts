import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ การคำนวณเศษส่วน ป.5 — บวกลบตัวล่างเท่ากัน + เศษเกิน/จำนวนคละ
const templates: QuestionTemplate[] = [
  { id: 'same-add', difficulty: 1, gen: r => {
    const d = ri(r,3,12), a = ri(r,1,d-2), b = ri(r,1,d-1-a)
    return { type: 'fill', q: `${a}/${d} + ${b}/${d} = ___/${d}`, ans: String(a+b), hint: 'ตัวล่างเท่ากัน บวกตัวบน' }
  }},
  { id: 'same-sub', difficulty: 1, gen: r => {
    const d = ri(r,3,12), a = ri(r,2,d-1), b = ri(r,1,a-1)
    return { type: 'fill', q: `${a}/${d} − ${b}/${d} = ___/${d}`, ans: String(a-b), hint: 'ตัวล่างเท่ากัน ลบตัวบน' }
  }},
  { id: 'same-add-mc', difficulty: 1, gen: r => {
    const d = ri(r,3,10), a = ri(r,1,d-2), b = ri(r,1,d-1-a)
    const v = a+b
    return mcNum(r, `${a}/${d} + ${b}/${d} = ___/${d} (ตัวบน = ?)`, v, [a*b, a+b+1, d-(a+b)], plain, 'บวกตัวบน ตัวล่างคงเดิม')
  }},
  { id: 'improper-to-mixed', difficulty: 2, gen: r => {
    const d = ri(r,2,7), q = ri(r,1,4), rem = ri(r,1,d-1)
    const num = q*d + rem
    return mcStr(r, `${num}/${d} เขียนเป็นจำนวนคละได้เป็น?`,
      `${q} ${rem}/${d}`,
      [`${q+1} ${rem}/${d}`, `${rem} ${q}/${d}`, `${q} ${rem+1}/${d}`, `${num} ${rem}/${d}`],
      `${num}÷${d}=${q} เศษ ${rem}`)
  }},
  { id: 'mixed-to-improper', difficulty: 2, gen: r => {
    const d = ri(r,2,7), whole = ri(r,1,4), num = ri(r,1,d-1)
    const imp = whole*d + num
    return mcStr(r, `${whole} ${num}/${d} เขียนเป็นเศษเกินได้เป็น?`,
      `${imp}/${d}`,
      [`${whole+num}/${d}`, `${whole*num}/${d}`, `${imp}/${d+1}`, `${imp-1}/${d}`],
      `${whole}×${d}+${num}=${imp}`)
  }},
  { id: 'compare-same', difficulty: 1, gen: r => {
    const d = ri(r,3,10), a = ri(r,1,d-2), b = ri(r,a+1,d-1)
    return mcStr(r, `${a}/${d} กับ ${b}/${d} ตัวใดมากกว่า`,
      `${b}/${d}`,
      [`${a}/${d}`, 'เท่ากัน', 'บอกไม่ได้'],
      `ตัวล่างเท่ากัน ตัวบน ${b} > ${a}`)
  }},
  { id: 'is-proper', difficulty: 1, gen: r => {
    const d = ri(r,3,9)
    const isProper = r() < 0.5
    const num = isProper ? ri(r,1,d-1) : ri(r,d,d*2)
    return mcStr(r, `${num}/${d} เป็นเศษส่วนแท้หรือเศษเกิน`,
      isProper ? 'เศษส่วนแท้ (ตัวบน < ตัวล่าง)' : 'เศษเกิน (ตัวบน ≥ ตัวล่าง)',
      isProper
        ? ['เศษเกิน (ตัวบน ≥ ตัวล่าง)', 'จำนวนคละ', 'เศษส่วนไม่แท้']
        : ['เศษส่วนแท้ (ตัวบน < ตัวล่าง)', 'จำนวนคละ', 'เศษส่วนไม่แท้'],
      `${num} ${isProper ? '<' : '≥'} ${d}`)
  }},
  { id: 'triple-add', difficulty: 2, gen: r => {
    const d = ri(r,9,12), a = ri(r,1,3), b = ri(r,1,3), c = ri(r,1, Math.min(3, d-1-a-b))
    const sum = a+b+c
    return { type: 'fill', q: `${a}/${d} + ${b}/${d} + ${c}/${d} = ___/${d}`, ans: String(sum), hint: `${a}+${b}+${c}=${sum}` }
  }},
  { id: 'fill-missing', difficulty: 2, gen: r => {
    const d = ri(r,3,10), total = ri(r,3,d-1), a = ri(r,1,total-1)
    return { type: 'fill', q: `${a}/${d} + ___/${d} = ${total}/${d}`, ans: String(total-a), hint: `${total}-${a}=${total-a}` }
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'บวกเศษส่วนที่ตัวล่างเท่ากัน ทำอย่างไร',
    opts: ['บวกเฉพาะตัวบน ตัวล่างคงเดิม', 'บวกทั้งตัวบนและตัวล่าง', 'คูณตัวบนทั้งสอง', 'หาตัวล่างร่วมก่อน'],
    ans: 0, hint: 'ตัวล่างเท่ากัน บวกแค่ตัวบน'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '1/5 + 3/5 = ___/5', ans: '4', hint: '1+3=4' },
  { type: 'mc', q: '7/4 เขียนเป็นจำนวนคละได้เป็น?', opts: ['1 3/4', '2 1/4', '1 4/4', '3/4'], ans: 0, hint: '7÷4=1 เศษ 3' },
  { type: 'fill', q: '5/8 − 2/8 = ___/8', ans: '3', hint: '5-2=3' },
]

const fractionArithExam: ChapterExam = { chapterId: 'math-5-fraction-arith', templates, bank }
export default fractionArithExam
