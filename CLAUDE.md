# Lona Nail — Appointment Tool

## Project Overview
Self-serve online booking tool for Lona Nail salon. Customers book at-salon or in-house (mobile) appointments via a shareable link. Owner enters phone-in bookings via a password-protected admin page.

## Tech Stack
- **Framework:** Next.js (React) with TypeScript
- **Backend:** Next.js API routes (server-side Google API calls — keeps credentials safe)
- **Google Calendar API** — slot blocking and availability reads
- **Google Sheets API** — booking records storage + analytics
- **Google Maps JavaScript API** — in-house address autocomplete + 20km distance check
- **Email:** Resend or EmailJS (free tier) — automatic confirmation emails
- **Deployment:** Netlify (free tier, Next.js serverless functions supported)

## Key Business Rules
- Services are grouped: Manicure / Pedicure / Sets & Refills / Design / Other
- Multi-service bookings sum all durations and prices
- In-house mode: +$10–$15 per service, +45 min travel buffer on calendar block
- Address within 20km → booking proceeds; over 20km → soft capture (contact info saved, admin follows up)
- Working hours at launch: Sunday only, 10am–5pm (full-week configurable)
- No online cancellation — customer contacts directly

## Email Confirmation
Every booking (customer and admin-entered) triggers an automatic confirmation email that:
- Shows the appointment details and address (customer's for in-house, salon's for at-salon)
- Mentions that the team will send an SMS reminder manually before the appointment

## Privacy & Marketing
- Booking form includes opt-in checkbox for email marketing and SMS after-sale care
- Privacy statement: Lona does not sell customer data to third parties
- Opt-in flag stored in Google Sheets

## Admin
- Password-protected `/admin` route
- Admin sees real-time slot availability (same calendar read as customer form)
- Admin booking applies identical rules, blocks calendar, and sends confirmation email

## Planning
See `.planning/` for full context:
- `PROJECT.md` — business context, services, integrations
- `REQUIREMENTS.md` — all functional requirements (BOOK, SCHED, LOC, DATA, ADMIN, MKT, EMAIL, ACCESS)
- `ROADMAP.md` — 5-phase delivery plan
- `STATE.md` — current phase and status

## Development Commands
```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # lint check
```

## Environment Variables (required)
```
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
GOOGLE_SHEET_ID=
GOOGLE_MAPS_API_KEY=
RESEND_API_KEY=          # or EMAILJS_* vars
ADMIN_PASSWORD=
```
