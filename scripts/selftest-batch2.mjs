import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ })
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })

// ---- LENGTH (บท7): scene 2 reach-value 7 on NumberLine ----
await page.goto('http://localhost:3001/math/4/length/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await next().click(); await page.waitForTimeout(500)   // -> measure-pencil (reach 7)
const nl = page.locator('svg[viewBox="0 0 300 90"]').first()
let b = await nl.boundingBox()
// number line 0-10, drag handle to x of value 7: PAD 24, width 300-48=252 → x(7)=24+7/10*252≈200 (of 300 vb). px ratio.
await page.mouse.click(b.x + b.width * (200/300), b.y + b.height * 0.55)
await page.waitForTimeout(800)
await shot('len-02-reach7')

// ---- DECIMALS (บท12): scene 3 reach-value r0=3 on FractionBars ----
await page.goto('http://localhost:3001/math/4/decimals/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await next().click(); await page.waitForTimeout(400)  // ten-pieces
await next().click(); await page.waitForTimeout(400)  // make-03 (reach r0=3)
const fb = page.locator('svg[viewBox="0 0 280 46"]').first()
let fbb = await fb.boundingBox()
// 10 cells, tap 3rd cell center: x ≈ (2.5/10) width
await page.mouse.click(fbb.x + fbb.width * (2.5/10), fbb.y + fbb.height * 0.5)
await page.waitForTimeout(800)
await shot('dec-03-make03')

// ---- BAR CHART (บท6): scene 3 interact ----
await page.goto('http://localhost:3001/math/4/bar-chart/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await next().click(); await page.waitForTimeout(400)  // tall-means-more
await next().click(); await page.waitForTimeout(400)  // try-drag (interact)
await shot('bar-03-locked')
const bc = page.locator('svg[viewBox="0 0 300 220"]').first()
let bcb = await bc.boundingBox()
// drag first bar up: bar 0 around x ~ (gap/2) ; drag from mid to top
await page.mouse.move(bcb.x + bcb.width * 0.25, bcb.y + bcb.height * 0.6)
await page.mouse.down()
await page.mouse.move(bcb.x + bcb.width * 0.25, bcb.y + bcb.height * 0.2, { steps: 6 })
await page.mouse.up()
await page.waitForTimeout(700)
await shot('bar-03b-dragged')

await browser.close()
console.log('done')
