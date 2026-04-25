# Meliora

A personal health companion that turns passive sensor data (sleep, HRV, steps, screentime, sun exposure, location) and user-logged symptoms into a conversational, longitudinal record — and helps you prepare for doctor visits.

## Project Description

Meliora connects the dots between your health data and how you actually feel. It aggregates data from wearables and device sensors, surfaces correlations ("headaches cluster after fewer than 6h of sleep"), and generates an AI health summary you can share directly with your doctor.

The product surfaces are:

| Route | Description |
|---|---|
| `/` | Landing page — hero visualization + sign-up CTA |
| `/onboarding` | Intake flow — builds your health profile (basics, conditions, medications, devices, goals) |
| `/dashboard` | Logged-in home — Claude prompt, week-of-data charts, and "Meliora noticed" insight cards |
| `/locations` | Week-in-review of places visited with health-relevant conclusions |
| `/medications` | Medication adherence calendar (last 4 weeks, per-drug dot grid) |
| `/profile` | AI-generated health summary card intended for sharing with a doctor |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | [React](https://react.dev) 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Language | TypeScript 5 |
| Fonts | Inter (body/headings), JetBrains Mono (labels/axes) via `next/font` |
| Charts | Custom SVG components — `BarSeries`, `RingChart`, `TrendLine` (no chart library) |
| Linting | ESLint 9 + `eslint-config-next` |

### Design Tokens

The visual language is ink-on-paper with a single warm coral accent — no shadows, no elevation.

| Token | Value | Usage |
|---|---|---|
| `#1a1a1a` | ink | Primary text |
| `#4a4a4a` | ink-soft | Secondary text |
| `#8a8a8a` | ink-faint | Tertiary text, axis ticks |
| `#fafaf7` | paper | Primary background |
| `#f3f2ec` | paper-2 | Secondary background, map fills |
| `#e76f51` | accent | Warm coral — single accent color |
| `#fbe3d8` | accent-soft | Accent tint for soft fills |

## Setup

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/julian-stoller/Melior.git
cd Melior

# 2. Install dependencies
cd meliora-app
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Repository Structure

```
Meliora/
├── meliora-app/               # Next.js application (source of truth)
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── page.tsx           # Landing /
│   │   │   ├── onboarding/        # Intake flow
│   │   │   ├── dashboard/         # Main dashboard
│   │   │   ├── locations/         # Locations page
│   │   │   ├── medications/       # Medications page
│   │   │   └── profile/           # Profile / health summary
│   │   └── components/        # Shared components
│   │       ├── Logo.tsx
│   │       ├── Nav.tsx
│   │       ├── ChatRail.tsx       # Left rail with chat history
│   │       ├── SideRail.tsx       # Left nav (locations/meds/profile)
│   │       ├── PromptBox.tsx      # Claude prompt input
│   │       ├── RangeTabs.tsx      # Day/Week/Month/Year/All tabs
│   │       ├── BarSeries.tsx      # Responsive bar chart
│   │       ├── StatCard.tsx       # Metric card with delta
│   │       ├── InsightCard.tsx    # "Meliora noticed" callout
│   │       └── SvgPrimitives.tsx  # RingChart, TrendLine, BodyOutline, MapSketch, CalendarGrid
│   └── package.json
└── design_handoff_meliora/    # Original wireframes (reference only, not production code)
```
