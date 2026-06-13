import type { AnyChapter, Scene, QuizQuestion } from '@/types/curriculum'
import { isChapterV2 } from '@/types/curriculum'

// Builds a copy-paste prompt for an EXTERNAL AI to audit one chapter. The AI only
// sees text, so each interactive component gets a plain-language description of
// what it draws on screen — otherwise the AI can't judge "the picture teaches
// the right thing" (the heart of the platform).

const COMPONENT_DESC: Record<string, string> = {
  ThaiNumberBuilder: 'ช่องตัวเลข 6 หลัก (หน่วย→แสน) ปรับแต่ละหลักด้วยปุ่ม +/- แสดงตัวเลขรวมมี comma + คำอ่านภาษาไทยสดๆ ใต้ตัวเลข',
  AddSubCarry: 'การบวก/ลบตั้งหลัก เผยผลทีละหลักจากขวา เห็นเลข "ทด" (สีส้ม) เด้งขึ้นหลักถัดไป หรือเลข "ยืม" (ขีดทับเลขเดิม) จากหลักซ้าย',
  ShapeExplorer: 'รูปเรขาคณิต (config.shape) แตะนับด้าน (config.count=sides) หรือมุม (angles) ทีละอัน ไฮไลต์ + ตัวนับ',
  MultiplyArray: 'ตาราง array จุด config.b แถว แถวละ config.a + สมการ a×b + การบวกซ้ำ (build=ปรับเองได้)',
  DivideShare: 'ลูกอม config.total เม็ด + จาน config.plates ใบ แจกทีละรอบเท่าๆ กัน เม็ดที่เหลือแจกไม่ครบรอบ = เศษ',
  AreaTiles: 'ห้องตาราง config.width×config.height ปูกระเบื้องทีละแถว แสดงพื้นที่ = กว้าง×ยาว',
  OrderMachine: 'นิพจน์ config.expression (เลข+เครื่องหมาย) — mode solve=แตะ op ที่ทำก่อน, left=เฉลยทำซ้ายไปขวา(มักผิด), correct=คูณหารก่อน(ถูก)',
  PizzaCutter: 'พิซซ่ากลมตัดเป็น config.initialParts ชิ้นเท่าๆ กัน แตะเลือกชิ้น แสดงเศษส่วน (บน=ชิ้นที่เลือก ล่าง=ชิ้นทั้งหมด)',
  FractionBars: 'แท่งเศษส่วนกว้างเท่ากันซ้อนกัน (config.rows) แตะระบายช่อง เทียบความยาว=เทียบเศษส่วน showEquals=โชว์เมื่อเท่ากัน',
  ClockDrag: 'หน้าปัดนาฬิกา ลากเข็มได้ เข็มยาว=นาที เข็มสั้น=ชั่วโมง',
  MoneyDrag: 'เหรียญ/ธนบัตรไทย ลากมารวม นับยอดเงิน/เงินทอน',
  NumberLine: 'เส้นจำนวน config.min-config.max ลากเครื่องหมายไปตำแหน่งต่างๆ',
  BarChartDrag: 'แผนภูมิแท่ง ลากปรับความสูงแท่ง เทียบค่า',
  CubeBuilder: 'ตารางวางลูกบาศก์ isometric (มอง 3 มิติ) แตะวาง/ลบ นับปริมาตร',
  BalanceDrag: 'ตาชั่ง 2 จาน ใส่น้ำหนัก ฝั่งหนักจม ฝั่งเบาลอย (สมดุลเมื่อเท่ากัน)',
  AngleDrag: 'ไม้โปรแทรกเตอร์ ลากแขนมุม แสดงองศา + ชื่อประเภท (แหลม/ฉาก/ป้าน/ตรง)',
  ShapeMeasure: 'สี่เหลี่ยมลากปรับกว้าง/ยาว แสดงพื้นที่+เส้นรอบรูป',
  FractionCutter: 'วงกลมแบ่งส่วน ปรับจำนวนส่วน+ระบาย แสดงเศษส่วน',
  TextVis: 'ข้อความ config.sentence โดยไฮไลต์คำสำคัญ (config.words) เป็นสี/ขีดเส้น',
  ParallelLines: 'เส้น 2 เส้น ปรับมุมเอียง — ตรง(ขนาน ไม่ตัดกัน) vs เอียง(ตัดกัน)',
  ProbabilityBag: 'ถุงลูกบอลหลายสี (config.balls) หยิบสุ่ม สะสมสถิติ + แสดงสัดส่วนโอกาส',
  QuadMorph: 'สี่เหลี่ยมเปลี่ยนชนิด (จัตุรัส/ผืนผ้า/ด้านขนาน/ขนมเปียกปูน) + ชื่อ+คุณสมบัติ',
  TriangleAngles: 'สามเหลี่ยมมุม config.a/b/c — กดรวม 3 มุมมาต่อกันเป็นเส้นตรง 180°',
  CircleRadius: 'วงกลม ปรับรัศมี เห็นเส้นผ่านศูนย์กลาง = 2×รัศมี',
  FactorBuilder: 'ตารางเลข 1..config.n แตะเลือกตัวที่หาร n ลงตัว (ตัวประกอบ) ผิดสั่น',
  EquationBalance: 'ตาชั่งสมการ x+config.c=config.r หยิบ c ออกสองข้าง → x=r−c',
  PercentBar: 'ตาราง 100 ช่อง ระบายตาม % + แสดง %ของจำนวน',
}

