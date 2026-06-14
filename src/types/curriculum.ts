export type Subject = 'math' | 'science' | 'thai' | 'english'

export type ComponentName =
  | 'FractionCutter'
  | 'ShapeMeasure'
  | 'ClockDrag'
  | 'AngleDrag'
  | 'BalanceDrag'
  | 'PlaceValueDrag'
  | 'MoneyDrag'
  | 'BarChartDrag'
  | 'CubeBuilder'
  | 'NumberLine'
  | 'TextVis'
  | 'PizzaCutter'
  | 'FractionBars'
  | 'ThaiNumberBuilder'
  | 'AddSubCarry'
  | 'ShapeExplorer'
  | 'MultiplyArray'
  | 'DivideShare'
  | 'AreaTiles'
  | 'OrderMachine'
  | 'ParallelLines'
  | 'ProbabilityBag'
  | 'QuadMorph'
  | 'TriangleAngles'
  | 'CircleRadius'
  | 'FactorBuilder'
  | 'EquationBalance'
  | 'PercentBar'
  | 'TransversalAngles'
  | 'MultiplyColumn'
  | 'DivideColumn'

export type ExplainBlock =
  | { type: 'text'; html: string }
  | { type: 'interactive'; component: ComponentName; config: Record<string, unknown> }
  | { type: 'highlight'; text: string }
  | { type: 'example'; text: string }

export type DragItem = { id: string; label: string; targetSlot: string }

export type QuizQuestion =
  | { type: 'mc';         q: string; opts: string[]; ans: number; hint: string }
  | { type: 'fill';       q: string; ans: string;    hint: string }
  | { type: 'slider';     q: string; min: number; max: number; step: number; ans: number; unit: string; hint: string }
  | { type: 'drag-place'; q: string; items: DragItem[]; hint: string }

export type DemoStep = { instruction: string; config?: Record<string, unknown> }

export type Chapter = {
  id: string
  subject: Subject
  grade: number
  chapter: number
  title: string
  icon: string
  slug: string
  explain: ExplainBlock[]
  demo: {
    component: ComponentName
    config: Record<string, unknown>
    steps: DemoStep[]
  }
  practice: QuizQuestion[]
}

// ── Chapter v2: story-based lesson (scenes) ──
// Goal must be declarative data (no functions) — chapter crosses the
// server→client component boundary as a prop, so it has to be serializable.
export type SceneGoal =
  | { type: 'interact' }                                           // any interaction in this scene unlocks "next"
  | { type: 'reach-value'; key: string; value: number | string }   // unlocks when component reports state[key] === value
  | { type: 'answer'; question: QuizQuestion }                     // answer an inline question correctly

export type Scene = {
  id: string
  say: string                 // 1-2 short sentences, spoken-to-a-friend tone
  visual?: { component: ComponentName; config: Record<string, unknown> }
  goal?: SceneGoal
  hint?: string
}

// ── Metaphor: dual-coding memory hook (vivid imagery ↔ concept) ──
// Array because a single analogy is a "double-edged sword" (Spiro 1988) — risky
// concepts get 2-3 to cancel each other's misconceptions; most chapters get 1.
export type Metaphor = {
  title: string                // short label e.g. "มังกรหิวแบ่งเค้ก"
  emoji?: string               // big emoji shown as the visual (e.g. '🐉')
  visual?: { component: ComponentName; config: Record<string, unknown> }  // optional interactive instead of emoji
  story: string                // vivid narrative connecting imagination ↔ the math
  image?: string               // optional /public path — user can drop a real picture in later
}

export type ChapterV2 = {
  version: 2
  id: string
  subject: Subject
  grade: number
  chapter: number
  title: string
  icon: string
  slug: string
  scenes: Scene[]
  finalPractice: QuizQuestion[]
  metaphors?: Metaphor[]       // 💡 "ภาพช่วยจำ" button content
}

export type AnyChapter = Chapter | ChapterV2

export const isChapterV2 = (c: AnyChapter): c is ChapterV2 =>
  'version' in c && c.version === 2

export type SubjectMeta = {
  id: Subject
  title: string
  icon: string
  color: string
  grades: number[]
}

export const SUBJECTS: SubjectMeta[] = [
  { id: 'math',    title: 'คณิตศาสตร์', icon: '📐', color: '#4F80FF', grades: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { id: 'science', title: 'วิทยาศาสตร์', icon: '🔬', color: '#22C97A', grades: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { id: 'thai',    title: 'ภาษาไทย',   icon: '📖', color: '#FF7A2F', grades: [1,2,3,4,5,6,7,8,9,10,11,12] },
  { id: 'english', title: 'ภาษาอังกฤษ', icon: '🌍', color: '#A855F7', grades: [1,2,3,4,5,6,7,8,9,10,11,12] },
]

export const GRADE_LABEL = (g: number) =>
  g <= 6 ? `ป.${g}` : `ม.${g - 6}`
