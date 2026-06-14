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
      say: 'กฎทอง: ทำอะไรข้างหนึ่ง ต้องทำอีกข้างเหมือนกัน ตาชั่งถึงจะยังสมดุล — x+5=12 ลบ 5 ทั้งสองข้าง → x=7',
      visual: { component: 'EquationBalance', config: { c: 3, r: 7, readOnly: true } },
      revealAfterGoal: true,
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
      id: 'write-from-word',
      say: 'เขียนสมการ: เด็กอายุ x ปี อีก 5 ปีจะอายุ 12 → x + 5 = 12 หา x',
      visual: { component: 'EquationBalance', config: { c: 5, r: 12, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เด็กอายุ x ปี อีก 5 ปีจะอายุ 12 — สมการคือ?', opts: ['x + 5 = 12', 'x + 12 = 5', '5x = 12', 'x − 5 = 12'], ans: 0, hint: 'อายุปัจจุบัน + 5 = 12' },
      },
    },
    {
      id: 'two-step-eq',
      say: 'สมการ 2 ขั้น: 2x + 3 = 11 → ลบ 3 ทั้งสองข้าง → 2x = 8 → x = 4',
      visual: { component: 'EquationBalance', config: { c: 3, r: 11, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2x + 3 = 11 แล้ว x = ?', opts: ['4', '7', '3', '8'], ans: 0, hint: 'ลบ 3 → 2x=8 → หาร 2 → x=4' },
      },
    },
    {
      id: 'equation-quiz',
      say: 'ตรวจสอบคำตอบทำได้เสมอ: แทนค่า x กลับเข้าสมการ แล้วดูว่าสองข้างเท่ากันไหม',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '3x − 5 = 10 แล้ว x = ?', opts: ['5', '3', '15', '7'], ans: 0, hint: '3x=15 → x=5 ตรวจ: 3×5−5=10 ✓' },
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
    { type: 'mc', q: '5x = 20 แล้ว x = ?', opts: ['4', '5', '15', '100'], ans: 0, hint: 'หาร 5 ทั้งสองข้าง' },
    { type: 'fill', q: '2x = 14 แล้ว x = ___', ans: '7', hint: 'หาร 2 ทั้งสองข้าง' },
    { type: 'slider', q: 'x + 6 = 15 แล้ว x = ?', min: 0, max: 20, step: 1, ans: 9, unit: '', hint: '15 − 6' },
    { type: 'fill', q: '2x + 3 = 11 แล้ว x = ___', ans: '4', hint: 'ลบ 3 → 2x=8 → หาร 2' },
    { type: 'mc', q: '3x − 5 = 10 แล้ว x = ?', opts: ['5', '3', '15', '7'], ans: 0, hint: '3x=15 → x=5 ตรวจ: 3×5−5=10 ✓' },
    { type: 'fill', q: 'เด็กอายุ x ปี อีก 5 ปีจะอายุ 12 → x = ___', ans: '7', hint: 'x+5=12 → x=7' },
    { type: 'mc', q: '4x + 2 = 18 แล้ว x = ?', opts: ['4', '5', '2', '8'], ans: 0, hint: '4x=16 → x=4 ตรวจ: 4×4+2=18 ✓' },
  ],
}

export default equations
