# Links Page with Sidebar Layout

## Context

After sign-in, users are redirected to the Links page — the primary interface for managing saved bookmarks. The current implementation is a stub (`<h1>Links</h1>`) inside the `_app` layout (Header + Footer). The Pencil design (Node NGde3) shows a completely different layout: a full sidebar-based shell with no header/footer, featuring a workspace selector, navigation, user profile section, and a rich links list with search.

This spec covers the UI implementation with mocked data to focus on layout, components, and visual fidelity to the Pencil design.

## Design Reference

- **Pencil file:** `/Users/victornogueira/Downloads/cervo.pen`
- **Node ID:** `NGde3`
- **Layout:** 1440×900, sidebar (240px) + main content area

## Architecture

### New Layout Route: `_dashboard`

Create a new pathless layout route `_dashboard.tsx` that replaces `_app` for sidebar-based pages. This layout:
- Uses shadcn's `SidebarProvider` + `Sidebar` + `SidebarInset` primitives
- Contains `AppSidebar` component + `SidebarInset` wrapping `<Outlet />`
- No Header or Footer
- Protected: client-side auth guard using `authClient.useSession()`

Auth guard pattern:
```typescript
const { data: session, isPending } = authClient.useSession()
if (isPending) return <LoadingSkeleton />  // or minimal spinner
if (!session) { navigate({ to: "/sign-in" }); return null }
```

Pages under `_dashboard`:
- `links.tsx` — Links/bookmarks page (main implementation)
- `workspace.tsx` — Workspace settings stub
- `account.tsx` — Account settings stub
- `help.tsx` — Help page stub

### CSS Variable Updates

Update `src/styles.css` sidebar variables to match the Pencil design instead of hardcoding colors:

```css
--sidebar: #080808;
--sidebar-border: #2f2f2f;
--sidebar-accent: #141414;
```

This lets the shadcn Sidebar component use its built-in `bg-sidebar`, `border-sidebar-border` classes naturally.

### Font Addition

Install `@fontsource-variable/inter` and import it in `__root.tsx` alongside the existing font imports. The Pencil design uses Inter for link descriptions.

### Component Breakdown

#### 1. `_dashboard.tsx` (layout route)
**Path:** `cervo-web/src/routes/_dashboard.tsx`

```
SidebarProvider
├── AppSidebar
└── SidebarInset
    ├── mobile header with SidebarTrigger (visible on mobile only)
    └── Outlet
```

- Uses `authClient.useSession()` for auth guard (see pattern above)
- Wraps content in `SidebarProvider` from shadcn
- Uses `SidebarInset` (not raw `<main>`) for proper sidebar offset
- Includes a `SidebarTrigger` in a top bar visible only on mobile (`md:hidden`) so users can open the sidebar sheet

#### 2. `AppSidebar.tsx` (sidebar component)
**Path:** `cervo-web/src/components/AppSidebar.tsx`

Uses shadcn sidebar primitives: `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`.

Uses TanStack Router `<Link>` component inside `SidebarMenuButton` for client-side navigation and active state detection via `activeProps`.

Structure:
```
Sidebar (side="left", variant="sidebar")
├── SidebarHeader
│   ├── Logo row (🫎 CERVO)
│   └── Workspace selector (mocked "Personal" dropdown — non-functional)
├── SidebarContent
│   └── SidebarMenu
│       ├── Links    → <Link to="/links">     (link-icon)
│       ├── Workspace → <Link to="/workspace"> (settings-icon)
│       ├── Account  → <Link to="/account">   (user-icon)
│       └── Help     → <Link to="/help">      (help-circle-icon)
└── SidebarFooter
    └── User section (Avatar with initials + name from session)
```

Styling (uses CSS variables, not hardcoded colors):
- Background: `bg-sidebar` (resolves to updated `--sidebar: #080808`)
- Border: `border-sidebar-border` (resolves to `--sidebar-border: #2f2f2f`)
- Nav active state: `bg-primary/[0.06] text-primary font-bold` via `activeProps`
- Nav inactive: `text-muted-foreground`
- Workspace selector: `bg-sidebar-accent border border-sidebar-border`
- Icons: Lucide (`Layers`, `Link`, `Settings`, `User`, `HelpCircle`, `ChevronDown`)
- Fonts: `font-mono` (JetBrains Mono) throughout sidebar

#### 3. `links.tsx` (page — enhanced)
**Path:** `cervo-web/src/routes/_dashboard/links.tsx`

Structure:
```
div (padded container, max-w ~900px)
├── h1 "Links" (font-heading, text-4xl/42px, font-bold)
├── Search/paste input section
│   ├── Input (shadcn) with Search icon prefix, placeholder "Paste URL or Search..."
│   └── Recent searches row (pill-shaped badges)
├── "Recently added" section header (text-muted-foreground, text-xs, tracking-wide)
└── Links list
    └── LinkListItem × N with Separator between (mocked data)
```

- Uses shadcn `Input` for the search bar, styled with `border-sidebar-border` and search icon
- Recent searches: shadcn `Badge` variant="outline" for pill styling
- Mocked data defined as a module-level constant

