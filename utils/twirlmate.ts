const DEFAULT_TWIRLMATE_WEB_ORIGIN = 'https://www.twirlmate.com';
const DEFAULT_TWIRLMATE_API_ORIGIN = 'https://twirlmate.com';
const DEFAULT_TWIRLMATE_MOBILE_API_BASE_PATH = '/api/v1/mobile';

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

function normalizeOrigin(origin: string) {
  return origin.replace(/\/+$/, '');
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function buildAbsoluteUrl(origin: string, pathOrUrl: string) {
  if (isAbsoluteUrl(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${origin}${normalizePath(pathOrUrl)}`;
}

function toQueryString(params?: QueryParams | URLSearchParams) {
  if (!params) {
    return '';
  }

  if (params instanceof URLSearchParams) {
    return params.toString();
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    const normalizedValue = String(value).trim();
    if (normalizedValue.length === 0) {
      continue;
    }

    searchParams.set(key, normalizedValue);
  }

  return searchParams.toString();
}

export const TWIRLMATE_WEB_ORIGIN = normalizeOrigin(
  process.env.EXPO_PUBLIC_TWIRLMATE_WEB_ORIGIN ?? DEFAULT_TWIRLMATE_WEB_ORIGIN
);

export const TWIRLMATE_API_ORIGIN = normalizeOrigin(
  process.env.EXPO_PUBLIC_TWIRLMATE_API_ORIGIN ?? DEFAULT_TWIRLMATE_API_ORIGIN
);

export const TWIRLMATE_MOBILE_API_BASE_PATH = normalizePath(
  process.env.EXPO_PUBLIC_TWIRLMATE_MOBILE_API_BASE_PATH ?? DEFAULT_TWIRLMATE_MOBILE_API_BASE_PATH
);

export function buildTwirlmateWebUrl(pathOrUrl: string) {
  return buildAbsoluteUrl(TWIRLMATE_WEB_ORIGIN, pathOrUrl);
}

export function buildTwirlmateApiUrl(pathOrUrl: string) {
  return buildAbsoluteUrl(TWIRLMATE_API_ORIGIN, pathOrUrl);
}

export function buildTwirlmateMobileApiUrl(path: string, params?: QueryParams | URLSearchParams) {
  const normalizedPath = normalizePath(path);
  const relativePath = normalizedPath.startsWith(TWIRLMATE_MOBILE_API_BASE_PATH)
    ? normalizedPath.slice(TWIRLMATE_MOBILE_API_BASE_PATH.length) || '/'
    : normalizedPath;
  const baseUrl = `${TWIRLMATE_API_ORIGIN}${TWIRLMATE_MOBILE_API_BASE_PATH}${relativePath}`;
  const queryString = toQueryString(params);

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export function getTwirlmateStateImageUrl(stateCode: string) {
  return buildTwirlmateWebUrl(`/static/pages/images/states/${stateCode}-transparent.png`);
}

export function getTwirlmateImageUrl(imageUrl: string) {
  if (!imageUrl || isAbsoluteUrl(imageUrl)) {
    return imageUrl;
  }

  return buildTwirlmateWebUrl(imageUrl);
}
