# Landing Page Link Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trim dead landing page links, introduce a `_landing` layout route, and build 5 new static public pages.

**Architecture:** Create a `_landing.tsx` pathless layout wrapping `LandingNavbar` + `LandingFooter`. Migrate the landing page from `_app/index.tsx` to `_landing/index.tsx`. New pages (`/changelog`, `/blog`, `/terms`, `/privacy`, `/discord`) live under `_landing/`. Footer redesigned from 4 columns / 28 links to 2 columns / 8 links.

**Tech Stack:** TanStack Start (file-based routing), React, Tailwind CSS v4, Biome (lint/format)

**Spec:** `docs/superpowers/specs/2026-03-25-landing-page-link-cleanup-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/routes/_landing.tsx` | Public layout: navbar + footer wrapping `<Outlet />` |
| Create | `src/routes/_landing/index.tsx` | Landing page (migrated from `_app/index.tsx`) |
| Create | `src/routes/_landing/changelog.tsx` | Static changelog page |
| Create | `src/routes/_landing/blog.tsx` | Static blog listing page |
| Create | `src/routes/_landing/discord.tsx` | Redirect to Discord invite |
| Create | `src/routes/_landing/terms.tsx` | Terms of Service page |
| Create | `src/routes/_landing/privacy.tsx` | Privacy Policy page |
| Modify | `src/components/landing/landing-footer.tsx` | Trim to 2-column layout, 8 links |
| Modify | `src/components/landing/landing-navbar.tsx:10` | Change `#discord` to `/discord` |
| Modify | `src/components/landing/testimonials-carousel.tsx:181-185,262` | Remove dead `#stories` link and `href="#"` card links |
| Delete | `src/routes/_app/index.tsx` | Replaced by `_landing/index.tsx` |
| Keep | `src/routes/_app.tsx` | Intentionally kept — still wraps `_app/mcp.ts` and `_app/demo/*` routes |

---

### Task 1: Create `_landing.tsx` Layout Route

**Files:**
- Create: `src/routes/_landing.tsx`

This layout wraps all public-facing pages with the landing navbar and footer, matching the pattern used by `_auth.tsx`.

- [ ] **Step 1: Create the layout file**

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LandingFooter } from "#/components/landing/landing-footer";
import { LandingNavbar } from "#/components/landing/landing-navbar";

export const Route = createFileRoute("/_landing")({
	component: LandingLayout,
});

