import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildGroupsApiEndpoint,
  normalizeGroupDiscoveryFilters,
} from '../features/groups/groupFilters.ts';

test('normalizes group discovery filters before building the endpoint', () => {
  assert.deepEqual(
    normalizeGroupDiscoveryFilters({
      name: '  twirl legacy  ',
      state: ' pa ',
    }),
    {
      name: 'twirl legacy',
      state: 'PA',
    }
  );
});

test('builds the default groups endpoint when no filters are applied', () => {
  const url = new URL(buildGroupsApiEndpoint());

  assert.equal(url.pathname, '/api/v1/mobile/groups/');
  assert.equal(url.search, '');
});

test('builds the groups endpoint with trimmed search and state filters', () => {
  const url = new URL(
    buildGroupsApiEndpoint({
      name: '  twirl legacy  ',
      state: ' pa ',
    })
  );

  assert.equal(url.pathname, '/api/v1/mobile/groups/');
  assert.equal(url.searchParams.get('name'), 'twirl legacy');
  assert.equal(url.searchParams.get('state'), 'PA');
});
