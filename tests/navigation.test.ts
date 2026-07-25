import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildEventDetailHref,
  buildGroupDetailHref,
  buildPersonDetailHref,
} from '../utils/navigation.ts';

process.env.EXPO_PUBLIC_TWIRLMATE_RUNTIME_ENV = 'production';
process.env.EXPO_PUBLIC_TWIRLMATE_WEB_ORIGIN = 'https://www.twirlmate.com';
process.env.EXPO_PUBLIC_TWIRLMATE_API_ORIGIN = 'https://twirlmate.com';

const {
  buildTwirlmateApiUrl,
  buildTwirlmateMobileApiUrl,
  buildTwirlmateWebUrl,
  getTwirlmateImageUrl,
  getTwirlmateStateImageUrl,
} = await import('../utils/twirlmate.ts');

test('builds event detail routes with encoded detail URLs', () => {
  assert.equal(
    buildEventDetailHref(42, '/api/v1/mobile/events/42/?foo=bar&x=1'),
    '/events/42?detailUrl=%2Fapi%2Fv1%2Fmobile%2Fevents%2F42%2F%3Ffoo%3Dbar%26x%3D1'
  );
});

test('builds people and group detail routes with encoded detail URLs', () => {
  assert.equal(
    buildPersonDetailHref(7, '/api/v1/mobile/accounts/7/'),
    '/people/7?detailUrl=%2Fapi%2Fv1%2Fmobile%2Faccounts%2F7%2F'
  );
  assert.equal(
    buildGroupDetailHref('abc', '/api/v1/mobile/groups/abc/'),
    '/groups/abc?detailUrl=%2Fapi%2Fv1%2Fmobile%2Fgroups%2Fabc%2F'
  );
});

test('resolves relative Twirlmate image paths', () => {
  assert.equal(
    getTwirlmateImageUrl('/static/pages/images/example.png'),
    'https://www.twirlmate.com/static/pages/images/example.png'
  );
  assert.equal(
    getTwirlmateImageUrl('https://cdn.example.com/example.png'),
    'https://cdn.example.com/example.png'
  );
});

test('builds centralized web and api URLs', () => {
  assert.equal(
    buildTwirlmateWebUrl('/groups/example'),
    'https://www.twirlmate.com/groups/example'
  );
  assert.equal(
    buildTwirlmateApiUrl('/api/v1/mobile/groups/42/'),
    'https://twirlmate.com/api/v1/mobile/groups/42/'
  );
  assert.equal(
    buildTwirlmateMobileApiUrl('/events/', { month: 7, year: 2026, search: '' }),
    'https://twirlmate.com/api/v1/mobile/events/?month=7&year=2026'
  );
  assert.equal(
    getTwirlmateStateImageUrl('TX'),
    'https://www.twirlmate.com/static/pages/images/states/TX-transparent.png'
  );
});
