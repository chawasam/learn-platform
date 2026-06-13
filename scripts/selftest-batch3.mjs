import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ })
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const plus = name => page.getByRole('button', { name: `เพิ่มหลัก${name}` })

// ---- บท 1: จำนวนนับมากกว่าแสน (ThaiNumberBuilder) ----
await page.goto(`${BASE}/math/4/numbers-100000/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('num-00-intro')        // 100,000 → "หนึ่งแสน"

await next().click(); await page.waitForTimeout(400)
await shot('num-01-places')       // 0 → "ศูนย์", โครงหลักครบ

await next().click(); await page.waitForTimeout(400)  // make-100000
await plus('แสน').click(); await page.waitForTimeout(600)
await shot('num-02-make100k')     // 100,000 "หนึ่งแสน" + ปุ่มถัดไปปลดล็อก

await next().click(); await page.waitForTimeout(400)
await shot('num-03-read250k')     // 250,000 "สองแสนห้าหมื่น"

await next().click(); await page.waitForTimeout(400)  // make-250000
await plus('แสน').click(); await plus('แสน').click()
await plus('หมื่น').click(); await plus('หมื่น').click(); await plus('หมื่น').click()
await plus('หมื่น').click(); await plus('หมื่น').click()
await page.waitForTimeout(600)
await shot('num-04-make250k')     // 250,000 + unlock

await next().click(); await page.waitForTimeout(400)
await shot('num-05-zeroskip')     // 320,000 "สามแสนสองหมื่น"

await next().click(); await page.waitForTimeout(400)  // make-320000
await plus('แสน').click(); await plus('แสน').click(); await plus('แสน').click()
await plus('หมื่น').click(); await plus('หมื่น').click()
await page.waitForTimeout(600)
await shot('num-06-make320k')

await next().click(); await page.waitForTimeout(400)
await shot('num-07-special')      // 21 "ยี่สิบเอ็ด"

await next().click(); await page.waitForTimeout(400)  // quiz-read
await shot('num-08-quiz')
await page.getByRole('button', { name: 'สี่แสนห้าหมื่นสองพัน' }).click()
await page.waitForTimeout(600)
await shot('num-08b-answered')

await next().click(); await page.waitForTimeout(400)
await shot('num-09-recap')

await browser.close()
console.log('done')
