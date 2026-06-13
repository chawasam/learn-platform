import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const calc = () => page.getByRole('button', { name: /หลักถัดไป/ })
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const stepN = async k => { for (let i = 0; i < k; i++) { await calc().click(); await page.waitForTimeout(350) } }

await page.goto(`${BASE}/math/4/addition-subtraction/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('as-00-intro')          // 25 + 18 ตั้งหลัก rev0

await next().click(); await page.waitForTimeout(400)  // add-units
await stepN(2)
await shot('as-01-add25')          // 43 + carry 1

await next().click(); await page.waitForTimeout(400)
await shot('as-02-carryexplain')   // readOnly step2

await next().click(); await page.waitForTimeout(400)  // add-big
await stepN(4)
await shot('as-03-add3250')        // 4720

await next().click(); await page.waitForTimeout(400)  // sub-intro
await shot('as-04-subintro')       // 52-27 rev0

await next().click(); await page.waitForTimeout(400)  // sub-units
await stepN(2)
await shot('as-05-sub52')          // 25 + borrow (5 strike → 4)

await next().click(); await page.waitForTimeout(400)
await shot('as-06-borrowexplain')

await next().click(); await page.waitForTimeout(400)  // sub-big
await stepN(3)
await shot('as-07-sub624')         // 466 borrow x2

await next().click(); await page.waitForTimeout(400)  // recap
await shot('as-08-recap')

await browser.close()
console.log('done')
