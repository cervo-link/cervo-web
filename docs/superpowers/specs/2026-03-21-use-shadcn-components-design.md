# Replace custom-styled elements with shadcn components

## Problem

Several pages use raw HTML elements (`<button>`, `<Link>` styled as buttons) with custom Tailwind classes instead of the project's shadcn `<Button>` component. This creates inconsistency and duplicates styling that the design system already handles.

## Scope

Main app pages only. Demo pages (`better-auth.tsx`, `mcp-todos.tsx`) are excluded.

## Changes

### 1. `src/routes/_auth/sign-in.tsx`

**Current:** Two raw `<button>` elements with manual border/hover styling for Google and GitHub OAuth.

**New:** Use `<Button variant="outline" size="lg">` with className overrides for primary-colored border and text.

```tsx
<Button
  variant="outline"
  size="lg"
  onClick={handleGoogle}
  className="h-12 w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
>
  <GoogleIcon className="size-4" />
  <span className="text-sm font-bold tracking-wide">GOOGLE</span>
</Button>
```

Same pattern for the GitHub button.

### 2. `src/components/Header.tsx`

**Current:** `<Link>` with manual button styling (border, padding, hover).

**New:** `<Button variant="outline" size="sm" asChild>` wrapping the `<Link>`.

```tsx
<Button
  variant="outline"
  size="sm"
  asChild
  className="border-primary text-primary tracking-wide font-bold text-xs hover:bg-primary/10 hover:text-primary"
>
  <Link to="/sign-in">SIGN IN</Link>
</Button>
```

### 3. `src/routes/_app/index.tsx`

**Current:** `<Link>` with manual primary button styling (bg-primary, rounded-md, hover).

**New:** `<Button size="lg" asChild>` wrapping the `<Link>`.

```tsx
<Button size="lg" asChild>
  <Link to="/components">View Components</Link>
</Button>
```

## Non-goals

- No new button variants added to the Button component
- Demo pages not touched
- No changes to shadcn UI component files
