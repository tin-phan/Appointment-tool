---
plan: "06"
wave: 5
title: Booking Page Assembly and Submission Summary Screen
depends_on:
  - "03"
  - "04"
  - "05"
files_modified:
  - src/app/book/page.tsx
  - src/components/booking/BookingSummaryScreen.tsx
autonomous: true
requirements:
  - BOOK-01
  - BOOK-02
  - BOOK-03
  - BOOK-04
  - BOOK-05
  - BOOK-06
  - BOOK-07
  - LOC-01
  - LOC-02
  - MKT-01
  - MKT-02
  - ACCESS-02
must_haves:
  - All booking form sections render in the correct vertical order on /book
  - Submitting the form with valid data transitions to the BookingSummaryScreen — the main booking flow page never navigates away
  - BookingSummaryScreen shows a full recap of the booking (services, prices, date, time, mode, tech, contact info, address)
  - Form-level validation fires on submit and prevents transition if any required field is missing or invalid
  - Layout is mobile-responsive (single column on mobile, max-width container on desktop)
  - Root page (/) redirects to /book
---

<objective>
Wire all booking components into the /book page and build the post-submit summary screen. This plan delivers the end-to-end customer booking flow for Phase 1.

Purpose: Components built in Plans 03–05 are each isolated. This plan assembles them into a working user flow: form → validate → summary. Phase 1 is complete when a customer can fill out the form and see a booking summary on screen.
Output: src/app/book/page.tsx (main booking page) and src/components/booking/BookingSummaryScreen.tsx (confirmation display).
</objective>

<execution_context>
@/home/user/Appointment-tool/.claude/get-shit-done/workflows/execute-plan.md
@/home/user/Appointment-tool/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@/home/user/Appointment-tool/.planning/ROADMAP.md
@/home/user/Appointment-tool/.planning/REQUIREMENTS.md
@/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/CONTEXT.md

<interfaces>
<!-- All component props interfaces this page wires together. Extracted from Plans 03–05. -->

From src/lib/types.ts:
```ts
export type ServiceMode = 'at-salon' | 'in-house';
export interface Service { id: string; name: string; group: ServiceGroup; basePrice: number; inHouseSurcharge: number; durationMin: number; }
export interface BookingSummary { mode: ServiceMode; services: SelectedService[]; techName: string; date: string; timeSlot: string; totalDurationMin: number; totalPrice: number; customerName: string; customerPhone: string; customerEmail: string; inHouseAddress?: string; marketingOptIn: boolean; }
```

From src/components/booking/ServiceSelector.tsx:
```ts
// default export
function ServiceSelector({ mode, selectedIds, onSelectionChange }: { mode: ServiceMode; selectedIds: string[]; onSelectionChange: (ids: string[]) => void }): JSX.Element
```

From src/components/booking/DateTimePicker.tsx:
```ts
// default export
function DateTimePicker({ selectedDate, selectedTime, onDateChange, onTimeChange }: { selectedDate: Date | undefined; selectedTime: string | undefined; onDateChange: (d: Date | undefined) => void; onTimeChange: (v: string) => void }): JSX.Element
```

From src/components/booking/ModeToggle.tsx:
```ts
// default export
function ModeToggle({ mode, onChange, techName, onTechChange }: { mode: ServiceMode; onChange: (m: ServiceMode) => void; techName: string; onTechChange: (t: string) => void }): JSX.Element
```

From src/components/booking/LocationFields.tsx:
```ts
// default export — 'use client' component
function LocationFields({ mode, inHouseAddress, onAddressChange }: { mode: ServiceMode; inHouseAddress: string; onAddressChange: (a: string) => void }): JSX.Element
```

From src/components/booking/ContactForm.tsx:
```ts
// default export
function ContactForm({ name, phone, email, errors, onChange, onBlur }: Props): JSX.Element
// named export
export function validateContactFields(name: string, phone: string, email: string): { name?: string; phone?: string; email?: string }
```

