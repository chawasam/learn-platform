import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })

// 1) Metaphor button + modal (เศษส่วน ป.4 มี 2 metaphor)
await page.goto(`${BASE}/math/4/fractions/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.getByRole('button', { name: /ภาพช่วยจำ/ }).click()
await page.waitForTimeout(700)
await shot('feat-metaphor-1')                       // modal: มังกรหิวแบ่งเค้ก
await page.getByRole('button', { name: /อีกแบบ/ }).click()
await page.waitForTimeout(600)
await shot('feat-metaphor-2')                       // modal: ช็อกโกแลตหัก

// 2) Audit page
await page.goto(`${BASE}/audit/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await shot('feat-audit')
// click a copy button + verify clipboard
await page.getByRole('button', { name: /copy prompt/ }).first().click()
await page.waitForTimeout(400)
await shot('feat-audit-copied')
const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => 'CLIP_DENIED'))
console.log('CLIP_SAMPLE:', (clip || '').slice(0, 120).replace(/\n/g, ' '))

await browser.close()
console.log('done')
