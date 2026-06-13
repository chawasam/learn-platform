import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 7 ทศนิยม (ref: p5-c07) — ส่วนสิบ/ร้อย แท่ง 10 ช่อง + เทียบทศนิยม
const decimals: ChapterV2 = {
  version: 2,
  id: 'math-5-decimals',
  subject: 'math',
  grade: 5,
  chapter: 7,
  title: 'ทศนิยม',
  icon: '🔟',
  slug: 'decimals-5',
  scenes: [
    {
      id: 'intro',
      say: 'แท่งหั่น 10 ช่อง แต่ละช่อง = 0.1 (หนึ่งส่วนสิบ) ดูนี่ระบาย 3 ช่อง = 0.3',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 3, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
    {
      id: 'make-half',
      say: 'ลองระบายให้ได้ 0.5 (ครึ่งหนึ่ง) — แตะให้ครบ 5 ช่องจาก 10',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 0, color: '#4F80FF' }], showLabels: true } },
      goal: { type: 'reach-value', key: 'r0', value: 5 },
      hint: 'แตะช่องที่ 5 → 5/10 = 0.5 = ครึ่งหนึ่งพอดี',
    },
    {
      id: 'half',
      say: '5 ช่องจาก 10 = 5/10 = 0.5 = ครึ่งหนึ่ง! ทศนิยมกับเศษส่วนคือเรื่องเดียวกัน',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 5, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
    {
      id: 'compare',
      say: 'เทียบทศนิยมดูทีละหลักจากซ้าย: 0.5 > 0.45 เพราะหลักส่วนสิบ 5 มากกว่า 4',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ตัวเลขใดมากที่สุด?', opts: ['0.5', '0.45', '0.405', '0.49'], ans: 0, hint: 'เทียบหลักส่วนสิบก่อน 5 > 4' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 หลังจุด: ส่วนสิบ ส่วนร้อย · 0.5 = 5/10 = ครึ่ง · เทียบทีละหลักจากซ้าย',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 10, filled: 5, fixed: true, color: '#4F80FF' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '0.25 เท่ากับเศษส่วนใด?', opts: ['25/10', '25/100', '1/25', '2/5'], ans: 1, hint: '2 หลักหลังจุด = ส่วนร้อย' },
    { type: 'mc', q: 'ตัวเลขใดมากที่สุด?', opts: ['0.5', '0.45', '0.405', '0.49'], ans: 0, hint: 'เทียบหลักส่วนสิบก่อน' },
    { type: 'fill', q: 'เขียน 7/10 เป็นทศนิยม = ___', ans: '0.7', hint: 'ส่วน 10 → หลังจุด 1 ตัว' },
    { type: 'fill', q: 'เขียน 0.5 เป็นเศษส่วน = 5/___', ans: '10', hint: 'ส่วนสิบ' },
    { type: 'mc', q: '0.3 กับ 0.30 ต่างกันไหม?', opts: ['เท่ากัน', '0.3 มากกว่า', '0.30 มากกว่า', 'บอกไม่ได้'], ans: 0, hint: 'เติม 0 ท้ายไม่เปลี่ยนค่า' },
    { type: 'fill', q: '3 ส่วนสิบ เขียนเป็นทศนิยม = ___', ans: '0.3', hint: '3/10' },
    { type: 'mc', q: '0.8 เท่ากับเศษส่วนใด?', opts: ['8/10', '8/100', '1/8', '80/10'], ans: 0, hint: 'หลังจุด 1 ตัว = ส่วนสิบ' },
    { type: 'mc', q: 'ตัวเลขใดน้อยที่สุด?', opts: ['0.6', '0.06', '0.66', '0.16'], ans: 1, hint: 'หลักส่วนสิบ 0 น้อยสุด' },
    { type: 'slider', q: 'แท่ง 10 ช่อง: 0.7 ระบายกี่ช่อง?', min: 0, max: 10, step: 1, ans: 7, unit: 'ช่อง', hint: '7/10' },
    { type: 'fill', q: '1/2 เขียนเป็นทศนิยม = ___', ans: '0.5', hint: '1/2 = 5/10' },
  ],
}

export default decimals
