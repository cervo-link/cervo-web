# W2 AI Enrichment Wireframe Animation Design

## Overview

Add a pure CSS animation to the AI Enrichment wireframe (`ai-enrichment-wireframe.tsx`) following the same patterns established by W1 (Semantic Search). The animation tells the story of "before -> AI processes -> after" with a rotating spotlight that highlights a different enrichment aspect each cycle run.

## Cycle Structure

**3 runs x 6.5s = 19.5s total cycle**, infinite loop (matching W1).

Each run follows the same base timeline but spotlights a different enriched element:

| Phase       | Per-run timing | Duration | What happens                                                                 |
|-------------|----------------|----------|------------------------------------------------------------------------------|
| Appear      | 0-1s           | 1s       | Plain card fades in (opacity 0->1), enriched card hidden                     |
| Process     | 1-2.5s         | 1.5s     | Sparkles badge pulses (opacity + scale 1->1.1->1), plain card visible       |
| Reveal      | 2.5-4s         | 1.5s     | Enriched card fades in (opacity 0->1), plain card dims (opacity 1->0.5)     |
| Spotlight   | 4-5.5s         | 1.5s     | One element glows green (varies per run, see below)                          |
| Snap-hidden | 5.5-6s         | 0.5s     | Everything snaps to opacity 0 (keyframe jump, not gradual fade)             |
| Silent reset| 6-6.5s         | 0.5s     | All transforms/colors reset while hidden                                     |

**Snap-hidden detail:** The opacity drop from 1 to 0 must be a keyframe jump between adjacent percentages (e.g., `28.2% { opacity: 1 }` to `28.7% { opacity: 0 }`), not a gradual transition across the full snap phase. This matches the W1 pattern.

## Spotlight Rotation

Both tags animate together in Run 1 (not one per run).

- **Run 1 - Tags glow:** Both tag pill backgrounds pulse `primary/20 -> primary/40 -> primary/20`. The inner tag bars stay `primary` (their default) — only the backgrounds change.
- **Run 2 - Summary pulses:** Summary header bar transitions `#A3A3A3 -> primary -> #A3A3A3`
- **Run 3 - Title brightens:** Enriched card title bar transitions `white -> primary -> white`

## Animated Elements

Only existing DOM elements are animated. No new elements added.

**Animated:**

| Element                 | Animation class       | Properties animated     |
|-------------------------|-----------------------|-------------------------|
| Plain card container    | `animate-w2-plain`    | opacity                 |
| Enriched card container | `animate-w2-enriched` | opacity                 |
| Sparkles badge          | `animate-w2-sparkle`  | opacity, transform      |
| Tag pill 1 background   | `animate-w2-tag1-bg`  | background-color        |
| Tag pill 2 background   | `animate-w2-tag2-bg`  | background-color        |
| Summary header          | `animate-w2-summary`  | background-color        |
| Enriched title          | `animate-w2-title`    | background-color        |

**Not animated (inherit parent opacity):** Plain card favicon dot, title bar, description lines, URL bar. Enriched card tag inner bars (stay `primary`), separator line, description lines. Green border on enriched card is always present — visibility controlled by parent container opacity.

## Animation Properties

- `animation-timing-function: linear` — required for sharp keyframe jumps in snap-hidden phase
- `animation-fill-mode: none` — animation loops infinitely, no fill needed
- `animation-iteration-count: infinite`
- `animation-duration: 19.5s`

## Keyframe Percentages (19.5s total)

Each run occupies 33.3% of the total keyframes:

| Run | Appear     | Process      | Reveal       | Spotlight    | Snap         | Reset        |
|-----|------------|--------------|--------------|--------------|--------------|--------------|
| 1   | 0-5.1%     | 5.1-12.8%    | 12.8-20.5%   | 20.5-28.2%   | 28.2-30.8%   | 30.8-33.3%   |
| 2   | 33.3-38.5% | 38.5-46.2%   | 46.2-53.8%   | 53.8-61.5%   | 61.5-64.1%   | 64.1-66.7%   |
| 3   | 66.7-71.8% | 71.8-79.5%   | 79.5-87.2%   | 87.2-94.9%   | 94.9-97.4%   | 97.4-100%    |

## Responsive Behavior

Only opacity and color properties are animated — no `translateY` or position changes. The responsive layout differences (card sizes, sparkles badge position) are handled by existing Tailwind breakpoint classes and are unaffected by the animation. No CSS variables or responsive animation adjustments needed.

## Files Modified

1. **`src/styles.css`** — Add `@keyframes w2-*` definitions and `.animate-w2-*` utility classes at the bottom of the file, below existing W1 keyframes.
2. **`src/components/landing/wireframes/ai-enrichment-wireframe.tsx`** — Add `animate-w2-*` classes to the appropriate JSX elements.

## Constraints

- Pure CSS keyframes only (no JS state, no useEffect)
- All keyframes in `styles.css` with `w2-` prefix
- No new DOM elements
- No `scale()` on flex rows (sparkles badge uses `position: absolute`, so scale is safe)
- Snap-hidden reset at end of each run (opacity 0 before transform reset)
- Dark mode colors: `#333333` bars, `#6a6a6a` dim text, `#A3A3A3` lighter text, `white` bright text, `var(--primary)` green

## Verification Checklist

- [ ] Biome check passes on modified files
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] Desktop layout: cards animate correctly at `lg:` breakpoint
- [ ] Mobile layout: cards animate correctly at default breakpoint
- [ ] No visible reset: snap-hidden transition is invisible (keyframe jump)
- [ ] Sparkles badge scale doesn't cause layout shift (absolute positioned)
- [ ] No horizontal drift: elements don't shift left/right during animation
- [ ] Bar width stable: highlighted elements change color only, not size
- [ ] Each run spotlights the correct element (tags, summary, title)
- [ ] Both tags animate together in Run 1
- [ ] `use-scroll-animation.ts` reverted to `useState(false)` before commit
