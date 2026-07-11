# Twirlmate Mobile

Twirlmate Mobile is an Expo/React Native app for discovering baton twirling events, people, and groups across the United States.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Use Node 22:

   ```bash
   nvm use 22
   ```

3. Start the app:

   ```bash
   npm run start
   ```

## Quality gates

Run the standard local release gate before handing work off:

```bash
npm run release:check
```

That command runs:

- `npm run release:config`
- `npm run typecheck`
- `npm run lint`

## Release builds

Release builds are configured through [eas.json](./eas.json) and use the production profile for both app stores.

First-time EAS usage still requires an Expo account login plus any app-store credential setup in the Expo dashboard/CLI.

Build commands:

```bash
npm run release:build:ios
npm run release:build:android
npm run release:build:all
```

Submit commands after a successful store build:

```bash
npm run release:submit:ios
npm run release:submit:android
```

Current release assumptions:

- iOS production builds are store-distribution builds.
- Android production builds generate an Android App Bundle (`.aab`) for Play Store submission.
- Version metadata lives in [app.json](./app.json) via `expo.version`, `expo.ios.buildNumber`, and `expo.android.versionCode`.

## Project docs

- [CLAUDE.md](./CLAUDE.md): repo-level working agreement for AI sessions
- [docs/release-readiness.md](./docs/release-readiness.md): canonical launch and app-store tracker
- [docs/llm-workflows.md](./docs/llm-workflows.md): repeatable session workflows and handoff rules
