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
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ซื้อของราคา 75 บาท จ่าย 100 บาท ต้องทอนเท่าไร?', opts: ['25 บาท', '75 บาท', '100 บาท', '175 บาท'], ans: 0, hint: '100 − 75 = 25 บาท' },
      },
    },
    {
      id: 'change-concept',
      say: 'เงินทอน = เงินที่จ่าย − ราคาของ = 100 − 75 = 25 บาท เข้าใจง่ายๆ แค่นี้เอง!',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 20: 1, 5: 1 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สูตรเงินทอนคือ?', opts: ['จ่าย − ราคา', 'ราคา − จ่าย', 'จ่าย + ราคา', 'จ่าย ÷ ราคา'], ans: 0, hint: 'เงินทอน = เงินที่จ่ายไป ลบ ราคาของ' },
      },
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
      id: 'multi-item',
      say: 'ซื้อหลายอย่าง: บวกราคาทั้งหมดก่อน แล้วค่อยคิดทอน เช่น ขนม 35 บาท น้ำ 20 บาท รวม 55 บาท จ่าย 100 ทอน 45 บาท',
      visual: { component: 'MoneyDrag', config: { readOnly: true, initialCounts: { 20: 2, 5: 1 }, availableDenominations: [1000, 500, 100, 50, 20, 10, 5, 1] } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ซื้อขนม 35 บาท และน้ำ 20 บาท จ่าย 100 บาท ทอนเท่าไร?', opts: ['45 บาท', '55 บาท', '65 บาท', '25 บาท'], ans: 0, hint: 'รวมก่อน 35+20=55 แล้ว 100−55=45' },
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
    { type: 'fill', q: 'ซื้อสมุด 3 เล่ม เล่มละ 35 บาท และปากกา 2 ด้าม ด้ามละ 28 บาท รวมจ่ายทั้งหมด ___ บาท', ans: '161', hint: '3×35=105, 2×28=56, รวม 105+56=161' },
    { type: 'mc', q: 'แบงก์ 500 ใช้ซื้อของ 320 บาท ทอนเท่าไร?', opts: ['180', '280', '120', '200'], ans: 0, hint: '500 − 320' },
    { type: 'fill', q: 'ซื้อของ 3 อย่าง ราคา 120, 85 และ 45 บาท จ่าย 500 บาท ทอน ___ บาท', ans: '250', hint: 'รวมราคา 120+85+45=250 แล้ว 500−250=250' },
    { type: 'slider', q: 'ของราคา 30 จ่ายเหรียญ 50 ทอนกี่บาท?', min: 0, max: 50, step: 5, ans: 20, unit: 'บาท', hint: '50 − 30' },
    { type: 'mc', q: 'มีเงิน 1,500 บาท ซื้อของ 4 อย่าง ราคา 350, 280, 175 และ 490 บาท เหลือเงินเท่าไร?', opts: ['195 บาท', '205 บาท', '215 บาท', '305 บาท'], ans: 1, hint: 'รวมราคา 350+280+175+490=1,295 แล้ว 1,500−1,295=205' },
    { type: 'fill', q: 'ซื้อขนม 3 ถุง ถุงละ 15 บาท จ่าย 100 ทอน ___ บาท', ans: '55', hint: 'รวม 45 ก่อน แล้ว 100−45' },
    { type: 'mc', q: 'มีแบงก์ 100 อยากซื้อของ 120 บาท เงินพอไหม?', opts: ['พอดี', 'ขาด 20 บาท', 'เกิน 20 บาท', 'ขาด 120 บาท'], ans: 1, hint: '120 − 100 = ขาดอยู่เท่าไร' },
    { type: 'fill', q: 'จ่าย 1,000 ซื้อของ 780 บาท ทอน ___ บาท', ans: '220', hint: '1000 − 780' },
  ],
}

export default money
