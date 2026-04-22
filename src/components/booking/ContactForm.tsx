import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  name: string;
  phone: string;
  email: string;
  errors: { name?: string; phone?: string; email?: string };
  onChange: (field: 'name' | 'phone' | 'email', value: string) => void;
  onBlur: (field: 'name' | 'phone' | 'email') => void;
}

export default function ContactForm({ name, phone, email, errors, onChange, onBlur }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="contact-name">Full Name</Label>
        <Input
          id="contact-name"
          type="text"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="contact-phone">Cell Phone</Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="604-555-0100"
          value={phone}
          onChange={(e) => onChange('phone', e.target.value)}
          onBlur={() => onBlur('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="contact-email">Email Address</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>
    </div>
  );
}

// Accepts Canadian/US formats: 604-555-0100, (604) 555-0100, 6045550100, +16045550100
const phoneRegex = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactFields(
  name: string,
  phone: string,
  email: string
): { name?: string; phone?: string; email?: string } {
  const errors: { name?: string; phone?: string; email?: string } = {};

  if (!name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!phone.trim()) {
    errors.phone = 'Cell phone is required.';
  } else if (!phoneRegex.test(phone.trim())) {
    errors.phone = 'Enter a valid Canadian or US phone number.';
  }

  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}
