import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { testIds } from '../../constants/testIds';

const fixtureServerUrl = `http://127.0.0.1:${process.env.QUALITY_HARNESS_FIXTURE_PORT ?? '4010'}`;

async function setScenario(request: APIRequestContext, name: string) {
  const response = await request.get(`${fixtureServerUrl}/__quality/scenario?name=${name}`);
  expect(response.ok()).toBeTruthy();
}

test.describe('Discovery quality harness', () => {
  test('records a representative discovery flow across the current core surfaces', async ({ page, request }) => {
    await setScenario(request, 'happy-path');

    await page.goto('/events');
    await expect(page.getByText('Registration Closing Soon')).toBeVisible();
    await page.getByTestId(testIds.eventCard(101)).click();
    await expect(page).toHaveURL(/\/events\/101/);
    await expect(page.getByText('A deterministic fixture event used for the recorded discovery harness flow.')).toBeVisible();

    await page.goto('/people');
    await expect(page.getByText('Coaches')).toBeVisible();
    await page.getByTestId(testIds.coachCard(201)).click();
    await expect(page).toHaveURL(/\/people\/201/);
    await expect(page.getByText('A deterministic fixture profile used for the discovery harness.')).toBeVisible();

    await page.goto('/groups');
    await expect(page.getByTestId(testIds.groupsScreen)).toBeVisible();
    await page.getByTestId(testIds.groupsStatesTab).click();
    await page.getByTestId(testIds.groupStateCard('TX')).click();
    await expect(page.getByText('Texas Twirlers Guild')).toBeVisible();
    await page.getByTestId(testIds.groupCard(301)).click();
    await expect(page).toHaveURL(/\/groups\/301/);
    await expect(page.getByText('A fixture community group for recorded discovery tests.')).toBeVisible();
  });

  test('shows a retryable groups error state and recovers without restarting the app', async ({ page, request }) => {
    await setScenario(request, 'groups-error');

    await page.goto('/groups');
    await expect(page.getByTestId(testIds.errorState)).toContainText('Unable to load groups right now. Please try again.');

    await setScenario(request, 'happy-path');
    await page.getByTestId(testIds.errorRetryButton).click();

    await expect(page.getByTestId(testIds.groupCard(301))).toBeVisible();
    await expect(page.getByText('Texas Twirlers Guild')).toBeVisible();
  });
});