function LandingLayout() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] [&_a]:cursor-default [&_button]:cursor-default">
			<LandingNavbar />
			<Outlet />
			<LandingFooter />
		</div>
	);
}
```

Note: The `min-h-screen bg-[#0C0C0C]` and cursor overrides come from the current landing page wrapper in `_app/index.tsx:89`. They move to the layout so all `_landing/*` pages inherit them.

- [ ] **Step 2: Run dev server to verify route generation**

Run: `bun --bun run dev`
Expected: No errors. `routeTree.gen.ts` regenerates with `_landing` route.

- [ ] **Step 3: Commit**

```bash
git add src/routes/_landing.tsx
git commit -m "feat: add _landing pathless layout route"
```

---

### Task 2: Migrate Landing Page to `_landing/index.tsx`

**Files:**
- Create: `src/routes/_landing/index.tsx` (from contents of `src/routes/_app/index.tsx`)
- Delete: `src/routes/_app/index.tsx`

- [ ] **Step 1: Create `_landing/` directory and move the file**

```bash
mkdir -p src/routes/_landing
git mv src/routes/_app/index.tsx src/routes/_landing/index.tsx
```

- [ ] **Step 2: Update the route path in the file**

In `src/routes/_landing/index.tsx`, change the `createFileRoute` path:

```tsx
// Before:
export const Route = createFileRoute("/_app/")({
// After:
export const Route = createFileRoute("/_landing/")({
```

- [ ] **Step 3: Remove navbar, footer, and outer wrapper from the component**

The `_landing` layout now provides `LandingNavbar`, `LandingFooter`, and the outer `<div className="min-h-screen bg-[#0C0C0C] ...">` wrapper. Remove these from `LandingPage`.

Remove these imports:
```tsx
import { LandingFooter } from "#/components/landing/landing-footer";
import { LandingNavbar } from "#/components/landing/landing-navbar";
```

Change the component from:
```tsx
function LandingPage() {
	return (
		<div className="min-h-screen bg-[#0C0C0C] [&_a]:cursor-default [&_button]:cursor-default">
			<LandingNavbar />
			<div className="mx-auto max-w-7xl px-6 lg:px-[163px]">
				{/* ... content ... */}
			</div>
			<TestimonialsCarousel testimonials={testimonials} />
			<div className="mx-auto max-w-7xl px-6 lg:px-[163px]">
				{/* ... content ... */}
			</div>
			<LandingFooter />
		</div>
	);
}
```

To (remove outer div, navbar, and footer — layout provides them):
```tsx
function LandingPage() {
	return (
		<>
			<div className="mx-auto max-w-7xl px-6 lg:px-[163px]">
				{/* ... all feature sections ... */}
			</div>
			<TestimonialsCarousel testimonials={testimonials} />
			<div className="mx-auto max-w-7xl px-6 lg:px-[163px]">
				{/* ... CTA + newsletter ... */}
			</div>
		</>
	);
}
```

**Important:** The `head()` block with OG meta tags (`og:title`, `og:image`, `twitter:image`, etc.) and the `ogImageUrl` import MUST remain intact in the migrated file. Only the route path string and the component wrapper change.

**Note:** `_app.tsx` and its remaining children (`_app/mcp.ts`, `_app/demo/*`) are intentionally kept — only `_app/index.tsx` moves.

- [ ] **Step 4: Run dev server and verify the landing page still renders at `/`**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/`
Expected: Landing page renders identically — navbar at top, footer at bottom, all sections in between.

- [ ] **Step 5: Verify `routeTree.gen.ts` has no route conflicts**

Open `src/routeTree.gen.ts` and confirm that `_landing/index` maps to path `/` with no ambiguity or conflict with the `_app` layout.

- [ ] **Step 6: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: migrate landing page from _app to _landing layout"
```

---

### Task 3: Redesign Footer (2 Columns, 8 Links)

**Files:**
- Modify: `src/components/landing/landing-footer.tsx`

- [ ] **Step 1: Replace the entire footer component**

Replace the full contents of `src/components/landing/landing-footer.tsx` with:

```tsx
import { Link } from "@tanstack/react-router";
import { useScrollAnimation } from "./use-scroll-animation";

interface FooterColumn {
	title: string;
	links: Array<{ label: string; href: string; isRoute?: boolean }>;
}

const columns: FooterColumn[] = [
	{
		title: "Product",
		links: [
			{ label: "Features", href: "#features" },
			{ label: "Pricing", href: "#pricing" },
			{ label: "Changelog", href: "/changelog", isRoute: true },
			{ label: "Blog", href: "/blog", isRoute: true },
			{ label: "Discord", href: "/discord", isRoute: true },
		],
	},
	{
		title: "Legal",
		links: [
			{ label: "Terms of Service", href: "/terms", isRoute: true },
			{ label: "Privacy Policy", href: "/privacy", isRoute: true },
			{ label: "Sign In", href: "/sign-in", isRoute: true },
		],
	},
];

export function LandingFooter() {
	const { ref, isVisible } = useScrollAnimation();

	return (
		<footer
			ref={ref}
			className={`bg-[#080808] px-6 py-10 transition-all duration-700 lg:px-[163px] lg:py-[60px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:gap-10">
				{columns.map((col) => (
					<div key={col.title} className="flex flex-col gap-4 lg:w-[180px]">
						<h3 className="pb-2 font-sans text-sm font-semibold text-[#E5E5E5]">
							{col.title}
						</h3>
						{col.links.map((link) =>
							link.isRoute ? (
								<Link
									key={link.label}
									to={link.href}
									className="font-sans text-[13px] text-[#6a6a6a] no-underline transition-colors hover:text-white"
								>
									{link.label}
								</Link>
							) : (
								<a
									key={link.label}
									href={link.href}
									className="font-sans text-[13px] text-[#6a6a6a] no-underline transition-colors hover:text-white"
								>
									{link.label}
								</a>
							),
						)}
					</div>
				))}

				<div className="flex flex-col items-end gap-2 lg:flex-1 lg:justify-center">
					<span className="font-sans text-sm text-white">
						&copy; {new Date().getFullYear()} Cervo
					</span>
				</div>
			</div>
		</footer>
	);
}
```

Key changes: 4 columns → 2 columns, `<Link>` for internal routes, removed Twitter/X social link, dynamic copyright year.

**Note on TypeScript:** The `<Link to={link.href}>` calls reference routes like `/changelog`, `/blog`, etc. that don't exist yet (created in Tasks 6-10). TypeScript may report type errors on the `to` prop until those route files are created and `routeTree.gen.ts` regenerates. This is expected — errors will resolve as route files are added.

- [ ] **Step 2: Run dev server and verify footer renders correctly**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/`
Expected: Footer shows 2 columns (Product, Legal) + copyright. No social icon row.