From src/components/booking/MarketingConsent.tsx:
```ts
// default export
function MarketingConsent({ optIn, onChange }: { optIn: boolean; onChange: (v: boolean) => void }): JSX.Element
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build BookingSummaryScreen confirmation component</name>
  <read_first>
    - /home/user/Appointment-tool/src/lib/types.ts
    - /home/user/Appointment-tool/src/components/ui/card.tsx
    - /home/user/Appointment-tool/src/components/ui/button.tsx
    - /home/user/Appointment-tool/.planning/REQUIREMENTS.md (DATA-03: booking summary shown on screen after submission)
  </read_first>
  <files>
    src/components/booking/BookingSummaryScreen.tsx
  </files>
  <action>
Create `/home/user/Appointment-tool/src/components/booking/BookingSummaryScreen.tsx`.

Props:
```ts
interface Props {
  summary: BookingSummary;
  onBookAnother: () => void;  // resets the form to initial state
}
```

Implementation:
1. Import BookingSummary from '@/lib/types'. Import shadcn Card, CardContent, CardHeader, CardTitle, Button.
2. Render a full-screen confirmation view (not a modal) with:
   - Large heading: "Booking Confirmed!" in rose-700 or rose-600 text
   - Subheading: "We look forward to seeing you! Our team will send an SMS reminder before your appointment."
   - A Card summarizing all booking details:
     * Mode: "At-Salon" or "In-House"
     * Address: `summary.inHouseAddress` when in-house, or `process.env.NEXT_PUBLIC_SALON_ADDRESS` when at-salon
     * Date and time: format `summary.date` as a human-readable date (use `new Date(summary.date + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })`) — the T12:00:00 avoids timezone date-shift. Display `summary.timeSlot` for the time (already in "10:00 AM" format).
     * Nail technician: `summary.techName`
     * Services: list each service name with its effective price (CA$X)
     * Total duration: formatted as "X hr Y min" when >= 60, else "X min"
     * Total price: CA$X
     * Customer: name, phone, email
     * Marketing opt-in: "Yes, opted in" or "No" (do not show if not opted in — just omit the row)
   - A "Book Another Appointment" button (variant="outline") that calls `onBookAnother()`
3. Style: max-w-lg centered, with rose-50 page background inherited from layout.
4. Export as default.
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npx tsc --noEmit 2>&1 | tail -10</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/components/booking/BookingSummaryScreen.tsx
    - Contains `export default function BookingSummaryScreen`
    - Contains the exact string "Booking Confirmed!" (grep confirms)
    - Contains the exact string "SMS reminder" (grep: `grep "SMS reminder" src/components/booking/BookingSummaryScreen.tsx`)
    - Contains `onBookAnother` prop usage (grep confirms)
    - Contains `summary.inHouseAddress` reference (grep confirms conditional address display)
    - `npx tsc --noEmit` exits 0
  </acceptance_criteria>
  <done>BookingSummaryScreen displays all booking details and the SMS reminder message; "Book Another" button resets the form</done>
</task>

<task type="auto">
  <name>Task 2: Assemble the booking page and redirect root to /book</name>
  <read_first>
    - /home/user/Appointment-tool/src/lib/types.ts
    - /home/user/Appointment-tool/src/lib/services.ts
    - /home/user/Appointment-tool/src/app/layout.tsx (confirm 'use client' is not on layout)
    - /home/user/Appointment-tool/src/app/page.tsx (placeholder — will be replaced with redirect)
    - /home/user/Appointment-tool/src/components/booking/BookingSummaryScreen.tsx (just created)
  </read_first>
  <files>
    src/app/book/page.tsx
    src/app/page.tsx
  </files>
  <action>
**File 1: `/home/user/Appointment-tool/src/app/book/page.tsx`**

This is a Client Component (must have `'use client'` at the top because it uses useState).

State managed in this parent component:
```ts
// mode and tech
const [mode, setMode] = useState<ServiceMode>('at-salon');
const [techName, setTechName] = useState<string>(NAIL_TECHS[0]);

// services
const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

// date/time
const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

// location
const [inHouseAddress, setInHouseAddress] = useState<string>('');

// contact
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [contactErrors, setContactErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

// marketing
const [marketingOptIn, setMarketingOptIn] = useState(false);

// submission state
const [submitted, setSubmitted] = useState(false);
const [submittedSummary, setSubmittedSummary] = useState<BookingSummary | null>(null);
```

Derived values (computed inline, not state):
```ts
const selectedServices: SelectedService[] = selectedServiceIds
  .map(id => SERVICES.find(s => s.id === id))
  .filter(Boolean)
  .map(s => ({
    ...s!,
    effectivePrice: mode === 'in-house' ? s!.basePrice + s!.inHouseSurcharge : s!.basePrice,
  }));

const totalPrice = selectedServices.reduce((sum, s) => sum + s.effectivePrice, 0);
const totalDurationMin = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);
```

Form submission handler `handleSubmit`:
1. Run `validateContactFields(name, phone, email)` — if any errors, set contactErrors and return early (do NOT proceed to summary).
2. If `selectedServiceIds.length === 0`: show alert("Please select at least one service.") and return.
3. If `!selectedDate || !selectedTime`: show alert("Please select a date and time.") and return.
4. If `mode === 'in-house' && !inHouseAddress.trim()`: show alert("Please enter your address for in-house booking.") and return.
5. Build a BookingSummary object:
   ```ts
   const summary: BookingSummary = {
     mode,
     services: selectedServices,
     techName,
     date: selectedDate.toISOString().split('T')[0],
     timeSlot: (() => {
       // Convert value e.g. "10:00" to label e.g. "10:00 AM"
       const [h] = selectedTime.split(':').map(Number);
       const suffix = h < 12 ? 'AM' : 'PM';
       const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
       return `${display}:00 ${suffix}`;
     })(),
     totalDurationMin,
     totalPrice,
     customerName: name,
     customerPhone: phone,
     customerEmail: email,
     inHouseAddress: mode === 'in-house' ? inHouseAddress : undefined,
     marketingOptIn,
   };
   ```
6. Set `submittedSummary(summary)` and `setSubmitted(true)`.

Page layout (when not submitted):
Render sections in this exact vertical order with clear visual separation (use `<section className="mb-8">` wrappers):
1. Page title: `<h1 className="text-2xl font-semibold text-rose-700 mb-6">Book an Appointment</h1>`
2. Salon name/tagline: `<p className="text-muted-foreground mb-6">Lona Nail — At-Salon &amp; In-House Services</p>`
3. `<ModeToggle mode={mode} onChange={setMode} techName={techName} onTechChange={setTechName} />`
4. `<LocationFields mode={mode} inHouseAddress={inHouseAddress} onAddressChange={setInHouseAddress} />`
5. `<ServiceSelector mode={mode} selectedIds={selectedServiceIds} onSelectionChange={setSelectedServiceIds} />`
6. `<DateTimePicker selectedDate={selectedDate} selectedTime={selectedTime} onDateChange={setSelectedDate} onTimeChange={setSelectedTime} />`
7. `<ContactForm name={name} phone={phone} email={email} errors={contactErrors} onChange={(field, value) => { if (field === 'name') setName(value); else if (field === 'phone') setPhone(value); else setEmail(value); }} onBlur={(field) => { const errs = validateContactFields(name, phone, email); setContactErrors(prev => ({ ...prev, [field]: errs[field] })); }} />`
8. `<MarketingConsent optIn={marketingOptIn} onChange={setMarketingOptIn} />`
9. Submit button: `<Button onClick={handleSubmit} className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-base font-semibold">Confirm Booking</Button>`

