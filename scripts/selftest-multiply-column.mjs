// Self-test: MultiplyColumn component + updated multiply.ts story
// Verifies: column layout correct, carry digits appear, result digits correct
import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3000'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))

const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const colBtn = () => page.getByRole('button', { name: 'คูณหลักถัดไป ▶' })
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const mc = t => page.getByRole('button').filter({ hasText: t }).last()
const plus = lbl => page.getByRole('button', { name: `เพิ่ม${lbl}` })
const clickN = async (lbl, k) => { for (let i = 0; i < k; i++) { await plus(lbl).click(); await page.waitForTimeout(250) } }

await page.goto(`${BASE}/math/4/multiplication/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('mc-00-intro')           // MultiplyArray 4×3

await next().click(); await page.waitForTimeout(400)  // as-addition
await shot('mc-01-addition')

await next().click(); await page.waitForTimeout(400)  // build-2x3
await clickN('ต่อแถว', 1)
await clickN('จำนวนแถว', 2)
await shot('mc-02-build2x3')

await next().click(); await page.waitForTimeout(400)  // commutative
await shot('mc-03-commutative')

await next().click(); await page.waitForTimeout(400)  // build-3x4
await clickN('ต่อแถว', 2)
await clickN('จำนวนแถว', 3)
await shot('mc-04-build3x4')

await next().click(); await page.waitForTimeout(400)  // fast (5×4=20)
await shot('mc-05-fast')

// === NEW SCENES ===
await next().click(); await page.waitForTimeout(800)  // column-intro (readOnly, initialStep:0)
await shot('mc-06-column-intro')    // should show 45×6 column layout, dots in result row

await next().click(); await page.waitForTimeout(800)  // column-step (interactive 45×6)
await shot('mc-07-column-step-0')   // before clicking — dots in result, button visible

// click once: reveal ones (6×5=30, show 0, carry=3 above tens)
await colBtn().click(); await page.waitForTimeout(500)
await shot('mc-08-column-step-1')   // ones revealed: 0, carry 3 above tens

// click again: reveal tens (4×6+3=27, show 7, carry=2 above hundreds)
await colBtn().click(); await page.waitForTimeout(500)
await shot('mc-09-column-step-2')   // tens revealed: 7

// click again: reveal hundreds (finalCarry=2)
await colBtn().click(); await page.waitForTimeout(500)
await shot('mc-10-column-done')     // done: shows 2,7,0 = 270, button→เริ่มใหม่
// ถัดไป should now be enabled (goal done=1 satisfied)

await next().click(); await page.waitForTimeout(800)  // column-3dig (123×4)
await shot('mc-11-column-3dig-0')   // 123×4, dots in result

// click 3 times (len=3, no finalCarry since 1×4+1=5 no overflow)
await colBtn().click(); await page.waitForTimeout(500)  // 3×4=12, res=2, carry=1
await shot('mc-12-column-3dig-1')
await colBtn().click(); await page.waitForTimeout(500)  // 2×4+1=9, res=9, carry=0
await shot('mc-13-column-3dig-2')
await colBtn().click(); await page.waitForTimeout(500)  // 1×4+0=4, res=4, carry=0
await shot('mc-14-column-3dig-done')  // done: shows 4,9,2 = 492

await next().click(); await page.waitForTimeout(800)  // quiz: 35×4=? with MultiplyColumn readOnly
await shot('mc-15-quiz')
await mc('140').click()
await page.waitForTimeout(500)
await shot('mc-16-quiz-answered')

await next().click(); await page.waitForTimeout(400)  // recap
await shot('mc-17-recap')

await browser.close()
console.log('done — shots in scripts/shots/mc-*.png')
