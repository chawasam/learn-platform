import type { ChapterV2 } from '@/types/curriculum'

// การคูณ ป.4 — story (curriculum ref: math-thai-p456 p4-c04)
// หัวใจ: array model — คูณ = บวกซ้ำ = นับเร็ว + สมบัติสลับที่

const multiply: ChapterV2 = {
  version: 2,
  id: 'math-4-multiply',
  subject: 'math',
  grade: 4,
  chapter: 4,
  title: 'การคูณ',
  icon: '✖️',
  slug: 'multiplication',
  scenes: [
    {
      id: 'intro',
      say: 'การคูณคือการบวกซ้ำๆ! ดูขนมนี่สิ — เอา 4 ชิ้นมาวาง 3 แถว ก็คือ 4 + 4 + 4',
      visual: { component: 'MultiplyArray', config: { a: 4, b: 3, readOnly: true } },
    },
    {
      id: 'as-addition',
      say: 'นับทีละแถว: 4 + 4 + 4 = 12 เขียนสั้นๆ ว่า 4 × 3 = 12 — "4 สามแถว"',
      visual: { component: 'MultiplyArray', config: { a: 4, b: 3, readOnly: true } },
    },
    {
      id: 'build-2x3',
      say: 'ลองสร้างเอง! ทำขนม 2 ชิ้นต่อแถว วาง 3 แถว ดูสิว่าได้กี่ชิ้น',
      visual: { component: 'MultiplyArray', config: { build: true } },
      goal: { type: 'reach-value', key: 'product', value: 6 },
      hint: 'กดปุ่ม "ต่อแถว" ให้เป็น 2 และ "จำนวนแถว" ให้เป็น 3 → 2 × 3 = 6',
    },
    {
      id: 'commutative',
      say: 'เคล็ดลับ! สลับที่ได้ผลเท่าเดิม — 3 × 2 ก็ได้ 6 เหมือนกับ 2 × 3 ลองนับดูได้เลย',
      visual: { component: 'MultiplyArray', config: { a: 3, b: 2, readOnly: true } },
    },
    {
      id: 'build-3x4',
      say: 'โจทย์ใหญ่ขึ้น! สร้างขนม 3 ต่อแถว 4 แถว = ?',
      visual: { component: 'MultiplyArray', config: { build: true } },
      goal: { type: 'reach-value', key: 'product', value: 12 },
      hint: 'ต่อแถว 3, จำนวนแถว 4 → 3 × 4 = 12 (หรือสลับเป็น 4 × 3 ก็ได้ 12)',
    },
    {
      id: 'fast',
      say: 'คูณคือการนับเร็ว! ไม่ต้องบวกทีละตัว — เห็น 5 ต่อแถว 4 แถว รู้เลย 5 × 4 = 20',
      visual: { component: 'MultiplyArray', config: { a: 5, b: 4, readOnly: true } },
    },
    {
      id: 'quiz',
      say: 'ลองอ่านดู! ขนมแบบนี้ 6 ต่อแถว 4 แถว เป็นกี่ชิ้น?',
      visual: { component: 'MultiplyArray', config: { a: 6, b: 4, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '6 × 4 = ?', opts: ['24', '20', '18', '10'], ans: 0, hint: 'นับ 6 สี่แถว: 6+6+6+6' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 คูณ = บวกซ้ำ · มองเป็นแถวๆ จะนับเร็ว · สลับที่ได้ผลเท่าเดิม (a×b = b×a)',
      visual: { component: 'MultiplyArray', config: { a: 4, b: 3, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '6 × 7 = ?', opts: ['42', '48', '36', '54'], ans: 0, hint: 'ท่องสูตรคูณแม่ 6' },
    { type: 'fill', q: '123 × 3 = ___', ans: '369', hint: 'คูณทีละหลัก: 3×3, 2×3, 1×3' },
    { type: 'fill', q: 'ซื้อขนม 8 ถุง ถุงละ 25 บาท จ่าย ___ บาท', ans: '200', hint: '8 × 25' },
    { type: 'fill', q: '4 × 3 = ___', ans: '12', hint: '4 + 4 + 4 = ?' },
    { type: 'fill', q: '2 × 3 = ___', ans: '6', hint: '2 สามแถว' },
    { type: 'mc', q: '5 × 4 = ?', opts: ['20', '15', '25', '9'], ans: 0, hint: '5 สี่แถว' },
    { type: 'mc', q: '3 × 2 กับ 2 × 3 ได้ผลอย่างไร?', opts: ['เท่ากัน (6)', '3×2 มากกว่า', '2×3 มากกว่า', 'ต่างกันมาก'], ans: 0, hint: 'สลับที่ได้ผลเท่าเดิม' },
    { type: 'fill', q: 'ขนม 7 ชิ้นต่อแถว 5 แถว รวม ___ ชิ้น', ans: '35', hint: '7 × 5' },
    { type: 'slider', q: 'ผลคูณ 6 × 3 = ?', min: 0, max: 30, step: 1, ans: 18, unit: '', hint: '6 สามแถว: 6+6+6' },
    { type: 'mc', q: '9 × 9 = ?', opts: ['81', '72', '99', '18'], ans: 0, hint: 'สูตรคูณแม่ 9' },
  ],
}

export default multiply
