import type { ChapterV2 } from '@/types/curriculum'

// เงินและการทอน ป.4 — story (curriculum ref: math-thai-p456 p4-c09)
// concrete: หยิบแบงก์/เหรียญจริงให้ครบจำนวน → เห็นการทอน = จ่าย − ราคา

const money: ChapterV2 = {
  version: 2,
  id: 'math-4-money',
  subject: 'math',
  grade: 4,
  chapter: 9,
  title: 'เงินและการทอน',
  icon: '💰',
  slug: 'money-change',
  scenes: [
    {
      id: 'intro',
      say: 'เงินไทยมีทั้งเหรียญและแบงก์ 🪙 มาฝึกนับเงินในกระเป๋ากัน!',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 100: 1, 20: 2 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
    },
    {
      id: 'build-75',
      say: 'ลองหยิบเงินให้ได้ 75 บาทดูสิ — กดปุ่ม + เพิ่มแบงก์กับเหรียญ',
      visual: { component: 'MoneyDrag', config: { targetTotal: 75, availableDenominations: [100, 50, 20, 10, 5, 1] } },
      goal: { type: 'reach-value', key: 'total', value: 75 },
      hint: 'ลองแบงก์ 50 + เหรียญ 20 + เหรียญ 5 = 75 (มีหลายวิธีนะ)',
    },
    {
      id: 'shop',
      say: 'ไปซื้อของราคา 75 บาท แต่เรามีแค่แบงก์ 100 — จ่าย 100 ร้านต้อง "ทอน" เงินกลับมา',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 100: 1 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
    },
    {
      id: 'change-concept',
      say: 'เงินทอน = เงินที่จ่าย − ราคาของ = 100 − 75 = 25 บาท เข้าใจง่ายๆ แค่นี้เอง!',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 20: 1, 5: 1 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
    },
    {
      id: 'build-change',
      say: 'ลองหยิบเงินทอน 25 บาทให้ร้านดูสิ',
      visual: { component: 'MoneyDrag', config: { targetTotal: 25, availableDenominations: [50, 20, 10, 5, 1] } },
      goal: { type: 'reach-value', key: 'total', value: 25 },
      hint: 'เหรียญ 20 + เหรียญ 5 = 25',
    },
    {
      id: 'check',
      say: 'ลองคิดเองดู',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 100: 1 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
      goal: {
        type: 'answer',
        question: { type: 'fill', q: 'ของราคา 65 บาท จ่าย 100 บาท ทอน ___ บาท', ans: '35', hint: '100 − 65 = ?' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป: จ่ายเกินเท่าไร ร้านต้องทอนกลับเท่านั้น · เงินทอน = จ่าย − ราคา 🎯',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 20: 1, 10: 1, 5: 1 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'ของราคา 65 บาท จ่าย 100 บาท ทอน ___ บาท', ans: '35', hint: '100 − 65' },
    { type: 'mc', q: 'ซื้อ 2 อย่าง 40 + 35 บาท จ่าย 100 ทอนเท่าไร?', opts: ['15', '20', '25', '30'], ans: 2, hint: 'รวมราคาก่อน 40+35=75 แล้ว 100−75' },
    { type: 'fill', q: 'มีเหรียญ 10 บาท 5 เหรียญ รวม ___ บาท', ans: '50', hint: '10 × 5' },
    { type: 'mc', q: 'แบงก์ 500 ใช้ซื้อของ 320 บาท ทอนเท่าไร?', opts: ['180', '280', '120', '200'], ans: 0, hint: '500 − 320' },
    { type: 'fill', q: 'แบงก์ 50 + เหรียญ 20 + เหรียญ 10 = ___ บาท', ans: '80', hint: '50+20+10' },
    { type: 'slider', q: 'ของราคา 30 จ่ายเหรียญ 50 ทอนกี่บาท?', min: 0, max: 50, step: 5, ans: 20, unit: 'บาท', hint: '50 − 30' },
    { type: 'mc', q: 'เหรียญ 20 บาท 3 เหรียญ + เหรียญ 5 บาท 2 เหรียญ = ?', opts: ['60', '65', '70', '25'], ans: 2, hint: '60 + 10' },
    { type: 'fill', q: 'ซื้อขนม 3 ถุง ถุงละ 15 บาท จ่าย 100 ทอน ___ บาท', ans: '55', hint: 'รวม 45 ก่อน แล้ว 100−45' },
    { type: 'mc', q: 'มีแบงก์ 100 อยากซื้อของ 120 บาท เงินพอไหม?', opts: ['พอดี', 'ขาด 20 บาท', 'เกิน 20 บาท', 'ขาด 120 บาท'], ans: 1, hint: '120 − 100 = ขาดอยู่เท่าไร' },
    { type: 'fill', q: 'จ่าย 1,000 ซื้อของ 780 บาท ทอน ___ บาท', ans: '220', hint: '1000 − 780' },
  ],
}

export default money
