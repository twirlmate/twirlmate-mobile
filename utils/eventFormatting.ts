import type { EventDateListItem } from '../types/api';

type EventRegistrationState = Pick<
  EventDateListItem,
  | 'registration_upcoming'
  | 'registration_open'
  | 'registration_available'
  | 'registration_close'
  | 'registration_closed'
>;

function formatDateString(dateString: string, options: Intl.DateTimeFormatOptions) {
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatEventCardDate(dateString: string) {
  return formatDateString(dateString, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatEventListDate(dateString: string) {
  return formatDateString(dateString, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatEventDeadline(dateString: string, includeYear = true) {
  return formatDateString(dateString, {
    ...(includeYear ? { year: 'numeric' as const } : {}),
    month: 'short',
    day: 'numeric',
  });
}

export function formatMonthYear(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function getEventCardRegistrationStatus(event: EventRegistrationState) {
  if (event.registration_upcoming) {
    return 'Save the date';
  }

  if (event.registration_available) {
    return `Register by ${formatEventDeadline(event.registration_close, false)}`;
  }

  if (event.registration_closed) {
    return 'Registration closed';
  }

  return 'Registration Dates Unknown';
}

export function getEventListRegistrationStatus(event: EventRegistrationState) {
  if (event.registration_upcoming) {
    return `Registration opens ${formatEventDeadline(event.registration_open)}`;
  }

  if (event.registration_available) {
    return `Register by ${formatEventDeadline(event.registration_close)}`;
  }

  if (event.registration_closed) {
    return `Registration closed ${formatEventDeadline(event.registration_close)}`;
  }

  return 'Registration Dates Unknown';
}
