import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 11 โจทย์ปัญหา (ร้อยละ) (ref: p6-c11) — % = ส่วนของ 100
const percent: ChapterV2 = {
  version: 2,
  id: 'math-6-percent',
  subject: 'math',
  grade: 6,
  chapter: 11,
  title: 'ร้อยละ',
  icon: '💯',
  slug: 'percent',
  scenes: [
    {
      id: 'intro',
      say: 'ร้อยละ (%) คือ "ส่วนของ 100" แถบนี้มี 100 ช่อง ลองปรับให้เป็น 20% ดู (20 ช่อง)',
      visual: { component: 'PercentBar', config: { initialPercent: 10, total: 500 } },
      goal: { type: 'reach-value', key: 'percent', value: 20 },
      hint: 'กด +10 จนเป็น 20% — จะระบาย 20 ช่องจาก 100',
    },
    {
      id: 'calc',
      say: 'หา % ของจำนวน: เอา % หาร 100 แล้วคูณจำนวน 20% ของ 500 = 20/100 × 500 = 100',
      visual: { component: 'PercentBar', config: { initialPercent: 20, total: 500, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '20% ของ 500 = ?', opts: ['100', '20', '480', '250'], ans: 0, hint: '20/100 × 500 = 100' },
      },
    },
    {
      id: 'discount',
      say: 'ลดราคา: เสื้อ 500 ลด 20% → ลด 100 บาท จ่ายจริง 500 − 100 = 400',
      visual: { component: 'PercentBar', config: { initialPercent: 25, total: 800, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เสื้อ 800 บาท ลด 25% ลดกี่บาท?', opts: ['200', '250', '25', '400'], ans: 0, hint: '25/100 × 800' },
      },
    },
    {
      id: 'percent-of-total',
      say: 'คิดเปอร์เซ็นต์จากยอดรวม: 30 คนจาก 50 คน = 30÷50×100 = 60%',
      visual: { component: 'PercentBar', config: { initialPercent: 60, total: 50, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '30 คนจาก 50 คน คิดเป็นกี่เปอร์เซ็นต์?', opts: ['60%', '30%', '50%', '80%'], ans: 0, hint: '30÷50×100 = 60%' },
      },
    },
    {
      id: 'increase-percent',
      say: 'เพิ่ม 20%: ราคาเดิม 500 บาท เพิ่ม 20% = 500×20÷100=100 บาท ราคาใหม่ = 600 บาท',
      visual: { component: 'PercentBar', config: { initialPercent: 20, total: 500, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ราคาเดิม 200 บาท เพิ่ม 10% ราคาใหม่เท่าไร?', opts: ['220 บาท', '210 บาท', '180 บาท', '200 บาท'], ans: 0, hint: 'เพิ่ม 200×10÷100=20 ราคาใหม่ 200+20=220' },
      },
    },
    {
      id: 'decrease-percent',
      say: 'ลด 15%: ราคาเดิม 200 บาท ลด 15% = 200×15÷100=30 บาท ราคาใหม่ = 170 บาท',
      visual: { component: 'PercentBar', config: { initialPercent: 15, total: 200, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ราคาเดิม 300 บาท ลด 10% ราคาใหม่เท่าไร?', opts: ['270 บาท', '290 บาท', '310 บาท', '30 บาท'], ans: 0, hint: 'ลด 300×10÷100=30 ราคาใหม่ 300−30=270' },
      },
    },
    {
      id: 'percent-quiz',
      say: 'ลองคำนวณลดราคาดูก่อนไปต่อ',
      visual: { component: 'PercentBar', config: { initialPercent: 25, total: 400, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เสื้อราคา 400 บาท ลด 25% ราคาขาย = ?', opts: ['300 บาท', '100 บาท', '350 บาท', '320 บาท'], ans: 0, hint: 'ลด 400×25÷100=100 บาท ราคาขาย 400−100=300' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 % = ส่วนของ 100 · หา % ของจำนวน: %÷100 × จำนวน · ส่วนลด = ราคา × %',
      visual: { component: 'PercentBar', config: { initialPercent: 50, total: 200, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '10% ของ 200 = ___', ans: '20', hint: '10/100 × 200' },
    { type: 'mc', q: 'ของ 800 บาท ลด 25% ลดกี่บาท?', opts: ['200', '250', '25', '400'], ans: 0, hint: '25/100 × 800' },
    { type: 'fill', q: 'นักเรียน 40 คน มาเรียน 90% มา ___ คน', ans: '36', hint: '90/100 × 40' },
    { type: 'fill', q: '50% ของ 60 = ___', ans: '30', hint: 'ครึ่งหนึ่ง' },
    { type: 'mc', q: '20% ของ 500 = ?', opts: ['100', '20', '50', '250'], ans: 0, hint: '20/100 × 500' },
    { type: 'fill', q: '25% ของ 80 = ___', ans: '20', hint: 'หนึ่งในสี่ของ 80' },
    { type: 'mc', q: 'เสื้อ 1000 ลด 30% จ่ายจริงเท่าไร?', opts: ['700', '300', '970', '670'], ans: 0, hint: 'ลด 300 จ่าย 1000−300' },
    { type: 'slider', q: '10% ของ 100 = ?', min: 0, max: 50, step: 1, ans: 10, unit: '', hint: '10/100 × 100' },
    { type: 'fill', q: 'ราคาเดิม 600 บาท เพิ่ม 10% ราคาใหม่ = ___', ans: '660', hint: '600×10÷100=60 ราคาใหม่ 600+60=660' },
    { type: 'mc', q: 'ราคาเดิม 250 บาท ลด 20% ราคาขาย = ?', opts: ['200 บาท', '50 บาท', '230 บาท', '150 บาท'], ans: 0, hint: 'ลด 250×20÷100=50 ราคาขาย 250−50=200' },
  ],
}

export default percent
