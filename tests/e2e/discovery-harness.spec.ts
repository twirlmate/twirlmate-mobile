import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { testIds } from '../../constants/testIds';
import { captureReviewScreenshot, enterText, pauseForReview } from './reviewPacing';

const fixtureServerUrl = `http://127.0.0.1:${process.env.QUALITY_HARNESS_FIXTURE_PORT ?? '4010'}`;

async function setScenario(request: APIRequestContext, name: string) {
  const response = await request.get(`${fixtureServerUrl}/__quality/scenario?name=${name}`);
  expect(response.ok()).toBeTruthy();
}

async function chooseGroupState(page: import('@playwright/test').Page, stateCode: string) {
  const stateOption = page.getByTestId(testIds.groupStateOption(stateCode.toLowerCase()));
  await stateOption.scrollIntoViewIfNeeded();
  await stateOption.click();
  await page.getByText('Done').click();
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
    await pauseForReview(page, 'groups explore initial');
    await captureReviewScreenshot(page, '01-groups-explore-initial.png');

    await page.getByTestId(testIds.groupsSearchTab).click();
    await page.getByTestId(testIds.groupsSearchFilterButton).click();
    const groupsSearchInput = page.getByPlaceholder('Search by group name...');
    await enterText(groupsSearchInput, 'twirl');
    await expect(groupsSearchInput).toHaveValue('twirl');
    await pauseForReview(page, 'groups search typed');
    await captureReviewScreenshot(page, '02-groups-search-typed.png');
    await page.getByTestId(testIds.groupsSearchStateButton).click();
    await pauseForReview(page, 'groups state filter open');
    await captureReviewScreenshot(page, '03-groups-state-filter-chooser.png');
    await chooseGroupState(page, 'PA');
    await pauseForReview(page, 'groups state filter selected');
    await page.getByTestId(testIds.groupsSearchApplyButton).click();
    await expect(page.getByTestId(testIds.groupCard(303))).toBeVisible();
    await pauseForReview(page, 'groups filtered results');
    await captureReviewScreenshot(page, '04-groups-filtered-results.png');
    await page.getByTestId(testIds.groupCard(303)).click();
    await expect(page).toHaveURL(/\/groups\/303/);
    await expect(page.getByText('A fixture search result used for deterministic groups filtering coverage.')).toBeVisible();
    await pauseForReview(page, 'groups detail arrival');

    await page.goto('/groups');
    await page.getByTestId(testIds.groupsStatesTab).click();
    await page.getByTestId(testIds.groupStateCard('TX')).click();
    await expect(page.getByText('Texas Twirlers Guild')).toBeVisible();
    await page.getByTestId(testIds.groupCard(301)).click();
    await expect(page).toHaveURL(/\/groups\/301/);
    await expect(page.getByText('A fixture community group for recorded discovery tests.')).toBeVisible();
  });

  test('shows an empty groups search state and lets the user clear filters', async ({ page, request }) => {
    await setScenario(request, 'happy-path');

    await page.goto('/groups');
    await page.getByTestId(testIds.groupsSearchTab).click();
    await page.getByTestId(testIds.groupsSearchFilterButton).click();
    const groupsSearchInput = page.getByPlaceholder('Search by group name...');
    await enterText(groupsSearchInput, 'zzzzzzzz');
    await expect(groupsSearchInput).toHaveValue('zzzzzzzz');
    await pauseForReview(page, 'groups empty search typed');
    await page.getByTestId(testIds.groupsSearchApplyButton).click();
    await expect(page.getByText('No groups matched your search right now.')).toBeVisible();
    await pauseForReview(page, 'groups empty search result');
    await captureReviewScreenshot(page, '05-groups-empty-search-clear.png');

    await page.getByTestId(testIds.groupsClearFiltersButton).click();
    await expect(page.getByTestId(testIds.groupCard(301))).toBeVisible();
    await expect(page.getByText('Texas Twirlers Guild')).toBeVisible();
    await pauseForReview(page, 'groups empty search cleared');
  });

  test('shows a retryable groups error state and recovers without restarting the app', async ({ page, request }) => {
    await setScenario(request, 'groups-error');

    await page.goto('/groups');
    await page.getByTestId(testIds.groupsSearchTab).click();
    await expect(page.getByTestId(testIds.errorState)).toContainText('Unable to load groups right now. Please try again.');
    await pauseForReview(page, 'groups error state');
    await captureReviewScreenshot(page, '06-groups-error-retry.png');

    await setScenario(request, 'happy-path');
    await page.getByTestId(testIds.errorRetryButton).click();

    await expect(page.getByTestId(testIds.groupCard(301))).toBeVisible();
    await expect(page.getByText('Texas Twirlers Guild')).toBeVisible();
    await pauseForReview(page, 'groups retry recovery');
  });
});
