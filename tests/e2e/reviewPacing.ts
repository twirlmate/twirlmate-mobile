import path from 'node:path';

import type { Locator, Page } from '@playwright/test';

const reviewMode = process.env.QUALITY_HARNESS_MODE === 'review';
const reviewPauseMs = Number(process.env.QUALITY_HARNESS_REVIEW_PAUSE_MS ?? 1200);
const reviewTypeDelayMs = Number(process.env.QUALITY_HARNESS_REVIEW_TYPE_DELAY_MS ?? 120);
const reviewScreenshotDir = path.join(
  process.cwd(),
  'artifacts/quality-harness/review-screenshots/groups-discovery'
);

export function isReviewMode() {
  return reviewMode;
}

export async function pauseForReview(page: Page, _label: string, durationMs = reviewPauseMs) {
  if (!reviewMode) {
    return;
  }

  await page.waitForTimeout(durationMs);
}

export async function enterText(locator: Locator, value: string) {
  await locator.click();

  if (!reviewMode) {
    await locator.pressSequentially(value);
    return;
  }

  await locator.pressSequentially(value, { delay: reviewTypeDelayMs });
}

export async function captureReviewScreenshot(page: Page, filename: string) {
  if (!reviewMode) {
    return;
  }

  await page.screenshot({
    path: path.join(reviewScreenshotDir, filename),
  });
}
