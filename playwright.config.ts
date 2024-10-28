const { defineConfig, devices } = require('@playwright/test');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }]
  ],
  metadata: {
    tags: process.env.RESULTS_TAGS || `test-${Date.now()}`
  },
  use: {
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
