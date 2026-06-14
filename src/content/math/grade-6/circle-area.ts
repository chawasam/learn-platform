import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 10 พื้นที่และเส้นรอบวง (ref: p6-c10) — π ≈ 3.14
const circleArea: ChapterV2 = {
  version: 2,
  id: 'math-6-circle-area',
  subject: 'math',
  grade: 6,
  chapter: 10,
  title: 'พื้นที่และเส้นรอบวง',
  icon: '⭕',
  slug: 'circle-area',
  scenes: [
    {
      id: 'intro',
      say: 'วงกลมใช้ค่าพิเศษ π ≈ 3.14 ปรับรัศมีดูก่อน แล้วเราจะใช้ π คำนวณรอบวงกับพื้นที่',
      visual: { component: 'CircleRadius', config: { initialR: 3 } },
      goal: { type: 'reach-value', key: 'r', value: 5 },
      hint: 'ปรับรัศมีให้เป็น 5 ก่อน',
    },
    {
      id: 'circumference',
      say: 'เส้นรอบวง = 2 × π × รัศมี ถ้ารัศมี 5: 2 × 3.14 × 5 = 31.4',
      visual: { component: 'CircleRadius', config: { initialR: 5, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'วงกลมรัศมี 10 เส้นรอบวง (2×3.14×10)?', opts: ['62.8', '31.4', '314', '20'], ans: 0, hint: '2 × 3.14 × 10' },
      },
    },
    {
      id: 'area',
      say: 'พื้นที่วงกลม = π × รัศมี × รัศมี ถ้ารัศมี 5: 3.14 × 5 × 5 = 78.5',
      visual: { component: 'CircleRadius', config: { initialR: 5, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'วงกลมรัศมี 2 พื้นที่ (3.14×2×2)?', opts: ['12.56', '6.28', '4', '25.12'], ans: 0, hint: '3.14 × 2 × 2' },
      },
    },
    {
      id: 'area-formula',
      say: 'พื้นที่วงกลม A = π × r² ≈ 3.14 × r × r',
      visual: { component: 'CircleRadius', config: { initialR: 4 } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สูตรพื้นที่วงกลมคือ?', opts: ['π × r² (3.14 × r × r)', '2 × π × r', 'π × d', 'r + r'], ans: 0, hint: 'พื้นที่ใช้ r² ส่วนเส้นรอบวงใช้ 2r' },
      },
    },
    {
      id: 'area-calculate',
      say: 'r=7 ซม. A=3.14×7²=3.14×49≈153.86 ซม.² — กดปุ่มดูรัศมี',
      visual: { component: 'CircleRadius', config: { initialR: 7, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'วงกลมรัศมี 7 ซม. พื้นที่ ≈ ?', opts: ['153.86 ซม.²', '43.96 ซม.²', '49 ซม.²', '21.98 ซม.²'], ans: 0, hint: '3.14 × 7 × 7 = 3.14 × 49 = 153.86' },
      },
    },
    {
      id: 'circumference-vs-area',
      say: 'ต่างกัน: เส้นรอบวง C=2πr คือความยาวขอบ · พื้นที่ A=πr² คือพื้นที่ข้างใน หน่วยต่างกัน (ซม. vs ซม.²)',
      visual: { component: 'CircleRadius', config: { initialR: 5, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'C=2πr กับ A=πr² ต่างกันอย่างไร?', opts: ['C=ความยาวขอบ (ซม.) · A=พื้นที่ข้างใน (ซม.²)', 'C=พื้นที่ · A=ขอบ', 'เหมือนกัน', 'C ใช้ r² · A ใช้ r'], ans: 0, hint: 'C วัดขอบ (1 มิติ) A วัดพื้นที่ (2 มิติ)' },
      },
    },
    {
      id: 'circle-area-quiz',
      say: 'r=5 → A = 3.14 × 5 × 5 = 3.14 × 25 = 78.5 ซม.² — จำ: πr² คือรัศมีคูณตัวเองแล้วคูณ 3.14',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'วงกลม r=5 ซม. พื้นที่ ≈ ?', opts: ['78.5 ซม.²', '31.4 ซม.²', '50 ซม.²', '157 ซม.²'], ans: 0, hint: '3.14×5²=3.14×25=78.5 ซม.²' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 π ≈ 3.14 · เส้นรอบวง = 2πr · พื้นที่ = πr² (π × รัศมี × รัศมี)',
      visual: { component: 'CircleRadius', config: { initialR: 5, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'วงกลมรัศมี 10 เส้นรอบวง = 2×3.14×10 = ___', ans: '62.8', hint: '2 × 3.14 × 10' },
    { type: 'fill', q: 'วงกลมรัศมี 2 พื้นที่ = 3.14×2×2 = ___', ans: '12.56', hint: 'π × r × r' },
    { type: 'fill', q: 'วงกลมรัศมี 5 เส้นรอบวง = 2×3.14×5 = ___', ans: '31.4', hint: '2 × 3.14 × 5' },
    { type: 'fill', q: 'วงกลมรัศมี 10 พื้นที่ = 3.14×10×10 = ___', ans: '314', hint: 'π × 100' },
    { type: 'fill', q: 'วงกลมรัศมี 3 พื้นที่ = 3.14×3×3 = ___', ans: '28.26', hint: 'π × 9' },
    { type: 'mc', q: 'รัศมี 4 เส้นรอบวง 2×3.14×4 = ?', opts: ['25.12', '50.24', '12.56', '8'], ans: 0, hint: '2 × 3.14 × 4' },
    { type: 'fill', q: 'π เขียนเป็นเศษส่วนประมาณ 22/___', ans: '7', hint: '22/7 ≈ 3.14' },
    { type: 'mc', q: 'วงกลม r=5 ซม. พื้นที่ ≈ ?', opts: ['78.5 ซม.²', '31.4 ซม.²', '50 ซม.²', '157 ซม.²'], ans: 0, hint: '3.14×25=78.5 ซม.²' },
    { type: 'fill', q: 'วงกลมรัศมี 7 พื้นที่ = 3.14×7×7 = ___', ans: '153.86', hint: '3.14 × 49' },
    { type: 'mc', q: 'วงกลม r=1 พื้นที่ ≈ ?', opts: ['3.14', '6.28', '1', '9.42'], ans: 0, hint: '3.14×1×1=3.14' },
  ],
}

export default circleArea
