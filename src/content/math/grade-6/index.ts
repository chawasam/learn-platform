import type { AnyChapter } from '@/types/curriculum'
import numberCalc from './number-calc'
import factors from './factors'
import fractionCalc from './fraction-calc'
import decimals from './decimals'
import decimalCalc from './decimal-calc'
import parallelAngles from './parallel-angles'
import equations from './equations'
import scale from './scale'
import quadArea from './quad-area'
import circleArea from './circle-area'
import percent from './percent'
import volume from './volume'
import statistics from './statistics'

// เรียงตามหลักสูตร math-thai-p456 p6-c01..c13 — ครบ 13 บท v2 (story)
// เขียนทับ v1 เดิมที่ผิดหลักสูตร (เคยมี "จำนวนเต็ม" ซึ่งเป็นเนื้อหา ม.1)
const chapters: AnyChapter[] = [
  numberCalc,      // 1 จำนวนนับและการคำนวณ
  factors,         // 2 ตัวประกอบ ห.ร.ม. ค.ร.น.
  fractionCalc,    // 3 เศษส่วนและการคำนวณ
  decimals,        // 4 ทศนิยม
  decimalCalc,     // 5 การคำนวณทศนิยม
  parallelAngles,  // 6 เส้นขนานและมุม
  equations,       // 7 สมการ
  scale,           // 8 ทิศและมาตราส่วน
  quadArea,        // 9 พื้นที่รูปสี่เหลี่ยม
  circleArea,      // 10 พื้นที่และเส้นรอบวง
  percent,         // 11 ร้อยละ
  volume,          // 12 ทรงสามมิติและปริมาตร
  statistics,      // 13 สถิติและความน่าจะเป็น
]

export default chapters
