# cervo-web

Frontend for the Cervo bookmark management app. Built with TanStack Start (SSR React) and file-based routing.

## Stack

TanStack Start · TanStack Router · TanStack Query · React · Tailwind CSS v4 · Shadcn UI · Better Auth · CASL · Orval · Biome · Vitest

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0
- cervo-api running locally (default: `http://localhost:8090`)

### Setup

```bash
bun install
cp .env.example .env.local
bun --bun run dev        # http://localhost:3000
```

### Commands

```bash
# Development
bun --bun run dev            # Dev server on port 3000
bun --bun run build          # Production build
bun --bun run preview        # Preview production build

# Testing
bun --bun run test           # Vitest

# Code quality (run in this order)
bun --bun run check          # Biome lint + format
bun --bun run lint           # Biome lint only
bun --bun run format         # Biome format only
bun --bun run typecheck      # tsc --noEmit

# API client
bun run generate             # Regenerate Orval client from spec.json
```

---

## Environment Variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | cervo-api base URL (e.g. `http://localhost:8090`) |
| `VITE_CLIENT_ID` | Yes | Discord OAuth app client ID (for workspace integrations) |

---

## Architecture

```
src/
├── api/                    # Orval-generated API client (do not edit)
│   ├── cervoAPI.schemas.ts # All request/response TypeScript types
│   └── workspaces/         # Generated hooks per domain (useGetWorkspacesMe, etc.)
│
├── components/
│   ├── AppSidebar.tsx      # Navigation sidebar + workspace switcher
│   ├── LinkDetailView.tsx  # Bookmark detail panel
│   ├── LinkListItem.tsx    # Bookmark row in list
│   └── ui/                 # Shadcn UI components
│
├── lib/
│   ├── abilities.ts        # CASL ability definitions (viewer/editor/owner)
│   ├── ability-context.tsx # AbilityContext + Can component
│   ├── workspace-context.tsx # Active workspace state + ability provider
│   ├── auth-client.ts      # Better Auth client
│   ├── api-client.ts       # Fetch wrapper used by Orval
│   └── env.ts              # Client env vars (Zod-validated)
│
└── routes/
    ├── __root.tsx           # Root document shell
    ├── _auth.tsx            # Unauthenticated layout
    ├── _auth/
    │   ├── sign-in.tsx      # OAuth sign-in
    │   └── workspace.tsx    # Workspace creation (post sign-in)
    ├── _dashboard.tsx       # Authenticated layout (sidebar)
    ├── _dashboard/
    │   ├── links.tsx        # Bookmark search + save
    │   ├── settings.tsx     # Workspace settings, members, integrations
    │   ├── account.tsx      # Account settings
    │   └── help.tsx         # Help page
    └── discord/
        └── callback.tsx     # Discord OAuth callback
```

---

## Key Patterns

### Role-based UI (CASL)

Workspace members have one of three roles: `owner`, `editor`, `viewer`. Abilities are defined in `src/lib/abilities.ts` and provided via `WorkspaceProvider` → `AbilityContext`.

Gate UI elements with the `Can` component:

```tsx
import { Can } from '#/lib/ability-context'

<Can I="manage" a="Link">
  <button>Save URL</button>
</Can>

<Can I="update" a="Workspace">
  <button>Save Changes</button>
</Can>
```

Use `useAbility` for imperative checks (e.g. disabling inputs):

```tsx
import { useAbility } from '@casl/react'
import { AbilityContext } from '#/lib/ability-context'

const ability = useAbility(AbilityContext)
<input disabled={!ability.can('update', 'Workspace')} />
```

**Ability matrix:**

| Action | Owner | Editor | Viewer |
|---|---|---|---|
| `manage Workspace` (connect/disconnect integrations) | ✓ | — | — |
| `update Workspace` (rename, description, visibility) | ✓ | — | — |
| `delete Workspace` | ✓ | — | — |
| `manage Member` (invite, remove) | ✓ | — | — |
| `manage Link` (save, delete) | ✓ | ✓ | — |
| `read Workspace` / `read Link` | ✓ | ✓ | ✓ |

### API Client (Orval)

All API types and hooks are generated from `cervo-api/src/infra/http/swagger/spec.json` via Orval. Never edit files in `src/api/` manually.

To regenerate after API changes:
```bash
bun run generate
```

### URL State

Search/filter state is synced to the URL via `nuqs`. Use `useQueryState` — setting to `null` removes the param.

### Workspace Context

`useWorkspace()` returns the active workspace, full list, and setter. The active workspace is persisted in `localStorage`. Switching workspaces re-computes CASL abilities automatically.

---

## Design System

- **Dark mode only** — `dark` class forced on `<html>` at load
- **No border radius** — all `--radius-*` vars are `0px`
- **Interactive element height** — `h-11` (44px) for all inputs, buttons, dropdowns
- **Focus/hover** — `border-primary` (1px green), no ring; never `focus-visible:ring-2`
- **Fonts** — `font-mono` for UI elements, `font-heading` for page titles
- **Colours** — `bg-[#0A0A0A]` inputs, `bg-[#141414]` elevated, `text-[#8a8a8a]` secondary

---

## Testing

```bash
bun --bun run test
```

Tests use Vitest + Testing Library against the real component tree.
