import type { ChapterV2 } from '@/types/curriculum'

// การหาร ป.4 — story (curriculum ref: math-thai-p456 p4-c05)
// หัวใจ: แบ่งเท่าๆ กัน (แจกลงจานทีละรอบ) + เศษ = เม็ดที่เหลือแจกไม่ครบรอบ

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
      id: 'quiz',
      say: 'ลองอ่านดู! ลูกอม 15 เม็ด แบ่ง 2 จาน ได้จานละเท่าไร เหลือเศษเท่าไร?',
      visual: { component: 'DivideShare', config: { total: 15, plates: 2, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '15 ÷ 2 = ? เศษ ?', opts: ['7 เศษ 1', '8 เศษ 0', '7 เศษ 2', '6 เศษ 3'], ans: 0, hint: '2 × 7 = 14 เหลือ 15 − 14 = 1' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 หาร = แบ่งเท่าๆ กัน · เม็ดที่เหลือแจกไม่ครบ = เศษ · หารคือตรงข้ามของคูณ',
      visual: { component: 'DivideShare', config: { total: 12, plates: 3, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '20 ÷ 4 = ?', opts: ['4', '5', '6', '8'], ans: 1, hint: '4 คูณอะไรได้ 20?' },
    { type: 'fill', q: 'ดินสอ 36 แท่ง แบ่งใส่กล่อง 6 กล่องเท่าๆ กัน กล่องละ ___ แท่ง', ans: '6', hint: '36 ÷ 6' },
    { type: 'mc', q: '15 ÷ 2 เหลือเศษเท่าไร?', opts: ['0', '1', '2', '3'], ans: 1, hint: '2×7=14 เหลือ 15−14' },
    { type: 'fill', q: 'ลูกอม 12 เม็ด แบ่ง 3 จานเท่าๆ กัน จานละ ___ เม็ด', ans: '4', hint: '12 ÷ 3' },
    { type: 'fill', q: '12 ÷ 4 = ___', ans: '3', hint: 'แบ่ง 12 ใส่ 4 จาน' },
    { type: 'mc', q: '18 ÷ 3 = ?', opts: ['6', '5', '9', '4'], ans: 0, hint: '3 × 6 = 18' },
    { type: 'fill', q: '24 ÷ 6 = ___', ans: '4', hint: '6 × 4 = 24' },
    { type: 'mc', q: '13 ÷ 4 = ? เศษ ?', opts: ['3 เศษ 1', '4 เศษ 0', '3 เศษ 2', '2 เศษ 5'], ans: 0, hint: '4×3=12 เหลือ 1' },
    { type: 'slider', q: 'ผลหาร 21 ÷ 3 = ?', min: 0, max: 10, step: 1, ans: 7, unit: '', hint: '3 × 7 = 21' },
    { type: 'fill', q: '30 ÷ 5 = ___', ans: '6', hint: '5 × 6 = 30' },
  ],
}

export default divide
