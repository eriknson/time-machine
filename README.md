# Time Machine - Version Browser

A macOS Time Machine-inspired interface for browsing past versions of documents, built with Next.js, TypeScript, and Framer Motion.

## Features

- **Full-screen document windows** showing app evolution over time with markdown-style content
- **Realistic macOS chrome** - title bar with traffic lights, toolbar, status bar
- **3D tunnel effect** - windows stack vertically backward creating an infinite perspective
- **Timeline sidebar** on the right showing all version timestamps
- **Smooth GPU-accelerated animations** with optimized transforms
- **Keyboard navigation** (←/→ arrows, Esc to close)
- **Mouse interaction** (click windows or timeline to navigate)
- **Cosmic background** with space-themed gradient and stars
- **Content evolution** - watch features get added/removed as you travel through time
- **Fully accessible** with ARIA labels and focus management

## Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth 3D animations
- **Vitest** - Unit testing

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/version-demo](http://localhost:3000/version-demo) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Run Tests

```bash
npm test           # Run tests once
npm run test:watch # Watch mode
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home page with link to demo
│   └── version-demo/
│       └── page.tsx              # Demo route entry point
├── components/
│   ├── version-window.tsx        # Full Finder-style window component
│   ├── timeline-sidebar.tsx      # Right sidebar with version timeline
│   ├── version-controls.tsx      # Restore/Cancel buttons
│   └── version-mode.tsx          # Main 3D overlay component
├── hooks/
│   └── useVersionMode.ts         # State management and keyboard handling
└── lib/
    └── versions.mock.ts          # Mock version data with folders
```

## How It Works

### Visual Model

The interface mimics macOS Time Machine with:

- **Full viewport Finder windows** (90vw × 75vh) with realistic window chrome
- **Vertical + backward stacking** creating a tunnel effect
- **10 windows rendered** for the illusion of infinite depth
- **Timeline on the right** with clickable timestamps
- **Cosmic background** with radial gradient and starfield

### 3D Transforms

For each window at depth `i` (0 = front):

- **translateY**: `-180 * i` px (moves up)
- **translateZ**: `-650 * i` px (moves back)
- **rotateX**: `12deg` (tilts back)
- **scale**: `1 - 0.1 * i` (shrinks)
- **opacity**: `0.75 - 0.08 * i` (fades)

### Perspective Setup

```css
perspective: 2200px
perspective-origin: 50% 70%
```

Creates a dramatic vanishing point at the bottom center, making windows recede upward into the distance.

### Animation

All transforms animated with GPU acceleration:
- **Duration**: `500ms`
- **Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` (smoother curve)
- **Optimizations**: `will-change: transform`, `transform-origin: center`, `backface-visibility: hidden`
- **Z-index management**: Proper stacking order (1000 - depth)

When navigating, the entire stack shifts smoothly together with no jumpiness.

### Window Content

Each window displays a markdown-style document showing:
- **App title and version number** (e.g., "CollabSpace v2.4.0")
- **Description** of what the app does at that point in time
- **Feature list** with checkmarks showing available functionality
- **Timestamp** of when this version existed

As you navigate backward through time, you'll see features disappear, showing the app's evolution from a simple alpha prototype to a full-featured collaboration platform.

### Navigation

- **Arrow Keys**: ← (previous) / → (next)
- **Timeline**: Click any timestamp to jump to that version
- **Window Click**: Click any non-active window to bring it forward
- **Escape**: Close the overlay
- **Restore Button**: Logs the selected version ID to console

### Accessibility

- Focus trap within overlay
- Esc key closes overlay
- Return focus to trigger button on close
- ARIA labels on all interactive elements
- Restore button disabled during animations
- Keyboard navigation through timeline

## Styling

Faithful to macOS Time Machine aesthetic:

- **Window chrome**: Gradient gray title bars, realistic shadows
- **Cosmic background**: Radial gradient from deep space blue to black
- **Starfield**: 100 randomly positioned stars for depth
- **Timeline**: Vertical list with tick marks and active indicator
- **Controls**: macOS-style buttons (Cancel and Restore)

## Mock Data

The app demonstrates version history for "CollabSpace", a collaboration platform:

- **12 versions** spanning from alpha (v0.5.0) to full release (v2.4.0)
- **Progressive feature addition** showing realistic product evolution
- **Version v2.4.0** (newest): 10 features including auth, RBAC, real-time dashboard, chat, video, notifications, analytics, file sharing, API, dark mode
- **Version v0.5.0** (oldest): Just landing page and basic routing
- Each version has title, version number, description, and feature list

## Testing

Unit tests cover the selection logic:
- Increment/decrement behavior
- Boundary clamping (0 to 11)
- Navigation sequences
- Edge cases

Run with `npm test` to verify all tests pass.

## Acceptance Criteria

- ✅ Full-screen Finder windows with title bars and traffic lights
- ✅ Vertical tunnel stacking (up + back in 3D space)
- ✅ Timeline sidebar functional on right side
- ✅ Only window top edges visible when stacked
- ✅ Space-themed cosmic background with stars
- ✅ Smooth 3D navigation with keyboard and mouse
- ✅ All TypeScript types defined
- ✅ Unit tests passing
- ✅ Clean, modular component structure

## Implementation Notes

This is a minimal v0 implementation featuring:
- Mock data only (no backend)
- No real version diffing
- Console.log for restore action
- Simplified folder grid (no interactive file system)

Perfect for demonstrating the Time Machine UX pattern before integrating with a real version control system.

## Browser Support

Best experienced in modern browsers with good CSS 3D transform support:
- Chrome/Edge (recommended)
- Safari
- Firefox

The 3D perspective effects may vary slightly across browsers.
