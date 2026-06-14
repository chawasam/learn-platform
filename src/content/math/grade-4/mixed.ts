import type { ChapterV2 } from '@/types/curriculum'

// บวกลบคูณหารระคน ป.4 — story (curriculum ref: math-thai-p456 p4-c13)
// หัวใจ: ลำดับการดำเนินการ — คูณหารก่อน บวกลบทีหลัง (วงเล็บก่อนสุด)

const mixed: ChapterV2 = {
  version: 2,
  id: 'math-4-mixed',
  subject: 'math',
  grade: 4,
  chapter: 13,
  title: 'บวกลบคูณหารระคน',
  icon: '🧮',
  slug: 'order-of-operations',
  scenes: [
    {
      id: 'intro',
      say: 'บางโจทย์มีหลายเครื่องหมายปนกัน เช่น 2 + 3 × 4 — ทำอันไหนก่อนดีนะ? ลองดูสองทาง',
      visual: { component: 'OrderMachine', config: { expression: [2, '+', 3, '×', 4], mode: 'left' } },
    },
    {
      id: 'wrong-way',
      say: 'ถ้าทำซ้ายไปขวาเฉยๆ: 2 + 3 = 5 แล้ว 5 × 4 = 20 — แต่นี่ผิดนะ! ลองดูทางที่ถูก',
      visual: { component: 'OrderMachine', config: { expression: [2, '+', 3, '×', 4], mode: 'left' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2 + 3 × 4 ถ้าทำซ้ายไปขวา (ผิดกฎ) จะได้เท่าไร?', opts: ['20', '14', '12', '10'], ans: 0, hint: '(2+3)=5 แล้ว 5×4=20 (ผิดกฎ!)' },
      },
    },
    {
      id: 'right-way',
      say: 'กฎคือ "คูณหารก่อน บวกลบทีหลัง"! ทำ 3 × 4 = 12 ก่อน แล้ว 2 + 12 = 14 ถึงจะถูก',
      visual: { component: 'OrderMachine', config: { expression: [2, '+', 3, '×', 4], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2 + 3 × 4 ตามกฎที่ถูก (×ก่อน) ได้เท่าไร?', opts: ['14', '20', '10', '12'], ans: 0, hint: 'คูณก่อน 3×4=12 แล้ว 2+12=14' },
      },
    },
    {
      id: 'solve-1',
      say: 'ลองเอง! แตะเครื่องหมายที่ต้องทำก่อน — ถ้าเลือกผิดเครื่องจะเตือนนะ',
      visual: { component: 'OrderMachine', config: { expression: [2, '+', 3, '×', 4], mode: 'solve' } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'แตะ × ก่อน (3×4=12) แล้วค่อยแตะ + (2+12=14)',
    },
    {
      id: 'solve-2',
      say: 'อีกข้อ! 10 − 6 ÷ 2 — หารก่อนนะ ลองแตะดู',
      visual: { component: 'OrderMachine', config: { expression: [10, '-', 6, '÷', 2], mode: 'solve' } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'แตะ ÷ ก่อน (6÷2=3) แล้วแตะ − (10−3=7)',
    },
    {
      id: 'parentheses',
      say: 'ถ้ามีวงเล็บ ( ) ต้องทำในวงเล็บก่อนสุด! เช่น (5 + 3) × 2 ทำ 5+3=8 ก่อน แล้ว 8×2=16',
      visual: { component: 'OrderMachine', config: { expression: [5, '+', 3, '×', 2], mode: 'correct' } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '(5 + 3) × 2 = ?', opts: ['16', '11', '13', '40'], ans: 0, hint: 'ในวงเล็บก่อน: 5+3=8 แล้ว 8×2=16' },
      },
    },
    {
      id: 'solve-3',
      say: 'ท้าให้ลองอีกข้อ — 12 ÷ 4 + 5 มีหารกับบวก ทำอันไหนก่อน?',
      visual: { component: 'OrderMachine', config: { expression: [12, '÷', 4, '+', 5], mode: 'solve' } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'แตะ ÷ ก่อน (12÷4=3) แล้วแตะ + (3+5=8)',
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ลำดับ: วงเล็บก่อนสุด → คูณหาร → บวกลบ ทำซ้ายไปขวาเฉยๆ จะได้ผิด!',
      visual: { component: 'OrderMachine', config: { expression: [10, '-', 6, '÷', 2], mode: 'correct' } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '2 + 3 × 4 = ?', opts: ['20', '14', '24', '11'], ans: 1, hint: 'คูณก่อน 3×4=12 แล้ว 2+12' },
    { type: 'fill', q: '(5 + 3) × 2 = ___', ans: '16', hint: 'ในวงเล็บก่อน: 5+3=8 แล้ว ×2' },
    { type: 'mc', q: '10 − 6 ÷ 2 = ?', opts: ['2', '7', '4', '8'], ans: 1, hint: 'หารก่อน 6÷2=3 แล้ว 10−3' },
    { type: 'mc', q: '5 + 2 × 3 = ?', opts: ['11', '21', '16', '13'], ans: 0, hint: 'คูณก่อน 2×3=6 แล้ว 5+6' },
    { type: 'fill', q: '12 − 2 × 3 = ___', ans: '6', hint: 'คูณก่อน 2×3=6 แล้ว 12−6' },
    { type: 'mc', q: '4 × 3 + 2 = ?', opts: ['14', '20', '24', '18'], ans: 0, hint: 'คูณก่อน 4×3=12 แล้ว +2' },
    { type: 'fill', q: '20 ÷ 4 + 1 = ___', ans: '6', hint: 'หารก่อน 20÷4=5 แล้ว +1' },
    { type: 'mc', q: '(10 − 4) × 2 = ?', opts: ['12', '16', '6', '20'], ans: 0, hint: 'ในวงเล็บก่อน: 10−4=6 แล้ว ×2' },
    { type: 'slider', q: '3 + 4 × 2 = ?', min: 0, max: 20, step: 1, ans: 11, unit: '', hint: 'คูณก่อน 4×2=8 แล้ว 3+8' },
    { type: 'mc', q: 'ในโจทย์ 6 + 2 × 5 ต้องทำอะไรก่อน?', opts: ['คูณ 2 × 5', 'บวก 6 + 2', 'ทำซ้ายไปขวา', 'ทำขวาไปซ้าย'], ans: 0, hint: 'คูณหารก่อนเสมอ' },
  ],
}

export default mixed