- [ ] **Step 3: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/landing-footer.tsx
git commit -m "feat: redesign footer to 2 columns with 8 links"
```

---

### Task 4: Fix Navbar `#discord` Link

**Files:**
- Modify: `src/components/landing/landing-navbar.tsx:10`

- [ ] **Step 1: Change the Discord link in NAV_LINKS**

In `src/components/landing/landing-navbar.tsx`, line 10, change:

```tsx
// Before:
	{ label: "Discord", href: "#discord" },
// After:
	{ label: "Discord", href: "/discord" },
```

Note: The navbar renders all links as plain `<a href={...}>` tags. Using `<a href="/discord">` (instead of `<Link>`) is intentionally acceptable here because `/discord` redirects to an external URL anyway — a full page navigation is expected.

- [ ] **Step 2: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/landing-navbar.tsx
git commit -m "fix: change navbar Discord link from dead anchor to /discord"
```

---

### Task 5: Remove Dead Links from Testimonials

**Files:**
- Modify: `src/components/landing/testimonials-carousel.tsx:181-185` (remove `#stories` link)
- Modify: `src/routes/_landing/index.tsx` (remove `href="#"` link props from testimonial data)

- [ ] **Step 1: Remove the "Read more stories" link from the Header component**

In `src/components/landing/testimonials-carousel.tsx`, remove lines 181-185:

```tsx
// Remove this entire block from the Header() function:
			<div className="pt-4">
				<LandingLink href="#stories" size="sm">
					Read more stories
				</LandingLink>
			</div>
```

Also remove the now-unused import at line 10:
```tsx
// Remove:
import { LandingLink } from "./landing-link";
```

- [ ] **Step 2: Remove the `link` prop from testimonial card rendering**

In `src/components/landing/testimonials-carousel.tsx`, remove the card link rendering (lines 261-264) from the `Card` component:

```tsx
// Remove this block from the Card component:
			{t.link && (
				<LandingLink href={t.link.href} size="sm">
					{t.link.text}
				</LandingLink>
			)}
```

Also remove the `link` field from the `Testimonial` interface (line 20):
```tsx
// Remove:
	link?: { text: string; href: string };
```

- [ ] **Step 3: Remove `link` properties from testimonial data in the landing page**

In `src/routes/_landing/index.tsx`, find the testimonials array and remove any `link: { text: "...", href: "#" }` properties from the testimonial objects.

- [ ] **Step 4: Run biome check**

Run: `bun --bun run check`
Expected: No errors. If `LandingLink` import is flagged as unused elsewhere, remove it.

- [ ] **Step 5: Run dev server and verify testimonials render without dead links**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/`
Expected: Testimonial cards show avatar, name, role, quote — no link buttons. "Read more stories" link is gone from the header area.

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/testimonials-carousel.tsx src/routes/_landing/index.tsx
git commit -m "fix: remove dead links from testimonials carousel"
```

---

### Task 6: Create `/terms` Page

**Files:**
- Create: `src/routes/_landing/terms.tsx`

- [ ] **Step 1: Create the terms route**

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/terms")({
	head: () => ({
		meta: [
			{ title: "Terms of Service — Cervo" },
			{
				name: "description",
				content: "Cervo Terms of Service",
			},
		],
	}),
	component: TermsPage,
});

function TermsPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-8 font-heading text-3xl font-bold text-white lg:text-4xl">
				Terms of Service
			</h1>
			<p className="mb-6 font-sans text-sm text-[#8a8a8a]">
				Last updated: March 25, 2026
			</p>
			<div className="flex flex-col gap-8 font-sans text-base leading-[1.8] text-[#A3A3A3]">
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						1. Acceptance of Terms
					</h2>
					<p>
						By accessing or using Cervo ("the Service"), you agree to be bound
						by these Terms of Service. If you do not agree to these terms, do
						not use the Service.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						2. Description of Service
					</h2>
					<p>
						Cervo is an AI-powered bookmark management tool that helps you save,
						organize, and search your bookmarks. We reserve the right to modify
						or discontinue the Service at any time.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						3. User Obligations
					</h2>
					<p>
						You are responsible for maintaining the security of your account and
						for all activities that occur under your account. You agree not to
						use the Service for any unlawful purpose.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						4. Limitation of Liability
					</h2>
					<p>
						The Service is provided "as is" without warranties of any kind.
						Cervo shall not be liable for any indirect, incidental, or
						consequential damages arising from your use of the Service.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						5. Changes to Terms
					</h2>
					<p>
						We may update these terms from time to time. Continued use of the
						Service after changes constitutes acceptance of the new terms.
					</p>
				</section>
			</div>
		</div>
	);
}
```

- [ ] **Step 2: Run dev server and verify `/terms` renders**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/terms`
Expected: Terms page renders with navbar (from layout), content, and footer.

