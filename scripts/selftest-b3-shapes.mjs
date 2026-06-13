import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const svg = () => page.locator('svg[viewBox="0 0 200 200"]').first()
const mc = t => page.getByRole('button').filter({ hasText: t }).last()
async function tapAll(points) {
  const sb = await svg().boundingBox()
  for (const [x, y] of points) {
    await page.mouse.click(sb.x + (x / 200) * sb.width, sb.y + (y / 200) * sb.height)
    await page.waitForTimeout(250)
  }
}

await page.goto(`${BASE}/math/4/geometry-shapes/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await shot('sh-00-intro')

await next().click(); await page.waitForTimeout(400)  // tri-sides
await tapAll([[131, 82], [100, 136], [69, 82]])
await shot('sh-01-trisides')      // ด้าน: 3

await next().click(); await page.waitForTimeout(400)  // tri-angles
await tapAll([[100, 28], [162, 136], [38, 136]])
await shot('sh-02-triangles')     // มุม: 3

await next().click(); await page.waitForTimeout(400)  // tri-recap (readOnly)
await shot('sh-03-trirecap')

await next().click(); await page.waitForTimeout(400)  // sq-sides
await tapAll([[100, 40], [160, 100], [100, 160], [40, 100]])
await shot('sh-04-sqsides')       // ด้าน: 4

await next().click(); await page.waitForTimeout(400)  // rectangle (answer 4)
await mc('4').click()
await page.waitForTimeout(500)
await shot('sh-05-rect')

await next().click(); await page.waitForTimeout(400)  // pentagon
await tapAll([[134, 53], [155, 118], [100, 158], [45, 118], [66, 53]])
await shot('sh-06-pentagon')      // ด้าน: 5

await next().click(); await page.waitForTimeout(400)  // circle (answer)
await mc('ไม่มีมุม').click()
await page.waitForTimeout(500)
await shot('sh-07-circle')

await next().click(); await page.waitForTimeout(400)  // recap
await shot('sh-08-recap')

await browser.close()
console.log('done')
