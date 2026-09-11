---
name: Solar Ink & Deep Orbit
theme: Solar Ink & Deep Orbit
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#e1bfb5'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#a98a80'
  outline-variant: '#594139'
  surface-tint: '#ffb59d'
  primary: '#ffb59d'
  on-primary: '#5d1900'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ab3500'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#fcb973'
  on-tertiary: '#492900'
  tertiary-container: '#c98d4b'
  on-tertiary-container: '#4b2a00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#fcb973'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#683c00'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-xxs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
  gutter-desktop: 2rem
  gutter-mobile: 1rem
  container-max: 80rem
---

## Brand & Style

This design system establishes an atmospheric, high-performance visual identity for a Frontend Developer & AI/ML Engineer. It merges the disciplined precision of deep-ink manga illustration with the celestial scale of space exploration and the kinetic energy of golden-hour anime sunsets.

The aesthetic blends high-contrast modern brutalism—disciplined lines, razor-sharp typographic scale, and structural grid rigor—with luminous glass accents and radiant neon focal points. It communicates technical mastery, cutting-edge engineering capability, and deep UI craftsmanship.

Interactive surfaces project confidence through pristine contrast ratios, generous negative space, and kinetic micro-interactions that feel snappy and deliberate. The interface acts as both an exhibition canvas for production-grade software and a reflection of developer taste.

## Colors

The palette is engineered around an ink-dark void punctuated by high-temperature solar bursts and crisp cybernetic luminescences.

- **Primary (`#FF6B35` - Solar Coral / Radiant Tangerine):** Used for primary conversion points, active states, key interactive indicators, and primary focal highlights.
- **Secondary (`#00F0FF` - Electric Cyan / Orbit Blue):** Used for code parameters, live telemetry indicators, AI/ML badges, interactive links, and secondary interactive states.
- **Tertiary (`#FDBA74` - Golden Hour Amber):** Used for subtle glowing accents, metadata tags, commit graphs, and secondary data visualizations.
- **Neutral (`#0B0F17` - Deep Graphite Void):** The bedrock of the system. Extends into elevated surface tiers:
  - Base canvas: `#0B0F17`
  - Elevated surface: `#111827`
  - Interactive card/overlay: `#1E293B`
  - Subtle borders: `rgba(255, 255, 255, 0.08)`
  - High-contrast text: `#F8FAFC` (WCAG AAA compliant against base surfaces)
  - Secondary text / Muted details: `#94A3B8`

## Typography

The typographic hierarchy relies on a tri-font engine configured to reflect both creative frontend aesthetics and rigorous machine learning discipline.

- **Headlines & Display:** `Be Vietnam Pro` delivers an architectural, geometric edge with futuristic proportions and tight tracking.
- **Body & Editorial:** `Anybody` provides high legibility, clean horizontal metrics, and an unobtrusive modern structure.
- **Data, Code & Chips:** `Domine` handles all technical callouts, execution stats, runtime indicators, and interactive code inspections.

## Layout & Spacing

The layout model combines an airy 12-column desktop fluid grid with modular component bays. Spacing follows an 8px baseline rhythm with deliberate macro-scale negative space (`space-2xl` and `space-3xl`) between project showcases to allow live component demonstrations to breathe.

- **Breakpoints:**
  - `mobile`: `< 768px` (single-column stack, 1rem margins)
  - `tablet`: `768px - 1024px` (6-column layout, 1.5rem gutters)
  - `desktop`: `> 1024px` (12-column layout, 2rem gutters, max width 1280px)

Containers default to generous internal padding (`space-xl`), ensuring technical cards never feel cramped even when displaying complex code diffs, interactive sandboxes, or visual benchmarks.

## Elevation & Depth

Visual hierarchy is constructed through luminous dark surfaces and razor-thin, light-reactive borders rather than muddy black drop-shadows.

- **Surface Levels:**
  - `Base`: `#0B0F17` (Canvas background)
  - `Level 1`: `#111827` (Section panels and structural columns)
  - `Level 2`: `#161F30` (Project cards, code playgrounds, modal drawers)
  - `Level 3`: `#1E293B` (Floating popovers, dropdowns, interactive tooltips)

- **Outlines & Borders:** All elevated cards feature a hairline outline: `1px solid rgba(255, 255, 255, 0.08)`. On hover, the border transitions to `rgba(255, 107, 53, 0.4)` or `rgba(0, 240, 255, 0.4)`.
- **Glow & Neon Projection:** Interactive focal states utilize atmospheric halo blurs:
  - Solar Glow: `0 0 24px -4px rgba(255, 107, 53, 0.35)`
  - Cyber Cyan Glow: `0 0 24px -4px rgba(0, 240, 255, 0.35)`

## Shapes

The geometric silhouette is disciplined and semi-sharp (`roundedness: 2`), embodying the precision of modern engineering tools and terminal environments.

- Standard inputs, buttons, and interactive chips use `0.5rem` (8px).
- Complex display cards, live interactive sandboxes, and modals use `1rem` (16px).
- Badges and status pills optionally support full-radius capsules (`9999px`) when functioning as live status telemetry dots.

## Components

### Buttons
- **Primary:** Background `#FF6B35`, text `#0B0F17` (bold `Anybody`), border radius `8px`. On hover: lifts slightly with solar coral halo (`0 0 16px rgba(255, 107, 53, 0.45)`).
- **Secondary / Ghost:** Transparent background, `1px solid rgba(255, 255, 255, 0.16)`, text `#F8FAFC`. On hover: border switches to `#00F0FF`, text to `#00F0FF`, background to `rgba(0, 240, 255, 0.06)`.
- **Code Action:** Monospaced `Domine` at `13px`, compact padding (`0.4rem 0.8rem`), embedded shortcut indicator in brackets.

### Chips & Badges
- Built with `Domine` at `label-caps` size.
- **Tech Stack Pill:** `#161F30` background, `rgba(255, 255, 255, 0.1)` border, muted text `#94A3B8`.
- **AI/ML Model Status:** Contains an illuminated pulsing green/cyan indicator dot, `rgba(0, 240, 255, 0.12)` fill, `#00F0FF` text.

### Code Playground & Sandbox Cards
- Integrated header bar containing file path, language badge, copy button, and live runtime toggle.
- Background `#0E1420` with a 1px border. Code syntax highlighted using the Solar/Cyan split.

### Inputs & Form Elements
- Dark slate fill (`#111827`) with `1px solid rgba(255, 255, 255, 0.12)` border.
- Focus state: border shifts to `#FF6B35` with a subtle orange inner glow; placeholder text stays crisp at `#64748B`.
- Checkboxes and switches: sharp square toggles with `#00F0FF` active fill.

### Interactive Project Cards
- Dual-layer structure: dynamic viewport showcase top, technical breakdown bottom.
- Subtle cursor hover tracks subtle radial gradients on the card surface, revealing the wireframe-like border beneath.