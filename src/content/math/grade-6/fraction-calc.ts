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
      id: 'problem',
      say: '1/2 กับ 1/3 ช่องกว้างไม่เท่ากัน — บวกตรงๆ ไม่ได้เพราะหน่วยต่างกัน เหมือนบวก "นาที" กับ "ชั่วโมง" ต้องแปลงก่อน',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 3, filled: 1, fixed: true, color: '#FF7A2F' },
          ],
          showLabels: true,
        },
      },
    },
    {
      id: 'convert-half',
      say: 'แปลง 1/2 ให้มี 6 ส่วน — ลองระบายแท่งล่าง (6 ส่วน) ให้ยาวเท่าแท่งบน (1/2)',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 6, filled: 0, color: '#22C55E' },
          ],
          showEquals: true,
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'แตะช่องที่ 3 → 3/6 = 1/2',
    },
    {
      id: 'convert-third',
      say: '1/2 = 3/6 แล้ว คราวนี้แปลง 1/3 ให้มี 6 ส่วนบ้าง',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 3, filled: 1, fixed: true, color: '#FF7A2F' },
            { parts: 6, filled: 0, color: '#60A5FA' },
          ],
          showEquals: true,
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'แตะช่องที่ 2 → 2/6 = 1/3',
    },
    {
      id: 'add-result',
      say: '3/6 + 2/6 ตอนนี้ล่างเท่ากัน! บวกตัวบน 3+2=5 → ได้ 5/6 ลองระบายแท่งนี้ให้ครบ 5 ช่อง',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 6, filled: 0, color: '#22C55E' }],
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'r0', value: 5 },
      hint: 'แตะช่องที่ 5',
    },
    {
      id: 'lcm-rule',
      say: 'ตัวล่างที่เท่ากันที่เล็กสุดเรียกว่า ค.ร.น. — ค.ร.น.(2,3)=6 ค.ร.น.(3,4)=12 ค.ร.น.(2,5)=10',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 6, filled: 3, fixed: true, color: '#8B5A2B' },
            { parts: 6, filled: 2, fixed: true, color: '#FF7A2F' },
          ],
          showLabels: true,
        },
      },
    },
    {
      id: 'quiz-add',
      say: '1/3 + 1/4 = 7/12 เพราะ ค.ร.น.(3,4)=12 → 4/12 + 3/12 = 7/12',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 3, filled: 1, color: '#FF7A2F' }, { parts: 4, filled: 1, color: '#4F80FF' }], showLabels: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1/3 + 1/4 = ?', opts: ['7/12', '2/7', '5/12', '1/6'], ans: 0, hint: 'ค.ร.น.(3,4)=12 → 4/12+3/12=7/12' },
      },
    },
    {
      id: 'multiply',
      say: 'คูณเศษส่วน: บน×บน ล่าง×ล่าง ตรงๆ เลย — ไม่ต้องหา ค.ร.น. เช่น 1/2 × 1/3 = 1/6',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 6, filled: 1, fixed: true, color: '#A855F7' }],
          showLabels: true,
        },
      },
    },
    {
      id: 'quiz-multiply',
      say: '2/3 × 1/2 = 2/6 = 1/3 เพราะ 2×1=2 และ 3×2=6 แล้วลดรูป',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 3, filled: 2, color: '#A855F7' }, { parts: 6, filled: 2, color: '#22C55E' }], showLabels: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2/3 × 1/2 = ?', opts: ['2/6', '3/5', '2/5', '3/6'], ans: 0, hint: 'บน 2×1=2 ล่าง 3×2=6 → 2/6 (อย่าบวก: (2+1)/(3×2)=3/6 ผิด)' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 บวกลบส่วนต่าง → หา ค.ร.น. แปลงก่อน แล้วค่อยบวกลบตัวบน · คูณ → บน×บน ล่าง×ล่าง ตรงๆ',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 6, filled: 5, fixed: true, color: '#22C55E' }],
          showLabels: true,
        },
      },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '1/2 + 1/3 = ___/6', ans: '5', hint: 'ทำล่างเป็น 6: 3/6+2/6' },
    { type: 'mc', q: '1/3 + 1/4 = ?', opts: ['7/12', '2/7', '5/12', '1/6'], ans: 0, hint: 'ค.ร.น.(3,4)=12 → 4/12+3/12=7/12' },
    { type: 'mc', q: '3/4 − 1/3 = ?', opts: ['5/12', '2/1', '2/12', '1/2'], ans: 0, hint: 'ค.ร.น.(4,3)=12 → 9/12−4/12=5/12' },
    { type: 'fill', q: '1/2 + 1/5 = ___/10', ans: '7', hint: 'ค.ร.น.(2,5)=10 → 5/10+2/10=7/10' },
    { type: 'mc', q: '2/3 − 1/4 = ?', opts: ['5/12', '1/12', '3/7', '1/6'], ans: 0, hint: 'ค.ร.น.(3,4)=12 → 8/12−3/12=5/12' },
    { type: 'mc', q: '1/2 × 1/3 = ?', opts: ['1/6', '2/5', '1/5', '2/6'], ans: 0, hint: 'บน×บน ล่าง×ล่าง' },
    { type: 'fill', q: '3/4 − 1/4 = ___/4', ans: '2', hint: 'ล่างเท่ากัน ลบตัวบน' },
    { type: 'fill', q: '1/3 + 1/6 = ___/6', ans: '3', hint: '1/3=2/6 แล้ว 2/6+1/6' },
    { type: 'mc', q: '2/3 × 1/2 = ?', opts: ['2/6', '3/5', '2/5', '1/3'], ans: 0, hint: 'บน 2×1=2 ล่าง 3×2=6' },
    { type: 'slider', q: 'แท่ง 12 ช่อง: 1/3 + 1/4 ระบายรวมกี่ช่อง?', min: 0, max: 12, step: 1, ans: 7, unit: 'ช่อง', hint: '4/12 + 3/12 = 7/12' },
  ],
}

export default fractionCalc
