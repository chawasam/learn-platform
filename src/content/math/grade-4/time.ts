import type { ChapterV2 } from '@/types/curriculum'

// เวลา ป.4 — story (curriculum ref: math-thai-p456 p4-c11)
// concrete: หมุนเข็มนาฬิกาจริง → เห็นความสัมพันธ์ชั่วโมง/นาที

const time: ChapterV2 = {
  version: 2,
  id: 'math-4-time',
  subject: 'math',
  grade: 4,
  chapter: 11,
  title: 'เวลา',
  icon: '🕐',
  slug: 'time',
  scenes: [
    {
      id: 'intro',
      say: 'นาฬิกามีเข็ม 2 อัน — เข็มสั้นบอก "ชั่วโมง" เข็มยาวบอก "นาที" ตอนนี้กี่โมงเอ่ย?',
      visual: { component: 'ClockDrag', config: { initialHour: 3, initialMinute: 0, readOnly: true } },
    },
    {
      id: 'three',
      say: 'เข็มสั้นชี้เลข 3 เข็มยาวชี้ 12 = "3 โมงตรง" เขียนเป็น 03:00',
      visual: { component: 'ClockDrag', config: { initialHour: 3, initialMinute: 0, readOnly: true } },
    },
    {
      id: 'try-spin',
      say: 'ลองจับเข็มหมุนเล่นดูสิ! ลากเข็มอันไหนก็ได้ ดูตัวเลขข้างล่างเปลี่ยนตาม',
      visual: { component: 'ClockDrag', config: { initialHour: 3, initialMinute: 0 } },
      goal: { type: 'interact' },
      hint: 'แตะที่เข็มแล้วลากหมุนเป็นวงกลม',
    },
    {
      id: 'half',
      say: 'เข็มยาวเดินครึ่งรอบ (ไปที่เลข 6) = ผ่านไป 30 นาที เพราะ 1 ชั่วโมงมี 60 นาที ครึ่งหนึ่งคือ 30',
      visual: { component: 'ClockDrag', config: { initialHour: 3, initialMinute: 30, readOnly: true } },
    },
    {
      id: 'quarter',
      say: 'เข็มยาวชี้เลข 3 = ผ่านไป 15 นาที (เพราะแต่ละเลขห่างกัน 5 นาที 3×5=15) → 03:15',
      visual: { component: 'ClockDrag', config: { initialHour: 3, initialMinute: 15, readOnly: true } },
    },
    {
      id: 'check',
      say: 'ดูนาฬิกานี้ — เข็มยาวชี้เลข 6 พอดี ลองตอบดูว่ากี่นาที',
      visual: { component: 'ClockDrag', config: { initialHour: 6, initialMinute: 30, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เข็มยาวชี้เลข 6 หมายถึงกี่นาที?', opts: ['6 นาที', '15 นาที', '30 นาที', '60 นาที'], ans: 2, hint: 'เลข 6 อยู่ครึ่งหน้าปัด = ครึ่งชั่วโมง = 30 นาที' },
      },
    },
    {
      id: 'recap',
      say: 'จำง่ายๆ: 1 ชั่วโมง = 60 นาที · เข็มยาวเดินรอบ = 1 ชั่วโมง · แต่ละเลขห่างกัน 5 นาที',
      visual: { component: 'ClockDrag', config: { initialHour: 12, initialMinute: 0, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '1 ชั่วโมง = ___ นาที', ans: '60', hint: 'เข็มยาวเดินครบรอบ = 60 นาที' },
    { type: 'mc', q: 'เข็มยาวชี้เลข 6 หมายถึงกี่นาที?', opts: ['6 นาที', '15 นาที', '30 นาที', '60 นาที'], ans: 2, hint: 'ครึ่งหน้าปัด = ครึ่งชั่วโมง' },
    { type: 'fill', q: 'ดูหนังเริ่ม 2 โมง ยาว 2 ชั่วโมง จบ ___ โมง', ans: '4', hint: '2 + 2 = ?' },
    { type: 'mc', q: 'เข็มยาวชี้เลข 3 หมายถึงกี่นาที?', opts: ['3 นาที', '15 นาที', '30 นาที', '45 นาที'], ans: 1, hint: 'แต่ละเลขห่าง 5 นาที 3×5=15' },
    { type: 'fill', q: 'ครึ่งชั่วโมง = ___ นาที', ans: '30', hint: 'ครึ่งของ 60' },
    { type: 'mc', q: '03:00 อ่านว่าอะไร?', opts: ['สามโมงตรง', 'สามโมงครึ่ง', 'สามโมงสิบห้า', 'สามนาที'], ans: 0, hint: 'เข็มยาวที่ 12 = ตรงเป๊ะ' },
    { type: 'slider', q: 'เข็มยาวชี้เลข 9 = กี่นาที?', min: 0, max: 60, step: 5, ans: 45, unit: 'นาที', hint: '9 × 5 = ?' },
    { type: 'fill', q: 'เรียนเริ่ม 9 โมงเช้า เลิกเที่ยงวัน (12 โมง) เรียนกี่ชั่วโมง?', ans: '3', hint: '12 − 9 = ?' },
    { type: 'mc', q: '2 ชั่วโมงครึ่ง = กี่นาที?', opts: ['120 นาที', '150 นาที', '130 นาที', '90 นาที'], ans: 1, hint: '2×60 + 30 = ?' },
    { type: 'mc', q: 'ดูการ์ตูนเริ่ม 9 โมงเช้า จบ 11 โมงเช้า ดูไปกี่ชั่วโมง?', opts: ['2', '1', '3', '20'], ans: 0, hint: '11 − 9 = ?' },
  ],
}

export default time
