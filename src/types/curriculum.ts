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
