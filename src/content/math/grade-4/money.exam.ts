import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, plain } from '@/content/exams/helpers'

// แนวข้อสอบ เงิน ป.4 — บาท/สตางค์, ทอนเงิน, รวมราคา, โจทย์ซื้อขาย
// 1 บาท = 100 สตางค์; ใช้จำนวนเต็มบาทเพื่อหลีกเลี่ยงทศนิยมซับซ้อน (ป.4)
const templates: QuestionTemplate[] = [
  { id: 'satang-to-baht', difficulty: 1, gen: r => {
    const baht = ri(r,1,9), satang = ri(r,1,99)
    return { type: 'fill', q: `${baht*100+satang} สตางค์ = ___ บาท ___ สตางค์`, ans: `${baht} บาท ${satang} สตางค์`, hint: `100 สตางค์ = 1 บาท` }
  }},
  { id: 'baht-to-satang', difficulty: 1, gen: r => {
    const baht = ri(r,2,20)
    return mcNum(r, `${baht} บาท = ___ สตางค์`, baht*100, [baht*10, baht+100, baht*100+50], plain, `${baht}×100`)
  }},
  { id: 'change-simple', difficulty: 1, gen: r => {
    const pay = [20,50,100][ri(r,0,2)], price = ri(r,5,pay-5)
    return { type: 'fill', q: `ของราคา ${price} บาท จ่าย ${pay} บาท ทอนเงิน = ___ บาท`, ans: String(pay-price), hint: `${pay} − ${price}` }
  }},
  { id: 'change-100', difficulty: 1, gen: r => {
    const price = ri(r,10,90)
    return mcNum(r, `ของราคา ${price} บาท จ่าย 100 บาท ทอน = ?`, 100-price, [price, 100+price, price-10], plain, `100−${price}`)
  }},
  { id: 'total-items', difficulty: 1, gen: r => {
    const a = ri(r,5,50), b = ri(r,5,50)
    return mcNum(r, `ซื้อของ ${a} บาท กับ ${b} บาท รวม = ?`, a+b, [a*b, a-b>0?a-b:a+b+10, a+b+5], plain, `${a}+${b}`)
  }},
  { id: 'buy-mul', difficulty: 2, gen: r => {
    const qty = ri(r,2,6), price = ri(r,10,50)
    return mcNum(r, `ซื้อของ ${qty} ชิ้น ชิ้นละ ${price} บาท รวม = ?`, qty*price, [qty+price, qty*price+10, qty*price-price], plain, `${qty}×${price}`)
  }},
  { id: 'change-after-buy', difficulty: 2, gen: r => {
    const qty = ri(r,2,4), price = ri(r,10,30), pay = [100,200][ri(r,0,1)]
    const total = qty*price
    if (total >= pay) {
      const price2 = Math.floor((pay-20)/qty)
      return { type: 'fill', q: `ซื้อของ ${qty} ชิ้น ชิ้นละ ${price2} บาท จ่าย ${pay} บาท ทอน = ___ บาท`, ans: String(pay - qty*price2), hint: `${pay}−(${qty}×${price2})` }
    }
    return { type: 'fill', q: `ซื้อของ ${qty} ชิ้น ชิ้นละ ${price} บาท จ่าย ${pay} บาท ทอน = ___ บาท`, ans: String(pay-total), hint: `${pay}−${total}` }
  }},
  { id: 'enough-money', difficulty: 2, gen: r => {
    const have = ri(r,50,150), price = ri(r,20,have+30)
    const enough = have >= price
    return { type: 'fill', q: `มีเงิน ${have} บาท ของราคา ${price} บาท มีพอจ่ายหรือไม่ และเหลือ/ขาดเท่าใด`, ans: enough ? `พอ เหลือ ${have-price} บาท` : `ไม่พอ ขาด ${price-have} บาท`, hint: enough ? `${have} ≥ ${price}` : `${have} < ${price}` }
  }},
  { id: 'discount', difficulty: 2, gen: r => {
    const price = ri(r,20,80), disc = ri(r,5,price-5)
    return mcNum(r, `ของราคา ${price} บาท ลดราคา ${disc} บาท จ่าย = ?`, price-disc, [price+disc, disc, price*disc], plain, `${price}−${disc}`)
  }},
  { id: 'compare-price', difficulty: 2, gen: r => {
    const q1=ri(r,2,5), p1=ri(r,10,30), q2=ri(r,2,5), p2=ri(r,10,30)
    const t1=q1*p1, t2=q2*p2
    const ans = t1 > t2 ? t1 : t2
    return mcNum(r, `แพ็กA (${q1} ชิ้นๆ ละ ${p1}) กับ แพ็กB (${q2} ชิ้นๆ ละ ${p2}) แพ็กใดแพงกว่า`, ans, [t1<t2?t1:t2, t1+t2, Math.abs(t1-t2)], plain, `A=${t1}, B=${t2}`)
  }},
  { id: 'savings', difficulty: 2, gen: r => {
    const daily = ri(r,5,20), days = ri(r,5,14)
    return mcNum(r, `เก็บออมวันละ ${daily} บาท ${days} วัน ได้ = ?`, daily*days, [daily+days, daily*days+daily, daily*(days+1)], plain, `${daily}×${days}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: '1 บาท เท่ากับกี่สตางค์',
    opts: ['100 สตางค์', '10 สตางค์', '1,000 สตางค์', '50 สตางค์'],
    ans: 0, hint: '1 บาท = 100 สตางค์'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'ของราคา 35 บาท จ่าย 50 บาท ทอน = ___ บาท', ans: '15', hint: '50-35=15' },
  { type: 'mc', q: 'ซื้อของ 3 ชิ้น ชิ้นละ 25 บาท รวม = ?', opts: ['75 บาท', '28 บาท', '70 บาท', '80 บาท'], ans: 0, hint: '3×25=75' },
  { type: 'fill', q: '250 สตางค์ = ___ บาท ___ สตางค์', ans: '2 บาท 50 สตางค์', hint: '250÷100=2เหลือ50' },
]

const moneyExam: ChapterExam = { chapterId: 'math-4-money', templates, bank }
export default moneyExam
