# Time Machine

macOS Time Machine-style UI for browsing document versions. Built with Next.js, TypeScript, and Framer Motion.

## Features

- 3D card stack with perspective depth
- Switch between release notes and browser mockups
- Timeline sidebar for navigation
- Keyboard shortcuts (↑/↓ arrows, Esc)
- Smooth GPU-accelerated animations

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
src/
├── app/
│   └── page.tsx                  # Main page
├── components/
│   ├── version-mode.tsx          # 3D overlay
│   ├── version-window.tsx        # Release notes card
│   ├── browser-window.tsx        # Browser mockup
│   ├── timeline-sidebar.tsx      # Version timeline
│   ├── version-controls.tsx      # Restore/Cancel buttons
│   └── view-type-selector.tsx    # View toggle
├── hooks/
│   └── useVersionMode.ts         # State & keyboard handling
└── lib/
    └── versions.mock.ts          # Mock data
```

## How It Works

Cards stack in 3D space with each layer:
- Moving down: `280px * depth`
- Moving back: `-800px * depth`
- Tilting: `-15deg` for back cards
- Fading slightly with depth

Perspective is set to `2200px` at `50% 35%` to create the vanishing point effect.

## Scripts

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm start           # Run production build
npm test            # Run tests
npm run test:watch  # Watch mode
```

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Vitest

## License

MIT
