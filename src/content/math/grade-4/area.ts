import type { ChapterV2 } from '@/types/curriculum'

// พื้นที่ ป.4 — story (curriculum ref: math-thai-p456 p4-c08)
// หัวใจ: ปูกระเบื้องทีละแถว → พื้นที่ = แถวละ W แผ่น × H แถว = กว้าง × ยาว

const area: ChapterV2 = {
  version: 2,
  id: 'math-4-area',
  subject: 'math',
  grade: 4,
  chapter: 8,
  title: 'พื้นที่',
  icon: '🟦',
  slug: 'area',
  scenes: [
    {
      id: 'intro',
      say: 'พื้นที่คือขนาดของพื้นที่ปูเต็มห้อง เรานับเป็น "กระเบื้อง" หรือตารางหน่วย',
      visual: { component: 'AreaTiles', config: { width: 5, height: 3, readOnly: true } },
    },
    {
      id: 'tile-row',
      say: 'ลองปูกระเบื้องเอง! กดปูทีละแถว แถวละ 5 แผ่น ปูให้เต็มห้อง',
      visual: { component: 'AreaTiles', config: { width: 5, height: 3 } },
      goal: { type: 'reach-value', key: 'full', value: 1 },
      hint: 'กด "ปูอีก 1 แถว" ไปเรื่อยๆ จนเต็มทั้ง 3 แถว',
    },
    {
      id: 'count-rows',
      say: 'ปูเต็มแล้ว! แถวละ 5 แผ่น มี 3 แถว ไม่ต้องนับทีละแผ่น แค่ 5 × 3 = 15 แผ่น',
      visual: { component: 'AreaTiles', config: { width: 5, height: 3, readOnly: true } },
    },
    {
      id: 'tile-4x6',
      say: 'ห้องใหม่ กว้าง 4 ยาว 6 — ปูดูสิว่าใช้กระเบื้องกี่แผ่น',
      visual: { component: 'AreaTiles', config: { width: 4, height: 6 } },
      goal: { type: 'reach-value', key: 'full', value: 1 },
      hint: 'ปูครบ 6 แถว แถวละ 4 → 4 × 6 = 24 แผ่น',
    },
    {
      id: 'square',
      say: 'ห้องจัตุรัส กว้างเท่ายาว ด้านละ 5 — ปูเต็มแล้วได้กี่แผ่น?',
      visual: { component: 'AreaTiles', config: { width: 5, height: 5 } },
      goal: { type: 'reach-value', key: 'full', value: 1 },
      hint: 'จัตุรัสด้าน 5 → 5 × 5 = 25',
    },
    {
      id: 'quiz',
      say: 'ลองคิดดู! ห้องนี้กว้าง 4 ยาว 7 พื้นที่กี่ตารางหน่วย?',
      visual: { component: 'AreaTiles', config: { width: 4, height: 7, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'พื้นที่ห้องกว้าง 4 ยาว 7 = ?', opts: ['28', '24', '11', '21'], ans: 0, hint: '4 × 7 — แถวละ 4 มี 7 แถว' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 พื้นที่สี่เหลี่ยม = กว้าง × ยาว · มองเป็นแถวๆ จะนับเร็ว ไม่ต้องนับทีละช่อง',
      visual: { component: 'AreaTiles', config: { width: 5, height: 3, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'สี่เหลี่ยมกว้าง 6 ยาว 4 พื้นที่ = ___ ตารางหน่วย', ans: '24', hint: '6 × 4' },
    { type: 'mc', q: 'สี่เหลี่ยมจัตุรัสด้านยาว 5 พื้นที่เท่าไร?', opts: ['10', '20', '25', '30'], ans: 2, hint: 'จัตุรัส = ด้าน × ด้าน = 5×5' },
    { type: 'fill', q: 'ห้องกว้าง 4 ม. ยาว 7 ม. พื้นที่ ___ ตร.ม.', ans: '28', hint: '4 × 7' },
    { type: 'fill', q: 'ห้องกว้าง 5 ยาว 3 พื้นที่ = ___ ตารางหน่วย', ans: '15', hint: '5 × 3' },
    { type: 'mc', q: 'ห้องกว้าง 4 ยาว 6 พื้นที่เท่าไร?', opts: ['24', '20', '10', '16'], ans: 0, hint: '4 × 6' },
    { type: 'fill', q: 'จัตุรัสด้าน 3 พื้นที่ = ___', ans: '9', hint: '3 × 3' },
    { type: 'fill', q: 'พื้นที่สี่เหลี่ยม = กว้าง × ___', ans: 'ยาว', hint: 'สูตรพื้นที่สี่เหลี่ยมผืนผ้า' },
    { type: 'mc', q: 'ห้องใดมีพื้นที่ 20 ตารางหน่วย?', opts: ['กว้าง 4 ยาว 5', 'กว้าง 4 ยาว 4', 'กว้าง 2 ยาว 8', 'กว้าง 3 ยาว 6'], ans: 0, hint: '4 × 5 = 20' },
    { type: 'slider', q: 'ห้องกว้าง 7 ยาว 2 พื้นที่คือ?', min: 0, max: 20, step: 1, ans: 14, unit: 'ตร.หน่วย', hint: '7 × 2' },
    { type: 'fill', q: 'ห้องกว้าง 8 ยาว 5 พื้นที่ = ___ ตารางหน่วย', ans: '40', hint: '8 × 5' },
  ],
}

export default area
