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
      visual: { component: 'AreaTiles', config: { width: 8, height: 5, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ด้านขนานฐาน 8 สูง 5 พื้นที่?', opts: ['13', '40', '20', '45'], ans: 1, hint: 'ฐาน × สูง = 8×5' },
      },
    },
    {
      id: 'rectangle',
      say: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่ = 6 × 9 ลองคิดดู',
      visual: { component: 'AreaTiles', config: { width: 6, height: 9, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่?', opts: ['54', '15', '30', '63'], ans: 0, hint: '6 × 9' },
      },
    },
    {
      id: 'trapezoid',
      say: 'คางหมู มีด้านขนานคู่หนึ่งยาวไม่เท่ากัน พื้นที่ = ½ × (ด้านขนานสองด้านบวกกัน) × สูง',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'คางหมู ½ × (ด้านบน + ด้านล่าง) × สูง = ½ × (4+6) × 5 = 25',
          words: [{ text: '½ × (4+6) × 5', color: '#4F80FF', bold: true }, { text: '= 25', color: '#22C55E', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'คางหมูด้านขนาน 4 และ 6 สูง 5 พื้นที่?', opts: ['25', '30', '50', '15'], ans: 0, hint: '½ × (4+6) × 5 = ½ × 10 × 5' },
      },
    },
    {
      id: 'trapezoid-area',
      say: 'พื้นที่คางหมู = ½ × (ด้านขนาน a + ด้านขนาน b) × สูง เช่น a=6, b=4, h=3 → ½×10×3=15 ซม.²',
      visual: { component: 'AreaTiles', config: { width: 6, height: 3 } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'คางหมูด้านขนาน 6 กับ 4 สูง 3 พื้นที่เท่าไร?', opts: ['15 ซม.²', '30 ซม.²', '12 ซม.²', '9 ซม.²'], ans: 0, hint: '½ × (6+4) × 3 = ½ × 10 × 3 = 15' },
      },
    },
    {
      id: 'compound-shapes',
      say: 'รูปประกอบ: แบ่งออกเป็นรูปย่อย หาพื้นที่แต่ละส่วนแล้วบวก',
      visual: { component: 'AreaTiles', config: { width: 5, height: 4 } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'วิธีหาพื้นที่รูปประกอบทำอย่างไร?', opts: ['แบ่งเป็นรูปย่อยๆ หาพื้นที่แต่ละส่วนแล้วบวกรวม', 'วัดรอบรูปแล้วหาร 4', 'ใช้สูตร π r² ทุกรูป', 'แบ่งแล้วลบออก'], ans: 0, hint: 'ทุกรูปประกอบ แยกแล้ว บวกพื้นที่ย่อยรวมกัน' },
      },
    },
    {
      id: 'quad-area-quiz',
      say: 'ทดสอบพื้นที่คางหมูก่อนไปต่อ',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'คางหมู ½ × (8+4) × 5 = ½ × 12 × 5 = ?',
          words: [{ text: '½ × (8+4) × 5', color: '#4F80FF', bold: true }],
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'คางหมู ด้านขนาน 8 ซม. และ 4 ซม. สูง 5 ซม. พื้นที่ = ?', opts: ['30 ซม.²', '60 ซม.²', '20 ซม.²', '40 ซม.²'], ans: 0, hint: '½×(8+4)×5=½×12×5=30 ซม.²' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ผืนผ้า = กว้าง×ยาว · ด้านขนาน = ฐาน×สูง · จัตุรัส = ด้าน×ด้าน · คางหมู = ½×(ด้านขนานรวม)×สูง',
      visual: { component: 'AreaTiles', config: { width: 5, height: 3, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'ผืนผ้ากว้าง 6 ยาว 9 พื้นที่ = ___ ตร.หน่วย', ans: '54', hint: '6 × 9' },
    { type: 'mc', q: 'ด้านขนานฐาน 8 สูง 5 พื้นที่เท่าไร?', opts: ['13', '40', '20', '45'], ans: 1, hint: 'ฐาน × สูง = 8×5' },
    { type: 'fill', q: 'จัตุรัสด้าน 7 พื้นที่ = ___ ตร.หน่วย', ans: '49', hint: '7 × 7' },
    { type: 'fill', q: 'ผืนผ้ากว้าง 5 ยาว 12 พื้นที่ = ___', ans: '60', hint: '5 × 12' },
    { type: 'mc', q: 'ห้องกว้าง 4 ยาว 7 ปูกระเบื้อง 1×1 กี่แผ่น?', opts: ['28', '11', '22', '14'], ans: 0, hint: '4 × 7' },
    { type: 'fill', q: 'ด้านขนานฐาน 6 สูง 6 พื้นที่ = ___', ans: '36', hint: '6 × 6' },
    { type: 'slider', q: 'ผืนผ้ากว้าง 5 ยาว 8 พื้นที่?', min: 0, max: 60, step: 1, ans: 40, unit: '', hint: '5 × 8' },
    { type: 'mc', q: 'คางหมูด้านขนาน 3 และ 7 สูง 4 พื้นที่?', opts: ['20', '40', '21', '10'], ans: 0, hint: '½ × (3+7) × 4 = ½ × 10 × 4' },
    { type: 'mc', q: 'คางหมูด้านขนาน 8 และ 4 สูง 5 พื้นที่?', opts: ['30', '60', '20', '40'], ans: 0, hint: '½×(8+4)×5=½×12×5=30' },
    { type: 'fill', q: 'คางหมูด้านขนาน 10 และ 6 สูง 4 พื้นที่ = ___', ans: '32', hint: '½×(10+6)×4=½×16×4=32' },
  ],
}

export default quadArea
