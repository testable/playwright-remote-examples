const { devices } = require('@playwright/test');
const { defineConfig } = require('testable-playwright-test');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }]
  ],
  use: {
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ]
}, {
  serverUrl: 'wss://playwright.testable.io/',
  key: process.env.TESTABLE_KEY,
  testCaseName: 'Support Team Remote Playwright Tests',
  region: 'aws-us-east-1',
  screenshot: 'afterFailed'
});
