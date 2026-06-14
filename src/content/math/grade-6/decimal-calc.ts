import type { ChapterV2 } from '@/types/curriculum'

// ป.6 บท 5 การคำนวณทศนิยม (ref: p6-c05) — คูณ: นับจุดรวม · หาร: ทำตัวหารเป็นจำนวนเต็ม
const decimalCalc: ChapterV2 = {
  version: 2,
  id: 'math-6-decimal-calc',
  subject: 'math',
  grade: 6,
  chapter: 5,
  title: 'การคำนวณทศนิยม',
  icon: '➗',
  slug: 'decimal-calc',
  scenes: [
    {
      id: 'intro',
      say: 'คูณทศนิยม: คูณเหมือนเลขเต็มก่อน แล้วนับจำนวนหลักหลังจุดรวมกัน ใส่ในผลลัพธ์',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '1.5 × 0.2: คูณก่อน 15 × 2 = 30 แล้วนับจุด 1+1 = 2 ตำแหน่ง → 0.30',
          words: [
            { text: '15 × 2 = 30', color: '#4F80FF', bold: true },
            { text: '1+1 = 2 ตำแหน่ง', color: '#FF7A2F', bold: true },
            { text: '0.30', color: '#22C55E', bold: true },
          ],
        },
      },
    },
    {
      id: 'multiply',
      say: '1.5 × 0.2: คิด 15 × 2 = 30 ก่อน แล้วนับจุด 1+1 = 2 ตำแหน่ง → 0.30',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1.2 × 0.5 = ?', opts: ['0.6', '6', '0.06', '1.7'], ans: 0, hint: '12×5=60 นับจุด 2 ตำแหน่ง → 0.60' },
      },
    },
    {
      id: 'multiply-int',
      say: 'คูณทศนิยมกับจำนวนเต็ม: 2.5 × 4 → 25×4=100 นับจุด 1 ตำแหน่ง → 10.0',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '2.5 × 4: คูณ 25 × 4 = 100 นับจุด 1 ตำแหน่ง → 10.0',
          words: [
            { text: '25 × 4 = 100', color: '#4F80FF', bold: true },
            { text: '1 ตำแหน่ง', color: '#FF7A2F', bold: true },
            { text: '10.0', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '2.5 × 4 = ?', opts: ['10', '100', '1.0', '8.5'], ans: 0, hint: '25×4=100 จุด 1 ตำแหน่ง → 10.0' },
      },
    },
    {
      id: 'divide',
      say: 'หารทศนิยมง่ายๆ: 0.6 ÷ 2 → 6÷2=3 แล้วใส่จุดกลับ → 0.3',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '0.6 ÷ 2: หาร 6 ÷ 2 = 3 ใส่จุดกลับ → 0.3',
          words: [
            { text: '6 ÷ 2 = 3', color: '#4F80FF', bold: true },
            { text: '0.3', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.6 ÷ 2 = ?', opts: ['0.3', '0.03', '3', '0.12'], ans: 0, hint: '6÷2=3 ใส่จุด → 0.3' },
      },
    },
    {
      id: 'multiply-decimal-count',
      say: 'คูณทศนิยม: 0.3 × 0.4 = 0.12 เพราะ 3×4=12 แล้วนับจุดรวม 1+1=2 ตำแหน่ง',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '0.3 × 0.4: คิด 3×4 = 12 นับจุด 1+1 = 2 ตำแหน่ง → 0.12',
          words: [
            { text: '3×4 = 12', color: '#4F80FF', bold: true },
            { text: '1+1 = 2', color: '#FF7A2F', bold: true },
            { text: '0.12', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.3 × 0.4 = ?', opts: ['0.12', '1.2', '0.012', '12'], ans: 0, hint: '3×4=12 นับจุด 1+1=2 ตำแหน่ง → 0.12' },
      },
    },
    {
      id: 'multiply-larger',
      say: '1.2 × 3.4: คูณก่อน 12×34=408 แล้วนับจุด 1+1=2 ตำแหน่ง → ผล = 4.08',
      visual: {
        component: 'TextVis',
        config: {
          sentence: '1.2 × 3.4: คิด 12×34 = 408 นับจุด 1+1 = 2 ตำแหน่ง → 4.08',
          words: [
            { text: '12×34 = 408', color: '#4F80FF', bold: true },
            { text: '1+1 = 2', color: '#FF7A2F', bold: true },
            { text: '4.08', color: '#22C55E', bold: true },
          ],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '1.2 × 3.4 = ?', opts: ['4.08', '40.8', '0.408', '4.8'], ans: 0, hint: '12×34=408 นับจุด 1+1=2 ตำแหน่ง → 4.08' },
      },
    },
    {
      id: 'decimal-calc-quiz',
      say: '5×6=30 แล้วนับจุด 1+1=2 ตำแหน่ง → 0.30 — กฎเดิมทุกครั้ง: คูณเลขเต็มก่อน แล้วนับจุดรวมใส่ผล',
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '0.5 × 0.6 = ?', opts: ['0.30', '3.0', '0.03', '0.11'], ans: 0, hint: '5×6=30, นับจุด 1+1=2 ตำแหน่ง → 0.30' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 คูณ: คูณเลขเต็มแล้วนับจุดรวมใส่ผล · หาร: หารแล้วใส่จุดกลับให้ตรง',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'คูณ: คูณเลขเต็ม → นับจุดรวม → ใส่ผล | หาร: หาร → ใส่จุดกลับตำแหน่งเดิม',
          words: [
            { text: 'นับจุดรวม', color: '#4F80FF', bold: true },
            { text: 'ใส่จุดกลับ', color: '#22C55E', bold: true },
          ],
        },
      },
    },
  ],
  finalPractice: [
    { type: 'fill', q: '2.5 × 4 = ___', ans: '10', hint: '25×4=100 จุด 1 ตำแหน่ง' },
    { type: 'mc', q: '0.6 ÷ 2 = ?', opts: ['0.3', '0.03', '3', '0.12'], ans: 0, hint: '6÷2=3 ใส่จุด' },
    { type: 'fill', q: '1.2 × 0.5 = ___', ans: '0.6', hint: '12×5=60 จุด 2 ตำแหน่ง' },
    { type: 'fill', q: '3.5 × 2 = ___', ans: '7', hint: '35×2=70 จุด 1 ตำแหน่ง' },
    { type: 'mc', q: '0.8 ÷ 4 = ?', opts: ['0.2', '0.02', '2', '0.4'], ans: 0, hint: '8÷4=2 ใส่จุด' },
    { type: 'fill', q: '0.3 × 0.2 = ___', ans: '0.06', hint: '3×2=6 จุด 2 ตำแหน่ง → 0.06' },
    { type: 'mc', q: '4.5 ÷ 5 = ?', opts: ['0.9', '9', '0.09', '1.0'], ans: 0, hint: '45÷5=9 ใส่จุด → 0.9' },
    { type: 'fill', q: '6.4 ÷ 2 = ___', ans: '3.2', hint: '64÷2=32 ใส่จุด' },
    { type: 'slider', q: '2.5 × 4 = ?', min: 0, max: 20, step: 1, ans: 10, unit: '', hint: '25×4=100 จุด 1' },
    { type: 'fill', q: '1.2 × 3.4 = ___', ans: '4.08', hint: '12×34=408 นับจุด 1+1=2 ตำแหน่ง → 4.08' },
  ],
}

export default decimalCalc
