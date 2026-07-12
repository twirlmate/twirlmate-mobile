# Twirlmate Mobile Physical Device QA Checklist

Use this checklist for release candidates that are intended for App Store and Play Store submission.

## Test Matrix

Record the exact build under test before starting:

- App version:
- iOS build number:
- Android version code:
- Backend environment:
- QA owner:
- Test date:

Recommended minimum device coverage:

| Platform | Required | Notes |
| --- | --- | --- |
| iPhone | Yes | Current iOS release on a physical device |
| Android phone | Yes | Current Android release on a physical device |
| iPad or Android tablet | If available | Useful because `expo.ios.supportsTablet` is enabled |

## Preconditions

- Install the release candidate build, not a dev client.
- Confirm the device has internet access.
- Sign out of any VPN or content filter that could block `twirlmate.com`.
- Prepare at least one real event, person, and group record that currently loads in production.
- Keep one event that has an external registration link if possible.
- Keep one group that has at least one external link if possible.

## Result Legend

- `Pass`: behavior matches expectations with no visual or functional issue.
- `Fail`: behavior is broken, misleading, or visually unacceptable for release.
- `N/A`: the data needed for this check does not exist in the current backend snapshot.

## 1. Install, Launch, and App Shell

- Launch from the home-screen icon and confirm the icon renders correctly.
- Confirm the splash screen appears without distortion or missing assets.
- Confirm the app opens into the main tab layout without a redbox, blank screen, or crash.
- Confirm the bottom tabs show `Home`, `Events`, `People`, and `Groups`.
- Confirm the app remains portrait-only and does not break layout when the device rotates.

## 2. Home and Primary Navigation

- From `Home`, open `Browse Events` and confirm it lands on the Events tab.
- Return to `Home`, open `Find Coaches`, and confirm it lands on the People tab.
- Return to `Home`, open `Join Groups`, and confirm it lands on the Groups tab.
- Move across every visible tab using the tab bar and confirm the active state updates correctly.
- Use in-app back navigation from at least one detail screen in each area and confirm it returns to the prior screen without duplicate headers or broken state.

## 3. Events Surface

- Open `Events` and confirm featured sections load instead of showing a permanent spinner.
- Verify `Recently Added`, `Closing Soon`, and `Happening Soon` cards render real content or a clear empty state.
- Open at least one event card from the Events surface and confirm the detail screen loads.
- On an event detail screen, verify the hero image, title, location, date, and registration status render cleanly.
- If present, tap `Register` and confirm the external destination opens successfully.
- If present, tap website and social links and confirm each opens successfully.
- If present, tap contact email and confirm the default mail app opens a draft.
- If present, tap contact phone and confirm the phone app opens the dial flow.
- Return to the Events tab and verify state browsing still opens a valid state route.

## 4. Event Search and Filters

- From the Events experience, open the hidden search flow and confirm the list loads for the current month.
- Enter a text query and confirm results update without layout breakage.
- Apply state, tier, type, and organization filters one at a time and confirm the selected value is reflected in results.
- Clear filters and confirm the broader results return.
- Change month navigation if available and confirm results refresh for the new month.
- Pull to refresh and confirm the list reloads without freezing.

## 5. People Surface

- Open `People` and confirm the discovery view loads instead of a permanent spinner.
- Verify preview sections for coaches, judges, or organizers render real content or a clear empty state.
- Open at least one person detail screen and confirm the photo, name, location, and bio area render correctly.
- If present, verify specialties render as readable tags.
- Tap `View on Twirlmate` or `View Full Profile` and confirm the external profile opens successfully.
- Return to the People tab and verify state browsing still opens a valid state route.

## 6. Groups Surface

- Open `Groups` and confirm the explore list loads instead of a permanent spinner.
- Open at least one group detail screen and confirm the hero image, title, location, and description render correctly.
- If present, tap `Visit Website`, `Open Facebook Group`, `View on Twirlmate`, and `Request to Join` and confirm each external destination opens successfully.
- Switch to the `States` tab inside Groups and confirm region rows scroll correctly.
- Open at least one state route and confirm it shows group results or a clear empty state.

## 7. Loading, Error, and Recovery States

- Force-close the app, reopen it on a normal network, and confirm the first screen finishes loading.
- Put the device in airplane mode, reopen one list screen, and confirm a user-facing error state appears instead of a silent failure.
- While offline, use any available retry action and confirm the error state remains understandable.
- Restore network connectivity, retry, and confirm the screen recovers without needing to reinstall the app.
- Repeat one failure-and-retry check on Events and one on People because both have explicit production error UX.

## 8. Deep Links

- Open `twirlmate://events` on device and confirm the app opens to the Events area.
- Open `twirlmate://people` on device and confirm the app opens to the People area.
- Open `twirlmate://groups` on device and confirm the app opens to the Groups area.
- Open one detail deep link using a real record, for example `twirlmate://events/<event-id>?detailUrl=<encoded-detail-path>`, and confirm the detail screen resolves correctly.
- After opening a deep link, use back navigation and confirm the app remains stable.

## 9. Dark Mode and Visual Polish

- Test once in light mode and once in dark mode because the app uses `userInterfaceStyle: automatic`.
- Confirm text remains readable on `Home`, `Events`, `People`, and `Groups`.
- Confirm cards, pills, state images, and buttons maintain adequate contrast in both themes.
- Confirm no text is clipped at larger system text sizes if the device accessibility size is increased moderately.
- Confirm there are no obvious overlaps with the iOS tab bar blur or Android edge-to-edge system UI.

## 10. Regression Notes

- Record every failed step with platform, OS version, route, and reproduction steps.
- Capture screenshots for visual issues and screen recordings for navigation or link failures.
- If a check is marked `N/A`, note which backend record was missing so the gap can be retested later.

## Sign-Off

- iOS QA result:
- Android QA result:
- Blocking issues:
- Ready for store submission:
