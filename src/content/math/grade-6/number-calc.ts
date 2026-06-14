import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 1 จำนวนนับและการคำนวณ (ref: p6-c01) — วงเล็บ → คูณหาร → บวกลบ
const numberCalc: ChapterV2 = {
  version: 2,
  id: 'math-6-number-calc',
  subject: 'math',
  grade: 6,
  chapter: 1,
  title: 'จำนวนนับและการคำนวณ',
  icon: '🔢',
  slug: 'number-calc',
  scenes: [
    {
      id: 'intro',
      say: 'ป.6 ลำดับการคำนวณเต็มรูปแบบ: วงเล็บก่อนสุด → คูณหาร → บวกลบ',
      visual: { component: 'OrderMachine', config: { expression: [1000, '-', 250, '×', 3], mode: 'left' } },
    },
    {
      id: 'wrong',
      say: 'ทำซ้ายไปขวา: 1000 − 250 = 750 แล้ว 750 × 3 = 2250 — ผิด!',
      visual: { component: 'OrderMachine', config: { expression: [1000, '-', 250, '×', 3], mode: 'left' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1000 − 250 × 3 ถ้าทำซ้ายไปขวา (ผิดกฎ) จะได้เท่าไร?', opts: ['2250', '250', '750', '1750'], ans: 0, hint: '(1000−250)=750 แล้ว 750×3=2250 (ผิดกฎ!)' },
      },
    },
    {
      id: 'right',
      say: 'คูณก่อน: 250 × 3 = 750 แล้ว 1000 − 750 = 250 ถูกต้อง',
      visual: { component: 'OrderMachine', config: { expression: [1000, '-', 250, '×', 3], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1000 − 250 × 3 ตามกฎที่ถูก (×ก่อน) ได้เท่าไร?', opts: ['250', '2250', '500', '750'], ans: 0, hint: 'คูณก่อน 250×3=750 แล้ว 1000−750=250' },
      },
    },
    {
      id: 'solve',
      say: 'ลองเอง! แตะเครื่องหมายที่ต้องทำก่อน',
      visual: { component: 'OrderMachine', config: { expression: [1000, '-', 250, '×', 3], mode: 'solve' } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'คูณก่อน 250×3 แล้วค่อยลบ',
    },
    {
      id: 'parentheses',
      say: 'มีวงเล็บทำในวงเล็บก่อนสุด! 100 − (4 + 6) × 5 ทำ 4+6=10 ก่อน แล้ว ×5 แล้วลบ',
      visual: { component: 'OrderMachine', config: { expression: [100, '-', 4, '+', 6, '×', 5], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '100 − (4 + 6) × 5 = ?', opts: ['50', '450', '30', '480'], ans: 0, hint: 'วงเล็บ 10 → ×5=50 → 100−50' },
      },
    },
    {
      id: 'nested-complex',
      say: 'วงเล็บซ้อน: {5×(12÷4)}−3 = {5×3}−3 = 15−3 = 12 คำนวณในสุดก่อน',
      visual: { component: 'OrderMachine', config: { expression: [5, '×', '(', 12, '÷', 4, ')', '-', 3], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '5 × (12 ÷ 4) − 3 = ?', opts: ['12', '9', '72', '3'], ans: 0, hint: 'ในวงเล็บ 12÷4=3 → 5×3=15 → 15−3=12' },
      },
    },
    {
      id: 'order-word',
      say: 'โจทย์จริงใช้วงเล็บได้เหมือนกัน — ลองคิดดู!',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ซื้อของ 3 อย่าง ราคา (20+15)×2 บาท ราคารวม = ?', opts: ['70 บาท', '50 บาท', '90 บาท', '110 บาท'], ans: 0, hint: '(20+15)=35, 35×2=70' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ลำดับ: วงเล็บ → คูณหาร → บวกลบ ทำตามนี้ทุกครั้งจะไม่ผิด',
      visual: { component: 'OrderMachine', config: { expression: [1000, '-', 250, '×', 3], mode: 'correct' } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '100 − (4 + 6) × 5 = ?', opts: ['50', '450', '30', '480'], ans: 0, hint: 'วงเล็บก่อน แล้วคูณ แล้วลบ' },
    { type: 'fill', q: '(8 + 12) ÷ 4 × 3 = ___', ans: '15', hint: 'วงเล็บ 20 ÷4=5 ×3' },
    { type: 'fill', q: '1,000 − 250 × 3 = ___', ans: '250', hint: 'คูณก่อน 250×3=750' },
    { type: 'mc', q: '(15 − 5) × 4 = ?', opts: ['40', '55', '10', '35'], ans: 0, hint: 'วงเล็บ 10 ×4' },
    { type: 'fill', q: '6 × 5 + 20 ÷ 4 = ___', ans: '35', hint: 'คูณหารก่อน 30 + 5' },
    { type: 'mc', q: '50 + (30 − 10) ÷ 5 = ?', opts: ['54', '12', '16', '50'], ans: 0, hint: 'วงเล็บ 20 ÷5=4 +50' },
    { type: 'fill', q: '200 − 5 × 5 × 4 = ___', ans: '100', hint: '5×5×4=100 แล้ว 200−100' },
    { type: 'mc', q: 'ลำดับการคำนวณข้อใดถูก?', opts: ['วงเล็บ→คูณหาร→บวกลบ', 'บวกลบก่อน', 'ซ้ายไปขวา', 'คูณก่อนวงเล็บ'], ans: 0, hint: 'วงเล็บก่อนสุดเสมอ' },
    { type: 'slider', q: '(2 + 3) × 4 = ?', min: 0, max: 40, step: 1, ans: 20, unit: '', hint: 'วงเล็บ 5 ×4' },
    { type: 'fill', q: '(100 ÷ 10) + (6 × 5) = ___', ans: '40', hint: '10 + 30' },
  ],
}

export default numberCalc
