import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const btn = re => page.getByRole('button', { name: re })
const go = async slug => { await page.goto(`${BASE}/math/5/${slug}/`, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500) }

// 1) ParallelLines — make parallel → goal parallel=1
await go('parallel-lines')
await next().click(); await page.waitForTimeout(400)   // tilt scene
await btn(/ทำให้ขนาน/).click(); await page.waitForTimeout(600)
await shot('p5-parallel')

// 2) QuadMorph — select rhombus → goal shape=rhombus
await go('quadrilaterals-5')
await btn(/ขนมเปียกปูน/).click(); await page.waitForTimeout(600)
await shot('p5-quad')

// 3) TriangleAngles — combine 3 angles → goal combined=1
await go('triangles')
await btn(/รวม 3 มุม/).click(); await page.waitForTimeout(800)
await shot('p5-triangle')

// 4) CircleRadius — r 3→5 → goal r=5
await go('circles')
await btn(/^\+$/).click(); await page.waitForTimeout(250)
await btn(/^\+$/).click(); await page.waitForTimeout(500)
await shot('p5-circle')

// 5) ProbabilityBag — draw a few
await go('probability')
await next().click(); await page.waitForTimeout(400)   // draw scene
const draw = btn(/หยิบ 1 ลูก/)
for (let i = 0; i < 4; i++) { await draw.click(); await page.waitForTimeout(250) }
await shot('p5-probability')

// 6) spot: AngleDrag render + CubeBuilder render
await go('angles')
await shot('p5-angles')
await go('volume')
await shot('p5-volume')

await browser.close()
console.log('done')
