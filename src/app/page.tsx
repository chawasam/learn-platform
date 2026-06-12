import Link from 'next/link'
import { SUBJECTS } from '@/types/curriculum'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">🎓 เรียนออนไลน์</h1>
        <p className="text-lg" style={{ color: 'var(--muted)' }}>
          เลือกวิชาที่อยากเรียน — interactive ทุกบท เข้าใจง่าย
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {SUBJECTS.map(s => (
          <Link
            key={s.id}
            href={`/${s.id}`}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white shadow-md border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95"
            style={{ borderColor: s.color }}
          >
            <span className="text-5xl">{s.icon}</span>
            <span className="text-lg font-bold" style={{ color: s.color }}>
              {s.title}
            </span>
          </Link>
        ))}
      </div>

      <p className="text-center mt-10 text-sm" style={{ color: 'var(--muted)' }}>
        ป.1–ม.6 · ไม่ต้องสมัครสมาชิก · ใช้ได้ฟรี
      </p>
    </main>
  )
}
