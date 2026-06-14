import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 13 สถิติและความน่าจะเป็น (ref: p6-c13) — ค่าเฉลี่ย + ความน่าจะเป็น
const statistics: ChapterV2 = {
  version: 2,
  id: 'math-6-statistics',
  subject: 'math',
  grade: 6,
  chapter: 13,
  title: 'สถิติและความน่าจะเป็น',
  icon: '🎲',
  slug: 'statistics',
  scenes: [
    {
      id: 'average',
      say: 'ค่าเฉลี่ย = ผลรวมทั้งหมด ÷ จำนวนข้อมูล เช่น คะแนน 8, 6, 10 → (8+6+10) ÷ 3 = 8',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'คะแนน 8, 6, 10 → ผลรวม = 24 ÷ 3 ตัว = ค่าเฉลี่ย 8',
          words: [
            { text: '8+6+10 = 24', color: '#4F80FF', bold: true },
            { text: '÷ 3', color: '#FF7A2F', bold: true },
            { text: '= 8', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'คะแนน 8, 6, 10 ค่าเฉลี่ย = ?', opts: ['8', '24', '6', '10'], ans: 0, hint: '(8+6+10) ÷ 3' },
      },
    },
    {
      id: 'average2',
      say: 'ค่าเฉลี่ยเหมือนเทน้ำหลายแก้วให้เท่ากันทุกแก้ว ลองอีกข้อ',
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ข้อมูล 10, 20, 30, 40 ค่าเฉลี่ย = ?', opts: ['25', '100', '20', '30'], ans: 0, hint: '(10+20+30+40) ÷ 4 = 25' },
      },
    },
    {
      id: 'probability',
      say: 'ความน่าจะเป็น = จำนวนที่ต้องการ ÷ จำนวนทั้งหมด ลองหยิบลูกบอลดูว่าสีไหนออกบ่อย',
      visual: { component: 'ProbabilityBag', config: {} },
      goal: { type: 'reach-value', key: 'draws', value: 5 },
      hint: 'กดหยิบลูกบอลอย่างน้อย 5 ครั้ง — สังเกตว่าสีไหนออกบ่อย',
    },
    {
      id: 'dice',
      say: 'ลูกเต๋า 6 หน้า โอกาสออกเลขใดเลขหนึ่ง = 1 หน้า ÷ 6 หน้า = 1/6',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ลูกเต๋า 6 หน้า โอกาสออกเลข 3 = ?', opts: ['1/3', '1/6', '3/6', '1/2'], ans: 1, hint: '1 หน้าที่ต้องการ จาก 6' },
      },
    },
    {
      id: 'mean-median-mode',
      say: 'ค่าเฉลี่ย (Mean) = ผลรวม÷จำนวน · มัธยฐาน (Median) = ค่ากลางเมื่อเรียงลำดับ · ฐานนิยม (Mode) = ค่าที่ซ้ำบ่อยสุด',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'Mean: ผลรวม÷จำนวน | Median: ค่ากลางเมื่อเรียง | Mode: ค่าที่ซ้ำมากสุด',
          words: [
            { text: 'Mean', color: '#4F80FF', bold: true },
            { text: 'Median', color: '#FF7A2F', bold: true },
            { text: 'Mode', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ค่าสถิติใดคำนวณจากผลรวม ÷ จำนวนข้อมูล?', opts: ['ค่าเฉลี่ย (Mean)', 'มัธยฐาน (Median)', 'ฐานนิยม (Mode)', 'ช่วงข้อมูล'], ans: 0, hint: 'Mean = ผลรวม ÷ จำนวน' },
      },
    },
    {
      id: 'calculate-mean',
      say: 'ข้อมูล {4, 6, 8, 10, 12} ค่าเฉลี่ย = (4+6+8+10+12)÷5 = 40÷5 = 8',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '4+6+8+10+12 = 40 ÷ 5 ข้อมูล = 8',
          words: [
            { text: '40', color: '#4F80FF', bold: true },
            { text: '÷ 5', color: '#FF7A2F', bold: true },
            { text: '= 8', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ข้อมูล 4, 6, 8, 10, 12 ค่าเฉลี่ย = ?', opts: ['8', '6', '10', '40'], ans: 0, hint: '(4+6+8+10+12) ÷ 5 = 40 ÷ 5 = 8' },
      },
    },
    {
      id: 'stats-quiz',
      say: '7+5+8+6+4 = 30 หาร 5 ข้อมูล = 6 — ผลรวมทั้งหมด ÷ จำนวนข้อมูล เสมอ ไม่มีทางลัด',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'คะแนน 7, 5, 8, 6, 4 → ผลรวม = 30 ÷ 5 ตัว = 6',
          words: [
            { text: '30', color: '#4F80FF', bold: true },
            { text: '÷ 5', color: '#FF7A2F', bold: true },
            { text: '= 6', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'คะแนนสอบ: 7, 5, 8, 6, 4 ค่าเฉลี่ย = ?', opts: ['6', '7', '5', '30'], ans: 0, hint: '(7+5+8+6+4)÷5=30÷5=6' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ค่าเฉลี่ย = ผลรวม ÷ จำนวน · ความน่าจะเป็น = ที่ต้องการ ÷ ทั้งหมด',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'คะแนน 8, 6, 10 ค่าเฉลี่ย = ___', ans: '8', hint: '(8+6+10) ÷ 3' },
    { type: 'mc', q: 'ลูกเต๋า 6 หน้า โอกาสออกเลข 3 = ?', opts: ['1/3', '1/6', '3/6', '1/2'], ans: 1, hint: '1 หน้าที่ต้องการ จาก 6' },
    { type: 'fill', q: 'ข้อมูล 10, 20, 30, 40 ค่าเฉลี่ย = ___', ans: '25', hint: '(10+20+30+40) ÷ 4' },
    { type: 'mc', q: 'โยนเหรียญ โอกาสออกหัว = ?', opts: ['1/2', '1/6', '1/4', '1'], ans: 0, hint: '1 หัว จาก 2 หน้า' },
    { type: 'fill', q: 'ลูกเต๋า 6 หน้า โอกาสออกเลขคู่ (2,4,6) = 3/___', ans: '6', hint: '3 หน้า จาก 6' },
    { type: 'slider', q: 'ข้อมูล 6, 10, 14 ค่าเฉลี่ย = ?', min: 0, max: 20, step: 1, ans: 10, unit: '', hint: '(6+10+14) ÷ 3' },
    { type: 'mc', q: 'ถุงบอลแดง 5 ทั้งหมด 10 โอกาสได้แดง?', opts: ['5/10', '5/5', '10/5', '1/10'], ans: 0, hint: '5 ที่ต้องการ จาก 10' },
    { type: 'mc', q: 'คะแนนสอบ 7, 5, 8, 6, 4 ค่าเฉลี่ย = ?', opts: ['6', '7', '5', '30'], ans: 0, hint: '30÷5=6' },
    { type: 'fill', q: 'ข้อมูล 3, 5, 7, 9, 11 มัธยฐาน (ค่ากลาง) = ___', ans: '7', hint: 'เรียงแล้ว ค่ากลางตัวที่ 3 คือ 7' },
    { type: 'mc', q: 'ข้อมูล 2, 3, 3, 5, 6 ฐานนิยม (ค่าซ้ำบ่อยสุด) = ?', opts: ['3', '2', '5', '6'], ans: 0, hint: 'เลข 3 ซ้ำ 2 ครั้ง มากสุด' },
  ],
}

export default statistics
