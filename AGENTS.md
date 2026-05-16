# AGENTS.md

## Project Overview

Official website for the Leke Adeboye Foundation (LAF), a faith-driven Nigerian nonprofit. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
public/
  assets/           # Real photo assets (founder, maternity, school, outreach, dev center)
  favicon.ico
src/
  components/
    Header.tsx      # Sticky nav with dropdowns, mobile drawer, floating donate btn
    Footer.tsx      # 4-col footer with bank details, social icons, copyright
  routes/
    __root.tsx      # Root shell: meta, Google Fonts, JSON-LD, viewport
    index.tsx       # Homepage: hero collage, stats, story, pillars, projects, countdown, campaign, quotes
    about.tsx       # About: story, vision/mission cards, founder note, timeline
    programs.tsx    # Programs: sticky sidebar, 8 programme sections
    projects.tsx    # Projects: filterable masonry grid, capital campaign banner
    get-involved.tsx # Donate/Partner/Volunteer/Prayer with forms
    media.tsx       # Tabbed: press releases, impact reports, galleries (coming soon)
    contact.tsx     # Split layout: form + info panel
  styles.css        # Tailwind + CSS custom properties + scroll animations
  router.tsx        # Router factory using auto-generated routeTree
```

## Brand System

CSS custom properties in `styles.css`:

- `--laf-navy: #0A1929` — primary brand, headers
- `--laf-gold: #C5A028` — primary accent, CTAs, stat highlights
- `--laf-gold-light: #E8C84B` — hover states
- `--laf-cream: #FAF7F0` — section backgrounds
- `--laf-white: #FFFFFF` — cards, surfaces
- `--laf-text: #1A1A2E` — body copy
- `--laf-muted: #6B7280` — secondary text
- `--laf-border: #E5E2D8` — dividers

**Fonts:** Cormorant Garamond (display/headings), DM Sans (body), Cormorant SC (labels) — Google Fonts via CSS `@import`.

**Font classes:** `.font-display` (Cormorant Garamond), `.font-sc` (Cormorant SC).

## Conventions

- All brand colors use inline `style` props, not Tailwind color utilities, to prevent purge issues.
- `reveal` + `visible` CSS classes with IntersectionObserver for scroll-triggered fade-up animations.
- `card-hover` CSS class for consistent hover lift effect.
- No external state management — all local React hooks.
- Forms are client-side only; success state handled via `submitted` boolean.
- Never use em dashes in copy (client directive).
- RC number intentionally omitted from footer (pending).

## Key Assets

- `public/assets/founder.jpeg` — Founder photo for About page
- `public/assets/maternity-01/03/04.jpeg` — Maternity renovation photos
- `public/assets/sogunle-01/02.jpg` — School initiative photos
- `public/assets/lightup-01/02/04.jpeg` — LightUp / Jesus in the Park photos
- `public/assets/laf-dev-center.png` — Youth Development Centre image

## Key External Links

- Conference registration: https://kmklc.org
- Conference: Kingsmen and Kingsladies 2026, July 9–11, "Who The Crown Fits", ₦50,000, 100 spaces

## Bank Details

PremiumTrust Bank | Leke Adeboye Foundation | NGN: 0040217552 | GBP: 30085522

## Development Commands

```bash
npm run dev    # Dev server on :3000
npm run build  # Production build
```
