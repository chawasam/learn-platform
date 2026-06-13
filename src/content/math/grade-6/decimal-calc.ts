import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 5 การคำนวณทศนิยม (ref: p6-c05) — คูณ: นับจุดรวม · หาร: ทำตัวหารเป็นจำนวนเต็ม
const decimalCalc: ChapterV2 = {
  version: 2,
  id: 'math-6-decimal-calc',
  subject: 'math',
  grade: 6,
  chapter: 5,
  title: 'การคำนวณทศนิยม',
  icon: '➗',
  slug: 'decimal-calc',
  scenes: [
    {
      id: 'intro',
      say: 'คูณทศนิยม: คูณเหมือนเลขเต็มก่อน แล้วนับจำนวนหลักหลังจุดรวมกัน ใส่ในผลลัพธ์',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 6, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
    {
      id: 'multiply',
      say: '1.5 × 0.2: คิด 15 × 2 = 30 ก่อน แล้วนับจุด 1+1 = 2 ตำแหน่ง → 0.30',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1.2 × 0.5 = ?', opts: ['0.6', '6', '0.06', '1.7'], ans: 0, hint: '12×5=60 นับจุด 2 ตำแหน่ง → 0.60' },
      },
    },
    {
      id: 'multiply-int',
      say: 'คูณทศนิยมกับจำนวนเต็ม: 2.5 × 4 → 25×4=100 นับจุด 1 ตำแหน่ง → 10.0',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2.5 × 4 = ?', opts: ['10', '100', '1.0', '8.5'], ans: 0, hint: '25×4=100 จุด 1 ตำแหน่ง → 10.0' },
      },
    },
    {
      id: 'divide',
      say: 'หารทศนิยมง่ายๆ: 0.6 ÷ 2 → 6÷2=3 แล้วใส่จุดกลับ → 0.3',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.6 ÷ 2 = ?', opts: ['0.3', '0.03', '3', '0.12'], ans: 0, hint: '6÷2=3 ใส่จุด → 0.3' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 คูณ: คูณเลขเต็มแล้วนับจุดรวมใส่ผล · หาร: หารแล้วใส่จุดกลับให้ตรง',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 3, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '2.5 × 4 = ___', ans: '10', hint: '25×4=100 จุด 1 ตำแหน่ง' },
    { type: 'mc', q: '0.6 ÷ 2 = ?', opts: ['0.3', '0.03', '3', '0.12'], ans: 0, hint: '6÷2=3 ใส่จุด' },
    { type: 'fill', q: '1.2 × 0.5 = ___', ans: '0.6', hint: '12×5=60 จุด 2 ตำแหน่ง' },
    { type: 'fill', q: '3.5 × 2 = ___', ans: '7', hint: '35×2=70 จุด 1 ตำแหน่ง' },
    { type: 'mc', q: '0.8 ÷ 4 = ?', opts: ['0.2', '0.02', '2', '0.4'], ans: 0, hint: '8÷4=2 ใส่จุด' },
    { type: 'fill', q: '0.3 × 0.2 = ___', ans: '0.06', hint: '3×2=6 จุด 2 ตำแหน่ง → 0.06' },
    { type: 'mc', q: '4.5 ÷ 5 = ?', opts: ['0.9', '9', '0.09', '1.0'], ans: 0, hint: '45÷5=9 ใส่จุด → 0.9' },
    { type: 'fill', q: '1.5 × 0.2 = ___', ans: '0.3', hint: '15×2=30 จุด 2 ตำแหน่ง → 0.30' },
    { type: 'fill', q: '6.4 ÷ 2 = ___', ans: '3.2', hint: '64÷2=32 ใส่จุด' },
    { type: 'slider', q: '2.5 × 4 = ?', min: 0, max: 20, step: 1, ans: 10, unit: '', hint: '25×4=100 จุด 1' },
  ],
}

export default decimalCalc
