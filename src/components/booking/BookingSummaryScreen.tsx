import { BookingSummary } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  summary: BookingSummary;
  onBookAnother: () => void;
}

function formatDuration(totalMin: number): string {
  if (totalMin < 60) return `${totalMin} min`;
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

export default function BookingSummaryScreen({ summary, onBookAnother }: Props) {
  const humanDate = new Date(summary.date + 'T12:00:00').toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayAddress =
    summary.mode === 'in-house'
      ? summary.inHouseAddress
      : process.env.NEXT_PUBLIC_SALON_ADDRESS ?? 'Salon address not configured';

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-rose-700">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            We look forward to seeing you! Our team will send an SMS reminder before your appointment.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-muted-foreground">Appointment Type</dt>
                <dd>{summary.mode === 'in-house' ? 'In-House' : 'At-Salon'}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="font-medium text-muted-foreground">Address</dt>
                <dd className="text-right">{displayAddress}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="font-medium text-muted-foreground">Date</dt>
                <dd className="text-right">{humanDate}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="font-medium text-muted-foreground">Time</dt>
                <dd>{summary.timeSlot}</dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="font-medium text-muted-foreground">Nail Technician</dt>
                <dd>{summary.techName}</dd>
              </div>

              <div className="border-t pt-3 space-y-2">
                <dt className="font-medium text-muted-foreground">Services</dt>
                <dd>
                  <ul className="space-y-1">
                    {summary.services.map((service) => (
                      <li key={service.id} className="flex justify-between gap-4">
                        <span>{service.name}</span>
                        <span className="font-medium text-rose-700 shrink-0">
                          CA${service.effectivePrice}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="font-medium text-muted-foreground">Total Duration</dt>
                <dd>{formatDuration(summary.totalDurationMin)}</dd>
              </div>

              <div className="flex justify-between gap-4 text-base font-semibold">
                <dt>Total Price</dt>
                <dd className="text-rose-700">CA${summary.totalPrice}</dd>
              </div>

              <div className="border-t pt-3 space-y-2">
                <dt className="font-medium text-muted-foreground">Customer</dt>
                <dd className="space-y-1">
                  <div>{summary.customerName}</div>
                  <div>{summary.customerPhone}</div>
                  <div>{summary.customerEmail}</div>
                </dd>
              </div>

              {summary.marketingOptIn && (
                <div className="flex justify-between gap-4">
                  <dt className="font-medium text-muted-foreground">Marketing Opt-In</dt>
                  <dd>Yes, opted in</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          onClick={onBookAnother}
          className="w-full"
        >
          Book Another Appointment
        </Button>
      </div>
    </main>
  );
}
