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
      id: 'thousandths',
      say: 'ส่วนพัน = 0.001 เช่น 0.125 คือ 125 ส่วนพัน แบ่งแท่งออก 1000 ส่วน',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 1000, filled: 125, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'compare-3dec',
      say: 'เทียบ 0.125 กับ 0.13: ส่วนสิบเท่ากัน ดูส่วนร้อย: 2 < 3 ดังนั้น 0.125 < 0.13',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 1000, filled: 125 }, { parts: 1000, filled: 130 }], showLabels: true } },
    },
    {
      id: 'round-decimal',
      say: 'ปัดทศนิยม: ดูหลักถัดไป ถ้า ≥5 ปัดขึ้น ถ้า <5 ปัดทิ้ง — ลองคิดดู!',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '3.456 ปัดทศนิยม 2 ตำแหน่ง = ?', opts: ['3.46', '3.45', '3.5', '3.4'], ans: 0, hint: 'ดูหลักที่ 3 = 6 ≥ 5 → ปัดขึ้น 3.46' },
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
    { type: 'mc', q: '4.782 ปัดทศนิยม 2 ตำแหน่ง = ?', opts: ['4.78', '4.79', '4.8', '4.7'], ans: 0, hint: 'ดูหลักที่ 3 = 2 < 5 → ปัดทิ้ง 4.78' },
    { type: 'mc', q: '3.456 ปัดทศนิยม 2 ตำแหน่ง = ?', opts: ['3.46', '3.45', '3.5', '3.4'], ans: 0, hint: 'ดูหลักที่ 3 = 6 ≥ 5 → ปัดขึ้น 3.46' },
    { type: 'fill', q: '2.675 ปัดทศนิยม 1 ตำแหน่ง = ___', ans: '2.7', hint: 'ดูหลักที่ 2 = 7 ≥ 5 → ปัดขึ้น 2.7' },
    { type: 'fill', q: 'เขียน 1/4 เป็นทศนิยม = ___', ans: '0.25', hint: '1÷4 = 0.25' },
    { type: 'fill', q: 'เขียน 0.7 เป็นเศษส่วน = 7/___', ans: '10', hint: 'ส่วนสิบ' },
    { type: 'mc', q: '0.05 เท่ากับเศษส่วนใด?', opts: ['5/10', '5/100', '5/1000', '1/5'], ans: 1, hint: '2 หลักหลังจุด = ส่วนร้อย' },
    { type: 'mc', q: 'ตัวเลขใดมากที่สุด?', opts: ['0.9', '0.09', '0.99', '0.099'], ans: 2, hint: 'เทียบหลักทีละตัว' },
    { type: 'slider', q: 'แท่ง 10 ช่อง: 0.4 ระบายกี่ช่อง?', min: 0, max: 10, step: 1, ans: 4, unit: 'ช่อง', hint: '4/10' },
  ],
}

export default decimals
