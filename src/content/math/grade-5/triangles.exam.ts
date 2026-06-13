import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ รูปสามเหลี่ยม ป.5 — ชนิด + พื้นที่ ½×ฐาน×สูง + ผลรวมมุม 180°
const templates: QuestionTemplate[] = [
  { id: 'area-fill', difficulty: 1, gen: r => {
    const base = ri(r,1,8)*2, h = ri(r,2,12)
    return { type: 'fill', q: `รูปสามเหลี่ยม ฐาน ${base} ซม. สูง ${h} ซม. พื้นที่ = ___ ซม.²`, ans: String(base*h/2), hint: `½×${base}×${h}` }
  }},
  { id: 'area-mc', difficulty: 1, gen: r => {
    const base = ri(r,3,15)*2, h = ri(r,2,10)
    const area = base*h/2
    return mcNum(r, `รูปสามเหลี่ยม ฐาน ${base} ซม. สูง ${h} ซม. พื้นที่ = ?`, area, [base*h, base+h, area+h], plain, `½×ฐาน×สูง`)
  }},
  { id: 'missing-angle', difficulty: 2, gen: r => {
    const a = ri(r,30,80), b = ri(r,20, Math.min(80, 150-a))
    const c = 180-a-b
    return { type: 'fill', q: `สามเหลี่ยมมีมุม ${a}° และ ${b}° มุมที่ 3 = ___°`, ans: String(c), hint: `180 − ${a} − ${b}` }
  }},
  { id: 'angle-sum', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ผลรวมมุมภายในรูปสามเหลี่ยมทุกรูปเท่ากับ?',
    opts: ['180°', '360°', '90°', '270°'],
    ans: 0, hint: 'สมบัติพื้นฐานของสามเหลี่ยมทุกรูป'
  })},
  { id: 'perimeter', difficulty: 1, gen: r => {
    const a = ri(r,3,12), b = ri(r,3,12), c = ri(r,3,12)
    return { type: 'fill', q: `สามเหลี่ยมด้าน ${a}, ${b}, ${c} ซม. เส้นรอบรูป = ___ ซม.`, ans: String(a+b+c), hint: `${a}+${b}+${c}` }
  }},
  { id: 'equilateral-angle', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'สามเหลี่ยมด้านเท่า (equilateral) แต่ละมุมมีขนาดเท่ากับ?',
    opts: ['60°', '90°', '45°', '120°'],
    ans: 0, hint: '180÷3=60°'
  })},
  { id: 'isosceles-base', difficulty: 2, gen: r => {
    const base = ri(r,30,70)
    const apex = 180-2*base
    return mcNum(r, `สามเหลี่ยมหน้าจั่ว มุมยอด ${apex}° มุมฐานแต่ละมุม = ?`, base, [apex, 180-apex, base+apex], plain, `(180−${apex})÷2`)
  }},
  { id: 'type-by-angle', difficulty: 2, gen: r => {
    const t = Math.floor(r()*3)
    const a = t===1 ? 90 : t===0 ? ri(r,10,89) : ri(r,91,170)
    const names = ['สามเหลี่ยมมุมแหลม (ทุกมุม < 90°)', 'สามเหลี่ยมมุมฉาก (มีมุม = 90°)', 'สามเหลี่ยมมุมป้าน (มีมุม > 90°)']
    return mcStr(r, `สามเหลี่ยมที่มีมุม ${a}° เป็นมุมที่ใหญ่ที่สุด เป็นสามเหลี่ยมชนิดใด`,
      names[t],
      [...names.filter(n => n !== names[t]), 'ไม่สามารถระบุได้จากข้อมูลนี้'],
      `มุมใหญ่สุด ${a}° ${t===0?'<90=แหลม':t===1?'=90=ฉาก':'>90=ป้าน'}`)
  }},
  { id: 'right-tri-area', difficulty: 2, gen: r => {
    const leg1 = ri(r,3,12)*2, leg2 = ri(r,2,10)
    return { type: 'fill', q: `สามเหลี่ยมมุมฉาก ขาทั้งสอง ${leg1} ซม. และ ${leg2} ซม. พื้นที่ = ___ ซม.²`, ans: String(leg1*leg2/2), hint: `½×${leg1}×${leg2} (ขาสองด้านคือฐาน&สูง)` }
  }},
  { id: 'concept-types-side', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'สามเหลี่ยมที่มีด้านทั้ง 3 ยาวไม่เท่ากันเรียกว่า',
    opts: ['สามเหลี่ยมด้านไม่เท่า (Scalene)', 'สามเหลี่ยมหน้าจั่ว (Isosceles)', 'สามเหลี่ยมด้านเท่า (Equilateral)', 'สามเหลี่ยมมุมฉาก'],
    ans: 0, hint: '3 ด้านไม่เท่ากันเลย = Scalene'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'สามเหลี่ยม ฐาน 10 ซม. สูง 6 ซม. พื้นที่ = ___ ซม.²', ans: '30', hint: '½×10×6=30' },
  { type: 'mc', q: 'สามเหลี่ยมมีมุม 40° และ 70° มุมที่ 3 = ?', opts: ['70°', '110°', '60°', '40°'], ans: 0, hint: '180-40-70=70' },
  { type: 'fill', q: 'สามเหลี่ยมด้านเท่า เส้นรอบรูป 24 ซม. แต่ละด้านยาว = ___ ซม.', ans: '8', hint: '24÷3=8' },
]

const trianglesExam: ChapterExam = { chapterId: 'math-5-triangles', templates, bank }
export default trianglesExam
