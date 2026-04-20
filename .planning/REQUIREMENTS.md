# Requirements — Lona Nail Appointment Tool (v1)

## Booking Flow
- BOOK-01: Customer selects service mode (at-salon or in-house)
- BOOK-02: Customer selects one or more services from grouped dropdown (Manicure / Pedicure / Sets & Refills / Design / Other)
- BOOK-03: Customer selects nail technician from dropdown
- BOOK-04: System displays total estimated duration and total price before confirming (updates live)
- BOOK-05: Customer picks available date and time slot (only free slots shown)
- BOOK-06: Customer enters name, cell phone, email
- BOOK-07: Customer submits booking and receives confirmation on screen + via email

## Scheduling & Calendar
- SCHED-01: Available slots reflect configured working hours (Sunday 10am–5pm at launch; full-week configurable)
- SCHED-02: Booked slots are blocked in Google Calendar immediately on submission
- SCHED-03: No double-booking — booked/blocked slots are hidden from the time picker
- SCHED-04: Multi-service bookings sum all service durations for one contiguous slot
- SCHED-05: In-house bookings add 45 min travel buffer to calendar block

## Location
- LOC-01: When in-house is selected, show address input with Google Maps autocomplete
- LOC-02: When at-salon is selected, display the salon address (read-only, no input needed)
- LOC-03: Validate customer address is within 20km of salon after entry
- LOC-04: If address is over 20km, show soft message: "We may not be able to serve this area. Leave your email or phone and we'll contact you to confirm." — with an enabled input field for email or phone directly below the message
- LOC-05: Over-20km enquiries saved to Google Sheets as a separate enquiry record (name, contact, address, services of interest) for admin follow-up
- LOC-06: In-house pricing adds CA$10–$15 to each service automatically
- LOC-07: Confirmation email includes customer address (in-house) or salon address (at-salon)

## Data & Confirmation
- DATA-01: Each booking saved as a row in Google Sheets: name, phone, email, service mode, services selected, date/time, individual service prices, estimated total expense, in-house address (if applicable), opt-in flag — full capture for business analytics
- DATA-02: Confirmation email sent to customer automatically (free tier — Resend or EmailJS)
- DATA-03: Booking summary shown on screen after submission

## Admin Booking
- ADMIN-01: Password-protected `/admin` page for the salon owner
- ADMIN-02: Admin sees real-time available slots (same calendar read as customer form) — no blind spots when taking phone calls
- ADMIN-03: Admin form applies same time-block rules (service duration + in-house travel buffer)
- ADMIN-04: Admin booking triggers same Google Calendar block and confirmation email as customer bookings

## Marketing & Privacy
- MKT-01: Booking form includes opt-in checkbox for email marketing and SMS care after-sale
- MKT-02: Privacy statement displayed on form: Lona will not sell customer data to third parties
- MKT-03: Opt-in flag stored in Google Sheets alongside booking record

## Email Confirmation
- EMAIL-01: Confirmation email auto-sent on every booking (customer-submitted and admin-entered)
- EMAIL-02: Email body mentions that the team will send an SMS reminder manually before the appointment
- EMAIL-03: SMS reminders are sent manually by the Lona team (not automated in v1)

## Access
- ACCESS-01: Booking form accessible via a shareable URL (posted on Facebook Page)
- ACCESS-02: Form is mobile-responsive (primary device for customers)

## Out of Scope (v1)
- Online payment (pay in person)
- Automated SMS sending (manual by team after email)
- Online cancellation/rescheduling (customer contacts directly)
- Facebook Messenger/embedded booking widget
- Multi-nail-tech scheduling
