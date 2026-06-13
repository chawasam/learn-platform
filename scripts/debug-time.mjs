import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 480, height: 940 } })
page.on('console', m => console.log('CONSOLE', m.type(), m.text()))
page.on('pageerror', e => console.log('PAGEERR', e.message, e.stack))
await page.goto('http://localhost:3001/math/4/time/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await browser.close()
console.log('---done---')
