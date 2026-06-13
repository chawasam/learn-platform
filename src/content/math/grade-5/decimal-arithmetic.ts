import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 8 การคำนวณทศนิยม (ref: p5-c08) — ตั้งจุดตรงกัน
const decimalArithmetic: ChapterV2 = {
  version: 2,
  id: 'math-5-decimal-arith',
  subject: 'math',
  grade: 5,
  chapter: 8,
  title: 'การคำนวณทศนิยม',
  icon: '✖️',
  slug: 'decimal-arithmetic',
  scenes: [
    {
      id: 'intro',
      say: 'บวกลบทศนิยม กฎเดียว: ตั้ง "จุด" ให้ตรงกัน แล้วบวกลบเหมือนเลขปกติ เช่น 2.50 + 1.25',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 5, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
    {
      id: 'add',
      say: 'ลองคิด! 2.5 + 1.25 ตั้งจุดตรงกัน: 2.50 + 1.25 บวกได้เท่าไร?',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2.5 + 1.25 = ?', opts: ['3.75', '3.30', '1.50', '37.5'], ans: 0, hint: 'ตั้งจุดตรงกัน 2.50 + 1.25' },
      },
    },
    {
      id: 'subtract',
      say: 'ลบก็ตั้งจุดตรงกัน 5.0 − 1.5 คิดเหมือน 50 − 15 แล้วใส่จุด',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '5.0 − 1.5 = ?', opts: ['3.5', '4.5', '3.0', '4.0'], ans: 0, hint: 'เหมือน 50−15=35 ใส่จุด' },
      },
    },
    {
      id: 'multiply',
      say: 'คูณทศนิยม: คูณเหมือนเลขเต็มก่อน แล้วนับจุดทศนิยมใส่ผล 0.2 × 3 → 2×3=6 มีจุด 1 ตำแหน่ง',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.2 × 3 = ?', opts: ['0.6', '6', '0.06', '0.23'], ans: 0, hint: '2×3=6 มีจุด 1 ตำแหน่ง → 0.6' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 บวกลบ: ตั้งจุดตรงกัน · คูณ: คูณเลขเต็มแล้วนับจุดรวมใส่ผล',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 5, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '2.5 + 1.25 = ___', ans: '3.75', hint: 'ตั้งจุดตรงกัน 2.50+1.25' },
    { type: 'mc', q: '5.0 − 1.5 = ?', opts: ['3.5', '4.5', '3.0', '4.0'], ans: 0, hint: 'เหมือน 50−15 แล้วใส่จุด' },
    { type: 'fill', q: '0.2 × 3 = ___', ans: '0.6', hint: '2×3=6 มีจุด 1 ตำแหน่ง' },
    { type: 'fill', q: '1.5 + 2.5 = ___', ans: '4', hint: '15+25=40 → 4.0' },
    { type: 'mc', q: '3.75 − 1.25 = ?', opts: ['2.5', '2.0', '5.0', '2.50'], ans: 0, hint: '375−125=250 → 2.50' },
    { type: 'fill', q: '0.5 × 4 = ___', ans: '2', hint: '5×4=20 จุด 1 ตำแหน่ง → 2.0' },
    { type: 'mc', q: '6.4 + 2.6 = ?', opts: ['9', '8.0', '9.10', '8.10'], ans: 0, hint: '64+26=90 → 9.0' },
    { type: 'fill', q: '0.3 × 2 = ___', ans: '0.6', hint: '3×2=6 จุด 1 ตำแหน่ง' },
    { type: 'fill', q: '4.5 − 2.5 = ___', ans: '2', hint: '45−25=20 → 2.0' },
    { type: 'slider', q: '1.2 + 0.8 = ?', min: 0, max: 5, step: 1, ans: 2, unit: '', hint: '12+8=20 → 2.0' },
  ],
}

export default decimalArithmetic
