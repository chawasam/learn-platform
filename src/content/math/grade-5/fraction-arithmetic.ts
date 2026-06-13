import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 6 การคำนวณเศษส่วน (ref: p5-c06) — ส่วนเท่ากัน บวกลบเฉพาะตัวบน
const fractionArithmetic: ChapterV2 = {
  version: 2,
  id: 'math-5-fraction-arith',
  subject: 'math',
  grade: 5,
  chapter: 6,
  title: 'การคำนวณเศษส่วน',
  icon: '➕',
  slug: 'fraction-arithmetic',
  scenes: [
    {
      id: 'intro',
      say: 'บวกลบเศษส่วนที่ตัวล่างเท่ากัน ให้บวกลบแค่ตัวบน ตัวล่างคงเดิม — เริ่มจาก 1/4',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 4, filled: 1, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'add',
      say: 'บวกอีก 2/4 = ระบายเพิ่มอีก 2 ช่อง ลองแตะให้ครบ 3 ช่องดู (1/4 + 2/4)',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 4, filled: 1, color: '#FF7A2F' }], showLabels: true } },
      goal: { type: 'reach-value', key: 'r0', value: 3 },
      hint: 'แตะช่องที่ 3 → ระบาย 3 ช่อง = 3/4',
    },
    {
      id: 'result',
      say: 'ได้ 3/4! เห็นไหม 1/4 + 2/4 = 3/4 ตัวล่างไม่เปลี่ยน บวกแค่ตัวบน 1+2=3',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 4, filled: 3, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'quiz',
      say: 'ลองคิด! 1/5 + 3/5 = ?',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1/5 + 3/5 = ?', opts: ['4/5', '4/10', '4/25', '3/5'], ans: 0, hint: 'ล่างเท่ากัน บวกตัวบน 1+3=4' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ส่วนเท่ากัน → บวกลบตัวบน ตัวล่างคงเดิม · ถ้าส่วนไม่เท่าต้องทำให้เท่าก่อน (เรียนต่อ ป.6)',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 4, filled: 3, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '1/5 + 3/5 = ___/5', ans: '4', hint: 'ล่างเท่ากัน บวกแต่ตัวบน' },
    { type: 'mc', q: '5/8 − 2/8 = ?', opts: ['3/8', '7/8', '3/16', '2/8'], ans: 0, hint: 'ลบตัวบน ล่างคงเดิม' },
    { type: 'fill', q: '2/6 + 2/6 = 4/6 ลดรูป = 2/___', ans: '3', hint: '4/6 หาร 2' },
    { type: 'fill', q: '2/7 + 3/7 = ___/7', ans: '5', hint: '2+3' },
    { type: 'mc', q: '6/9 − 3/9 = ?', opts: ['3/9', '9/9', '3/18', '3/0'], ans: 0, hint: '6−3 ล่างคงเดิม' },
    { type: 'fill', q: '1/4 + 1/4 + 1/4 = ___/4', ans: '3', hint: '1+1+1' },
    { type: 'mc', q: '4/5 − 1/5 = ?', opts: ['3/5', '3/0', '5/5', '3/10'], ans: 0, hint: '4−1' },
    { type: 'fill', q: '3/10 + 4/10 = ___/10', ans: '7', hint: '3+4' },
    { type: 'slider', q: 'แท่ง 8 ช่อง: 2/8 + 3/8 ระบายรวมกี่ช่อง?', min: 0, max: 8, step: 1, ans: 5, unit: 'ช่อง', hint: '2+3' },
    { type: 'fill', q: '7/8 − 4/8 = ___/8', ans: '3', hint: '7−4' },
  ],
}

export default fractionArithmetic
