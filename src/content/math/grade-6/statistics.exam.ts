import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ สถิติและความน่าจะเป็น ป.6 — ค่าเฉลี่ย (จำนวนเต็ม) + ความน่าจะเป็น (เศษส่วน)
const templates: QuestionTemplate[] = [
  { id: 'mean2', difficulty: 1, gen: r => { const M = ri(r, 3, 30), d = ri(r, 1, Math.min(M - 1, 15)); return mcNum(r, `ค่าเฉลี่ยของ ${M - d} กับ ${M + d} = ?`, M, [2 * M, M - d, M + d], plain, 'ผลรวม ÷ 2') } },
  { id: 'mean3', difficulty: 2, gen: r => { const M = ri(r, 4, 30), d = ri(r, 1, Math.min(M - 1, 12)); return mcNum(r, `ค่าเฉลี่ยของ ${M - d}, ${M}, ${M + d} = ?`, M, [3 * M, M + d, M - d], plain, 'ผลรวม ÷ 3') } },
  { id: 'mean3-fill', difficulty: 2, gen: r => { const M = ri(r, 4, 30), d = ri(r, 1, Math.min(M - 1, 12)); return { type: 'fill', q: `ค่าเฉลี่ยของ ${M - d}, ${M}, ${M + d} = ___`, ans: String(M), hint: 'ผลรวม ÷ 3' } } },
  { id: 'die', difficulty: 1, gen: r => { const k = ri(r, 1, 6); return mcStr(r, `ลูกเต๋า 6 หน้า โอกาสออกเลข ${k} = ?`, '1/6', ['1/3', '3/6', '1/2'], '1 หน้าที่ต้องการ จาก 6') } },
  { id: 'die-even', difficulty: 2, gen: r => mcStr(r, 'ลูกเต๋า 6 หน้า โอกาสออกเลขคู่ (2,4,6) = ?', '3/6', ['1/6', '2/6', '1/3'], '3 หน้า จาก 6') },
  { id: 'coin', difficulty: 1, gen: r => mcStr(r, 'โยนเหรียญ โอกาสออกหัว = ?', '1/2', ['1/4', '1/6', '1/3'], '1 หัว จาก 2 หน้า') },
  { id: 'bag', difficulty: 2, gen: r => { const red = ri(r, 1, 5), total = red + ri(r, 1, 6); return mcStr(r, `ถุงมีบอลแดง ${red} จากทั้งหมด ${total} ลูก โอกาสได้แดง = ?`, `${red}/${total}`, [`${total}/${red}`, `${red}/${red}`, `${total}/${total}`], 'ที่ต้องการ ÷ ทั้งหมด') } },
  { id: 'concept', difficulty: 1, gen: r => mcStr(r, 'ค่าเฉลี่ยคืออะไร', 'ผลรวม ÷ จำนวนข้อมูล', ['ตัวมากสุด', 'ตัวน้อยสุด', 'ผลรวมทั้งหมด'], 'เกลี่ยให้เท่ากัน') },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'คะแนน 8, 6, 10 ค่าเฉลี่ย = ___', ans: '8', hint: '(8+6+10) ÷ 3' },
  { type: 'mc', q: 'ลูกเต๋า 6 หน้า โอกาสออกเลข 3 = ?', opts: ['1/6', '1/3', '3/6', '1/2'], ans: 0, hint: '1 หน้า จาก 6' },
  { type: 'fill', q: 'ข้อมูล 10, 20, 30, 40 ค่าเฉลี่ย = ___', ans: '25', hint: '(10+20+30+40) ÷ 4' },
]

const statisticsExam: ChapterExam = { chapterId: 'math-6-statistics', templates, bank }
export default statisticsExam
