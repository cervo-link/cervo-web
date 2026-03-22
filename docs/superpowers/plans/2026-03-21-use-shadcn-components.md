# Use shadcn Components Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace raw HTML elements with shadcn `<Button>` component across 3 files.

**Architecture:** Swap custom-styled `<button>` and `<Link>` elements for shadcn's `<Button>` with appropriate variants (`outline`, `default`) and `asChild` for router links.

**Tech Stack:** React, shadcn/ui, TanStack Router

**Spec:** `docs/superpowers/specs/2026-03-21-use-shadcn-components-design.md`

---

### Task 1: Replace raw buttons in sign-in page

**Files:**
- Modify: `src/routes/_auth/sign-in.tsx`

- [ ] **Step 1: Add Button import and replace both raw `<button>` elements**

Replace the two raw `<button>` elements (Google and GitHub) with:

```tsx
import { Button } from "#/components/ui/button";

// Google button (replace lines 37-44):
<Button
  variant="outline"
  size="lg"
  onClick={handleGoogle}
  className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
>
  <GoogleIcon className="size-4" />
  <span className="text-sm font-bold tracking-wide">GOOGLE</span>
</Button>

// GitHub button (replace lines 46-53) — same pattern:
<Button
  variant="outline"
  size="lg"
  onClick={handleGithub}
  className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
>
  <Github className="size-4" />
  <span className="text-sm font-bold tracking-wide">GITHUB</span>
</Button>
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` and `npx biome check src/routes/_auth/sign-in.tsx`
Expected: No new errors

---

### Task 2: Replace styled Link in Header

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Add Button import and wrap the SIGN IN link**

Replace the raw `<Link>` styled as a button (lines 32-37) with:

```tsx
import { Button } from "#/components/ui/button";

<Button
  variant="outline"
  size="sm"
  asChild
  className="border-primary text-primary text-xs font-bold tracking-wide hover:bg-primary/10 hover:text-primary"
>
  <Link to="/sign-in">SIGN IN</Link>
</Button>
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` and `npx biome check src/components/Header.tsx`
Expected: No new errors

---

### Task 3: Replace styled Link on home page

**Files:**
- Modify: `src/routes/_app/index.tsx`

- [ ] **Step 1: Add Button import and wrap the View Components link**

Replace the raw `<Link>` styled as a button (lines 15-20) with:

```tsx
import { Button } from "#/components/ui/button";

<Button size="lg" asChild>
  <Link to="/components">View Components</Link>
</Button>
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` and `npx biome check src/routes/_app/index.tsx`
Expected: No new errors

---

### Task 4: Final verification

- [ ] **Step 1: Run full checks**

Run: `npx tsc --noEmit` and `npx biome check src/`
Expected: No new errors in any modified files
