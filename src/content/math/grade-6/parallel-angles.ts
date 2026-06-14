import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 6 เส้นขนานและมุม (ref: p6-c06) — มุมแย้งเท่ากัน, มุมภายในข้างเดียวกันรวม 180°
// ใช้ TransversalAngles (เส้นขนาน + เส้นตัดจริง) แทน AngleDrag มุมเดียว
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
      say: 'เมื่อเส้นตรงตัดผ่านเส้นขนาน เกิดมุมหลายมุมที่สัมพันธ์กัน ลองกด "มุมแย้ง" กับ "มุมภายในข้างเดียวกัน" แล้วปรับมุมเล่นดู',
      visual: { component: 'TransversalAngles', config: { initialAngle: 60 } },
      goal: { type: 'reach-value', key: 'explored', value: 1 },
      hint: 'กดปุ่ม "มุมแย้ง" หรือ "มุมภายในข้างเดียวกัน" — มุมที่สัมพันธ์กันจะสว่างขึ้น',
    },
    {
      id: 'alt',
      say: 'มุมแย้ง = คู่มุมที่อยู่คนละฝั่งของเส้นตัด สลับบน-ล่าง (เป็นรูปตัว Z) จะเท่ากันเสมอ ไม่ว่าเอียงกี่องศา',
      visual: { component: 'TransversalAngles', config: { initialAngle: 60, mode: 'alt', readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุมหนึ่ง 60° มุมแย้งเท่ากับ?', opts: ['60°', '120°', '90°', '30°'], ans: 0, hint: 'มุมแย้งเท่ากันเสมอ' },
      },
    },
    {
      id: 'co-interior',
      say: 'มุมภายในข้างเดียวกัน = คู่มุมฝั่งเดียวกันของเส้นตัด (รูปตัว C) รวมกันได้ 180° เสมอ',
      visual: { component: 'TransversalAngles', config: { initialAngle: 70, mode: 'co', readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุมหนึ่ง 70° มุมภายในข้างเดียวกัน (รวม 180) = ?', opts: ['110°', '70°', '90°', '20°'], ans: 0, hint: '180 − 70 = 110' },
      },
    },
    {
      id: 'angle-types-review',
      say: 'มุมแย้ง (Alternate) อยู่คนละฝั่งเส้นตัด ตัว Z ขนาดเท่ากัน เพราะเส้นสองเส้นขนานกันสนิท',
      visual: { component: 'TransversalAngles', config: { initialAngle: 60, mode: 'alt', readOnly: true } },
    },
    {
      id: 'alternate-angles',
      say: 'ลองกด "มุมแย้ง" ดู มุมสีเดียวกัน = ขนาดเท่ากัน เพราะเส้นขนาน',
      visual: { component: 'TransversalAngles', config: { initialAngle: 55, mode: 'alt', readOnly: true } },
    },
    {
      id: 'co-interior-detail',
      say: 'มุมภายในข้างเดียวกัน (Co-interior) ตัว C รวมกัน = 180° เสมอ ไม่ว่ามุมจะเป็นเท่าไร',
      visual: { component: 'TransversalAngles', config: { initialAngle: 80, mode: 'co', readOnly: true } },
    },
    {
      id: 'angles-quiz',
      say: 'ทดสอบ: มุมแย้งเท่ากันเสมอเพราะเส้นขนาน ลองคิดดู',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เส้นขนาน มุมแย้ง α=65° มุม β (มุมแย้งกับ α) = ?', opts: ['65°', '115°', '90°', '75°'], ans: 0, hint: 'มุมแย้ง = เท่ากัน → 65°' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 มุมแย้ง (ตัว Z) = เท่ากัน · มุมภายในข้างเดียวกัน (ตัว C) = รวม 180° · รู้มุมเดียวหามุมอื่นได้หมด',
      visual: { component: 'TransversalAngles', config: { initialAngle: 60, mode: 'alt', readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'มุมหนึ่ง 60° มุมแย้งของมันเท่ากับ ___ องศา', ans: '60', hint: 'มุมแย้งเท่ากันเสมอ' },
    { type: 'mc', q: 'มุมภายในข้างเดียวกันบนเส้นขนานรวมกันได้?', opts: ['90°', '180°', '360°', '60°'], ans: 1, hint: 'รวมเป็น 180°' },
    { type: 'fill', q: 'มุมหนึ่ง 70° มุมภายในข้างเดียวกัน (รวม 180) = ___ องศา', ans: '110', hint: '180 − 70' },
    { type: 'fill', q: 'มุมหนึ่ง 45° มุมแย้ง = ___ องศา', ans: '45', hint: 'มุมแย้งเท่ากัน' },
    { type: 'mc', q: 'มุมแย้งมีความสัมพันธ์อย่างไร?', opts: ['เท่ากัน', 'รวม 180', 'รวม 90', 'ต่างกัน'], ans: 0, hint: 'มุมแย้งเท่ากันเสมอ' },
    { type: 'fill', q: 'มุมหนึ่ง 130° มุมภายในข้างเดียวกัน (รวม 180) = ___ องศา', ans: '50', hint: '180 − 130' },
    { type: 'mc', q: 'มุม 90° มุมภายในข้างเดียวกันเท่าไร?', opts: ['90°', '180°', '45°', '270°'], ans: 0, hint: '180 − 90 = 90' },
    { type: 'fill', q: 'มุมหนึ่ง 100° มุมแย้ง = ___ องศา', ans: '100', hint: 'มุมแย้งเท่ากัน' },
    { type: 'mc', q: 'เมื่อเส้นตัดเส้นขนาน มุมแย้งจะ...?', opts: ['เท่ากัน', 'ต่างกัน', 'รวม 90', 'หายไป'], ans: 0, hint: 'สมบัติมุมบนเส้นขนาน' },
    { type: 'fill', q: 'มุมหนึ่ง 65° มุมภายในข้างเดียวกัน (รวม 180) = ___ องศา', ans: '115', hint: '180 − 65' },
    { type: 'mc', q: 'มุมแย้ง α=65° มุม β = ?', opts: ['65°', '115°', '90°', '75°'], ans: 0, hint: 'มุมแย้งเท่ากัน → 65°' },
    { type: 'fill', q: 'มุมภายในข้างเดียวกัน มุมหนึ่ง 55° อีกมุม = ___ องศา', ans: '125', hint: '180 − 55 = 125' },
    { type: 'mc', q: 'มุมภายในข้างเดียวกัน (Co-interior) รวมกันได้กี่องศา?', opts: ['90°', '180°', '270°', '360°'], ans: 1, hint: 'ตัว C รวม 180° เสมอ' },
  ],
}

export default parallelAngles