Outer wrapper: `<main className="min-h-screen bg-rose-50 py-8 px-4"><div className="max-w-2xl mx-auto">{...}</div></main>`

When submitted: render `<BookingSummaryScreen summary={submittedSummary!} onBookAnother={() => { setSubmitted(false); setSubmittedSummary(null); setSelectedServiceIds([]); setSelectedDate(undefined); setSelectedTime(undefined); setName(''); setPhone(''); setEmail(''); setInHouseAddress(''); setMarketingOptIn(false); }} />`

---

**File 2: `/home/user/Appointment-tool/src/app/page.tsx`**

Replace the placeholder with a redirect to /book:
```tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/book');
}
```
  </action>
  <verify>
    <automated>cd /home/user/Appointment-tool && npm run build 2>&1 | tail -20</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/app/book/page.tsx and contains `'use client'` at top (grep: `grep "'use client'" src/app/book/page.tsx`)
    - book/page.tsx imports all six booking components: ServiceSelector, DateTimePicker, ModeToggle, LocationFields, ContactForm, MarketingConsent (grep: `grep "import.*from '@/components/booking" src/app/book/page.tsx | wc -l` returns 6 or more)
    - book/page.tsx imports BookingSummaryScreen (grep confirms)
    - book/page.tsx imports NAIL_TECHS and SERVICES from '@/lib/services' (grep confirms)
    - book/page.tsx contains `validateContactFields` import and call (grep confirms)
    - book/page.tsx contains `useState<BookingSummary | null>(null)` or similar (grep: `grep "submittedSummary" src/app/book/page.tsx`)
    - src/app/page.tsx contains `redirect('/book')` (grep: `grep "redirect" src/app/page.tsx`)
    - `npm run build` exits 0
    - `npm run lint` exits 0 (or exits with only warnings, no errors)
  </acceptance_criteria>
  <done>The /book route renders the full booking form; the root / redirects to /book; submitting the form transitions to BookingSummaryScreen; "Book Another" resets all state</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client form state → summary screen | All within browser; no server call in Phase 1 |
| Root redirect | Server-side redirect via next/navigation; no data exposure |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-06-01 | Denial of Service | Client-side form with no rate limit | accept | Phase 1 has no server write or external API call triggered by submit. Rate limiting is needed in Phase 3 when the API route is added. |
| T-06-02 | Information Disclosure | BookingSummary in React state after submission | accept | Data remains in browser memory only in Phase 1. Phase 3 will transmit over HTTPS. No sensitive data is logged or persisted client-side. |
| T-06-03 | Tampering | Client-side price totalling | accept | Price displayed is for UX only. Authoritative price calculation will occur server-side in Phase 3 before any payment or record creation. |
</threat_model>

<verification>
`npm run build` exits 0.
`npm run lint` exits 0 or with warnings only.
`grep "'use client'" src/app/book/page.tsx` returns a match.
`grep "redirect('/book')" src/app/page.tsx` returns a match.
`grep "Booking Confirmed" src/components/booking/BookingSummaryScreen.tsx` returns a match.
`grep "SMS reminder" src/components/booking/BookingSummaryScreen.tsx` returns a match.
</verification>

<success_criteria>
- `npm run build` exits 0 — project compiles end-to-end
- Navigating to / redirects to /book
- /book page renders all form sections in correct order
- Completing and submitting the form renders BookingSummaryScreen with all booking details
- BookingSummaryScreen includes the SMS reminder message (per REQUIREMENTS.md EMAIL-02 spirit in Phase 1 scope)
- "Book Another Appointment" button resets all form state
- Layout is single-column on mobile, max-w-2xl centered on desktop (ACCESS-02 satisfied)
</success_criteria>

<output>
After completion, create `/home/user/Appointment-tool/.planning/phases/01-booking-form-ui/01-06-SUMMARY.md`
</output>
