import type { ChapterV2 } from '@/types/curriculum'

// ทศนิยม ป.4 — story (curriculum ref: math-thai-p456 p4-c12)
// concrete: แท่ง 10 ช่อง 1 ช่อง = 0.1 → ทศนิยมกับเศษส่วนคือเรื่องเดียวกัน

const decimals: ChapterV2 = {
  version: 2,
  id: 'math-4-decimals',
  subject: 'math',
  grade: 4,
  chapter: 12,
  title: 'ทศนิยม',
  icon: '🔟',
  slug: 'decimals',
  scenes: [
    {
      id: 'intro',
      say: 'บางอย่างไม่เต็มหน่วยพอดี เช่น เงิน 2.50 บาท หรือส่วนสูง 1.5 เมตร — เราใช้ "ทศนิยม" เขียนเศษที่เหลือ',
      visual: { component: 'FractionBars', config: { readOnly: true, showLabels: true, rows: [{ parts: 10, filled: 0, fixed: true, color: '#F59E0B' }] } },
    },
    {
      id: 'ten-pieces',
      say: 'แบ่งแท่ง 1 อันเป็น 10 ช่องเท่ากัน — แต่ละช่องคือ "หนึ่งส่วนสิบ" เขียนเป็น 0.1',
      visual: { component: 'FractionBars', config: { readOnly: true, showLabels: true, rows: [{ parts: 10, filled: 1, fixed: true, color: '#F59E0B' }] } },
    },
    {
      id: 'make-03',
      say: 'ลองระบายให้ได้ 0.3 — แตะแท่งให้เต็ม 3 ช่อง (3 ในสิบส่วน)',
      visual: { component: 'FractionBars', config: { showLabels: true, rows: [{ parts: 10, filled: 0, color: '#F59E0B' }] } },
      goal: { type: 'reach-value', key: 'r0', value: 3 },
      hint: 'แตะช่องที่ 3 ของแท่ง → ระบาย 3 ช่อง = 0.3 = 3/10',
    },
    {
      id: 'half',
      say: 'ระบาย 5 ช่อง = 0.5 = 5/10 = ครึ่งหนึ่งพอดี! ทศนิยมกับเศษส่วนคือเรื่องเดียวกัน',
      visual: { component: 'FractionBars', config: { readOnly: true, showLabels: true, rows: [{ parts: 10, filled: 5, fixed: true, color: '#F59E0B' }] } },
    },
    {
      id: 'make-07',
      say: 'ลองทำ 0.7 ดู — ระบาย 7 ช่อง',
      visual: { component: 'FractionBars', config: { showLabels: true, rows: [{ parts: 10, filled: 0, color: '#F59E0B' }] } },
      goal: { type: 'reach-value', key: 'r0', value: 7 },
      hint: 'แตะช่องที่ 7 → 0.7 = 7/10',
    },
    {
      id: 'compare',
      say: 'เทียบทศนิยม: ดูว่าแท่งไหนระบายยาวกว่า 0.7 ระบายมากกว่า 0.5 → 0.7 มากกว่า',
      visual: { component: 'FractionBars', config: { readOnly: true, showLabels: true, rows: [{ parts: 10, filled: 7, fixed: true, color: '#F59E0B' }, { parts: 10, filled: 5, fixed: true, color: '#94A3B8' }] } },
    },
    {
      id: 'check',
      say: 'ลองตอบดู',
      visual: { component: 'FractionBars', config: { readOnly: true, showLabels: true, rows: [{ parts: 10, filled: 3, fixed: true, color: '#F59E0B' }] } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.5 เท่ากับเศษส่วนใด?', opts: ['5/100', '1/2', '1/5', '5/1'], ans: 1, hint: '0.5 = 5/10 ลดรูปเหลือ 1/2' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป: หลังจุดตัวแรก = ส่วนสิบ (เศษส่วน /10) · 0.5 = 5/10 = ครึ่ง · เทียบทศนิยม = เทียบความยาวแท่ง 🔟',
      visual: { component: 'FractionBars', config: { readOnly: true, showLabels: true, rows: [{ parts: 10, filled: 5, fixed: true, color: '#F59E0B' }] } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '0.5 เท่ากับเศษส่วนใด?', opts: ['5/100', '1/2', '1/5', '5/1'], ans: 1, hint: '0.5 = 5/10 ลดรูป' },
    { type: 'fill', q: 'เขียน 3/10 เป็นทศนิยม = ___', ans: '0.3', hint: 'ส่วน 10 → หลังจุด 1 ตัว' },
    { type: 'mc', q: 'ตัวเลขใดมากกว่า 0.7?', opts: ['0.5', '0.69', '0.8', '0.07'], ans: 2, hint: 'เทียบหลักหลังจุด' },
    { type: 'fill', q: 'ระบาย 9 ช่องจาก 10 = 0.___', ans: '9', hint: '9/10 = 0.9' },
    { type: 'mc', q: '7/10 เขียนเป็นทศนิยมคือ?', opts: ['0.07', '0.7', '7.0', '0.71'], ans: 1, hint: 'ส่วน 10 → หลังจุด 1 ตัว' },
    { type: 'slider', q: '0.6 = กี่ส่วนสิบ? (ลากหา)', min: 0, max: 10, step: 1, ans: 6, unit: '/10', hint: '0.6 = 6/10' },
    { type: 'mc', q: 'เงิน 2.50 บาท หมายถึง?', opts: ['2 บาทครึ่ง', '25 บาท', '2 บาท 5 สตางค์', '250 บาท'], ans: 0, hint: '0.50 = ครึ่งบาท' },
    { type: 'fill', q: '0.1 + 0.1 + 0.1 = 0.___', ans: '3', hint: 'นับช่องรวมกัน 3 ช่อง' },
    { type: 'mc', q: 'เรียงจากน้อยไปมาก: 0.3, 0.8, 0.1 ตัวมากสุด?', opts: ['0.3', '0.8', '0.1', 'เท่ากัน'], ans: 1, hint: 'แท่งไหนระบายเยอะสุด' },
    { type: 'fill', q: '1.0 = ระบายเต็มกี่ช่องจาก 10?', ans: '10', hint: 'เต็มแท่ง = 10/10 = 1' },
  ],
}

export default decimals
