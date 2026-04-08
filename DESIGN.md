# Design Brief

## Direction

Alpine Hiking Journal — A warm, editorial aesthetic that evokes vintage mountain guides, leather-bound hiking journals, and cozy Alpine cabin interiors.

## Tone

Warm, organic, inviting — execution with conviction toward rustic authenticity, avoiding digital sterility and bright colors.

## Differentiation

Interactive elevation profiles render elevation data as the primary visual signature — brown-stroked SVG lines with serif numerals that readers can click-through to explore each stage of the E5 crossing.

## Color Palette

| Token      | OKLCH         | Role                              |
| ---------- | ------------- | --------------------------------- |
| background | 0.96 0.008 75 | Cream, like aged paper             |
| foreground | 0.18 0.04 45  | Deep wood-brown, primary text      |
| card       | 0.98 0.006 75 | Lighter card/popover surface       |
| primary    | 0.38 0.08 40  | Aged wood accent, buttons, headers |
| secondary  | 0.92 0.02 75  | Taupe for subtle section breaks    |
| accent     | 0.52 0.08 160 | Muted sage-green (Alpine flora)    |
| muted      | 0.92 0.02 75  | Disabled/secondary info            |
| destructive| 0.52 0.18 25  | Warm orange-red (alert/hazard)     |

## Typography

- Display: Lora — serif, editorial, classic, used for stage titles, headers, elevation numbers
- Body: Figtree — clean, warm, friendly, readable on mobile, used for descriptions and info cards
- Mono: JetBrains Mono — elevation heights, distances, technical data

Scale: h1 `text-5xl md:text-6xl font-display font-bold tracking-tight`, h2 `text-2xl md:text-3xl font-display font-bold tracking-tight`, body `text-base font-body`

## Elevation & Depth

Subtle warm shadows (`shadow-warm` 0.08 opacity, `shadow-warm-elevated` 0.12 opacity) create gentle depth without harsh contrast. Cards sit slightly above the background, elevation profiles have minimal lift.

## Structural Zones

| Zone    | Background        | Border                   | Notes                                  |
| ------- | ----------------- | ------------------------ | -------------------------------------- |
| Header  | `bg-card`         | `border-b border-border` | E5 title, navigation, warm tone        |
| Content | `bg-background`   | —                        | Main elevation profile, stage cards    |
| Footer  | `bg-secondary/30` | `border-t border-border` | Copyright, metadata, light section     |
| Stages  | `bg-card`         | `border border-border`   | Alternating `bg-secondary/5` dividers  |

## Spacing & Rhythm

Spacious vertical rhythm (gap-8, gap-10 between sections) with micro-spacing (gap-2, gap-3) within card clusters. Hero elevation profile dominates with breathing room; stage buttons grid into 2–3 columns mobile-to-desktop.

## Component Patterns

- Buttons: rounded-md, wood-brown primary with cream text, hover lightens to sage-accent, 0.3s smooth transition
- Cards: rounded-md, cream background with subtle warm shadow, brown border on hover, tap-friendly 44px+ touch targets
- Badges: pill-shaped (`rounded-full`), cream background with brown text, used for date/distance labels
- Input: cream background with wood-brown border, focus ring with primary wood-brown color

## Motion

- Entrance: Elevation profile SVG renders with 0.6s stroke animation on page load; stages fade-in sequentially with 0.2s stagger
- Hover: Cards lift (+2px shadow increase), button text brightens to sage-accent, 0.3s ease-out
- Decorative: Subtle background grain texture overlay, smooth scrolling through profile

## Constraints

- No bright, saturated colors — all palette adjustments stay within warm/earth hues and muted saturation
- Mobile-first — all touch targets ≥44px × 44px for hiking trail accessibility
- Elevation profile always renders at ≥300px height on mobile; scales generously on desktop
- German UI text throughout (labels, buttons, error messages, metadata)

## Signature Detail

Elevation profile as interactive graphic: brown SVG stroke lines with serif numerals at altitude markers, clickable stage anchors inline with profile. Data visualization becomes the app's visual identity, not an afterthought chart.

