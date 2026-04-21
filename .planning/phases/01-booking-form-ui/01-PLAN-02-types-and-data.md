---
plan: "02"
wave: 2
title: Service Catalog Types and Static Data
depends_on:
  - "01"
files_modified:
  - src/lib/types.ts
  - src/lib/services.ts
  - src/lib/schedule.ts
autonomous: true
requirements:
  - BOOK-02
  - BOOK-03
  - BOOK-04
  - BOOK-05
must_haves:
  - All service data (name, group, base price, in-house surcharge, duration) is statically defined and TypeScript-typed
  - All five service groups (Manicure, Pedicure, Sets & Refills, Design, Other) are represented
  - Sunday 10am–5pm slot generation function returns the correct 60-minute slots as strings
  - Nail tech list is defined (single entry: "Lona") for Phase 1 hardcoded use
---

<objective>
Define all TypeScript types and static data that every subsequent component plan depends on. This plan creates zero UI — only the contracts and data that components import.

Purpose: Interface-first ordering prevents the scavenger hunt anti-pattern. Components in Wave 3 receive concrete types and data without exploring the codebase.
Output: src/lib/types.ts (interfaces), src/lib/services.ts (catalog), src/lib/schedule.ts (slot generator).
</objective>

<execution_context>
@/home/user/Appointment-tool/.claude/get-shit-done/workflows/execute-plan.md
@/home/user/Appointment-tool/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/user/Appointment-tool/.planning/ROADMAP.md
@/home/user/Appointment-tool/.planning/REQUIREMENTS.md
@/home/user/Appointment-tool/CLAUDE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Define TypeScript types for the booking domain</name>
  <read_first>
    - /home/user/Appointment-tool/.planning/REQUIREMENTS.md (BOOK-01 through BOOK-07, LOC-01–02)
    - /home/user/Appointment-tool/.planning/phases/01-booking-form-ui/CONTEXT.md (service selection UX, key component decisions)
  </read_first>
  <files>
    src/lib/types.ts
  </files>
  <action>
Create `/home/user/Appointment-tool/src/lib/types.ts` with exactly the following content:

```ts
// Booking domain types for Lona Nail Appointment Tool

export type ServiceMode = 'at-salon' | 'in-house';

export type ServiceGroup =
  | 'Manicure'
  | 'Pedicure'
  | 'Sets & Refills'
  | 'Design'
  | 'Other';

export interface Service {
  id: string;                   // e.g. "manicure-shellac-hand"
  name: string;                 // display name
  group: ServiceGroup;
  basePrice: number;            // at-salon price in CAD
  inHouseSurcharge: number;     // added when mode === 'in-house' (10 or 15)
  durationMin: number;          // service duration in minutes
}

export interface SelectedService extends Service {
  effectivePrice: number;       // basePrice + inHouseSurcharge when in-house
}

export interface BookingSummary {
  mode: ServiceMode;
  services: SelectedService[];
  techName: string;
  date: string;                 // ISO date string, e.g. "2024-12-01"
  timeSlot: string;             // e.g. "10:00 AM"
  totalDurationMin: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  inHouseAddress?: string;      // only when mode === 'in-house'
  marketingOptIn: boolean;
}

export interface TimeSlot {
  label: string;                // e.g. "10:00 AM"
  value: string;                // 24h format, e.g. "10:00"
}
```
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/lib/types.ts
    - Contains export for `ServiceMode` as a union type with literals 'at-salon' and 'in-house'
    - Contains export for `ServiceGroup` as a union type with all five group names
    - Contains export for `Service` interface with fields: id, name, group, basePrice, inHouseSurcharge, durationMin
    - Contains export for `BookingSummary` interface with field `marketingOptIn: boolean`
    - Contains export for `TimeSlot` interface with fields: label, value
    - `npx tsc --noEmit` exits 0
  </acceptance_criteria>
  <done>All booking domain types defined with zero TypeScript errors</done>
</task>

<task type="auto">
  <name>Task 2: Create static services catalog and schedule utilities</name>
  <read_first>
    - /home/user/Appointment-tool/src/lib/types.ts (Service interface — just created above)
    - /home/user/Appointment-tool/.planning/phases/01-booking-form-ui/CONTEXT.md (services pricing table)
  </read_first>
  <files>
    src/lib/services.ts
    src/lib/schedule.ts
  </files>
  <action>
Create `/home/user/Appointment-tool/src/lib/services.ts` with the complete services catalog. Use exactly these values (from the Phase 1 planning context):

