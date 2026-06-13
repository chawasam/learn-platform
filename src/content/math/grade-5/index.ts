import type { AnyChapter } from '@/types/curriculum'
import numberCalc from './number-calc'
import angles from './angles'
import parallelLines from './parallel-lines'
import probability from './probability'
import equivalentFractions from './equivalent-fractions'
import fractionArithmetic from './fraction-arithmetic'
import decimals from './decimals'
import decimalArithmetic from './decimal-arithmetic'
import wordProblems from './word-problems'
import quadrilaterals from './quadrilaterals'
import triangles from './triangles'
import circles from './circles'
import volume from './volume'

// เรียงตามหลักสูตร math-thai-p456 p5-c01..c13 — ครบ 13 บท v2 (story)
const chapters: AnyChapter[] = [
  numberCalc,            // 1 จำนวนนับและการคำนวณ
  angles,                // 2 มุม
  parallelLines,         // 3 เส้นขนาน
  probability,           // 4 สถิติและความน่าจะเป็น
  equivalentFractions,   // 5 เศษส่วนที่เท่ากัน
  fractionArithmetic,    // 6 การคำนวณเศษส่วน
  decimals,              // 7 ทศนิยม
  decimalArithmetic,     // 8 การคำนวณทศนิยม
  wordProblems,          // 9 โจทย์ปัญหา
  quadrilaterals,        // 10 รูปสี่เหลี่ยม
  triangles,             // 11 รูปสามเหลี่ยม
  circles,               // 12 รูปวงกลม
  volume,                // 13 ทรงสามมิติและปริมาตร
]

export default chapters
