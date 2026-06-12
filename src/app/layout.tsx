import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'

const sarabun = Sarabun({
  weight: ['400', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: 'เรียนออนไลน์ — คณิต วิทย์ ภาษาไทย ป.1–ม.6',
  description: 'เว็บเรียนรู้แบบ interactive สำหรับนักเรียนไทย ป.1–ม.6 ทุกวิชา',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={sarabun.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
