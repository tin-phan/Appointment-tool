'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  optIn: boolean;
  onChange: (optIn: boolean) => void;
}

export default function MarketingConsent({ optIn, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground mb-3">
        Lona Nail respects your privacy. We will never sell your personal information to third parties.
      </p>
      <div className="flex items-start gap-3">
        <Checkbox
          id="marketing-opt-in"
          checked={optIn}
          onCheckedChange={(checked) => onChange(checked === true)}
        />
        <Label htmlFor="marketing-opt-in" className="text-sm leading-snug cursor-pointer">
          Yes, I&apos;d like to receive email updates and SMS care reminders from Lona Nail.
        </Label>
      </div>
    </div>
  );
}
