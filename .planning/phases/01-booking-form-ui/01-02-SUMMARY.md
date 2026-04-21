---
phase: 01-booking-form-ui
plan: "02"
subsystem: ui
tags: [typescript, next.js, react, services-catalog, scheduling]

# Dependency graph
requires:
  - phase: 01-booking-form-ui plan 01
    provides: Next.js scaffold, Tailwind CSS, shadcn/ui, src/lib/utils.ts
provides:
  - TypeScript booking domain types (ServiceMode, ServiceGroup, Service, SelectedService, BookingSummary, TimeSlot)
  - Static services catalog (17 services across 5 groups) with prices, surcharges, durations
  - Schedule utilities (getUpcomingSundays, isBookableDate, getDayTimeSlots)
  - NAIL_TECHS constant ['Lona']
  - SERVICE_GROUPS const and getServicesByGroup() helper
affects:
  - 01-booking-form-ui plan 03 (mode toggle component)
  - 01-booking-form-ui plan 04 (service selection checkboxes)
  - 01-booking-form-ui plan 05 (booking summary)
  - All subsequent plans that import from src/lib/types.ts, src/lib/services.ts, or src/lib/schedule.ts

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Static data module pattern: pure TypeScript with no side effects, importable by any component
    - Interface-first type definitions enabling typed props across all booking components

key-files:
  created:
    - src/lib/types.ts
    - src/lib/services.ts
    - src/lib/schedule.ts
  modified: []

key-decisions:
  - "Hardcoded Sunday-only, 10am-5pm scheduling for Phase 1; Phase 2 replaces with live Calendar API reads"
  - "NAIL_TECHS=['Lona'] hardcoded; admin-configurable in Phase 5"
  - "getDayTimeSlots returns 7 slots (10am-4pm inclusive, last slot at 4pm since WORK_END_HOUR=17 is exclusive)"
  - "Sets & Refills group uses inHouseSurcharge=15; all other groups use 10"

patterns-established:
  - "Type imports from './types' across all lib modules"
  - "Service catalog as pure const array, filtered via getServicesByGroup() helper"
  - "Schedule generation as pure functions with no external dependencies"

requirements-completed:
  - BOOK-02
  - BOOK-03
  - BOOK-04
  - BOOK-05

# Metrics
duration: 2min
completed: 2026-04-21
---

# Phase 1 Plan 02: Service Catalog Types and Static Data Summary

**TypeScript booking domain types, 17-service catalog across 5 groups, and Sunday slot generator — zero-UI contracts for all booking form components**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-21T23:24:31Z
- **Completed:** 2026-04-21T23:25:46Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- All booking domain types defined in src/lib/types.ts: ServiceMode, ServiceGroup, Service, SelectedService, BookingSummary (with marketingOptIn), TimeSlot
- Static services catalog with exactly 17 services across all 5 groups, including correct in-house surcharges (10 or 15 per group) and durations
- Schedule utilities: getUpcomingSundays (8 weeks ahead), isBookableDate (Sunday >= today), getDayTimeSlots (7 slots: 10am-4pm)
- Zero TypeScript errors across all three files

## Task Commits

Each task was committed atomically:

1. **Task 1: Define TypeScript types for the booking domain** - `ebd23a0` (feat)
2. **Task 2: Create static services catalog and schedule utilities** - `646ba8e` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/lib/types.ts` - ServiceMode, ServiceGroup, Service, SelectedService, BookingSummary, TimeSlot interfaces
- `src/lib/services.ts` - 17 services SERVICES array, SERVICE_GROUPS const, NAIL_TECHS=['Lona'], getServicesByGroup()
- `src/lib/schedule.ts` - getUpcomingSundays(), isBookableDate(), getDayTimeSlots() returning 7 slots (10am-4pm)

## Decisions Made
- Hardcoded Sunday-only scheduling in Phase 1; plan explicitly marks Phase 2 as the replacement with live Calendar API reads
- Sets & Refills use $15 in-house surcharge vs $10 for all other groups, matching business rules from CLAUDE.md
- `SLOT_DURATION_MIN` constant defined in schedule.ts even though not used in getDayTimeSlots loop (documents intent for future variable-slot work)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required. All data is static TypeScript.

## Known Stubs
None - this plan defines static data with no UI rendering.

## Threat Flags
None - all data in this plan is hardcoded static catalog with no network endpoints, auth paths, or runtime injection.

## Next Phase Readiness
- All type contracts are available for import by Wave 3 components
- src/lib/types.ts, src/lib/services.ts, and src/lib/schedule.ts are complete and passing TypeScript checks
- Plan 03 (mode toggle), Plan 04 (service selection), and Plan 05 (booking summary) can now import from these modules

---
*Phase: 01-booking-form-ui*
*Completed: 2026-04-21*
