export const TWIRLMATE_STAGING_ORIGIN = 'https://twirlmate-staging.herokuapp.com';
export const TWIRLMATE_PRODUCTION_WEB_ORIGIN = 'https://www.twirlmate.com';
export const TWIRLMATE_PRODUCTION_API_ORIGIN = 'https://twirlmate.com';
export const DEFAULT_LOCAL_TWIRLMATE_ORIGIN = 'http://127.0.0.1:8000';

export type TwirlmateRuntimeEnvironment = 'local' | 'preview' | 'production';

const supportedRuntimeEnvironments = new Set<TwirlmateRuntimeEnvironment>([
  'local',
  'preview',
  'production',
]);

export function normalizeOrigin(origin: string) {
  const trimmedOrigin = origin.trim();

  if (trimmedOrigin.length === 0) {
    throw new Error('Twirlmate origins must be non-empty HTTP(S) origins.');
  }

  let parsedOrigin: URL;

  try {
    parsedOrigin = new URL(trimmedOrigin);
  } catch {
    throw new Error(`Twirlmate origin "${origin}" must be a valid HTTP(S) origin.`);
  }

  if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
    throw new Error(`Twirlmate origin "${origin}" must use http or https.`);
  }

  if (parsedOrigin.username || parsedOrigin.password) {
    throw new Error(`Twirlmate origin "${origin}" must not include credentials.`);
  }

  if (parsedOrigin.pathname !== '/' || parsedOrigin.search || parsedOrigin.hash) {
    throw new Error(
      `Twirlmate origin "${origin}" must include only a scheme, host, and optional port.`
    );
  }

  return parsedOrigin.origin;
}

export function getTwirlmateRuntimeEnvironment(
  runtimeEnvironment = process.env.EXPO_PUBLIC_TWIRLMATE_RUNTIME_ENV
): TwirlmateRuntimeEnvironment {
  const normalizedRuntimeEnvironment = (runtimeEnvironment ?? 'local').trim().toLowerCase();

  if (supportedRuntimeEnvironments.has(normalizedRuntimeEnvironment as TwirlmateRuntimeEnvironment)) {
    return normalizedRuntimeEnvironment as TwirlmateRuntimeEnvironment;
  }

  throw new Error(
    `Unsupported Twirlmate runtime environment "${runtimeEnvironment}". ` +
      'Expected one of: local, preview, production.'
  );
}

function ensureOriginMatchesPolicy(
  runtimeEnvironment: TwirlmateRuntimeEnvironment,
  originKind: 'web' | 'api',
  origin: string
) {
  const normalizedOrigin = normalizeOrigin(origin);

  if (runtimeEnvironment === 'preview' && normalizedOrigin !== TWIRLMATE_STAGING_ORIGIN) {
    throw new Error(
      `Twirlmate ${originKind} origin for preview builds must target ${TWIRLMATE_STAGING_ORIGIN}. ` +
        `Received ${normalizedOrigin}.`
    );
  }

  if (runtimeEnvironment === 'production') {
    const expectedOrigin =
      originKind === 'web' ? TWIRLMATE_PRODUCTION_WEB_ORIGIN : TWIRLMATE_PRODUCTION_API_ORIGIN;

    if (normalizedOrigin !== expectedOrigin) {
      throw new Error(
        `Twirlmate ${originKind} origin for production builds must target ${expectedOrigin}. ` +
          `Received ${normalizedOrigin}.`
      );
    }
  }

  if (
    runtimeEnvironment === 'local' &&
    [
      TWIRLMATE_STAGING_ORIGIN,
      TWIRLMATE_PRODUCTION_WEB_ORIGIN,
      TWIRLMATE_PRODUCTION_API_ORIGIN,
    ].includes(normalizedOrigin)
  ) {
    throw new Error(
      `Twirlmate ${originKind} origin for local development must not target the staging or production deployments. ` +
        `Received ${normalizedOrigin}.`
    );
  }
}

function getDefaultOrigin(runtimeEnvironment: TwirlmateRuntimeEnvironment, originKind: 'web' | 'api') {
  if (runtimeEnvironment === 'preview') {
    return TWIRLMATE_STAGING_ORIGIN;
  }

  if (runtimeEnvironment === 'production') {
    return originKind === 'web' ? TWIRLMATE_PRODUCTION_WEB_ORIGIN : TWIRLMATE_PRODUCTION_API_ORIGIN;
  }

  return DEFAULT_LOCAL_TWIRLMATE_ORIGIN;
}

type ResolveTwirlmateOriginsOptions = {
  runtimeEnvironment?: string;
  webOrigin?: string;
  apiOrigin?: string;
};

export function resolveTwirlmateOrigins({
  runtimeEnvironment,
  webOrigin,
  apiOrigin,
}: ResolveTwirlmateOriginsOptions) {
  const resolvedRuntimeEnvironment = getTwirlmateRuntimeEnvironment(runtimeEnvironment);
  const resolvedWebOrigin = normalizeOrigin(webOrigin ?? getDefaultOrigin(resolvedRuntimeEnvironment, 'web'));
  const resolvedApiOrigin = normalizeOrigin(apiOrigin ?? getDefaultOrigin(resolvedRuntimeEnvironment, 'api'));

  ensureOriginMatchesPolicy(resolvedRuntimeEnvironment, 'web', resolvedWebOrigin);
  ensureOriginMatchesPolicy(resolvedRuntimeEnvironment, 'api', resolvedApiOrigin);

  return {
    runtimeEnvironment: resolvedRuntimeEnvironment,
    webOrigin: resolvedWebOrigin,
    apiOrigin: resolvedApiOrigin,
  };
}
