import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 480, height: 940 } })
await p.goto('http://localhost:3001/audit/', { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
await p.screenshot({ path: 'scripts/shots/feat-audit-2btn.png' })
await b.close(); console.log('done')
