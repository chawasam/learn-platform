import type { ChapterV2 } from '@/types/curriculum'

// เศษส่วน ป.4 — story prototype (curriculum ref: math-thai-p456 p4-c10)
// CRA: จับพิซซ่าจริง (concrete) → แท่งช็อกโกแลต (pictorial) → ตัวเลข (abstract)

const fractions: ChapterV2 = {
  version: 2,
  id: 'math-4-fractions',
  subject: 'math',
  grade: 4,
  chapter: 10,
  title: 'เศษส่วน',
  icon: '🍕',
  slug: 'fractions',
  scenes: [
    {
      id: 'intro',
      say: 'วันนี้ปาร์ตี้พิซซ่า! 🎉 พิซซ่าร้อนๆ มา 1 ถาดเต็มๆ',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 1, allowCut: false, allowPick: false, showLabel: false },
      },
    },
    {
      id: 'cut-4',
      say: 'เพื่อน 4 คนอยากได้เท่าๆ กัน — ลองตัดพิซซ่าให้ได้ 4 ชิ้นเท่ากันดูสิ!',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 1, allowCut: true, allowPick: false, showLabel: false },
      },
      goal: { type: 'reach-value', key: 'parts', value: 4 },
      hint: 'กดปุ่ม 🔪 ตัด! สองครั้ง — ตัด 1 ครั้งได้ 2 ชิ้น ตัดอีกครั้งได้ 4 ชิ้น',
    },
    {
      id: 'four-equal',
      say: 'เก่งมาก! ได้ 4 ชิ้นเท่ากันเป๊ะ — แต่ละชิ้นคือ "1 ใน 4" ของพิซซ่าทั้งถาด',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 4, allowCut: false, allowPick: false, showLabel: false },
      },
    },
    {
      id: 'pick-1',
      say: 'หิวแล้ว! ลองหยิบพิซซ่ามา 1 ชิ้น แล้วดูตัวเลขข้างๆ นะ',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 4, allowCut: false, allowPick: true, showLabel: true },
      },
      goal: { type: 'reach-value', key: 'filled', value: 1 },
      hint: 'แตะชิ้นพิซซ่าชิ้นไหนก็ได้ 1 ชิ้น',
    },
    {
      id: 'meaning',
      say: 'นี่แหละ "เศษส่วน"! เลขล่าง 4 = แบ่งทั้งหมด 4 ส่วน · เลขบน 1 = หยิบมา 1 ส่วน อ่านว่า "เศษหนึ่งส่วนสี่"',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 4, initialFilled: 1, allowCut: false, allowPick: false, showLabel: true },
      },
    },
    {
      id: 'pick-3',
      say: 'อร่อยจัด! กินเพิ่มเลย — หยิบให้ครบ 3 ชิ้น แล้วดูว่าเลขบนเปลี่ยนเป็นอะไร',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 4, initialFilled: 1, allowCut: false, allowPick: true, showLabel: true },
      },
      goal: { type: 'reach-value', key: 'filled', value: 3 },
      hint: 'แตะชิ้นพิซซ่าเพิ่มจนเลขบนเป็น 3 — สามส่วนสี่ (3/4)',
    },
    {
      id: 'chocolate',
      say: 'เพื่อนอีกคนพกช็อกโกแลตมาด้วย 🍫 หักครึ่งแล้วกินไป 1 ซีก = 1/2',
      visual: {
        component: 'FractionBars',
        config: { rows: [{ parts: 2, filled: 1, fixed: true, color: '#8B5A2B' }], showLabels: true },
      },
    },
    {
      id: 'equivalence',
      say: 'แท่งล่างหักเป็น 4 ช่อง — ลองระบายให้ยาวเท่ากับแท่งบนดูสิ จะเกิดอะไรขึ้น?',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
            { parts: 4, filled: 0, color: '#FF7A2F' },
          ],
          showEquals: true,
          showLabels: true,
        },
      },
      goal: { type: 'reach-value', key: 'equal', value: 1 },
      hint: 'แตะช่องที่ 2 ของแท่งล่าง — 2/4 ยาวเท่ากับ 1/2 พอดีเลย!',
    },
    {
      id: 'compare',
      say: 'ข้อสอบเพื่อนรัก: พิซซ่า 3/4 กับช็อกโกแลต 1/2 — อันไหนเยอะกว่ากัน? ดูความยาวแท่งช่วยได้นะ',
      visual: {
        component: 'FractionBars',
        config: {
          rows: [
            { parts: 4, filled: 3, fixed: true, color: '#FF7A2F' },
            { parts: 2, filled: 1, fixed: true, color: '#8B5A2B' },
          ],
          showLabels: true,
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'อันไหนมากกว่ากัน?', opts: ['3/4', '1/2', 'เท่ากัน'], ans: 0, hint: 'แท่งไหนระบายยาวกว่า อันนั้นมากกว่า' },
      },
    },
    {
      id: 'recap',
      say: 'สรุปเก็บกลับบ้าน 🏠 เลขล่าง = แบ่งทั้งหมดกี่ส่วน · เลขบน = เอามากี่ส่วน — แค่นี้ก็อ่านเศษส่วนได้ทุกตัวแล้ว!',
      visual: {
        component: 'PizzaCutter',
        config: { initialParts: 4, initialFilled: 3, allowCut: false, allowPick: false, showLabel: true },
      },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'พิซซ่าแบ่ง 8 ชิ้น กิน 3 ชิ้น กินไปเศษส่วนเท่าไร?', opts: ['3/8', '8/3', '3/5', '5/8'], ans: 0, hint: 'เอามา 3 จากทั้งหมด 8 ส่วน — ล่างคือทั้งหมด บนคือที่เอามา' },
    { type: 'fill', q: 'เค้กแบ่ง 6 ชิ้นเท่ากัน กิน 1 ชิ้น = 1/___', ans: '6', hint: 'เลขล่าง = แบ่งทั้งหมดกี่ส่วน' },
    { type: 'fill', q: '2/4 เท่ากับ 1 ส่วน ___ (เขียนตัวล่าง)', ans: '2', hint: '2/4 ระบายยาวเท่ากับ 1/2 — เหมือนช็อกโกแลตในบทเรียน' },
    { type: 'mc', q: 'เศษส่วนใดมากกว่า 1/2?', opts: ['1/4', '1/3', '3/4', '2/5'], ans: 2, hint: '3/4 ระบายเกินครึ่งแท่ง' },
    { type: 'fill', q: 'แบ่งส้มเป็น 5 ส่วนเท่ากัน หยิบมา 2 ส่วน = ___/5', ans: '2', hint: 'เลขบน = หยิบมากี่ส่วน' },
    { type: 'slider', q: 'แถบมี 8 ช่อง ต้องระบายกี่ช่องถึงจะได้ครึ่งหนึ่ง (1/2)?', min: 1, max: 8, step: 1, ans: 4, unit: 'ช่อง', hint: 'ครึ่งหนึ่งของ 8' },
    { type: 'mc', q: '1/3 กับ 1/4 อันไหนมากกว่า?', opts: ['1/3', '1/4', 'เท่ากัน', 'บอกไม่ได้'], ans: 0, hint: 'แบ่งน้อยส่วนกว่า แต่ละชิ้นยิ่งใหญ่กว่า — พิซซ่าแบ่ง 3 ชิ้นใหญ่กว่าแบ่ง 4' },
    { type: 'fill', q: 'พิซซ่าแบ่ง 4 ชิ้น กินครบทั้ง 4 ชิ้น = 4/4 = กี่ถาดเต็ม?', ans: '1', hint: 'กินครบทุกส่วน = ทั้งหมดพอดี' },
    { type: 'mc', q: 'พิซซ่าแบ่ง 8 ชิ้น กินไป 5 ชิ้น เหลือเศษส่วนเท่าไร?', opts: ['5/8', '3/8', '8/5', '3/5'], ans: 1, hint: 'เหลือ 8 − 5 = 3 ชิ้น จากทั้งหมด 8' },
    { type: 'fill', q: 'ช็อกโกแลต 4 ช่อง กินครึ่งหนึ่ง (1/2) = กี่ช่อง?', ans: '2', hint: 'ครึ่งหนึ่งของ 4 ช่อง' },
  ],
}

export default fractions
