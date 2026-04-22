'use client';

import { ServiceMode } from '@/lib/types';
import { NAIL_TECHS } from '@/lib/services';
import { Button } from '@/components/ui/button';

interface Props {
  mode: ServiceMode;
  onChange: (mode: ServiceMode) => void;
  techName: string;
  onTechChange: (techName: string) => void;
}

export default function ModeToggle({ mode, onChange, techName, onTechChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Appointment Type</p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === 'at-salon' ? 'default' : 'outline'}
            onClick={() => onChange('at-salon')}
            className="flex-1"
          >
            At-Salon
          </Button>
          <Button
            type="button"
            variant={mode === 'in-house' ? 'default' : 'outline'}
            onClick={() => onChange('in-house')}
            className="flex-1"
          >
            In-House
          </Button>
        </div>
      </div>

      <div>
        <label
          htmlFor="nail-tech-select"
          className="text-sm font-medium leading-none"
        >
          Nail Technician
        </label>
        <select
          id="nail-tech-select"
          value={techName}
          onChange={(e) => onTechChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {NAIL_TECHS.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
