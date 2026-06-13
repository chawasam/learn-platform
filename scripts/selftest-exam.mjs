import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))

await page.goto(`${BASE}/math/6/percent/exam/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)                                   // wait for client generation
await page.screenshot({ path: `${OUT}/exam-00-page1.png` })

// answer Q1 (first option) to show inline feedback / เฉลย
const firstOpt = page.getByRole('button', { name: /^A / }).first()
if (await firstOpt.count()) { await firstOpt.click().catch(() => {}); await page.waitForTimeout(300) }
await page.screenshot({ path: `${OUT}/exam-01-answered.png` })

// page through to the end
for (let i = 0; i < 12; i++) {
  const nx = page.getByRole('button', { name: /หน้าถัดไป/ })
  if (await nx.count() === 0) break
  await nx.click(); await page.waitForTimeout(150)
}
const fin = page.getByRole('button', { name: /ดูผลคะแนน/ })
if (await fin.count()) { await fin.click(); await page.waitForTimeout(700) }
await page.screenshot({ path: `${OUT}/exam-02-summary.png` })

await browser.close()
console.log('done')
