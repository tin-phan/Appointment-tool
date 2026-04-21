---
plan: "04"
wave: 3
title: DateTimePicker Component — Sunday Slots, Static Schedule
depends_on:
  - "01"
  - "02"
files_modified:
  - src/components/booking/DateTimePicker.tsx
autonomous: true
requirements:
  - BOOK-05
must_haves:
  - Date picker renders a calendar restricted to Sundays only (all other days disabled/greyed)
  - No past dates are selectable
  - After a date is selected, a list of time slots (10:00 AM through 4:00 PM, 60-minute intervals) appears
  - Selecting a time slot calls the onSlotSelect callback with both the date and time value
---

<objective>
Build the DateTimePicker component: a shadcn Calendar restricted to Sundays + a time slot grid shown after date selection. No live calendar availability check — that is Phase 2.

Purpose: Customers must be able to pick a Sunday appointment date and time before Phase 2 calendar integration.
Output: src/components/booking/DateTimePicker.tsx — controlled component that accepts selectedDate/selectedTime and calls callbacks on change.
</objective>

<execution_context>
@/home/user/Appointment-tool/.claude/get-shit-done/workflows/execute-plan.md
@/home/user/Appointment-tool/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/user/Appointment-tool/.planning/REQUIREMENTS.md
@/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/CONTEXT.md

<interfaces>
<!-- Types and schedule utilities this component consumes. Defined in Plan 02. -->

From src/lib/types.ts:
```ts
export interface TimeSlot {
  label: string;   // e.g. "10:00 AM"
  value: string;   // e.g. "10:00"
}
```

From src/lib/schedule.ts:
```ts
export function isBookableDate(date: Date): boolean;
export function getDayTimeSlots(): TimeSlot[];
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build DateTimePicker with Sunday-restricted calendar and time slot grid</name>
  <read_first>
    - /home/user/Appointment-tool/src/lib/types.ts
    - /home/user/Appointment-tool/src/lib/schedule.ts
    - /home/user/Appointment-tool/src/components/ui/calendar.tsx (shadcn Calendar API — note the `disabled` prop accepts a function (date: Date) => boolean)
  </read_first>
  <files>
    src/components/booking/DateTimePicker.tsx
  </files>
  <action>
Create `/home/user/Appointment-tool/src/components/booking/DateTimePicker.tsx`.

The component props interface:
```ts
interface Props {
  selectedDate: Date | undefined;
  selectedTime: string | undefined;   // 24h value from TimeSlot.value, e.g. "10:00"
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (timeValue: string) => void;
}
```

Implementation requirements:

1. Import shadcn Calendar from '@/components/ui/calendar'. Import isBookableDate, getDayTimeSlots from '@/lib/schedule'. Import TimeSlot from '@/lib/types'.

2. Render a shadcn Calendar component with:
   - `mode="single"` 
   - `selected={selectedDate}`
   - `onSelect={onDateChange}`
   - `disabled={(date) => !isBookableDate(date)}` — this disables all non-Sunday and past dates

3. When selectedDate is defined, render a time slot selection section below the calendar:
   - Call `getDayTimeSlots()` to get the slot list
   - Render each slot as a button (use shadcn Button variant="outline")
   - The selected time slot gets `variant="default"` (rose-filled) and the others get `variant="outline"`
   - On click: call `onTimeChange(slot.value)`
   - Display slots in a responsive grid: 3 columns on mobile, 4 on sm: breakpoint

4. When no date is selected, show a placeholder message instead of the time grid: "Select a Sunday above to see available times."

5. Show the selected date in a human-readable format above the time grid when a date is chosen, e.g. "Sunday, December 1, 2024". Use `date.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })`.

6. Export as default: `export default function DateTimePicker({ selectedDate, selectedTime, onDateChange, onTimeChange }: Props)`

7. The component is purely presentational — no internal state. All selection state lives in the parent.

Note: The shadcn Calendar `disabled` prop accepts a function `(date: Date) => boolean`. Returning `true` disables that date. `isBookableDate` returns `true` for valid Sundays, so negate it: `disabled={(date) => !isBookableDate(date)}`.
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/components/booking/DateTimePicker.tsx
    - Contains `export default function DateTimePicker`
    - Imports Calendar from '@/components/ui/calendar' (grep confirms)
    - Imports `isBookableDate` from '@/lib/schedule' (grep confirms)
    - Contains `getDayTimeSlots` call (grep confirms)
    - Contains `disabled` prop referencing `isBookableDate` (grep: `grep "isBookableDate" src/components/booking/DateTimePicker.tsx`)
    - Contains `onTimeChange` in the component body (grep confirms)
    - `npx tsc --noEmit` exits 0 with no errors referencing DateTimePicker.tsx
  </acceptance_criteria>
  <done>DateTimePicker renders a Sunday-restricted calendar and a 7-slot time grid that appears after date selection</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| User date/time selection → React state | Client-side only; no server calls in this component |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-04-01 | Tampering | Client-side date restriction | accept | Date restriction is UX-only in Phase 1 (static schedule). Phase 2 will validate server-side against Google Calendar. No booking is committed in Phase 1. |
</threat_model>

<verification>
`npx tsc --noEmit` exits 0.
`grep "isBookableDate" src/components/booking/DateTimePicker.tsx` returns a match.
`grep "getDayTimeSlots" src/components/booking/DateTimePicker.tsx` returns a match.
`grep "disabled" src/components/booking/DateTimePicker.tsx` returns a match.
</verification>

<success_criteria>
- Calendar renders with non-Sunday dates visually disabled
- Time slot grid appears only after a Sunday date is selected
- Selected date displayed in "Sunday, Month D, YYYY" format
- Selected time slot visually distinguished from unselected slots
- Zero TypeScript errors
</success_criteria>

<output>
After completion, create `/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/01-04-SUMMARY.md`
</output>
