import type { ChapterV2 } from '@/types/curriculum'

// การวัดความยาว ป.4 — story (curriculum ref: math-thai-p456 p4-c07)
// concrete: ลากจุดบนไม้บรรทัดวัดของจริง → แปลงหน่วย = คูณ/หาร

const length: ChapterV2 = {
  version: 2,
  id: 'math-4-length',
  subject: 'math',
  grade: 4,
  chapter: 7,
  title: 'การวัดความยาว',
  icon: '📏',
  slug: 'length',
  scenes: [
    {
      id: 'intro',
      say: 'หยิบไม้บรรทัดมาวัดของกัน! 📏 หน่วยวัดความยาวเรียงจากเล็กไปใหญ่: มิลลิเมตร → เซนติเมตร → เมตร → กิโลเมตร',
      visual: { component: 'NumberLine', config: { min: 0, max: 10, step: 1, initialValue: 0, readOnly: true } },
    },
    {
      id: 'measure-pencil',
      say: 'วางดินสอบนไม้บรรทัด ปลายเริ่มที่ 0 — ลากจุดสีฟ้าไปที่ปลายอีกข้างของดินสอ ตรงเลข 7',
      visual: { component: 'NumberLine', config: { min: 0, max: 10, step: 1, initialValue: 0, targetValue: 7 } },
      goal: { type: 'reach-value', key: 'value', value: 7 },
      hint: 'ลากจุดสีฟ้าไปหยุดที่ขีดเลข 7 = ดินสอยาว 7 เซนติเมตร',
    },
    {
      id: 'cm-to-m',
      say: 'หน่วยใหญ่ขึ้น: 1 เมตร = 100 เซนติเมตร เหมือนกระเบื้อง 100 แผ่นต่อกันยาว 1 เมตร',
      visual: { component: 'NumberLine', config: { min: 0, max: 100, step: 10, initialValue: 100, readOnly: true } },
    },
    {
      id: 'convert-rule',
      say: 'เคล็ดลับแปลงหน่วย: หน่วยใหญ่ → เล็ก ให้ "คูณ" · หน่วยเล็ก → ใหญ่ ให้ "หาร" เช่น 2 เมตร = 2 × 100 = 200 ซม.',
      visual: { component: 'NumberLine', config: { min: 0, max: 300, step: 50, initialValue: 200, readOnly: true } },
    },
    {
      id: 'measure-eraser',
      say: 'ลองวัดยางลบเอง — ลากไปที่ 3 เซนติเมตร',
      visual: { component: 'NumberLine', config: { min: 0, max: 10, step: 1, initialValue: 0, targetValue: 3 } },
      goal: { type: 'reach-value', key: 'value', value: 3 },
      hint: 'ลากจุดไปหยุดที่เลข 3',
    },
    {
      id: 'check',
      say: 'ลองแปลงหน่วยตอบดู',
      visual: { component: 'NumberLine', config: { min: 0, max: 300, step: 50, initialValue: 0, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'fill', q: '2 เมตร = ___ เซนติเมตร', ans: '200', hint: '1 ม. = 100 ซม. → 2 × 100' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป: 1 ซม. = 10 มม. · 1 ม. = 100 ซม. · 1 กม. = 1,000 ม. · ใหญ่→เล็ก คูณ, เล็ก→ใหญ่ หาร 📐',
      visual: { component: 'NumberLine', config: { min: 0, max: 10, step: 1, initialValue: 5, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '2 เมตร = ___ เซนติเมตร', ans: '200', hint: '1 ม. = 100 ซม. → คูณ 100' },
    { type: 'mc', q: '1 กิโลเมตร เท่ากับกี่เมตร?', opts: ['100', '500', '1,000', '10,000'], ans: 2, hint: 'กิโล = พัน' },
    { type: 'fill', q: 'เชือกยาว 350 ซม. = ___ เมตร 50 เซนติเมตร', ans: '3', hint: '350 ÷ 100 = 3 เหลือ 50' },
    { type: 'fill', q: '1 เซนติเมตร = ___ มิลลิเมตร', ans: '10', hint: 'ซม. → มม. คูณ 10' },
    { type: 'mc', q: '5 เมตร = กี่เซนติเมตร?', opts: ['50', '500', '5,000', '0.05'], ans: 1, hint: '5 × 100' },
    { type: 'slider', q: 'ดินสอยาว 8 ซม. = กี่มิลลิเมตร? (ลากหา)', min: 0, max: 100, step: 10, ans: 80, unit: 'มม.', hint: '8 × 10' },
    { type: 'fill', q: '300 เซนติเมตร = ___ เมตร', ans: '3', hint: '300 ÷ 100' },
    { type: 'mc', q: 'หน่วยใดยาวที่สุด?', opts: ['มิลลิเมตร', 'เซนติเมตร', 'เมตร', 'กิโลเมตร'], ans: 3, hint: 'กิโลเมตรใหญ่สุด' },
    { type: 'fill', q: 'วิ่ง 2 กิโลเมตร = ___ เมตร', ans: '2000', hint: '2 × 1,000' },
    { type: 'mc', q: 'โต๊ะยาว 150 ซม. เท่ากับกี่เมตร?', opts: ['1.5 เมตร', '15 เมตร', '0.15 เมตร', '1,500 เมตร'], ans: 0, hint: '150 ÷ 100 = 1.5' },
  ],
}

export default length
