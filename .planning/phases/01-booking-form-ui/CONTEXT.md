# Phase 1 Design Context: Booking Form UI

## Styling
- **Framework:** Tailwind CSS + shadcn/ui component library
- Rationale: Fast to build, clean look, easy to maintain; good shadcn primitives for forms, selects, date pickers

## Brand
- **Color palette:** Pink / Rose theme
- Tailwind config: extend with rose/pink primary scale (e.g. rose-400 for primary, rose-50 for backgrounds)

## Service Selection UX
- **Pattern:** Grouped sections with checkboxes
- Services organized by category (Manicure / Pedicure / Sets & Refills / Design / Other)
- Multi-select: customer checks one or more services; running total updates live below

## Phase 1 Scope (from ROADMAP.md)
Requirements: BOOK-01–07, LOC-01–02, ACCESS-02
- Mode toggle: At-salon vs In-house
- Grouped service checkboxes (5 categories)
- Live price + duration summary
- Date picker: Sunday 10am–5pm slots only (hardcoded for now, calendar read in Phase 2)
- Name / phone / email fields with client-side validation
- At-salon: show salon address (read-only)
- In-house: show Google Maps autocomplete address field
- Mobile-responsive layout

## Key Component Decisions
- shadcn/ui: Checkbox, Card, Button, Input, Label, Select (for date/time pickers)
- Date/time: shadcn Calendar + custom time slot grid (radio button list of available times)
- Form state: React useState / useReducer — no external form library needed at this scale

## Not in Phase 1
- Calendar availability check (Phase 2)
- Google Sheets storage (Phase 3)
- Email confirmation (Phase 3)
- 20km distance validation (Phase 4)
- Admin page (Phase 5)
