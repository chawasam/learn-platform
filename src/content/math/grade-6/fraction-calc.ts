import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 3 เศษส่วนและการคำนวณ (ref: p6-c03) — ส่วนต่างกันต้องทำให้เท่าก่อน
const fractionCalc: ChapterV2 = {
  version: 2,
  id: 'math-6-fraction-calc',
  subject: 'math',
  grade: 6,
  chapter: 3,
  title: 'เศษส่วนและการคำนวณ',
  icon: '🍰',
  slug: 'fraction-calc',
  scenes: [
    {
      id: 'intro',
      say: 'บวกเศษส่วนที่ตัวล่างต่างกัน เช่น 1/2 + 1/3 บวกตรงๆ ไม่ได้! ดูแท่งสองอันยาวไม่เท่าช่อง',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }, { parts: 3, filled: 1, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'common',
      say: 'ต้องทำตัวล่างให้เท่ากันก่อน (หา ค.ร.น. ของ 2,3 = 6) → 1/2 = 3/6 และ 1/3 = 2/6',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 6, filled: 3, fixed: true, color: '#8B5A2B' }, { parts: 6, filled: 2, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'add',
      say: 'ตอนนี้ล่างเท่ากันแล้ว (6 ทั้งคู่) บวกตัวบน 3 + 2 = 5 ลองระบายแท่งล่างให้ครบ 5/6',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 6, filled: 0, color: '#22C55E' }], showLabels: true } },
      goal: { type: 'reach-value', key: 'r0', value: 5 },
      hint: 'แตะช่องที่ 5 → 5/6 = ผลของ 1/2 + 1/3',
    },
    {
      id: 'multiply',
      say: 'คูณเศษส่วนง่ายกว่า: คูณบน×บน ล่าง×ล่าง เลย เช่น 1/2 × 1/3 = 1/6',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1/2 × 1/3 = ?', opts: ['1/6', '2/5', '1/5', '2/6'], ans: 0, hint: 'บน×บน=1, ล่าง×ล่าง=6' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 บวกลบส่วนต่าง → ทำล่างเท่ากันก่อน (ค.ร.น.) · คูณ → บน×บน ล่าง×ล่าง',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 6, filled: 5, fixed: true, color: '#22C55E' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '1/2 + 1/3 = ___/6', ans: '5', hint: 'ทำล่างเป็น 6: 3/6+2/6' },
    { type: 'mc', q: '1/2 × 1/3 = ?', opts: ['1/6', '2/5', '1/5', '2/6'], ans: 0, hint: 'บน×บน ล่าง×ล่าง' },
    { type: 'fill', q: '3/4 − 1/4 = ___/4', ans: '2', hint: 'ล่างเท่ากัน ลบตัวบน' },
    { type: 'fill', q: '1/3 + 1/6 = ___/6', ans: '3', hint: '1/3=2/6 แล้ว 2/6+1/6' },
    { type: 'mc', q: '2/3 × 1/2 = ?', opts: ['2/6', '3/5', '2/5', '1/3'], ans: 0, hint: 'บน 2×1=2 ล่าง 3×2=6' },
    { type: 'fill', q: 'ค.ร.น. ของ 2 และ 3 (ตัวล่างร่วม) = ___', ans: '6', hint: '2,4,6... 3,6' },
    { type: 'mc', q: '1/4 + 1/2 = ?', opts: ['3/4', '2/6', '1/6', '2/4'], ans: 0, hint: '1/2=2/4 แล้ว 1/4+2/4' },
    { type: 'fill', q: '5/6 − 1/3 = 5/6 − 2/6 = ___/6', ans: '3', hint: '1/3=2/6 แล้ว 5−2' },
    { type: 'mc', q: '3/4 × 1/3 = ?', opts: ['3/12', '4/3', '1/4', '3/7'], ans: 0, hint: 'บน 3×1=3 ล่าง 4×3=12' },
    { type: 'slider', q: 'แท่ง 6 ช่อง: 1/2 + 1/3 ระบายรวมกี่ช่อง?', min: 0, max: 6, step: 1, ans: 5, unit: 'ช่อง', hint: '3/6 + 2/6' },
  ],
}

export default fractionCalc
