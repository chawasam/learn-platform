import type { ChapterV2 } from '@/types/curriculum'

// ป.5 บท 13 ทรงสามมิติและปริมาตร (ref: p5-c13) — ปริมาตร = กว้าง × ยาว × สูง
const volume: ChapterV2 = {
  version: 2,
  id: 'math-5-volume',
  subject: 'math',
  grade: 5,
  chapter: 13,
  title: 'ทรงสามมิติและปริมาตร',
  icon: '📦',
  slug: 'volume',
  scenes: [
    {
      id: 'intro',
      say: 'ทรงสามมิติมีกว้าง ยาว สูง เช่น กล่อง ลองวางลูกบาศก์เป็นฐานชั้นล่างก่อน กว้าง 2 ยาว 3',
      visual: { component: 'CubeBuilder', config: { gridSize: 4 } },
      goal: { type: 'reach-value', key: 'volume', value: 6 },
      hint: 'แตะวางลูกบาศก์ให้ได้ 6 ก้อน = ฐานกว้าง 2 × ยาว 3',
    },
    {
      id: 'base',
      say: 'ชั้นล่างมี 2 × 3 = 6 ลูกบาศก์ นี่คือพื้นที่ฐาน ถ้าซ้อนหลายชั้นจะได้ปริมาตร',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, true, true, false], [true, true, true, false], [false, false, false, false], [false, false, false, false]] } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ฐานที่เห็นนี้ กว้าง 2 ยาว 3 มีลูกบาศก์กี่ก้อน?', opts: ['6', '5', '9', '4'], ans: 0, hint: '2 × 3 = 6 ก้อน' },
      },
    },
    {
      id: 'volume-formula',
      say: 'ปริมาตร = กว้าง × ยาว × สูง ถ้าฐาน 2×3 = 6 ซ้อนสูง 4 ชั้น → 6 × 4 = 24',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'กล่องกว้าง 2 ยาว 3 สูง 4 ปริมาตร?', opts: ['24', '9', '14', '12'], ans: 0, hint: '2 × 3 × 4' },
      },
    },
    {
      id: 'cube',
      say: 'ลูกบาศก์คือกล่องที่กว้าง ยาว สูง เท่ากันหมด ด้าน 3 → 3 × 3 × 3',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ลูกบาศก์ด้านยาว 3 ปริมาตร?', opts: ['27', '9', '18', '12'], ans: 0, hint: '3 × 3 × 3' },
      },
    },
    {
      id: 'volume-units',
      say: 'หน่วยปริมาตร: ลูกบาศก์เซนติเมตร (ลบ.ซม.) คือกล่องขนาด 1×1×1 ซม.',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]] } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ปริมาตรวัดเป็นหน่วยอะไร?', opts: ['ลูกบาศก์หน่วย (ลบ.ซม.)', 'ตารางหน่วย (ตร.ซม.)', 'เซนติเมตร (ซม.)', 'กิโลกรัม (กก.)'], ans: 0, hint: 'ปริมาตร = 3 มิติ = ลูกบาศก์หน่วย' },
      },
    },
    {
      id: 'volume-formula-visual',
      say: 'ปริมาตร V = กว้าง × ยาว × สูง เพราะแต่ละชั้น = ก×ย ลูกบาศก์ แล้วคูณด้วยสูง',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, true, false, false], [true, true, false, false], [false, false, false, false], [false, false, false, false]] } },
    },
    {
      id: 'volume-calc',
      say: 'ทดสอบสูตรปริมาตร!',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'กล่อง กว้าง 3 ยาว 4 สูง 5 ซม. ปริมาตร = ?', opts: ['60 ลบ.ซม.', '24 ลบ.ซม.', '35 ลบ.ซม.', '120 ลบ.ซม.'], ans: 0, hint: '3×4×5 = 60 ลบ.ซม.' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ปริมาตร = กว้าง × ยาว × สูง (ลูกบาศก์หน่วย) · บอกว่าใส่ของได้เท่าไร',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, true, true, false], [true, true, true, false], [false, false, false, false], [false, false, false, false]] } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'กล่องกว้าง 2 ยาว 3 สูง 4 ปริมาตร = ___ ลบ.หน่วย', ans: '24', hint: '2 × 3 × 4' },
    { type: 'mc', q: 'ลูกบาศก์ด้านยาว 3 ปริมาตรเท่าไร?', opts: ['9', '18', '27', '12'], ans: 2, hint: '3 × 3 × 3' },
    { type: 'fill', q: 'กล่องกว้าง 5 ยาว 5 สูง 2 ปริมาตร = ___ ลบ.หน่วย', ans: '50', hint: '5 × 5 × 2' },
    { type: 'fill', q: 'กล่องกว้าง 2 ยาว 2 สูง 2 ปริมาตร = ___', ans: '8', hint: '2 × 2 × 2' },
    { type: 'mc', q: 'กล่องกว้าง 4 ยาว 3 สูง 2 ปริมาตร?', opts: ['24', '9', '20', '12'], ans: 0, hint: '4 × 3 × 2' },
    { type: 'fill', q: 'ฐานกว้าง 3 ยาว 3 มีกี่ลูกบาศก์?', ans: '9', hint: '3 × 3' },
    { type: 'mc', q: 'ปริมาตรวัดเป็นหน่วยอะไร?', opts: ['ลูกบาศก์หน่วย', 'ตารางหน่วย', 'หน่วย', 'องศา'], ans: 0, hint: '3 มิติ = ลูกบาศก์' },
    { type: 'fill', q: 'ลูกบาศก์ด้าน 2 ปริมาตร = ___', ans: '8', hint: '2×2×2' },
    { type: 'slider', q: 'กล่อง 3 × 2 × 2 ปริมาตร?', min: 0, max: 30, step: 1, ans: 12, unit: '', hint: '3×2×2' },
    { type: 'fill', q: 'กล่องกว้าง 10 ยาว 2 สูง 1 ปริมาตร = ___', ans: '20', hint: '10 × 2 × 1' },
    { type: 'fill', q: 'กล่อง กว้าง 3 ยาว 4 สูง 5 ซม. ปริมาตร = ___ ลบ.ซม.', ans: '60', hint: '3×4×5 = 60 ลบ.ซม.' },
    { type: 'slider', q: 'กล่อง กว้าง 2 ยาว 3 สูง 5 ปริมาตร?', min: 0, max: 60, step: 1, ans: 30, unit: 'ลบ.ซม.', hint: '2×3×5 = 30' },
  ],
}

export default volume
