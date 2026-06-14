import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 10 รูปสี่เหลี่ยม (ref: p5-c10) — ชนิดสี่เหลี่ยม + เส้นรอบรูป
const quadrilaterals: ChapterV2 = {
  version: 2,
  id: 'math-5-quadrilaterals',
  subject: 'math',
  grade: 5,
  chapter: 10,
  title: 'รูปสี่เหลี่ยม',
  icon: '🔷',
  slug: 'quadrilaterals-5',
  scenes: [
    {
      id: 'intro',
      say: 'สี่เหลี่ยมมีหลายชนิด ขึ้นกับด้านและมุม ลองกดเปลี่ยนชนิดดูว่าต่างกันยังไง',
      visual: { component: 'QuadMorph', config: { shape: 'square' } },
      goal: { type: 'reach-value', key: 'shape', value: 'rhombus' },
      hint: 'กดดูให้ครบทุกชนิดจนถึง "ขนมเปียกปูน" — สังเกตด้านกับมุม',
    },
    {
      id: 'square-rect',
      say: 'จัตุรัส = 4 ด้านเท่า 4 มุมฉาก · ผืนผ้า = ด้านตรงข้ามเท่ากัน 4 มุมฉาก',
      visual: { component: 'QuadMorph', config: { shape: 'rectangle', readOnly: true } },
    },
    {
      id: 'rhombus',
      say: 'ขนมเปียกปูน = 4 ด้านเท่ากันเหมือนจัตุรัส แต่เอียง มุมไม่เป็นมุมฉาก',
      visual: { component: 'QuadMorph', config: { shape: 'rhombus', readOnly: true } },
    },
    {
      id: 'perimeter',
      say: 'เส้นรอบรูป = รวมความยาวทุกด้าน จัตุรัสด้าน 6 = 6+6+6+6 = 6×4',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'จัตุรัสด้านยาว 6 ซม. เส้นรอบรูป?', opts: ['24 ซม.', '12 ซม.', '36 ซม.', '18 ซม.'], ans: 0, hint: '4 ด้านเท่ากัน 6×4' },
      },
    },
    {
      id: 'parallelogram-props',
      say: 'สี่เหลี่ยมด้านขนาน: ด้านตรงข้ามยาวเท่ากัน มุมตรงข้ามเท่ากัน ลองจับสังเกตดู',
      visual: { component: 'QuadMorph', config: { shape: 'parallelogram', readOnly: true } },
    },
    {
      id: 'quad-family',
      say: 'จัตุรัสเป็นสี่เหลี่ยมผืนผ้าชนิดพิเศษ (ด้านเท่าทุกด้าน) และผืนผ้าเป็นด้านขนานชนิดพิเศษ (มุมฉาก)',
      visual: { component: 'QuadMorph', config: { shape: 'square', readOnly: true } },
    },
    {
      id: 'quad-quiz',
      say: 'ทดสอบความเข้าใจ!',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'รูปสี่เหลี่ยมที่มีด้านเท่ากันทุกด้านและมุมฉากทุกมุมคือ?', opts: ['สี่เหลี่ยมด้านขนาน', 'สี่เหลี่ยมผืนผ้า', 'จัตุรัส', 'สี่เหลี่ยมคางหมู'], ans: 2, hint: 'ด้านเท่า + มุมฉาก = จัตุรัส' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 จัตุรัส=4ด้านเท่า+มุมฉาก · ผืนผ้า=ด้านตรงข้ามเท่า · ขนมเปียกปูน=4ด้านเท่าแต่เอียง · เส้นรอบรูป=รวมทุกด้าน',
      visual: { component: 'QuadMorph', config: { shape: 'parallelogram', readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'จัตุรัสด้านยาว 6 ซม. เส้นรอบรูป = ___ ซม.', ans: '24', hint: '4 ด้านเท่ากัน 6×4' },
    { type: 'mc', q: 'รูปใดมี 4 ด้านเท่ากันแต่ไม่มีมุมฉาก?', opts: ['ผืนผ้า', 'จัตุรัส', 'ขนมเปียกปูน', 'คางหมู'], ans: 2, hint: 'rhombus เอียง' },
    { type: 'fill', q: 'ผืนผ้ากว้าง 5 ยาว 8 เส้นรอบรูป = ___ ซม.', ans: '26', hint: '(5+8)×2' },
    { type: 'mc', q: 'จัตุรัสมีมุมฉากกี่มุม?', opts: ['2', '3', '4', '0'], ans: 2, hint: 'ทุกมุมเป็นมุมฉาก' },
    { type: 'fill', q: 'จัตุรัสด้าน 10 เส้นรอบรูป = ___', ans: '40', hint: '10×4' },
    { type: 'mc', q: 'สี่เหลี่ยมด้านขนานมีลักษณะใด?', opts: ['ด้านตรงข้ามขนานกัน', 'ทุกมุมฉาก', '3 ด้าน', 'ไม่มีด้านขนาน'], ans: 0, hint: 'ชื่อบอกว่าด้านขนาน' },
    { type: 'fill', q: 'ผืนผ้ากว้าง 3 ยาว 7 เส้นรอบรูป = ___', ans: '20', hint: '(3+7)×2' },
    { type: 'mc', q: 'จัตุรัสกับผืนผ้าต่างกันที่?', opts: ['จัตุรัสด้านเท่ากันหมด', 'จำนวนมุม', 'จำนวนด้าน', 'สี'], ans: 0, hint: 'จัตุรัส 4 ด้านเท่า ผืนผ้าด้านตรงข้ามเท่า' },
    { type: 'slider', q: 'จัตุรัสด้าน 5 เส้นรอบรูป?', min: 0, max: 30, step: 1, ans: 20, unit: 'ซม.', hint: '5×4' },
    { type: 'fill', q: 'สี่เหลี่ยมทุกชนิดมีกี่ด้าน?', ans: '4', hint: 'สี่เหลี่ยม = 4 ด้าน' },
  ],
}

export default quadrilaterals
