import type { ChapterV2 } from '@/types/curriculum'

const angles: ChapterV2 = {
  version: 2,
  id: 'math-5-angles',
  subject: 'math',
  grade: 5,
  chapter: 2,
  title: 'มุม',
  icon: '📐',
  slug: 'angles',
  scenes: [
    {
      id: 'intro',
      say: 'มุมเกิดจากเส้น 2 เส้นมาเจอกัน วัดเป็นองศา (°) — ลากแขนสีน้ำเงินดูสิมุมเปลี่ยนยังไง',
      visual: { component: 'AngleDrag', config: { initialAngle: 45 } },
    },
    {
      id: 'right',
      say: 'มุมฉาก = 90° เป๊ะ เหมือนมุมห้อง มุมหนังสือ — ดูเครื่องหมายมุมฉากตรงมุม',
      visual: { component: 'AngleDrag', config: { initialAngle: 90, readOnly: true } },
    },
    {
      id: 'acute-obtuse',
      say: 'มุมแหลม < 90° (เล็กกว่ามุมฉาก) · มุมป้าน > 90° (กว้างกว่า) — ลองลากให้เป็นมุมป้านดู',
      visual: { component: 'AngleDrag', config: { initialAngle: 60 } },
    },
    {
      id: 'straight',
      say: 'ถ้ากางจนสุด 180° จะกลายเป็นเส้นตรง เรียกว่ามุมตรง',
      visual: { component: 'AngleDrag', config: { initialAngle: 180, readOnly: true } },
    },
    {
      id: 'quiz',
      say: 'ลองดู! มุมขนาด 60° เป็นมุมประเภทไหน?',
      visual: { component: 'AngleDrag', config: { initialAngle: 60, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุม 60° เป็นมุมประเภทใด?', opts: ['มุมแหลม', 'มุมฉาก', 'มุมป้าน', 'มุมตรง'], ans: 0, hint: 'น้อยกว่า 90° = แหลม' },
      },
    },
    {
      id: 'angles-360',
      say: 'มุมรอบจุดรวมกันได้ 360° เสมอ เหมือนหมุนครบรอบนาฬิกา ไม่ว่าจะแบ่งกี่ชิ้นก็รวมได้ 360°',
    },
    {
      id: 'angles-180',
      say: 'ถ้ามุม 2 มุมอยู่บนเส้นตรงเดียวกัน รวมกันได้ 180° เสมอ เช่น มุม 60° + มุม 120° = 180°',
      visual: { component: 'AngleDrag', config: { initialAngle: 180, readOnly: true } },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 แหลม < 90° · ฉาก = 90° · ป้าน > 90° (ไม่ถึง 180°) · ตรง = 180° · รอบจุด = 360°',
      visual: { component: 'AngleDrag', config: { initialAngle: 90, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'มุม 90° เรียกว่ามุมอะไร?', opts: ['มุมแหลม', 'มุมฉาก', 'มุมป้าน', 'มุมตรง'], ans: 1, hint: 'มุมห้อง มุมหนังสือ' },
    { type: 'mc', q: 'มุม 60° เป็นมุมประเภทใด?', opts: ['มุมแหลม', 'มุมฉาก', 'มุมป้าน', 'มุมตรง'], ans: 0, hint: 'น้อยกว่า 90 = แหลม' },
    { type: 'fill', q: 'มุมตรงมีขนาดกี่องศา? ___', ans: '180', hint: 'เส้นตรง = ครึ่งวงกลม' },
    { type: 'mc', q: 'มุม 120° เป็นมุมประเภทใด?', opts: ['มุมแหลม', 'มุมฉาก', 'มุมป้าน', 'มุมตรง'], ans: 2, hint: 'มากกว่า 90 แต่น้อยกว่า 180' },
    { type: 'fill', q: 'มุมรอบจุดมีขนาดรวมกันกี่องศา? ___', ans: '360', hint: 'หมุนครบรอบ = 360°' },
    { type: 'mc', q: 'มุมบนเส้นตรง 2 มุมรวมกันได้กี่องศา?', opts: ['90°', '180°', '270°', '360°'], ans: 1, hint: 'เส้นตรง = 180°' },
    { type: 'mc', q: 'เข็มนาฬิกาบอก 3 โมงตรง เข็มสองเข็มทำมุมกี่องศา?', opts: ['45°', '90°', '180°', '60°'], ans: 1, hint: 'เข็มชี้ 12 กับ 3 = มุมฉาก' },
    { type: 'fill', q: 'มุมบนเส้นตรง = 180° ถ้ามุมหนึ่งเป็น 70° มุมที่สองเป็น ___ องศา', ans: '110', hint: '180 - 70 = 110' },
    { type: 'mc', q: 'มุม 89° เป็นมุมประเภทใด?', opts: ['มุมแหลม', 'มุมฉาก', 'มุมป้าน', 'มุมตรง'], ans: 0, hint: 'ยังไม่ถึง 90' },
    { type: 'slider', q: 'มุมรอบจุดมีขนาดกี่องศา? ลากเลือก', min: 0, max: 360, step: 10, ans: 360, unit: '°', hint: 'หมุนครบรอบ' },
  ],
}

export default angles
