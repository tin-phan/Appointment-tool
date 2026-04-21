---
phase: "01"
plan: "01"
subsystem: scaffold
tags: [nextjs, tailwind, shadcn, typescript, setup]
dependency_graph:
  requires: []
  provides: [nextjs-app-router, tailwind-rose-palette, shadcn-ui-primitives, env-example]
  affects: [all-phase-1-plans]
tech_stack:
  added:
    - Next.js 16.2.4 (App Router, TypeScript)
    - Tailwind CSS v4.2.4 (PostCSS)
    - shadcn/ui (manually installed, default style, rose base)
    - class-variance-authority, clsx, tailwind-merge
    - lucide-react
    - "@radix-ui/react-checkbox, @radix-ui/react-label, @radix-ui/react-slot"
    - react-day-picker v9, date-fns
  patterns:
    - CSS-based Tailwind v4 theme via @theme directive in globals.css
    - tailwind.config.ts retained for backwards-compat brand color documentation
    - shadcn component files authored manually (network policy blocks npx shadcn registry)
key_files:
  created:
    - tailwind.config.ts
    - components.json
    - src/lib/utils.ts
    - src/components/ui/button.tsx
    - src/components/ui/card.tsx
    - src/components/ui/checkbox.tsx
    - src/components/ui/input.tsx
    - src/components/ui/label.tsx
    - src/components/ui/calendar.tsx
    - src/components/ui/badge.tsx
    - .env.local.example
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - .gitignore
    - package.json
    - package-lock.json
decisions:
  - "Used Tailwind v4 CSS @theme tokens alongside tailwind.config.ts for brand colors — v4 ships with create-next-app 16, no downgrade needed"
  - "Manually created shadcn/ui component files instead of npx shadcn CLI — npm registry policy blocked tldts-core fetch during shadcn init"
  - "Calendar component written for react-day-picker v9 API (Chevron with orientation prop, updated classNames keys)"
  - "Added !.env.local.example exception to .gitignore so example file can be committed despite .env* glob"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-21"
  tasks_completed: 3
  tasks_total: 3
  files_created: 11
  files_modified: 6
---

# Phase 1 Plan 01: Project Scaffold Summary

**One-liner:** Next.js 16 App Router scaffold with Tailwind v4 rose brand palette, manually-authored shadcn/ui primitives (button, card, checkbox, input, label, calendar, badge), and env example file.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Initialize Next.js + Tailwind | 949c82f | tailwind.config.ts, globals.css, layout.tsx, page.tsx |
| 2 | Install shadcn/ui primitives | 9e3d3d9 | components.json, src/lib/utils.ts, src/components/ui/*.tsx |
| 3 | Create .env.local.example | e95afc0 | .env.local.example, .gitignore |

## Verification Results

- `npm run build` exits 0
- `tailwind.config.ts` contains `brand:` color extension
- `src/app/globals.css` contains `background-color: #fff1f2` (rose-50)
- `src/app/layout.tsx` contains `Lona Nail` in metadata title
- `src/app/page.tsx` contains `bg-rose-50`
- `src/components/ui/` contains: badge, button, calendar, card, checkbox, input, label
- `components.json` shows `style: default`, `baseColor: rose`
- `.env.local.example` contains both `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and `NEXT_PUBLIC_SALON_ADDRESS`
- `.gitignore` contains explicit `.env.local` line

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] shadcn CLI blocked by npm registry network policy**
- **Found during:** Task 2
- **Issue:** `npx shadcn@latest init` failed with HTTP 403 fetching `tldts-core` from npm registry. The shadcn CLI also attempted to fetch from `ui.shadcn.com` which was blocked.
- **Fix:** Installed all shadcn dependencies directly via `npm install` (class-variance-authority, clsx, tailwind-merge, lucide-react, @radix-ui packages, react-day-picker, date-fns). Authored all 7 component files manually matching shadcn's default output.
- **Files created:** All files in src/components/ui/, components.json, src/lib/utils.ts
- **Commits:** 9e3d3d9

**2. [Rule 1 - Bug] react-day-picker v9 API mismatch in Calendar component**
- **Found during:** Task 2 (build verification)
- **Issue:** shadcn's canonical Calendar component uses react-day-picker v8 API (`IconLeft`/`IconRight` component names, v8 classNames keys). npm installed v9 which uses `Chevron` component with `orientation` prop and different classNames keys (e.g. `month_caption` vs `caption`, `button_previous` vs `nav_button_previous`).
- **Fix:** Rewrote Calendar component for react-day-picker v9 API — replaced `IconLeft`/`IconRight` with `Chevron: ({ orientation }) => ...`, updated all classNames keys to v9 equivalents.
- **Files modified:** src/components/ui/calendar.tsx
- **Commits:** 9e3d3d9

**3. [Rule 3 - Blocking] .env.local.example caught by .env* glob in .gitignore**
- **Found during:** Task 3 (git add)
- **Issue:** create-next-app's .gitignore uses `.env*` which also matched `.env.local.example`, preventing commit.
- **Fix:** Added `!.env.local.example` exception to .gitignore before the `.env.local` line.
- **Files modified:** .gitignore
- **Commits:** e95afc0

## Known Stubs

None — this is a scaffold plan with no data-driven UI. The page.tsx placeholder is intentional; it will be replaced in Plan 06 (page assembly).

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| threat_flag: information_disclosure | .env.local.example | NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is client-bundle exposed — mitigated by HTTP referrer restriction reminder in file comments (T-01-01) |

## Self-Check: PASSED

- tailwind.config.ts: FOUND
- src/lib/utils.ts: FOUND
- src/components/ui/button.tsx: FOUND
- src/components/ui/card.tsx: FOUND
- src/components/ui/checkbox.tsx: FOUND
- src/components/ui/input.tsx: FOUND
- src/components/ui/label.tsx: FOUND
- src/components/ui/calendar.tsx: FOUND
- src/components/ui/badge.tsx: FOUND
- components.json: FOUND
- .env.local.example: FOUND
- Commits 949c82f, be13980, 9e3d3d9, e95afc0: FOUND
