import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 4 ทศนิยม (ref: p6-c04) — ส่วนพัน + แปลงกับเศษส่วน
const decimals: ChapterV2 = {
  version: 2,
  id: 'math-6-decimals',
  subject: 'math',
  grade: 6,
  chapter: 4,
  title: 'ทศนิยม',
  icon: '🔟',
  slug: 'decimals',
  scenes: [
    {
      id: 'intro',
      say: 'ทศนิยมหลายหลัก: หลังจุดตัวที่ 1=ส่วนสิบ ตัวที่ 2=ส่วนร้อย ตัวที่ 3=ส่วนพัน',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 4, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
    {
      id: 'make',
      say: 'แท่ง 10 ช่อง = ส่วนสิบ ลองระบายให้ได้ 0.7 (7 ใน 10)',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 0, color: '#4F80FF' }], showLabels: true } },
      goal: { type: 'reach-value', key: 'r0', value: 7 },
      hint: 'แตะช่องที่ 7 → 7/10 = 0.7',
    },
    {
      id: 'thousandths',
      say: '0.125 = 125/1000 (3 หลักหลังจุด = ส่วนพัน) แปลงเศษส่วนเป็นทศนิยมได้ด้วยการหาร 1÷4 = 0.25',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.125 เท่ากับเศษส่วนใด?', opts: ['125/100', '125/1000', '1/125', '125/10'], ans: 1, hint: '3 หลักหลังจุด = ส่วนพัน' },
      },
    },
    {
      id: 'compare',
      say: 'เทียบทศนิยมดูทีละหลักจากซ้าย: 0.05 น้อยกว่า 0.5 เพราะหลักส่วนสิบ 0 < 5',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'จาก 0.5, 0.05, 0.55 ตัวใดน้อยสุด?', opts: ['0.5', '0.05', '0.55', 'เท่ากัน'], ans: 1, hint: 'หลักส่วนสิบ 0 น้อยสุด' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ส่วนสิบ/ร้อย/พัน · ทศนิยม ↔ เศษส่วนแปลงกลับได้ · เทียบทีละหลักจากซ้าย',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 7, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '0.125 เท่ากับเศษส่วนใด?', opts: ['125/100', '125/1000', '1/125', '125/10'], ans: 1, hint: '3 หลักหลังจุด = ส่วนพัน' },
    { type: 'mc', q: 'จาก 0.5, 0.05, 0.55 ตัวน้อยสุด?', opts: ['0.5', '0.05', '0.55', 'เท่ากัน'], ans: 1, hint: 'หลักส่วนสิบ 0 น้อยสุด' },
    { type: 'fill', q: 'เขียน 1/4 เป็นทศนิยม = ___', ans: '0.25', hint: '1÷4 = 0.25' },
    { type: 'fill', q: 'เขียน 0.7 เป็นเศษส่วน = 7/___', ans: '10', hint: 'ส่วนสิบ' },
    { type: 'mc', q: '0.05 เท่ากับเศษส่วนใด?', opts: ['5/10', '5/100', '5/1000', '1/5'], ans: 1, hint: '2 หลักหลังจุด = ส่วนร้อย' },
    { type: 'fill', q: 'เขียน 1/2 เป็นทศนิยม = ___', ans: '0.5', hint: '1÷2' },
    { type: 'mc', q: 'ตัวเลขใดมากที่สุด?', opts: ['0.9', '0.09', '0.99', '0.099'], ans: 2, hint: 'เทียบหลักทีละตัว' },
    { type: 'fill', q: 'เขียน 3/4 เป็นทศนิยม = ___', ans: '0.75', hint: '3÷4' },
    { type: 'slider', q: 'แท่ง 10 ช่อง: 0.4 ระบายกี่ช่อง?', min: 0, max: 10, step: 1, ans: 4, unit: 'ช่อง', hint: '4/10' },
    { type: 'mc', q: '0.250 กับ 0.25 ต่างกันไหม?', opts: ['เท่ากัน', '0.250 มากกว่า', '0.25 มากกว่า', 'บอกไม่ได้'], ans: 0, hint: 'เติม 0 ท้ายไม่เปลี่ยนค่า' },
  ],
}

export default decimals
