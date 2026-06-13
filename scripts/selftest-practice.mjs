// Self-test: practice completion summary (SELF-TEST PROTOCOL — see AGENTS.md)
// Scenario A: deliberately answer some MC wrong → summary must STILL appear
//   (completion = all answered, not all correct) and show back + retry buttons.
import { chromium } from 'playwright'

const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const URL = 'http://localhost:3001/math/4/fractions/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 1000 } })
page.on('pageerror', e => console.log('PAGE ERR:', e.message))

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// Jump to practice: progress dots are clickable up to current; instead just click "ถัดไป/ไปฝึกหัด"
// through all scenes doing the minimum to unlock.
async function clickNext() {
  const btn = page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ })
  await btn.click()
  await page.waitForTimeout(450)
}

// scene flow (mirror selftest-fractions, minimal)
await clickNext()                                  // 1->2 (cut goal)
await page.getByRole('button', { name: '🔪 ตัด!' }).click(); await page.waitForTimeout(300)
await page.getByRole('button', { name: '🔪 ตัด!' }).click(); await page.waitForTimeout(600)
await clickNext()                                  // 2->3
await clickNext()                                  // 3->4 (pick 1)
let svg = page.locator('svg[viewBox="0 0 300 300"]').first()
let box = await svg.boundingBox()
await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.30); await page.waitForTimeout(600)
await clickNext()                                  // 4->5
await clickNext()                                  // 5->6 (pick to 3)
svg = page.locator('svg[viewBox="0 0 300 300"]').first(); box = await svg.boundingBox()
await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.70); await page.waitForTimeout(300)
await page.mouse.click(box.x + box.width * 0.38, box.y + box.height * 0.70); await page.waitForTimeout(600)
await clickNext()                                  // 6->7
await clickNext()                                  // 7->8 (equiv)
let bars = page.locator('svg[viewBox="0 0 280 46"]').nth(1); let bb = await bars.boundingBox()
await page.mouse.click(bb.x + bb.width * 0.30, bb.y + bb.height * 0.5); await page.waitForTimeout(700)
await clickNext()                                  // 8->9 (answer MC)
await page.getByRole('button', { name: '3/4', exact: false }).first().click(); await page.waitForTimeout(600)
await clickNext()                                  // 9->10
await clickNext()                                  // 10->practice

await page.waitForTimeout(800)
await page.screenshot({ path: `${OUT}/prac-00-start.png`, fullPage: true })

// Answer all 10. Q1 mc: pick a WRONG option on purpose to prove summary still shows.
// Walk each question card.
const cards = page.locator('.flex.flex-col.gap-6 > div')
// Simpler: answer by control type, scanning the page top-to-bottom.

// Q1 (mc: พิซซ่าแบ่ง 8 กิน 3 → 3/8, opts 3/8,8/3,3/5,5/8) — pick WRONG "8/3"
await page.getByRole('button', { name: /^B/ }).first().click({ timeout: 5000 }).catch(() => {})
await page.waitForTimeout(300)

// Now fill all text inputs with their correct answers, click ตอบ
const fillAnswers = ['6', '2', '2', '1', '2']  // q2,q3,q5,q8(=1),q10(=2) — order of fills on page
// We can't easily map; instead brute force: for each ตอบ button, type a plausible value.
// Strategy: for every visible text input, set value then click its sibling ตอบ.
const inputs = page.locator('input[type="text"]')
const nInputs = await inputs.count()
for (let i = 0; i < nInputs; i++) {
  const inp = inputs.nth(i)
  await inp.scrollIntoViewIfNeeded()
  await inp.fill('2')   // wrong for some on purpose — proving summary appears regardless
  await page.waitForTimeout(150)
}
// click all ตอบ buttons
const submitBtns = page.getByRole('button', { name: 'ตอบ' })
let nSub = await submitBtns.count()
for (let i = 0; i < nSub; i++) {
  await submitBtns.nth(0).click().catch(() => {})  // list shrinks as they lock
  await page.waitForTimeout(200)
}
// slider: ยืนยันคำตอบ
const sliderBtns = page.getByRole('button', { name: 'ยืนยันคำตอบ' })
let nSl = await sliderBtns.count()
for (let i = 0; i < nSl; i++) {
  await sliderBtns.nth(0).click().catch(() => {})
  await page.waitForTimeout(200)
}
// remaining MCs: click the first ENABLED option (locks that MC, moving to next)
for (let r = 0; r < 12; r++) {
  const opt = page.locator('div.grid.grid-cols-1 > button:not([disabled])').first()
  if (await opt.count() === 0) break
  await opt.scrollIntoViewIfNeeded()
  await opt.click().catch(() => {})
  await page.waitForTimeout(250)
}

await page.waitForTimeout(1000)
await page.screenshot({ path: `${OUT}/prac-01-summary.png`, fullPage: true })

await browser.close()
console.log('done')
