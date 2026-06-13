<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# learn-platform — Thai K-12 Interactive Learning Platform

## ⛔ STANDING RULE — อ่านแผนหลักก่อนทำงานทุก session

**ก่อนแตะโค้ดใดๆ ต้องอ่านไฟล์แผนนี้ก่อนเสมอ:**

```
C:\Users\ck_sa\.claude\plans\stateless-conjuring-panda.md
```

แผนนั้นคือ source of truth: vision, การตัดสินใจที่ user lock แล้ว, รายละเอียดทุกบททั้ง 39 บท, สถานะ phase ปัจจุบัน
ทำงานเสร็จส่วนไหน → อัปเดต checkbox + Progress Log ในไฟล์แผนทันที
**Rule นี้ลบได้เมื่อทุก phase ในแผนเป็น DONE เท่านั้น**

## Vision (ห้ามหลุด)

เด็กที่เรียนช้าที่สุดในห้อง **มองภาพแล้วเข้าใจทันที** — ระดับเดียวกับงานอธิบาย fiber optic ใต้มหาสมุทรของ ciechanow.ski
- บทเรียน = story ทีละฉาก กดไปต่อ, 1 ฉาก = 1 ไอเดีย, ภาพ interactive เต็มจอ, ข้อความสั้น
- ภาพ custom ต่อ concept — ไม่ใช่ generic component ยัด config
- ไม่แน่ใจ design → research ของระดับโลกก่อน (Mathigon / PhET / Brilliant / Khan) copy แล้วปรับให้ดีกว่า

## Curriculum

**ยึด `C:\Users\ck_sa\Desktop\math-thai-p456\index.html` (lines 419–1169) เป็น reference เดียว** — ตรวจความถูกต้องแล้วทั้ง 39 บท ห้ามแต่งหัวข้อบทเอง (เคยพลาด: เขียน "จำนวนเต็ม" ลง ป.6 ซึ่งเป็นเนื้อหา ม.1)

## 🧪 SELF-TEST PROTOCOL (บังคับทุก interactive component — ห้ามข้าม)

ทุกครั้งที่สร้าง/แก้ interactive:
1. **Render จริง** — `npm run dev` + Playwright (ติดตั้ง `npm i --no-save playwright` เท่านั้น **ห้ามใส่ devDependencies** — CF Pages CI จะโหลด Chromium ~150MB ทุก build) → screenshot ทุก state สำคัญ
2. **อ่าน screenshot ด้วยตาตัวเอง (Read tool)** เช็คโคตรละเอียด:
   - **ฟิสิกส์** — ตาชั่งฝั่งหนักต้อง*จมลง*, เข็มนาฬิกาชี้ตรงเลขจริง, มุมกางตรงองศา, ของตกลงล่าง
   - **คณิต** — เลขที่โชว์ตรงกับ state, สัดส่วนภาพตรงค่าจริง (3/4 ต้องระบาย 3 ใน 4 จริง)
   - **ภาษา** — ไทยไม่เพี้ยน label ครบ
3. **ทดสอบ interaction** — คลิก/ลากผ่าน Playwright, screenshot ก่อน-หลัง เทียบ state เปลี่ยนถูกทิศ
4. เจอผิด = แก้ก่อน ship

> ที่มา: BalanceDrag เคยปล่อยบั๊ก "ฝั่งหนักลอยขึ้น" เพราะเช็คแค่ compile ผ่าน ไม่เคยดูภาพจริง — ภาพที่สอนฟิสิกส์ผิดให้เด็ก แย่กว่าไม่มีภาพ

## Stack & Commands

- Next.js 16 App Router, `output: 'export'` (static), Tailwind v4, Framer Motion
- ทุก dynamic route ต้องมี `generateStaticParams`
- `npm run dev` (dev server) / `npm run build` (ต้องผ่านก่อน commit เสมอ)
- Deploy: Cloudflare Pages (**ไม่ใช่ Vercel**) — push master → GitHub Action auto-deploy (ต้องมี secret `CLOUDFLARE_API_TOKEN`) หรือ manual: `npm run build && wrangler pages deploy out --project-name learn-platform`
- Live: https://learn-platform-c5s.pages.dev — Repo: https://github.com/chawasam/learn-platform

## โครงสร้าง

- `src/types/curriculum.ts` — types กลาง (Chapter v1 = 3 แท็บเดิม, ChapterV2 = scenes story)
- `src/lib/content.ts` — registry วิชา/ชั้น (เพิ่มวิชา/ชั้น = additive entry เดียว ห้าม refactor)
- `src/content/<subject>/grade-<n>/` — เนื้อหา (บทละไฟล์สำหรับ v2)
- `src/components/interactive/` — interactive components + `registry.tsx` (lazy map)
- `src/components/lesson/` — LessonStory (v2) / ExplainTab+DemoTab+PracticeTab (v1 เดิม รอลบตอน migrate ครบ)

## กฎเขียนเนื้อหา

- เนื้อหาก้อนใหญ่: เขียน ≤1 บท/Edit กัน output limit ชน
- โจทย์ทุกข้อ: คำนวณมือยืนยันคำตอบ, `ans` index ตรง option, slider ต้องมี `unit`
- **Slider/number-line ต้องรวม 0 ในช่วงเสมอ** — `min` เริ่มที่ 0 (หรือค่าต่ำกว่าถ้าโจทย์ติดลบ) ไม่ตัด 0 ทิ้ง เด็กต้องเห็น scale เต็มจาก 0 ถึงปลาย ไม่งั้นเลือก 0 ไม่ได้ + เข้าใจ scale ผิด
- ภาษา: ไทยโทนเล่าให้เพื่อนฟัง สั้น ไม่มีศัพท์ครู
