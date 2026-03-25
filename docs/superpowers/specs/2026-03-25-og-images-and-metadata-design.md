# OG Image Generation & Page Metadata

## Overview

Add per-route metadata (title, description, OG tags, Twitter cards) to all pages and dynamic OG image generation for public pages via `@vercel/og`.

## Goals

- Every page has proper `<title>`, `<meta description>`, and social sharing tags
- Public pages (`/`, `/sign-in`) get dynamically generated OG images with page-specific titles
- Authenticated pages use a static fallback OG image
- OG images follow a consistent design: black background, bold white title, subtitle, Cervo logo at bottom

## OG Image API Route

### Endpoint

`GET /api/og?title=<string>&subtitle=<string>`

**File:** `src/routes/api/og.ts`

### Query Parameters

| Param | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Main heading text (large, bold, white) |
| `subtitle` | No | Secondary text below title (smaller, lighter) |

### Image Spec

- **Dimensions:** 1200x630px (standard OG image size)
- **Background:** `#000000` (solid black)
- **Title:** White (`#ffffff`), bold, ~60px, centered horizontally, positioned in upper-center
- **Subtitle:** Light gray (`#cccccc`), regular weight, ~30px, centered below title
- **Logo:** `cervo-horizontal.png` from `/public`, centered near bottom of image
- **No border radius** (consistent with design system)

### Technology

- `@vercel/og` — wraps Satori + resvg-wasm for JSX-to-PNG conversion
- Font: embed a bold sans-serif font (Inter Bold or similar) via Satori font loading
- Returns `image/png` with appropriate cache headers

### Layout (visual reference)

```
┌──────────────────────────────────┐
│                                  │
│                                  │
│           [Title]                │
│         [Subtitle]               │
│                                  │
│        [Cervo Logo]              │
│                                  │
└──────────────────────────────────┘
```

## Per-Route Metadata

### Public Pages (unique OG image)

| Route | `<title>` | `<meta description>` | OG Image URL |
|-------|-----------|---------------------|--------------|
| `/` | Cervo — Smart Bookmark Management | Save, organize, and search your bookmarks with AI | `/api/og?title=Cervo&subtitle=Smart+Bookmark+Management` |
| `/sign-in` | Sign In — Cervo | Sign in to your Cervo account | `/api/og?title=Sign+In&subtitle=Access+your+bookmarks` |

### Authenticated Pages (fallback OG image)

| Route | `<title>` | `<meta description>` |
|-------|-----------|---------------------|
| `/links` | Links — Cervo | Your bookmarks, organized |
| `/account` | Account — Cervo | Manage your Cervo account |
| `/settings` | Settings — Cervo | Workspace settings |
| `/help` | Help — Cervo | Get help with Cervo |

Authenticated pages inherit the fallback OG image from `__root.tsx`.

## Global Fallback (`__root.tsx`)

Add default meta tags that all pages inherit unless overridden:

- `og:site_name`: "Cervo"
- `og:type`: "website"
- `og:image`: `/api/og?title=Cervo&subtitle=Smart+Bookmark+Management`
- `twitter:card`: "summary_large_image"
- `twitter:image`: same as `og:image`

Each route's `head()` can override any of these defaults.

## Meta Tags Per Route

Every route's `head()` exports these tags:

```
<title>
<meta name="description">
<meta property="og:title">
<meta property="og:description">
<meta property="og:image">
<meta property="og:type">
<meta name="twitter:card">
<meta name="twitter:title">
<meta name="twitter:description">
<meta name="twitter:image">
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/routes/api/og.ts` | Create | OG image generation endpoint using `@vercel/og` |
| `src/routes/__root.tsx` | Modify | Add global fallback OG/Twitter meta tags |
| `src/routes/_app/index.tsx` | Modify | Add `head()` with landing page metadata |
| `src/routes/_auth/sign-in.tsx` | Modify | Add `head()` with sign-in metadata |
| `src/routes/_dashboard/links.tsx` | Modify | Add `head()` with title/description metadata |
| `src/routes/_dashboard/account.tsx` | Modify | Add `head()` with title/description metadata |
| `src/routes/_dashboard/settings.tsx` | Modify | Add `head()` with title/description metadata |
| `src/routes/_dashboard/help.tsx` | Modify | Add `head()` with title/description metadata |
| `package.json` | Modify | Add `@vercel/og` dependency |

## Out of Scope

- JSON-LD structured data
- Canonical URL tags
- manifest.json updates
- OG images for authenticated pages (they use the fallback)
