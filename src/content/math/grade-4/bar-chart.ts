import type { ChapterV2 } from '@/types/curriculum'

// แผนภูมิแท่ง ป.4 — story (curriculum ref: math-thai-p456 p4-c06)
// concrete: เทแก้วน้ำลงแท่ง แท่งโตทีละแก้ว → อ่านกราฟ = เทียบความสูง

const barChart: ChapterV2 = {
  version: 2,
  id: 'math-4-bar-chart',
  subject: 'math',
  grade: 4,
  chapter: 6,
  title: 'แผนภูมิแท่ง',
  icon: '📊',
  slug: 'bar-chart',
  scenes: [
    {
      id: 'intro',
      say: 'ร้านขายน้ำของเรา! 🥤 แต่ละวันขายได้ไม่เท่ากัน — แผนภูมิแท่งช่วยให้เห็นภาพชัดว่าวันไหนขายดี',
      visual: {
        component: 'BarChartDrag',
        config: { readOnly: true, maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'จ', value: 4, color: '#4F80FF' }, { label: 'อ', value: 6, color: '#4F80FF' }, { label: 'พ', value: 3, color: '#4F80FF' }, { label: 'พฤ', value: 7, color: '#4F80FF' }] },
      },
    },
    {
      id: 'tall-means-more',
      say: 'กฎง่ายๆ: แท่งยิ่งสูง = ขายได้ยิ่งเยอะ วันพฤหัส (พฤ) แท่งสูงสุด = ขายดีที่สุด!',
      visual: {
        component: 'BarChartDrag',
        config: { readOnly: true, maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'จ', value: 4, color: '#94A3B8' }, { label: 'อ', value: 6, color: '#94A3B8' }, { label: 'พ', value: 3, color: '#94A3B8' }, { label: 'พฤ', value: 7, color: '#22C55E' }] },
      },
    },
    {
      id: 'try-drag',
      say: 'ลองเป็นเจ้าของร้านเอง! ลากแท่งกราฟขึ้น-ลง บันทึกยอดขายวันนี้ดูสิ',
      visual: {
        component: 'BarChartDrag',
        config: { maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'จ', value: 2 }, { label: 'อ', value: 3 }, { label: 'พ', value: 1 }] },
      },
      goal: { type: 'interact' },
      hint: 'แตะแล้วลากหัวแท่งขึ้นหรือลง ตัวเลขบนแท่งจะเปลี่ยนตาม',
    },
    {
      id: 'read-value',
      say: 'อ่านค่าจากแท่ง: ดูหัวแท่งเล็งไปที่เลขด้านซ้าย วันอังคารแท่งอยู่ที่ 6 = ขายได้ 6 แก้ว',
      visual: {
        component: 'BarChartDrag',
        config: { readOnly: true, maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'จ', value: 4, color: '#4F80FF' }, { label: 'อ', value: 6, color: '#FF7A2F' }, { label: 'พ', value: 3, color: '#4F80FF' }] },
      },
    },
    {
      id: 'compare',
      say: 'เปรียบเทียบ: อังคารขาย 6 พุธขาย 3 — อังคารมากกว่าพุธ 6 − 3 = 3 แก้ว',
      visual: {
        component: 'BarChartDrag',
        config: { readOnly: true, maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'อ', value: 6, color: '#FF7A2F' }, { label: 'พ', value: 3, color: '#4F80FF' }] },
      },
    },
    {
      id: 'check',
      say: 'ลองอ่านกราฟตอบเองดู (จ=4 อ=6 พ=3 พฤ=7)',
      visual: {
        component: 'BarChartDrag',
        config: { readOnly: true, maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'จ', value: 4 }, { label: 'อ', value: 6 }, { label: 'พ', value: 3 }, { label: 'พฤ', value: 7 }] },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'รวม 4 วันขายได้กี่แก้ว?', opts: ['18', '20', '16', '22'], ans: 1, hint: '4 + 6 + 3 + 7 = ?' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป: แท่งสูง = มาก · อ่านค่าดูที่หัวแท่งเล็งเลขซ้าย · เทียบ 2 แท่งใช้การลบ 📊',
      visual: {
        component: 'BarChartDrag',
        config: { readOnly: true, maxValue: 10, yLabel: 'แก้ว', initialData: [{ label: 'จ', value: 4, color: '#4F80FF' }, { label: 'อ', value: 6, color: '#FF7A2F' }, { label: 'พ', value: 3, color: '#8B5CF6' }, { label: 'พฤ', value: 7, color: '#22C55E' }] },
      },
    },
  ],
  finalPractice: [
    { type: 'mc', q: 'จากแผนภูมิ วันไหนขายได้มากที่สุด (จ4 อ6 พ3 พฤ7)?', opts: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส'], ans: 3, hint: 'แท่งสูงสุด = มากสุด' },
    { type: 'fill', q: 'จ4 + อ6 + พ3 + พฤ7 รวมขายได้ ___ แก้ว', ans: '20', hint: 'บวกทุกวัน' },
    { type: 'mc', q: 'อังคาร(6)ขายได้มากกว่าพุธ(3)กี่แก้ว?', opts: ['2', '3', '4', '9'], ans: 1, hint: '6 − 3' },
    { type: 'mc', q: 'วันไหนขายได้น้อยที่สุด (จ4 อ6 พ3 พฤ7)?', opts: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส'], ans: 2, hint: 'แท่งเตี้ยสุด' },
    { type: 'fill', q: 'พฤหัส(7) มากกว่าจันทร์(4) อยู่ ___ แก้ว', ans: '3', hint: '7 − 4' },
    { type: 'slider', q: 'ถ้าศุกร์ขายได้เท่าจันทร์(4)กับพุธ(3)รวมกัน = กี่แก้ว?', min: 0, max: 10, step: 1, ans: 7, unit: 'แก้ว', hint: '4 + 3' },
    { type: 'mc', q: 'แท่งของวันอังคารสูงเป็น 2 เท่าของวันไหน? (อ6 พ3)', opts: ['จันทร์', 'พุธ', 'พฤหัส', 'ไม่มี'], ans: 1, hint: '6 = 2 × 3' },
    { type: 'fill', q: 'จันทร์4 อังคาร6 รวม 2 วัน = ___ แก้ว', ans: '10', hint: '4 + 6' },
    { type: 'mc', q: 'ถ้าเป้าหมายขาย 5 แก้ว/วัน วันไหน "ไม่ถึง" เป้า? (จ4 อ6 พ3 พฤ7)', opts: ['จันทร์กับพุธ', 'อังคารกับพฤหัส', 'ทุกวัน', 'ไม่มี'], ans: 0, hint: 'วันที่แท่งต่ำกว่า 5' },
    { type: 'fill', q: 'ขาย 4 วันรวม 20 แก้ว เฉลี่ยวันละ ___ แก้ว', ans: '5', hint: '20 ÷ 4' },
  ],
}

export default barChart
