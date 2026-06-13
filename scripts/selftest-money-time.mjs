// Self-test money + time stories (SELF-TEST PROTOCOL — see AGENTS.md)
import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGE ERR:', e.message))

const nextBtn = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ })
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })

// ---- TIME ----
await page.goto('http://localhost:3001/math/4/time/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)
await shot('time-01-intro')
await nextBtn().click(); await page.waitForTimeout(500)   // -> three
await nextBtn().click(); await page.waitForTimeout(500)   // -> try-spin (interact goal)
await shot('time-03-spin-locked')
// drag minute hand around: clock svg 200x200 @220px. center ~110,110. drag from top to right.
const clk = page.locator('svg[viewBox="0 0 200 200"]').first()
const cb = await clk.boundingBox()
await page.mouse.move(cb.x + cb.width * 0.5, cb.y + cb.height * 0.18)
await page.mouse.down()
await page.mouse.move(cb.x + cb.width * 0.82, cb.y + cb.height * 0.5, { steps: 8 })
await page.mouse.up()
await page.waitForTimeout(700)
await shot('time-03b-spun-unlocked')
await nextBtn().click(); await page.waitForTimeout(600)  // half (3:30)
await shot('time-04-half-330')
await nextBtn().click(); await page.waitForTimeout(600)  // quarter (3:15)
await shot('time-05-quarter-315')
await nextBtn().click(); await page.waitForTimeout(600)  // check (6:30, long hand at 6)
await shot('time-06-check')
await page.getByRole('button', { name: /30 นาที/ }).click()
await page.waitForTimeout(700)
await shot('time-06b-answered')

// ---- MONEY ----
await page.goto('http://localhost:3001/math/4/money-change/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await shot('money-01-intro')
await nextBtn().click(); await page.waitForTimeout(500)   // build-75 (reach 75)
await shot('money-02-build-locked')
// build 75: +50, +20, +5
await page.getByRole('button', { name: '+', exact: true }).nth(1).click()  // ฿50 row +
await page.waitForTimeout(200)
// safer: click + buttons by denom row. Use the colored + buttons.
// Just click several + to reach 75 via 50+20+5: click + on rows for 50,20,5
// rows order in availableDenominations [100,50,20,10,5,1]: index 0=100,1=50,2=20,4=5
const plusButtons = page.getByRole('button', { name: '+', exact: true })
await plusButtons.nth(2).click(); await page.waitForTimeout(200)  // +20
await plusButtons.nth(4).click(); await page.waitForTimeout(400)  // +5  => 50+20+5=75
await shot('money-02b-built75')
await browser.close()
console.log('done')
