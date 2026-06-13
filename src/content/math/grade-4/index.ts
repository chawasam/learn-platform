import type { AnyChapter } from '@/types/curriculum'
import numbersV2 from './numbers'
import addSubV2 from './add-sub'
import shapesV2 from './shapes'
import multiplyV2 from './multiply'
import divideV2 from './divide'
import barChartV2 from './bar-chart'
import lengthV2 from './length'
import areaV2 from './area'
import moneyV2 from './money'
import fractionsV2 from './fractions'
import timeV2 from './time'
import decimals from './decimals'
import mixedV2 from './mixed'

// เรียงตามหลักสูตร math-thai-p456 p4-c01..c13 — ครบ 13 บท v2 (story) ทั้งหมด
const chapters: AnyChapter[] = [
  numbersV2,    // 1 จำนวนนับมากกว่าแสน
  addSubV2,     // 2 การบวกและการลบ
  shapesV2,     // 3 รูปเรขาคณิต
  multiplyV2,   // 4 การคูณ
  divideV2,     // 5 การหาร
  barChartV2,   // 6 แผนภูมิแท่ง
  lengthV2,     // 7 การวัดความยาว
  areaV2,       // 8 พื้นที่
  moneyV2,      // 9 เงินและการทอน
  fractionsV2,  // 10 เศษส่วน
  timeV2,       // 11 เวลา
  decimals,     // 12 ทศนิยม
  mixedV2,      // 13 บวกลบคูณหารระคน
]

export default chapters
