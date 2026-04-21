---
plan: "05"
wave: 4
title: Mode Toggle, Location Fields, Contact Form, and Marketing Consent
depends_on:
  - "01"
  - "02"
  - "03"
files_modified:
  - src/components/booking/ModeToggle.tsx
  - src/components/booking/LocationFields.tsx
  - src/components/booking/ContactForm.tsx
  - src/components/booking/MarketingConsent.tsx
autonomous: true
requirements:
  - BOOK-01
  - BOOK-03
  - BOOK-06
  - LOC-01
  - LOC-02
  - MKT-01
  - MKT-02
must_haves:
  - Mode toggle (At-Salon / In-House) switches the visible location section between read-only salon address and Google Maps autocomplete input
  - Google Maps Places autocomplete is wired to the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable
  - Nail tech selector shows "Lona" as the only option (hardcoded, per Phase 1 scope)
  - Name, phone, and email fields all validate on blur — name required, phone matches CA/US format, email matches standard format
  - Marketing opt-in checkbox and privacy statement both appear above the submit button
---

<objective>
Build four focused form-section components: mode toggle (at-salon/in-house), location display/input, contact fields with validation, and marketing consent block.

Purpose: These components complete the form sections outside of service selection and date/time. They are each small enough to implement in parallel tasks but share no files, so they go in one wave-4 plan.
Output: Four new component files in src/components/booking/, each a controlled component.
</objective>

<execution_context>
@/home/user/Appointment-tool/.claude/get-shit-done/workflows/execute-plan.md
@/home/user/Appointment-tool/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/user/Appointment-tool/.planning/REQUIREMENTS.md
@/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/CONTEXT.md

<interfaces>
<!-- Types this plan's components consume. Defined in Plan 02. -->

From src/lib/types.ts:
```ts
export type ServiceMode = 'at-salon' | 'in-house';
```

From src/lib/services.ts:
```ts
export const NAIL_TECHS: string[];  // ['Lona'] in Phase 1
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: ModeToggle, LocationFields, and Nail Tech selector</name>
  <read_first>
    - /home/user/Appointment-tool/src/lib/types.ts
    - /home/user/Appointment-tool/src/lib/services.ts
    - /home/user/Appointment-tool/src/components/ui/button.tsx (shadcn Button — for toggle)
    - /home/user/Appointment-tool/src/components/ui/input.tsx (shadcn Input)
    - /home/user/Appointment-tool/src/components/ui/label.tsx (shadcn Label)
  </read_first>
  <files>
    src/components/booking/ModeToggle.tsx
    src/components/booking/LocationFields.tsx
  </files>
  <action>
**File 1: `/home/user/Appointment-tool/src/components/booking/ModeToggle.tsx`**

Props:
```ts
interface Props {
  mode: ServiceMode;
  onChange: (mode: ServiceMode) => void;
  techName: string;
  onTechChange: (techName: string) => void;
}
```

Implementation:
1. Import ServiceMode from '@/lib/types'. Import NAIL_TECHS from '@/lib/services'. Import shadcn Button.
2. Render two buttons side-by-side: "At-Salon" and "In-House". The active mode button uses `variant="default"` (rose background); the inactive uses `variant="outline"`.
3. Clicking a button calls `onChange(mode)` with the corresponding mode value.
4. Below the mode buttons, render a native `<select>` element for nail tech (using Tailwind classes, NOT shadcn Select to keep Phase 1 simple):
   - Label: "Nail Technician"
   - Options: map over NAIL_TECHS array
   - Current value: `techName`
   - onChange: calls `onTechChange(e.target.value)`
   - Style: `className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"`
5. Export as default.

---

**File 2: `/home/user/Appointment-tool/src/components/booking/LocationFields.tsx`**

Props:
```ts
interface Props {
  mode: ServiceMode;
  inHouseAddress: string;
  onAddressChange: (address: string) => void;
}
```

