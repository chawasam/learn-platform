import { chromium } from 'playwright'
const OUT = 'C:/Users/ck_sa/Desktop/learn-platform/scripts/shots'
const BASE = process.env.BASE || 'http://localhost:3001'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('pageerror', e => console.log('PAGEERR', e.message))
const next = () => page.getByRole('button', { name: /ถัดไป|ไปฝึกหัดกัน/ }).last()
const shot = n => page.screenshot({ path: `${OUT}/${n}.png` })
const go = async slug => { await page.goto(`${BASE}/math/6/${slug}/`, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500) }

// 1) FactorBuilder — tap all factors of 12 → goal complete=1
await go('factors')
for (const f of ['1', '2', '3', '4', '6', '12']) {
  await page.getByRole('button', { name: f, exact: true }).click(); await page.waitForTimeout(180)
}
await shot('p6-factors')

// 2) EquationBalance — remove c from both sides → goal solved=1
await go('equations')
await next().click(); await page.waitForTimeout(400)   // solve scene
await page.getByRole('button', { name: /หยิบ/ }).click(); await page.waitForTimeout(700)
await shot('p6-equation')

// 3) PercentBar — 10% → 20% → goal percent=20
await go('percent')
await page.getByRole('button', { name: '+10' }).click(); await page.waitForTimeout(600)
await shot('p6-percent')

// spot reuse renders
await go('parallel-angles'); await shot('p6-parallel-angles')
await go('scale-map'); await shot('p6-scale')
await go('statistics'); await shot('p6-statistics')

await browser.close()
console.log('done')
