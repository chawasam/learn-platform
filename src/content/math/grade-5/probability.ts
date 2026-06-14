import type { ChapterV2 } from '@/types/curriculum'

const probability: ChapterV2 = {
  version: 2,
  id: 'math-5-probability',
  subject: 'math',
  grade: 5,
  chapter: 4,
  title: 'สถิติและความน่าจะเป็น',
  icon: '🎲',
  slug: 'probability',
  scenes: [
    {
      id: 'intro',
      say: 'ในถุงมีลูกบอล 3 สี แดง 5 น้ำเงิน 3 เขียว 2 รวม 10 ลูก — ดูสัดส่วนในถุง สีไหนมีมากสุด?',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
      revealAfterGoal: false,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สีไหนมีลูกมากสุดในถุง?', opts: ['แดง', 'น้ำเงิน', 'เขียว', 'เท่ากันหมด'], ans: 0, hint: 'แดง 5 น้ำเงิน 3 เขียว 2' },
      },
    },
    {
      id: 'draw',
      say: 'หยิบสุ่มหลายๆ ครั้งดู — สีที่มีลูกเยอะจะออกบ่อยกว่าไหม? ลองหยิบ 5 ครั้งขึ้นไป',
      visual: { component: 'ProbabilityBag', config: {} },
      goal: { type: 'reach-value', key: 'draws', value: 5 },
      hint: 'กดปุ่ม "หยิบ 1 ลูก" อย่างน้อย 5 ครั้ง',
    },
    {
      id: 'chance',
      say: 'เห็นแล้วใช่ไหม! แดงมี 5/10 ออกบ่อยสุด เขียวมี 2/10 ออกน้อยสุด — ลูกเยอะกว่า = โอกาสออกมากกว่า',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'หยิบ 1 ลูก โอกาสได้สีใดมากที่สุด?', opts: ['แดง', 'น้ำเงิน', 'เขียว', 'เท่ากันหมด'], ans: 0, hint: 'สีไหนมีลูกเยอะสุด' },
      },
    },
    {
      id: 'prob-fraction',
      say: 'ความน่าจะเป็น = จำนวนลูกที่ต้องการ ÷ ลูกทั้งหมด เช่น แดง 5 ลูก จาก 10 ลูก = 5/10 = 1/2',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ถุงมีแดง 3 น้ำเงิน 2 รวม 5 ลูก ความน่าจะเป็นหยิบได้แดง = ?', opts: ['3/5', '2/5', '1/5', '5/3'], ans: 0, hint: 'แดง 3 จากทั้งหมด 5' },
      },
    },
    {
      id: 'prob-certain',
      say: 'ความน่าจะเป็น = 1 หมายถึงแน่นอน 100% (มีแต่สีนั้นเลย) · = 0 หมายถึงเป็นไปไม่ได้ (ไม่มีสีนั้นในถุง)',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ถุงมีลูกแดงล้วน 4 ลูก หยิบ 1 ลูก ความน่าจะเป็นได้แดง = ?', opts: ['0', '1/2', '1', '1/4'], ans: 2, hint: 'มีแต่แดงเลย = แน่นอน 100% = 1' },
      },
    },
    {
      id: 'prob-quiz',
      say: 'ถุงมีแดง 3 ลูก จากทั้งหมด 4 ลูก → ความน่าจะเป็น = 3/4',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ถุงมีลูกบอล 4 ลูก สีแดง 3 ลูก สีน้ำเงิน 1 ลูก ความน่าจะเป็นหยิบสีแดง = ?', opts: ['1/4', '3/4', '1/3', '3/1'], ans: 1, hint: 'แดง 3 ลูก รวม 4 ลูก = 3/4' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 ความน่าจะเป็น = สิ่งที่ต้องการ ÷ ทั้งหมด · ค่า 0 = ไม่มีทาง · ค่า 1 = แน่นอน · ของมาก = โอกาสมาก',
      visual: { component: 'ProbabilityBag', config: { readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'ถุงมีบอลแดง 5 น้ำเงิน 3 เขียว 2 หยิบ 1 ลูก โอกาสได้สีใดมากสุด?', opts: ['แดง', 'น้ำเงิน', 'เขียว', 'เท่ากันหมด'], ans: 0, hint: 'สีไหนเยอะสุด' },
    { type: 'fill', q: 'ถุงมีบอล 6 ลูก แดง 2 ลูก ความน่าจะเป็นได้แดง = 2 ส่วน ___', ans: '6', hint: '2 จากทั้งหมด 6' },
    { type: 'mc', q: 'โยนเหรียญ 1 ครั้ง มีกี่ผลที่เป็นไปได้?', opts: ['1', '2', '3', '6'], ans: 1, hint: 'หัว หรือ ก้อย' },
    { type: 'mc', q: 'ถุงมีบอลแดงล้วน 8 ลูก หยิบ 1 ลูก ความน่าจะเป็นได้แดงเท่าไร?', opts: ['0', '1/2', '1', '1/8'], ans: 2, hint: 'มีแต่แดง = แน่นอน 100% = 1' },
    { type: 'mc', q: 'ถุงมีบอล 4 ลูก แดง 3 น้ำเงิน 1 ความน่าจะเป็นได้น้ำเงิน = ?', opts: ['3/4', '1/4', '1/3', '1/2'], ans: 1, hint: 'น้ำเงิน 1 จาก 4 = 1/4' },
    { type: 'fill', q: 'บอล 10 ลูก เขียว 4 ลูก ความน่าจะเป็นได้เขียว = 4 ส่วน ___', ans: '10', hint: '4 จากทั้งหมด 10' },
    { type: 'mc', q: 'โอกาสได้สีที่มีลูกน้อยสุดเป็นอย่างไร?', opts: ['น้อยสุด', 'มากสุด', 'เท่ากัน', 'เป็นไปไม่ได้'], ans: 0, hint: 'ของน้อย = โอกาสน้อย' },
    { type: 'mc', q: 'ถุงมีแดง 2 น้ำเงิน 2 หยิบ 1 ลูก โอกาสแต่ละสี?', opts: ['เท่ากัน', 'แดงมากกว่า', 'น้ำเงินมากกว่า', 'บอกไม่ได้'], ans: 0, hint: 'จำนวนเท่ากัน' },
    { type: 'mc', q: 'ถุงมีลูก 5 ลูก ได้น้ำเงิน 0 ลูก ความน่าจะเป็นได้น้ำเงิน = ?', opts: ['0', '1/5', '1', '5/5'], ans: 0, hint: 'ไม่มีน้ำเงินเลย = 0' },
    { type: 'fill', q: 'บอล 8 ลูก แดง 4 ลูก ความน่าจะเป็นได้แดง = 4/8 = ลดรูปเป็น 1/___', ans: '2', hint: '4/8 หารบนล่างด้วย 4 = 1/2' },
  ],
}

export default probability
