import type { ChapterV2 } from '@/types/curriculum'

const parallelLines: ChapterV2 = {
  version: 2,
  id: 'math-5-parallel',
  subject: 'math',
  grade: 5,
  chapter: 3,
  title: 'เส้นขนาน',
  icon: '🛤️',
  slug: 'parallel-lines',
  scenes: [
    {
      id: 'intro',
      say: 'เส้นขนานคือเส้น 2 เส้นที่ไปทางเดียวกัน ห่างเท่ากันตลอด ไม่มีวันตัดกัน เช่น รางรถไฟ',
      visual: { component: 'ParallelLines', config: { initialAngle: 0, readOnly: true } },
    },
    {
      id: 'tilt',
      say: 'ถ้าเส้นเอียงนิดเดียว มันจะไม่ขนานแล้ว — ยืดออกไปจะมาตัดกัน ลองปรับให้กลับมาขนานสิ',
      visual: { component: 'ParallelLines', config: { initialAngle: 18 } },
      goal: { type: 'reach-value', key: 'parallel', value: 1 },
      hint: 'กดปุ่ม "ทำให้ขนาน" หรือเอียงจนตรง — เส้นจะห่างเท่ากันตลอด',
    },
    {
      id: 'perpendicular',
      say: 'ถ้าเส้น 2 เส้นตัดกันเป็นมุม 90° พอดี เรียกว่า "ตั้งฉาก" (ไม่ใช่ขนาน) เช่น มุมห้อง',
      visual: { component: 'ParallelLines', config: { initialAngle: 90, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เส้น 2 เส้นตัดกันเป็นมุม 90° เรียกว่าเส้นอะไร?', opts: ['ตั้งฉาก', 'ขนาน', 'โค้ง', 'ทแยง'], ans: 0, hint: 'มุม 90° = มุมฉาก = ตั้งฉาก' },
      },
    },
    {
      id: 'quiz',
      say: 'ลองคิดดู! ข้อใดเป็นเส้นขนานในชีวิตจริง?',
      visual: { component: 'ParallelLines', config: { initialAngle: 0, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ข้อใดเป็นเส้นขนาน?', opts: ['รางรถไฟ', 'เข็มนาฬิกา', 'มุมห้อง', 'ใบพัดลม'], ans: 0, hint: '2 เส้นห่างเท่ากันตลอด ไม่ตัดกัน' },
      },
    },
    {
      id: 'parallel-distance',
      say: 'ไม่ว่าจะวัดตรงไหนบนเส้นขนาน ระยะห่างระหว่างเส้นจะเท่ากันเสมอ นั่นแหละคือนิยามเส้นขนาน',
      visual: { component: 'ParallelLines', config: { initialAngle: 0, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ระยะห่างของเส้นขนาน 2 เส้น เป็นอย่างไร?', opts: ['เท่ากันตลอด', 'แคบลงเรื่อยๆ', 'กว้างขึ้นเรื่อยๆ', 'ขึ้นอยู่กับตำแหน่ง'], ans: 0, hint: 'นิยามเส้นขนาน = ระยะห่างเท่ากันทุกจุด' },
      },
    },
    {
      id: 'parallel-vs-cross',
      say: 'เส้นที่ไม่ขนานกันจะตัดกันมีจุดตัด 1 จุด แต่เส้นขนานไม่มีจุดตัดเลยแม้ยืดออกไปไม่รู้จบ',
      visual: { component: 'ParallelLines', config: { initialAngle: 30, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เส้นที่ไม่ขนานกัน ถ้ายืดออกไปจะเกิดอะไร?', opts: ['ตัดกันที่จุดหนึ่ง', 'ไม่ตัดกัน', 'วนเป็นวงกลม', 'กลายเป็นขนาน'], ans: 0, hint: 'ไม่ขนาน = มีจุดตัด 1 จุด' },
      },
    },
    {
      id: 'parallel-quiz',
      say: 'เส้นขนาน = ไม่ตัดกันเลยไม่ว่าจะยืดออกไปไกลแค่ไหน ระยะห่างเท่ากันตลอด',
      visual: { component: 'ParallelLines', config: { initialAngle: 0, readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'เส้นขนานคือเส้นที่...', opts: ['ตัดกันที่จุดหนึ่ง', 'มีระยะห่างเท่ากันตลอดไม่ตัดกัน', 'ยาวเท่ากัน', 'สั้นกว่ากัน'], ans: 1, hint: 'ระยะห่างเท่ากัน ไม่ตัดกัน' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ขนาน ∥ = ไม่ตัดกัน ห่างเท่ากันตลอด · ตั้งฉาก = ตัดกันเป็นมุม 90°',
      visual: { component: 'ParallelLines', config: { initialAngle: 0, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'เส้นขนานคือเส้นที่...?', opts: ['ตัดกันที่มุม 90°', 'ไม่ตัดกันเลย', 'ตัดกันตรงกลาง', 'โค้งเข้าหากัน'], ans: 1, hint: 'รางรถไฟไม่เคยมาเจอกัน' },
    { type: 'mc', q: 'ข้อใดเป็นเส้นขนานในชีวิตจริง?', opts: ['เข็มนาฬิกา', 'รางรถไฟ', 'มุมห้อง', 'ใบพัดลม'], ans: 1, hint: '2 เส้นห่างเท่ากันตลอด' },
    { type: 'fill', q: 'เส้นที่ตัดกันเป็นมุม 90° เรียกว่าเส้นตั้ง___', ans: 'ฉาก', hint: 'ตั้งฉาก = perpendicular' },
    { type: 'mc', q: 'เส้นขนานห่างกันอย่างไร?', opts: ['ห่างเท่ากันตลอด', 'ห่างขึ้นเรื่อยๆ', 'แคบลงเรื่อยๆ', 'ไม่แน่นอน'], ans: 0, hint: 'นิยามเส้นขนาน' },
    { type: 'mc', q: 'เส้นขนาน 2 เส้น ยืดออกไปไม่จำกัด จะเกิดอะไรขึ้น?', opts: ['ตัดกันที่ปลาย', 'ไม่ตัดกันเลย', 'ตัดกันตรงกลาง', 'วนเป็นวงกลม'], ans: 1, hint: 'ขนาน = ไม่มีวันตัดกัน' },
    { type: 'mc', q: 'สัญลักษณ์ ∥ หมายถึงอะไร?', opts: ['ขนาน', 'ตั้งฉาก', 'เท่ากับ', 'ตัดกัน'], ans: 0, hint: 'เส้น 2 เส้นข้างกัน' },
    { type: 'mc', q: 'มุมระหว่างเส้นตั้งฉากเท่าไร?', opts: ['45°', '90°', '180°', '0°'], ans: 1, hint: 'ตั้งฉาก = มุมฉาก' },
    { type: 'mc', q: 'เส้นขนานจะตัดกันเมื่อใด?', opts: ['ไม่ตัดเลย', 'ยืดไกลพอ', 'เมื่อเอียง', 'ตอนกลางคืน'], ans: 0, hint: 'ขนาน = ไม่มีวันตัด' },
    { type: 'mc', q: 'ขั้นบันไดแต่ละขั้นเป็นเส้น...กัน?', opts: ['ขนาน', 'ตัด', 'โค้ง', 'ตั้งฉาก'], ans: 0, hint: 'ห่างเท่ากันทุกขั้น' },
    { type: 'mc', q: 'เครื่องหมาย + (บวก) เส้นสองเส้น...กัน?', opts: ['ตั้งฉาก', 'ขนาน', 'โค้ง', 'ห่างกัน'], ans: 0, hint: 'ตัดกันเป็นมุม 90°' },
  ],
}

export default parallelLines
