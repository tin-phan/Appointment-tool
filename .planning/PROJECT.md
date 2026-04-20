# Lona Nail — Appointment Tool

## What It Is
A self-serve online booking tool for Lona Nail, a nail salon offering both at-salon and in-house (mobile) services. The goal is to let customers book appointments without calling, keeping it simple and fast on mobile.

## Who It's For
- **Customers**: Book appointments online via a shareable link posted on the Facebook Page
- **Owner (admin)**: Enter phone-in bookings manually via a password-protected admin page; view live slot availability when taking calls

## Service Modes
- **At-salon** — customer visits the physical salon; salon address is displayed on the form
- **In-house** — nail tech travels to customer within 20km of salon; +CA$10–$15 per service; customer enters address via Google Maps autocomplete

## Services & Pricing (at-salon base)
| Group | Service | Price |
|---|---|---|
| Manicure | Manicure without Shellac | $25 |
| | Shellac (Hand) | $40 |
| | Manicure with Shellac | $50 |
| | Nail Take Off | $20 |
| | Nail Repair | $5 |
| Pedicure | Pedicure without Shellac | $50 |
| | Pedicure with Shellac | $55 |
| | Shellac (Feet) | $35 |
| Full Sets & Refills | Acrylic Full Set | $60 |
| | Gel Full Set | $65 |
| | Long Nail add-on | $5+ |
| | Acrylic Refill | $50 |
| | Gel Refill | $55 |
| Design | White Airbrush | $15 |
| | Colour Airbrush | $15 |
| | Hand-Drawn | $5+/2 tips, $25+/all |
| Other | Kids Combo | $60 |

## Service Durations
- Manicure services: 45–60 min
- Pedicure services: 30 min
- Full sets/refills: 90 min
- Design add-ons: 30 min
- In-house extra: +45 min travel buffer added to calendar block

## Booking Rules
- Multi-service: customer picks multiple services; system sums durations + prices
- In-house: Google Maps autocomplete for address; 20km radius check
- If over 20km: soft message + contact capture form (not a hard block); admin follows up
- No online cancellation — customer contacts directly

## Working Hours
- **Launch:** Sunday only, 10am–5pm
- **Architecture:** Full-week configurable (Mon–Sun, per-day hours) for future expansion

## Integrations
- **Google Calendar** — block slots on booking; read to show only free slots
- **Google Sheets** — store all booking records with full data for analytics
- **Google Maps JavaScript API** — autocomplete for in-house address + 20km distance check
- **Resend or EmailJS** — free-tier automatic email confirmations
- **Netlify** — deployment (free tier, Next.js serverless functions supported; Vercel excluded)

## Staff
- Starts with 1 nail tech; dropdown is admin-configurable for future multi-tech support

## Out of Scope (v1)
- Online payment (pay in person)
- Automated SMS (team sends manually after email confirmation)
- Online cancellation/rescheduling
- Facebook Messenger/embedded booking widget
