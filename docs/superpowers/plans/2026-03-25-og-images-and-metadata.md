# OG Image Generation & Page Metadata Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dynamic OG image generation and per-route metadata to all pages in the Cervo web app.

**Architecture:** A single API route (`/api/og`) generates OG images using `@vercel/og` (Satori + resvg). Each route file exports a `head()` function with page-specific metadata. Public pages get unique OG images via query params; authenticated pages inherit a fallback from `__root.tsx`.

**Tech Stack:** `@vercel/og`, TanStack Start file-based routing (`createFileRoute` with `head()`), Vercel Edge Functions

**Spec:** `docs/superpowers/specs/2026-03-25-og-images-and-metadata-design.md`

**Important notes:**
- **Absolute URLs:** OG image URLs must be absolute for social crawlers. Use a `SITE_URL` constant (e.g., `https://cervo.link`) to prefix all `og:image` and `twitter:image` values. During dev, the OG endpoint still works via relative URL in the browser.
- **Font loading:** Use `https://rsms.me/inter/font-files/Inter-Bold.woff2` (stable, maintained by Inter's author) rather than Google Fonts subset URLs.
- **API route as `.tsx`:** The OG route uses `.tsx` extension to support JSX syntax in `ImageResponse`. TanStack Start supports `.tsx` API routes.

---

### Task 1: Install `@vercel/og`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the dependency**

Run:
```bash
bun add @vercel/og
```

- [ ] **Step 2: Verify installation**

Run:
```bash
bun --bun run check
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add @vercel/og dependency"
```

---

### Task 2: Create the OG image API route

**Files:**
- Create: `src/routes/api.og.tsx`

This route uses the same `createFileRoute` + `server.handlers` pattern as `src/routes/api.resume-chat.ts`, but uses `.tsx` extension to support JSX in `ImageResponse`.

- [ ] **Step 1: Create the API route file**

```tsx
import { ImageResponse } from "@vercel/og";
import { createFileRoute } from "@tanstack/react-router";

const INTER_BOLD_URL =
	"https://rsms.me/inter/font-files/Inter-Bold.woff2";

export const Route = createFileRoute("/api/og")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const rawTitle = url.searchParams.get("title") || "Cervo";
				const rawSubtitle = url.searchParams.get("subtitle") || "";

				const title = rawTitle.slice(0, 80);
				const subtitle = rawSubtitle.slice(0, 120);

				const [fontData, logoData] = await Promise.all([
					fetch(INTER_BOLD_URL).then((res) => res.arrayBuffer()),
					fetch(new URL("/cervo-horizontal.png", request.url)).then(
						(res) => res.arrayBuffer(),
					),
				]);

				const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

				return new ImageResponse(
					(
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								width: "1200px",
								height: "630px",
								backgroundColor: "#000000",
								color: "#ffffff",
								fontFamily: "Inter",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									flex: 1,
									gap: "16px",
									paddingTop: "40px",
								}}
							>
								<div
									style={{
										fontSize: "60px",
										fontWeight: 700,
										textAlign: "center",
										lineHeight: 1.1,
										maxWidth: "900px",
									}}
								>
									{title}
								</div>
								{subtitle ? (
									<div
										style={{
											fontSize: "30px",
											color: "#cccccc",
											textAlign: "center",
											maxWidth: "800px",
										}}
									>
										{subtitle}
									</div>
								) : null}
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									paddingBottom: "60px",
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={logoBase64}
									height="40"
									style={{ objectFit: "contain" }}
								/>
							</div>
						</div>
					),
					{
						width: 1200,
						height: 630,
						fonts: [
							{
								name: "Inter",
								data: fontData,
								weight: 700 as const,
								style: "normal" as const,
							},
						],
						headers: {
							"Cache-Control":
								"public, max-age=86400, s-maxage=31536000, immutable",
						},
					},
				);
			},
		},
	},
});
```

Key details:
- Uses `.tsx` extension so `ImageResponse` receives proper JSX (the standard `@vercel/og` API expects JSX elements)
- Fetches Inter Bold font from `rsms.me` (stable, maintained by Inter's author) as `ArrayBuffer`
- Fetches logo via absolute URL using `new URL('/cervo-horizontal.png', request.url)` (edge-compatible)
- Converts logo to base64 data URI for embedding in the image
- Validates/truncates query params
- Returns PNG with aggressive cache headers

- [ ] **Step 2: Verify the route builds**

Run:
```bash
bun --bun run build
```
Expected: build succeeds with no errors

- [ ] **Step 3: Run biome check**

Run:
```bash
bun --bun run check
```
Expected: no lint/format errors

- [ ] **Step 4: Commit**

```bash
git add src/routes/api.og.tsx
git commit -m "feat: add OG image generation API route"
```

---

### Task 3: Create shared OG URL helper and add global fallback metadata

**Files:**
- Create: `src/lib/og.ts`
- Modify: `src/routes/__root.tsx`

Social crawlers require absolute URLs for `og:image` and `twitter:image`. We create a helper that builds the full OG image URL.

- [ ] **Step 1: Create `src/lib/og.ts`**

```typescript
const SITE_URL = "https://cervo.link";

export function ogImageUrl(title: string, subtitle?: string): string {
	const params = new URLSearchParams({ title });
	if (subtitle) {
		params.set("subtitle", subtitle);
	}
	return `${SITE_URL}/api/og?${params.toString()}`;
}
```

- [ ] **Step 2: Update the head() meta array in `__root.tsx`**

Add the import at the top of `src/routes/__root.tsx`:

```typescript
import { ogImageUrl } from "#/lib/og";
```

Then replace the existing `head()` function's `meta` array. Keep `charSet`, `viewport`, and `title` as-is, then add OG and Twitter meta tags after them. Preserve ALL existing `links` entries unchanged:

```typescript
head: () => ({
	meta: [
		{
			charSet: "utf-8",
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1",
		},
		{
			title: "cervo",
		},
		{
			name: "description",
			content: "Save, organize, and search your bookmarks with AI",
		},
		{
			property: "og:site_name",
			content: "Cervo",
		},
		{
			property: "og:type",
			content: "website",
		},
		{
			property: "og:title",
			content: "Cervo",
		},
		{
			property: "og:description",
			content: "Save, organize, and search your bookmarks with AI",
		},
		{
			property: "og:image",
			content: ogImageUrl("Cervo", "Smart Bookmark Management"),
		},
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: "Cervo",
		},
		{
			name: "twitter:description",
			content: "Save, organize, and search your bookmarks with AI",
		},
		{
			name: "twitter:image",
			content: ogImageUrl("Cervo", "Smart Bookmark Management"),
		},
	],
	links: [
		// ... preserve ALL existing links entries (favicon, apple-touch-icon, stylesheet)
	],
}),
```

Note: The `property` key is used for OpenGraph tags (not `name`). TanStack Router's `head()` meta array supports both `name` and `property` keys for meta tags.

- [ ] **Step 2: Run biome check**

Run:
```bash
bun --bun run check
```
Expected: no errors

- [ ] **Step 3: Run TypeScript check**

Run:
```bash
bunx tsc --noEmit
```
Expected: no type errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/og.ts src/routes/__root.tsx
git commit -m "feat: add OG URL helper and global fallback meta tags"
```

---

### Task 4: Add metadata to public pages

**Files:**
- Modify: `src/routes/_app/index.tsx`
- Modify: `src/routes/_auth/sign-in.tsx`

These pages get unique OG images via the `/api/og` endpoint with page-specific query params. Import and use the `ogImageUrl` helper from `#/lib/og`.

- [ ] **Step 1: Add head() to the landing page**

In `src/routes/_app/index.tsx`, add the import and `head` to the `createFileRoute` options.

Add import:
```typescript
import { ogImageUrl } from "#/lib/og";
```

The current route definition looks like:

```typescript
export const Route = createFileRoute("/_app/")({
	component: LandingPage,
});
```

Update it to:

```typescript
export const Route = createFileRoute("/_app/")({
	head: () => ({
		meta: [
			{ title: "Cervo — Smart Bookmark Management" },
			{
				name: "description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{ property: "og:title", content: "Cervo — Smart Bookmark Management" },
			{
				property: "og:description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				property: "og:image",
				content: ogImageUrl("Cervo", "Smart Bookmark Management"),
			},
			{ name: "twitter:title", content: "Cervo — Smart Bookmark Management" },
			{
				name: "twitter:description",
				content: "Save, organize, and search your bookmarks with AI",
			},
			{
				name: "twitter:image",
				content: ogImageUrl("Cervo", "Smart Bookmark Management"),
			},
		],
	}),
	component: LandingPage,
});
```

- [ ] **Step 2: Add head() to the sign-in page**

In `src/routes/_auth/sign-in.tsx`, same pattern.

Add import:
```typescript
import { ogImageUrl } from "#/lib/og";
```

Current:

```typescript
export const Route = createFileRoute("/_auth/sign-in")({
	component: SignInPage,
});
```

Updated:

```typescript
export const Route = createFileRoute("/_auth/sign-in")({
	head: () => ({
		meta: [
			{ title: "Sign In — Cervo" },
			{
				name: "description",
				content: "Sign in to your Cervo account",
			},
			{ property: "og:title", content: "Sign In — Cervo" },
			{
				property: "og:description",
				content: "Sign in to your Cervo account",
			},
			{
				property: "og:image",
				content: ogImageUrl("Sign In", "Access your bookmarks"),
			},
			{ name: "twitter:title", content: "Sign In — Cervo" },
			{
				name: "twitter:description",
				content: "Sign in to your Cervo account",
			},
			{
				name: "twitter:image",
				content: ogImageUrl("Sign In", "Access your bookmarks"),
			},
		],
	}),
	component: SignInPage,
});
```

- [ ] **Step 3: Run biome check and TypeScript check**

Run:
```bash
bun --bun run check && bunx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/routes/_app/index.tsx src/routes/_auth/sign-in.tsx
git commit -m "feat: add metadata and OG images to public pages"
```

---

### Task 5: Add metadata to authenticated pages

**Files:**
- Modify: `src/routes/_dashboard/links.tsx`
- Modify: `src/routes/_dashboard/account.tsx`
- Modify: `src/routes/_dashboard/settings.tsx`
- Modify: `src/routes/_dashboard/help.tsx`

These pages get title + description metadata only. They inherit the fallback OG image from `__root.tsx`.

- [ ] **Step 1: Add head() to links page**

In `src/routes/_dashboard/links.tsx`, add `head` to `createFileRoute`:

```typescript
export const Route = createFileRoute("/_dashboard/links")({
	head: () => ({
		meta: [
			{ title: "Links — Cervo" },
			{
				name: "description",
				content: "Your bookmarks, organized",
			},
		],
	}),
	component: LinksPage,
});
```

- [ ] **Step 2: Add head() to account page**

In `src/routes/_dashboard/account.tsx`:

```typescript
export const Route = createFileRoute("/_dashboard/account")({
	head: () => ({
		meta: [
			{ title: "Account — Cervo" },
			{
				name: "description",
				content: "Manage your Cervo account",
			},
		],
	}),
	component: AccountPage,
});
```

- [ ] **Step 3: Add head() to settings page**

In `src/routes/_dashboard/settings.tsx`:

```typescript
export const Route = createFileRoute("/_dashboard/settings")({
	head: () => ({
		meta: [
			{ title: "Settings — Cervo" },
			{
				name: "description",
				content: "Workspace settings",
			},
		],
	}),
	component: SettingsPage,
});
```

- [ ] **Step 4: Add head() to help page**

In `src/routes/_dashboard/help.tsx`:

```typescript
export const Route = createFileRoute("/_dashboard/help")({
	head: () => ({
		meta: [
			{ title: "Help — Cervo" },
			{
				name: "description",
				content: "Get help with Cervo",
			},
		],
	}),
	component: HelpPage,
});
```

- [ ] **Step 5: Run biome check and TypeScript check**

Run:
```bash
bun --bun run check && bunx tsc --noEmit
```
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/routes/_dashboard/links.tsx src/routes/_dashboard/account.tsx src/routes/_dashboard/settings.tsx src/routes/_dashboard/help.tsx
git commit -m "feat: add metadata to authenticated pages"
```

---

### Task 6: Verify everything works end-to-end

- [ ] **Step 1: Run the full build**

Run:
```bash
bun --bun run build
```
Expected: build succeeds

- [ ] **Step 2: Run tests**

Run:
```bash
bun --bun run test
```
Expected: all tests pass

- [ ] **Step 3: Run biome check**

Run:
```bash
bun --bun run check
```
Expected: no issues

- [ ] **Step 4: Start dev server and verify OG endpoint**

Run dev server, then visit `http://localhost:3000/api/og?title=Cervo&subtitle=Smart+Bookmark+Management` — should return a PNG image with black background, white title, subtitle, and Cervo logo.

- [ ] **Step 5: Final commit if any fixes were needed**

Only if previous steps required changes:
```bash
git add -A
git commit -m "fix: address verification issues"
```
