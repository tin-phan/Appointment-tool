import { TimeSlot } from './types';

// Phase 1: hardcoded Sunday-only, 10am–5pm, 60-minute slots.
// Phase 2 will replace availability filtering with live Calendar API reads.

const WORK_START_HOUR = 10; // 10:00 AM
const WORK_END_HOUR   = 17; // 5:00 PM (last slot start, so 5pm is not a slot start)
const SLOT_DURATION_MIN = 60;

/** Returns the Sunday dates within the next N weeks from today. */
export function getUpcomingSundays(weeksAhead = 8): Date[] {
  const sundays: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < weeksAhead * 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) sundays.push(d);
  }
  return sundays;
}

/** Returns whether a given date is a bookable Sunday (today or future). */
export function isBookableDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getDay() === 0 && date >= today;
}

/** Returns the 60-minute time slots for a valid working day. */
export function getDayTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
    const suffix = hour < 12 ? 'AM' : 'PM';
    const display = hour <= 12 ? hour : hour - 12;
    slots.push({
      label: `${display}:00 ${suffix}`,
      value: `${String(hour).padStart(2, '0')}:00`,
    });
  }
  return slots;
}
