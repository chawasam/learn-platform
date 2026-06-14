import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 11 รูปสามเหลี่ยม (ref: p5-c11) — มุมรวม 180° + พื้นที่ ½×ฐาน×สูง
const triangles: ChapterV2 = {
  version: 2,
  id: 'math-5-triangles',
  subject: 'math',
  grade: 5,
  chapter: 11,
  title: 'รูปสามเหลี่ยม',
  icon: '🔺',
  slug: 'triangles',
  scenes: [
    {
      id: 'intro',
      say: 'สามเหลี่ยมมี 3 ด้าน 3 มุม น่าทึ่งคือ 3 มุมรวมกันได้ 180° เสมอ ไม่ว่ารูปไหน',
      visual: { component: 'TriangleAngles', config: { a: 50, b: 60, c: 70 } },
      goal: { type: 'reach-value', key: 'combined', value: 1 },
      hint: 'กด "✂️ รวม 3 มุม" — มุมทั้งสามจะมาต่อกันเป็นเส้นตรง = 180°',
    },
    {
      id: 'sum180',
      say: 'เห็นไหม! 50 + 60 + 70 = 180° พอดี ต่อกันเป็นเส้นตรง (มุมตรง = 180°)',
      visual: { component: 'TriangleAngles', config: { a: 50, b: 60, c: 70, combined: true, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '3 มุมในสามเหลี่ยมรวมกันได้เท่าไรเสมอ?', opts: ['180°', '90°', '270°', '360°'], ans: 0, hint: 'กฎตายตัว: ทุกสามเหลี่ยม 3 มุมรวม = 180°' },
      },
    },
    {
      id: 'find-angle',
      say: 'ใช้กฎนี้หามุมที่ขาดได้! รู้ 2 มุม เอา 180 ลบออก จะได้มุมที่ 3',
      visual: { component: 'TriangleAngles', config: { a: 60, b: 70, c: 50, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สามเหลี่ยมมีมุม 60° กับ 70° มุมที่ 3 = ?', opts: ['50°', '60°', '130°', '180°'], ans: 0, hint: '180 − 60 − 70 = 50' },
      },
    },
    {
      id: 'area',
      say: 'พื้นที่สามเหลี่ยม = ครึ่งหนึ่งของฐาน × สูง (½ × ฐาน × สูง)',
      visual: { component: 'TriangleAngles', config: { a: 50, b: 60, c: 70, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สามเหลี่ยมฐาน 8 สูง 5 พื้นที่?', opts: ['20', '40', '13', '80'], ans: 0, hint: '½ × 8 × 5 = 20' },
      },
    },
    {
      id: 'triangle-by-sides',
      say: 'แบ่งตามด้าน: สามเหลี่ยมด้านเท่า (3 ด้านเท่า), หน้าจั่ว (2 ด้านเท่า), ด้านไม่เท่า (3 ด้านไม่เท่ากัน)',
      visual: { component: 'TriangleAngles', config: { a: 60, b: 60, c: 60, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สามเหลี่ยมหน้าจั่วมีด้านยาวเท่ากันกี่ด้าน?', opts: ['2 ด้าน', '3 ด้าน', '1 ด้าน', '0 ด้าน'], ans: 0, hint: 'หน้าจั่ว = 2 ด้านเท่า, ด้านเท่า = 3 ด้านเท่า' },
      },
    },
    {
      id: 'triangle-area',
      say: 'พื้นที่สามเหลี่ยม = ½ × ฐาน × สูง — ตัดสามเหลี่ยมออกจากสี่เหลี่ยมผืนผ้าได้ครึ่งหนึ่งพอดี',
      visual: { component: 'TriangleAngles', config: { a: 50, b: 60, c: 70, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สูตรพื้นที่สามเหลี่ยมคือ?', opts: ['½ × ฐาน × สูง', 'ฐาน × สูง', '2 × ฐาน × สูง', 'ฐาน + สูง'], ans: 0, hint: 'ครึ่งหนึ่งของพื้นที่สี่เหลี่ยมที่ครอบ' },
      },
    },
    {
      id: 'triangle-area-calc',
      say: 'ลองคำนวณพื้นที่สามเหลี่ยม!',
      visual: { component: 'TriangleAngles', config: { a: 60, b: 80, c: 40, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สามเหลี่ยมฐาน 6 ซม. สูง 4 ซม. พื้นที่ = ?', opts: ['12 ซม.²', '24 ซม.²', '10 ซม.²', '8 ซม.²'], ans: 0, hint: '½ × 6 × 4 = 12 ซม.²' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 3 มุมรวม 180° เสมอ · หามุมขาด = 180 − สองมุม · พื้นที่ = ½ × ฐาน × สูง',
      visual: { component: 'TriangleAngles', config: { a: 60, b: 60, c: 60, combined: true, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'สามเหลี่ยมมีมุม 60° กับ 70° มุมที่ 3 = ___ องศา', ans: '50', hint: '180 − 60 − 70' },
    { type: 'mc', q: 'มุมภายในสามเหลี่ยมรวมกันได้กี่องศา?', opts: ['90', '180', '270', '360'], ans: 1, hint: 'กฎตายตัว' },
    { type: 'fill', q: 'สามเหลี่ยมฐาน 8 สูง 5 พื้นที่ = ___ ตร.หน่วย', ans: '20', hint: '½ × 8 × 5' },
    { type: 'fill', q: 'สามเหลี่ยมมีมุม 90° กับ 45° มุมที่ 3 = ___', ans: '45', hint: '180 − 90 − 45' },
    { type: 'mc', q: 'สามเหลี่ยมด้านเท่า แต่ละมุมกี่องศา?', opts: ['60', '90', '45', '120'], ans: 0, hint: '180 ÷ 3' },
    { type: 'fill', q: 'สามเหลี่ยมฐาน 10 สูง 6 พื้นที่ = ___', ans: '30', hint: '½ × 10 × 6' },
    { type: 'mc', q: 'สามเหลี่ยมมีกี่ด้าน?', opts: ['2', '3', '4', '5'], ans: 1, hint: 'tri = สาม' },
    { type: 'fill', q: 'สามเหลี่ยมมุม 100° กับ 40° มุมที่ 3 = ___', ans: '40', hint: '180 − 100 − 40' },
    { type: 'slider', q: 'สามเหลี่ยมฐาน 12 สูง 5 พื้นที่?', min: 0, max: 60, step: 1, ans: 30, unit: '', hint: '½ × 12 × 5' },
    { type: 'fill', q: 'สามเหลี่ยมมุม 90° 60° มุมที่ 3 = ___', ans: '30', hint: '180 − 90 − 60' },
  ],
}

export default triangles
