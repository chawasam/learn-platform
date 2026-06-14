import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 2 ตัวประกอบ ห.ร.ม. ค.ร.น. (ref: p6-c02)
const factors: ChapterV2 = {
  version: 2,
  id: 'math-6-factors',
  subject: 'math',
  grade: 6,
  chapter: 2,
  title: 'ตัวประกอบ ห.ร.ม. ค.ร.น.',
  icon: '🧱',
  slug: 'factors',
  scenes: [
    {
      id: 'factors12',
      say: 'ตัวประกอบ = จำนวนที่หาร 12 ลงตัว ลองแตะหาให้ครบทุกตัว!',
      visual: { component: 'FactorBuilder', config: { n: 12 } },
      goal: { type: 'reach-value', key: 'complete', value: 1 },
      hint: 'ตัวประกอบ 12 = 1, 2, 3, 4, 6, 12',
    },
    {
      id: 'factors18',
      say: 'คราวนี้หาตัวประกอบของ 18 ให้ครบสิ — เทียบกับ 12 ว่าตัวไหนซ้ำกัน',
      visual: { component: 'FactorBuilder', config: { n: 18 } },
      goal: { type: 'reach-value', key: 'complete', value: 1 },
      hint: 'ตัวประกอบ 18 = 1, 2, 3, 6, 9, 18',
    },
    {
      id: 'hcf-discover',
      say: '12 = {1,2,3,4,6,12} · 18 = {1,2,3,6,9,18} ตัวที่ซ้ำกัน = 1, 2, 3, 6 — ตัวที่ใหญ่สุดที่ร่วมกันเรียกว่า ห.ร.ม.',
      visual: { component: 'FactorBuilder', config: { n: 12, readOnly: true } },
    },
    {
      id: 'hcf-quiz',
      say: 'ห.ร.ม.(12,18) = 6 เพราะ 6 คือตัวหารร่วมที่ใหญ่สุด',
      visual: { component: 'FactorBuilder', config: { n: 12, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ห.ร.ม. ของ 12 และ 18 คือ?', opts: ['2', '3', '6', '36'], ans: 2, hint: 'ตัวหารร่วมที่ใหญ่สุด' },
      },
    },
    {
      id: 'lcm',
      say: 'ค.ร.น. = จำนวนแรกที่หารลงตัวทั้งคู่ พหุคูณ 4 = {4,8,12,...} พหุคูณ 6 = {6,12,...} เจอกันที่ 12 ก่อน',
      visual: { component: 'FactorBuilder', config: { n: 12, readOnly: true } },
    },
    {
      id: 'lcm-quiz',
      say: 'ค.ร.น.(4,6) = 12 เพราะ 12 หาร 4 ได้ (12÷4=3) และ 12 หาร 6 ได้ (12÷6=2)',
      visual: { component: 'FactorBuilder', config: { n: 12, readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ค.ร.น. ของ 4 และ 6 คือ?', opts: ['12', '24', '2', '10'], ans: 0, hint: '4,8,12... 6,12... เจอกันที่ 12' },
      },
    },
    {
      id: 'word-problem',
      say: 'ไฟวาบทุก 4 วินาที และ 6 วินาที จะวาบพร้อมกันอีกที่วินาทีที่เท่าไร? (ค.ร.น. ช่วยตอบ)',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'พหุคูณ 4: 4, 8, 12, 16, 20, 24 ... · พหุคูณ 6: 6, 12, 18, 24 ... เจอกันครั้งแรกที่ ?',
          words: [{ text: '4, 8, 12', color: '#FF7A2F', bold: true }, { text: '6, 12', color: '#4F80FF', bold: true }],
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ไฟวาบทุก 4 วินาที และ 6 วินาที วาบพร้อมกันอีกที่วินาทีที่เท่าไร?', opts: ['24 วินาที', '12 วินาที', '10 วินาที', '8 วินาที'], ans: 1, hint: 'ค.ร.น.(4,6) = 12 วินาที' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ตัวประกอบ = หารลงตัว · ห.ร.ม. = ตัวหารร่วมที่มากสุด (แบ่งของลงตัว) · ค.ร.น. = ตัวคูณร่วมที่น้อยสุด (รอบที่มาเจอกัน)',
      visual: { component: 'FactorBuilder', config: { n: 12, readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'ห.ร.ม. ของ 12 และ 18 คือ?', opts: ['2', '3', '6', '36'], ans: 2, hint: 'ตัวหารร่วมที่ใหญ่สุด' },
    { type: 'fill', q: 'ห.ร.ม. ของ 24 และ 36 = ___', ans: '12', hint: 'ตัวหาร 24={1,2,3,4,6,8,12,24} 36={1,2,3,4,6,9,12,18,36} ร่วมมาก=12' },
    { type: 'fill', q: 'ค.ร.น. ของ 4 และ 6 = ___', ans: '12', hint: '4,8,12... 6,12 เจอที่ 12' },
    { type: 'fill', q: 'ค.ร.น. ของ 8 และ 12 = ___', ans: '24', hint: '8,16,24... 12,24 เจอที่ 24' },
    { type: 'mc', q: 'ห.ร.ม. ของ 30 และ 45 คือ?', opts: ['5', '9', '15', '6'], ans: 2, hint: 'ตัวหาร 30 และ 45 ที่ใหญ่สุดที่ร่วมกัน = 15' },
    { type: 'fill', q: 'ค.ร.น. ของ 6 และ 9 = ___', ans: '18', hint: '6,12,18... 9,18 เจอที่ 18' },
    { type: 'mc', q: 'ค.ร.น. ของ 3 และ 5 คือ?', opts: ['15', '8', '30', '5'], ans: 0, hint: '3,6,9,12,15... 5,10,15' },
    { type: 'mc', q: 'ตัวประกอบของ 8 มีกี่ตัว? (1,2,4,8)', opts: ['3', '4', '5', '8'], ans: 1, hint: 'นับ 1,2,4,8' },
    { type: 'mc', q: 'ห.ร.ม. ของ 16 และ 24 คือ?', opts: ['4', '6', '8', '12'], ans: 2, hint: 'ตัวหาร 16={1,2,4,8,16} 24={1,2,3,4,6,8,12,24} ร่วมมาก=8' },
    { type: 'mc', q: 'ห.ร.ม. ใช้ทำอะไร?', opts: ['แบ่งของให้ลงตัวพอดี', 'หารอบที่มาเจอกัน', 'บวกเลข', 'วัดมุม'], ans: 0, hint: 'ตัวหารร่วม = แบ่งลงตัว' },
  ],
}

export default factors
