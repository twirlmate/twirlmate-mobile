# Twirlmate 1.0.0 Screenshot Capture Checklist

Use this checklist when capturing store screenshots for the 1.0.0 launch build.

This is the practical capture companion to:

- [release-assets/1.0.0/notes.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/release-assets/1.0.0/notes.md)
- [docs/store-metadata.md](/Users/njhmagyar/Documents/twirlmate/twirlmate-mobile/docs/store-metadata.md)

## Before You Capture

- Confirm you are using the exact release candidate build intended for submission.
- Confirm app metadata and screenshots tell the same story:
  - events first
  - then coaches
  - then groups
- Choose records with strong images and clean, complete data.
- Avoid screenshots with loading states, empty states, broken images, or sparse placeholder content.
- Clean the status bar as much as possible.
- Capture iPhone screenshots on the iPhone 13 build.
- Capture Android screenshots on the Android release candidate or emulator build.

## Capture Standards

- Prefer portrait screenshots unless a screen clearly works better otherwise.
- Keep screenshots focused on in-app discovery, not external browser views.
- Do not include fingers, device frames, notification clutter, or debug UI.
- If a screen looks visually weak with the chosen record, replace the record before moving on.
- Keep filenames aligned across platforms using the same sequence number.

## Required Story Order

### 1. Events Discovery

- Filename:
  - `01-ios-events-discovery.png`
  - `01-android-events-discovery.png`
- Screen target:
  - Events main discovery screen
- What should be visible:
  - a strong events hero/card area
  - featured sections like recently added / closing soon / happening soon if populated
  - enough visual variety to feel active and current
- Pick records that:
  - include strong event imagery
  - represent contest-focused baton twirling well
- Capture notes:
  - choose the most visually compelling scrolled position, not necessarily the topmost blank header state

### 2. Event Detail

- Filename:
  - `02-ios-event-detail.png`
  - `02-android-event-detail.png`
- Screen target:
  - Event detail page
- What should be visible:
  - event image
  - clear event name
  - location
  - date context
  - enough detail to signal legitimacy and depth
- Pick a record that:
  - has a strong image
  - looks polished without exposing weak or overly verbose sections
  - represents the type of contest/event you most want users to associate with Twirlmate
- Capture notes:
  - prefer a crop/scroll position that shows identity and context before long-form body copy

### 3. Coaches Discovery

- Filename:
  - `03-ios-coaches-discovery.png`
  - `03-android-coaches-discovery.png`
- Screen target:
  - People/coaches discovery or search screen
- What should be visible:
  - coach/community-member cards
  - filters, specialties, state, or role cues if they strengthen the screenshot
  - enough structure to show discovery, not just a single profile
- Pick records that:
  - show recognizable specialization or geography
  - make the marketplace/community aspect feel active
- Capture notes:
  - this shot should clearly communicate that Twirlmate helps users discover coaches and community members

### 4. Coach Detail

- Filename:
  - `04-ios-coach-detail.png`
  - `04-android-coach-detail.png`
- Screen target:
  - Coach/community-member detail page
- What should be visible:
  - profile image
  - name
  - location
  - specialties or profile depth if available
- Pick a record that:
  - has a strong profile image
  - has meaningful specialties or bio content
  - feels credible and aspirational
- Capture notes:
  - avoid a record with thin or awkward profile copy if a stronger one exists

### 5. Groups Discovery

- Filename:
  - `05-ios-groups-discovery.png`
  - `05-android-groups-discovery.png`
- Screen target:
  - Groups discovery screen or groups-by-state browsing screen
- What should be visible:
  - multiple group options or state-based browsing context
  - enough visual structure to suggest local discovery and community reach
- Pick records or a route that:
  - make the community/group use case obvious
  - show geographic discovery clearly
- Capture notes:
  - if the plain group list feels weak, prefer the stronger state-browsing view

### 6. Group Detail

- Filename:
  - `06-ios-group-detail.png`
  - `06-android-group-detail.png`
- Screen target:
  - Group detail page
- What should be visible:
  - group image
  - group name
  - location
  - a clean sense of community identity
- Pick a record that:
  - has a strong image and clean description
  - feels like a real organization users may want to explore
- Capture notes:
  - prioritize a visually rich and credible group over one with more links but weaker presentation

## Optional Screens

### 7. Home

- Filename:
  - `07-ios-home.png`
  - `07-android-home.png`
- Use if:
  - the quick actions screen looks polished and reinforces the events/coaches/groups story

### 8. Event Search

- Filename:
  - `08-ios-event-search.png`
  - `08-android-event-search.png`
- Use if:
  - the filters/search state looks strong and clearly signals useful discovery power

### 9. State Browsing

- Filename:
  - `09-ios-state-browsing.png`
  - `09-android-state-browsing.png`
- Use if:
  - this better communicates US-wide discovery than a weaker list screen

### 10. Dark Mode

- Filename:
  - `10-ios-dark-mode.png`
  - `10-android-dark-mode.png`
- Use if:
  - dark mode looks polished enough to strengthen the listing instead of diluting it

## Record Selection Log

Fill this in before or during capture so you can recreate the final set later.

### Events Discovery

- Chosen route/state:
- Why this screen won:

### Event Detail

- Chosen event:
- Why this event won:

### Coaches Discovery

- Chosen route/state/filter:
- Why this screen won:

### Coach Detail

- Chosen coach/community member:
- Why this profile won:

### Groups Discovery

- Chosen route/state:
- Why this screen won:

### Group Detail

- Chosen group:
- Why this group won:

## Final QA Before Upload

- Every required screenshot exists for iOS.
- Every required screenshot exists for Android.
- Filenames match the upload order.
- The first three screenshots communicate the app clearly without extra explanation.
- The iOS and Android sets tell the same story.
- The screenshots match current app behavior and store metadata claims.
