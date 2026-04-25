# Handoff: Meliora — Health Companion Wireframes

## Overview

Meliora is a personal health companion that turns passive sensor data (sleep, HRV, steps, screentime, sun exposure, location) plus user-logged symptoms into a conversational, longitudinal record — and helps the user prepare for doctor visits.

This bundle contains a set of **wireframes** exploring three product surfaces:

1. **Landing page** — 6 directions for the marketing/sign-up entry point
2. **Intake flow** — 5 directions for the post-CTA onboarding that builds the user's profile
3. **Dashboard** — 3 directions for the logged-in home (chat history rail + Claude prompt + week-of-data charts + insights)
4. **Locations page** — week-in-review of places visited with health-relevant conclusions
5. **Medications page** — adherence calendar for tracked meds
6. **Profile page** — an AI-generated health summary intended to be shared with a doctor

The whole thing is wrapped in a **Design Canvas** so a reviewer can see all directions side-by-side, drag-reorder, and focus any single artboard fullscreen. A **Tweaks panel** lets the reviewer flip fidelity (sketchy → cleaner), toggle the coral accent on/off, and isolate a single direction in each section.

## About the Design Files

The files in this bundle are **design references created in HTML/JSX** — prototypes that show intended look and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (React, Next.js, SwiftUI, Vue, etc.) using its established patterns, component library, and design tokens. If no codebase environment exists yet, choose the most appropriate framework for the project (recommended: Next.js + React + Tailwind, or React + a component library like shadcn/ui) and implement there.

Treat the JSX files in this bundle as **annotated mockups** — read them to understand layout, content, copy, and intended interactions, but rebuild on top of the target stack's idioms.

## Fidelity

These are **low-fidelity wireframes** with intentional sketch styling — wobbly borders, hand-drawn fonts (Caveat / Kalam), monoline icons, and a single warm coral accent (`#e76f51`) over an off-white paper background (`#fafaf7`).

The point of the lo-fi treatment is to **focus review on layout, information hierarchy, content, and flow** — not on final visual polish. When implementing:

- **Use the layout, structure, copy, and interaction patterns as specified.**
- **Replace the sketch styling with the target codebase's design system.** Keep the warm/human voice and the use of a single accent color, but apply real type, spacing, borders, and shadows from the existing system.
- The "tight" fidelity tweak (toggleable in the prototype) gives a closer preview of what the cleaned-up version should feel like — Inter type, straighter borders, less wobble. Use that as the bridge to the final visual language.

## Screens / Views

### 1. Landing Page (6 directions, in `landings.jsx`)

All landings share: brand wordmark + nav, a hero headline, a CTA, and a hero illustration/data visualization. The 6 directions explore different metaphors for "your health, made legible":

| ID | Name | Hero metaphor |
|---|---|---|
| `LandingRings` | Rings & metrics | Activity/sleep/HRV concentric rings + numeric stats |
| `LandingBody` | Body silhouette | Human figure with annotated data points (HRV, sleep, steps) — see `BodyOutline` in `primitives.jsx` |
| `LandingTimeline` | Year timeline | Horizontal year-long ribbon with health events plotted |
| `LandingMap` | Health on a map | Sketch map showing places visited, overlaid with health markers |
| `LandingCalendar` | Daily calendar | Calendar grid colored by activity intensity |
| `LandingJournal` | Journal & companion | Hand-written journal entry style with conversational hooks |

**Layout (all variants):** centered max-width container (~1280px), three-region grid: left copy column, center hero illustration, right "at a glance" stat boxes. Generous whitespace, no shadows, single accent.

**Copy tone:** warm, second-person, focused on understanding rather than optimization. Examples in source: "your health, in your own words", "I've got your last 7 days loaded".

### 2. Intake Flow (5 directions, in `intakes.jsx`)

Post-CTA onboarding that captures the data needed to seed a profile (basics, conditions, meds, devices, goals). All variants ask the same questions; the difference is the **interaction pattern**:

