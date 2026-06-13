import { getChapters } from '@/lib/content'
import { buildAuditPrompt, buildOperatorBrief } from '@/lib/auditPrompt'
import AuditList from './AuditList'

const LIVE_URL = 'https://learn-platform-c5s.pages.dev'

// Admin-only audit tool (not linked from anywhere — private during soft launch,
// delete this folder to remove). Pre-builds an audit prompt per chapter at build
// time; the client just copies it to clipboard to paste into an external AI.

export const metadata = { robots: { index: false, follow: false } }

export default async function AuditPage() {
  const grades = [4, 5, 6]
  const data = []
  for (const g of grades) {
    const chapters = await getChapters('math', g)
    data.push({
      grade: g,
      items: chapters.map(c => ({ title: c.title, chapter: c.chapter, prompt: buildAuditPrompt(c), brief: buildOperatorBrief(c, LIVE_URL) })),
    })
  }
  return <AuditList data={data} />
}
