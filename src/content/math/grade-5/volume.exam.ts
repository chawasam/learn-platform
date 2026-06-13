import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ ทรงสามมิติและปริมาตร ป.5 — ทรงสี่เหลี่ยมมุมฉาก V=กว้าง×ยาว×สูง + ทรงลูกบาศก์
const templates: QuestionTemplate[] = [
  { id: 'box-vol-fill', difficulty: 1, gen: r => {
    const l = ri(r,2,10), w = ri(r,2,8), h = ri(r,2,8)
    return { type: 'fill', q: `ทรงสี่เหลี่ยมมุมฉาก กว้าง ${w} ยาว ${l} สูง ${h} ซม. ปริมาตร = ___ ซม.³`, ans: String(l*w*h), hint: `${w}×${l}×${h}` }
  }},
  { id: 'box-vol-mc', difficulty: 1, gen: r => {
    const l = ri(r,3,12), w = ri(r,2,8), h = ri(r,2,8)
    const V = l*w*h
    return mcNum(r, `กล่องกว้าง ${w} ซม. ยาว ${l} ซม. สูง ${h} ซม. ปริมาตร = ?`, V, [l*w+h, (l+w)*h, l*w*h+l], plain, `กว้าง×ยาว×สูง`)
  }},
  { id: 'cube-vol', difficulty: 1, gen: r => {
    const s = ri(r,2,8)
    return { type: 'fill', q: `ทรงลูกบาศก์ด้านยาว ${s} ซม. ปริมาตร = ___ ซม.³`, ans: String(s*s*s), hint: `${s}×${s}×${s}` }
  }},
  { id: 'cube-vol-mc', difficulty: 1, gen: r => {
    const s = ri(r,2,7)
    return mcNum(r, `ลูกบาศก์ด้านยาว ${s} ซม. ปริมาตร = ?`, s*s*s, [s*3, s*s, s*s*s+s], plain, `${s}³`)
  }},
  { id: 'surface-area', difficulty: 3, gen: r => {
    const l = ri(r,3,10), w = ri(r,2,8), h = ri(r,2,8)
    const SA = 2*(l*w + l*h + w*h)
    return mcNum(r, `ทรงสี่เหลี่ยมมุมฉาก ยาว ${l} กว้าง ${w} สูง ${h} ซม. พื้นที่ผิวทั้งหมด = ?`, SA, [l*w*h, l*w+l*h+w*h, SA+l*w], plain, `2(${l}×${w}+${l}×${h}+${w}×${h})`)
  }},
  { id: 'find-height', difficulty: 2, gen: r => {
    const l = ri(r,3,8), w = ri(r,2,6), h = ri(r,2,8)
    const V = l*w*h
    return { type: 'fill', q: `ทรงสี่เหลี่ยมมุมฉาก ยาว ${l} กว้าง ${w} ปริมาตร ${V} ซม.³ สูง = ___ ซม.`, ans: String(h), hint: `${V} ÷ (${l}×${w})` }
  }},
  { id: 'find-length', difficulty: 2, gen: r => {
    const l = ri(r,3,10), w = ri(r,2,6), h = ri(r,2,6)
    const V = l*w*h
    return mcNum(r, `ทรงสี่เหลี่ยมมุมฉาก กว้าง ${w} สูง ${h} ปริมาตร ${V} ซม.³ ยาว = ?`, l, [V-w-h, V/(w+h), l+w], plain, `${V} ÷ (${w}×${h})`)
  }},
  { id: 'compare-vol', difficulty: 2, gen: r => {
    const l1=ri(r,2,6), w1=ri(r,2,5), h1=ri(r,2,5)
    const s = ri(r,l1+1,8)
    const V1=l1*w1*h1, V2=s*s*s
    const bigger = V1 > V2 ? 'ทรง A' : V2 > V1 ? 'ทรง B' : 'เท่ากัน'
    return mcStr(r, `ทรง A (${l1}×${w1}×${h1} ซม.) กับ ทรงลูกบาศก์ B (${s}×${s}×${s} ซม.) ปริมาตรใดมากกว่า`,
      bigger,
      ['ทรง A', 'ทรง B', 'เท่ากัน', 'บอกไม่ได้'].filter(n => n !== bigger) as string[],
      `A=${V1} ซม.³, B=${V2} ซม.³`)
  }},
  { id: 'unit-count', difficulty: 1, gen: r => {
    const l = ri(r,2,5), w = ri(r,2,4), h = ri(r,2,4)
    return mcNum(r, `เรียงลูกบาศก์ 1 ซม.³ ลงในกล่อง ${l}×${w}×${h} ซม. บรรจุได้กี่ลูก`, l*w*h, [l+w+h, l*w+h, 2*(l+w+h)], plain, `${l}×${w}×${h}=${l*w*h}`)
  }},
  { id: 'concept-formula', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'สูตรปริมาตรทรงสี่เหลี่ยมมุมฉากคือ',
    opts: ['กว้าง × ยาว × สูง', 'กว้าง + ยาว + สูง', '2 × (กว้าง + ยาว + สูง)', 'กว้าง × ยาว + สูง'],
    ans: 0, hint: 'V = l × w × h'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'กล่องกว้าง 4 ยาว 6 สูง 5 ซม. ปริมาตร = ___ ซม.³', ans: '120', hint: '4×6×5=120' },
  { type: 'mc', q: 'ลูกบาศก์ด้านยาว 3 ซม. ปริมาตร = ?', opts: ['27 ซม.³', '9 ซม.³', '6 ซม.³', '18 ซม.³'], ans: 0, hint: '3×3×3=27' },
  { type: 'fill', q: 'กล่อง 3×4×h ซม. ปริมาตร 60 ซม.³ สูง = ___ ซม.', ans: '5', hint: '60÷(3×4)=60÷12=5' },
]

const volumeExam: ChapterExam = { chapterId: 'math-5-volume', templates, bank }
export default volumeExam
