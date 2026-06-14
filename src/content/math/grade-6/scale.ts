import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 8 ทิศและมาตราส่วน (ref: p6-c08)
const scale: ChapterV2 = {
  version: 2,
  id: 'math-6-scale',
  subject: 'math',
  grade: 6,
  chapter: 8,
  title: 'ทิศและมาตราส่วน',
  icon: '🧭',
  slug: 'scale-map',
  scenes: [
    {
      id: 'intro',
      say: 'ทิศหลัก 4 ทิศ: เหนือ ใต้ ออก ตก บนแผนที่ "ด้านบนคือทิศเหนือเสมอ"',
      visual: {
        component: 'TextVis',
        config: { sentence: 'แผนที่ ด้านบน = เหนือ · ด้านล่าง = ใต้ · ขวา = ออก · ซ้าย = ตก', words: [{ text: 'เหนือ', color: '#EF4444', bold: true }, { text: 'ใต้', color: '#3B82F6' }, { text: 'ออก', color: '#22C55E' }, { text: 'ตก', color: '#F59E0B' }] },
      },
    },
    {
      id: 'direction-quiz',
      say: 'ถูกต้อง! ทิศตรงข้ามกันเป็นคู่เสมอ เหนือ↔ใต้ ออก↔ตก ทิศตะวันออกจึงตรงข้ามกับตะวันตก',
      visual: {
        component: 'TextVis',
        config: { sentence: 'เหนือ ↔ ใต้ · ออก (ตะวันออก) ↔ ตก (ตะวันตก)', words: [{ text: 'เหนือ↔ใต้', color: '#EF4444', bold: true }, { text: 'ออก↔ตก', color: '#22C55E', bold: true }] },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ทิศตรงข้ามกับทิศตะวันออกคือ?', opts: ['เหนือ', 'ใต้', 'ตะวันตก', 'ใต้เฉียงเหนือ'], ans: 2, hint: 'ออก ↔ ตก' },
      },
    },
    {
      id: 'scale',
      say: 'มาตราส่วนบอกว่าระยะในแผนที่ 1 ส่วน = ระยะจริงเท่าไร เช่น 1:100 หมายถึง 1 ซม. = 100 ซม.จริง',
      visual: {
        component: 'TextVis',
        config: { sentence: 'มาตราส่วน 1:1000 → 1 ซม.ในแผนที่ = 1000 ซม.ของจริง', words: [{ text: '1:1000', color: '#A855F7', bold: true }] },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มาตราส่วน 1:100 หมายถึงอะไร?', opts: ['1 ซม.ในแผนที่ = 100 ซม.จริง', '100 ซม.ในแผนที่ = 1 ซม.จริง', 'ย่อ 100 เท่า (ผิดทิศ)', 'รัศมี 100'], ans: 0, hint: '1 ส่วน = 100 ส่วนจริงเสมอ' },
      },
    },
    {
      id: 'scale-quiz',
      say: 'คำนวณระยะจริง: เอาที่วัดได้ × ตัวเลขมาตราส่วน',
      visual: {
        component: 'TextVis',
        config: { sentence: 'ระยะจริง = ที่วัดได้บนแผนที่ × ตัวเลขมาตราส่วน', words: [{ text: 'ระยะจริง', color: '#4F80FF', bold: true }, { text: '× มาตราส่วน', color: '#FF7A2F', bold: true }] },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มาตราส่วน 1:100 วัดได้ 5 ซม. ระยะจริง?', opts: ['500 ซม.', '105 ซม.', '5 ซม.', '50 ซม.'], ans: 0, hint: '5 × 100' },
      },
    },
    {
      id: 'read-scale',
      say: 'มาตราส่วน 1:1000 = 1 ซม.บนแผนที่ = 1000 ซม. = 10 ม. จริง',
      visual: {
        component: 'TextVis',
        config: { sentence: '1 ซม. (แผนที่) × 1000 = 1000 ซม. = 10 เมตร (จริง)', words: [{ text: '1:1000', color: '#A855F7', bold: true }, { text: '10 เมตร', color: '#22C55E', bold: true }] },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มาตราส่วน 1:1000 วัดได้ 2 ซม. ระยะจริงกี่เมตร?', opts: ['20 ม.', '10 ม.', '200 ม.', '2 ม.'], ans: 0, hint: '2×1000=2,000 ซม. = 20 ม.' },
      },
    },
    {
      id: 'calc-real-distance',
      say: 'วัดบนแผนที่ 3 ซม. มาตราส่วน 1:5000 → จริง = 3×5000 = 15,000 ซม. = 150 ม.',
      visual: {
        component: 'TextVis',
        config: { sentence: '3 ซม. × 5000 = 15,000 ซม. = 150 เมตร', words: [{ text: '3 ซม.', color: '#4F80FF', bold: true }, { text: '150 เมตร', color: '#22C55E', bold: true }] },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มาตราส่วน 1:5000 วัดได้ 3 ซม. ระยะจริงกี่เมตร?', opts: ['150 ม.', '15 ม.', '1,500 ม.', '5,000 ม.'], ans: 0, hint: '3×5000=15,000 ซม. = 150 ม.' },
      },
    },
    {
      id: 'scale-quiz-2',
      say: 'คำนวณ 4 ซม. × 2000 = 8,000 ซม. แล้วแปลงเป็นเมตร (÷100) จะได้กี่เมตร?',
      visual: {
        component: 'TextVis',
        config: { sentence: '4 ซม. × 2000 = 8,000 ซม. → แปลงเป็นเมตร = ?', words: [{ text: '4 ซม. × 2000', color: '#4F80FF', bold: true }, { text: '÷ 100 = ?', color: '#FF7A2F', bold: true }] },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'แผนที่ มาตราส่วน 1:2000 วัดได้ 4 ซม. ระยะจริง = ?', opts: ['80 ม.', '40 ม.', '8,000 ซม.', '200 ม.'], ans: 0, hint: '4×2000=8,000 ซม. = 80 ม.' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 แผนที่บน=เหนือ · ทิศตรงข้ามเป็นคู่ · มาตราส่วน 1:n → คูณ n ได้ระยะจริง',
      visual: {
        component: 'TextVis',
        config: { sentence: 'เหนือ ใต้ ออก ตก · มาตราส่วนคูณได้ระยะจริง', words: [{ text: 'เหนือ', color: '#EF4444' }, { text: 'มาตราส่วน', color: '#A855F7', bold: true }] },
      },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'บนแผนที่ ด้านบนคือทิศใด?', opts: ['ใต้', 'เหนือ', 'ตะวันออก', 'ตะวันตก'], ans: 1, hint: 'แผนที่บน = เหนือเสมอ' },
    { type: 'fill', q: 'มาตราส่วน 1:100 วัดได้ 5 ซม. ระยะจริง = ___ ซม.', ans: '500', hint: '5 × 100' },
    { type: 'mc', q: 'ทิศตรงข้ามกับทิศตะวันออกคือ?', opts: ['เหนือ', 'ใต้', 'ตะวันตก', 'ตะวันออกเฉียงเหนือ'], ans: 2, hint: 'ออก ↔ ตก' },
    { type: 'fill', q: 'มาตราส่วน 1:1000 วัด 3 ซม. ระยะจริง = ___ ซม.', ans: '3000', hint: '3 × 1000' },
    { type: 'fill', q: 'มาตราส่วน 1:50 วัด 4 ซม. ระยะจริง = ___ ซม.', ans: '200', hint: '4 × 50' },
    { type: 'mc', q: 'มาตราส่วน 1:200 หมายถึง?', opts: ['1 ซม.=200 ซม.จริง', '200 ซม.=1 ซม.', 'ย่อ 2 เท่า', 'ขยาย'], ans: 0, hint: '1 ส่วน = 200 ส่วนจริง' },
    { type: 'fill', q: 'มาตราส่วน 1:1000 วัด 2 ซม. = ___ เมตร (1 ม.=100 ซม.)', ans: '20', hint: '2×1000=2000 ซม. = 20 ม.' },
    { type: 'mc', q: 'มาตราส่วน 1:2000 วัดได้ 4 ซม. ระยะจริง = ?', opts: ['80 ม.', '40 ม.', '8,000 ซม.', '200 ม.'], ans: 0, hint: '4×2000=8,000 ซม. = 80 ม.' },
    { type: 'fill', q: 'มาตราส่วน 1:5000 วัด 3 ซม. ระยะจริง = ___ ม.', ans: '150', hint: '3×5000=15,000 ซม. = 150 ม.' },
    { type: 'mc', q: 'ระยะจริง 500 ม. = 50,000 ซม. มาตราส่วน 1:5000 ต้องวัดบนแผนที่ = ?', opts: ['10 ซม.', '5 ซม.', '100 ซม.', '1 ซม.'], ans: 0, hint: '50,000 ÷ 5000 = 10 ซม.' },
  ],
}

export default scale
