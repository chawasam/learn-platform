import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcStr } from '@/content/exams/helpers'

// แนวข้อสอบ สถิติและความน่าจะเป็น ป.5 — โอกาส = ที่ต้องการ/ทั้งหมด
const templates: QuestionTemplate[] = [
  { id: 'bag-simple', difficulty: 1, gen: r => {
    const red = ri(r,1,5), extra = ri(r,2,6), total = red + extra
    return mcStr(r, `ถุงมีลูกบอล ${total} ลูก มีสีแดง ${red} ลูก หยิบ 1 ลูก โอกาสได้สีแดง = ?`,
      `${red}/${total}`,
      [`${total}/${red}`, `${extra}/${total}`, `${red}/${red}`, `${total}/${total}`],
      'ที่ต้องการ ÷ ทั้งหมด')
  }},
  { id: 'die-single', difficulty: 1, gen: r => {
    const k = ri(r,1,6)
    return mcStr(r, `ลูกเต๋า 6 หน้า หมุน 1 ครั้ง โอกาสออกเลข ${k} = ?`,
      '1/6', ['1/3', '2/6', '1/2', 'k/6'],
      '1 ผล จาก 6 หน้า')
  }},
  { id: 'die-even', difficulty: 2, gen: r =>
    mcStr(r, 'ลูกเต๋า 6 หน้า โอกาสออกเลขคู่ (2, 4, 6) = ?',
      '3/6', ['1/6', '2/6', '4/6'], '3 หน้าคู่ จาก 6')
  },
  { id: 'die-gt3', difficulty: 2, gen: r =>
    mcStr(r, 'ลูกเต๋า 6 หน้า โอกาสออกเลขมากกว่า 3 ได้แก่ (4, 5, 6) = ?',
      '3/6', ['1/6', '2/6', '4/6'], '3 หน้า (4,5,6) จาก 6')
  },
  { id: 'coin', difficulty: 1, gen: r => {
    const side = r() < 0.5 ? 'หัว' : 'ก้อย'
    return mcStr(r, `โยนเหรียญ 1 ครั้ง โอกาสออก${side} = ?`,
      '1/2', ['1/4', '1/6', '2/3'], '1 ด้าน จาก 2 ด้าน')
  }},
  { id: 'bag-color3', difficulty: 2, gen: r => {
    const r1 = ri(r,1,4), g1 = ri(r,1,4), b1 = ri(r,1,4), total = r1+g1+b1
    const colorIdx = Math.floor(r()*3)
    const want = [r1,g1,b1][colorIdx]
    const name = ['แดง','เขียว','น้ำเงิน'][colorIdx]
    return mcStr(r, `ถุงมีบอลแดง ${r1} เขียว ${g1} น้ำเงิน ${b1} รวม ${total} ลูก โอกาสได้สี${name} = ?`,
      `${want}/${total}`,
      [`${total - want}/${total}`, `${want}/${want}`, `${total}/${want}`, `${want+1}/${total}`],
      'นับสีที่ต้องการ ÷ ทั้งหมด')
  }},
  { id: 'certain', difficulty: 1, gen: r => {
    const N = ri(r,3,8)
    return mcStr(r, `ถุงมีลูกบอลสีแดงทั้งหมด ${N} ลูก หยิบ 1 ลูก โอกาสได้สีแดง = ?`,
      '1 (แน่นอน)',
      ['0 (เป็นไปไม่ได้)', '1/2', `1/${N}`],
      'ลูกทุกลูกเป็นสีแดง = แน่นอนได้แดง')
  }},
  { id: 'impossible', difficulty: 1, gen: r => {
    const N = ri(r,3,8)
    return mcStr(r, `ถุงมีลูกบอลสีเขียว ${N} ลูก ไม่มีสีอื่น หยิบ 1 ลูก โอกาสได้สีแดง = ?`,
      '0 (เป็นไปไม่ได้)',
      ['1 (แน่นอน)', '1/2', `1/${N}`],
      'ไม่มีสีแดงเลย = โอกาส 0')
  }},
  { id: 'compare-prob', difficulty: 2, gen: r => {
    const t = ri(r,6,12), a = ri(r,1,t-2), b = ri(r,a+1,t-1)
    return mcStr(r, `ถุงมีลูก ${t} ลูก โอกาส ${a}/${t} กับ ${b}/${t} อะไรมากกว่ากัน?`,
      `${b}/${t}`,
      [`${a}/${t}`, 'เท่ากัน', 'บอกไม่ได้'],
      `${b} > ${a} → ${b}/${t} > ${a}/${t}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ความน่าจะเป็น (probability) คำนวณอย่างไร',
    opts: ['จำนวนผลที่ต้องการ ÷ ผลทั้งหมดที่เป็นไปได้', 'ผลทั้งหมด ÷ จำนวนผลที่ต้องการ', 'นับเฉพาะผลที่เป็นไปได้', 'บวกโอกาสทุกอย่างรวมกัน'],
    ans: 0, hint: 'P(E) = n(E)/n(S)'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'ลูกเต๋า 6 หน้า โอกาสออกเลข 5 = ?', opts: ['1/6', '1/3', '5/6', '1/2'], ans: 0, hint: '1 หน้า จาก 6' },
  { type: 'mc', q: 'ถุงมีบอล 3 แดง 2 น้ำเงิน รวม 5 ลูก โอกาสได้แดง = ?', opts: ['3/5', '2/5', '3/2', '1/5'], ans: 0, hint: '3 จาก 5' },
  { type: 'mc', q: 'เหตุการณ์ใดมีความน่าจะเป็นเท่ากับ 0', opts: ['หยิบน้ำเงินจากถุงที่มีแต่แดง', 'หยิบแดงจากถุงที่มีแดงครึ่งหนึ่ง', 'โยนเหรียญออกหัว', 'ลูกเต๋าออกเลข 3'], ans: 0, hint: 'ไม่มีสิ่งที่ต้องการ = P=0' },
]

const probabilityExam: ChapterExam = { chapterId: 'math-5-probability', templates, bank }
export default probabilityExam
