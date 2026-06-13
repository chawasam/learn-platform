import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ เวลา ป.4 — นาฬิกา 12/24 ชม., เวลาที่ผ่านไป, แปลงหน่วยเวลา
const templates: QuestionTemplate[] = [
  { id: 'read-clock', difficulty: 1, gen: r => {
    const h = ri(r,1,12), m = ri(r,0,5)*10
    const mStr = m === 0 ? 'นาฬิกาตรง' : `${m} นาที`
    return { type: 'fill', q: `นาฬิกาชี้เลข ${h} โมง ${mStr} เขียนเป็นเลข 24 ชม. ช่วงบ่าย (13-24): ___`, ans: `${h+12}:${m.toString().padStart(2,'0')}`, hint: `บ่าย ${h} โมง = ${h+12}:${m.toString().padStart(2,'0')}` }
  }},
  { id: 'min-to-hour', difficulty: 1, gen: r => {
    const h = ri(r,1,5), m = ri(r,0,4)*15
    return { type: 'fill', q: `${h*60+m} นาที = ___ ชั่วโมง ___ นาที`, ans: `${h} ชั่วโมง ${m} นาที`, hint: `60 นาที = 1 ชั่วโมง` }
  }},
  { id: 'hour-to-min', difficulty: 1, gen: r => {
    const h = ri(r,1,5)
    return mcNum(r, `${h} ชั่วโมง = ___ นาที`, h*60, [h*24, h*6, h*60+1], plain, `${h}×60`)
  }},
  { id: 'elapsed-simple', difficulty: 1, gen: r => {
    const startH = ri(r,7,15), startM = ri(r,0,5)*10
    const durMin = ri(r,1,4)*15
    const totalMin = startH*60 + startM + durMin
    const endH = Math.floor(totalMin/60)%24
    const endM = totalMin%60
    return { type: 'fill', q: `เริ่ม ${startH}:${startM.toString().padStart(2,'0')} น. ใช้เวลา ${durMin} นาที สิ้นสุด = ___`, ans: `${endH}:${endM.toString().padStart(2,'0')} น.`, hint: `${startM}+${durMin}=${startM+durMin}` }
  }},
  { id: 'elapsed-hours', difficulty: 2, gen: r => {
    const startH = ri(r,6,14), dur = ri(r,1,5)
    return { type: 'fill', q: `เริ่มเวลา ${startH}:00 น. เดินทาง ${dur} ชั่วโมง ถึงเวลา = ___`, ans: `${startH+dur}:00 น.`, hint: `${startH}+${dur}` }
  }},
  { id: 'duration-calc', difficulty: 2, gen: r => {
    const startH = ri(r,7,12), endH = ri(r,startH+1,startH+5)
    const startM = ri(r,0,5)*10, endM = ri(r,0,5)*10
    const durMin = (endH*60+endM) - (startH*60+startM)
    if (durMin <= 0) {
      const h2 = startH+2, m2 = startM
      return { type: 'fill', q: `เริ่ม ${startH}:${startM.toString().padStart(2,'0')} สิ้นสุด ${h2}:${m2.toString().padStart(2,'0')} ใช้เวลา = ___ นาที`, ans: String(120), hint: `2 ชั่วโมง = 120 นาที` }
    }
    return { type: 'fill', q: `เริ่ม ${startH}:${startM.toString().padStart(2,'0')} น. สิ้นสุด ${endH}:${endM.toString().padStart(2,'0')} น. ใช้เวลา = ___ นาที`, ans: String(durMin), hint: `(${endH*60+endM})−(${startH*60+startM})` }
  }},
  { id: 'days-to-hours', difficulty: 1, gen: r => {
    const d = ri(r,1,5)
    return mcNum(r, `${d} วัน = ___ ชั่วโมง`, d*24, [d*12, d*60, d*24+24], plain, `${d}×24`)
  }},
  { id: 'week-days', difficulty: 1, gen: r => {
    const w = ri(r,1,4)
    return mcNum(r, `${w} สัปดาห์ = ___ วัน`, w*7, [w*5, w*6, w*7+1], plain, `${w}×7`)
  }},
  { id: 'am-pm', difficulty: 1, gen: r => {
    const h24 = ri(r,13,23)
    const h12 = h24-12
    return mcStr(r, `เวลา ${h24}:00 น. ตรงกับเวลาใดในระบบ 12 ชั่วโมง`,
      `บ่าย ${h12} โมง`,
      [`เช้า ${h12} โมง`, `บ่าย ${h24} โมง`, `เที่ยง ${h12} โมง`],
      `${h24}-12=${h12} โมงบ่าย`)
  }},
  { id: 'months-to-days', difficulty: 2, gen: () => ({
    type: 'mc' as const, q: '1 ปี มีกี่เดือน',
    opts: ['12 เดือน', '10 เดือน', '24 เดือน', '365 เดือน'],
    ans: 0, hint: 'มกราคม - ธันวาคม = 12 เดือน'
  })},
  { id: 'future-time', difficulty: 2, gen: r => {
    const nowH = ri(r,8,18), nowM = ri(r,0,5)*10
    const addH = ri(r,1,3), addM = ri(r,0,5)*10
    const totalM = nowH*60+nowM + addH*60+addM
    const fH = Math.floor(totalM/60)%24
    const fM = totalM%60
    return { type: 'fill', q: `ตอนนี้ ${nowH}:${nowM.toString().padStart(2,'0')} น. อีก ${addH} ชั่วโมง ${addM} นาที = ___`, ans: `${fH}:${fM.toString().padStart(2,'0')} น.`, hint: `${nowH*60+nowM}+${addH*60+addM}=${totalM}` }
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: '1 ชั่วโมง มีกี่นาที',
    opts: ['60 นาที', '100 นาที', '24 นาที', '30 นาที'],
    ans: 0, hint: '1 ชั่วโมง = 60 นาที'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: '90 นาที = ___ ชั่วโมง ___ นาที', ans: '1 ชั่วโมง 30 นาที', hint: '90÷60=1 เหลือ 30' },
  { type: 'mc', q: 'เริ่ม 9:00 น. ใช้เวลา 45 นาที สิ้นสุดเวลา = ?', opts: ['9:45 น.', '9:55 น.', '10:00 น.', '10:15 น.'], ans: 0, hint: '9:00+45 นาที=9:45' },
  { type: 'fill', q: '2 สัปดาห์ = ___ วัน', ans: '14', hint: '2×7=14' },
]

const timeExam: ChapterExam = { chapterId: 'math-4-time', templates, bank }
export default timeExam
