import type { ChapterV2 } from '@/types/curriculum'

// การบวกและการลบ ป.4 — story (curriculum ref: math-thai-p456 p4-c02)
// หัวใจ: เห็น "การทด" เด้งขึ้นหลักถัดไป + "การยืม" จากหลักซ้าย ทีละหลัก

const addSub: ChapterV2 = {
  version: 2,
  id: 'math-4-add-sub',
  subject: 'math',
  grade: 4,
  chapter: 2,
  title: 'การบวกและการลบ',
  icon: '➕',
  slug: 'addition-subtraction',
  scenes: [
    {
      id: 'intro',
      say: 'บวกเลขหลายหลัก เราตั้งหลักให้ตรงกัน แล้วบวกทีละหลักจากขวาไปซ้าย',
      visual: {
        component: 'AddSubCarry',
        config: { a: 25, b: 18, op: '+', readOnly: true, initialStep: 0 },
      },
    },
    {
      id: 'add-units',
      say: 'ลองคิดดู! กดปุ่มบวกหลักหน่วยก่อน — 5 + 8 = 13 เกิน 9 ต้อง "ทด" 1 ขึ้นหลักสิบ',
      visual: {
        component: 'AddSubCarry',
        config: { a: 25, b: 18, op: '+' },
      },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'กด "บวกหลักถัดไป" จนครบทุกหลัก — หลักหน่วยได้ 3 ทด 1, หลักสิบ 2+1+1 = 4',
    },
    {
      id: 'carry-explain',
      say: 'เห็นไหม? 13 เขียน 3 ทด 1 ขึ้นหลักสิบ แล้ว 2 + 1 + 1(ทด) = 4 รวมเป็น 43',
      visual: {
        component: 'AddSubCarry',
        config: { a: 25, b: 18, op: '+', readOnly: true, initialStep: 2 },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '25 + 18 = ?', opts: ['43', '34', '42', '33'], ans: 0, hint: 'หน่วย 5+8=13 ทด 1 → สิบ 2+1+1=4 → ได้ 43' },
      },
    },
    {
      id: 'add-big',
      say: 'โจทย์ใหญ่ขึ้น! 3,250 + 1,470 — กดคิดให้ครบทุกหลัก ดูว่าตรงไหนต้องทด',
      visual: {
        component: 'AddSubCarry',
        config: { a: 3250, b: 1470, op: '+' },
      },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'หลักสิบ 5+7 = 12 ต้องทด ที่เหลือบวกปกติ → 4,720',
    },
    {
      id: 'sub-intro',
      say: 'การลบก็ตั้งหลักเหมือนกัน แต่ถ้าตัวบนน้อยกว่าตัวล่าง เราต้อง "ยืม" จากหลักซ้าย',
      visual: {
        component: 'AddSubCarry',
        config: { a: 52, b: 27, op: '-', readOnly: true, initialStep: 0 },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ลบ 52 − 27 หลักหน่วย 2 − 7 ลบไม่ได้ ต้องทำอะไร?', opts: ['ยืม 1 จากหลักสิบ', 'ทด 1 ขึ้นหลักสิบ', 'ยืม 1 จากหลักร้อย', 'ข้ามไปลบหลักสิบก่อน'], ans: 0, hint: 'ยืมจากหลักซ้าย (หลักสิบ) ให้หลักหน่วยมีพอลบ' },
      },
    },
    {
      id: 'sub-units',
      say: 'คิดหลักหน่วย: 2 − 7 ลบไม่ได้! ยืม 1 จากหลักสิบมาเป็น 12 − 7 = 5 — กดคิดให้ครบ',
      visual: {
        component: 'AddSubCarry',
        config: { a: 52, b: 27, op: '-' },
      },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'ยืมแล้วหลักสิบ 5 เหลือ 4, 4 − 2 = 2 → ได้ 25',
    },
    {
      id: 'borrow-explain',
      say: 'หลักสิบให้ยืมไป 1 เลยเหลือ 4 (เห็นเลขขีดทับ) แล้ว 4 − 2 = 2 รวมเป็น 25',
      visual: {
        component: 'AddSubCarry',
        config: { a: 52, b: 27, op: '-', readOnly: true, initialStep: 2 },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '52 − 27 = ?', opts: ['25', '35', '29', '15'], ans: 0, hint: 'ยืม: 12−7=5 หลักสิบ 4−2=2 → 25' },
      },
    },
    {
      id: 'sub-big',
      say: 'ลองเอง! 624 − 158 — มียืมสองที่ ดูดีๆ ว่าหลักไหนต้องยืม',
      visual: {
        component: 'AddSubCarry',
        config: { a: 624, b: 158, op: '-' },
      },
      goal: { type: 'reach-value', key: 'done', value: 1 },
      hint: 'หน่วย 4−8 ยืม → 14−8=6, สิบ 1−5 ยืม → 11−5=6, ร้อย 5−1=4 → 466',
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 บวกทีละหลักจากขวา เกิน 9 ให้ทดขึ้นซ้าย · ลบถ้าบนน้อยกว่าล่างให้ยืมจากซ้าย แค่นี้เอง!',
      visual: {
        component: 'AddSubCarry',
        config: { a: 3250, b: 1470, op: '+', readOnly: true, initialStep: 4 },
      },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '3,250 + 1,470 = ___', ans: '4720', hint: 'บวกทีละหลักจากขวา หลักสิบต้องทด' },
    { type: 'mc', q: '8,000 − 2,500 = ?', opts: ['5,500', '6,500', '5,000', '4,500'], ans: 0, hint: 'ยืมจากหลักพันมาช่วยหลักร้อย' },
    { type: 'fill', q: 'มีเงิน 5,000 ใช้ไป 1,850 เหลือ ___ บาท', ans: '3150', hint: '5,000 − 1,850 ยืมข้ามหลัก 0' },
    { type: 'fill', q: '3,457 + 2,865 = ___', ans: '6322', hint: 'ทดทุกหลัก: หน่วย 7+5=12 ทด, สิบ 5+6+1=12 ทด, ร้อย 4+8+1=13 ทด' },
    { type: 'fill', q: '5,024 − 1,867 = ___', ans: '3157', hint: 'ยืมข้ามหลัก 0: หน่วย 14−7=7, สิบ 1−6 ยืม, ร้อย 9−8=1, พัน 4−1=3' },
    { type: 'mc', q: '3,456 + 2,789 = ?', opts: ['6,245', '6,145', '6,255', '5,245'], ans: 0, hint: 'ทดต่อเนื่องทุกหลัก' },
    { type: 'fill', q: '624 − 158 = ___', ans: '466', hint: 'ยืมสองที่: 14−8=6, 11−5=6, 5−1=4' },
    { type: 'mc', q: '700 − 345 = ?', opts: ['355', '365', '455', '345'], ans: 0, hint: 'ยืมข้ามหลัก 0: 0→9, 7→6' },
    { type: 'fill', q: '4,382 + 1,749 = ___', ans: '6131', hint: 'ทดทุกหลัก: หน่วย 2+9=11 ทด, สิบ 8+4+1=13 ทด, ร้อย 3+7+1=11 ทด, พัน 4+1+1=6' },
    { type: 'fill', q: 'มีเงิน 1,000 ใช้ไป 640 เหลือ ___ บาท', ans: '360', hint: '1,000 − 640' },
  ],
}

export default addSub
