import type { QuizQuestion } from '@/types/curriculum'
import type { ChapterExam, QuestionTemplate } from '@/types/exam'
import { ri, mcNum, mcStr, plain } from '@/content/exams/helpers'

// แนวข้อสอบ รูปทรงเรขาคณิต ป.4 — 2D (ด้าน/มุม) + 3D (หน้า/ขอบ/จุดยอด) + เส้นรอบรูป
const templates: QuestionTemplate[] = [
  { id: 'sides-2d', difficulty: 1, gen: r => {
    const shapes: [string, number][] = [['สามเหลี่ยม',3],['สี่เหลี่ยม',4],['ห้าเหลี่ยม',5],['หกเหลี่ยม',6],['แปดเหลี่ยม',8]]
    const [name, sides] = shapes[ri(r,0,4)]
    return { type: 'fill', q: `${name} มีกี่ด้าน`, ans: String(sides), hint: `นับด้านของ${name}` }
  }},
  { id: 'angles-2d', difficulty: 1, gen: r => {
    const shapes: [string, number][] = [['สามเหลี่ยม',3],['สี่เหลี่ยม',4],['ห้าเหลี่ยม',5],['หกเหลี่ยม',6]]
    const [name, angles] = shapes[ri(r,0,3)]
    return mcNum(r, `${name} มีกี่มุม`, angles, [angles-1, angles+1, angles*2], plain, `มุม = ด้าน`)
  }},
  { id: 'peri-triangle', difficulty: 1, gen: r => {
    const a = ri(r,3,10), b = ri(r,3,10), c = ri(r,3,10)
    return { type: 'fill', q: `สามเหลี่ยมด้าน ${a}, ${b}, ${c} ซม. เส้นรอบรูป = ___ ซม.`, ans: String(a+b+c), hint: `${a}+${b}+${c}` }
  }},
  { id: 'peri-pentagon', difficulty: 2, gen: r => {
    const s = ri(r,3,12)
    return mcNum(r, `รูปห้าเหลี่ยมด้านเท่า ด้านละ ${s} ซม. เส้นรอบรูป = ?`, 5*s, [4*s, 6*s, s+5], plain, `5×${s}`)
  }},
  { id: 'identify-3d', difficulty: 1, gen: r => {
    const solids: [string, string][] = [
      ['ทรงลูกบาศก์','ทรงสี่เหลี่ยมมุมฉาก'],
      ['ทรงกระบอก','ทรงปริซึม'],
      ['ทรงกรวย','ทรงพีระมิด'],
    ]
    const [correct, wrong1] = solids[ri(r,0,2)]
    return mcStr(r, `รูปทรง 3 มิติที่มีฐานเป็นวงกลมและด้านข้างโค้งขึ้นมาเป็นจุด คือ`,
      'ทรงกรวย',
      ['ทรงกระบอก', 'ทรงพีระมิด', 'ทรงลูกบาศก์'],
      'ฐานวงกลม + ยอดแหลม = ทรงกรวย')
  }},
  { id: 'cube-faces', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ทรงลูกบาศก์มีกี่หน้า',
    opts: ['6 หน้า', '4 หน้า', '8 หน้า', '12 หน้า'],
    ans: 0, hint: 'ลูกบาศก์ = 6 หน้าสี่เหลี่ยมเท่ากัน'
  })},
  { id: 'cylinder-faces', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ทรงกระบอกมีหน้าเป็นวงกลมกี่หน้า',
    opts: ['2 หน้า', '1 หน้า', '3 หน้า', '4 หน้า'],
    ans: 0, hint: 'ฐานบน + ฐานล่าง = 2 วงกลม'
  })},
  { id: 'edges-cube', difficulty: 2, gen: () => ({
    type: 'mc' as const, q: 'ทรงลูกบาศก์มีกี่ขอบ (edges)',
    opts: ['12 ขอบ', '6 ขอบ', '8 ขอบ', '4 ขอบ'],
    ans: 0, hint: '3 ขอบ/หน้า × 4 = 12'
  })},
  { id: 'vertices-cube', difficulty: 2, gen: () => ({
    type: 'mc' as const, q: 'ทรงลูกบาศก์มีกี่จุดยอด (vertices)',
    opts: ['8 จุดยอด', '6 จุดยอด', '12 จุดยอด', '4 จุดยอด'],
    ans: 0, hint: 'มุมทั้ง 8 ของลูกบาศก์'
  })},
  { id: 'peri-hexagon', difficulty: 2, gen: r => {
    const s = ri(r,2,8)
    return { type: 'fill', q: `รูปหกเหลี่ยมด้านเท่า ด้านละ ${s} ซม. เส้นรอบรูป = ___ ซม.`, ans: String(6*s), hint: `6×${s}` }
  }},
  { id: 'identify-by-sides', difficulty: 1, gen: r => {
    const shapes: [number, string][] = [[3,'สามเหลี่ยม'],[4,'สี่เหลี่ยม'],[5,'ห้าเหลี่ยม'],[6,'หกเหลี่ยม']]
    const [n, name] = shapes[ri(r,0,3)]
    return mcStr(r, `รูปหลายเหลี่ยมที่มี ${n} ด้าน เรียกว่า`,
      name,
      shapes.filter(s=>s[1]!==name).map(s=>s[1]),
      `${n} ด้าน = ${name}`)
  }},
  { id: 'concept', difficulty: 1, gen: () => ({
    type: 'mc' as const, q: 'ทรงพีระมิดฐานสี่เหลี่ยมมีกี่หน้า',
    opts: ['5 หน้า (ฐาน 1 + สามเหลี่ยม 4)', '4 หน้า', '6 หน้า', '8 หน้า'],
    ans: 0, hint: 'ฐาน 1 + ด้านข้างสามเหลี่ยม 4 = 5'
  })},
]

const bank: QuizQuestion[] = [
  { type: 'fill', q: 'สี่เหลี่ยมมีกี่มุม', ans: '4', hint: 'สี่เหลี่ยม = 4 มุม' },
  { type: 'mc', q: 'รูปหกเหลี่ยมด้านเท่า ด้านละ 5 ซม. เส้นรอบรูป = ?', opts: ['30 ซม.', '25 ซม.', '36 ซม.', '24 ซม.'], ans: 0, hint: '6×5=30' },
  { type: 'fill', q: 'ทรงลูกบาศก์มีกี่ขอบ', ans: '12', hint: '12 ขอบ' },
]

const shapesExam: ChapterExam = { chapterId: 'math-4-shapes', templates, bank }
export default shapesExam
