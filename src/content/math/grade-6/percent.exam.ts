import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, pick, mcNum, baht, plain, ppl, pctf } from '@/content/exams/helpers'

// แนวข้อสอบร้อยละ ป.6 (สไตล์เข้า ม.1 / O-NET) — เขียน original จาก archetype ของจริง
// ดู provenance + citation ที่ src/content/exams/percent.notes.md
// ทุก template สร้างเลขให้คำตอบเป็นจำนวนเต็มเสมอ (N = 20m, p = 5k → p% ของ N = m·k)

const GOODS = ['เสื้อ', 'หนังสือ', 'รองเท้า', 'กระเป๋า', 'หมวก', 'ตุ๊กตา']

const templates: QuestionTemplate[] = [
  // หาค่าร้อยละของจำนวน
  { id: 'pct-of', difficulty: 1, gen: r => {
    const m = ri(r, 1, 25), k = ri(r, 1, 15), N = 20 * m, p = 5 * k, v = m * k
    return mcNum(r, `${p}% ของ ${N} = เท่าไร`, v, [p, N - v, Math.round(N / 2)], plain, `${p}/100 × ${N}`)
  } },
  { id: 'fill-pct-of', difficulty: 1, gen: r => {
    const m = ri(r, 1, 25), k = ri(r, 1, 15), N = 20 * m, p = 5 * k, v = m * k
    return { type: 'fill', q: `${p}% ของ ${N} = ___`, ans: String(v), hint: `${p}/100 × ${N}` }
  } },
  // ส่วนลด — ลดกี่บาท / จ่ายจริง
  { id: 'discount-amt', difficulty: 1, gen: r => {
    const g = pick(r, GOODS), m = ri(r, 2, 25), k = ri(r, 1, 15), N = 20 * m, p = 5 * k, v = m * k
    return mcNum(r, `${g}ราคา ${N} บาท ลด ${p}% ลดกี่บาท`, v, [N - v, p, v * 2], baht, `${p}/100 × ${N}`)
  } },
  { id: 'discount-pay', difficulty: 2, gen: r => {
    const g = pick(r, GOODS), m = ri(r, 3, 25), k = ri(r, 1, 12), N = 20 * m, p = 5 * k, v = m * k, pay = N - v
    return mcNum(r, `${g}ราคา ${N} บาท ลด ${p}% จ่ายจริงกี่บาท`, pay, [v, N, N + v], baht, `${N} − (${p}% ของ ${N})`)
  } },
  { id: 'fill-pay', difficulty: 2, gen: r => {
    const g = pick(r, GOODS), m = ri(r, 3, 25), k = ri(r, 1, 12), N = 20 * m, p = 5 * k, pay = N - m * k
    return { type: 'fill', q: `${g}ราคา ${N} บาท ลด ${p}% จ่ายจริง ___ บาท`, ans: String(pay), hint: `${N} − ${p}% ของ ${N}` }
  } },
  // หาจำนวนเมื่อรู้ร้อยละ
  { id: 'find-whole', difficulty: 2, gen: r => {
    const m = ri(r, 2, 20), k = ri(r, 1, 12), N = 20 * m, p = 5 * k, v = m * k
    return mcNum(r, `${p}% ของจำนวนหนึ่ง = ${v} จำนวนนั้นคือเท่าไร`, N, [v, N * 2, N / 2], plain, `${v} ÷ ${p} × 100`)
  } },
  // เป็นกี่ % ของ
  { id: 'what-pct', difficulty: 2, gen: r => {
    const m = ri(r, 1, 20), k = ri(r, 1, 15), B = 20 * m, A = m * k, pct = 5 * k
    return mcNum(r, `${A} เป็นร้อยละเท่าไรของ ${B}`, pct, [A, B - pct, pct * 2], pctf, `${A} ÷ ${B} × 100`)
  } },
  // กำไร / ขาดทุน
  { id: 'profit-sell', difficulty: 2, gen: r => {
    const m = ri(r, 3, 30), k = ri(r, 1, 10), N = 20 * m, p = 5 * k, prof = m * k, sell = N + prof
    return mcNum(r, `ต้นทุน ${N} บาท ขายได้กำไร ${p}% ขายราคาเท่าไร`, sell, [prof, N - prof, N], baht, `${N} + (${p}% ของ ${N})`)
  } },
  { id: 'loss-sell', difficulty: 2, gen: r => {
    const m = ri(r, 3, 30), k = ri(r, 1, 10), N = 20 * m, p = 5 * k, loss = m * k, sell = N - loss
    return mcNum(r, `ต้นทุน ${N} บาท ขายขาดทุน ${p}% ขายราคาเท่าไร`, sell, [N + loss, loss, N], baht, `${N} − (${p}% ของ ${N})`)
  } },
  { id: 'profit-pct', difficulty: 3, gen: r => {
    const m = ri(r, 3, 30), k = ri(r, 1, 10), N = 20 * m, p = 5 * k, prof = m * k, sell = N + prof
    return mcNum(r, `ต้นทุน ${N} บาท ขาย ${sell} บาท กำไรร้อยละเท่าไร`, p, [prof, p * 2, p + 10], pctf, `กำไร ${prof} ÷ ทุน ${N} × 100`)
  } },
  // เพิ่มขึ้นเป็นร้อยละ
  { id: 'increase', difficulty: 2, gen: r => {
    const m = ri(r, 3, 30), k = ri(r, 1, 10), N = 20 * m, p = 5 * k, inc = m * k, res = N + inc
    return mcNum(r, `จำนวน ${N} เพิ่มขึ้น ${p}% เป็นเท่าไร`, res, [inc, N - inc, p], plain, `${N} + (${p}% ของ ${N})`)
  } },
  // จำนวนคนตามร้อยละ
  { id: 'students', difficulty: 1, gen: r => {
    const m = ri(r, 2, 10), k = ri(r, 1, 15), N = 20 * m, p = 5 * k, v = m * k
    return mcNum(r, `นักเรียน ${N} คน มาเรียน ${p}% มากี่คน`, v, [N - v, p, N], ppl, `${p}/100 × ${N}`)
  } },
  // หาต้นทุนจากราคาขาย
  { id: 'find-cost', difficulty: 3, gen: r => {
    const m = ri(r, 3, 20), k = ri(r, 1, 10), N = 20 * m, p = 5 * k, prof = m * k, sell = N + prof
    return mcNum(r, `ขายของราคา ${sell} บาท ได้กำไร ${p}% ต้นทุนเท่าไร`, N, [sell, prof, N - prof > 0 ? N - prof : N + prof], baht, `ทุน × (1 + ${p}/100) = ${sell} → ทุน = ${sell} ÷ ${1 + p / 100}`)
  } },
  // เศษส่วน/ทศนิยม ↔ ร้อยละ
  { id: 'frac-to-pct', difficulty: 1, gen: r => {
    const o = pick(r, [['1/2', 50], ['1/4', 25], ['3/4', 75], ['1/5', 20], ['2/5', 40], ['1/10', 10], ['3/10', 30], ['1', 100]] as [string, number][])
    return mcNum(r, `${o[0]} เท่ากับร้อยละเท่าไร`, o[1], [Math.max(1, o[1] - 5), o[1] + 10, 100 - o[1]], pctf, `เทียบกับ 100`)
  } },
]

