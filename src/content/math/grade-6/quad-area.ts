import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 9 พื้นที่รูปสี่เหลี่ยม (ref: p6-c09)
const quadArea: ChapterV2 = {
  version: 2,
  id: 'math-6-quad-area',
  subject: 'math',
  grade: 6,
  chapter: 9,
  title: 'พื้นที่รูปสี่เหลี่ยม',
  icon: '🔷',
  slug: 'quad-area',
  scenes: [
    {
      id: 'intro',
      say: 'พื้นที่ผืนผ้า = กว้าง × ยาว ลองปูกระเบื้องห้องกว้าง 6 ยาว 4 ดูว่ากี่แผ่น',
      visual: { component: 'AreaTiles', config: { width: 6, height: 4 } },
      goal: { type: 'reach-value', key: 'full', value: 1 },
      hint: 'ปูครบ 4 แถว แถวละ 6 → 6 × 4 = 24',
    },
    {
      id: 'parallelogram',
      say: 'สี่เหลี่ยมด้านขนาน พื้นที่ = ฐาน × สูง (เหมือนผืนผ้าที่เฉือนมุมไปต่ออีกข้าง)',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ด้านขนานฐาน 8 สูง 5 พื้นที่?', opts: ['13', '40', '20', '45'], ans: 1, hint: 'ฐาน × สูง = 8×5' },
      },
    },
    {
      id: 'rectangle',
      say: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่ = 6 × 9 ลองคิดดู',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่?', opts: ['54', '15', '30', '63'], ans: 0, hint: '6 × 9' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ผืนผ้า = กว้าง×ยาว · ด้านขนาน = ฐาน×สูง · จัตุรัส = ด้าน×ด้าน',
      visual: { component: 'AreaTiles', config: { width: 5, height: 3, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่ = ___ ตร.หน่วย', ans: '54', hint: '6 × 9' },
    { type: 'mc', q: 'ด้านขนานฐาน 8 สูง 5 พื้นที่เท่าไร?', opts: ['13', '40', '20', '45'], ans: 1, hint: 'ฐาน × สูง = 8×5' },
    { type: 'fill', q: 'จัตุรัสด้าน 7 พื้นที่ = ___ ตร.หน่วย', ans: '49', hint: '7 × 7' },
    { type: 'fill', q: 'ผืนผ้ากว้าง 5 ยาว 12 พื้นที่ = ___', ans: '60', hint: '5 × 12' },
    { type: 'mc', q: 'ด้านขนานฐาน 10 สูง 4 พื้นที่?', opts: ['40', '14', '20', '44'], ans: 0, hint: '10 × 4' },
    { type: 'fill', q: 'จัตุรัสด้าน 9 พื้นที่ = ___', ans: '81', hint: '9 × 9' },
    { type: 'mc', q: 'ห้องกว้าง 4 ยาว 7 ปูกระเบื้อง 1×1 กี่แผ่น?', opts: ['28', '11', '22', '14'], ans: 0, hint: '4 × 7' },
    { type: 'fill', q: 'ด้านขนานฐาน 6 สูง 6 พื้นที่ = ___', ans: '36', hint: '6 × 6' },
    { type: 'slider', q: 'ผืนผ้ากว้าง 5 ยาว 8 พื้นที่?', min: 0, max: 60, step: 1, ans: 40, unit: '', hint: '5 × 8' },
    { type: 'fill', q: 'พื้นที่ด้านขนาน = ฐาน × ___', ans: 'สูง', hint: 'สูตรด้านขนาน' },
  ],
}

export default quadArea
