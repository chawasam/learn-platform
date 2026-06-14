<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# learn-platform — Thai K-12 Interactive Learning Platform

## Vision (ห้ามหลุด)

เด็กที่เรียนช้าที่สุดในห้อง **มองภาพแล้วเข้าใจทันที** — ระดับเดียวกับงานอธิบาย fiber optic ใต้มหาสมุทรของ ciechanow.ski
- บทเรียน = story ทีละฉาก กดไปต่อ, 1 ฉาก = 1 ไอเดีย, ภาพ interactive เต็มจอ, ข้อความสั้น
- ภาพ custom ต่อ concept — ไม่ใช่ generic component ยัด config
- ไม่แน่ใจ design → research ของระดับโลกก่อน (Mathigon / PhET / Brilliant / Khan) copy แล้วปรับให้ดีกว่า

## 🏆 เป้าหมาย — เนื้อหาอันดับ 1

**เป้าหมายระยะยาว: เว็บเรียนคณิตศาสตร์ ป.4-6 ที่ดีที่สุดในโลก สำหรับภาษาไทย**

วัดจาก 3 มิติ:
1. **ความเข้าใจ (Comprehension)** — เด็กที่อ่อนสุดในห้องอ่านจบแล้วทำข้อสอบได้ โดยไม่ต้องมีครูอธิบายเพิ่ม
2. **Interactivity** — ทุก concept มีภาพที่สร้างมาเพื่อ concept นั้นโดยเฉพาะ (ไม่ใช่ reuse generic) + เด็ก interact ก่อนอ่านคำอธิบาย (discovery learning)
3. **ครบ** — ทุกบทในหลักสูตร ป.4-6 สสวท. ไม่มีช่องว่าง

**Benchmark ที่ต้องชนะ:**
- ชนะ **Mathigon** ด้าน: ภาษาไทย + ครบหลักสูตรแห่งชาติ
- ชนะ **Brilliant** ด้าน: เข้าถึงได้สำหรับเด็กที่อ่อน (ไม่ใช่แค่เด็กเก่ง) + ไทย
- ชนะ **Khan Academy** ด้าน: interactive-first (ไม่ใช่ video-first) + ภาพที่ตรง concept

**กฎตัดสิน:** ทุก scene ที่เขียนใหม่ต้องถามตัวเองว่า "ถ้าเด็กป.4 ที่อ่อนสุดดูฉากนี้ เขาจะเข้าใจ concept ทันทีโดยไม่ต้องมีคนอธิบายเพิ่มไหม?" — ถ้าคำตอบไม่ใช่ YES ให้ออกแบบใหม่

### วิธีชนะ — กลยุทธ์ต่อมิติ

**มิติ 1 Comprehension — ชนะด้วย discovery-first + goal-gating**
- เด็ก interact ก่อนเสมอ แล้วค่อยมีคำอธิบาย (ไม่ใช่ "อ่าน → ลอง")
- 1 scene = 1 ไอเดียเท่านั้น ห้ามยัด 2 concept ในฉากเดียว
- ข้อความ ≤ 2 ประโยค โทนเพื่อนเล่าให้ฟัง ไม่ใช่ภาษาตำรา
- Goal-gated scenes: ต้อง interact สำเร็จจริงก่อนไปต่อ — ห้ามกดข้ามได้เฉยๆ
- ทุก scene ผ่านกฎตัดสินข้างบนก่อน mark done

**มิติ 2 Interactivity — ชนะด้วย custom-per-concept + audit loop**
- ทุก concept มี component ตัดมาเพื่อ concept นั้นโดยเฉพาะ — ห้าม reuse generic ที่ไม่ตรง
- ทุก component ผ่าน SELF-TEST PROTOCOL (render จริง + อ่านภาพ + test interaction)
- ใช้ `/audit` page ส่ง prompt ให้ AI ภายนอกตรวจ 4 มิติ (Teacher/Parent/Child/UX) → แก้ทุก severity สูง/กลางก่อน ship
- Metaphor button `💡` ทุกบท ช่วย visual hook สำหรับเด็กที่จำยาก

**มิติ 3 ครบ — ชนะด้วย reference เดียวที่ตรวจแล้ว**
- ยึด math-thai-p456 เป็น single source of truth (ตรวจถูกแล้ว 39 บท)
- finalPractice ทุกบท ≥ 10 ข้อ (3 ข้อจาก reference + แต่งเพิ่ม) คำนวณมือยืนยันทุกข้อ
- ห้ามแต่งหัวข้อบทเอง — เคยพลาด "จำนวนเต็ม" ลง ป.6 ซึ่งเป็นเนื้อหา ม.1

**Loop การปรับปรุงต่อเนื่อง (ทำซ้ำต่อบท):**
1. Build — เขียน scene + custom component ตาม vision
2. Self-test — SELF-TEST PROTOCOL ทุก state สำคัญ
3. AI Audit — `/audit` copy prompt → AI ภายนอกตรวจ → เอา report กลับมาแก้
4. Operator test — AI cloud browser เล่นจริงบน live URL (ต้อง deploy ก่อน)
5. Fix → repeat จน severity สูงเหลือ 0

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

## ⛔ ไม่มีระบบ Login / Auth

**ไม่มี** และ **ไม่เพิ่ม** ระบบ login, user accounts, authentication, หรือ backend server ใดๆ ทั้งสิ้น
- เว็บเป็น static export ล้วน ไม่มี server-side state
- progress/data เก็บใน localStorage เท่านั้น (ถ้าจะทำในอนาคต)
- ห้ามแนะนำหรือ implement auth แม้จะถูกถามก็ตาม

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
