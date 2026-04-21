---
plan: "03"
wave: 3
title: ServiceSelector Component — Grouped Checkboxes with Live Pricing
depends_on:
  - "01"
  - "02"
files_modified:
  - src/components/booking/ServiceSelector.tsx
autonomous: true
requirements:
  - BOOK-02
  - BOOK-04
must_haves:
  - Customer sees five labeled service groups, each with checkboxes for individual services
  - Selecting a service immediately updates the running total price and total duration below the list
  - In-house mode adds the per-service surcharge (inHouseSurcharge) to each selected service price in the live total
  - Multi-select works correctly — any combination of services from any group can be checked simultaneously
---

<objective>
Build the ServiceSelector component: grouped checkboxes across five categories with a live running total that responds to both service selection and in-house/at-salon mode switching.

Purpose: This is the primary value-delivery component of the booking form. Live pricing feedback reduces customer confusion and abandonment.
Output: src/components/booking/ServiceSelector.tsx — a controlled component accepting selectedIds and mode as props, calling onSelectionChange on every checkbox interaction.
</objective>

<execution_context>
@/home/user/Appointment-tool/.claude/get-shit-done/workflows/execute-plan.md
@/home/user/Appointment-tool/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/user/Appointment-tool/.planning/REQUIREMENTS.md
@/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/CONTEXT.md

<interfaces>
<!-- Types and data this component consumes. Defined in Plan 02. -->

From src/lib/types.ts:
```ts
export type ServiceMode = 'at-salon' | 'in-house';
export type ServiceGroup = 'Manicure' | 'Pedicure' | 'Sets & Refills' | 'Design' | 'Other';

export interface Service {
  id: string;
  name: string;
  group: ServiceGroup;
  basePrice: number;
  inHouseSurcharge: number;
  durationMin: number;
}

export interface SelectedService extends Service {
  effectivePrice: number;
}
```

From src/lib/services.ts:
```ts
export const SERVICES: Service[];
export const SERVICE_GROUPS: readonly string[];
export function getServicesByGroup(group: string): Service[];
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: Build ServiceSelector with grouped checkboxes and live total</name>
  <read_first>
    - /home/user/Appointment-tool/src/lib/types.ts
    - /home/user/Appointment-tool/src/lib/services.ts
    - /home/user/Appointment-tool/src/components/ui/checkbox.tsx (shadcn Checkbox API)
    - /home/user/Appointment-tool/src/components/ui/card.tsx (shadcn Card API)
    - /home/user/Appointment-tool/src/components/ui/label.tsx (shadcn Label API)
  </read_first>
  <files>
    src/components/booking/ServiceSelector.tsx
  </files>
  <behavior>
    - When no services selected: total price = $0, total duration = 0 min
    - When "Manicure w/o Shellac" selected in at-salon mode: total = $25, duration = 45 min
    - When "Manicure w/o Shellac" selected in in-house mode: total = $35 (25 + 10 surcharge), duration = 45 min
    - When "Acrylic Full Set" selected in in-house mode: total = $75 (60 + 15 surcharge), duration = 90 min
    - When two services selected: prices and durations sum correctly
    - Unchecking a service removes it from the total
  </behavior>
  <action>
Create `/home/user/Appointment-tool/src/components/booking/ServiceSelector.tsx`.

The component props interface:
```ts
interface Props {
  mode: ServiceMode;
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}
```

Implementation requirements:

1. Import SERVICE_GROUPS and getServicesByGroup from '@/lib/services'. Import Service, ServiceMode from '@/lib/types'. Import shadcn Checkbox, Label, Card, CardContent, CardHeader, CardTitle.

2. Render each group as a shadcn Card with CardHeader (group name as CardTitle) and CardContent (list of services).

3. Each service row: shadcn Checkbox + shadcn Label showing service name and base price. Format price as `CA$${price}` (no decimals for whole numbers). For in-house mode, show effective price: `CA$${basePrice + inHouseSurcharge}`.

4. On checkbox change: toggle the service id in selectedIds, call onSelectionChange with the updated array.

5. Below all group cards, render a summary bar:
   - Total duration: sum of durationMin for all selected services, display as "X min" or "X hr Y min" when >= 60
   - Total price: sum of effectivePrice (basePrice + inHouseSurcharge when in-house mode, else basePrice). Display as `CA$${total}`
   - Use a sticky or visually prominent div with rose-100 background and rose-800 text

6. Apply responsive layout: service group cards stack vertically on mobile (default), 2-column grid on md: breakpoint.

7. Do NOT use any form library. All state is managed by the parent via selectedIds prop (fully controlled).

8. Export as default: `export default function ServiceSelector({ mode, selectedIds, onSelectionChange }: Props)`

Surcharge reference (use these exact values from the SERVICES catalog):
- Manicure, Pedicure, Design, Other: +$10 in-house surcharge
- Sets & Refills: +$15 in-house surcharge
(These values come from each Service object's `inHouseSurcharge` field — read from the data, do not hardcode the surcharge amounts in the component.)
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/components/booking/ServiceSelector.tsx
    - Contains `export default function ServiceSelector`
    - Imports from '@/lib/services' (grep: `grep "from '@/lib/services'" src/components/booking/ServiceSelector.tsx`)
    - Imports Checkbox from shadcn (grep: `grep "Checkbox" src/components/booking/ServiceSelector.tsx`)
    - Contains the string `inHouseSurcharge` (proves surcharge logic reads from data, not hardcoded)
    - Contains the string `CA$` for price display
    - Contains `durationMin` in the totalling logic
    - `npx tsc --noEmit` exits 0 with no errors referencing ServiceSelector.tsx
  </acceptance_criteria>
  <done>ServiceSelector renders 5 service group cards with checkboxes and a live price+duration total bar that reflects mode (at-salon vs in-house)</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| User checkbox input → React state | Client-side only; no server calls in this component |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-03-01 | Tampering | Displayed price total | accept | Prices are display-only; no payment or server write happens in Phase 1. Authoritative price verified server-side in Phase 3 when booking is saved. |
</threat_model>

<verification>
`npx tsc --noEmit` exits 0.
`grep "inHouseSurcharge" src/components/booking/ServiceSelector.tsx` returns a match (proves live in-house pricing logic is present).
`grep "CA\$" src/components/booking/ServiceSelector.tsx` returns at least one match.
`grep "durationMin" src/components/booking/ServiceSelector.tsx` returns at least one match.
</verification>

<success_criteria>
- Component renders all 17 services in their correct groups
- Live total updates on every checkbox change
- In-house surcharge applied from Service data (not hardcoded in component)
- Duration formatted as "X hr Y min" when >= 60 minutes
- Zero TypeScript errors
</success_criteria>

<output>
After completion, create `/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/01-03-SUMMARY.md`
</output>
