import type { ChapterV2 } from '@/types/curriculum'

// การหาร ป.4 — story (curriculum ref: math-thai-p456 p4-c05)
// หัวใจ: แบ่งเท่าๆ กัน (แจกลงจานทีละรอบ) + เศษ = เม็ดที่เหลือแจกไม่ครบรอบ
// + ตั้งหาร (DivideColumn) สอน procedure: หารทีละหลักจากซ้ายไปขวา

const divide: ChapterV2 = {
  version: 2,
  id: 'math-4-divide',
  subject: 'math',
  grade: 4,
  chapter: 5,
  title: 'การหาร',
  icon: '➗',
  slug: 'division',
  scenes: [
    {
      id: 'intro',
      say: 'การหารคือแบ่งของเท่าๆ กัน ลูกอม 12 เม็ด แบ่งให้เพื่อน 3 คน (3 จาน) จะได้คนละกี่เม็ด?',
      visual: { component: 'DivideShare', config: { total: 12, plates: 3, readOnly: true } },
    },
    {
      id: 'deal-12-3',
      say: 'ลองแจกเอง! กด "แจกอีก 1 รอบ" — แจกทีละเม็ดให้ทุกจานพร้อมกัน จนลูกอมในกองหมด',
      visual: { component: 'DivideShare', config: { total: 12, plates: 3 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'กดแจกไปเรื่อยๆ จนกองรวมเหลือน้อยกว่า 3 — จะได้จานละ 4 พอดี',
    },
    {
      id: 'result-12-3',
      say: 'แจกครบแล้ว! ทุกจานได้เท่ากัน 4 เม็ด เขียนว่า 12 ÷ 3 = 4',
      visual: { component: 'DivideShare', config: { total: 12, plates: 3, readOnly: true } },
    },
    {
      id: 'inverse',
      say: 'รู้ไหม? หารกับคูณตรงข้ามกัน — 4 × 3 = 12 ก็เลย 12 ÷ 3 = 4 จำคู่กันได้เลย',
      visual: { component: 'MultiplyArray', config: { a: 4, b: 3, readOnly: true } },
    },
    {
      id: 'deal-20-4',
      say: 'ลองอีก! ลูกอม 20 เม็ด แบ่ง 4 จาน จานละกี่เม็ด? แจกดูสิ',
      visual: { component: 'DivideShare', config: { total: 20, plates: 4 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'แจกจนหมด — จานละ 5 → 20 ÷ 4 = 5',
    },
    {
      id: 'remainder',
      say: 'รอบนี้พิเศษ! ลูกอม 13 เม็ด แบ่ง 4 จาน — แจกดูสิ จะเหลือเม็ดที่แจกไม่ได้',
      visual: { component: 'DivideShare', config: { total: 13, plates: 4 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'แจกได้ 3 รอบ (จานละ 3) แล้วเหลือ 1 เม็ดแจกไม่ครบ 4 จาน = เศษ 1',
    },
    {
      id: 'remainder-explain',
      say: 'เหลือ 1 เม็ดแจกไม่ได้เพราะไม่พอทุกจาน เรียกว่า "เศษ" → 13 ÷ 4 = 3 เศษ 1',
      visual: { component: 'DivideShare', config: { total: 13, plates: 4, readOnly: true } },
    },
    {
      id: 'column-intro',
      say: 'ตอนนี้ลองตั้งหาร! 84 ÷ 3 = ? — ดูการหารทีละหลักจากซ้ายไปขวา เลขผลลัพธ์จะทยอยโผล่ขึ้นมาด้านบน',
      visual: { component: 'DivideColumn', config: { a: 84, b: 3, readOnly: true, initialStep: 0 } },
    },
    {
      id: 'column-step',
      say: 'ลองเองสิ! กด "หารหลักถัดไป ▶" ทีละครั้ง — ดูว่าแต่ละหลักได้ผลลัพธ์ยังไง',
      visual: { component: 'DivideColumn', config: { a: 84, b: 3 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'คลิก 2 ครั้ง: ครั้งแรก 8÷3=2 เหลือ 2 → ดึง 4 → 24÷3=8 → ผลลัพธ์ 28',
    },
    {
      id: 'column-2dig',
      say: 'ฝึกอีก! 96 ÷ 4 = ? หารทีละหลักดูสิ',
      visual: { component: 'DivideColumn', config: { a: 96, b: 4 } },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: '9÷4=2 เหลือ 1 → ดึง 6 → 16÷4=4 → ผลลัพธ์ 24',
    },
    {
      id: 'quiz',
      say: 'ทดสอบ! 84 ÷ 3 = ?',
      visual: { component: 'DivideColumn', config: { a: 84, b: 3, readOnly: true, initialStep: 0 } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '84 ÷ 3 = ?', opts: ['28', '24', '21', '32'], ans: 0, hint: '8÷3=2 เหลือ 2 → 24÷3=8 → ผล 28' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 หาร = แบ่งเท่าๆ กัน · เศษ = เหลือแจกไม่ครบ · ตั้งหาร: หารทีละหลักซ้าย→ขวา นำเศษไปต่อหลักถัดไป',
      visual: { component: 'DivideShare', config: { total: 12, plates: 3, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '20 ÷ 4 = ?', opts: ['4', '5', '6', '8'], ans: 1, hint: '4 × 5 = 20' },
    { type: 'fill', q: 'ดินสอ 36 แท่ง แบ่งใส่กล่อง 6 กล่องเท่าๆ กัน กล่องละ ___ แท่ง', ans: '6', hint: '36 ÷ 6 = 6' },
    { type: 'mc', q: '15 ÷ 2 เหลือเศษเท่าไร?', opts: ['0', '1', '2', '3'], ans: 1, hint: '2×7=14 เหลือ 15−14=1' },
    { type: 'fill', q: '84 ÷ 3 = ___', ans: '28', hint: '8÷3=2 เหลือ 2 → 24÷3=8 → ผล 28' },
    { type: 'mc', q: '96 ÷ 4 = ?', opts: ['22', '24', '26', '28'], ans: 1, hint: '9÷4=2 เหลือ 1 → 16÷4=4 → ผล 24' },
    { type: 'mc', q: '18 ÷ 3 = ?', opts: ['6', '5', '9', '4'], ans: 0, hint: '3 × 6 = 18' },
    { type: 'fill', q: '72 ÷ 4 = ___', ans: '18', hint: '7÷4=1 เหลือ 3 → 32÷4=8 → ผล 18' },
    { type: 'mc', q: '13 ÷ 4 = ? เศษ ?', opts: ['3 เศษ 1', '4 เศษ 0', '3 เศษ 2', '2 เศษ 5'], ans: 0, hint: '4×3=12 เหลือ 1' },
    { type: 'slider', q: 'ผลหาร 96 ÷ 4 = ?', min: 0, max: 30, step: 1, ans: 24, unit: '', hint: '9÷4=2 เหลือ 1 → 16÷4=4' },
    { type: 'fill', q: '63 ÷ 3 = ___', ans: '21', hint: '6÷3=2 เหลือ 0 → 3÷3=1 → ผล 21' },
  ],
}

export default divide