Implementation:
1. Import ServiceMode from '@/lib/types'. Import shadcn Input, Label.
2. Conditional render based on mode:
   - **at-salon**: Render a read-only display box showing `process.env.NEXT_PUBLIC_SALON_ADDRESS ?? 'Salon address not configured'`. Style as a grey read-only input: `className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"`. Label: "Salon Address".
   - **in-house**: Render a Google Maps Places autocomplete input. Since this is a client component, load the Maps JS API script dynamically using `useEffect`. 
     - Load script: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
     - Use a `ref` on the Input element to attach `google.maps.places.Autocomplete`.
     - On place selection: extract `place.formatted_address` and call `onAddressChange(place.formatted_address ?? '')`.
     - The raw input change also calls `onAddressChange(e.target.value)` to keep state in sync while the user types.
     - Add `'use client'` directive at the top of this file.
     - Label: "Your Address"
     - Placeholder: "Start typing your address..."
3. Export as default.

Important for Maps script loading:
- Use a module-level flag `let mapsScriptLoaded = false` to prevent loading the script twice.
- Only append the script tag if `window.google?.maps` is not already defined AND the flag is false.
- Set the flag to true when appending.
- The `useEffect` cleanup should do nothing (scripts stay loaded).
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/components/booking/ModeToggle.tsx and exports a default function
    - ModeToggle imports NAIL_TECHS from '@/lib/services' (grep: `grep "NAIL_TECHS" src/components/booking/ModeToggle.tsx`)
    - ModeToggle contains both 'At-Salon' and 'In-House' strings (grep confirms both labels)
    - File exists at src/components/booking/LocationFields.tsx and exports a default function
    - LocationFields.tsx contains `'use client'` at the top (grep confirms)
    - LocationFields.tsx contains `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` reference (grep confirms)
    - LocationFields.tsx contains `Autocomplete` or `autocomplete` reference (grep confirms Maps Places usage)
    - LocationFields.tsx contains `NEXT_PUBLIC_SALON_ADDRESS` reference (grep confirms)
    - `npx tsc --noEmit` exits 0
  </acceptance_criteria>
  <done>ModeToggle switches between at-salon/in-house with visual active state; LocationFields shows salon address or Maps autocomplete input accordingly</done>
</task>

<task type="auto">
  <name>Task 2: ContactForm with validation and MarketingConsent block</name>
  <read_first>
    - /home/user/Appointment-tool/src/components/ui/input.tsx (shadcn Input)
    - /home/user/Appointment-tool/src/components/ui/label.tsx (shadcn Label)
    - /home/user/Appointment-tool/src/components/ui/checkbox.tsx (shadcn Checkbox)
  </read_first>
  <files>
    src/components/booking/ContactForm.tsx
    src/components/booking/MarketingConsent.tsx
  </files>
  <action>
**File 1: `/home/user/Appointment-tool/src/components/booking/ContactForm.tsx`**

Props:
```ts
interface Props {
  name: string;
  phone: string;
  email: string;
  errors: { name?: string; phone?: string; email?: string };
  onChange: (field: 'name' | 'phone' | 'email', value: string) => void;
  onBlur: (field: 'name' | 'phone' | 'email') => void;
}
```

Implementation:
1. Import shadcn Input, Label. No form library.
2. Render three field rows (name, phone, email). Each row:
   - shadcn Label (e.g., "Full Name", "Cell Phone", "Email Address")
   - shadcn Input bound to the prop value
   - `onChange`: calls `onChange(field, e.target.value)`
   - `onBlur`: calls `onBlur(field)`
   - Below the Input, conditionally render error message in `<p className="text-sm text-destructive mt-1">` when `errors[field]` is defined
3. Input types: name → `type="text"`, phone → `type="tel"`, email → `type="email"`
4. Placeholders: name → "Jane Smith", phone → "604-555-0100", email → "jane@example.com"
5. Export as default.

---

**File 2: `/home/user/Appointment-tool/src/components/booking/MarketingConsent.tsx`**

Props:
```ts
interface Props {
  optIn: boolean;
  onChange: (optIn: boolean) => void;
}
```

