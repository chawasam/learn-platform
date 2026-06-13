import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 6 เส้นขนานและมุม (ref: p6-c06) — มุมแย้งเท่ากัน, มุมประชิดรวม 180°
const parallelAngles: ChapterV2 = {
  version: 2,
  id: 'math-6-parallel-angles',
  subject: 'math',
  grade: 6,
  chapter: 6,
  title: 'เส้นขนานและมุม',
  icon: '🛤️',
  slug: 'parallel-angles',
  scenes: [
    {
      id: 'intro',
      say: 'เมื่อเส้นตรงตัดเส้นขนาน เกิดมุมหลายมุมที่สัมพันธ์กัน เริ่มจากดูมุมหนึ่ง 60°',
      visual: { component: 'AngleDrag', config: { initialAngle: 60, readOnly: true } },
    },
    {
      id: 'corresponding',
      say: '"มุมแย้ง" (มุมฝั่งตรงข้ามของจุดตัด) จะเท่ากันเสมอ — มุมหนึ่ง 60° มุมแย้งก็ 60°',
      visual: { component: 'AngleDrag', config: { initialAngle: 60, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุมหนึ่ง 60° มุมแย้งเท่ากับ?', opts: ['60°', '120°', '90°', '30°'], ans: 0, hint: 'มุมแย้งเท่ากันเสมอ' },
      },
    },
    {
      id: 'co-interior',
      say: 'มุมประชิด (อยู่ติดกันบนเส้นเดียว) รวมกันได้ 180° เสมอ — รู้มุมหนึ่ง หาอีกมุมได้',
      visual: { component: 'AngleDrag', config: { initialAngle: 120, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุมหนึ่ง 70° มุมประชิด (รวม 180) = ?', opts: ['110°', '70°', '90°', '20°'], ans: 0, hint: '180 − 70 = 110' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 มุมแย้ง = เท่ากัน · มุมประชิด = รวม 180° · รู้มุมเดียวหามุมอื่นได้หมด',
      visual: { component: 'AngleDrag', config: { initialAngle: 60, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'มุมหนึ่ง 60° มุมแย้งของมันเท่ากับ ___ องศา', ans: '60', hint: 'มุมแย้งเท่ากันเสมอ' },
    { type: 'mc', q: 'มุมภายในข้างเดียวกันบนเส้นขนานรวมกันได้?', opts: ['90°', '180°', '360°', '60°'], ans: 1, hint: 'เป็นมุมประชิดกัน' },
    { type: 'fill', q: 'มุมหนึ่ง 70° มุมประชิด (รวม 180) = ___ องศา', ans: '110', hint: '180 − 70' },
    { type: 'fill', q: 'มุมหนึ่ง 45° มุมแย้ง = ___ องศา', ans: '45', hint: 'มุมแย้งเท่ากัน' },
    { type: 'mc', q: 'มุมแย้งมีความสัมพันธ์อย่างไร?', opts: ['เท่ากัน', 'รวม 180', 'รวม 90', 'ต่างกัน'], ans: 0, hint: 'มุมแย้งเท่ากันเสมอ' },
    { type: 'fill', q: 'มุมประชิดของ 130° = ___ องศา', ans: '50', hint: '180 − 130' },
    { type: 'mc', q: 'มุม 90° มุมประชิดเท่าไร?', opts: ['90°', '180°', '45°', '270°'], ans: 0, hint: '180 − 90 = 90' },
    { type: 'fill', q: 'มุมหนึ่ง 100° มุมแย้ง = ___ องศา', ans: '100', hint: 'มุมแย้งเท่ากัน' },
    { type: 'mc', q: 'เมื่อเส้นตัดเส้นขนาน มุมแย้งจะ...?', opts: ['เท่ากัน', 'ต่างกัน', 'รวม 90', 'หายไป'], ans: 0, hint: 'สมบัติมุมบนเส้นขนาน' },
    { type: 'fill', q: 'มุมประชิดของ 65° = ___ องศา', ans: '115', hint: '180 − 65' },
  ],
}

export default parallelAngles