function describeVisual(v?: { component: string; config: Record<string, unknown> }): string {
  if (!v) return '(ไม่มีภาพ — มีแต่ข้อความ)'
  const desc = COMPONENT_DESC[v.component] ?? '(ไม่มีคำบรรยาย)'
  const cfg = JSON.stringify(v.config)
  return `[ภาพ: ${v.component}] ${desc}\n      config = ${cfg}`
}

function describeQuestion(q: QuizQuestion, i: number): string {
  if (q.type === 'mc') return `  ${i + 1}. (เลือกตอบ) ${q.q}\n     ตัวเลือก: ${q.opts.map((o, j) => `${j}:${o}`).join(' · ')} → เฉลย ans=${q.ans} ("${q.opts[q.ans]}")`
  if (q.type === 'fill') return `  ${i + 1}. (เติมคำ) ${q.q} → เฉลย "${q.ans}"`
  if (q.type === 'slider') return `  ${i + 1}. (สไลเดอร์ ${q.min}-${q.max} step ${q.step} ${q.unit}) ${q.q} → เฉลย ${q.ans}`
  return `  ${i + 1}. ${JSON.stringify(q)}`
}

function describeScene(s: Scene, i: number): string {
  const parts = [`  ฉาก ${i + 1} [${s.id}]`, `    พูด: ${s.say}`, `    ${describeVisual(s.visual)}`]
  if (s.goal) {
    if (s.goal.type === 'answer') parts.push(`    เป้าหมาย: ตอบคำถาม — ${describeQuestion(s.goal.question, 0).trim()}`)
    else if (s.goal.type === 'reach-value') parts.push(`    เป้าหมาย: ทำให้ค่า ${s.goal.key} = ${s.goal.value}`)
    else parts.push(`    เป้าหมาย: โต้ตอบกับภาพ`)
  }
  if (s.hint) parts.push(`    คำใบ้: ${s.hint}`)
  return parts.join('\n')
}

const RUBRIC = `คุณคือคณะกรรมการตรวจสอบสื่อการเรียนคณิตศาสตร์ ป.4-6 (หลักสูตรไทย) ตรวจบทเรียนด้านล่างนี้อย่าง "เข้มงวดและวิพากษ์" หาจุดที่ไม่สมเหตุสมผล/ผิด/เพี้ยน เชิงรุก

⚠️ สำคัญ: อย่าชมเกินจริง — งานวิจัยพบ AI มักให้คะแนนบวกเกินจริง ให้ตั้งสมมติฐานว่า "ต้องมีบางอย่างผิด" แล้วตามหา ถ้าไม่แน่ใจให้ถือเป็นปัญหาที่ต้องตรวจ

ตรวจ 4 มิติ โดยสวม 3 บทบาท:
1. [ครู] ความถูกต้องคณิต/เนื้อหา — โจทย์คำนวณถูกทุกข้อไหม? เฉลย ans ตรงตัวเลือกที่ถูกจริงไหม? นิยาม/สูตรถูกตามหลักสากลไหม? คำอ่าน/หน่วยถูกไหม?
2. [ครู] ตรงหลักสูตรไทยของชั้นนี้ไหม — เนื้อหายาก/ง่ายเกินชั้นไหม? มีหัวข้อที่ควรเป็นชั้นอื่นไหม?
3. [ผู้ปกครอง] ภาษาเหมาะวัยไหม — เด็กชั้นนี้เข้าใจง่ายไหม? มีศัพท์ยาก/กำกวมไหม? โทนเป็นมิตรไหม?
4. [เด็ก/UX] ภาพ-interactive สอนถูกไหม — จากคำบรรยายภาพ: ฟิสิกส์/สัดส่วน/ลำดับถูกไหม? เป้าหมาย (goal) สมเหตุสมผลและทำได้จริงไหม? metaphor ทำให้เข้าใจผิด (misconception) ไหม?

ตอบเป็นตาราง markdown:
| ตำแหน่ง (ฉาก/ข้อ) | มิติ (1-4) | ระดับ (สูง/กลาง/ต่ำ) | ปัญหา | เสนอแก้ |

ปิดท้ายด้วยบรรทัดสรุป: "ผลตรวจ: [ผ่าน / มีปัญหาต้องแก้] — สูง X · กลาง Y · ต่ำ Z"
ถ้าไม่พบปัญหาเลย ให้ระบุชัดว่าตรวจครบทุกมิติแล้วและยืนยันว่าผ่าน`

