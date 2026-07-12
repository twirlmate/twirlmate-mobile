import test from 'node:test';
import assert from 'node:assert/strict';

import { getRequestErrorMessage, getRequestStatus } from '../utils/errorHandling.ts';

const notFoundError = {
  isAxiosError: true,
  response: {
    status: 404,
  },
};

const serverError = {
  isAxiosError: true,
  response: {
    status: 500,
  },
};

const networkError = {
  isAxiosError: true,
};

test('extracts an HTTP status from axios-style errors', () => {
  assert.equal(getRequestStatus(notFoundError), 404);
  assert.equal(getRequestStatus(serverError), 500);
  assert.equal(getRequestStatus(networkError), undefined);
  assert.equal(getRequestStatus(new Error('boom')), undefined);
});

test('returns the not-found message for detail views on 404', () => {
  assert.equal(
    getRequestErrorMessage(notFoundError, {
      notFoundMessage: 'This event could not be found.',
      defaultMessage: 'Unable to load this event right now. Please try again.',
    }),
    'This event could not be found.'
  );

  assert.equal(
    getRequestErrorMessage(notFoundError, {
      notFoundMessage: 'This person could not be found.',
      defaultMessage: 'Unable to load this person right now. Please try again.',
    }),
    'This person could not be found.'
  );
});

test('returns filtered empty-state messages for 404 collection responses', () => {
  assert.equal(
    getRequestErrorMessage(notFoundError, {
      notFoundMessage: 'No events matched the current filters.',
      defaultMessage: 'Unable to load events right now. Please try again.',
    }),
    'No events matched the current filters.'
  );

  assert.equal(
    getRequestErrorMessage(notFoundError, {
      notFoundMessage: 'No people matched the current filters.',
      defaultMessage: 'Unable to load people right now. Please try again.',
    }),
    'No people matched the current filters.'
  );
});

test('returns fallback retry messages for non-404 failures', () => {
  assert.equal(
    getRequestErrorMessage(serverError, {
      notFoundMessage: 'No events matched the selected month and filters.',
      defaultMessage: 'Unable to load events for this month right now. Please try again.',
    }),
    'Unable to load events for this month right now. Please try again.'
  );

  assert.equal(
    getRequestErrorMessage(networkError, {
      notFoundMessage: 'No featured coaches are available right now.',
      defaultMessage: 'Unable to load featured coaches right now. Please try again.',
    }),
    'Unable to load featured coaches right now. Please try again.'
  );
});
