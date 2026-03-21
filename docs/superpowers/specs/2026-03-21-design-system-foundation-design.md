# Design System Foundation — Design Spec

## Overview

Establish a design system foundation for cervo-web by remapping shadcn's CSS variables to match the Pencil design system's themed palette, installing all necessary shadcn components, and swapping the default font to JetBrains Mono via Fontsource.

## Decisions

- **Theme approach**: Replace shadcn CSS variables with Pencil's themed palette (`t:--` variables)
- **Components**: Install all shadcn components that map to the Pencil design (24 new components)
- **Font**: JetBrains Mono Variable via `@fontsource-variable/jetbrains-mono`
- **Theme mode**: Dark mode only (Neutral base, Default accent)
- **Customization level**: CSS variables only — no component markup or variant changes
- **Future extensibility**: Themed variable architecture supports adding light mode, alternative bases, and accent colors later

## CSS Variable Mapping

Replace `:root` and `.dark` blocks in `src/styles.css` with a single `:root` block using Pencil's Neutral/Dark themed palette values:

| shadcn variable | Value (Neutral/Dark) |
|---|---|
| `--background` | `#0a0a0a` |
| `--foreground` | `#fafafa` |
| `--card` | `#171717` |
| `--card-foreground` | `#fafafa` |
| `--popover` | `#171717` |
| `--popover-foreground` | `#fafafa` |
| `--primary` | `#e5e5e5` |
| `--primary-foreground` | `#171717` |
| `--secondary` | `#262626` |
| `--secondary-foreground` | `#fafafa` |
| `--muted` | `#262626` |
| `--muted-foreground` | `#a3a3a3` |
| `--accent` | `#262626` |
| `--accent-foreground` | `#fafafa` |
| `--destructive` | `#ff666999` |
| `--border` | `#ffffff1a` |
| `--input` | `#ffffff1a` |
| `--ring` | `#737373` |
| `--sidebar` | `#18181b` |
| `--sidebar-foreground` | `#fafafa` |
| `--sidebar-primary` | `#1447e6` |
| `--sidebar-primary-foreground` | `#fafafa` |
| `--sidebar-accent` | `#2a2a30` |
| `--sidebar-accent-foreground` | `#fafafa` |
| `--sidebar-border` | `#ffffff1a` |
| `--sidebar-ring` | `#71717a` |

The light-mode `:root` values and `.dark` block are removed — the app is dark-only.

## Font

- Install: `bun add @fontsource-variable/jetbrains-mono`
- Import in app entry point (e.g., `src/routes/__root.tsx` or equivalent)
- Set body font-family in `src/styles.css`: `'JetBrains Mono Variable', monospace`

## shadcn Components to Install

24 new components (5 already installed: badge, card, checkbox, hover-card, separator):

| Component | Pencil mapping |
|---|---|
| `button` | Primary, Secondary, Ghost, Destructive, Outline, Link |
| `input` | TextInput |
| `textarea` | Textarea Group |
| `select` | Select Group |
| `command` | Combobox |
| `input-otp` | Input OTP Group |
| `sonner` | Toast |
| `alert` | Alert |
| `progress` | Progress |
| `tooltip` | Tooltip |
| `sidebar` | Sidebar |
| `tabs` | Tabs |
| `breadcrumb` | Breadcrumb |
| `pagination` | Pagination |
| `dialog` | Dialog |
| `dropdown-menu` | Dropdown |
| `sheet` | Modal (Left/Center) |
| `table` | Data Table |
| `accordion` | Accordion |
| `radio-group` | Radio |
| `switch` | Switch |
| `avatar` | Avatar (Text/Image) |
| `label` | Input labels |

## Implementation Steps

1. Install font: `bun add @fontsource-variable/jetbrains-mono`
2. Install 24 shadcn components: `bunx shadcn@latest add button input textarea select command input-otp sonner alert progress tooltip sidebar tabs breadcrumb pagination dialog dropdown-menu sheet table accordion radio-group switch avatar label`
3. Remap `src/styles.css`: replace `:root`/`.dark` CSS variables with the mapping table above
4. Update body font-family to JetBrains Mono Variable
5. Add fontsource import in the app entry

## Out of Scope

- Light mode support
- Alternative base or accent theme switching
- Component markup/variant customization
- Custom button variants (OAuth, IconButton, GhostIcon, DestructiveOutline)
- Component-level spacing/sizing adjustments to match Pencil exactly