// ── Operator brief: for a cloud browser-agent (ChatGPT Operator / Gemini) that
// actually OPENS the live page and plays it like a real student, then audits. ──
const PLAY_GUIDE = `วิธีเล่น (ทำเหมือนเด็กจริง):
1. เปิด URL ด้านบน อ่านข้อความแต่ละฉาก แล้วลงมือกับภาพ interactive — ลาก/แตะ/กดปุ่มในภาพให้ "ผ่านเงื่อนไข" จนปุ่ม "ถัดไป ▶" เปิดใช้ได้ แล้วกดไปฉากถัดไป จนครบทุกฉาก
2. สังเกตภาพทุกฉากอย่างตั้งใจ: ฟิสิกส์/สัดส่วน/ตัวเลข/ลำดับ ถูกต้องไหม (เช่น ฝั่งหนักของตาชั่งต้องจม, 3/4 ต้องระบาย 3 ใน 4 จริง)
3. ทำแบบฝึกหัดท้ายบทให้ครบทุกข้อ ตรวจว่าเฉลยที่ระบบบอกถูกต้องไหม
4. กดปุ่ม "💡 ภาพช่วยจำ" (มุมขวาบน) อ่าน metaphor — ตรวจว่าทำให้เข้าใจผิด (misconception) ไหม`

export function buildOperatorBrief(ch: AnyChapter, baseUrl: string): string {
  const url = `${baseUrl.replace(/\/$/, '')}/math/${ch.grade}/${ch.slug}/`
  return `${RUBRIC}

🌐 เข้าเว็บนี้แล้ว "เล่นจริง" ก่อนตรวจ (อย่าตรวจจากการเดา — ต้องเล่นให้เห็นภาพจริงทุกฉาก)
URL: ${url}
บทเรียน: ${ch.title} (ป.${ch.grade} บทที่ ${ch.chapter})

${PLAY_GUIDE}

ตรวจครบแล้วตอบเป็นตาราง issue ตามรูปแบบด้านบน`
}

export function buildAuditPrompt(ch: AnyChapter): string {
  const header = `=== บทเรียน: ${ch.title} (ป.${ch.grade} บทที่ ${ch.chapter}) ===`
  let body: string
  if (isChapterV2(ch)) {
    const scenes = ch.scenes.map(describeScene).join('\n\n')
    const practice = ch.finalPractice.map(describeQuestion).join('\n')
    const metas = ch.metaphors?.length
      ? '\n\n--- ภาพช่วยจำ (metaphor) ---\n' + ch.metaphors.map((m, i) => `  ${i + 1}. ${m.title} ${m.emoji ?? ''}: ${m.story.replace(/\n/g, ' ')}`).join('\n')
      : ''
    body = `รูปแบบ: บทเรียนแบบ story (เล่าทีละฉาก กดไปต่อ) แล้วจบด้วยแบบฝึกหัด\n\n--- ฉากเรื่องเล่า ---\n${scenes}\n\n--- แบบฝึกหัดท้ายบท ---\n${practice}${metas}`
  } else {
    const practice = ch.practice.map(describeQuestion).join('\n')
    body = `รูปแบบ: บทเรียนแบบ 3 แท็บเดิม\n\n--- แบบฝึกหัด ---\n${practice}`
  }
  return `${RUBRIC}\n\n${header}\n${body}`
}
