import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const btn = re => page.getByRole('button', { name: re })

await page.goto(`${BASE}/math/6/parallel-angles/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// intro scene — TransversalAngles interactive
await shot('ti-00-none')                                   // default: 4 มุม no highlight
await btn(/มุมแย้ง/).click(); await page.waitForTimeout(400)
await shot('ti-01-alt')                                    // alt pair lit, both = 60°
await btn(/กว้าง/).click(); await page.waitForTimeout(400)
await shot('ti-02-alt-wide')                               // angle 65 — both labels now 65°
await btn(/มุมภายในข้างเดียวกัน/).click(); await page.waitForTimeout(400)
await shot('ti-03-co')                                     // co pair: 65° + 115° = 180

// advance to readOnly preset scenes (explored goal already met)
await page.getByRole('button', { name: /ถัดไป/ }).last().click(); await page.waitForTimeout(600)
await shot('ti-04-scene-alt')                              // mode:'alt' preset, readOnly
await page.getByRole('button', { name: '60°', exact: true }).first().click(); await page.waitForTimeout(400)
await page.getByRole('button', { name: /ถัดไป/ }).last().click(); await page.waitForTimeout(600)
await shot('ti-05-scene-co')                               // mode:'co' preset, readOnly

await browser.close()
console.log('done')
