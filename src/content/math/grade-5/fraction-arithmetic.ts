import type { ChapterV2 } from '@/types/curriculum'

const fractionArithmetic: ChapterV2 = {
  version: 2,
  id: 'math-5-fraction-arith',
  subject: 'math',
  grade: 5,
  chapter: 6,
  title: 'การคำนวณเศษส่วน',
  icon: '➕',
  slug: 'fraction-arithmetic',
  scenes: [
    {
      id: 'discover-add',
      say: 'แท่งนี้มี 1/4 ระบายแล้ว เอาอีก 2/4 มาเพิ่ม — ลองแตะให้ครบ 3 ช่อง',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 4, filled: 1, color: '#FF7A2F' }],
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'r0', value: 3 },
      hint: 'แตะช่องที่ 3',
    },
    {
      id: 'reveal-add',
      say: '1/4 + 2/4 = 3/4! ตัวล่างเท่ากัน บวกแค่ตัวบน 1+2=3 ตัวล่าง 4 คงเดิม',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 4, filled: 3, fixed: true, color: '#FF7A2F' }],
          showLabels: true,
        },
      },
    },
    {
      id: 'quiz-add',
      say: '1/5 + 3/5 = 4/5 เพราะตัวล่างเท่ากัน บวกตัวบน 1+3=4 ตัวล่าง 5 ไม่เปลี่ยน',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1/5 + 3/5 = ?', opts: ['4/5', '4/10', '4/25', '3/5'], ans: 0, hint: 'ล่างเท่ากัน บวกตัวบน 1+3=4' },
      },
    },
    {
      id: 'discover-sub',
      say: 'แท่งนี้ระบาย 3/4 ถ้าเอาออก 1/4 จะเหลือเท่าไร? ลองแตะช่องสุดท้ายออก',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 4, filled: 3, color: '#FF7A2F' }],
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'r0', value: 2 },
      hint: 'แตะช่องที่ 3 เพื่อเอาออก (แตะช่องที่ระบายอยู่แล้วเพื่อลด)',
    },
    {
      id: 'reveal-sub',
      say: '3/4 − 1/4 = 2/4! ลบแค่ตัวบน 3−1=2 ตัวล่าง 4 คงเดิมเหมือนเดิม',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 4, filled: 2, fixed: true, color: '#FF7A2F' }],
          showLabels: true,
        },
      },
    },
    {
      id: 'quiz-sub',
      say: '5/8 − 2/8 = 3/8 ลบตัวบน 5−2=3 ตัวล่าง 8 ไม่เปลี่ยน',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '5/8 − 2/8 = ?', opts: ['3/8', '7/8', '3/16', '2/8'], ans: 0, hint: 'ลบตัวบน ล่างคงเดิม' },
      },
    },
    {
      id: 'word-problem',
      say: 'เค้ก 5/8 ชิ้น กิน 2/8 ชิ้น เหลือ 3/8 ชิ้น — บวกลบส่วนเท่ากัน ทำแค่ตัวบน',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [{ parts: 8, filled: 3, fixed: true, color: '#FF7A2F' }],
          showLabels: true,
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ซื้อผ้า 7/10 เมตร ใช้ไป 3/10 เมตร เหลือกี่เมตร?', opts: ['4/10 เมตร', '10/10 เมตร', '4/20 เมตร', '3/10 เมตร'], ans: 0, hint: '7−3=4 ตัวล่าง 10 คงเดิม' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ส่วนเท่ากัน → บวกหรือลบแค่ตัวบน ตัวล่างคงเดิมเสมอ · ส่วนไม่เท่าต้องแปลงให้เท่ากันก่อน (เรียนต่อ ป.6)',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 5, filled: 4, fixed: true, color: '#FF7A2F' },
          ],
          showLabels: true,
        },
      },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '1/5 + 3/5 = ___/5', ans: '4', hint: 'ล่างเท่ากัน บวกแต่ตัวบน' },
    { type: 'mc', q: '5/8 − 2/8 = ?', opts: ['3/8', '7/8', '3/16', '2/8'], ans: 0, hint: 'ลบตัวบน ล่างคงเดิม' },
    { type: 'fill', q: '2/6 + 2/6 = 4/6 ลดรูป = 2/___', ans: '3', hint: '4/6 หาร 2' },
    { type: 'fill', q: '2/7 + 3/7 = ___/7', ans: '5', hint: '2+3' },
    { type: 'mc', q: '6/9 − 3/9 = ?', opts: ['3/9', '9/9', '3/18', '3/0'], ans: 0, hint: '6−3 ล่างคงเดิม' },
    { type: 'fill', q: '1/4 + 1/4 + 1/4 = ___/4', ans: '3', hint: '1+1+1' },
    { type: 'mc', q: '4/5 − 1/5 = ?', opts: ['3/5', '3/0', '5/5', '3/10'], ans: 0, hint: '4−1' },
    { type: 'fill', q: '3/10 + 4/10 = ___/10', ans: '7', hint: '3+4' },
    { type: 'slider', q: 'แท่ง 8 ช่อง: 2/8 + 3/8 ระบายรวมกี่ช่อง?', min: 0, max: 8, step: 1, ans: 5, unit: 'ช่อง', hint: '2+3' },
    { type: 'fill', q: '7/8 − 4/8 = ___/8', ans: '3', hint: '7−4' },
    { type: 'fill', q: '7/9 − 3/9 = ___/9', ans: '4', hint: 'ล่างเท่ากัน ลบตัวบน 7−3=4' },
  ],
}

export default fractionArithmetic
