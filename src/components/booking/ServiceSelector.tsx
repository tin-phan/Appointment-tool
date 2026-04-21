"use client";

import { SERVICE_GROUPS, getServicesByGroup } from '@/lib/services';
import { Service, ServiceMode } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  mode: ServiceMode;
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

function formatDuration(totalMin: number): string {
  if (totalMin < 60) return `${totalMin} min`;
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

function getEffectivePrice(service: Service, mode: ServiceMode): number {
  return mode === 'in-house'
    ? service.basePrice + service.inHouseSurcharge
    : service.basePrice;
}

export default function ServiceSelector({ mode, selectedIds, onSelectionChange }: Props) {
  function handleToggle(serviceId: string) {
    const isSelected = selectedIds.includes(serviceId);
    if (isSelected) {
      onSelectionChange(selectedIds.filter((id) => id !== serviceId));
    } else {
      onSelectionChange([...selectedIds, serviceId]);
    }
  }

  // Compute live totals from selected service ids
  const allServices = SERVICE_GROUPS.flatMap((group) => getServicesByGroup(group));
  const selectedServices = allServices.filter((s) => selectedIds.includes(s.id));

  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + getEffectivePrice(s, mode),
    0
  );
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMin, 0);

  return (
    <div className="space-y-4">
      {/* Service group cards — 1 column on mobile, 2 on md+ */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SERVICE_GROUPS.map((group) => {
          const services = getServicesByGroup(group);
          return (
            <Card key={group}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{group}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {services.map((service) => {
                    const effectivePrice = getEffectivePrice(service, mode);
                    const isChecked = selectedIds.includes(service.id);
                    return (
                      <li key={service.id} className="flex items-start gap-3">
                        <Checkbox
                          id={service.id}
                          checked={isChecked}
                          onCheckedChange={() => handleToggle(service.id)}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={service.id}
                          className="flex flex-1 cursor-pointer justify-between gap-2 font-normal leading-snug"
                        >
                          <span>{service.name}</span>
                          <span className="shrink-0 font-medium text-rose-700">
                            CA${effectivePrice}
                          </span>
                        </Label>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Live total summary bar */}
      <div className="rounded-xl bg-rose-100 px-5 py-4 text-rose-800">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm">
            <span className="font-medium">Duration: </span>
            {totalDuration === 0 ? '—' : formatDuration(totalDuration)}
          </div>
          <div className="text-lg font-semibold">
            {totalPrice === 0 ? (
              <span className="text-base font-normal text-rose-600">No services selected</span>
            ) : (
              <>Total: CA${totalPrice}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
