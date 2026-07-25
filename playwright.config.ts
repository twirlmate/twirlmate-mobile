import { defineConfig } from '@playwright/test';

const webPort = Number(process.env.QUALITY_HARNESS_WEB_PORT ?? 19006);
const harnessMode = process.env.QUALITY_HARNESS_MODE === 'review' ? 'review' : 'default';
const outputDir =
  harnessMode === 'review'
    ? 'artifacts/quality-harness/review-test-results'
    : 'artifacts/quality-harness/test-results';
const reportDir =
  harnessMode === 'review'
    ? 'artifacts/quality-harness/review-playwright-report'
    : 'artifacts/quality-harness/playwright-report';
const testTimeoutMs = harnessMode === 'review' ? 180_000 : 60_000;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: testTimeoutMs,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  outputDir,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: reportDir }],
  ],
  use: {
    baseURL: `http://127.0.0.1:${webPort}`,
    viewport: { width: 430, height: 932 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: process.env.PLAYWRIGHT_RECORD_VIDEO === '1' ? 'on' : 'retain-on-failure',
  },
  webServer: {
    command: 'node ./scripts/quality-harness/run-quality-harness.mjs',
    url: `http://127.0.0.1:${webPort}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
