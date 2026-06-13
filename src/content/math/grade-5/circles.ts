import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 12 รูปวงกลม (ref: p5-c12) — รัศมี, เส้นผ่านศูนย์กลาง d = 2r
const circles: ChapterV2 = {
  version: 2,
  id: 'math-5-circles',
  subject: 'math',
  grade: 5,
  chapter: 12,
  title: 'รูปวงกลม',
  icon: '⭕',
  slug: 'circles',
  scenes: [
    {
      id: 'intro',
      say: 'วงกลมมีจุดศูนย์กลาง "รัศมี" (เส้นแดง) = ระยะจากกลางถึงขอบ ลองปรับรัศมีดู',
      visual: { component: 'CircleRadius', config: { initialR: 3 } },
      goal: { type: 'reach-value', key: 'r', value: 5 },
      hint: 'กดปุ่ม + ปรับรัศมีให้เป็น 5 — สังเกตเส้นผ่านศูนย์กลางเปลี่ยนตาม',
    },
    {
      id: 'diameter',
      say: 'เส้นสีน้ำเงินพาดผ่านจุดกลาง = "เส้นผ่านศูนย์กลาง" ยาวเป็น 2 เท่าของรัศมีเสมอ (d = 2r)',
      visual: { component: 'CircleRadius', config: { initialR: 5, readOnly: true } },
    },
    {
      id: 'quiz',
      say: 'ลองคิด! ถ้ารัศมี 5 ซม. เส้นผ่านศูนย์กลางยาวเท่าไร?',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'รัศมี 5 ซม. เส้นผ่านศูนย์กลาง = ?', opts: ['10 ซม.', '5 ซม.', '2.5 ซม.', '25 ซม.'], ans: 0, hint: 'd = 2 × r = 2 × 5' },
      },
    },
    {
      id: 'reverse',
      say: 'กลับกัน! ถ้ารู้เส้นผ่านศูนย์กลาง หารครึ่งได้รัศมี — d 12 → รัศมี 6',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เส้นผ่านศูนย์กลาง 12 ซม. รัศมีเท่าไร?', opts: ['6', '12', '24', '3'], ans: 0, hint: 'รัศมี = ครึ่งของ d = 12 ÷ 2' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 รัศมี = กลางถึงขอบ · เส้นผ่านศูนย์กลาง d = 2 × รัศมี · พาดผ่านจุดกลางพอดี',
      visual: { component: 'CircleRadius', config: { initialR: 4, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'รัศมี 5 ซม. เส้นผ่านศูนย์กลาง = ___ ซม.', ans: '10', hint: 'd = 2 × r' },
    { type: 'mc', q: 'เส้นผ่านศูนย์กลาง 12 ซม. รัศมีเท่าไร?', opts: ['6', '12', '24', '3'], ans: 0, hint: 'รัศมี = ครึ่งของ d' },
    { type: 'fill', q: 'ระยะจากจุดศูนย์กลางถึงขอบวงกลมเรียกว่า ___', ans: 'รัศมี', hint: 'r = radius' },
    { type: 'fill', q: 'รัศมี 8 ซม. เส้นผ่านศูนย์กลาง = ___', ans: '16', hint: '2 × 8' },
    { type: 'mc', q: 'เส้นผ่านศูนย์กลาง 20 รัศมีเท่าไร?', opts: ['10', '20', '40', '5'], ans: 0, hint: '20 ÷ 2' },
    { type: 'fill', q: 'รัศมี 3 ซม. เส้นผ่านศูนย์กลาง = ___', ans: '6', hint: '2 × 3' },
    { type: 'mc', q: 'เส้นที่พาดผ่านจุดศูนย์กลางเรียกว่า?', opts: ['เส้นผ่านศูนย์กลาง', 'รัศมี', 'เส้นรอบวง', 'ด้าน'], ans: 0, hint: 'd ผ่านจุดกลาง' },
    { type: 'fill', q: 'เส้นผ่านศูนย์กลาง 14 รัศมี = ___', ans: '7', hint: '14 ÷ 2' },
    { type: 'slider', q: 'รัศมี 6 ซม. เส้นผ่านศูนย์กลางเท่าไร?', min: 0, max: 20, step: 1, ans: 12, unit: 'ซม.', hint: '2 × 6' },
    { type: 'mc', q: 'เส้นผ่านศูนย์กลางยาวเป็นกี่เท่าของรัศมี?', opts: ['2 เท่า', '3 เท่า', 'ครึ่งหนึ่ง', 'เท่ากัน'], ans: 0, hint: 'd = 2r' },
  ],
}

export default circles
