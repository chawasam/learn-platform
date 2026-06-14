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
      say: 'มุมเกิดจากเส้น 2 เส้นมาเจอกัน วัดเป็นองศา (°) — ลากแขนสีน้ำเงินให้ได้มุม 90° ดู',
      visual: { component: 'AngleDrag', config: { initialAngle: 45 } },
      goal: { type: 'reach-value', key: 'angle', value: 90 },
      hint: 'ลากแขนสีน้ำเงินขึ้นตั้งตรง จนแสดง 90°',
    },
    {
      id: 'right',
      say: 'มุมฉาก = 90° เป๊ะ เหมือนมุมห้อง มุมหนังสือ — ดูเครื่องหมายกล่องเล็กตรงมุม',
      visual: { component: 'AngleDrag', config: { initialAngle: 90, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุมห้อง มุมหนังสือ มุมกระดาน — มุมเหล่านี้เรียกว่ามุมอะไร?', opts: ['มุมฉาก', 'มุมแหลม', 'มุมป้าน', 'มุมตรง'], ans: 0, hint: 'มุมห้อง = 90° = มุมฉาก' },
      },
    },
    {
      id: 'acute-obtuse',
      say: 'มุมแหลม < 90° (เล็กกว่ามุมฉาก) · มุมป้าน > 90° (กว้างกว่า) — ลองลากให้ได้มุมป้าน 120°',
      visual: { component: 'AngleDrag', config: { initialAngle: 60 } },
      goal: { type: 'reach-value', key: 'angle', value: 120 },
      hint: 'ลากแขนไปทางซ้ายเลย 90° จนได้ 120°',
    },
    {
      id: 'straight',
      say: 'กางสุด 180° กลายเป็นเส้นตรง เรียกว่ามุมตรง — ครึ่งวงกลมพอดี',
      visual: { component: 'AngleDrag', config: { initialAngle: 180, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุม 180° ที่กลายเป็นเส้นตรงเรียกว่ามุมอะไร?', opts: ['มุมตรง', 'มุมฉาก', 'มุมแหลม', 'มุมป้าน'], ans: 0, hint: 'กางสุดจนเป็นเส้น = มุมตรง' },
      },
    },
    {
      id: 'quiz',
      say: 'มุม 60° < 90° → มุมแหลม · กฎ: น้อยกว่า 90° = แหลม · เท่ากับ 90° = ฉาก · มากกว่า 90° (ไม่ถึง 180°) = ป้าน',
      visual: { component: 'AngleDrag', config: { initialAngle: 60, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุม 60° เป็นมุมประเภทใด?', opts: ['มุมแหลม', 'มุมฉาก', 'มุมป้าน', 'มุมตรง'], ans: 0, hint: 'น้อยกว่า 90° = แหลม' },
      },
    },
    {
      id: 'angles-360',
      say: 'มุมรอบจุดรวมกันได้ 360° เสมอ เหมือนหมุนครบรอบนาฬิกา ไม่ว่าจะแบ่งกี่ชิ้นก็รวมได้ 360°',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เข็มนาฬิกาหมุนครบรอบหนึ่ง รวมกี่องศา?', opts: ['360°', '180°', '270°', '90°'], ans: 0, hint: 'หมุนครบรอบ = 360°' },
      },
    },
    {
      id: 'angles-180',
      say: 'ถ้ามุม 2 มุมอยู่บนเส้นตรงเดียวกัน รวมกันได้ 180° เสมอ เช่น มุม 60° + มุม 120° = 180°',
      visual: { component: 'AngleDrag', config: { initialAngle: 180, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'มุมหนึ่งบนเส้นตรงเป็น 60° มุมที่สองเป็นกี่องศา?', opts: ['120°', '180°', '240°', '90°'], ans: 0, hint: 'บนเส้นตรงรวม 180° → 180 − 60 = 120' },
      },
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
