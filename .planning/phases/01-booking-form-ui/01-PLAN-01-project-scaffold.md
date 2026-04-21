---
plan: "01"
wave: 1
title: Project Scaffold — Next.js, Tailwind, shadcn/ui
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.ts
  - tailwind.config.ts
  - postcss.config.mjs
  - components.json
  - .env.local.example
  - .gitignore
  - src/app/layout.tsx
  - src/app/globals.css
  - src/app/page.tsx
  - src/lib/utils.ts
autonomous: true
requirements:
  - ACCESS-02
must_haves:
  - Next.js App Router project compiles with zero TypeScript errors (`npm run build` exits 0)
  - Tailwind CSS configured with rose/pink custom palette (rose-400 primary, rose-50 background)
  - shadcn/ui initialized with all required primitives installed (Checkbox, Card, Button, Input, Label, Calendar)
  - Root layout applies rose-50 background and Geist or Inter font
  - .env.local.example lists NEXT_PUBLIC_GOOGLE_MAPS_API_KEY and NEXT_PUBLIC_SALON_ADDRESS
---

<objective>
Bootstrap the complete Next.js 14+ (App Router) + TypeScript project with Tailwind CSS and shadcn/ui ready for component work. This plan creates zero application logic — only the project foundation.

Purpose: All subsequent plans depend on this scaffold existing. Nothing can be built before the runtime, styling system, and component library are in place.
Output: A compilable Next.js project with Tailwind extended for the rose/pink brand palette and shadcn/ui primitives installed.
</objective>

<execution_context>
@/home/user/Appointment-tool/.claude/get-shit-done/workflows/execute-plan.md
@/home/user/Appointment-tool/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/user/Appointment-tool/.planning/PROJECT.md
@/home/user/Appointment-tool/.planning/ROADMAP.md
@/home/user/Appointment-tool/CLAUDE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Initialize Next.js project with TypeScript and Tailwind</name>
  <read_first>
    - /home/user/Appointment-tool/CLAUDE.md (tech stack and env var requirements)
  </read_first>
  <files>
    package.json, tsconfig.json, next.config.ts, tailwind.config.ts,
    postcss.config.mjs, src/app/layout.tsx, src/app/globals.css, src/app/page.tsx, .gitignore
  </files>
  <action>
Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` from /home/user/Appointment-tool (accept all defaults).

After scaffold completes:

1. Edit `tailwind.config.ts` — extend the theme with rose/pink palette:
```ts
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#fb7185',    // rose-400
        light: '#fff1f2',      // rose-50
        medium: '#fda4af',     // rose-300
        dark: '#e11d48',       // rose-600
      },
    },
  },
},
```

2. Edit `src/app/globals.css` — set body background to rose-50 and ensure Tailwind base directives are present:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #fff1f2; /* rose-50 */
}
```

3. Edit `src/app/layout.tsx` — set metadata title to "Lona Nail — Book an Appointment" and description to "Online booking for Lona Nail salon. At-salon or in-house appointments available.". Import and apply Inter font from next/font/google.

4. Replace `src/app/page.tsx` content with a minimal placeholder:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50">
      <p className="p-4 text-rose-400">Lona Nail — booking form coming soon</p>
    </main>
  );
}
```
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npm run build 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - `npm run build` exits with code 0
    - tailwind.config.ts contains the string `brand:` indicating custom color extension
    - src/app/globals.css contains `@tailwind base` and `background-color: #fff1f2`
    - src/app/layout.tsx contains `Lona Nail` in the metadata title string
    - src/app/page.tsx contains `bg-rose-50`
  </acceptance_criteria>
  <done>Next.js project builds successfully with Tailwind rose palette configured</done>
</task>

<task type="auto">
  <name>Task 2: Install shadcn/ui and required primitives</name>
  <read_first>
    - /home/user/Appointment-tool/package.json (confirm Next.js version and existing deps)
    - /home/user/Appointment-tool/tailwind.config.ts (confirm Tailwind is configured)
  </read_first>
  <files>
    components.json, src/lib/utils.ts,
    src/components/ui/button.tsx, src/components/ui/card.tsx,
    src/components/ui/checkbox.tsx, src/components/ui/input.tsx,
    src/components/ui/label.tsx, src/components/ui/calendar.tsx,
    src/components/ui/badge.tsx
  </files>
  <action>
