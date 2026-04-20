# Roadmap — Lona Nail Appointment Tool

## Phase 1 — Booking Form UI
**Goal:** Customer can select services, mode, date/time, and enter their info on a clean mobile-friendly form.

**Requirements:** BOOK-01–07, LOC-01–02, MKT-01–02, ACCESS-02

**Success criteria:**
1. Customer sees grouped service dropdown (Manicure / Pedicure / Sets & Refills / Design / Other)
2. At-salon mode shows salon address (read-only); in-house mode shows Google Maps autocomplete address field
3. In-house pricing adds $10–$15 per service and is reflected in the live total
4. Total estimated duration and price update live as services are selected
5. Date/time picker shows correct Sunday 10am–5pm slots
6. Name, phone, email form validates before submit
7. Opt-in checkbox and privacy statement visible before submission

---

## Phase 2 — Google Calendar Integration
**Goal:** Bookings block the calendar; only free slots are shown to customers.

**Requirements:** SCHED-01–05

**Success criteria:**
1. Booking creates a Google Calendar event on the owner's account
2. Already-blocked slots are hidden from the time picker in real time
3. In-house bookings block service time + 45 min travel buffer
4. Multi-service bookings block the correct summed duration
5. No double-booking possible

---

## Phase 3 — Google Sheets, Email Confirmation & Marketing Consent
**Goal:** Every booking is stored with full analytics data, customer receives an email, and opt-in consent is captured.

**Requirements:** DATA-01–03, MKT-01–03, EMAIL-01–03

**Success criteria:**
1. Each booking row in Google Sheets captures: name, phone, email, mode, services, individual prices, estimated total, in-house address, date/time, opt-in flag
2. Over-20km enquiries saved as separate rows in Google Sheets for admin review
3. Confirmation email auto-sent; shows customer address (in-house) or salon address (at-salon); mentions SMS reminder will follow manually
4. Confirmation page shown on screen after successful submission

---

## Phase 4 — In-house & Location Features
**Goal:** In-house bookings are geo-validated, correctly priced, and over-range leads are captured rather than lost.

**Requirements:** LOC-01–07, SCHED-05

**Success criteria:**
1. In-house address field uses Google Maps autocomplete
2. Address within 20km: booking proceeds with +$10–$15 pricing and 45 min travel buffer
3. Address over 20km: soft message shown with an input field for email or phone; no hard block
4. Over-20km lead (name, contact, address, services) saved to Google Sheets for admin follow-up
5. Confirmation email correctly shows address for in-house vs. salon address for at-salon

---

## Phase 5 — Admin Page, Config & Deployment
**Goal:** Admin can enter phone-in bookings with live slot visibility; app is live on Netlify with full-week schedule capability.

**Requirements:** ADMIN-01–04, SCHED-01 (full week config), ACCESS-01

**Success criteria:**
1. Admin logs in at `/admin` with a password and sees real-time available slots before entering a booking
2. Admin booking form applies same rules, blocks calendar, and sends confirmation email identically to customer bookings
3. Working days/hours configurable without code changes
4. Nail tech list is admin-editable
5. Shareable customer booking URL works on mobile and desktop
6. App deployed to Netlify free tier; live and accessible via public URL
