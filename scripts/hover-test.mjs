import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(2000);

// hover on first hero pill
const pill = page.locator('.hero-pill').first();
await pill.hover();
await page.waitForTimeout(600);
await page.screenshot({ path: 'after-hover-pill.png', scale: 'css' });

// scroll to values section, hover a chip
await page.evaluate(() => window.scrollTo(0, 1800));
await page.waitForTimeout(800);
const chip = page.locator('.chip').first();
if (await chip.isVisible()) {
  await chip.hover();
  await page.waitForTimeout(500);
}
await page.screenshot({ path: 'after-hover-chip.png', scale: 'css' });

// hover a "More About Us" secondary button
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(800);
const secondaryBtn = page.locator('a[href="/who-we-are"].bg-white, a[href="/who-we-are"].text-\\[var\\(--color-primary\\)\\]').first();
if (await secondaryBtn.isVisible()) {
  await secondaryBtn.hover();
  await page.waitForTimeout(500);
}
await page.screenshot({ path: 'after-hover-secondary.png', scale: 'css' });

await browser.close();
console.log('done');
