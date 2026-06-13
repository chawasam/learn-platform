import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain, baht, ppl } from '@/content/exams/helpers'

// แนวข้อสอบ โจทย์ปัญหา ป.5 — บวกลบคูณหารในบริบทจริง 2-3 ขั้นตอน
const templates: QuestionTemplate[] = [
  { id: 'buy-change', difficulty: 2, gen: r => {
    const N = ri(r,2,5), P = ri(r,5,30), total = N*P
    const C = total <= 100 ? 100 : 200
    const change = C - total
    return mcNum(r, `ซื้อของ ${N} ชิ้น ชิ้นละ ${P} บาท จ่ายธนบัตร ${C} บาท ทอน = ?`, change, [total, N+P, C+total], baht, `${C} − ${N}×${P}`)
  }},
  { id: 'share-equal', difficulty: 1, gen: r => {
    const N = ri(r,2,6), k = ri(r,3,12)
    const T = N*k
    return mcNum(r, `มีของ ${T} ชิ้น แบ่งให้ ${N} คนเท่าๆ กัน แต่ละคนได้ = ?`, k, [T*N, T-N, k+N], plain, `${T} ÷ ${N} = ${k}`)
  }},
  { id: 'savings', difficulty: 1, gen: r => {
    const D = ri(r,5,30), N = ri(r,5,20)
    return mcNum(r, `เก็บเงิน ${D} บาทต่อวัน นาน ${N} วัน รวมทั้งหมด = ?`, D*N, [D+N, D*N+D, D*N-D], baht, `${D}×${N}`)
  }},
  { id: 'distance', difficulty: 1, gen: r => {
    const V = ri(r,5,15)*10, T = ri(r,2,5)
    return mcNum(r, `รถวิ่ง ${V} กม./ชม. นาน ${T} ชั่วโมง ไปได้ = ?`, V*T, [V+T, V*T+V, V*T*2], plain, `${V}×${T} กม.`)
  }},
  { id: 'fraction-share', difficulty: 2, gen: r => {
    const b = ri(r,2,5), a = ri(r,1,b-1), mult = ri(r,2,8)
    const T = mult*b
    const ans = mult*a
    return mcNum(r, `มีแอปเปิ้ล ${T} ผล แบ่งให้เพื่อน ${a}/${b} ส่วน เพื่อนได้ = ?`, ans, [T-ans, T*a, T/b], plain, `${T} × ${a}/${b} = ${ans}`)
  }},
  { id: 'multi-buy', difficulty: 2, gen: r => {
    const p1 = ri(r,5,20), n1 = ri(r,2,5), p2 = ri(r,5,20), n2 = ri(r,2,5)
    const total = p1*n1 + p2*n2
    return mcNum(r, `ซื้อขนม ${n1} ห่อ ห่อละ ${p1} บาท และน้ำ ${n2} ขวด ขวดละ ${p2} บาท รวม = ?`, total, [p1*n1, p2*n2, p1*n1*p2*n2], baht, `${n1}×${p1} + ${n2}×${p2}`)
  }},
  { id: 'remain', difficulty: 2, gen: r => {
    const total = ri(r,20,60), used = ri(r,5,total-5)
    const remain = total - used
    return mcNum(r, `มีของ ${total} ชิ้น ใช้ไป ${used} ชิ้น เหลือ = ?`, remain, [total+used, used, total*2-used], plain, `${total} − ${used}`)
  }},
  { id: 'work-rate', difficulty: 2, gen: r => {
    const R = ri(r,3,12), D = ri(r,3,10)
    return mcNum(r, `ทำงาน ${R} ชิ้นต่อวัน นาน ${D} วัน ทำได้ทั้งหมด = ?`, R*D, [R+D, R*D+R, R*D-D], plain, `${R}×${D}`)
  }},
  { id: 'group-packing', difficulty: 2, gen: r => {
    const perBox = ri(r,4,12), numBox = ri(r,3,10)
    const total = perBox*numBox
    const extra = ri(r,1,perBox-1)
    const totalWithExtra = total + extra
    return mcNum(r, `บรรจุกล่องละ ${perBox} ชิ้น มี ${totalWithExtra} ชิ้น ต้องใช้กล่องกี่กล่อง`, numBox+1, [numBox, numBox-1, perBox], plain, `${totalWithExtra}÷${perBox} = ${numBox} เศษ ${extra} → ต้องการ ${numBox+1} กล่อง`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'เมื่อแก้โจทย์ปัญหา ขั้นตอนแรกที่สำคัญที่สุดคือ',
    opts: ['อ่านโจทย์ให้เข้าใจว่าถามอะไร', 'คำนวณทันทีโดยไม่ต้องอ่าน', 'เดาคำตอบก่อน', 'วาดรูปทุกครั้ง'],
    ans: 0, hint: 'เข้าใจโจทย์ก่อน จึงเลือกวิธีคำนวณได้ถูก'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'mc', q: 'ซื้อดินสอ 3 แท่ง ราคาแท่งละ 12 บาท จ่าย 50 บาท ทอน = ?', opts: ['14 บาท', '36 บาท', '38 บาท', '26 บาท'], ans: 0, hint: '3×12=36, 50-36=14' },
  { type: 'fill', q: 'มีแอปเปิ้ล 24 ผล แบ่งให้ 6 คนเท่ากัน แต่ละคนได้ = ___', ans: '4', hint: '24÷6=4' },
  { type: 'mc', q: 'ทำงาน 8 ชิ้นต่อวัน 5 วัน รวม = ?', opts: ['40 ชิ้น', '13 ชิ้น', '35 ชิ้น', '48 ชิ้น'], ans: 0, hint: '8×5=40' },
]

const wordProblemsExam: ChapterExam = { chapterId: 'math-5-word-problems', templates, bank }
export default wordProblemsExam
