import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcDec, plain, round2 } from '@/content/exams/helpers'

// แนวข้อสอบ พื้นที่และเส้นรอบวง ป.6 (π ≈ 3.14) — คำตอบทศนิยม (ใช้ mcDec)
// distractor = สับสนพื้นที่(πr²) กับ เส้นรอบวง(2πr)
const PI = 3.14
const templates: QuestionTemplate[] = [
  { id: 'area', difficulty: 2, gen: r => { const rad = ri(r, 1, 30), v = round2(PI * rad * rad); return mcDec(r, `วงกลมรัศมี ${rad} พื้นที่เท่าไร (π=3.14)`, v, [round2(2 * PI * rad), round2(PI * rad), rad * rad], plain, `3.14 × ${rad} × ${rad}`) } },
  { id: 'circ', difficulty: 2, gen: r => { const rad = ri(r, 1, 30), v = round2(2 * PI * rad); return mcDec(r, `วงกลมรัศมี ${rad} เส้นรอบวงเท่าไร (π=3.14)`, v, [round2(PI * rad * rad), round2(PI * rad), 2 * rad], plain, `2 × 3.14 × ${rad}`) } },
  { id: 'fill-area', difficulty: 2, gen: r => { const rad = ri(r, 1, 30); return { type: 'fill', q: `วงกลมรัศมี ${rad} พื้นที่ = ___ (π=3.14)`, ans: String(round2(PI * rad * rad)), hint: `3.14 × ${rad} × ${rad}` } } },
  { id: 'fill-circ', difficulty: 2, gen: r => { const rad = ri(r, 1, 30); return { type: 'fill', q: `วงกลมรัศมี ${rad} เส้นรอบวง = ___ (π=3.14)`, ans: String(round2(2 * PI * rad)), hint: `2 × 3.14 × ${rad}` } } },
  { id: 'pi', difficulty: 1, gen: () => ({ type: 'mc', q: 'ค่า π ประมาณเท่าไร', opts: ['3.14', '2.14', '4.14', '1.14'], ans: 0, hint: 'สามจุดหนึ่งสี่' }) },
  { id: 'area-formula', difficulty: 1, gen: () => ({ type: 'mc', q: 'พื้นที่วงกลมใช้สูตรใด', opts: ['π × รัศมี × รัศมี', '2 × π × รัศมี', 'กว้าง × ยาว', 'ด้าน × 4'], ans: 0, hint: 'πr²' }) },
  { id: 'circ-formula', difficulty: 1, gen: () => ({ type: 'mc', q: 'เส้นรอบวงใช้สูตรใด', opts: ['2 × π × รัศมี', 'π × รัศมี × รัศมี', 'กว้าง × ยาว', 'รัศมี × รัศมี'], ans: 0, hint: '2πr' }) },
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'วงกลมรัศมี 10 เส้นรอบวง = ___ (π=3.14)', ans: '62.8', hint: '2 × 3.14 × 10' },
  { type: 'mc', q: 'วงกลมรัศมี 5 พื้นที่เท่าไร (π=3.14)', opts: ['78.5', '31.4', '15.7', '25'], ans: 0, hint: '3.14 × 5 × 5' },
  { type: 'fill', q: 'π เขียนเป็นเศษส่วนประมาณ 22/___', ans: '7', hint: '22/7 ≈ 3.14' },
]

const circleAreaExam: ChapterExam = { chapterId: 'math-6-circle-area', templates, bank }
export default circleAreaExam
