'use client';

import { useState } from 'react';
import { SERVICES, NAIL_TECHS } from '@/lib/services';
import { ServiceMode, SelectedService, BookingSummary } from '@/lib/types';
import ModeToggle from '@/components/booking/ModeToggle';
import LocationFields from '@/components/booking/LocationFields';
import ServiceSelector from '@/components/booking/ServiceSelector';
import DateTimePicker from '@/components/booking/DateTimePicker';
import ContactForm, { validateContactFields } from '@/components/booking/ContactForm';
import MarketingConsent from '@/components/booking/MarketingConsent';
import BookingSummaryScreen from '@/components/booking/BookingSummaryScreen';
import { Button } from '@/components/ui/button';

export default function BookPage() {
  // mode and tech
  const [mode, setMode] = useState<ServiceMode>('at-salon');
  const [techName, setTechName] = useState<string>(NAIL_TECHS[0]);

  // services
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // date/time
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  // location
  const [inHouseAddress, setInHouseAddress] = useState<string>('');

  // contact
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactErrors, setContactErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  // marketing
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  // submission state
  const [submitted, setSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<BookingSummary | null>(null);

  // Derived values
  const selectedServices: SelectedService[] = selectedServiceIds
    .map(id => SERVICES.find(s => s.id === id))
    .filter(Boolean)
    .map(s => ({
      ...s!,
      effectivePrice: mode === 'in-house' ? s!.basePrice + s!.inHouseSurcharge : s!.basePrice,
    }));

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.effectivePrice, 0);
  const totalDurationMin = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);

  function handleSubmit() {
    // 1. Validate contact fields
    const errors = validateContactFields(name, phone, email);
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    // 2. Check services
    if (selectedServiceIds.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    // 3. Check date/time
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    // 4. Check in-house address
    if (mode === 'in-house' && !inHouseAddress.trim()) {
      alert('Please enter your address for in-house booking.');
      return;
    }

    // 5. Build BookingSummary
    const [h] = selectedTime.split(':').map(Number);
    const suffix = h < 12 ? 'AM' : 'PM';
    const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const timeSlot = `${display}:00 ${suffix}`;

    const summary: BookingSummary = {
      mode,
      services: selectedServices,
      techName,
      date: selectedDate.toISOString().split('T')[0],
      timeSlot,
      totalDurationMin,
      totalPrice,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      inHouseAddress: mode === 'in-house' ? inHouseAddress : undefined,
      marketingOptIn,
    };

    setSubmittedSummary(summary);
    setSubmitted(true);
  }

  function handleBookAnother() {
    setSubmitted(false);
    setSubmittedSummary(null);
    setSelectedServiceIds([]);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setName('');
    setPhone('');
    setEmail('');
    setInHouseAddress('');
    setMarketingOptIn(false);
  }

  if (submitted && submittedSummary) {
    return (
      <BookingSummaryScreen
        summary={submittedSummary}
        onBookAnother={handleBookAnother}
      />
    );
  }

  return (
    <main className="min-h-screen bg-rose-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-rose-700 mb-6">Book an Appointment</h1>
        <p className="text-muted-foreground mb-6">Lona Nail &mdash; At-Salon &amp; In-House Services</p>

        <section className="mb-8">
          <ModeToggle mode={mode} onChange={setMode} techName={techName} onTechChange={setTechName} />
        </section>

        <section className="mb-8">
          <LocationFields mode={mode} inHouseAddress={inHouseAddress} onAddressChange={setInHouseAddress} />
        </section>

        <section className="mb-8">
          <ServiceSelector mode={mode} selectedIds={selectedServiceIds} onSelectionChange={setSelectedServiceIds} />
        </section>

        <section className="mb-8">
          <DateTimePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
          />
        </section>

        <section className="mb-8">
          <ContactForm
            name={name}
            phone={phone}
            email={email}
            errors={contactErrors}
            onChange={(field, value) => {
              if (field === 'name') setName(value);
              else if (field === 'phone') setPhone(value);
              else setEmail(value);
            }}
            onBlur={(field) => {
              const errs = validateContactFields(name, phone, email);
              setContactErrors(prev => ({ ...prev, [field]: errs[field] }));
            }}
          />
        </section>

        <section className="mb-8">
          <MarketingConsent optIn={marketingOptIn} onChange={setMarketingOptIn} />
        </section>

        <Button
          onClick={handleSubmit}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-base font-semibold"
        >
          Confirm Booking
        </Button>
      </div>
    </main>
  );
}
