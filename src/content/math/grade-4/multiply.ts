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
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '4 แถวๆ ละ 3 ชิ้น รวมกี่ชิ้น? เขียนเป็นการคูณว่า?', opts: ['3 × 4 = 12', '3 + 4 = 7', '4 + 4 = 8', '3 × 3 = 9'], ans: 0, hint: 'แถวละ 3 × 4 แถว = 3 × 4 = 12' },
      },
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
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '4 × 3 กับ 3 × 4 ได้ผลเท่ากันไหม?', opts: ['เท่ากัน (12)', '4×3 มากกว่า', '3×4 มากกว่า', 'ต้องคำนวณก่อน'], ans: 0, hint: 'สลับที่ได้ผลเท่าเดิมเสมอ' },
      },
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
      id: 'column-intro',
      say: 'ถ้าตัวเลขใหญ่ขึ้น เช่น 45 × 6 — มีวิธีเร็วกว่า: "ตั้งคูณ" เขียนซ้อนกัน คูณทีละหลักจากขวาไปซ้าย',
      visual: { component: 'MultiplyColumn', config: { a: 45, b: 6, readOnly: true, initialStep: 0 } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'การตั้งคูณ 45 × 6 เริ่มคูณที่หลักอะไรก่อน?', opts: ['หลักหน่วย (5×6)', 'หลักสิบ (4×6)', 'หลักร้อย', 'ทำพร้อมกันได้เลย'], ans: 0, hint: 'ตั้งคูณเสมอเริ่มจากขวาสุด = หลักหน่วย' },
      },
    },
    {
      id: 'column-step',
      say: 'กด "คูณหลักถัดไป" เพื่อดูทีละขั้น — เริ่มหลักหน่วย 5 × 6 = 30 → เขียน 0 ทด 3 ขึ้นหลักสิบ (ตัวเลขสีม่วง)',
      visual: { component: 'MultiplyColumn', config: { a: 45, b: 6 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'กด "คูณหลักถัดไป" ไปเรื่อยๆ จนปุ่มเปลี่ยนเป็น "เริ่มใหม่"',
    },
    {
      id: 'column-3dig',
      say: 'ลอง 3 หลัก: 123 × 4 — ทำแบบเดิม หน่วย→สิบ→ร้อย ตัวทดสีม่วงช่วยจำค่าที่ต้องบวกเพิ่มแต่ละหลัก',
      visual: { component: 'MultiplyColumn', config: { a: 123, b: 4 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'กด "คูณหลักถัดไป" ทีละขั้น — ตัวทด = ส่วนที่เกิน 9 ยกขึ้นหลักถัดไป',
    },
    {
      id: 'quiz',
      say: 'ท้าทาย! ลองคำนวณ 35 × 4 = ? ดูการตั้งคูณแล้วเลือกคำตอบ',
      visual: { component: 'MultiplyColumn', config: { a: 35, b: 4, readOnly: true, initialStep: 0 } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '35 × 4 = ?', opts: ['140', '120', '135', '145'], ans: 0, hint: 'หน่วย: 5×4=20 เขียน 0 ทด 2 · สิบ: 3×4+2=14 เขียน 14' },
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
    { type: 'fill', q: 'ซื้อขนม 8 ถุง ถุงละ 25 บาท จ่าย ___ บาท', ans: '200', hint: '8 × 25 — ตั้งคูณ: 5×8=40 เขียน 0 ทด 4, 2×8+4=20' },
    { type: 'fill', q: '47 × 3 = ___', ans: '141', hint: 'หน่วย: 7×3=21 เขียน 1 ทด 2 · สิบ: 4×3+2=14 เขียน 14' },
    { type: 'fill', q: '56 × 4 = ___', ans: '224', hint: 'หน่วย: 6×4=24 เขียน 4 ทด 2 · สิบ: 5×4+2=22 เขียน 22' },
    { type: 'mc', q: '78 × 5 = ?', opts: ['390', '380', '400', '385'], ans: 0, hint: 'หน่วย: 8×5=40 ทด 4 · สิบ: 7×5+4=39 → 390' },
    { type: 'mc', q: '3 × 2 กับ 2 × 3 ได้ผลอย่างไร?', opts: ['เท่ากัน (6)', '3×2 มากกว่า', '2×3 มากกว่า', 'ต่างกันมาก'], ans: 0, hint: 'สลับที่ได้ผลเท่าเดิม' },
    { type: 'fill', q: 'ขนม 12 ชิ้นต่อแถว 6 แถว รวม ___ ชิ้น', ans: '72', hint: '12 × 6 — ตั้งคูณ: 2×6=12 ทด 1, 1×6+1=7 → 72' },
    { type: 'slider', q: 'ผลคูณ 23 × 6 = ?', min: 0, max: 200, step: 1, ans: 138, unit: '', hint: 'หน่วย: 3×6=18 ทด 1 · สิบ: 2×6+1=13 → 138' },
    { type: 'mc', q: '9 × 9 = ?', opts: ['81', '72', '99', '18'], ans: 0, hint: 'สูตรคูณแม่ 9' },
  ],
}

export default multiply
