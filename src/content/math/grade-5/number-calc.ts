import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 1 จำนวนนับและการคำนวณ (ref: p5-c01) — ลำดับการดำเนินการจำนวนใหญ่ + วงเล็บ
const numberCalc: ChapterV2 = {
  version: 2,
  id: 'math-5-number-calc',
  subject: 'math',
  grade: 5,
  chapter: 1,
  title: 'จำนวนนับและการคำนวณ',
  icon: '🔢',
  slug: 'number-calc',
  scenes: [
    {
      id: 'intro',
      say: 'ป.5 คิดเลขใหญ่ขึ้นและผสมหลายเครื่องหมาย ทบทวนกฎ: คูณหารก่อน บวกลบทีหลัง',
      visual: { component: 'OrderMachine', config: { expression: [120, '+', 30, '×', 2], mode: 'left' } },
    },
    {
      id: 'wrong',
      say: 'ทำซ้ายไปขวา: 120 + 30 = 150 แล้ว 150 × 2 = 300 — ผิด!',
      visual: { component: 'OrderMachine', config: { expression: [120, '+', 30, '×', 2], mode: 'left' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '120 + 30 × 2 ถ้าทำซ้ายไปขวา (ผิดกฎ) จะได้เท่าไร?', opts: ['300', '180', '60', '150'], ans: 0, hint: '(120+30)=150 แล้ว 150×2=300 (ผิด!)' },
      },
    },
    {
      id: 'right',
      say: 'คูณก่อน: 30 × 2 = 60 แล้ว 120 + 60 = 180 ถูกต้อง',
      visual: { component: 'OrderMachine', config: { expression: [120, '+', 30, '×', 2], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '120 + 30 × 2 ตามกฎที่ถูก (×ก่อน) ได้เท่าไร?', opts: ['180', '300', '60', '150'], ans: 0, hint: 'คูณก่อน 30×2=60 แล้ว 120+60=180' },
      },
    },
    {
      id: 'solve',
      say: 'ลองเอง! แตะเครื่องหมายที่ต้องทำก่อน',
      visual: { component: 'OrderMachine', config: { expression: [25, '×', 4, '-', 50], mode: 'solve' } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'คูณก่อน 25×4=100 แล้ว 100−50=50',
    },
    {
      id: 'parentheses',
      say: 'มีวงเล็บต้องทำในวงเล็บก่อนสุด! (45 + 15) ÷ 6 ทำ 45+15=60 ก่อน แล้ว 60÷6',
      visual: { component: 'OrderMachine', config: { expression: [45, '+', 15, '÷', 6], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '(45 + 15) ÷ 6 = ?', opts: ['10', '47.5', '50', '5'], ans: 0, hint: 'วงเล็บก่อน 45+15=60 แล้ว 60÷6=10' },
      },
    },
    {
      id: 'nested-brackets',
      say: 'วงเล็บซ้อน: คำนวณวงเล็บในสุดก่อน (3+2)×(4−1) = 5×3 = 15',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '(3+2) × (4−1) = ?',
          words: [{ text: '(3+2)', color: '#4F80FF', bold: true }, { text: '(4−1)', color: '#FF7A2F', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '(3+2) × (4−1) = ?', opts: ['15', '9', '12', '20'], ans: 0, hint: 'วงเล็บซ้าย 3+2=5 วงเล็บขวา 4−1=3 แล้ว 5×3=15' },
      },
    },
    {
      id: 'order-complex',
      say: 'มีทั้งวงเล็บ คูณ หาร บวก — ทำวงเล็บก่อน แล้วคูณหาร แล้วบวกลบ',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '(10−4) × 2 + 8 ÷ 4 = ?',
          words: [{ text: '(10−4)', color: '#4F80FF', bold: true }, { text: '8 ÷ 4', color: '#FF7A2F', bold: true }],
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '(10−4) × 2 + 8 ÷ 4 = ?', opts: ['14', '16', '10', '20'], ans: 0, hint: '6×2=12, 8÷4=2, 12+2=14' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ลำดับ: วงเล็บ → คูณหาร → บวกลบ · ประมาณค่าก่อนช่วยเช็คว่าคำตอบสมเหตุสมผล',
      visual: { component: 'OrderMachine', config: { expression: [25, '×', 4, '-', 50], mode: 'correct' } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '120 + 30 × 2 = ?', opts: ['300', '180', '150', '240'], ans: 1, hint: 'คูณก่อน 30×2' },
    { type: 'fill', q: '(45 + 15) ÷ 6 = ___', ans: '10', hint: 'วงเล็บก่อน 60÷6' },
    { type: 'fill', q: '25 × 4 − 50 = ___', ans: '50', hint: 'คูณก่อน 100−50' },
    { type: 'mc', q: '8 + 6 × 5 = ?', opts: ['38', '70', '40', '58'], ans: 0, hint: '6×5=30 แล้ว +8' },
    { type: 'fill', q: '100 − 4 × 9 = ___', ans: '64', hint: '4×9=36 แล้ว 100−36' },
    { type: 'mc', q: '(20 − 8) × 3 = ?', opts: ['36', '4', '44', '12'], ans: 0, hint: 'วงเล็บก่อน 12×3' },
    { type: 'fill', q: '60 ÷ 5 + 7 = ___', ans: '19', hint: 'หารก่อน 12+7' },
    { type: 'mc', q: 'ในโจทย์ 50 − (10 + 5) ต้องทำอะไรก่อน?', opts: ['10 + 5 ในวงเล็บ', '50 − 10', 'ซ้ายไปขวา', '5 ก่อน'], ans: 0, hint: 'วงเล็บก่อนเสมอ' },
    { type: 'slider', q: '7 + 3 × 4 = ?', min: 0, max: 40, step: 1, ans: 19, unit: '', hint: '3×4=12 แล้ว 7+12' },
    { type: 'fill', q: '(8 + 2) × (6 − 1) = ___', ans: '50', hint: 'วงเล็บทั้งสอง: 10 × 5' },
    { type: 'mc', q: '(10−4) × 2 + 8 ÷ 4 = ?', opts: ['14', '16', '10', '20'], ans: 0, hint: '6×2=12, 8÷4=2, 12+2=14' },
    { type: 'fill', q: '(3 + 2) × (4 − 1) = ___', ans: '15', hint: '5 × 3 = 15' },
  ],
}

export default numberCalc