| ID | Name | Pattern |
|---|---|---|
| `IntakeLinear` | Linear progress bar | Classic top-progress-bar, one form per step, Back/Next |
| `IntakeSidebar` | Sidebar steps | Persistent left-side step list with checkmarks, current step highlighted |
| `IntakeConversational` | One-question-at-a-time | Full-screen single question, large type, minimal chrome |
| `IntakeCardStack` | Card stack | Card deck metaphor — current card forward, next cards peeking behind |
| `IntakeLivePreview` | Live profile preview | Form on left, live-updating profile card on right showing what gets built |

### 3. Dashboard (3 directions, in `dashboards.jsx`)

The logged-in home. Common chrome:
- **Left rail:** chat history with Claude (recent conversations grouped by date)
- **Top:** Claude prompt box ("What's on your mind?") — primary entry to the conversational layer
- **Body:** time-range tabs (week / month / year), then data cards
- **Data shown:** Sleep (bar graph, hours per night), Steps (bar graph, steps per day), HRV (stat + trend), Mood (logged entries), Screentime (bar graph), Time outside (bar graph)
- **Insights:** "Meliora noticed" callout cards correlating signals (e.g., "Headaches cluster after <6h sleep nights")

| ID | Name | Layout emphasis |
|---|---|---|
| `DashboardStandard` | Standard grid | Balanced grid of stat cards + bar graphs |
| `DashboardCompact` | Dense overview | Tighter grid, more data visible at once |
| `DashboardConversational` | Conversation-led | Prompt box and Claude's last response are the hero; data tucks below |

**Bar graph component (`BarSeries` in `dashboards.jsx`):** reusable, responsive (uses `ResizeObserver` to fill its container), 7 bars (Mon–Sun), y-axis ticks, dashed average line with `avg X{unit}` label, bottom day labels.

### 4. Locations Page (`locations.jsx`)

Week-in-review of places visited (sketch map + list). Each location shows: name, time spent, and any health-relevant conclusion (e.g., "tall grass / tick-flagged"). Includes a sample multi-leg route.

### 5. Medications Page (`medications.jsx`)

Adherence calendar (last 4 weeks, grouped per medication). `MedAdherence` component renders a 7-col grid of taken/missed dots. Surfaces patterns like "all missed doses are Sundays."

### 6. Profile Page (`profile.jsx`)

An AI-generated health summary card the user can share with their doctor. Includes: top-line summary paragraph, key trends, a list of "things worth flagging," and a "share with doctor" CTA.

## Interactions & Behavior

- **Design Canvas:** pan/zoom, drag-reorder artboards within a section, double-click to rename, click an artboard's expand control for fullscreen focus mode (← / → / Esc to navigate).
- **Tweaks panel:** floating bottom-right; toggles fidelity, accent on/off, and focus filters per section.
- **Bar graphs:** auto-fit container width via `ResizeObserver`; bars rendered in coral when accent is on, ink when off; last bar (today) at full opacity, prior days slightly faded.
- **Body silhouette dots:** anchored to anatomical positions matching their label (HRV → over the heart, sleep → head, steps → on the legs).
- **Prompt box:** primary input field; in the "conversational" dashboard variant it's the page's hero element.

## State Management

For an implementation, the minimum state needed:

- **Auth/session:** standard.
- **Tweaks (prototype-only):** `fidelity`, `accent`, plus per-section `focus` filters. In production these go away — the app ships with one fidelity and one accent.
- **Dashboard data:** week of {sleep, steps, HRV, mood, screentime, sun-time} per user. All charts read from the same weekly window; time-range tabs swap the window (week / month / year).
- **Chat history:** list of past Claude conversations, grouped by date for the left rail.
- **Symptom log / events:** user-entered events with timestamp, used to drive the "Meliora noticed" insight cards.
- **Locations:** day-keyed list of places (lat/lng + dwell time + tags).
- **Medications:** list of meds + per-day taken/missed booleans for the adherence grid.

## Design Tokens

From `styles.css`:

