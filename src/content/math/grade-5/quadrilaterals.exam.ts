import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ รูปสี่เหลี่ยม ป.5 — พื้นที่/เส้นรอบรูป + ผลรวมมุม 360°
const templates: QuestionTemplate[] = [
  { id: 'rect-area', difficulty: 1, gen: r => {
    const l = ri(r,3,20), w = ri(r,2,12)
    return { type: 'fill', q: `สี่เหลี่ยมผืนผ้า กว้าง ${w} ซม. ยาว ${l} ซม. พื้นที่ = ___ ซม.²`, ans: String(l*w), hint: `กว้าง × ยาว = ${w}×${l}` }
  }},
  { id: 'rect-peri', difficulty: 1, gen: r => {
    const l = ri(r,5,20), w = ri(r,3,12)
    return mcNum(r, `สี่เหลี่ยมผืนผ้า กว้าง ${w} ซม. ยาว ${l} ซม. เส้นรอบรูป = ?`, 2*(l+w), [l*w, l+w, 2*(l+w)+l], plain, `2×(${l}+${w})`)
  }},
  { id: 'square-area', difficulty: 1, gen: r => {
    const s = ri(r,3,15)
    return { type: 'fill', q: `จัตุรัสด้านยาว ${s} ซม. พื้นที่ = ___ ซม.²`, ans: String(s*s), hint: `${s}×${s}` }
  }},
  { id: 'square-peri', difficulty: 1, gen: r => {
    const s = ri(r,3,12)
    return mcNum(r, `จัตุรัสด้านยาว ${s} ซม. เส้นรอบรูป = ?`, 4*s, [s*s, s+4, 3*s], plain, `4×${s}`)
  }},
  { id: 'para-area', difficulty: 2, gen: r => {
    const base = ri(r,5,20), h = ri(r,3,12)
    return { type: 'fill', q: `สี่เหลี่ยมด้านขนาน ฐาน ${base} ซม. สูง ${h} ซม. พื้นที่ = ___ ซม.²`, ans: String(base*h), hint: `ฐาน × สูง = ${base}×${h}` }
  }},
  { id: 'trap-area', difficulty: 3, gen: r => {
    const h = ri(r,1,6)*2, a = ri(r,5,15), b = ri(r,5,15)
    const area = (a+b)*h/2
    return mcNum(r, `คางหมู ด้านขนาน ${a} และ ${b} ซม. สูง ${h} ซม. พื้นที่ = ?`, area, [(a+b)*h, (a+b)/2, a*b*h], plain, `½×(${a}+${b})×${h}`)
  }},
  { id: 'angle-sum-360', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ผลรวมมุมภายในรูปสี่เหลี่ยมใดๆ เท่ากับ?',
    opts: ['360°', '180°', '270°', '90°'],
    ans: 0, hint: '4 มุม × 90° = 360°'
  })},
  { id: 'missing-angle', difficulty: 2, gen: r => {
    const a = ri(r,70,100), b = ri(r,70,100), c = ri(r,70,100), d = 360-a-b-c
    return mcNum(r, `รูปสี่เหลี่ยมมีมุม ${a}°, ${b}°, ${c}° มุมที่ 4 = ?`, d, [360-a-b, a+b+c, 360-a], plain, `360 − ${a} − ${b} − ${c}`)
  }},
  { id: 'find-length', difficulty: 2, gen: r => {
    const w = ri(r,3,10), area = ri(r,2,8)*w
    const l = area / w
    return { type: 'fill', q: `สี่เหลี่ยมผืนผ้า กว้าง ${w} ซม. พื้นที่ ${area} ซม.² ยาว = ___ ซม.`, ans: String(l), hint: `${area} ÷ ${w}` }
  }},
  { id: 'concept-types', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'รูปสี่เหลี่ยมใดมีด้านทั้ง 4 เท่ากันและมุมทุกมุมเป็นมุมฉาก',
    opts: ['จัตุรัส', 'สี่เหลี่ยมผืนผ้า', 'สี่เหลี่ยมด้านขนาน', 'สี่เหลี่ยมคางหมู'],
    ans: 0, hint: 'จัตุรัส = ด้านเท่า + มุมฉาก'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'สี่เหลี่ยมผืนผ้า กว้าง 5 ซม. ยาว 8 ซม. พื้นที่ = ___ ซม.²', ans: '40', hint: '5×8=40' },
  { type: 'mc', q: 'จัตุรัสด้านยาว 7 ซม. เส้นรอบรูป = ?', opts: ['28 ซม.', '14 ซม.', '49 ซม.', '21 ซม.'], ans: 0, hint: '4×7=28' },
  { type: 'mc', q: 'รูปสี่เหลี่ยมมีมุม 80°, 90°, 95° มุมที่ 4 = ?', opts: ['95°', '85°', '75°', '100°'], ans: 0, hint: '360-80-90-95=95' },
]

const quadrilateralsExam: ChapterExam = { chapterId: 'math-5-quadrilaterals', templates, bank }
export default quadrilateralsExam
