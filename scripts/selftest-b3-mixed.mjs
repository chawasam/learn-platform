import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const mc = t => page.getByRole('button').filter({ hasText: t }).last()
const op = s => page.getByRole('button', { name: s, exact: true })

await page.goto(`${BASE}/math/4/order-of-operations/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('mx-00-intro')          // left mode 2+3×4 → 20 ✗

await next().click(); await page.waitForTimeout(400)
await shot('mx-01-wrong')          // 20 ✗

await next().click(); await page.waitForTimeout(400)
await shot('mx-02-right')          // 14 ✓

await next().click(); await page.waitForTimeout(400)  // solve-1
await op('×').click(); await page.waitForTimeout(500)
await shot('mx-03a-afterX')        // 2 + 12
await op('+').click(); await page.waitForTimeout(500)
await shot('mx-03b-done14')        // done 14

await next().click(); await page.waitForTimeout(400)  // solve-2
await op('÷').click(); await page.waitForTimeout(500)
await op('-').click(); await page.waitForTimeout(500)
await shot('mx-04-done7')          // done 7

await next().click(); await page.waitForTimeout(400)  // parentheses (answer)
await mc('16').click(); await page.waitForTimeout(500)
await shot('mx-05-paren')

await next().click(); await page.waitForTimeout(400)  // recap
await shot('mx-06-recap')

await browser.close()
console.log('done')
