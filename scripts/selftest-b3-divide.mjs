import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const mc = t => page.getByRole('button').filter({ hasText: t }).last()
const deal = () => page.getByRole('button', { name: /แจกอีก/ })
const dealN = async k => { for (let i = 0; i < k; i++) { await deal().click(); await page.waitForTimeout(300) } }

await page.goto(`${BASE}/math/4/division/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('di-00-intro')          // 12÷3=4 readOnly

await next().click(); await page.waitForTimeout(400)  // deal-12-3
await dealN(4)
await shot('di-01-deal12')         // จานละ4 done

await next().click(); await page.waitForTimeout(400)  // result-12-3
await shot('di-02-result')

await next().click(); await page.waitForTimeout(400)  // inverse (MultiplyArray)
await shot('di-03-inverse')

await next().click(); await page.waitForTimeout(400)  // deal-20-4
await dealN(5)
await shot('di-04-deal20')         // จานละ5

await next().click(); await page.waitForTimeout(400)  // remainder 13/4
await dealN(3)
await shot('di-05-remainder')      // จานละ3 เศษ1

await next().click(); await page.waitForTimeout(400)  // remainder-explain
await shot('di-06-remexplain')

await next().click(); await page.waitForTimeout(400)  // quiz 15/2
await mc('7 เศษ 1').click()
await page.waitForTimeout(500)
await shot('di-07-quiz')

await next().click(); await page.waitForTimeout(400)  // recap
await shot('di-08-recap')

await browser.close()
console.log('done')
