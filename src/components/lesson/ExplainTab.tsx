'use client'
import { Suspense } from 'react'
import type { ExplainBlock, ComponentName } from '@/types/curriculum'
import { INTERACTIVE_COMPONENTS } from '@/components/interactive/registry'

function InteractiveBlock({ component, config }: { component: ComponentName; config: Record<string, unknown> }) {
  const Component = INTERACTIVE_COMPONENTS[component]
  if (!Component) return null
  return (
    <div className="my-4 flex justify-center">
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...config} readOnly />
      </Suspense>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="h-40 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full" />
    </div>
  )
}

interface Props {
  blocks: ExplainBlock[]
}

export default function ExplainTab({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === 'text') {
          return (
            <div
              key={i}
              className="prose prose-sm max-w-none leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          )
        }
        if (block.type === 'highlight') {
          return (
            <div
              key={i}
              className="rounded-2xl px-5 py-4 border-l-4 font-semibold text-base"
              style={{ background: 'linear-gradient(135deg, #EFF6FF, #FFF7ED)', borderColor: '#4F80FF', color: '#1E3A5F' }}
            >
              ✨ {block.text}
            </div>
          )
        }
        if (block.type === 'example') {
          return (
            <div key={i} className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4">
              <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#FF7A2F' }}>ตัวอย่าง</p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>{block.text}</p>
            </div>
          )
        }
        if (block.type === 'interactive') {
          return (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--muted)' }}>🎮 ลองสัมผัสดู</p>
              <InteractiveBlock component={block.component} config={block.config} />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
