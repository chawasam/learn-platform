import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const mc = t => page.getByRole('button').filter({ hasText: t }).last()
const plus = lbl => page.getByRole('button', { name: `เพิ่ม${lbl}` })
const clickN = async (lbl, k) => { for (let i = 0; i < k; i++) { await plus(lbl).click(); await page.waitForTimeout(250) } }

await page.goto(`${BASE}/math/4/multiplication/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('mu-00-intro')          // 4×3=12 array

await next().click(); await page.waitForTimeout(400)  // as-addition
await shot('mu-01-addition')

await next().click(); await page.waitForTimeout(400)  // build-2x3
await clickN('ต่อแถว', 1)          // 1→2
await clickN('จำนวนแถว', 2)        // 1→3
await shot('mu-02-build2x3')        // 2×3=6 + unlock

await next().click(); await page.waitForTimeout(400)  // commutative
await shot('mu-03-commutative')     // 3×2=6

await next().click(); await page.waitForTimeout(400)  // build-3x4
await clickN('ต่อแถว', 2)          // 1→3
await clickN('จำนวนแถว', 3)        // 1→4
await shot('mu-04-build3x4')        // 3×4=12

await next().click(); await page.waitForTimeout(400)  // fast
await shot('mu-05-fast')            // 5×4=20

await next().click(); await page.waitForTimeout(400)  // quiz
await mc('24').click()
await page.waitForTimeout(500)
await shot('mu-06-quiz')

await next().click(); await page.waitForTimeout(400)  // recap
await shot('mu-07-recap')

await browser.close()
console.log('done')
