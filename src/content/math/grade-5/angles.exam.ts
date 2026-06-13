import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ มุม ป.5 — ชนิดมุม + ผลรวมมุม 180°/360° + มุมเสริม/สมทบ
const templates: QuestionTemplate[] = [
  { id: 'angle-type', difficulty: 1, gen: r => {
    const t = Math.floor(r() * 4)
    const deg = t===0 ? ri(r,10,89) : t===1 ? 90 : t===2 ? ri(r,91,170) : 180
    const name = ['มุมแหลม','มุมฉาก','มุมป้าน','มุมตรง'][t]
    return mcStr(r, `มุม ${deg}° เรียกว่าอะไร`, name,
      ['มุมแหลม','มุมฉาก','มุมป้าน','มุมตรง'].filter(n => n !== name) as string[],
      `${deg < 90 ? '< 90 = แหลม' : deg === 90 ? '= 90 = ฉาก' : deg < 180 ? '91-179 = ป้าน' : '= 180 = ตรง'}`)
  }},
  { id: 'tri-third', difficulty: 2, gen: r => {
    const a = ri(r,30,80), b = ri(r,20, Math.min(80, 150-a)), c = 180-a-b
    return mcNum(r, `รูปสามเหลี่ยมมีมุม ${a}° และ ${b}° มุมที่สามเท่ากับ?`, c, [180-a, 180-b, a+b], plain, 'ผลรวม 3 มุม = 180°')
  }},
  { id: 'supplement', difficulty: 1, gen: r => {
    const x = ri(r,20,160)
    return { type: 'fill', q: `มุมสมทบ (supplementary) ของมุม ${x}° = ___°`, ans: String(180-x), hint: `${x} + ? = 180` }
  }},
  { id: 'complement', difficulty: 1, gen: r => {
    const x = ri(r,10,80)
    return { type: 'fill', q: `มุมเสริม (complementary) ของมุม ${x}° = ___°`, ans: String(90-x), hint: `${x} + ? = 90` }
  }},
  { id: 'on-line', difficulty: 1, gen: r => {
    const a = ri(r,20,160), b = 180-a
    return mcNum(r, `มุมสองมุมอยู่บนเส้นตรงเส้นเดียว มุมหนึ่งเท่ากับ ${a}° อีกมุมเท่ากับ?`, b, [360-a, 90-a>0?90-a:a+20, a], plain, 'รวมกันบนเส้นตรง = 180°')
  }},
  { id: 'around-point', difficulty: 2, gen: r => {
    const a = ri(r,70,100), b = ri(r,60,90), c = ri(r,60,90)
    const d = 360-a-b-c
    return mcNum(r, `มุมรอบจุดมี 4 มุม ขนาด ${a}°, ${b}°, ${c}° มุมที่ 4 เท่ากับ?`, d, [360-a-b, 360-b-c, a+b+c], plain, 'รวมรอบจุด = 360°')
  }},
  { id: 'isosceles-base', difficulty: 2, gen: r => {
    const base = ri(r,30,75)
    const apex = 180 - 2*base
    return mcNum(r, `สามเหลี่ยมหน้าจั่วมุมยอด ${apex}° มุมฐานแต่ละมุมเท่ากับ?`, base, [180-apex, apex/2, 90-apex>0?90-apex:apex+10], plain, 'มุมฐานเท่ากัน (180-apex)/2')
  }},
  { id: 'vert-opp', difficulty: 2, gen: r => {
    const x = ri(r,30,150)
    return { type: 'fill', q: `เส้นตัดกัน มุมตรงข้ามกับมุม ${x}° = ___°`, ans: String(x), hint: 'มุมตรงข้ามกัน (Vertical angles) เท่ากันเสมอ' }
  }},
  { id: 'equilateral-angle', difficulty: 1, gen: () => ({
    type: 'mc', q: 'สามเหลี่ยมด้านเท่ามุมแต่ละมุมเท่ากับ?',
    opts: ['60°', '45°', '90°', '120°'],
    ans: 0, hint: '180÷3 = 60°'
  })},
  { id: 'concept-tri', difficulty: 1, gen: () => ({
    type: 'mc', q: 'ผลรวมมุมภายในรูปสามเหลี่ยมทุกรูปเท่ากับ?',
    opts: ['180°', '360°', '270°', '90°'],
    ans: 0, hint: 'เป็นสมบัติของสามเหลี่ยมทุกรูป'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'มุม 135° เรียกว่าอะไร', opts: ['มุมป้าน', 'มุมแหลม', 'มุมฉาก', 'มุมตรง'], ans: 0, hint: '91-179° = มุมป้าน' },
  { type: 'fill', q: 'รูปสามเหลี่ยมมีมุม 50° และ 70° มุมที่สาม = ___°', ans: '60', hint: '180-50-70=60' },
  { type: 'fill', q: 'มุมเสริมของ 35° = ___°', ans: '55', hint: '90-35=55' },
]

const anglesExam: ChapterExam = { chapterId: 'math-5-angles', templates, bank }
export default anglesExam
