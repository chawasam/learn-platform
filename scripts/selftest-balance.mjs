// Self-test: BalanceDrag tilt direction (SELF-TEST PROTOCOL — see AGENTS.md)
// Usage: node scripts/selftest-balance.mjs  (dev server must be running on :3000)
import { chromium } from 'playwright'

const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 900 } })

// State 1: right heavy (left 20 vs right 30) — readOnly block on explain tab
await page.goto('http://localhost:3001/math/6/ratio-proportion/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500) // let lazy component + spring animation settle
const svg = page.locator('svg[viewBox="0 0 280 170"]').first()
await svg.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
await svg.screenshot({ path: `${OUT}/balance-right-heavy.png` })

// State 2+3: interactive page — equations chapter has readOnly:false explain block
await page.goto('http://localhost:3001/math/6/linear-equations/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
const svg2 = page.locator('svg[viewBox="0 0 280 170"]').first()
await svg2.scrollIntoViewIfNeeded()

// add +5 to LEFT → left heavy → left must sink
await page.getByRole('button', { name: '+5' }).first().click()
await page.waitForTimeout(1200)
await svg2.screenshot({ path: `${OUT}/balance-left-heavy.png` })

// add +5 to RIGHT → balanced → arm level
await page.getByRole('button', { name: '+5' }).nth(1).click()
await page.waitForTimeout(1200)
await svg2.screenshot({ path: `${OUT}/balance-balanced.png` })

await browser.close()
console.log('done')
