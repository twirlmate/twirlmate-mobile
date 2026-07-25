import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_LOCAL_TWIRLMATE_ORIGIN,
  TWIRLMATE_PRODUCTION_API_ORIGIN,
  TWIRLMATE_PRODUCTION_WEB_ORIGIN,
  TWIRLMATE_STAGING_ORIGIN,
  getTwirlmateRuntimeEnvironment,
  resolveTwirlmateOrigins,
} from '../utils/twirlmateEnvironment.ts';

test('defaults to the local runtime environment', () => {
  assert.equal(getTwirlmateRuntimeEnvironment(undefined), 'local');
});

test('resolves preview origins to the staging deployment', () => {
  assert.deepEqual(
    resolveTwirlmateOrigins({
      runtimeEnvironment: 'preview',
      webOrigin: TWIRLMATE_STAGING_ORIGIN,
      apiOrigin: TWIRLMATE_STAGING_ORIGIN,
    }),
    {
      runtimeEnvironment: 'preview',
      webOrigin: TWIRLMATE_STAGING_ORIGIN,
      apiOrigin: TWIRLMATE_STAGING_ORIGIN,
    }
  );
});

test('resolves production origins to the production deployment', () => {
  assert.deepEqual(
    resolveTwirlmateOrigins({
      runtimeEnvironment: 'production',
      webOrigin: TWIRLMATE_PRODUCTION_WEB_ORIGIN,
      apiOrigin: TWIRLMATE_PRODUCTION_API_ORIGIN,
    }),
    {
      runtimeEnvironment: 'production',
      webOrigin: TWIRLMATE_PRODUCTION_WEB_ORIGIN,
      apiOrigin: TWIRLMATE_PRODUCTION_API_ORIGIN,
    }
  );
});

test('uses the local fallback origin when local values are omitted', () => {
  assert.deepEqual(
    resolveTwirlmateOrigins({
      runtimeEnvironment: 'local',
    }),
    {
      runtimeEnvironment: 'local',
      webOrigin: DEFAULT_LOCAL_TWIRLMATE_ORIGIN,
      apiOrigin: DEFAULT_LOCAL_TWIRLMATE_ORIGIN,
    }
  );
});

test('rejects production targeting from local development', () => {
  assert.throws(
    () =>
      resolveTwirlmateOrigins({
        runtimeEnvironment: 'local',
        apiOrigin: TWIRLMATE_PRODUCTION_API_ORIGIN,
        webOrigin: DEFAULT_LOCAL_TWIRLMATE_ORIGIN,
      }),
    /must not target the staging or production deployments/
  );
});

test('rejects non-staging preview origins', () => {
  assert.throws(
    () =>
      resolveTwirlmateOrigins({
        runtimeEnvironment: 'preview',
        apiOrigin: 'http://127.0.0.1:8000',
        webOrigin: TWIRLMATE_STAGING_ORIGIN,
      }),
    /must target https:\/\/twirlmate-staging\.herokuapp\.com/
  );
});

test('rejects invalid runtime environment names', () => {
  assert.throws(() => getTwirlmateRuntimeEnvironment('qa'), /Unsupported Twirlmate runtime environment/);
});
