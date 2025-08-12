import { chromium, Browser, Page } from '@playwright/test';

const E_VRIT_URL = 'https://www.e-vrit.co.il';
const BOOK_TO_SEARCH = 'אטלנטיס';
const SCREENSHOT_PATH = 'screenshot.png';

async function handleCookieConsent(page: Page) {
  try {
    await page.locator('a.a-cookie-btn').click({ timeout: 5000 });
    console.log('Cookie consent banner dismissed.');
  } catch (error) {
    console.log('Cookie consent banner not found or not clickable, continuing...');
  }
}

async function searchForBook(page: Page, bookName: string) {
  const searchInputSelector = 'div.search-input-div form input[name="SearchInputVM"]:visible';
  await page.locator(searchInputSelector).fill(bookName);
  console.log(`Filled search input with: ${bookName}`);
  await page.keyboard.press('Enter');
  console.log('Pressed Enter to start search.');
  await page.waitForNavigation();
  console.log('Search results page loaded.');
}

async function main() {
  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${E_VRIT_URL}...`);
    await page.goto(E_VRIT_URL);

    await handleCookieConsent(page);
    await searchForBook(page, BOOK_TO_SEARCH);

    console.log(`Taking screenshot: ${SCREENSHOT_PATH}`);
    await page.screenshot({ path: SCREENSHOT_PATH });

    console.log('Script completed successfully.');
  } catch (error) {
    console.error('An error occurred during the script execution:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}

main();
