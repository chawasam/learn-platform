import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 12 ทรงสามมิติและปริมาตร (ref: p6-c12) — ปริมาตร + พื้นที่ผิว
const volume: ChapterV2 = {
  version: 2,
  id: 'math-6-volume',
  subject: 'math',
  grade: 6,
  chapter: 12,
  title: 'ทรงสามมิติและปริมาตร',
  icon: '📦',
  slug: 'volume-6',
  scenes: [
    {
      id: 'intro',
      say: 'ปริมาตรทรงสี่เหลี่ยม = กว้าง × ยาว × สูง ลองวางลูกบาศก์เป็นฐาน 2 × 3 = 6 ก่อน',
      visual: { component: 'CubeBuilder', config: { gridSize: 4 } },
      goal: { type: 'reach-value', key: 'volume', value: 6 },
      hint: 'แตะวางลูกบาศก์ให้ได้ 6 ก้อน (ฐาน 2 × 3)',
    },
    {
      id: 'volume',
      say: 'ฐาน 2×3 = 6 ถ้าซ้อนสูง 4 ชั้น → ปริมาตร = 6 × 4 = 24 ลูกบาศก์หน่วย',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'กล่อง 3 × 4 × 5 ปริมาตร?', opts: ['60', '12', '35', '20'], ans: 0, hint: '3×4×5 ไม่ใช่ (3+4)×5=35 หรือ 3×4=12' },
      },
    },
    {
      id: 'surface',
      say: 'พื้นที่ผิว = ผลรวมพื้นที่ทุกหน้า (กล่องมี 6 หน้า) บอกขนาดเปลือกนอก ส่วนปริมาตรบอกความจุ',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ลูกบาศก์ด้าน 4 ปริมาตร?', opts: ['12', '16', '64', '48'], ans: 2, hint: '4 × 4 × 4' },
      },
    },
    {
      id: 'volume-box',
      say: 'ปริมาตรทรงสี่เหลี่ยมมุมฉาก V = กว้าง × ยาว × สูง เช่น 4×3×5=60 ลบ.ซม.',
      visual: { component: 'CubeBuilder', config: { gridSize: 4 } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สูตรปริมาตรทรงสี่เหลี่ยมมุมฉากคือ?', opts: ['กว้าง × ยาว × สูง', 'กว้าง × ยาว', 'กว้าง + ยาว + สูง', '2 × (กว้าง × ยาว)'], ans: 0, hint: 'คูณทั้ง 3 ด้าน' },
      },
    },
    {
      id: 'volume-calculate',
      say: 'กล่อง กว้าง 4 ยาว 3 สูง 5 ซม. V = 4×3×5 = 60 ลบ.ซม. (เหมือนวาง 5 ชั้น ชั้นละ 12 ลูก)',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, true, true, false], [true, true, true, false], [false, false, false, false], [false, false, false, false]] } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'กล่อง กว้าง 2 ยาว 5 สูง 3 ซม. ปริมาตรเท่าไร?', opts: ['30 ลบ.ซม.', '10 ลบ.ซม.', '60 ลบ.ซม.', '15 ลบ.ซม.'], ans: 0, hint: '2×5×3=30 ลบ.ซม.' },
      },
    },
    {
      id: 'surface-area',
      say: 'พื้นที่ผิว = ผลรวมพื้นที่ทุกหน้า = 2(กย+กส+ยส) ลองคลี่กล่องดู',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, true, true, false], [true, true, true, false], [false, false, false, false], [false, false, false, false]] } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ลูกบาศก์ด้าน 3 ซม. พื้นที่ผิวทั้งหมดเท่าไร?', opts: ['54 ตร.ซม.', '27 ตร.ซม.', '18 ตร.ซม.', '9 ตร.ซม.'], ans: 0, hint: '6 หน้า แต่ละหน้า 3×3=9 รวม 6×9=54' },
      },
    },
    {
      id: 'volume-quiz',
      say: 'ทดสอบปริมาตรก่อนไปต่อ',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'กล่อง กว้าง 3 ยาว 5 สูง 4 ซม. ปริมาตร = ?', opts: ['60 ลบ.ซม.', '24 ลบ.ซม.', '32 ลบ.ซม.', '120 ลบ.ซม.'], ans: 0, hint: '3×5×4=60 ลบ.ซม. ไม่ใช่ (3+5)×4=32' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ปริมาตร = กว้าง×ยาว×สูง (ความจุ) · พื้นที่ผิว = รวม 6 หน้า (เปลือกนอก)',
      visual: { component: 'CubeBuilder', config: { gridSize: 4, readOnly: true, initialGrid: [[true, true, true, false], [true, true, true, false], [false, false, false, false], [false, false, false, false]] } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'กล่อง 3×4×5 ปริมาตร = ___ ลบ.หน่วย', ans: '60', hint: '3 × 4 × 5' },
    { type: 'mc', q: 'ลูกบาศก์ด้าน 4 ปริมาตรเท่าไร?', opts: ['12', '16', '64', '48'], ans: 2, hint: '4 × 4 × 4' },
    { type: 'fill', q: 'กล่อง 10×10×10 ปริมาตร = ___ ลบ.หน่วย', ans: '1000', hint: '10 × 10 × 10' },
    { type: 'fill', q: 'กล่อง 2×3×4 ปริมาตร = ___', ans: '24', hint: '2 × 3 × 4' },
    { type: 'mc', q: 'ลูกบาศก์ด้าน 5 ปริมาตร?', opts: ['125', '25', '15', '50'], ans: 0, hint: '5×5×5=125 ไม่ใช่ 5×5=25 (สองมิติ) หรือ 5+5+5=15' },
    { type: 'fill', q: 'กล่อง 6×2×2 ปริมาตร = ___', ans: '24', hint: '6 × 2 × 2' },
    { type: 'fill', q: 'ลูกบาศก์ด้าน 2 ปริมาตร = ___', ans: '8', hint: '2 × 2 × 2' },
    { type: 'slider', q: 'กล่อง 4 × 3 × 2 ปริมาตร?', min: 0, max: 40, step: 1, ans: 24, unit: '', hint: '4×3×2' },
    { type: 'fill', q: 'กล่อง 2×4×3 พื้นที่ผิว = 2(กย+กส+ยส) = 2(8+6+12) = ___', ans: '52', hint: '2×(8+6+12)=2×26=52' },
    { type: 'mc', q: 'ลูกบาศก์ด้าน 3 พื้นที่ผิว = 6×(3×3) = ?', opts: ['54', '27', '18', '9'], ans: 0, hint: '6 × 9 = 54' },
  ],
}

export default volume
