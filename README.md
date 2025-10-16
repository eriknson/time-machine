# Time Machine - Version Browser

A macOS Time Machine-inspired interface for browsing past versions of documents, built with Next.js, TypeScript, and Framer Motion.

## Features

- **Immersive 3D card stack** - Full-screen experience with perspective depth
- **Dual view modes** - Switch between release notes (scope) and browser mockups
- **Timeline sidebar** - Quick navigation through version history
- **Smooth animations** - GPU-accelerated transforms with Framer Motion
- **Keyboard navigation** - Arrow keys (↑/↓) to travel through time, Esc to close
- **Mouse interaction** - Click cards or timeline to jump to any version
- **Cosmic background** - Space-themed gradient with animated starfield
- **Content evolution** - Watch features get added as you travel through versions
- **Fully accessible** - ARIA labels, focus management, keyboard support

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── page.tsx                  # Landing page with version demo
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── version-mode.tsx          # Main 3D overlay component
│   ├── version-window.tsx        # Release notes card
│   ├── browser-window.tsx        # Browser mockup card
│   ├── timeline-sidebar.tsx      # Version timeline navigation
│   ├── version-controls.tsx      # Restore/Cancel buttons
│   └── view-type-selector.tsx    # Scope/Browser toggle
├── hooks/
│   └── useVersionMode.ts         # State management and keyboard handling
└── lib/
    └── versions.mock.ts          # Mock version data
```

## How It Works

### Visual Model

The interface creates a dramatic 3D tunnel effect:

- **Full viewport cards** (85vw × 70vh) with clean content
- **Vertical + backward stacking** creating depth perspective
- **15 windows rendered** for smooth infinite scrolling
- **Timeline on the right** with clickable timestamps
- **Cosmic starfield background** for depth atmosphere

### 3D Transforms

For each card at depth `i` (0 = front):

- **translateY**: `280 * i` px (cards recede downward)
- **translateZ**: `-800 * i` px (moves back in space)
- **rotateX**: `-15deg` for back cards (front card flat)
- **scale**: `1 - 0.03 * i` (subtle shrinking)
- **opacity**: Fades progressively with depth

### Perspective Setup

```css
perspective: 2200px
perspective-origin: 50% 35%
```

Creates a dramatic vanishing point, making cards recede downward into the distance.

### View Modes

**Scope View (Release Notes)**
- Clean document-style layout
- Version title and description
- Feature list with checkmarks
- Timestamp information

**Browser View (Mockups)**
- Simulated web application interface
- Shows UI evolution over time
- Interactive music app example (MusicFlow)
- Progressive feature additions

### Navigation

- **Arrow Keys**: ↑ (older) / ↓ (newer)
- **Timeline**: Click any version to jump instantly
- **Card Click**: Click any card to bring it forward
- **Escape**: Close the overlay
- **View Toggle**: Switch between scope and browser views

### Accessibility

- Focus trap within overlay
- Esc key closes overlay
- Return focus to trigger when closed
- ARIA labels on all interactive elements
- Restore button disabled during animations
- Full keyboard navigation support

## Mock Data

The app demonstrates version history for **MusicFlow**, a music streaming platform:

- **12 versions** spanning from alpha (v0.5.0) to full release (v2.4.0)
- **Progressive feature evolution** showing realistic product growth
- **Browser state changes** demonstrating UI evolution
- Each version includes title, description, features, and browser mockup state

## Testing

Unit tests cover the selection logic:
- Increment/decrement behavior
- Boundary clamping (0 to 11)
- Navigation sequences
- Edge cases

Run with `npm test` to verify all tests pass.

## Performance Optimizations

- GPU-accelerated transforms with `will-change: transform`
- Optimized animation springs with Framer Motion
- `backface-visibility: hidden` for smoother rendering
- Proper z-index management for stacking
- Client-side only rendering for random elements (hydration safe)

## Browser Support

Best experienced in modern browsers with CSS 3D transform support:
- Chrome/Edge (recommended)
- Safari
- Firefox

## Future Enhancements

- Real version control integration
- Diff view between versions
- Search and filter capabilities
- Version tagging and annotations
- Export/restore functionality
- Multiple document support

## License

MIT
