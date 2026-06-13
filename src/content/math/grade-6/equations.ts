import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 7 สมการ (ref: p6-c07) — ตาชั่งสมดุล ทำสองข้างเหมือนกัน
const equations: ChapterV2 = {
  version: 2,
  id: 'math-6-equations',
  subject: 'math',
  grade: 6,
  chapter: 7,
  title: 'สมการ',
  icon: '⚖️',
  slug: 'equations',
  scenes: [
    {
      id: 'intro',
      say: 'สมการคือประโยคที่มี = สองข้างต้องเท่ากันเหมือนตาชั่งสมดุล นี่คือ x + 3 = 7',
      visual: { component: 'EquationBalance', config: { c: 3, r: 7, readOnly: true } },
    },
    {
      id: 'solve',
      say: 'หา x โดยทำให้ x อยู่ข้างเดียว — หยิบ 3 ออกทั้งสองข้าง ตาชั่งยังสมดุล ลองกดดู!',
      visual: { component: 'EquationBalance', config: { c: 3, r: 7 } },
      goal: { type: 'reach-value', key: 'solved', value: 1 },
      hint: 'กด "หยิบ 3 ออกทั้งสองข้าง" → ซ้ายเหลือ x ขวาเหลือ 4 → x = 4',
    },
    {
      id: 'rule',
      say: 'กฎทอง: ทำอะไรข้างหนึ่ง ต้องทำอีกข้างเหมือนกัน ตาชั่งถึงจะยังสมดุล',
      visual: { component: 'EquationBalance', config: { c: 3, r: 7, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'x + 5 = 12 แล้ว x = ?', opts: ['7', '17', '5', '12'], ans: 0, hint: 'ลบ 5 ทั้งสองข้าง 12−5=7' },
      },
    },
    {
      id: 'multiply',
      say: 'ถ้าเป็นการคูณ เช่น 3x = 15 ให้หารทั้งสองข้างด้วย 3 → x = 5',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '3x = 15 แล้ว x = ?', opts: ['3', '5', '12', '45'], ans: 1, hint: 'หาร 3 ทั้งสองข้าง 15÷3' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 สมการ = ตาชั่งสมดุล · บวกลบคูณหารต้องทำสองข้างเท่ากัน · เป้าหมายคือแยก x ให้อยู่ข้างเดียว',
      visual: { component: 'EquationBalance', config: { c: 3, r: 7, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'x + 5 = 12 แล้ว x = ___', ans: '7', hint: 'ลบ 5 ทั้งสองข้าง' },
    { type: 'mc', q: 'ถ้า 3x = 15 แล้ว x = ?', opts: ['3', '5', '12', '45'], ans: 1, hint: 'หาร 3 ทั้งสองข้าง' },
    { type: 'fill', q: 'x − 4 = 10 แล้ว x = ___', ans: '14', hint: 'บวก 4 ทั้งสองข้าง' },
    { type: 'fill', q: 'x + 8 = 20 แล้ว x = ___', ans: '12', hint: 'ลบ 8 ทั้งสองข้าง' },
    { type: 'mc', q: '5x = 20 แล้ว x = ?', opts: ['4', '5', '15', '100'], ans: 0, hint: 'หาร 5 ทั้งสองข้าง' },
    { type: 'fill', q: 'x − 7 = 3 แล้ว x = ___', ans: '10', hint: 'บวก 7 ทั้งสองข้าง' },
    { type: 'mc', q: 'x + 10 = 10 แล้ว x = ?', opts: ['0', '10', '20', '1'], ans: 0, hint: 'ลบ 10 ทั้งสองข้าง' },
    { type: 'fill', q: '2x = 14 แล้ว x = ___', ans: '7', hint: 'หาร 2 ทั้งสองข้าง' },
    { type: 'mc', q: 'แก้สมการต้องทำอย่างไร?', opts: ['ทำสองข้างเหมือนกัน', 'ทำข้างเดียว', 'ลบมั่วๆ', 'เดา'], ans: 0, hint: 'ตาชั่งต้องสมดุล' },
    { type: 'slider', q: 'x + 6 = 15 แล้ว x = ?', min: 0, max: 20, step: 1, ans: 9, unit: '', hint: '15 − 6' },
  ],
}

export default equations