- [ ] **Step 3: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_landing/terms.tsx
git commit -m "feat: add terms of service page"
```

---

### Task 7: Create `/privacy` Page

**Files:**
- Create: `src/routes/_landing/privacy.tsx`

- [ ] **Step 1: Create the privacy route**

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — Cervo" },
			{
				name: "description",
				content: "Cervo Privacy Policy",
			},
		],
	}),
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-8 font-heading text-3xl font-bold text-white lg:text-4xl">
				Privacy Policy
			</h1>
			<p className="mb-6 font-sans text-sm text-[#8a8a8a]">
				Last updated: March 25, 2026
			</p>
			<div className="flex flex-col gap-8 font-sans text-base leading-[1.8] text-[#A3A3A3]">
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						1. Information We Collect
					</h2>
					<p>
						We collect information you provide when creating an account,
						including your name and email address via third-party OAuth providers
						(Google, GitHub). We also collect the bookmarks and links you save to
						the Service.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						2. How We Use Your Information
					</h2>
					<p>
						We use your information to provide and improve the Service, including
						AI-powered features like semantic search and automatic tagging. We do
						not sell your personal data to third parties.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						3. Third-Party Services
					</h2>
					<p>
						We use Google and GitHub for authentication. These providers may
						collect information according to their own privacy policies. We
						encourage you to review their policies.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						4. Data Security
					</h2>
					<p>
						We implement reasonable security measures to protect your
						information. However, no method of transmission over the Internet is
						100% secure.
					</p>
				</section>
				<section>
					<h2 className="mb-4 text-xl font-semibold text-white">
						5. Contact
					</h2>
					<p>
						If you have questions about this Privacy Policy, please reach out
						through our Discord community.
					</p>
				</section>
			</div>
		</div>
	);
}
```

- [ ] **Step 2: Run dev server and verify `/privacy` renders**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/privacy`
Expected: Privacy page renders with navbar, content, and footer.

- [ ] **Step 3: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_landing/privacy.tsx
git commit -m "feat: add privacy policy page"
```

---

### Task 8: Create `/changelog` Page

**Files:**
- Create: `src/routes/_landing/changelog.tsx`

- [ ] **Step 1: Create the changelog route**

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/changelog")({
	head: () => ({
		meta: [
			{ title: "Changelog — Cervo" },
			{
				name: "description",
				content: "See what's new in Cervo",
			},
		],
	}),
	component: ChangelogPage,
});

interface ChangelogEntry {
	date: string;
	version: string;
	title: string;
	changes: string[];
}

const entries: ChangelogEntry[] = [
	{
		date: "March 25, 2026",
		version: "0.1.0",
		title: "Initial Release",
		changes: [
			"Save bookmarks with a single click",
			"AI-powered semantic search across all your links",
			"Automatic tag suggestions based on content",
			"Google and GitHub sign-in",
			"Workspace support for organizing bookmarks",
		],
	},
];

function ChangelogPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
				Changelog
			</h1>
			<p className="mb-12 font-sans text-base text-[#8a8a8a]">
				New updates and improvements to Cervo.
			</p>
			<div className="flex flex-col gap-12">
				{entries.map((entry) => (
					<article
						key={entry.version}
						className="border-l border-[#2f2f2f] pl-6"
					>
						<div className="mb-2 flex items-center gap-3">
							<span className="font-mono text-sm font-semibold text-primary">
								v{entry.version}
							</span>
							<span className="font-sans text-sm text-[#6a6a6a]">
								{entry.date}
							</span>
						</div>
						<h2 className="mb-4 font-sans text-xl font-semibold text-white">
							{entry.title}
						</h2>
						<ul className="flex flex-col gap-2">
							{entry.changes.map((change) => (
								<li
									key={change}
									className="font-sans text-base leading-[1.7] text-[#A3A3A3]"
								>
									{change}
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</div>
	);
}
```

- [ ] **Step 2: Run dev server and verify `/changelog` renders**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/changelog`
Expected: Changelog page renders with version entry, navbar, and footer.

- [ ] **Step 3: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_landing/changelog.tsx
git commit -m "feat: add changelog page"
```

---

### Task 9: Create `/blog` Page

**Files:**
- Create: `src/routes/_landing/blog.tsx`

- [ ] **Step 1: Create the blog listing route**

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/blog")({
	head: () => ({
		meta: [
			{ title: "Blog — Cervo" },
			{
				name: "description",
				content: "Updates, tips, and insights from the Cervo team",
			},
		],
	}),
	component: BlogPage,
});

interface BlogEntry {
	date: string;
	title: string;
	description: string;
}

const posts: BlogEntry[] = [
	{
		date: "March 25, 2026",
		title: "Introducing Cervo",
		description:
			"We built Cervo because saving a bookmark should be the beginning of finding it again, not the end. Here's our vision for AI-powered bookmark management.",
	},
];

function BlogPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
			<h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
				Blog
			</h1>
			<p className="mb-12 font-sans text-base text-[#8a8a8a]">
				Updates, tips, and insights from the Cervo team.
			</p>
			<div className="flex flex-col gap-8">
				{posts.map((post) => (
					<article
						key={post.title}
						className="border-b border-[#2f2f2f] pb-8 last:border-b-0"
					>
						<span className="mb-2 block font-sans text-sm text-[#6a6a6a]">
							{post.date}
						</span>
						<h2 className="mb-3 font-sans text-xl font-semibold text-white">
							{post.title}
						</h2>
						<p className="font-sans text-base leading-[1.7] text-[#A3A3A3]">
							{post.description}
						</p>
					</article>
				))}
			</div>
		</div>
	);
}
```

Note: Blog entries are intentionally **not clickable** — no detail pages exist for MVP.

- [ ] **Step 2: Run dev server and verify `/blog` renders**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/blog`
Expected: Blog listing page renders with one entry, navbar, and footer.

- [ ] **Step 3: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_landing/blog.tsx
git commit -m "feat: add blog listing page"
```

---

### Task 10: Create `/discord` Redirect Route

**Files:**
- Create: `src/routes/_landing/discord.tsx`

- [ ] **Step 1: Create the discord redirect route**

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

// TODO: Replace with actual Discord invite URL before shipping
const DISCORD_INVITE_URL = "https://discord.gg/YOUR_INVITE_CODE";

export const Route = createFileRoute("/_landing/discord")({
	beforeLoad: () => {
		throw redirect({ href: DISCORD_INVITE_URL });
	},
	component: DiscordRedirect,
});

function DiscordRedirect() {
	return (
		<div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-24">
			<p className="font-sans text-base text-[#A3A3A3]">
				Redirecting to Discord...
			</p>
		</div>
	);
}
```

Note: Replace `YOUR_INVITE_CODE` with the actual Discord invite code. The `beforeLoad` hook performs a server-side redirect. The component is a fallback that rarely renders.

- [ ] **Step 2: Run dev server and verify `/discord` redirects**

Run: `bun --bun run dev`
Navigate to: `http://localhost:3000/discord`
Expected: Browser redirects to the Discord invite URL. (Will show an error if invite code is placeholder — that's expected for now.)

- [ ] **Step 3: Run biome check**

Run: `bun --bun run check`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/_landing/discord.tsx
git commit -m "feat: add discord redirect route"
```

---

### Task 11: Final Verification

- [ ] **Step 1: Run full biome check**

Run: `bun --bun run check`
Expected: No lint or format errors across the entire project.

- [ ] **Step 2: Run TypeScript check**

Run: `bunx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Run tests**

Run: `bun --bun run test`
Expected: All tests pass.

- [ ] **Step 4: Manual smoke test**

Navigate to each route and verify:
- `/` — Landing page with navbar, all sections, footer (2 columns)
- `/terms` — Terms of Service page with navbar + footer
- `/privacy` — Privacy Policy page with navbar + footer
- `/changelog` — Changelog page with navbar + footer
- `/blog` — Blog listing page with navbar + footer
- `/discord` — Redirects to Discord invite URL
- Navbar "Discord" link navigates to `/discord`
- Footer links all work (anchor scrolls for Features/Pricing, route navigation for the rest)

- [ ] **Step 5: Commit any final fixes if needed**
