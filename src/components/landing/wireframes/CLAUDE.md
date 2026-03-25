# Wireframe Animations Guide

Patterns and learnings from implementing landing page wireframe animations. Follow this guide when adding animations to remaining wireframes.

## Architecture

- **Pure CSS keyframes** — no `useEffect`, `useState`, or JS state machines. SSR hydration in TanStack Start prevents `useEffect` from reliably firing. CSS animations work immediately on paint.
- **Keyframes in `src/styles.css`** — all `@keyframes` and `.animate-*` classes live at the bottom of `styles.css`, prefixed per wireframe (`w1-*`, `w2-*`, etc.).
- **Animation classes on JSX elements** — components in `src/components/landing/wireframes/` apply `animate-w1-*` classes directly. No wrapper components or hooks needed.

## Key Patterns (from W1: Semantic Search)

### Multi-sequence cycles

To show different variations of the same animation (e.g., different search results matching), multiply the single-run duration by the number of sequences. W1 uses 3 runs × 6.5s = 19.5s total cycle. Each run occupies 33.3% of the keyframes.

### Responsive swap offsets with CSS variables

`translateY` percentage is relative to the element's own height. The pixel gap offset varies by breakpoint. Define CSS variables on the container for each gap multiplier:

```html
<div class="[--w1-g2:28px] [--w1-g3:42px] [--w1-g5:70px] lg:[--w1-g2:32px] lg:[--w1-g3:48px] lg:[--w1-g5:80px]">
```

Reference in keyframes: `translateY(calc(500% + var(--w1-g5)))`. Formula: `N × gap-px` where N = number of gaps between source and target row.

### Snap-hidden reset (no visible rewind)

At 92-93% of the cycle, snap all elements to `opacity: 0` while still in their animated position. Then silently reset transforms at 100%. This prevents the user from seeing elements slide back.

```css
92% { opacity: 1; transform: translateY(...); }
93% { opacity: 0; transform: translateY(...); }  /* snap hidden */
100% { opacity: 0; transform: translateY(0); }   /* silent reset */
```

### Highlight blink effect

Before swapping a highlighted row, blink the green bar twice to draw attention:

```css
16.4% { background-color: #333333; }  /* start */
17%   { background-color: var(--primary); }  /* blink 1 on */
17.6% { background-color: #333333; }         /* blink 1 off */
18.2% { background-color: var(--primary); }  /* blink 2 on */
18.8% { background-color: #333333; }         /* blink 2 off */
19.4% { background-color: var(--primary); }  /* settle green */
```

### No `scale()` transforms on rows

Using `scale(0.95) → scale(1.02) → scale(1)` for bounce-in causes horizontal drift on flex rows. Use only `opacity` for appear/disappear. If bounce is needed, use `scaleY()` only.

### Query text color sync

When a result highlights green, simultaneously change the search input placeholder from gray to green using `background-color` in the same keyframe timing.

## Constraints

- **No new DOM elements** — only animate properties of existing wireframe elements. Don't add text, icons, or decorative elements that weren't in the original wireframe.
- **Dark mode colors** — backgrounds: `#333333` (bars), `#6a6a6a` (dim text), `#A3A3A3` (lighter text), `#ffffff` (bright text). Green: `var(--primary)`. Border gray: `#6a6a6a`.
- **Mixed widths** — result row widths should look organic, not follow a descending ladder pattern.

## Verification Checklist

When implementing or modifying wireframe animations, verify:

- [ ] **Biome check passes** — `bun --bun run check -- src/components/landing/wireframes/<file>.tsx`
- [ ] **No console errors** — check browser dev tools console
- [ ] **No server errors** — check dev server terminal output
- [ ] **Desktop layout** — elements swap to correct positions at `lg:` breakpoint
- [ ] **Mobile layout** — elements swap to correct positions at default breakpoint (CSS vars adapt gap offsets)
- [ ] **No visible reset** — animation cycle transition is invisible (snap-hidden at 93%)
- [ ] **No horizontal drift** — elements don't shift left/right during animation (avoid `scale()` on flex rows)
- [ ] **Bar width stable** — highlighted bar changes color only, not size
- [ ] **Multi-sequence consistency** — each run in the cycle highlights the correct element
- [ ] **Scroll animation compatibility** — `use-scroll-animation.ts` uses `useState(false)` in production (set to `true` temporarily for dev preview only, revert before commit)

## Remaining Wireframes

| # | Wireframe | File | Status |
|---|-----------|------|--------|
| W1 | Semantic Search | `semantic-search-wireframe.tsx` | Done |
| W2 | AI Enrichment | `ai-enrichment-wireframe.tsx` | Pending |
| W3 | Shared Workspaces | `shared-workspaces-wireframe.tsx` | Has cursor animation (Web Animations API) |
| W4 | Discord Integration | `discord-wireframe.tsx` | Pending |
| W5 | Smart Tags | `smart-tags-wireframe.tsx` | Pending |
| W6 | Rich Link Details | `rich-link-wireframe.tsx` | Pending |
| W7 | Duplicate Detection | `duplicate-detection-wireframe.tsx` | Pending |
| W8 | Public Workspaces | `public-workspaces-wireframe.tsx` | Pending |
| W9 | Privacy & Controls | `privacy-wireframe.tsx` | Pending |

## Dev Workflow

1. Set `useState(true)` in `src/components/landing/use-scroll-animation.ts` to bypass scroll-triggered visibility during development
2. Run `bun --bun run dev` and preview the landing page
3. Implement animation as pure CSS keyframes in `styles.css`
4. Verify with the checklist above
5. **Revert** `use-scroll-animation.ts` back to `useState(false)` before committing
