# Content Gap Report — 2026-06-14

## บริบท
วิเคราะห์ช่องว่างเนื้อหาของ learn-platform เทียบกับ platform ระดับโลก (Mathigon, Khan Academy, Brilliant, PhET)
และ fix ช่องโหว่หลักในบทการคูณ ป.4

---

## ช่องโหว่ที่พบ

### 1. Story สอน concept แต่ขาด procedure
บางบทสอนว่า "X คืออะไร" แต่ไม่สอน "ทำ X ยังไง"
- **การคูณ**: MultiplyArray สอน array model แต่ exam.ts ถามคูณ 3 หลัก × 1 หลัก → เด็กไม่รู้ column method
- **การหาร**: DivideShare สอน sharing model แต่ไม่มี long division procedure

### 2. finalPractice คุณภาพต่ำในบทคูณ
ก่อน fix: 7 จาก 10 ข้อเป็น single-digit × single-digit ("4×3=___", "2×3=___")
ไม่ตรงกับ exam bank ที่ทดสอบ 2-4 หลัก

### 3. 5 ช่องโหว่ใหญ่เทียบ world-class
| ช่อง | Platform ที่ทำได้ | เราขาด |
|---|---|---|
| Spaced practice + mastery decay | Khan Academy | ✗ (ต้องมี backend) |
| Adaptive diagnostic feedback | Brilliant | ✗ (binary ผิด/ถูก) |
| Persistent manipulatives | Mathigon Polypad | ✗ (reinvent ทุกบท) |
| Interleaved practice | research-backed | ✗ (linear story เท่านั้น) |
| Peer visibility | Desmos | ✗ (solo เท่านั้น) |

**ทำได้โดยไม่ต้องมี backend:** interleaved finalPractice + diagnostic hints per error pattern

---

## งานที่ทำใน session นี้

### สร้าง `MultiplyColumn.tsx`
Component ใหม่สำหรับแสดง column multiplication step-through:
- Props: `a` (top, multi-digit), `b` (multiplier, single-digit), `readOnly`, `initialStep`, `onStateChange`
- เผยผลทีละหลักจากขวา — กด "คูณหลักถัดไป ▶"
- ตัวทด (carry) สีม่วง ลอยขึ้นหลักถัดไปด้วย AnimatePresence
- รองรับ final carry (ผลลัพธ์ยาวกว่า A)
- Reports `{ done: 1 }` เมื่อทุกหลักถูกเผย → ใช้กับ `goal: reach-value`

ลอก pattern จาก `AddSubCarry.tsx` แต่ logic ต่างกัน:
- Addition: A[i] + B[i] + carry (B ยาวเท่ากัน)
- Multiplication: A[i] × b + carry (b เดียว ไม่มี B array)

### เพิ่ม 3 scene ใน multiply.ts
แทรกระหว่าง "fast" และ "quiz":
1. `column-intro`: แนะนำการตั้งคูณ (readOnly, ดูเฉยๆ) — 45×6
2. `column-step`: interactive 45×6 พร้อม goal done=1
3. `column-3dig`: interactive 123×4 (3 หลัก) พร้อม goal done=1

อัปเดต `quiz` scene: ใช้ MultiplyColumn (readOnly) + ถาม 35×4=? (แทน 6×4=?)

### Upgrade finalPractice
ก่อน → หลัง:
- "4 × 3 = ___" → "47 × 3 = 141"
- "2 × 3 = ___" → "56 × 4 = 224"
- "5 × 4 = ?" → "78 × 5 = 390" (mc)
- slider "6×3=18" → slider "23×6=138" (min 0, max 200)
- "7ชิ้น×5แถว" → "12ชิ้น×6แถว=72" (harder)
- ทุก hint เพิ่ม step-through ทด เช่น "หน่วย: 7×3=21 เขียน 1 ทด 2 · สิบ: 4×3+2=14"

---

## Files Changed
- `src/components/interactive/MultiplyColumn.tsx` (ใหม่)
- `src/types/curriculum.ts` (เพิ่ม 'MultiplyColumn' ใน ComponentName)
- `src/components/interactive/registry.tsx` (lazy import)
- `src/content/math/grade-4/multiply.ts` (3 scenes + quiz + finalPractice)
- `src/lib/auditPrompt.ts` (เพิ่ม component description)

## Self-test Results
- `npm run build` ✓ 135 pages
- Playwright screenshots: mc-00 ถึง mc-17 ผ่านทั้งหมด
- ตรวจ physics:
  - 45×6: carry 3 เด้งเหนือหลักสิบ ✓, result 270 ✓
  - 123×4: carry 1 เหนือหลักสิบ ✓, result 492 ✓
  - 35×4: quiz = 140 ✓

---

## งานที่ยังเหลือ (content gaps ที่ยังไม่ fix)

### Priority สูง (ทำได้โดยไม่ต้องมี backend)
1. **บทหาร**: เพิ่ม long division procedure scenes (DivideColumn component?)
2. **Upgrade finalPractice** บทอื่น: money, time, add-sub ตรวจ
3. **Interleaved review**: เพิ่มโจทย์ผสม 2-3 บทเก่าใน finalPractice ท้ายบทใหม่

### Priority กลาง (ต้องใช้เวลา)
4. **Diagnostic hints per error pattern**: hint เฉพาะเจาะจงต่อ error type ไม่ใช่แค่ "ลองอีกครั้ง"
5. **Expand finalPractice** ทุกบทจาก 10 → 15-20 ข้อ

### Priority ต่ำ (ต้องมี backend)
6. Spaced repetition + mastery tracking
7. Peer visibility

---

*Report generated: 2026-06-14*
*Session: samdocode + s2 workflow*
