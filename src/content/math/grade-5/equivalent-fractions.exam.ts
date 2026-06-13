import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ เศษส่วนที่เท่ากัน ป.5 — เทียบเท่า + ลดรูป (หาร ห.ร.ม.)
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)

const templates: QuestionTemplate[] = [
  { id: 'scale-up-num', difficulty: 1, gen: r => {
    const d = ri(r,2,8), k = ri(r,2,5), a = ri(r,1,d-1)
    return { type: 'fill', q: `${a}/${d} = ___/${d*k}`, ans: String(a*k), hint: `คูณตัวบนและล่างด้วย ${k}` }
  }},
  { id: 'scale-down-num', difficulty: 1, gen: r => {
    const d = ri(r,2,8), k = ri(r,2,5), a = ri(r,1,d-1)
    return { type: 'fill', q: `${a*k}/${d*k} ลดรูปได้ = ___/${d}`, ans: String(a), hint: `หารตัวบนและล่างด้วย ${k}` }
  }},
  { id: 'missing-denom', difficulty: 2, gen: r => {
    const d = ri(r,2,8), k = ri(r,2,5), a = ri(r,1,d-1)
    return { type: 'fill', q: `${a}/${d} = ${a*k}/___`, ans: String(d*k), hint: `ตัวบนคูณ ${k} ตัวล่างก็คูณ ${k}` }
  }},
  { id: 'equiv-check', difficulty: 2, gen: r => {
    const d = ri(r,2,8), a = ri(r,1,d-1)
    const isEquiv = r() < 0.5
    const k = ri(r,2,4)
    const c = isEquiv ? a*k : a*k + 1
    const e = d*k
    return mcStr(r, `${a}/${d} กับ ${c}/${e} เท่ากันหรือไม่`,
      isEquiv ? 'เท่ากัน' : 'ไม่เท่ากัน',
      isEquiv ? ['ไม่เท่ากัน', 'บอกไม่ได้', 'ขึ้นอยู่กับตัวหาร'] : ['เท่ากัน', 'บอกไม่ได้', 'ขึ้นอยู่กับตัวหาร'],
      `${a}×${e} ${isEquiv?'=':'≠'} ${d}×${c} (คูณไขว้)`)
  }},
  { id: 'compare-same-d', difficulty: 1, gen: r => {
    const d = ri(r,3,12), a = ri(r,1,d-2), b = ri(r,a+1,d-1)
    return mcStr(r, `${a}/${d} กับ ${b}/${d} ตัวใดมากกว่า`,
      `${b}/${d}`,
      [`${a}/${d}`, 'เท่ากัน', 'บอกไม่ได้'],
      `ตัวล่างเท่ากัน เปรียบตัวบน ${b} > ${a}`)
  }},
  { id: 'compare-half', difficulty: 2, gen: r => {
    const d = ri(r,3,12), a = ri(r,1,d-1)
    const isEqual = a * 2 === d
    const correct = isEqual ? 'เท่ากัน' : a * 2 > d ? `${a}/${d}` : '1/2'
    return mcStr(r, `${a}/${d} กับ 1/2 ตัวใดมากกว่า`,
      correct,
      [`${a}/${d}`, '1/2', 'เท่ากัน', 'บอกไม่ได้'].filter(n => n !== correct) as string[],
      `คูณไขว้: ${a}×2=${a*2} กับ ${d}×1=${d}`)
  }},
  { id: 'simplest', difficulty: 2, gen: r => {
    const d = ri(r,2,8), a = ri(r,1,d-1), k = ri(r,2,4)
    return mcStr(r, `${a*k}/${d*k} อยู่ในรูปต่ำสุดหรือยัง`,
      `ยังไม่ใช่ ลดได้อีก (= ${a}/${d})`,
      ['ใช่ อยู่ในรูปต่ำสุดแล้ว', 'ขึ้นอยู่กับโจทย์', 'ต้องคำนวณเพิ่ม'],
      `ห.ร.ม.(${a*k},${d*k})=${k} ยังลดได้`)
  }},
  { id: 'reduce-fill', difficulty: 2, gen: r => {
    const d = ri(r,2,8), a = ri(r,1,d-1), k = ri(r,2,4)
    const G = gcd(a*k, d*k)
    return { type: 'fill', q: `${a*k}/${d*k} ลดรูปต่ำสุดได้เท่ากับ ___/${d*k/G}`, ans: String(a*k/G), hint: `หาร ห.ร.ม.(${a*k},${d*k})=${G}` }
  }},
  { id: 'equiv-list', difficulty: 2, gen: r => {
    const base = ri(r,1,4), bd = ri(r,2,6), k = ri(r,2,4)
    const correct = `${base*k}/${bd*k}`
    return mcStr(r, `เศษส่วนใดเท่ากับ ${base}/${bd}`,
      correct,
      [`${base+1}/${bd*k}`, `${base*k}/${bd*k+1}`, `${base}/${bd*k}`, `${base*k+1}/${bd*k}`],
      `${base}/${bd} = ${base*k}/${bd*k}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'วิธีหาเศษส่วนที่เท่ากันคือ',
    opts: ['คูณหรือหารตัวบนและตัวล่างด้วยจำนวนเดียวกัน (≠0)', 'บวกเลขเดียวกันเข้าตัวบนและตัวล่าง', 'สลับตัวบนกับตัวล่าง', 'ลบตัวบนออกจากตัวล่าง'],
    ans: 0, hint: 'คูณหรือหารด้วยจำนวนเดียวกัน'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '2/3 = ___/9', ans: '6', hint: 'คูณตัวบนล่างด้วย 3' },
  { type: 'mc', q: 'เศษส่วนใดเท่ากับ 3/4', opts: ['6/8', '4/5', '3/8', '4/4'], ans: 0, hint: '3×2/4×2 = 6/8' },
  { type: 'fill', q: '8/12 ลดรูปต่ำสุด = ___/3', ans: '2', hint: 'ห.ร.ม.(8,12)=4 → 8÷4=2, 12÷4=3' },
]

const equivFractionsExam: ChapterExam = { chapterId: 'math-5-equiv-fractions', templates, bank }
export default equivFractionsExam
