import test from 'node:test';
import assert from 'node:assert/strict';

import {
  formatEventCardDate,
  formatEventDeadline,
  formatEventListDate,
  formatMonthYear,
  getEventCardRegistrationStatus,
  getEventListRegistrationStatus,
} from '../utils/eventFormatting.ts';

const upcomingEvent = {
  registration_upcoming: true,
  registration_open: '2026-08-15T10:00:00Z',
  registration_available: false,
  registration_close: '2026-08-20T10:00:00Z',
  registration_closed: false,
};

const openEvent = {
  registration_upcoming: false,
  registration_open: '2026-08-15T10:00:00Z',
  registration_available: true,
  registration_close: '2026-08-20T10:00:00Z',
  registration_closed: false,
};

const closedEvent = {
  registration_upcoming: false,
  registration_open: '2026-08-15T10:00:00Z',
  registration_available: false,
  registration_close: '2026-08-20T10:00:00Z',
  registration_closed: true,
};

test('formats event dates for cards and lists', () => {
  assert.equal(formatEventCardDate('2026-07-11T15:00:00Z'), 'Sat, Jul 11');
  assert.equal(formatEventListDate('2026-07-11T15:00:00Z'), 'Sat, Jul 11, 2026');
  assert.equal(formatMonthYear(new Date('2026-07-11T15:00:00Z')), 'July 2026');
});

test('formats deadlines with and without the year', () => {
  assert.equal(formatEventDeadline('2026-08-20T10:00:00Z'), 'Aug 20, 2026');
  assert.equal(formatEventDeadline('2026-08-20T10:00:00Z', false), 'Aug 20');
});

test('formats registration labels for cards', () => {
  assert.equal(getEventCardRegistrationStatus(upcomingEvent), 'Save the date');
  assert.equal(getEventCardRegistrationStatus(openEvent), 'Register by Aug 20');
  assert.equal(getEventCardRegistrationStatus(closedEvent), 'Registration closed');
});

test('formats registration labels for lists', () => {
  assert.equal(getEventListRegistrationStatus(upcomingEvent), 'Registration opens Aug 15, 2026');
  assert.equal(getEventListRegistrationStatus(openEvent), 'Register by Aug 20, 2026');
  assert.equal(getEventListRegistrationStatus(closedEvent), 'Registration closed Aug 20, 2026');
});
