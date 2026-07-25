# Environment Configuration

Twirlmate Mobile uses Expo's `EXPO_PUBLIC_*` environment variables for runtime API configuration.

## Targeting Policy

| Runtime | Intended use | Web origin | API origin |
| --- | --- | --- | --- |
| `local` | Expo development on a simulator, emulator, or device | your local Django host | your local Django host |
| `preview` | internal preview / staging builds | `https://twirlmate-staging.herokuapp.com` | `https://twirlmate-staging.herokuapp.com` |
| `production` | store builds only | `https://www.twirlmate.com` | `https://twirlmate.com` |

## Local Expo Development

1. Copy [`./.env.local.example`](../.env.local.example) to `.env.local`.
2. Set both local origins to the Django host you want the app to use.
3. Restart Expo after changing the file.

Recommended local-device setup:

- Start Django so phones on your LAN can reach it, for example `python manage.py runserver 0.0.0.0:8000`.
- Use your computer's LAN IP in `.env.local` for physical devices.
- `127.0.0.1` only works when the app and Django are running on the same machine, such as the iOS simulator.

## EAS Profiles

- `preview` targets staging and is for internal preview builds.
- `production` targets production and is for store builds only.

Helpful commands:

```bash
npm run preview:build:ios
npm run preview:build:android
npm run release:build:ios
npm run release:build:android
```

## Guardrails

The app validates the runtime environment before it builds URLs:

- `local` rejects staging and production origins
- `preview` requires the staging host
- `production` requires the production hosts

The release-config check also validates the committed EAS profile contract.

## Staging Verification

Before trusting preview builds as a review surface, verify in the staging deployment:

- `https://twirlmate-staging.herokuapp.com` returns `200 OK`
- at least one list endpoint and one detail endpoint under `/api/v1/mobile/` return the expected mobile payload shape
- the mobile endpoints needed for review have representative data, not only healthy empty responses
- `events`, `people`, and `groups` detail routes all resolve correctly from staging list payloads
- image URLs referenced by the mobile payload load on real devices
- staging HTTPS remains valid for iOS and Android release builds
- any staging-only host or redirect rules do not rewrite `/api/v1/mobile/*` traffic unexpectedly
