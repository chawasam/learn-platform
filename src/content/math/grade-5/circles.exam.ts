import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcDec, mcStr, round2, plain } from '@/content/exams/helpers'

// แนวข้อสอบ รูปวงกลม ป.5 — รัศมี/เส้นผ่านศูนย์กลาง + เส้นรอบวง + พื้นที่ (π≈3.14)
const PI = 3.14

const templates: QuestionTemplate[] = [
  { id: 'r-from-d', difficulty: 1, gen: r => {
    const d = ri(r,2,10)*2
    return { type: 'fill', q: `วงกลมเส้นผ่านศูนย์กลาง ${d} ซม. รัศมี = ___ ซม.`, ans: String(d/2), hint: 'รัศมี = เส้นผ่านศูนย์กลาง ÷ 2' }
  }},
  { id: 'd-from-r', difficulty: 1, gen: r => {
    const rad = ri(r,2,12)
    return mcNum(r, `วงกลมรัศมี ${rad} ซม. เส้นผ่านศูนย์กลาง = ?`, 2*rad, [rad, rad+2, rad*rad], plain, `2 × ${rad}`)
  }},
  { id: 'circumference', difficulty: 2, gen: r => {
    const rad = ri(r,2,10)
    const C = round2(2*PI*rad)
    return mcDec(r, `วงกลมรัศมี ${rad} ซม. เส้นรอบวง = ? (π≈3.14)`, C, [round2(PI*rad), round2(PI*rad*rad), round2(2*rad)], plain, `2×3.14×${rad}`)
  }},
  { id: 'circum-from-d', difficulty: 2, gen: r => {
    const d = ri(r,4,20)
    const C = round2(PI*d)
    return { type: 'fill', q: `วงกลมเส้นผ่านศูนย์กลาง ${d} ซม. เส้นรอบวง ≈ ___ ซม. (π≈3.14)`, ans: String(C), hint: `3.14×${d}` }
  }},
  { id: 'area', difficulty: 2, gen: r => {
    const rad = ri(r,2,10)
    const A = round2(PI*rad*rad)
    return mcDec(r, `วงกลมรัศมี ${rad} ซม. พื้นที่ ≈ ? ซม.² (π≈3.14)`, A, [round2(2*PI*rad), round2(PI*rad), round2(rad*rad)], plain, `3.14×${rad}²`)
  }},
  { id: 'area-from-d', difficulty: 3, gen: r => {
    const d = ri(r,2,10)*2
    const rad = d/2
    const A = round2(PI*rad*rad)
    return mcDec(r, `วงกลมเส้นผ่านศูนย์กลาง ${d} ซม. พื้นที่ ≈ ? ซม.² (π≈3.14)`, A, [round2(PI*d*d), round2(PI*d), round2(PI*rad)], plain, `รัศมี=${rad}, 3.14×${rad}²`)
  }},
  { id: 'compare-r', difficulty: 1, gen: r => {
    const r1 = ri(r,2,6), r2 = ri(r,r1+1,10)
    return mcStr(r, `วงกลม A รัศมี ${r1} ซม. วงกลม B รัศมี ${r2} ซม. วงใดมีพื้นที่มากกว่า`,
      'วงกลม B',
      ['วงกลม A', 'เท่ากัน', 'บอกไม่ได้'],
      `รัศมี B(${r2}) > A(${r1}) → พื้นที่ B > A`)
  }},
  { id: 'find-r-from-d', difficulty: 1, gen: r => {
    const d = ri(r,6,24)
    return { type: 'fill', q: `วงกลมมีเส้นผ่านศูนย์กลาง ${d} ซม. รัศมีเท่ากับ = ___ ซม.`, ans: String(d/2), hint: `${d} ÷ 2` }
  }},
  { id: 'concept-parts', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'เส้นผ่านศูนย์กลาง (diameter) ของวงกลมกับรัศมี (radius) สัมพันธ์กันอย่างไร',
    opts: ['เส้นผ่านศูนย์กลาง = 2 × รัศมี', 'รัศมี = 2 × เส้นผ่านศูนย์กลาง', 'เส้นผ่านศูนย์กลาง = รัศมี', 'รัศมี = เส้นผ่านศูนย์กลาง + 2'],
    ans: 0, hint: 'd = 2r'
  })},
  { id: 'concept-formula', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'เส้นรอบวง (circumference) ของวงกลมคำนวณอย่างไร',
    opts: ['2πr (π≈3.14)', 'πr²', '4πr', '2r²'],
    ans: 0, hint: 'C = 2πr = πd'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'วงกลมเส้นผ่านศูนย์กลาง 10 ซม. เส้นรอบวง ≈ ___ ซม. (π≈3.14)', ans: '31.4', hint: '3.14×10=31.4' },
  { type: 'mc', q: 'วงกลมรัศมี 5 ซม. พื้นที่ ≈ ? ซม.² (π≈3.14)', opts: ['78.5', '31.4', '15.7', '62.8'], ans: 0, hint: '3.14×5²=3.14×25=78.5' },
  { type: 'fill', q: 'วงกลมรัศมี 7 ซม. เส้นผ่านศูนย์กลาง = ___ ซม.', ans: '14', hint: '7×2=14' },
]

const circlesExam: ChapterExam = { chapterId: 'math-5-circles', templates, bank }
export default circlesExam
