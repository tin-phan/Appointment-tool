"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { isBookableDate, getDayTimeSlots } from "@/lib/schedule";
import type { TimeSlot } from "@/lib/types";

interface Props {
  selectedDate: Date | undefined;
  selectedTime: string | undefined; // 24h value from TimeSlot.value, e.g. "10:00"
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (timeValue: string) => void;
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: Props) {
  const slots: TimeSlot[] = getDayTimeSlots();

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateChange}
        disabled={(date) => !isBookableDate(date)}
        className="rounded-md border"
      />

      {selectedDate ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            {formattedDate}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {slots.map((slot) => (
              <Button
                key={slot.value}
                type="button"
                variant={selectedTime === slot.value ? "default" : "outline"}
                size="sm"
                onClick={() => onTimeChange(slot.value)}
              >
                {slot.label}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Select a Sunday above to see available times.
        </p>
      )}
    </div>
  );
}
