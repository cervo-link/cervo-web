# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun --bun run dev            # Start dev server on port 3000

# Build & Preview
bun --bun run build          # Production build
bun --bun run preview        # Preview production build

# Testing
bun --bun run test           # Run all tests (Vitest)

# Code quality (run in this order at the end of every phase)
bun --bun run check          # Biome check (lint + format)
bun --bun run lint           # Biome lint only
bun --bun run format         # Biome format only
```

## Architecture

Frontend for the Cervo bookmark management app. Built with **TanStack Start** (SSR React framework) using file-based routing.

```
src/
├── routes/
│   ├── __root.tsx           # Root document shell (fonts, TanStack devtools)
│   ├── _app.tsx             # Authenticated app layout (Header + Footer)
│   ├── _app/
│   │   ├── index.tsx        # Home page
│   │   ├── links.tsx        # Links/bookmarks page
│   │   └── components.tsx   # Component showcase
│   ├── _auth.tsx            # Auth layout wrapper
│   ├── _auth/
│   │   ├── sign-in.tsx      # OAuth sign-in (Google, GitHub)
│   │   └── workspace.tsx    # Workspace creation (post sign-in)
│   └── api/auth/$.ts        # Better Auth catch-all API handler
│
├── components/
│   ├── Header.tsx           # App header
│   ├── Footer.tsx           # App footer
│   ├── auth-layout.tsx      # Auth page layout
│   └── ui/                  # Shadcn UI components
│
├── lib/
│   ├── auth-client.ts       # Better Auth client instance
│   └── utils.ts             # cn() and other utilities
│
├── hooks/
│   └── use-mobile.ts        # Mobile breakpoint hook
│
├── integrations/
│   ├── better-auth/         # Auth header component
│   └── tanstack-query/      # TanStack Query provider & devtools
│
└── styles.css               # Global styles (Tailwind v4)
```

## Key Patterns

### Routing

File-based routing via TanStack Router. Route layouts use pathless routes prefixed with `_`:
- `_app` layout — main app shell with header/footer
- `_auth` layout — centered auth layout

`routeTree.gen.ts` is auto-generated — never edit it manually.

### Path alias

`#/*` maps to `src/*` (configured in `package.json` imports and `tsconfig.json`).

```typescript
import { Button } from "#/components/ui/button"
```

### Authentication

Better Auth with OAuth providers (Google, GitHub). Auth client is in `src/lib/auth-client.ts`.

```typescript
import { authClient } from "#/lib/auth-client"

authClient.signIn.social({ provider: "google", callbackURL: "/workspace" })
```

All `/api/auth/*` routes are handled by the Better Auth catch-all at `src/routes/api/auth/$.ts`.

### Data fetching

Use TanStack Query (`@tanstack/react-query`) for client-side data fetching and TanStack Router loaders for route-level SSR data.

## Styling

Tailwind CSS v4 with Shadcn UI components. The app is **dark mode only** — a script in `__root.tsx` forces the `dark` class on `<html>` at load time.

Biome enforces: double quotes, tab indentation. `routeTree.gen.ts` and `styles.css` are excluded from Biome.

### Design System Conventions

**No border radius.** All `--radius-*` CSS variables are set to `0px` in `styles.css`. Never add `rounded-*` classes to new components.

**Consistent interactive element height.** All interactive elements (inputs, buttons, dropdowns, sidebar tabs) use `h-11` (44px).

**Focus/hover border style.** All interactive elements use the same pattern:
- Default: `border-sidebar-border`
- Hover: `hover:border-primary` (solid green)
- Focus: `focus-visible:border-primary focus-visible:ring-0 outline-none` (same solid green, no ring)
- Never use `focus-visible:ring-2` or thick ring styles — always a 1px border.

**Sidebar menu buttons** override the default shadcn `SidebarMenuButton` styles:
- `rounded-none` (no radius)
- `focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border focus-visible:border-primary`

**Color palette for custom elements:**
- Backgrounds: `bg-[#0A0A0A]` (inputs), `bg-[#141414]` (dropdowns/elevated)
- Borders: `border-sidebar-border` (default), `border-[#2f2f2f]` (separators/subtle)
- Text: `text-foreground` (primary), `text-[#8a8a8a]` (secondary), `text-[#6a6a6a]` (tertiary)
- Active/selected: `text-primary`, `bg-primary/[0.06]`
- Font: `font-mono` for UI elements, `font-heading` for titles

### URL State Management

Search/filter state is synced to the URL via `nuqs` (`useQueryState`). The `NuqsAdapter` wraps `<Outlet />` in `__root.tsx`. Setting state to `null` clears the param from the URL.

### Sidebar-Content Alignment

The sidebar logo bottom aligns with the page `h1` bottom. The workspace dropdown aligns horizontally with the content's search input. Spacing is controlled via `pt-10` and `gap: 36px` on `SidebarHeader`.

## Deployment

Targets **Vercel** — configured via `nitro({ preset: 'vercel' })` in `vite.config.ts`.
