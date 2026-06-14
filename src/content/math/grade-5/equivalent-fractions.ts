import type { ChapterV2 } from '@/types/curriculum'

const equivalentFractions: ChapterV2 = {
  version: 2,
  id: 'math-5-equiv-fractions',
  subject: 'math',
  grade: 5,
  chapter: 5,
  title: 'เศษส่วนที่เท่ากัน',
  icon: '🍰',
  slug: 'equivalent-fractions',
  scenes: [
    {
      id: 'intro',
      say: 'เศษส่วนที่เท่ากันเขียนได้หลายแบบ เช่น 1/2 ดูแท่งนี้ระบายครึ่งหนึ่งพอดี',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }], showLabels: true } },
    },
    {
      id: 'make-equal',
      say: 'แท่งล่างหั่นเป็น 4 ช่อง ลองระบายให้ยาวเท่าแท่งบน (1/2) สิ จะได้เศษส่วนอะไร?',
      visual: {
        component: 'FractionBars',
        config: { rows: [{ parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }, { parts: 4, filled: 0, color: '#FF7A2F' }], showEquals: true, showLabels: true },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'แตะช่องที่ 2 ของแท่งล่าง → 2/4 ยาวเท่ากับ 1/2 พอดี',
    },
    {
      id: 'equiv',
      say: 'เห็นไหม! 1/2 = 2/4 ยาวเท่ากันเป๊ะ เพราะเราคูณบนล่างด้วย 2 เหมือนกัน',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }, { parts: 4, filled: 2, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'reduce',
      say: 'ทำกลับกันคือ "ลดรูป" — หารบนล่างด้วยเลขเดียวกัน 2/4 ÷ 2 = 1/2 (เลขต่ำสุด)',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 4, filled: 2, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
    {
      id: 'quiz',
      say: '3/6 เท่ากับ 1/2 เพราะ 1×3=3 และ 2×3=6 — คูณบนล่างด้วยเลขเดียวกันได้เศษส่วนเท่ากันเสมอ',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เศษส่วนใดเท่ากับ 1/2?', opts: ['2/3', '3/6', '1/4', '2/5'], ans: 1, hint: 'บนเป็นครึ่งของล่าง 3 เป็นครึ่งของ 6' },
      },
    },
    {
      id: 'simplify',
      say: 'ลดรูปเศษส่วนคือหารตัวบนและตัวล่างด้วยจำนวนเดียวกัน เช่น 4/8 ÷ 4 = 1/2 ดูแท่งสองแถวนี้ยาวเท่ากัน',
      visual: {
        component: 'FractionBars',
        config: { rows: [{ parts: 8, filled: 4, fixed: true, color: '#FF7A2F' }, { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }], showLabels: true },
      },
    },
    {
      id: 'compare-diff-denom',
      say: 'เทียบ 1/2 กับ 1/3 ส่วนไม่เท่ากันต้องแปลงก่อน: 1/2 = 3/6 และ 1/3 = 2/6 แล้วค่อยเทียบ',
      visual: {
        component: 'FractionBars',
        config: { rows: [{ parts: 6, filled: 3, fixed: true, color: '#8B5A2B' }, { parts: 6, filled: 2, fixed: true, color: '#4A90D9' }], showLabels: true },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 เท่ากัน = คูณบนล่างด้วยเลขเดียว · ลดรูป = หารบนล่างด้วยเลขเดียว · เทียบต้องทำส่วนให้เท่ากันก่อน',
      visual: { component: 'FractionBars', config: { rows: [{ parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }, { parts: 4, filled: 2, fixed: true, color: '#FF7A2F' }], showLabels: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'เศษส่วนใดเท่ากับ 1/2?', opts: ['2/3', '3/6', '1/4', '2/5'], ans: 1, hint: 'บนเป็นครึ่งของล่าง' },
    { type: 'fill', q: 'ลดรูป 6/8 ให้ต่ำสุด = 3/___', ans: '4', hint: 'หารบนล่างด้วย 2' },
    { type: 'mc', q: '3/4 กับ 1/4 อันไหนมากกว่า?', opts: ['3/4', '1/4', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: 'ตัวล่างเท่ากัน ดูตัวบน' },
    { type: 'fill', q: '1/2 = 2/4 = 3/___', ans: '6', hint: 'คูณบนล่างด้วย 3' },
    { type: 'fill', q: 'ลดรูป 4/8 = 1/___', ans: '2', hint: 'หารด้วย 4' },
    { type: 'mc', q: 'เศษส่วนใดเท่ากับ 1/3?', opts: ['2/6', '2/3', '1/2', '3/4'], ans: 0, hint: 'คูณบนล่างด้วย 2' },
    { type: 'fill', q: 'ลดรูป 10/15 = 2/___', ans: '3', hint: 'หารด้วย 5' },
    { type: 'mc', q: '1/2 กับ 1/3 อันไหนมากกว่า? (แปลงส่วนให้เท่าก่อน)', opts: ['1/2', '1/3', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: '1/2 = 3/6, 1/3 = 2/6 ตัวบน 3 > 2' },
    { type: 'slider', q: 'แท่ง 6 ช่อง ระบายกี่ช่องให้เท่ากับ 1/2?', min: 0, max: 6, step: 1, ans: 3, unit: 'ช่อง', hint: 'ครึ่งหนึ่งของ 6' },
    { type: 'fill', q: 'ลดรูป 9/12 = 3/___', ans: '4', hint: 'หารด้วย 3' },
  ],
}

export default equivalentFractions
