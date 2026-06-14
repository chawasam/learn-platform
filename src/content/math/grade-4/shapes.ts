import type { ChapterV2 } from '@/types/curriculum'

// รูปเรขาคณิต ป.4 — story (curriculum ref: math-thai-p456 p4-c03)
// หัวใจ: นับด้าน/มุมด้วยการแตะทีละอัน → เชื่อมชื่อรูปกับจำนวนด้าน/มุม

const shapes: ChapterV2 = {
  version: 2,
  id: 'math-4-shapes',
  subject: 'math',
  grade: 4,
  chapter: 3,
  title: 'รูปเรขาคณิต',
  icon: '📐',
  slug: 'geometry-shapes',
  scenes: [
    {
      id: 'intro',
      say: 'รูปเรขาคณิตคือรูปร่างรอบตัวเรา เราดูที่ "ด้าน" (เส้นรอบรูป) กับ "มุม" (จุดหักมุม) เพื่อบอกว่าเป็นรูปอะไร',
      visual: { component: 'ShapeExplorer', config: { shape: 'square', count: 'none', readOnly: true } },
    },
    {
      id: 'tri-sides',
      say: 'มาเริ่มที่สามเหลี่ยม — แตะเส้นรอบรูปทีละด้านนับดูสิว่ามีกี่ด้าน',
      visual: { component: 'ShapeExplorer', config: { shape: 'triangle', count: 'sides' } },
      goal: { type: 'reach-value', key: 'sides', value: 3 },
      hint: 'แตะเส้นทั้ง 3 เส้นให้ครบ ตัวเลข "ด้าน" จะขึ้นเป็น 3',
    },
    {
      id: 'tri-angles',
      say: 'แล้วมุมล่ะ? แตะจุดหักมุมทีละจุด นับว่ามีกี่มุม',
      visual: { component: 'ShapeExplorer', config: { shape: 'triangle', count: 'angles' } },
      goal: { type: 'reach-value', key: 'angles', value: 3 },
      hint: 'แตะจุดมุมทั้ง 3 จุด — สามเหลี่ยมมี 3 มุมพอดี',
    },
    {
      id: 'tri-recap',
      say: 'จำง่ายๆ สามเหลี่ยม = 3 ด้าน 3 มุม จำนวนด้านเท่ากับจำนวนมุมเสมอในรูปเหลี่ยม',
      visual: { component: 'ShapeExplorer', config: { shape: 'triangle', count: 'angles', readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สามเหลี่ยมมีกี่ด้านและกี่มุม?', opts: ['3 ด้าน 3 มุม', '3 ด้าน 4 มุม', '4 ด้าน 3 มุม', '3 ด้าน 0 มุม'], ans: 0, hint: 'จำนวนด้าน = จำนวนมุมเสมอ' },
      },
    },
    {
      id: 'sq-sides',
      say: 'รูปนี้ล่ะ? แตะนับด้านดู — สี่เหลี่ยมจัตุรัสมีด้านยาวเท่ากันหมด',
      visual: { component: 'ShapeExplorer', config: { shape: 'square', count: 'sides' } },
      goal: { type: 'reach-value', key: 'sides', value: 4 },
      hint: 'แตะให้ครบทั้ง 4 ด้าน',
    },
    {
      id: 'rectangle',
      say: 'สี่เหลี่ยมผืนผ้าก็มี 4 ด้าน 4 มุม แต่ด้านยาวคู่หนึ่ง ด้านสั้นอีกคู่หนึ่ง',
      visual: { component: 'ShapeExplorer', config: { shape: 'rectangle', count: 'angles', readOnly: true } },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'สี่เหลี่ยมผืนผ้ามีกี่มุม?', opts: ['3', '4', '5', '6'], ans: 1, hint: 'นับจุดมุมทั้งสี่มุม' },
      },
    },
    {
      id: 'pentagon',
      say: 'รูปนี้ด้านเยอะขึ้น! แตะนับด้านดูสิว่ากี่ด้าน',
      visual: { component: 'ShapeExplorer', config: { shape: 'pentagon', count: 'sides' } },
      goal: { type: 'reach-value', key: 'sides', value: 5 },
      hint: 'แตะให้ครบ — 5 ด้าน เรียกว่า "ห้าเหลี่ยม"',
    },
    {
      id: 'circle',
      say: 'วงกลมพิเศษ! เส้นรอบรูปโค้งไม่มีหัวมุมเลย ลองคิดดู วงกลมมีกี่มุม?',
      visual: { component: 'ShapeExplorer', config: { shape: 'circle', count: 'none', readOnly: true } },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'วงกลมมีกี่มุม?', opts: ['ไม่มีมุม (0)', '1 มุม', '3 มุม', '4 มุม'], ans: 0, hint: 'วงกลมโค้งกลม ไม่มีจุดหักมุม' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 นับด้านกับมุมก็บอกชื่อรูปได้ · 3=สามเหลี่ยม · 4=สี่เหลี่ยม · 5=ห้าเหลี่ยม · วงกลมโค้งไม่มีมุม',
      visual: { component: 'ShapeExplorer', config: { shape: 'pentagon', count: 'sides', readOnly: true } },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'รูปที่มี 3 ด้าน 3 มุม คือรูปอะไร?', opts: ['สี่เหลี่ยม', 'สามเหลี่ยม', 'วงกลม', 'ห้าเหลี่ยม'], ans: 1, hint: 'นับด้าน = 3' },
    { type: 'fill', q: 'สี่เหลี่ยมจัตุรัสมีกี่ด้าน? ___', ans: '4', hint: 'จัตุรัส = สี่ด้านเท่ากัน' },
    { type: 'mc', q: 'รูปใดไม่มีมุม?', opts: ['สามเหลี่ยม', 'สี่เหลี่ยม', 'วงกลม', 'ห้าเหลี่ยม'], ans: 2, hint: 'รูปโค้งกลมไม่มีหัวมุม' },
    { type: 'mc', q: 'ห้าเหลี่ยมมีกี่ด้าน?', opts: ['4', '5', '6', '3'], ans: 1, hint: 'ชื่อบอกอยู่แล้ว ห้า' },
    { type: 'fill', q: 'สามเหลี่ยมมีกี่มุม? ___', ans: '3', hint: 'จำนวนมุม = จำนวนด้าน' },
    { type: 'mc', q: 'รูปใดมี 4 มุม?', opts: ['สามเหลี่ยม', 'สี่เหลี่ยม', 'วงกลม', 'เส้นตรง'], ans: 1, hint: 'สี่เหลี่ยม = 4 ด้าน 4 มุม' },
    { type: 'mc', q: 'ด้านทั้ง 4 ของสี่เหลี่ยมจัตุรัสเป็นอย่างไร?', opts: ['ยาวเท่ากันหมด', 'ยาวไม่เท่ากัน', 'มี 2 คู่ยาวต่างกัน', 'โค้งงอ'], ans: 0, hint: 'จัตุรัส = ทุกด้านเท่ากัน' },
    { type: 'mc', q: 'รูปที่มี 6 ด้าน เรียกว่าอะไร?', opts: ['ห้าเหลี่ยม', 'หกเหลี่ยม', 'สี่เหลี่ยม', 'สามเหลี่ยม'], ans: 1, hint: '6 ด้าน = หกเหลี่ยม' },
    { type: 'fill', q: 'สี่เหลี่ยมผืนผ้ามีกี่มุม? ___', ans: '4', hint: 'เหมือนจัตุรัส 4 มุม' },
    { type: 'mc', q: 'ในรูปเหลี่ยม จำนวนด้านกับจำนวนมุมเป็นอย่างไร?', opts: ['เท่ากันเสมอ', 'ด้านมากกว่ามุม', 'มุมมากกว่าด้าน', 'ไม่เกี่ยวกัน'], ans: 0, hint: 'สามเหลี่ยม 3=3, สี่เหลี่ยม 4=4' },
  ],
}

export default shapes