From /home/user/Appointment-tool, run shadcn init and add all required primitives:

```bash
npx shadcn@latest init --defaults
npx shadcn@latest add button card checkbox input label calendar badge
```

When `shadcn init` prompts for style, choose "Default". For base color choose "Rose". For CSS variables choose "yes".

After installation, verify `components.json` was created at the project root and `src/lib/utils.ts` contains the `cn` helper function (clsx + tailwind-merge).

Do NOT modify the generated component files — use them as-is from shadcn.
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && ls src/components/ui/ && npm run build 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - File exists: src/components/ui/button.tsx
    - File exists: src/components/ui/card.tsx
    - File exists: src/components/ui/checkbox.tsx
    - File exists: src/components/ui/input.tsx
    - File exists: src/components/ui/label.tsx
    - File exists: src/components/ui/calendar.tsx
    - File exists: src/lib/utils.ts and contains the string `clsx`
    - components.json exists at project root
    - `npm run build` exits 0 after adding components
  </acceptance_criteria>
  <done>All shadcn/ui primitives installed and project still compiles</done>
</task>

<task type="auto">
  <name>Task 3: Create .env.local.example with required env vars</name>
  <read_first>
    - /home/user/Appointment-tool/CLAUDE.md (environment variables section)
  </read_first>
  <files>
    .env.local.example
  </files>
  <action>
Create `/home/user/Appointment-tool/.env.local.example` with exactly this content:

```
# Phase 1 — Required for booking form UI
# Copy this file to .env.local and fill in values

# Google Maps JavaScript API key (restricted to your domain in production)
# Used for in-house address autocomplete input
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Salon address displayed in at-salon mode (read-only)
NEXT_PUBLIC_SALON_ADDRESS=123 Your Street, Your City, AB T0A 0A0

# Phase 2+ (not needed yet)
# GOOGLE_CLIENT_EMAIL=
# GOOGLE_PRIVATE_KEY=
# GOOGLE_CALENDAR_ID=
# GOOGLE_SHEET_ID=
# RESEND_API_KEY=
# ADMIN_PASSWORD=
```

Also add `.env.local` to `.gitignore` if not already present (create-next-app usually adds it, but confirm the line exists).
  </action>
  <verify>
    <automated>grep -c "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" /home/user/Appointment-tool/.env.local.example && grep ".env.local" /home/user/Appointment-tool/.gitignore</automated>
  </verify>
  <acceptance_criteria>
    - .env.local.example contains the string `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
    - .env.local.example contains the string `NEXT_PUBLIC_SALON_ADDRESS`
    - .gitignore contains `.env.local` (exact line)
    - .env.local.example does NOT contain any actual secret values (no real API keys)
  </acceptance_criteria>
  <done>.env.local.example committed with Phase 1 required variables documented</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| env vars → browser | NEXT_PUBLIC_ vars are exposed to the client bundle |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Information Disclosure | NEXT_PUBLIC_GOOGLE_MAPS_API_KEY | mitigate | Restrict the Maps API key to your domain in Google Cloud Console (HTTP referrer restriction). Document this in .env.local.example comments. |
| T-01-02 | Information Disclosure | .env.local | accept | .gitignore prevents commit. create-next-app enforces this by default. |
</threat_model>

<verification>
Run `npm run build` — must exit 0.
Run `npm run lint` — must exit 0.
Confirm `ls src/components/ui/` returns: button.tsx, card.tsx, checkbox.tsx, input.tsx, label.tsx, calendar.tsx.
Confirm `cat components.json` shows `"style": "default"` and `"baseColor": "rose"`.
</verification>

<success_criteria>
- Next.js App Router project compiles with zero TypeScript errors
- Tailwind configured with rose brand palette
- shadcn/ui initialized with all required primitives present in src/components/ui/
- .env.local.example documents Phase 1 env vars
- Project is ready for component work in Wave 2
</success_criteria>

<output>
After completion, create `/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/01-01-SUMMARY.md`
</output>
