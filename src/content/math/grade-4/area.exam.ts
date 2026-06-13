import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ พื้นที่ ป.4 — สี่เหลี่ยมผืนผ้า + จัตุรัส + เส้นรอบรูป
const templates: QuestionTemplate[] = [
  { id: 'rect-area', difficulty: 1, gen: r => {
    const l = ri(r,3,15), w = ri(r,2,10)
    return { type: 'fill', q: `สี่เหลี่ยมผืนผ้า กว้าง ${w} ซม. ยาว ${l} ซม. พื้นที่ = ___ ตร.ซม.`, ans: String(l*w), hint: `กว้าง × ยาว = ${w}×${l}` }
  }},
  { id: 'rect-peri', difficulty: 1, gen: r => {
    const l = ri(r,4,15), w = ri(r,2,10)
    return mcNum(r, `สี่เหลี่ยมผืนผ้า กว้าง ${w} ซม. ยาว ${l} ซม. เส้นรอบรูป = ?`, 2*(l+w), [l*w, l+w, 4*(l+w)], plain, `2×(${l}+${w})`)
  }},
  { id: 'square-area', difficulty: 1, gen: r => {
    const s = ri(r,2,12)
    return { type: 'fill', q: `จัตุรัสด้านยาว ${s} ซม. พื้นที่ = ___ ตร.ซม.`, ans: String(s*s), hint: `${s}×${s}` }
  }},
  { id: 'square-peri', difficulty: 1, gen: r => {
    const s = ri(r,2,10)
    return mcNum(r, `จัตุรัสด้านยาว ${s} ซม. เส้นรอบรูป = ?`, 4*s, [s*s, s+4, 3*s], plain, `4×${s}`)
  }},
  { id: 'find-width', difficulty: 2, gen: r => {
    const w = ri(r,2,8), area = ri(r,2,10)*w
    const l = area/w
    return { type: 'fill', q: `สี่เหลี่ยมผืนผ้ายาว ${l} ซม. พื้นที่ ${area} ตร.ซม. กว้าง = ___ ซม.`, ans: String(w), hint: `${area} ÷ ${l}` }
  }},
  { id: 'find-side', difficulty: 2, gen: r => {
    const s = ri(r,2,10), area = s*s
    return mcNum(r, `จัตุรัสมีพื้นที่ ${area} ตร.ซม. แต่ละด้านยาว = ?`, s, [s*2, area/2, s+2], plain, `√${area} = ${s}`)
  }},
  { id: 'unit-sq', difficulty: 1, gen: r => {
    const n = ri(r,2,8)
    return mcNum(r, `${n} ตร.ม. = ___ ตร.ซม. (1 ม. = 100 ซม.)`, n*10000, [n*100, n*1000, n*10000+100], plain, `${n}×100×100`)
  }},
  { id: 'compare-area', difficulty: 2, gen: r => {
    const l1=ri(r,3,10), w1=ri(r,2,8), l2=ri(r,3,10), w2=ri(r,2,8)
    const a1=l1*w1, a2=l2*w2
    const bigger = a1 >= a2 ? `รูป A (${a1} ตร.ซม.)` : `รูป B (${a2} ตร.ซม.)`
    return mcStr(r, `รูป A (${l1}×${w1}) กับ รูป B (${l2}×${w2}) รูปใดพื้นที่มากกว่า`,
      bigger,
      [`รูป A (${a1} ตร.ซม.)`, `รูป B (${a2} ตร.ซม.)`, 'เท่ากัน', 'บอกไม่ได้'].filter(n => n !== bigger) as string[],
      `A=${a1}, B=${a2}`)
  }},
  { id: 'peri-from-area', difficulty: 2, gen: r => {
    const s = ri(r,3,10)
    return mcNum(r, `จัตุรัสพื้นที่ ${s*s} ตร.ซม. เส้นรอบรูป = ?`, 4*s, [s*4+4, s*s, 3*s], plain, `ด้าน=${s}, เส้นรอบรูป=4×${s}`)
  }},
  { id: 'word-area', difficulty: 2, gen: r => {
    const l = ri(r,5,20), w = ri(r,3,12)
    return mcNum(r, `สนาม${l} เมตร × ${w} เมตร พื้นที่ = ?`, l*w, [l+w, 2*(l+w), l*w+l], plain, `${l}×${w}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'พื้นที่ของสี่เหลี่ยมผืนผ้าคำนวณอย่างไร',
    opts: ['กว้าง × ยาว', 'กว้าง + ยาว', '2 × (กว้าง + ยาว)', 'กว้าง × กว้าง'],
    ans: 0, hint: 'Area = กว้าง × ยาว'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'สี่เหลี่ยมผืนผ้า กว้าง 6 ซม. ยาว 9 ซม. พื้นที่ = ___ ตร.ซม.', ans: '54', hint: '6×9=54' },
  { type: 'mc', q: 'จัตุรัสด้านยาว 5 ซม. เส้นรอบรูป = ?', opts: ['20 ซม.', '10 ซม.', '25 ซม.', '15 ซม.'], ans: 0, hint: '4×5=20' },
  { type: 'fill', q: 'สี่เหลี่ยมผืนผ้ายาว 8 ซม. พื้นที่ 40 ตร.ซม. กว้าง = ___ ซม.', ans: '5', hint: '40÷8=5' },
]

const areaExam: ChapterExam = { chapterId: 'math-4-area', templates, bank }
export default areaExam
