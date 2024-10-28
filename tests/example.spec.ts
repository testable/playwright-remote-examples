import { expect } from '@playwright/test';
import { createFixture as createTestableFixture } from 'testable-playwright-test';

const test = createTestableFixture({
    serverUrl: 'wss://playwright.testable.io/',
    key: process.env.TESTABLE_KEY,
    testCaseName: 'Support Team Remote Playwright Tests',
    reportId: 'Remote Playwright Tests',
    region: 'aws-us-east-1',
    screenshot: 'afterFailed'
});

test('has title', async ({ page }) => {
  await page.goto('https://google.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
