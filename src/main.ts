import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.e-vrit.co.il');
  try {
    await page.locator('a.a-cookie-btn').click({ timeout: 5000 }); // 5 second timeout
  } catch (error) {
    console.log('Cookie button not found or not clickable, continuing...');
  }
  await page.locator('div.search-input-div form input[name="SearchInputVM"]:visible').fill('אטלנטיס');
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
