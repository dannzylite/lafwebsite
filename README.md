# Leke Adeboye Foundation

Official website for the Leke Adeboye Foundation (LAF), a faith-driven nonprofit empowering youth, restoring hope, and building sustainable communities across Lagos, Nigeria.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev        # Dev server on http://localhost:3000
npm run build      # Production build
```

## Environment

No environment variables required for the static site. To add AI features, set one of: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`.

## Pages

- `/` — Homepage with hero, stats, programs, projects, countdown, campaign
- `/about` — Story, vision/mission, founder's note, timeline
- `/programs` — All six programme pillars with sidebar nav
- `/projects` — Filterable project gallery
- `/get-involved` — Donate, partner, volunteer, prayer sections
- `/media` — Press releases, impact reports, galleries
- `/contact` — Contact form + info panel