```ts
import { Service } from './types';

export const SERVICES: Service[] = [
  // Manicure group
  { id: 'man-no-shellac',    name: 'Manicure w/o Shellac',   group: 'Manicure',       basePrice: 25, inHouseSurcharge: 10, durationMin: 45 },
  { id: 'man-shellac-hand',  name: 'Shellac Hand',           group: 'Manicure',       basePrice: 40, inHouseSurcharge: 10, durationMin: 45 },
  { id: 'man-with-shellac',  name: 'Manicure w/ Shellac',    group: 'Manicure',       basePrice: 50, inHouseSurcharge: 10, durationMin: 60 },
  { id: 'man-take-off',      name: 'Nail Take Off',          group: 'Manicure',       basePrice: 20, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'man-repair',        name: 'Nail Repair',            group: 'Manicure',       basePrice:  5, inHouseSurcharge: 10, durationMin: 15 },

  // Pedicure group
  { id: 'ped-no-shellac',    name: 'Pedicure w/o Shellac',   group: 'Pedicure',       basePrice: 50, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'ped-with-shellac',  name: 'Pedicure w/ Shellac',    group: 'Pedicure',       basePrice: 55, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'ped-shellac-feet',  name: 'Shellac Feet',           group: 'Pedicure',       basePrice: 35, inHouseSurcharge: 10, durationMin: 30 },

  // Sets & Refills group
  { id: 'set-acrylic-full',  name: 'Acrylic Full Set',       group: 'Sets & Refills', basePrice: 60, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-gel-full',      name: 'Gel Full Set',           group: 'Sets & Refills', basePrice: 65, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-acrylic-refill',name: 'Acrylic Refill',         group: 'Sets & Refills', basePrice: 50, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-gel-refill',    name: 'Gel Refill',             group: 'Sets & Refills', basePrice: 55, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-long-addon',    name: 'Long Nail add-on',       group: 'Sets & Refills', basePrice:  5, inHouseSurcharge: 10, durationMin: 15 },

  // Design group
  { id: 'des-white-airbrush',name: 'White Airbrush',         group: 'Design',         basePrice: 15, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'des-colour-airbrush',name:'Colour Airbrush',        group: 'Design',         basePrice: 15, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'des-hand-drawn',    name: 'Hand-Drawn',             group: 'Design',         basePrice:  5, inHouseSurcharge: 10, durationMin: 30 },

  // Other group
  { id: 'oth-kids-combo',    name: 'Kids Combo',             group: 'Other',          basePrice: 60, inHouseSurcharge: 10, durationMin: 60 },
];

// Group names in display order
export const SERVICE_GROUPS = [
  'Manicure',
  'Pedicure',
  'Sets & Refills',
  'Design',
  'Other',
] as const;

// Hardcoded for Phase 1; admin-configurable in Phase 5
export const NAIL_TECHS: string[] = ['Lona'];

export function getServicesByGroup(group: string): Service[] {
  return SERVICES.filter((s) => s.group === group);
}
```

Then create `/home/user/Appointment-tool/src/lib/schedule.ts`:

```ts
import { TimeSlot } from './types';

// Phase 1: hardcoded Sunday-only, 10am–5pm, 60-minute slots.
// Phase 2 will replace availability filtering with live Calendar API reads.

const WORK_START_HOUR = 10; // 10:00 AM
const WORK_END_HOUR   = 17; // 5:00 PM (last slot start, so 5pm is not a slot start)
const SLOT_DURATION_MIN = 60;

/** Returns the Sunday dates within the next N weeks from today. */
export function getUpcomingSundays(weeksAhead = 8): Date[] {
  const sundays: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < weeksAhead * 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) sundays.push(d);
  }
  return sundays;
}

/** Returns whether a given date is a bookable Sunday (today or future). */
export function isBookableDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getDay() === 0 && date >= today;
}

/** Returns the 60-minute time slots for a valid working day. */
export function getDayTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
    const suffix = hour < 12 ? 'AM' : 'PM';
    const display = hour <= 12 ? hour : hour - 12;
    slots.push({
      label: `${display}:00 ${suffix}`,
      value: `${String(hour).padStart(2, '0')}:00`,
    });
  }
  return slots;
}
```
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/lib/services.ts and contains exactly 17 entries in the SERVICES array (count by grep: `grep -c "id:" src/lib/services.ts` returns 17)
    - SERVICES array contains all five groups: 'Manicure', 'Pedicure', 'Sets & Refills', 'Design', 'Other'
    - NAIL_TECHS array contains the string 'Lona'
    - File exists at src/lib/schedule.ts and exports functions: getUpcomingSundays, isBookableDate, getDayTimeSlots
    - `getDayTimeSlots()` would return 7 slots (hours 10, 11, 12, 13, 14, 15, 16 — i.e. 10am to 4pm inclusive, last slot at 4pm since end=17 is exclusive) — verify by grep: `grep "WORK_END_HOUR" src/lib/schedule.ts` shows 17
    - `npx tsc --noEmit` exits 0
  </acceptance_criteria>
  <done>Services catalog (17 services across 5 groups) and schedule utilities are statically defined and type-safe</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Static data → client bundle | All data in this plan is hardcoded — no secrets, no runtime injection |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02-01 | Tampering | services.ts price data | accept | Prices are client-side display only; no payment processing in Phase 1. Authoritative price is verified at booking confirmation in Phase 3. |
</threat_model>

<verification>
`npx tsc --noEmit` exits 0.
`grep -c "id:" src/lib/services.ts` returns 17.
`grep "NAIL_TECHS" src/lib/services.ts` shows array containing 'Lona'.
`grep "getDayTimeSlots\|getUpcomingSundays\|isBookableDate" src/lib/schedule.ts` returns 3 matches.
</verification>

<success_criteria>
- All booking domain types exported from src/lib/types.ts with zero TypeScript errors
- All 17 services catalogued with correct groups, prices, surcharges, and durations
- Schedule utilities correctly filter to Sundays and return 7 time slots (10am–4pm inclusive)
- NAIL_TECHS exported with single entry "Lona"
- Zero TypeScript errors across all three files
</success_criteria>

<output>
After completion, create `/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/01-02-SUMMARY.md`
</output>
