---
status: partial
phase: 01-booking-form-ui
source: [01-VERIFICATION.md]
started: 2026-04-22
updated: 2026-04-22
---

## Current Test

Awaiting human testing — run `npm run dev` and open http://localhost:3000/book

## Tests

### 1. Mobile responsiveness
expected: Single-column layout at 375px viewport works end-to-end — all sections visible, checkboxes tappable, no overflow
result: [pending]

### 2. Google Maps autocomplete (in-house mode)
expected: Selecting In-House shows address input; typing an address shows Google Maps suggestions dropdown
result: [pending] — requires valid NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local

### 3. End-to-end booking flow
expected: Fill all fields → click Book → BookingSummaryScreen shows name, services, total, date/time, mode
result: [pending]

### 4. Live surcharge on mode toggle
expected: Selecting Acrylic Full Set ($60) at-salon → toggling to In-House shows $75 (+$15 surcharge) in the live total
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
