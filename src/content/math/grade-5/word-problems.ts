import type { ChapterV2 } from '@/types/curriculum'

const wordProblems: ChapterV2 = {
  version: 2,
  id: 'math-5-word-problems',
  subject: 'math',
  grade: 5,
  chapter: 9,
  title: 'โจทย์ปัญหา',
  icon: '🧩',
  slug: 'word-problems-5',
  scenes: [
    {
      id: 'intro',
      say: 'โจทย์ปัญหาเป็นเรื่องราว เคล็ดลับคือมองหา "คำใบ้" ว่าต้องใช้ +−×÷ อะไร',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'แม่ซื้อส้ม 24 ผล แบ่งลูก 4 คนเท่าๆ กัน',
          words: [{ text: 'แบ่ง', color: '#A855F7', bold: true }, { text: 'เท่าๆ กัน', color: '#A855F7', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'คำว่า "แบ่งเท่าๆ กัน" ในโจทย์บอกให้ใช้วิธีใด?', opts: ['หาร', 'บวก', 'ลบ', 'คูณ'], ans: 0, hint: '"แบ่ง" = แจกออกให้เท่ากัน = หาร' },
      },
    },
    {
      id: 'solve',
      say: 'คำว่า "แบ่งเท่าๆ กัน" = ใช้การหาร! ส้ม 24 ผล แบ่ง 4 คน คนละกี่ผล?',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'ส้ม 24 ผล แบ่ง 4 คน → 24 ÷ 4 = ?',
          words: [{ text: '24 ผล', color: '#FF7A2F', bold: true }, { text: '÷ 4', color: '#A855F7', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '24 ผล แบ่ง 4 คนเท่าๆ กัน คนละกี่ผล?', opts: ['6', '28', '20', '96'], ans: 0, hint: '"แบ่งเท่าๆ กัน" → 24 ÷ 4' },
      },
    },
    {
      id: 'keywords',
      say: 'จำคำใบ้ไว้: "รวม/ทั้งหมด"=บวก · "เหลือ/ต่าง"=ลบ · "เท่าๆ กันหลายชุด"=คูณ · "แบ่งเท่าๆ กัน"=หาร',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'หนังสือ 5 เล่ม เล่มละ 45 บาท รวมเป็นเงินเท่าไร',
          words: [{ text: 'เล่มละ', color: '#FF7A2F', bold: true }, { text: 'รวม', color: '#22C55E', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: '"หนังสือ 5 เล่ม เล่มละ 45 บาท" ต้องใช้วิธีใด?', opts: ['คูณ', 'หาร', 'บวก', 'ลบ'], ans: 0, hint: '"เล่มละ" = แต่ละอัน × จำนวน = คูณ' },
      },
    },
    {
      id: 'quiz',
      say: '"เล่มละ 45" หลายเล่มเท่าๆ กัน = คูณ! 5 เล่ม เล่มละ 45 บาท รวมเท่าไร?',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'หนังสือ 5 เล่ม เล่มละ 45 บาท → 5 × 45 = ?',
          words: [{ text: '5 เล่ม', color: '#FF7A2F', bold: true }, { text: '× 45', color: '#22C55E', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'หนังสือ 5 เล่ม เล่มละ 45 บาท รวม?', opts: ['225 บาท', '50 บาท', '9 บาท', '200 บาท'], ans: 0, hint: 'เท่าๆ กันหลายชุด → 5 × 45' },
      },
    },
    {
      id: 'two-step',
      say: 'โจทย์ 2 ขั้น: แบ่งเป็นส่วนๆ ก่อน คำนวณทีละส่วน แล้วค่อยรวม ขั้น 1: ดินสอ 3×5=15 บาท | ขั้น 2: ยางลบ 2×3=6 บาท | รวม 15+6=21 บาท',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'ดินสอ 3 แท่งๆ ละ 5 บาท + ยางลบ 2 อันๆ ละ 3 บาท = ?',
          words: [{ text: '3 × 5', color: '#FF7A2F', bold: true }, { text: '2 × 3', color: '#4F80FF', bold: true }, { text: '+', color: '#22C55E', bold: true }],
        },
      },
      revealAfterGoal: true,
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ดินสอ 3 แท่งๆ ละ 5 บาท ยางลบ 2 อันๆ ละ 3 บาท รวมเท่าไร?', opts: ['21 บาท', '16 บาท', '24 บาท', '11 บาท'], ans: 0, hint: 'ขั้น 1: 3×5=15 ขั้น 2: 2×3=6 รวม 15+6=21' },
      },
    },
    {
      id: 'write-equation',
      say: 'เขียนสมการก่อนคำนวณ: ให้ x = จำนวนที่หา แล้วสร้างสมการ แก้ x',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'ให้ x = คำตอบ → เขียนสมการ → แก้ x → ตรวจคำตอบ',
          words: [{ text: 'ให้ x', color: '#A855F7', bold: true }, { text: 'เขียนสมการ', color: '#FF7A2F', bold: true }, { text: 'ตรวจคำตอบ', color: '#22C55E', bold: true }],
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ออม x บาทต่อวัน 4 วัน รวม 200 บาท สมการคือ?', opts: ['4x = 200', 'x + 4 = 200', 'x ÷ 4 = 200', '4 + x = 200'], ans: 0, hint: 'วันละ x × 4 วัน = รวม 200 → 4x = 200' },
      },
    },
    {
      id: 'check-answer',
      say: 'ตรวจสอบคำตอบ: อ่านโจทย์ซ้ำ ดูว่าตอบถูกสิ่ง ตัวเลขสมเหตุผลไหม (ซื้อของไม่ควรได้เงิน)',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'น้ำ 4 ขวดๆ ละ 8 บาท จ่าย 50 บาท เงินทอน = ?',
          words: [{ text: '4 × 8', color: '#FF7A2F', bold: true }, { text: 'จ่าย 50', color: '#4F80FF', bold: true }, { text: 'ทอน = ?', color: '#22C55E', bold: true }],
        },
      },
      goal: {
        type: 'answer',
        question: { type: 'mc', q: 'ซื้อน้ำ 4 ขวด ขวดละ 8 บาท จ่าย 50 บาท เงินทอน = ?', opts: ['18 บาท', '10 บาท', '14 บาท', '20 บาท'], ans: 0, hint: 'น้ำรวม 4×8=32 บาท, เงินทอน 50−32=18' },
      },
    },
    {
      id: 'recap',
      say: 'สรุป 🏠 อ่านโจทย์ → หาคำใบ้ → เลือก +−×÷ → คำนวณ → ตรวจว่าสมเหตุสมผล',
      visual: {
        component: 'TextVis',
        config: {
          sentence: 'รวม คือบวก · เหลือ คือลบ · เท่าๆ กันหลายชุด คือคูณ · แบ่งเท่าๆ กัน คือหาร',
          words: [{ text: 'รวม', color: '#22C55E' }, { text: 'เหลือ', color: '#EF4444' }, { text: 'เท่าๆ กันหลายชุด', color: '#FF7A2F' }, { text: 'แบ่งเท่าๆ กัน', color: '#A855F7' }],
        },
      },
    },
  ],
  finalPractice: [
    { type: 'fill', q: 'หนังสือ 5 เล่ม เล่มละ 45 บาท รวม ___ บาท', ans: '225', hint: 'เท่าๆ กันหลายชุด = คูณ 5×45' },
    { type: 'mc', q: 'มีเชือก 100 ม. ตัดเส้นละ 20 ม. ได้กี่เส้น?', opts: ['4', '5', '6', '80'], ans: 1, hint: '100 ÷ 20' },
    { type: 'fill', q: 'ออม 250 บาท/เดือน 3 เดือน ได้ ___ บาท', ans: '750', hint: '250 × 3' },
    { type: 'fill', q: 'ส้ม 24 ผล แบ่ง 4 คนเท่าๆ กัน คนละ ___ ผล', ans: '6', hint: '24 ÷ 4' },
    { type: 'mc', q: 'มีเงิน 500 ใช้ไป 320 เหลือเท่าไร?', opts: ['180', '820', '160', '200'], ans: 0, hint: '"เหลือ" = ลบ 500−320' },
    { type: 'fill', q: 'ดินสอ 3 กล่อง กล่องละ 12 แท่ง รวม ___ แท่ง', ans: '36', hint: '3 × 12' },
    { type: 'mc', q: 'นักเรียน 120 คน แบ่ง 4 ห้องเท่าๆ กัน ห้องละกี่คน?', opts: ['30', '40', '24', '116'], ans: 0, hint: '120 ÷ 4' },
    { type: 'fill', q: 'มีแอปเปิ้ล 15 กับ 23 ผล รวม ___ ผล', ans: '38', hint: '"รวม" = บวก 15+23' },
    { type: 'mc', q: 'คำว่า "แบ่งเท่าๆ กัน" ในโจทย์ บอกให้ใช้วิธีใด?', opts: ['หาร', 'บวก', 'ลบ', 'คูณ'], ans: 0, hint: 'แบ่ง = หาร' },
    { type: 'slider', q: 'ปากกา 6 ด้าม ด้ามละ 8 บาท รวมกี่บาท?', min: 0, max: 60, step: 1, ans: 48, unit: 'บาท', hint: '6 × 8' },
    { type: 'mc', q: 'ซื้อดินสอ 3 แท่ง แท่งละ 5 บาท ยางลบ 2 อัน อันละ 3 บาท จ่ายรวม?', opts: ['21 บาท', '16 บาท', '24 บาท', '18 บาท'], ans: 0, hint: 'ขั้น 1: 3×5=15, ขั้น 2: 2×3=6, รวม 15+6=21' },
  ],
}

export default wordProblems
