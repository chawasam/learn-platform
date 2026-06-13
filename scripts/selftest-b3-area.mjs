import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const mc = t => page.getByRole('button').filter({ hasText: t }).last()
const tile = () => page.getByRole('button', { name: /ปูอีก/ })
const tileN = async k => { for (let i = 0; i < k; i++) { await tile().click(); await page.waitForTimeout(250) } }

await page.goto(`${BASE}/math/4/area/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('ar-00-intro')          // 5×3 full readOnly

await next().click(); await page.waitForTimeout(400)  // tile-row 5x3
await tileN(3)
await shot('ar-01-tile53')         // 5×3=15

await next().click(); await page.waitForTimeout(400)  // count-rows
await shot('ar-02-count')

await next().click(); await page.waitForTimeout(400)  // tile-4x6
await tileN(6)
await shot('ar-03-tile46')         // 4×6=24

await next().click(); await page.waitForTimeout(400)  // square 5x5
await tileN(5)
await shot('ar-04-square')         // 5×5=25

await next().click(); await page.waitForTimeout(400)  // quiz 4x7
await mc('28').click()
await page.waitForTimeout(500)
await shot('ar-05-quiz')

await next().click(); await page.waitForTimeout(400)  // recap
await shot('ar-06-recap')

await browser.close()
console.log('done')
