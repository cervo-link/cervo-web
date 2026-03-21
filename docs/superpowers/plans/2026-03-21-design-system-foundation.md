# Design System Foundation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remap shadcn's CSS variables to Pencil's Neutral/Dark themed palette, install all needed shadcn components, and swap the font to JetBrains Mono.

**Architecture:** CSS-variables-only approach — no component markup changes. A single `:root` block with dark theme values replaces the existing light/dark split. JetBrains Mono Variable loaded via Fontsource.

**Tech Stack:** Tailwind CSS v4, shadcn (new-york style), Fontsource, TanStack Start (React 19)

---

## Chunk 1: Dependencies & Configuration

### Task 1: Install JetBrains Mono font

**Files:**
- Modify: `package.json` (new dependency added by bun)

- [ ] **Step 1: Install the fontsource package**

Run: `bun add @fontsource-variable/jetbrains-mono`
Expected: Package added to `dependencies` in `package.json`

- [ ] **Step 2: Verify installation**

Run: `ls node_modules/@fontsource-variable/jetbrains-mono/index.css`
Expected: File exists

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "feat: add @fontsource-variable/jetbrains-mono"
```

---

### Task 2: Update shadcn configuration

**Files:**
- Modify: `components.json`

- [ ] **Step 1: Change baseColor from zinc to neutral**

In `components.json`, change:
```json
"baseColor": "zinc",
```
to:
```json
"baseColor": "neutral",
```

- [ ] **Step 2: Commit**

```bash
git add components.json
git commit -m "chore: update shadcn baseColor to neutral"
```

---

### Task 3: Install shadcn components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/command.tsx`
- Create: `src/components/ui/input-otp.tsx`
- Create: `src/components/ui/sonner.tsx`
- Create: `src/components/ui/alert.tsx`
- Create: `src/components/ui/progress.tsx`
- Create: `src/components/ui/tooltip.tsx`
- Create: `src/components/ui/sidebar.tsx`
- Create: `src/components/ui/tabs.tsx`
- Create: `src/components/ui/breadcrumb.tsx`
- Create: `src/components/ui/pagination.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/dropdown-menu.tsx`
- Create: `src/components/ui/sheet.tsx`
- Create: `src/components/ui/table.tsx`
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/radio-group.tsx`
- Create: `src/components/ui/switch.tsx`
- Create: `src/components/ui/avatar.tsx`
- Create: `src/components/ui/label.tsx`
- Create: `src/components/ui/popover.tsx` (auto-dependency)
- Modify: `package.json` (new radix dependencies added by shadcn)

- [ ] **Step 1: Install all 23 components in one batch**

Run:
```bash
bunx shadcn@latest add button input textarea select command input-otp sonner alert progress tooltip sidebar tabs breadcrumb pagination dialog dropdown-menu sheet table accordion radio-group switch avatar label --yes
```
Expected: All component files created in `src/components/ui/`. The `--yes` flag accepts all prompts (overwrite existing files if any).

- [ ] **Step 2: Verify key component files exist**

Run: `ls src/components/ui/button.tsx src/components/ui/input.tsx src/components/ui/dialog.tsx src/components/ui/sidebar.tsx`
Expected: All four files listed

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ package.json bun.lock
git commit -m "feat: install 23 shadcn components for design system"
```

---

## Chunk 2: Theme & Font

### Task 4: Remap CSS variables to Pencil's Neutral/Dark palette

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Remove `@custom-variant dark` directive**

Delete line 5 of `src/styles.css`:
```css
@custom-variant dark (&:is(.dark *));
```

- [ ] **Step 2: Replace `:root` and `.dark` blocks with a single dark-only `:root`**

Replace the existing `:root { ... }` block (lines 21-55) and `.dark { ... }` block (lines 57-90) with:

```css
:root {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #171717;
  --card-foreground: #fafafa;
  --popover: #171717;
  --popover-foreground: #fafafa;
  --primary: #e5e5e5;
  --primary-foreground: #171717;
  --secondary: #262626;
  --secondary-foreground: #fafafa;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --accent: #262626;
  --accent-foreground: #fafafa;
  --destructive: #ff6666;
  --destructive-foreground: #fafafa;
  --border: #ffffff1a;
  --input: #ffffff1a;
  --ring: #737373;
  --chart-1: #e5e5e5;
  --chart-2: #a3a3a3;
  --chart-3: #737373;
  --chart-4: #525252;
  --chart-5: #262626;
  --radius: 0.625rem;
  --sidebar: #18181b;
  --sidebar-foreground: #fafafa;
  --sidebar-primary: #1447e6;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #2a2a30;
  --sidebar-accent-foreground: #fafafa;
  --sidebar-border: #ffffff1a;
  --sidebar-ring: #71717a;
}
```

- [ ] **Step 3: Leave `@theme inline` and `@layer base` blocks unchanged**

Verify these blocks remain in `src/styles.css` as-is. Do not modify them.

- [ ] **Step 4: Commit**

```bash
git add src/styles.css
git commit -m "feat: remap CSS variables to Pencil Neutral/Dark palette"
```

---

### Task 5: Set up JetBrains Mono font

**Files:**
- Modify: `src/styles.css`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Update body font-family in `src/styles.css`**

Replace the existing `body` rule (inside the top-level CSS, not inside `@layer base`):
```css
body {
  @apply m-0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

with:
```css
body {
  @apply m-0;
  font-family: 'JetBrains Mono Variable', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: Add fontsource import in `src/routes/__root.tsx`**

Add this import at the top of the file, after the existing imports:
```typescript
import "@fontsource-variable/jetbrains-mono"
```

- [ ] **Step 3: Remove `font-sans` from body className in `src/routes/__root.tsx`**

In `src/routes/__root.tsx` line 56, the `<body>` element has `className="font-sans antialiased ..."`. The `font-sans` Tailwind class would override the CSS `font-family` rule. Remove `font-sans` from the className:

Change:
```tsx
<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
```
to:
```tsx
<body className="antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
```

- [ ] **Step 4: Commit**

```bash
git add src/styles.css src/routes/__root.tsx
git commit -m "feat: set JetBrains Mono as default font via Fontsource"
```

---

### Task 6: Simplify theme init script for dark-only mode

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Replace `THEME_INIT_SCRIPT` constant**

Replace the existing `THEME_INIT_SCRIPT` (line 23 of `src/routes/__root.tsx`):
```typescript
const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`
```

with:
```typescript
const THEME_INIT_SCRIPT = `(function(){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';})();`
```

- [ ] **Step 2: Verify the app builds**

Run: `bun run build`
Expected: Build completes without errors

- [ ] **Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "chore: simplify theme init script for dark-only mode"
```

---

### Task 7: Verify TypeScript and Biome compliance

**Files:**
- All modified files

- [ ] **Step 1: Run TypeScript check**

Run: `bunx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run Biome check**

Run: `bun run check`
Expected: No errors (or only pre-existing ones)

- [ ] **Step 3: Fix any issues found**

If TypeScript or Biome report errors in files we modified, fix them.

- [ ] **Step 4: Commit fixes if any**

```bash
git add -A
git commit -m "fix: resolve TypeScript and Biome issues"
```