Implementation:
1. Import shadcn Checkbox, Label.
2. Render:
   - Privacy statement paragraph (always visible): `"Lona Nail respects your privacy. We will never sell your personal information to third parties."`
   - Checkbox row: shadcn Checkbox with id="marketing-opt-in" + shadcn Label for="marketing-opt-in" with text: `"Yes, I'd like to receive email updates and SMS care reminders from Lona Nail."`
   - Checkbox checked state: `checked={optIn}`, onCheckedChange: `(checked) => onChange(checked === true)`
3. Style privacy statement as small muted text: `className="text-sm text-muted-foreground mb-3"`
4. Export as default.

---

**Validation logic (export from ContactForm.tsx as a named export for use in parent):**

```ts
export function validateContactFields(
  name: string,
  phone: string,
  email: string
): { name?: string; phone?: string; email?: string } {
  const errors: { name?: string; phone?: string; email?: string } = {};

  if (!name.trim()) {
    errors.name = 'Full name is required.';
  }

  // Accepts Canadian/US formats: 604-555-0100, (604) 555-0100, 6045550100, +16045550100
  const phoneRegex = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phone.trim()) {
    errors.phone = 'Cell phone is required.';
  } else if (!phoneRegex.test(phone.trim())) {
    errors.phone = 'Enter a valid Canadian or US phone number.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}
```

Add this function at the bottom of ContactForm.tsx and export it as a named export alongside the default component export.
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/components/booking/ContactForm.tsx
    - Exports both a default component AND named export `validateContactFields` (grep: `grep "export function validateContactFields" src/components/booking/ContactForm.tsx`)
    - ContactForm.tsx contains `type="tel"` for phone field (grep confirms)
    - ContactForm.tsx contains `text-destructive` for error display (grep confirms)
    - ContactForm.tsx contains the phone regex pattern `/^\(\+\?1` or similar (grep: `grep "phoneRegex" src/components/booking/ContactForm.tsx`)
    - File exists at src/components/booking/MarketingConsent.tsx
    - MarketingConsent.tsx contains the exact string "We will never sell your personal information to third parties" (grep confirms)
    - MarketingConsent.tsx imports Checkbox from shadcn (grep: `grep "Checkbox" src/components/booking/MarketingConsent.tsx`)
    - `npx tsc --noEmit` exits 0
  </acceptance_criteria>
  <done>ContactForm validates name/phone/email on blur; MarketingConsent renders privacy statement and opt-in checkbox</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Google Maps API key → browser network | NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is exposed in the client bundle and in the script URL |
| User-typed address → React state | Client-side only; no server write in Phase 1 |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-05-01 | Information Disclosure | NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in script URL | mitigate | Restrict the key to your domain via HTTP referrer in Google Cloud Console. Document restriction requirement in .env.local.example comment (already done in Plan 01). |
| T-05-02 | Spoofing | Phone field input | accept | Phone validation is UX-only in Phase 1. No server-side auth depends on phone number in Phase 1. Phase 3 will capture for manual SMS use. |
| T-05-03 | Information Disclosure | In-house address in React state | accept | Address stays client-side in Phase 1. Phase 3 will transmit over HTTPS to the API route before writing to Sheets. |
</threat_model>

<verification>
`npx tsc --noEmit` exits 0.
`grep "export function validateContactFields" src/components/booking/ContactForm.tsx` returns a match.
`grep "We will never sell" src/components/booking/MarketingConsent.tsx` returns a match.
`grep "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" src/components/booking/LocationFields.tsx` returns a match.
`grep "'use client'" src/components/booking/LocationFields.tsx` returns a match.
</verification>

<success_criteria>
- At-salon mode shows salon address (read-only); in-house mode shows Google Maps autocomplete input
- Nail tech select renders "Lona" from the NAIL_TECHS array
- Name, phone, email fields show inline errors on blur when invalid
- validateContactFields exported and usable by parent page
- Privacy statement text matches REQUIREMENTS.md MKT-02 exactly
- Zero TypeScript errors across all four component files
</success_criteria>

<output>
After completion, create `/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/01-05-SUMMARY.md`
</output>
