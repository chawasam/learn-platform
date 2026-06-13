'use client'
import { useState } from 'react'

interface Item { title: string; chapter: number; prompt: string; brief: string }
interface GradeData { grade: number; items: Item[] }

export default function AuditList({ data }: { data: GradeData[] }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(c => (c === key ? null : c)), 1800)
    } catch {
      setCopied('error')
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#1E3A5F' }}>🔍 ตรวจสอบบทเรียน (AI Audit)</h1>
      <div className="text-sm mb-6 flex flex-col gap-1.5" style={{ color: 'var(--muted)' }}>
        <p><b style={{ color: '#4F80FF' }}>📋 text</b> — copy เนื้อหาบท+เกณฑ์ → วางใน AI ตัวไหนก็ได้ (ChatGPT/Gemini/Claude) → ตรวจจาก text (ฟรี ไม่เห็นภาพจริง)</p>
        <p><b style={{ color: '#A855F7' }}>🌐 Operator</b> — copy → วางใน AI agent ที่เปิดเว็บได้ (ChatGPT Operator/Gemini) → มันเข้า<b>เล่นเว็บจริง</b>แล้วตรวจ (เห็นภาพจริง) ⚠️ ต้อง deploy ขึ้น live ก่อน (agent เข้า localhost ไม่ได้)</p>
        <p>ได้รายงานตาราง issue แล้ว copy กลับมาให้ผมแก้</p>
      </div>

      {data.map(g => (
        <section key={g.grade} className="mb-7">
          <h2 className="text-lg font-bold mb-2" style={{ color: '#4F80FF' }}>ป.{g.grade}</h2>
          <div className="flex flex-col gap-1.5">
            {g.items.map(it => {
              const key = `${g.grade}-${it.chapter}`
              return (
                <div key={key} className="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 px-4 py-2.5">
                  <span className="text-sm font-medium" style={{ color: '#374151' }}>
                    <span className="text-gray-400 mr-2">บท {it.chapter}</span>{it.title}
                  </span>
                  <div className="flex-shrink-0 flex gap-1.5">
                    <button
                      onClick={() => copy(`${key}-t`, it.prompt)}
                      className="px-2.5 py-1.5 rounded-lg text-white text-xs font-bold hover:opacity-85 transition-opacity"
                      style={{ background: copied === `${key}-t` ? '#22C55E' : '#4F80FF' }}
                    >
                      {copied === `${key}-t` ? '✓' : '📋 text'}
                    </button>
                    <button
                      onClick={() => copy(`${key}-o`, it.brief)}
                      className="px-2.5 py-1.5 rounded-lg text-white text-xs font-bold hover:opacity-85 transition-opacity"
                      style={{ background: copied === `${key}-o` ? '#22C55E' : '#A855F7' }}
                    >
                      {copied === `${key}-o` ? '✓' : '🌐 Operator'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
      {copied === 'error' && <p className="text-sm text-red-500">คัดลอกไม่สำเร็จ — ลองใหม่</p>}
    </main>
  )
}
