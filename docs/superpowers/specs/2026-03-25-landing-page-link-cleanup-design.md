# Landing Page Link Cleanup — MVP Audit

## Problem

The landing page footer contains 28 anchor links pointing to non-existent pages (`#changelog`, `#roadmap`, `#api`, etc.). Dead links hurt credibility for an MVP. The navbar is clean and needs no changes.

## Decision

Aggressively trim the footer to only links that are real, legally needed, or planned for immediate build. Remove all aspirational/placeholder links.

## Navbar (No Changes)

Keep current structure:
- Logo `/`
- Features `#features`, How it Works `#how-it-works`, Pricing `#pricing`, Discord `#discord`, FAQ `#faq` (anchor scrolls to existing landing page sections)
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

### Removed Links (19 total)

- **Product column:** Roadmap, Discord Bot, API Reference, Browser Extension
- **Resources column:** Documentation, Getting Started, Blog (moved to Product), Terms of Service (moved to Legal), Privacy Policy (moved to Legal), Security
- **Account column:** Create Account (redundant — same `/sign-in` target), Manage Workspace, Invite Members, Settings
- **Support column:** Contact Us, FAQ (already in navbar), Status Page, Discord Community (moved to Product), Twitter/X
- **Social row:** Twitter/X icon

## New Pages (5)

All pages are public-facing, using the landing page layout (not the `_app` authenticated layout). All content is static/hardcoded for MVP — no CMS.

### `/changelog`
Static page listing version entries. Each entry has a date and description. Hardcoded content.

### `/blog`
Static listing page. Blog posts are hardcoded route files or markdown rendered at build time. No dynamic content.

### `/discord`
Simple page with a Discord invite link and brief community description. Could alternatively be a redirect to the `discord.gg` invite link.

### `/terms`
Static Terms of Service page with standard SaaS terms.

### `/privacy`
Static Privacy Policy page with standard SaaS privacy policy.

## Routing

New pages are public routes outside the `_app` layout. They should be accessible without authentication. Suggested route structure:

```
src/routes/
  changelog.tsx
  blog.tsx
  discord.tsx
  terms.tsx
  privacy.tsx
```

These are standalone routes (not under `_app/` or `_auth/`), so they render without the authenticated app shell. They should share the landing page's visual style (dark theme, same fonts, similar layout to other landing sections).

## Implementation Order

1. Update `landing-footer.tsx` — replace current 4-column layout with new 2-column layout
2. Create `/terms` and `/privacy` pages (legal, often required by OAuth providers)
3. Create `/changelog` page
4. Create `/blog` page
5. Create `/discord` page
6. Remove dead testimonial placeholder links (`href="#"`)

## Out of Scope

- CMS or admin interface for blog/changelog
- RSS feeds
- Blog post detail pages (just a listing for now)
- Social media integration
- Contact form
- Status page
