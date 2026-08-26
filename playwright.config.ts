import { defineConfig, devices } from '@playwright/test';

// ✅ "Run by" metadata — chèn vào title để hiển thị trong HTML report
const RUN_BY = 'Run by: 23127104';
const RUN_TIMESTAMP = process.env.PLAYWRIGHT_RUN_TIMESTAMP;

if (!RUN_TIMESTAMP) {
  throw new Error(
    'Missing PLAYWRIGHT_RUN_TIMESTAMP. Run Playwright through an npm script, for example: npm run test:fr03',
  );
}

/**
 * HW04 - MSSV: 23127104
 * Playwright configuration for EShop SUT
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './automation/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['line']],

  // Timeout mỗi test action (ms)
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for EShop SUT */
    baseURL: 'http://localhost:5173',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: `chromium | ${RUN_BY} | ${RUN_TIMESTAMP}`,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: `firefox | ${RUN_BY} | ${RUN_TIMESTAMP}`,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: `webkit | ${RUN_BY} | ${RUN_TIMESTAMP}`,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
