# Twirlmate Mobile App

A React Native/Expo app for discovering and exploring baton twirling events across the United States.

## LLM Session Instructions

This file is the repo-level entrypoint for AI coding assistants working in this project.

### Source of Truth

- Use [docs/release-readiness.md](docs/release-readiness.md) as the canonical tracker for launch and app store readiness work.
- Use [docs/llm-workflows.md](docs/llm-workflows.md) for durable workflow instructions, handoff patterns, and optimization rules.
- Keep concrete task state in `docs/release-readiness.md`.
- Keep evergreen process improvements in `docs/llm-workflows.md`.

### Working Agreement

- Before making substantial changes, read this file and the relevant `docs/*.md` tracker for the task area.
- When taking on a tracked task, update the tracker with status, owner/session, and verification notes.
- Prefer durable repo documentation over one-off chat explanations when a workflow is likely to repeat.
- Proactively identify repeated manual work and convert it into one of:
  - a script
  - an npm command
  - a checklist
  - a reusable doc section
- If you discover a release blocker, add it to `docs/release-readiness.md` before or while fixing it.
- If you discover a reusable workflow improvement, record it in `docs/llm-workflows.md` before finishing.

### Current Priorities

- Get the app to a reliable release baseline: green typecheck, green lint, valid release config, and a complete v1 tab surface.
- Favor changes that improve future velocity, not just the immediate fix.
- Reduce repeated hard-coded logic when touching network, config, or release workflows.

## Project Overview

Twirlmate Mobile is a comprehensive event discovery platform that allows users to browse, search, and filter baton twirling events by various criteria including location, date, tier, type, and organization.

## Key Features

### 📱 Tab-Based Navigation
- **Explore Tab**: Netflix-style discovery interface with horizontal scrolling sections
  - Registration Closing Soon
  - Happening Soon  
  - Recently Added
- **Calendar Tab**: Month-based event browsing with search and filtering
- **States Tab**: Geographic region-based state selection with visual state images

### 🔍 Advanced Filtering & Search
- Text search by event name
- Filter by state, tier, type, and organization
- Month/year navigation for calendar view
- Animated picker overlays with smooth transitions

### 🎨 Adaptive Design System
- Full light/dark mode support using Apple's design colors
- Dynamic color theming throughout the app
- Consistent visual hierarchy and spacing

## Technical Architecture

### Core Technologies
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe JavaScript development
- **React Navigation**: Tab-based navigation structure

### API Integration
- **Base URL**: `https://twirlmate.com/api/v1/mobile/`
- **Key Endpoints**:
  - `/events/` - Main events API with month/year/search filtering
  - `/events/recently-added/` - Recently added events (with truncate param)
  - `/events/closing-soon/` - Registration closing soon (with truncate param)  
  - `/events/happening-soon/` - Upcoming events (with truncate param)
  - `/events/by-state/` - Events filtered by state
- **State Images**: `https://www.twirlmate.com/static/pages/images/states/{STATE}-transparent.png`

### Data Models

#### EventDateListItem
```typescript
interface EventDateListItem {
  id: number;
  mobile_detail_url: string;
  start: string; // Event date
  registration_open: string;
  registration_close: string;
  registration_upcoming: boolean;
  registration_available: boolean;
  registration_closed: boolean;
  event: {
    name: string;
    location: string;
    image: string;
  };
}
```

## File Structure

### Main Components
- **`app/(tabs)/events.tsx`**: Primary events interface with tab management
- **`components/EventCard.tsx`**: Horizontal scrolling event cards for discovery sections
- **`components/EventsList.tsx`**: Reusable vertical event list for category pages

### Route Structure
```
app/
├── (tabs)/
│   ├── events.tsx          # Main events tab with Explore/Calendar/States
│   └── events-search.tsx   # Full search interface (accessible via search button)
├── events/
│   ├── closing-soon.tsx    # "Registration Closing Soon" category page
│   ├── happening-soon.tsx  # "Happening Soon" category page  
│   ├── recently-added.tsx  # "Recently Added" category page
│   ├── by-state.tsx       # All states list page
│   └── state/
│       └── [state].tsx    # State-specific events page
```

### Design System
- **`constants/Colors.ts`**: Adaptive color scheme with light/dark mode support
- **`constants/Fonts.ts`**: Typography system

## Key Features Deep Dive

### Netflix-Style Discovery (Explore Tab)
- Horizontal scrolling sections with "See All" navigation
- EventCard components (280px width) with event images, titles, locations, dates
- Pull-to-refresh functionality
- Truncated API calls (truncate=1) for homepage performance

### Calendar-Based Browsing (Calendar Tab)  
- Month navigation with previous/next controls
- Integrated search and filter modal
- Floating filter button (bottom-right corner)
- Full event search with name, state, tier, type, organization filters
- Dynamic month-based API calls with filter parameters

### Geographic State Selection (States Tab)
- Regional grouping: Northeast, Southeast, Midwest, Central, Southwest, West
- Horizontal scrolling state cards with official state images
- Visual state representations with names and abbreviations
- 160x160px cards with 100x100px state images

### Advanced Filter System
- Modal-based filter interface with animated picker overlays
- Multiple filter categories with dropdown selectors
- Search input integrated into filter modal
- "Clear All Filters" functionality
- Smooth animations using React Native Animated API

## Color System

### Light Mode
- **Text**: `#001830` (dark blue-black)
- **Background**: `#fff` (white)
- **Secondary Background**: `#f0f2f6` (light gray)
- **Input Borders**: `#D1D1D6` (Apple's light border)
- **Tint**: `#0a7ea4` (blue)
- **Icons**: `#687076` (gray)

### Dark Mode  
- **Text**: `#ECEDEE` (light gray)
- **Background**: `#000` (true black)
- **Secondary Background**: `#1C1C1E` (Apple's dark secondary)
- **Input Borders**: `#3A3A3C` (Apple's dark border)
- **Tint**: `#fff` (white)
- **Icons**: `#9BA1A6` (light gray)

## State Management

### Filter State
- `searchQuery`: Text search input
- `filters`: Applied filter values (name, state, tier, type, organization)  
- `tempFilters`: Temporary filter values during modal editing
- `currentDate`: Selected month/year for calendar view

### UI State
- `activeTab`: Current tab selection (explore/calendar/states)
- `loading` & `monthlyLoading`: Loading states for different data fetches
- `showFilter`: Filter modal visibility
- Animation states for picker overlays with fade/slide transitions

## Development Notes

### Running the App
- Uses Expo development server
- Hot reload enabled for rapid development
- TypeScript compilation with strict type checking

### Testing & Quality
- Consistent error handling with try/catch blocks
- Loading states and empty state handling
- Pull-to-refresh functionality across list interfaces
- Proper accessibility considerations with color contrast

### Performance Optimizations
- Truncated API calls for discovery sections
- Horizontal FlatList optimization with proper keyExtractor
- Conditional rendering to minimize re-renders
- Efficient image loading with proper resizeMode settings

## Future Considerations

### Potential Enhancements
- Event bookmarking/favorites system
- Push notifications for registration deadlines
- Calendar integration for event reminders
- Social sharing capabilities
- Offline event caching for improved performance

### API Extensions
- User authentication integration
- Event registration flow
- Personal event history
- Location-based event recommendations
