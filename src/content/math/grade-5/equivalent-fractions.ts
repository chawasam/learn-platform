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
      id: 'discover-half',
      say: 'แท่งบนระบายครึ่งหนึ่ง (1/2) แท่งล่างหั่น 4 ส่วน — ลองระบายให้ยาวเท่าแท่งบนดู',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 4, filled: 0, color: '#FF7A2F' },
          ],
          showEquals: true,
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'แตะช่องที่ 2 ของแท่งล่าง',
    },
    {
      id: 'reveal-half',
      say: '1/2 = 2/4 เท่ากันเลย! ตัวบน 1×2=2 ตัวล่าง 2×2=4 — คูณด้วย 2 เหมือนกันทั้งคู่',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 4, filled: 2, fixed: true, color: '#FF7A2F' },
          ],
          showLabels: true,
        },
      },
    },
    {
      id: 'discover-third',
      say: 'คราวนี้แท่งบนคือ 1/3 แท่งล่างหั่น 6 ส่วน — ลองระบายให้ยาวเท่ากัน',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 3, filled: 1, fixed: true, color: '#4A90D9' },
            { parts: 6, filled: 0, color: '#7BC8F6' },
          ],
          showEquals: true,
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'แตะช่องที่ 2 ของแท่งล่าง → 2/6 = 1/3',
    },
    {
      id: 'pattern',
      say: 'เห็น pattern แล้ว! 1/2 = 2/4 = 3/6 ยาวเท่ากันทั้งหมด — คูณบนล่างด้วยเลขเดียวกัน ค่าไม่เปลี่ยน',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 4, filled: 2, fixed: true, color: '#FF7A2F' },
            { parts: 6, filled: 3, fixed: true, color: '#F4A261' },
          ],
          showLabels: true,
        },
      },
    },
    {
      id: 'quiz-equiv',
      say: '4/6 = 2/3 เพราะ 2×2=4 และ 3×2=6 — คูณบนล่างด้วย 2 เหมือนกัน',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เศษส่วนใดเท่ากับ 2/3?', opts: ['4/6', '2/6', '3/4', '3/6'], ans: 0, hint: '2×2=4, 3×2=6 → 4/6' },
      },
    },
    {
      id: 'discover-reduce',
      say: 'แท่งบนระบาย 4/8 แท่งล่างมีแค่ 2 ส่วน — ลองระบายให้ยาวเท่าแท่งบน',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 8, filled: 4, fixed: true, color: '#FF7A2F' },
            { parts: 2, filled: 0, color: '#8B5A2B' },
          ],
          showEquals: true,
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'ระบาย 1 ช่อง → 1/2 = 4/8',
    },
    {
      id: 'reduce-rule',
      say: '4/8 = 1/2 เพราะ 4÷4=1 และ 8÷4=2 — หารบนล่างด้วยเลขเดียวกัน เรียกว่า "ลดรูป" ให้เลขเล็กที่สุด',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 8, filled: 4, fixed: true, color: '#FF7A2F' },
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
          ],
          showLabels: true,
        },
      },
    },
    {
      id: 'quiz-reduce',
      say: 'ลดรูป 6/9 = 2/3 เพราะ 6÷3=2 และ 9÷3=3',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ลดรูป 6/9 ให้ต่ำสุด = ?', opts: ['2/3', '3/6', '1/2', '4/6'], ans: 0, hint: 'หารด้วย 3 ทั้งบนล่าง' },
      },
    },
    {
      id: 'compare-bars',
      say: '1/2 ยาวกว่า 1/3 เสมอ — ตัวล่างยิ่งใหญ่ แต่ละชิ้นยิ่งเล็ก ถ้าจำนวนชิ้นเท่ากัน 1 ชิ้นจาก 2 มากกว่า 1 ชิ้นจาก 3',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 3, filled: 1, fixed: true, color: '#4A90D9' },
          ],
          showLabels: true,
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1/2 กับ 1/3 อันไหนมากกว่า? (ดูจากแท่ง)', opts: ['1/2 มากกว่า', '1/3 มากกว่า', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: 'แท่ง 1/2 ยาวกว่าแท่ง 1/3' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 เท่ากัน = คูณบนล่างเลขเดียวกัน · ลดรูป = หารบนล่างเลขเดียวกัน · เทียบส่วนต่างกัน = แปลงให้ส่วนเท่ากันก่อน',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 4, filled: 2, fixed: true, color: '#FF7A2F' },
            { parts: 6, filled: 3, fixed: true, color: '#F4A261' },
          ],
          showLabels: true,
        },
      },
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
    { type: 'mc', q: '1/2 กับ 1/3 อันไหนมากกว่า?', opts: ['1/2', '1/3', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: '1/2 = 3/6, 1/3 = 2/6 ตัวบน 3 > 2' },
    { type: 'slider', q: 'แท่ง 6 ช่อง ระบายกี่ช่องให้เท่ากับ 1/2?', min: 0, max: 6, step: 1, ans: 3, unit: 'ช่อง', hint: 'ครึ่งหนึ่งของ 6' },
    { type: 'fill', q: 'ลดรูป 9/12 = 3/___', ans: '4', hint: 'หารด้วย 3' },
  ],
}

export default equivalentFractions