// static bank — โจทย์ปัญหาหลายขั้น / tricky ที่ parameterize ไม่สวย (คำนวณมือยืนยันแล้ว)
const bank: QuizQuestion[] = [
  { type: 'mc', q: 'เสื้อราคา 800 บาท ลด 25% แล้วลดอีก 10% จากราคาที่ลดแล้ว จ่ายจริงกี่บาท', opts: ['540 บาท', '520 บาท', '600 บาท', '560 บาท'], ans: 0, hint: '800→ลด25%=600 →ลด10%ของ600=60 →540' },
  { type: 'mc', q: 'ซื้อของ 1200 บาท ได้ส่วนลด 15% ต้องจ่ายเท่าไร', opts: ['1020 บาท', '180 บาท', '1380 บาท', '1050 บาท'], ans: 0, hint: '1200 − (15% ของ 1200 = 180) = 1020' },
  { type: 'fill', q: 'นักเรียน 250 คน เป็นชาย 60% เป็นหญิงกี่คน', ans: '100', hint: 'หญิง = 40% ของ 250' },
  { type: 'mc', q: 'ขายของราคา 600 บาท ได้กำไร 20% ต้นทุนเท่าไร', opts: ['500 บาท', '480 บาท', '720 บาท', '580 บาท'], ans: 0, hint: 'ทุน × 1.20 = 600 → 600 ÷ 1.2' },
  { type: 'fill', q: 'ของราคา 250 บาท ขายขาดทุน 12% ขายไปกี่บาท', ans: '220', hint: '250 − (12% ของ 250 = 30) = 220' },
  { type: 'mc', q: 'สินค้าราคา 250 บาท ขาย 300 บาท กำไรร้อยละเท่าไร', opts: ['20%', '50 บาท', '15%', '25%'], ans: 0, hint: 'กำไร 50 ÷ ทุน 250 × 100 = 20%' },
  { type: 'mc', q: 'สินค้าราคา 400 บาท บวก VAT 7% จ่ายจริงกี่บาท', opts: ['428 บาท', '407 บาท', '450 บาท', '372 บาท'], ans: 0, hint: '400 + (7% ของ 400 = 28) = 428' },
  { type: 'fill', q: 'คะแนนเต็ม 80 ได้ 75% ได้กี่คะแนน', ans: '60', hint: '75% ของ 80 = 0.75 × 80' },
  { type: 'mc', q: 'ร้านลด 30% จากราคา 200 บาท ลดกี่บาท', opts: ['60 บาท', '140 บาท', '30 บาท', '66 บาท'], ans: 0, hint: '30% ของ 200 = 0.3 × 200' },
]
// หมายเหตุ pattern: ข้อสอบใช้ fill/mc เป็นหลัก — slider เฉพาะข้อ "ประมาณค่า/อ่านสเกล" ง่ายๆ
// ข้อคำนวณ/ระดับสูง ห้ามใช้ slider (เลื่อนเดาได้ ไม่บังคับคิด) → ใช้ fill (พิมพ์) หรือ mc (เลือก)

const percentExam: ChapterExam = { chapterId: 'math-6-percent', templates, bank }
export default percentExam