```
--ink:        #1a1a1a   /* primary ink / text */
--ink-soft:   #4a4a4a   /* secondary text */
--ink-faint:  #8a8a8a   /* tertiary text, axis ticks */
--paper:      #fafaf7   /* primary background */
--paper-2:    #f3f2ec   /* secondary background, map fills */
--accent:     #e76f51   /* warm coral — single accent */
--accent-soft:#fbe3d8   /* accent tint for soft fills */

/* Type */
--hand:  "Caveat", "Patrick Hand", cursive          /* sketch fidelity */
--label: "Kalam", "Patrick Hand", cursive            /* sketch labels */
--mono:  "JetBrains Mono", "Courier New", monospace  /* numeric / axis */

/* In "tight" fidelity --hand and --label both become Inter. */
```

**Spacing:** loose 4 / 8 / 12 / 16 / 24 / 32px scale, used via `gap-N` utility classes in the JSX.

**Borders:** `1.2px – 1.8px solid var(--ink)`. Sketch fidelity adds slightly asymmetric border-radius for hand-drawn feel; tight fidelity uses uniform `6px`.

**Shadows:** none. The wireframes use borders, not elevation.

**Fonts to load (Google Fonts):** Caveat (500/700), Kalam (400/700), Patrick Hand, Inter (400/500/600/700), JetBrains Mono (400/600).

## Assets

No raster images. Everything is CSS or inline SVG:

- `BodyOutline` (SVG human figure) — `primitives.jsx`
- `RingChart`, `TrendLine`, `CalendarGrid`, `MapSketch`, `DeviceCard` — `primitives.jsx`
- `BarSeries`, `SleepStages`, `MedAdherence`, `StatCard`, `InsightCard`, `PromptBox` — `dashboards.jsx`

If implementing in React, these are good candidate components to lift directly (port the SVG, then re-style with the target system's tokens).

## Files in This Bundle

| File | Purpose |
|---|---|
| `Meliora Wireframes.html` | Entry point — loads React, Babel, and all JSX files; wires the Design Canvas + Tweaks panel |
| `styles.css` | Sketch-styling base + design tokens + utility classes |
| `primitives.jsx` | Shared building blocks: `BrowserFrame`, `Nav`, `RingChart`, `TrendLine`, `BodyOutline`, `CalendarGrid`, `MapSketch`, `DeviceCard` |
| `landings.jsx` | 6 landing page directions |
| `intakes.jsx` | 5 intake flow directions |
| `dashboards.jsx` | 3 dashboard directions + `BarSeries`, `SleepStages`, `MedAdherence`, `StatCard`, `InsightCard`, `PromptBox` |
| `locations.jsx` | Locations page |
| `medications.jsx` | Medications adherence page |
| `profile.jsx` | Profile / AI health summary page |
| `design-canvas.jsx` | Pan/zoom canvas wrapper (`DesignCanvas`, `DCSection`, `DCArtboard`) — **for review only**, not part of the product |
| `tweaks-panel.jsx` | Tweaks panel UI (`TweaksPanel`, `TweakSection`, `TweakRadio`, `TweakSelect`, etc.) — **for review only** |

To open the prototype locally: serve the folder over any static server (e.g. `python -m http.server` or `npx serve`) and open `Meliora Wireframes.html`. Do **not** open via `file://` — Babel won't load the `.jsx` files cross-origin from disk.

## Implementation Notes

- **Don't ship `design-canvas.jsx` or `tweaks-panel.jsx`.** They exist to scaffold review.
- **Keep the warm voice.** Copy in the prototype is intentional — second-person, gentle, focused on understanding. Don't replace it with generic SaaS copy.
- **One accent only.** Resist the urge to add a second color. The whole visual identity rests on ink + paper + coral.
- **Charts are responsive.** `BarSeries` uses `ResizeObserver` to fit its container — preserve that behavior in the rebuild.
- **Body silhouette dots are anatomical.** When porting, keep dot positions tied to the label they annotate (HRV → heart, sleep → head, steps → legs). Don't scatter them.