#### 4. `LinkListItem.tsx` (link card component)
**Path:** `cervo-web/src/components/LinkListItem.tsx`

Props (interface defined in the component file):
```typescript
interface LinkListItemProps {
  title: string
  description: string
  url: string
  tag: string
  timeAgo: string
  isNew: boolean
}
```

Layout:
```
Row (flex, items-center)
├── Left content (flex-1, vertical, gap-1.5)
│   ├── Title (font-heading, text-lg, font-medium, text-foreground)
│   ├── Description (font-sans/Inter, text-xs, text-muted-foreground, leading-relaxed)
│   └── URL (font-mono, text-[11px], text-muted-foreground/60)
└── Right content (flex-col, items-end, gap-2)
    ├── Tag badge (Badge component)
    └── Time label (text-[9px], font-mono, font-bold)
```

Styling:
- Left border: `border-l-[3px]` — `border-primary` when `isNew`, `border-border` otherwise
- Padding: `py-4 pl-4`
- Separator between items: shadcn `Separator`
- Tag when new: `border-primary/25 text-primary`
- Tag when not new: `border-border text-muted-foreground`
- Time when new: `text-primary`
- Time when not new: `text-muted-foreground`

#### 5. Stub pages
**Paths:**
- `cervo-web/src/routes/_dashboard/workspace.tsx`
- `cervo-web/src/routes/_dashboard/account.tsx`
- `cervo-web/src/routes/_dashboard/help.tsx`

Each stub: simple page with a title heading matching the nav item name, same padding/container style as the links page.

### Mocked Data

```typescript
const MOCK_LINKS = [
  {
    title: "Understanding Vector Embeddings for Search",
    description: "A deep dive into how vector embeddings power modern semantic search systems and why they matter for information...",
    url: "arxiv.org/abs/2301.03749",
    tag: "Embeddings",
    timeAgo: "3min ago",
    isNew: true,
  },
  {
    title: "Building a Personal Knowledge Base with Bookmarks",
    description: "How to organize and retrieve saved links effectively using semantic tagging and intelligent clustering approaches.",
    url: "blog.notion.so/knowledge-management",
    tag: "Pkm",
    timeAgo: "yesterday",
    isNew: false,
  },
  {
    title: "RAG Patterns in Production Applications",
    description: "Practical patterns for implementing retrieval-augmented generation in real-world applications with bookmark-based context.",
    url: "github.com/langchain-ai/rag-patterns",
    tag: "Rag",
    timeAgo: "3 days ago",
    isNew: false,
  },
  {
    title: "Cosine Similarity vs Dot Product for Nearest Neighbor",
    description: "Comparing distance metrics for semantic similarity in bookmark search and when to use each approach effectively.",
    url: "stackoverflow.com/questions/52318422",
    tag: "Math",
    timeAgo: "last week",
    isNew: false,
  },
]

const RECENT_SEARCHES = ["recruiting mistakes", "react server components", "design tokens"]
```

### Routing Changes

1. **Delete** `src/routes/_app/links.tsx` first
2. **Create** `src/routes/_dashboard.tsx` layout route
3. **Create** `src/routes/_dashboard/` directory with: `links.tsx`, `workspace.tsx`, `account.tsx`, `help.tsx`
4. Running the dev server will auto-regenerate `routeTree.gen.ts` — never edit it manually
5. Sign-in callback URL already points to `/links` which will now resolve under `_dashboard`

### Key shadcn Components Used

- `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarInset`, `SidebarTrigger` — sidebar structure
- `Input` — search bar
- `Badge` — tags and time indicators
- `Separator` — dividers between link items
- `Avatar`, `AvatarFallback` — user initials in sidebar footer

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/routes/_dashboard.tsx` | **Create** — new sidebar layout with auth guard |
| `src/routes/_dashboard/links.tsx` | **Create** — links page (replaces old) |
| `src/routes/_dashboard/workspace.tsx` | **Create** — stub |
| `src/routes/_dashboard/account.tsx` | **Create** — stub |
| `src/routes/_dashboard/help.tsx` | **Create** — stub |
| `src/components/AppSidebar.tsx` | **Create** — sidebar component |
| `src/components/LinkListItem.tsx` | **Create** — link list item component |
| `src/routes/_app/links.tsx` | **Delete** — replaced by dashboard version |
| `src/styles.css` | **Modify** — update sidebar CSS variables |
| `src/routes/__root.tsx` | **Modify** — add Inter font import |

### Verification

1. Run `bun --bun run dev` and navigate to `/links`
2. Verify sidebar renders with correct nav items, logo, workspace selector, user section
3. Verify Links page shows search input, recent searches, and mocked link list
4. Verify active nav state (Links highlighted green)
5. Click Workspace/Account/Help — verify stub pages render and sidebar active state updates
6. Verify mobile: sidebar collapses, SidebarTrigger opens sheet
7. Run `bun --bun run check` for Biome lint/format
8. Run TypeScript check with no errors
