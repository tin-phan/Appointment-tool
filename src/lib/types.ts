// Booking domain types for Lona Nail Appointment Tool

export type ServiceMode = 'at-salon' | 'in-house';

export type ServiceGroup =
  | 'Manicure'
  | 'Pedicure'
  | 'Sets & Refills'
  | 'Design'
  | 'Other';

export interface Service {
  id: string;                   // e.g. "manicure-shellac-hand"
  name: string;                 // display name
  group: ServiceGroup;
  basePrice: number;            // at-salon price in CAD
  inHouseSurcharge: number;     // added when mode === 'in-house' (10 or 15)
  durationMin: number;          // service duration in minutes
}

export interface SelectedService extends Service {
  effectivePrice: number;       // basePrice + inHouseSurcharge when in-house
}

export interface BookingSummary {
  mode: ServiceMode;
  services: SelectedService[];
  techName: string;
  date: string;                 // ISO date string, e.g. "2024-12-01"
  timeSlot: string;             // e.g. "10:00 AM"
  totalDurationMin: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  inHouseAddress?: string;      // only when mode === 'in-house'
  marketingOptIn: boolean;
}

export interface TimeSlot {
  label: string;                // e.g. "10:00 AM"
  value: string;                // 24h format, e.g. "10:00"
}
