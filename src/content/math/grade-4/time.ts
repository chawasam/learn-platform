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
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เข็มสั้นชี้ 3 เข็มยาวชี้ 12 หมายถึงเวลาใด?', opts: ['3 โมงตรง (03:00)', '12 โมงตรง', '3:15', '3:30'], ans: 0, hint: 'เข็มยาวชี้ 12 = ตรงพอดี' },
      },
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
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เข็มยาวชี้เลข 6 = ผ่านไปกี่นาที?', opts: ['30 นาที', '6 นาที', '60 นาที', '15 นาที'], ans: 0, hint: 'เลข 6 อยู่ครึ่งหน้าปัด = 30 นาที' },
      },
    },
    {
      id: 'quarter',
      say: 'เข็มยาวชี้เลข 3 = ผ่านไป 15 นาที (เพราะแต่ละเลขห่างกัน 5 นาที 3×5=15) → 03:15',
      visual: { component: 'ClockDrag', config: { initialHour: 3, initialMinute: 15, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เข็มยาวชี้เลข 3 = ผ่านไปกี่นาที?', opts: ['15 นาที', '3 นาที', '30 นาที', '45 นาที'], ans: 0, hint: 'แต่ละเลขห่าง 5 นาที 3×5=15' },
      },
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
    { type: 'fill', q: '2 ชั่วโมง 45 นาที = ___ นาที', ans: '165', hint: '2×60+45 = 120+45' },
    { type: 'mc', q: 'เข็มยาวชี้เลข 6 หมายถึงกี่นาที?', opts: ['6 นาที', '15 นาที', '30 นาที', '60 นาที'], ans: 2, hint: 'ครึ่งหน้าปัด = ครึ่งชั่วโมง' },
    { type: 'fill', q: 'ประชุมเริ่ม 09:30 น. นาน 2 ชั่วโมง 45 นาที จบเวลา ___', ans: '12:15', hint: '09:30 + 2ชม. = 11:30, 11:30 + 45 นาที = 12:15' },
    { type: 'mc', q: 'เข็มยาวชี้เลข 3 หมายถึงกี่นาที?', opts: ['3 นาที', '15 นาที', '30 นาที', '45 นาที'], ans: 1, hint: 'แต่ละเลขห่าง 5 นาที 3×5=15' },
    { type: 'fill', q: '3 ชั่วโมง 20 นาที = ___ นาที', ans: '200', hint: '3×60+20 = 180+20' },
    { type: 'fill', q: 'นักเรียนออกจากบ้าน 07:45 น. ถึงโรงเรียน 08:20 น. ใช้เวลาเดินทางกี่นาที?', ans: '35', hint: '07:45 ถึง 08:00 = 15 นาที, 08:00 ถึง 08:20 = 20 นาที, รวม 35 นาที' },
    { type: 'slider', q: 'เข็มยาวชี้เลข 9 = กี่นาที?', min: 0, max: 60, step: 5, ans: 45, unit: 'นาที', hint: '9 × 5 = ?' },
    { type: 'mc', q: 'รถไฟออก 06:40 น. ถึงปลายทาง 11:10 น. ใช้เวลาเดินทางกี่นาที?', opts: ['250 นาที', '270 นาที', '280 นาที', '260 นาที'], ans: 1, hint: '06:40 ถึง 07:00 = 20 นาที, 07:00 ถึง 11:00 = 240 นาที, 11:00 ถึง 11:10 = 10 นาที รวม 270 นาที' },
    { type: 'mc', q: '2 ชั่วโมงครึ่ง = กี่นาที?', opts: ['120 นาที', '150 นาที', '130 นาที', '90 นาที'], ans: 1, hint: '2×60 + 30 = ?' },
    { type: 'mc', q: 'ฝึกซ้อมเริ่ม 14:30 น. สิ้นสุด 17:15 น. ฝึกซ้อมนานเท่าใด?', opts: ['2 ชั่วโมง 30 นาที', '2 ชั่วโมง 45 นาที', '3 ชั่วโมง', '3 ชั่วโมง 15 นาที'], ans: 1, hint: '14:30 ถึง 17:30 = 3 ชั่วโมง, ลบ 15 นาที = 2 ชั่วโมง 45 นาที' },
  ],
}

export default time
