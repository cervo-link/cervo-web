# Landing Page Link Cleanup — MVP Audit

## Problem

The landing page footer contains 28 anchor links pointing to non-existent pages (`#changelog`, `#roadmap`, `#api`, etc.). The navbar also has a dead `#discord` link with no corresponding section on the page. Dead links hurt credibility for an MVP.

## Decision

Aggressively trim the footer to only links that are real, legally needed, or planned for immediate build. Fix the navbar `#discord` dead link. Remove all aspirational/placeholder links.

## Navbar Changes

Current structure stays mostly intact, with one fix:

- Logo `/`
- Features `#features`, How it Works `#how-it-works`, Pricing `#pricing`, FAQ `#faq` (anchor scrolls to existing landing page sections)
- **Discord: change from `#discord` (dead anchor) to `/discord` (new internal page)**
- Get Started `/sign-in`

## Footer Redesign

Replace the current 4-column, 28-link footer with a 2-column layout + copyright row.

### Column 1 — Product

| Link | Target | Notes |
|---|---|---|
| Features | `#features` | Anchor scroll, exists |
| Pricing | `#pricing` | Anchor scroll, exists |
| Changelog | `/changelog` | New page |
| Blog | `/blog` | New page |
| Discord | `/discord` | New page |

### Column 2 — Legal

| Link | Target | Notes |
|---|---|---|
| Terms of Service | `/terms` | New page |
| Privacy Policy | `/privacy` | New page |
| Sign In | `/sign-in` | Exists |

### Bottom Row

Copyright text only. No social icons.

### Removed Links (20 total)

- **Product column:** Roadmap, Discord Bot, API Reference, Browser Extension
- **Resources column:** Documentation, Getting Started, Blog (moved to Product), Terms of Service (moved to Legal), Privacy Policy (moved to Legal), Security
- **Account column:** Create Account (redundant — same `/sign-in` target), Manage Workspace, Invite Members, Settings
- **Support column:** Contact Us, FAQ (already in navbar), Status Page, Discord Community (moved to Product), Twitter/X
- **Social row:** Twitter/X icon

## Layout Strategy

The landing page currently lives at `src/routes/_app/index.tsx` inside the authenticated `_app` layout. New public pages need a shared layout for the landing navbar and footer.

**Decision: introduce a `_landing.tsx` pathless layout route.**

This layout wraps all public-facing pages with `LandingNavbar` and `LandingFooter`, consistent with how `_app` and `_auth` work as pathless layout routes.

The landing page index route will migrate from `_app/index.tsx` to `_landing/index.tsx`. This is a necessary migration to properly separate public and authenticated routes.

```
src/routes/
  _landing.tsx              # New layout: LandingNavbar + LandingFooter
  _landing/
    index.tsx               # Landing page (migrated from _app/index.tsx)
    changelog.tsx
    blog.tsx
    discord.tsx
    terms.tsx
    privacy.tsx
```

## New Pages (5)

All pages use the `_landing` layout. All content is static/hardcoded for MVP — no CMS. Internal route links use TanStack Router's `<Link>` component for client-side navigation.

### `/changelog`
Static page listing version entries. Each entry has a date and description. Hardcoded content.

### `/blog`
Static listing page with hardcoded entries. Each entry shows title, date, and a brief description. Entries are **not clickable** — no detail pages for MVP (avoids creating more dead links).

### `/discord`
**Redirect to the Discord invite URL.** No standalone page — the route performs a server-side or client-side redirect to the `discord.gg` invite link. This avoids maintaining a near-empty page.

### `/terms`
Static Terms of Service page. Use placeholder content generated with a tool like Termly, or write minimal SaaS-standard terms covering: service description, user obligations, limitation of liability, and governing law. Placeholder is acceptable for MVP.

### `/privacy`
Static Privacy Policy page. Same approach as Terms — use a generator or write minimal policy covering: data collected, how it's used, third-party services (Google/GitHub OAuth), and contact info. Placeholder is acceptable for MVP.

## Additional Cleanup

- Remove the "Read more stories" link (`#stories`) from the testimonials carousel in `testimonials-carousel.tsx` — this is a dead anchor link.
- Remove the dead `href="#"` placeholder links on individual testimonial cards.

## Implementation Order

1. Create `_landing.tsx` layout route with `LandingNavbar` + `LandingFooter`
2. Migrate landing page from `_app/index.tsx` to `_landing/index.tsx`
3. Update `landing-footer.tsx` — replace 4-column layout with new 2-column layout
4. Fix navbar `#discord` link to point to `/discord`
5. Create `/terms` and `/privacy` pages (legal, often required by OAuth providers)
6. Create `/changelog` page
7. Create `/blog` page
8. Create `/discord` redirect route
9. Remove dead links from testimonials carousel (`#stories`, `href="#"`)

## Out of Scope

- CMS or admin interface for blog/changelog
- RSS feeds
- Blog post detail pages (just a listing for now — entries are not clickable)
- Social media integration
- Contact form
- Status page
