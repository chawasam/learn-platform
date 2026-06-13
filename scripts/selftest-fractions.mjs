// Self-test: เศษส่วน ป.4 story prototype (SELF-TEST PROTOCOL — see AGENTS.md)
// Walks every scene, performs the goal interactions, screenshots each state.
import { chromium } from 'playwright'

const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const URL = 'http://localhost:3001/math/4/fractions/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 980 } })
page.on('pageerror', e => console.log('PAGE ERR:', e.message))

const shot = (name) => page.screenshot({ path: `${OUT}/frac-${name}.png`, fullPage: false })
const next = async () => {
  await page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).click()
  await page.waitForTimeout(600)
}

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

// Scene 1: intro — whole pizza
await shot('01-intro')
await next()

// Scene 2: cut to 4 — next must be LOCKED before cutting
await shot('02-cut-locked')
await page.getByRole('button', { name: '🔪 ตัด!' }).click()
await page.waitForTimeout(500)
await shot('02b-cut-once-2slices')
await page.getByRole('button', { name: '🔪 ตัด!' }).click()
await page.waitForTimeout(800)
await shot('02c-cut-twice-4slices-unlocked')
await next()

// Scene 3: four equal
await shot('03-four-equal')
await next()

// Scene 4: pick 1 slice (tap a slice path) — tap near top slice center
await shot('04-pick-locked')
// pizza svg center 150,150 r~118 rendered at 260px wide → tap upper-right slice
const svg = page.locator('svg[viewBox="0 0 300 300"]').first()
const box = await svg.boundingBox()
await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.30)
await page.waitForTimeout(800)
await shot('04b-picked-1-label-1-4')
await next()

// Scene 5: meaning (static 1/4)
await shot('05-meaning')
await next()

// Scene 6: pick to 3 — already 1 filled, tap 2 more slices
const svg2 = page.locator('svg[viewBox="0 0 300 300"]').first()
const b2 = await svg2.boundingBox()
await page.mouse.click(b2.x + b2.width * 0.62, b2.y + b2.height * 0.70)
await page.waitForTimeout(400)
await page.mouse.click(b2.x + b2.width * 0.38, b2.y + b2.height * 0.70)
await page.waitForTimeout(800)
await shot('06-picked-3-label-3-4')
await next()

// Scene 7: chocolate 1/2
await shot('07-chocolate-half')
await next()

// Scene 8: equivalence — tap 2nd cell of bottom bar (4 parts)
await shot('08-equiv-before')
const bars = page.locator('svg[viewBox="0 0 280 46"]').nth(1)
const bb = await bars.boundingBox()
// cell 2 of 4: x ≈ 1.5/4 of width
await page.mouse.click(bb.x + bb.width * 0.30, bb.y + bb.height * 0.5)
await page.waitForTimeout(900)
await shot('08b-equiv-2-4-equal')
await next()

// Scene 9: compare 3/4 vs 1/2 — answer MC
await shot('09-compare')
await page.getByRole('button', { name: '3/4', exact: false }).first().click()
await page.waitForTimeout(800)
await shot('09b-compare-answered')
await next()

// Scene 10: recap
await shot('10-recap')
await next()

// Final practice
await shot('11-practice')

await browser.close()
console.log('done')
