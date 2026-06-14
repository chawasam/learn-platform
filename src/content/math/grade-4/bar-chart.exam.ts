import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain, ppl } from '@/content/exams/helpers'

// แนวข้อสอบ แผนภูมิแท่ง ป.4 — อ่านค่า + เปรียบเทียบ + ผลรวม + ค่าเฉลี่ย
const FRUITS = ['แอปเปิ้ล', 'กล้วย', 'ส้ม', 'มะม่วง']
const COLORS = ['แดง', 'น้ำเงิน', 'เขียว', 'เหลือง']

const templates: QuestionTemplate[] = [
  { id: 'read-max', difficulty: 1, gen: r => {
    const vals = [ri(r,5,30), ri(r,5,30), ri(r,5,30), ri(r,5,30)]
    const maxV = Math.max(...vals), maxI = vals.indexOf(maxV)
    const desc = FRUITS.map((f,i) => `${f} ${vals[i]} คน`).join(' ')
    return mcStr(r, `แผนภูมิแสดงผลไม้ที่ชอบ: ${desc} ผลไม้ใดได้รับความนิยมสูงสุด`,
      FRUITS[maxI],
      FRUITS.filter((_,i) => i !== maxI),
      `${FRUITS[maxI]}=${maxV} มากที่สุด`)
  }},
  { id: 'read-min', difficulty: 1, gen: r => {
    const vals = [ri(r,5,30), ri(r,5,30), ri(r,5,30), ri(r,5,30)]
    const minV = Math.min(...vals), minI = vals.indexOf(minV)
    const desc = FRUITS.map((f,i) => `${f} ${vals[i]} คน`).join(' ')
    return mcStr(r, `แผนภูมิ: ${desc} ผลไม้ใดได้รับความนิยมน้อยที่สุด`,
      FRUITS[minI],
      FRUITS.filter((_,i) => i !== minI),
      `${FRUITS[minI]}=${minV} น้อยที่สุด`)
  }},
  { id: 'read-total', difficulty: 1, gen: r => {
    const vals = [ri(r,5,20), ri(r,5,20), ri(r,5,20), ri(r,5,20)]
    const total = vals.reduce((a,b)=>a+b,0)
    const desc = FRUITS.map((f,i) => `${f} ${vals[i]} คน`).join(' ')
    return mcNum(r, `แผนภูมิ: ${desc} รวมทั้งหมด = ?`, total, [total+5, total-5, total*2], ppl, `${vals.join('+')}=${total}`)
  }},
  { id: 'read-diff', difficulty: 2, gen: r => {
    const a = ri(r,10,30), b = ri(r,5,a-2)
    const diff = a - b
    const fi = Math.floor(r()*3), si = fi+1
    return mcNum(r, `แผนภูมิ: ${FRUITS[fi]} ${a} คน ${FRUITS[si]} ${b} คน ${FRUITS[fi]}มากกว่า${FRUITS[si]}กี่คน`, diff, [a+b, b, a], ppl, `${a}−${b}=${diff}`)
  }},
  { id: 'mean', difficulty: 2, gen: r => {
    const M = ri(r,5,20), d = ri(r,1,Math.min(M-1,10))
    const vals = [M-d, M, M+d, M]
    const total = vals.reduce((a,b)=>a+b,0)
    const desc = FRUITS.map((f,i) => `${f} ${vals[i]} คน`).join(' ')
    return mcNum(r, `แผนภูมิ: ${desc} ค่าเฉลี่ย = ?`, M, [M+d, M-d, total], ppl, `${total}÷4=${M}`)
  }},
  { id: 'find-missing', difficulty: 2, gen: r => {
    const missing = ri(r,5,20), vals = [ri(r,5,20), ri(r,5,20), ri(r,5,20)]
    const known = vals.reduce((a,b)=>a+b,0)
    const total = known + missing
    const desc = FRUITS.slice(0,3).map((f,i) => `${f} ${vals[i]} คน`).join(' ')
    return mcNum(r, `รวมทั้งหมด ${total} คน แต่ละสีเป็น: ${desc} ${FRUITS[3]}มี = ?`, missing, [missing+5, known, total], ppl, `${total}−(${known})=${missing}`)
  }},
  { id: 'scale-read', difficulty: 2, gen: r => {
    const scale = ri(r,2,5)*5, bars = ri(r,2,8)
    const actual = bars * scale
    return mcNum(r, `แผนภูมิสเกล ${scale} คน/ช่อง แท่งสูง ${bars} ช่อง ค่าจริง = ?`, actual, [bars, bars+scale, actual+scale], ppl, `${bars}×${scale}=${actual}`)
  }},
  { id: 'two-groups', difficulty: 2, gen: r => {
    const boys = ri(r,10,30), girls = ri(r,10,30)
    return mcNum(r, `ชั้น ป.4 ชาย ${boys} คน หญิง ${girls} คน รวม = ?`, boys+girls, [boys*girls, boys-girls>0?boys-girls:boys+girls+5, boys+girls+10], ppl, `${boys}+${girls}`)
  }},
  { id: 'compare-bars', difficulty: 1, gen: r => {
    const a = ri(r,10,40), b = ri(r,5,a-1)
    return mcStr(r, `แท่ง${COLORS[0]} สูง ${a} ช่อง แท่ง${COLORS[1]} สูง ${b} ช่อง แท่งใดสูงกว่า`,
      `${COLORS[0]}`,
      [COLORS[1], 'เท่ากัน', 'บอกไม่ได้'],
      `${a} > ${b}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'แผนภูมิแท่ง (bar chart) ใช้แสดงข้อมูลแบบใด',
    opts: ['เปรียบเทียบจำนวนหรือปริมาณของแต่ละกลุ่ม', 'แสดงการเปลี่ยนแปลงตามเวลา', 'แสดงสัดส่วนของส่วนย่อย', 'แสดงความสัมพันธ์ระหว่างสองตัวแปร'],
    ans: 0, hint: 'แท่งเปรียบเทียบ = bar chart'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'แผนภูมิแท่ง: A=20, B=35, C=15, D=30 ค่าใดสูงสุด?', opts: ['B=35', 'A=20', 'D=30', 'C=15'], ans: 0, hint: '35 มากที่สุด' },
  { type: 'fill', q: 'แผนภูมิแท่ง: A=20, B=35, C=15, D=30 รวม = ___', ans: '100', hint: '20+35+15+30=100' },
  { type: 'mc', q: 'แท่งสูง 6 ช่อง สเกล 5 คน/ช่อง ค่าจริง = ?', opts: ['30', '11', '1', '30+5'], ans: 0, hint: '6×5=30' },
]

const barChartExam: ChapterExam = { chapterId: 'math-4-bar-chart', templates, bank }
export default barChartExam
