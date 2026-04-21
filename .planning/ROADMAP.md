# Roadmap: Lona Nail Appointment Tool

## Overview

Five-phase delivery building a self-serve online booking tool for Lona Nail salon — from a clean booking UI through calendar integration, data storage, in-house geo-validation, and finally an admin page and live Netlify deployment.

## Phases

- [ ] **Phase 1: Booking Form UI** - Customer-facing booking form with service selection, pricing, date/time picker, and contact info
- [ ] **Phase 2: Google Calendar Integration** - Block booked slots on Google Calendar; show only free slots to customers
- [ ] **Phase 3: Google Sheets, Email Confirmation & Marketing Consent** - Store bookings, send confirmation email, capture opt-in consent
- [ ] **Phase 4: In-house & Location Features** - Google Maps autocomplete, 20km validation, over-range lead capture
- [ ] **Phase 5: Admin Page, Config & Deployment** - Password-protected admin booking page with live slot view; deploy to Netlify

## Phase Details

### Phase 1: Booking Form UI
**Goal**: Customer can select services, mode, date/time, and enter their info on a clean mobile-friendly form.
**Depends on**: Nothing (first phase)
**Requirements**: BOOK-01, BOOK-02, BOOK-03, BOOK-04, BOOK-05, BOOK-06, BOOK-07, LOC-01, LOC-02, MKT-01, MKT-02, ACCESS-02
**Success Criteria** (what must be TRUE):
  1. Customer sees grouped service dropdown (Manicure / Pedicure / Sets & Refills / Design / Other)
  2. At-salon mode shows salon address (read-only); in-house mode shows Google Maps autocomplete address field
  3. In-house pricing adds $10–$15 per service and is reflected in the live total
  4. Total estimated duration and price update live as services are selected
  5. Date/time picker shows correct Sunday 10am–5pm slots
  6. Name, phone, email form validates before submit
  7. Opt-in checkbox and privacy statement visible before submission
**Plans**: 6 plans across 5 waves

Plans:
- [ ] 01-PLAN-01-project-scaffold.md — Next.js + Tailwind + shadcn/ui project bootstrap
- [ ] 01-PLAN-02-types-and-data.md — TypeScript types, services catalog, schedule utilities
- [ ] 01-PLAN-03-service-selector.md — Grouped service checkboxes with live price+duration total
- [ ] 01-PLAN-04-datetime-picker.md — Sunday-restricted calendar and time slot grid
- [ ] 01-PLAN-05-contact-and-mode.md — Mode toggle, location fields, contact form, marketing consent
- [ ] 01-PLAN-06-page-assembly.md — /book page assembly and booking summary screen

### Phase 2: Google Calendar Integration
**Goal**: Bookings block the calendar; only free slots are shown to customers.
**Depends on**: Phase 1
**Requirements**: SCHED-01, SCHED-02, SCHED-03, SCHED-04, SCHED-05
**Success Criteria** (what must be TRUE):
  1. Booking creates a Google Calendar event on the owner's account
  2. Already-blocked slots are hidden from the time picker in real time
  3. In-house bookings block service time + 45 min travel buffer
  4. Multi-service bookings block the correct summed duration
  5. No double-booking possible
**Plans**: TBD

### Phase 3: Google Sheets, Email Confirmation & Marketing Consent
**Goal**: Every booking is stored with full analytics data, customer receives an email, and opt-in consent is captured.
**Depends on**: Phase 2
**Requirements**: DATA-01, DATA-02, DATA-03, MKT-01, MKT-02, MKT-03, EMAIL-01, EMAIL-02, EMAIL-03
**Success Criteria** (what must be TRUE):
  1. Each booking row captures: name, phone, email, mode, services, individual prices, estimated total, in-house address, date/time, opt-in flag
  2. Over-20km enquiries saved as separate rows in Google Sheets for admin review
  3. Confirmation email auto-sent; shows customer address (in-house) or salon address (at-salon); mentions SMS reminder
  4. Confirmation page shown on screen after successful submission
**Plans**: TBD

### Phase 4: In-house & Location Features
**Goal**: In-house bookings are geo-validated, correctly priced, and over-range leads are captured rather than lost.
**Depends on**: Phase 3
**Requirements**: LOC-01, LOC-02, LOC-03, LOC-04, LOC-05, LOC-06, LOC-07, SCHED-05
**Success Criteria** (what must be TRUE):
  1. In-house address field uses Google Maps autocomplete
  2. Address within 20km: booking proceeds with +$10–$15 pricing and 45 min travel buffer
  3. Address over 20km: soft message shown with an input field for email or phone; no hard block
  4. Over-20km lead (name, contact, address, services) saved to Google Sheets for admin follow-up
  5. Confirmation email correctly shows address for in-house vs. salon address for at-salon
**Plans**: TBD

### Phase 5: Admin Page, Config & Deployment
**Goal**: Admin can enter phone-in bookings with live slot visibility; app is live on Netlify with full-week schedule capability.
**Depends on**: Phase 4
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04, SCHED-01, ACCESS-01
**Success Criteria** (what must be TRUE):
  1. Admin logs in at /admin with a password and sees real-time available slots before entering a booking
  2. Admin booking form applies same rules, blocks calendar, and sends confirmation email identically to customer bookings
  3. Working days/hours configurable without code changes
  4. Nail tech list is admin-editable
  5. Shareable customer booking URL works on mobile and desktop
  6. App deployed to Netlify free tier; live and accessible via public URL
**Plans**: TBD
