---
phase: 01-booking-form-ui
plan: "03"
subsystem: ui
tags: [react, nextjs, typescript, tailwind, shadcn, checkbox, booking-form]

requires:
  - phase: 01-booking-form-ui/01-02
    provides: Service type, SelectedService type, ServiceMode type, SERVICES catalog, SERVICE_GROUPS, getServicesByGroup

provides:
  - ServiceSelector component with grouped checkboxes across 5 service categories
  - Live total price and duration bar that updates on every checkbox interaction
  - In-house surcharge applied per-service from Service data (not hardcoded)
  - Responsive layout (1 col mobile, 2 col md+) using shadcn Card, Checkbox, Label

affects:
  - 01-04 (DateTimePicker — sibling booking form component)
  - Any parent page that composes the booking form

tech-stack:
  added: []
  patterns:
    - "Fully-controlled multi-select component: parent owns selectedIds, component calls onSelectionChange"
    - "Effective price helper: reads inHouseSurcharge from Service data, mode-aware"
    - "Duration formatting utility: formatDuration converts raw minutes to 'X hr Y min'"

key-files:
  created:
    - src/components/booking/ServiceSelector.tsx
  modified: []

key-decisions:
  - "Fully controlled component — no internal selection state; parent owns selectedIds array via props"
  - "Price and duration formatted inline (no separate utility file) — formatDuration helper local to component"
  - "Summary bar shows em-dash for duration and 'No services selected' message when nothing is chosen, avoiding $0/0 min confusion"

patterns-established:
  - "Booking components live in src/components/booking/ (new directory created)"
  - "Service group iteration via SERVICE_GROUPS constant + getServicesByGroup — maintains display order"

requirements-completed:
  - BOOK-02
  - BOOK-04

duration: 10min
completed: 2026-04-21
---

# Phase 1 Plan 03: ServiceSelector Component Summary

**Grouped checkbox service selector with live CA$ price and duration totals, applying per-service in-house surcharges from the service catalog**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-04-21T00:00:00Z
- **Completed:** 2026-04-21T00:10:00Z
- **Tasks:** 1
- **Files modified:** 1 (created)

## Accomplishments

- Created `src/components/booking/ServiceSelector.tsx` rendering all 17 services across 5 groups (Manicure, Pedicure, Sets & Refills, Design, Other)
- Live total bar updates price and duration on every checkbox toggle; in-house surcharge read from `Service.inHouseSurcharge` field
- Duration formatted as "X hr Y min" when >= 60 minutes, plain "X min" otherwise
- Zero TypeScript errors; fully responsive with shadcn Card + Checkbox + Label primitives

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ServiceSelector with grouped checkboxes and live total** - `d0ee9a4` (feat)

## Files Created/Modified

- `src/components/booking/ServiceSelector.tsx` - Controlled component: 5 service group Cards with multi-select Checkboxes and a sticky rose-100 summary bar showing live CA$ total and duration

## Decisions Made

- **Fully controlled component** — parent owns `selectedIds[]`; component only calls `onSelectionChange`. No internal useState needed.
- **Local formatDuration helper** — simple pure function; no need for a shared utility file at this stage.
- **Summary bar UX** — shows "No services selected" and em-dash for duration when total is 0, avoiding misleading "CA$0 / 0 min" display.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None. All 17 services from the catalog are rendered; prices and surcharges come directly from the `SERVICES` data.

## Threat Surface Scan

No new network endpoints, auth paths, or trust boundaries introduced. Component is fully client-side display-only; prices are display-only per the plan's threat model (T-03-01 accepted — server-side price verification in Phase 3).

## Next Phase Readiness

- `ServiceSelector` is ready to be composed into the main booking form page
- Accepts `mode`, `selectedIds`, `onSelectionChange` — integrates with `DateTimePicker` (Plan 04) and the top-level form state (Plan 05)

---
*Phase: 01-booking-form-ui*
*Completed: 2026-04-21*
