'use client';

import { useEffect, useRef } from 'react';
import { ServiceMode } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  mode: ServiceMode;
  inHouseAddress: string;
  onAddressChange: (address: string) => void;
}

// Module-level flag to prevent loading the Maps script more than once
let mapsScriptLoaded = false;

// Minimal typings for the Google Maps Places API surface used here
declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: object
          ) => {
            addListener: (event: string, handler: () => void) => void;
            getPlace: () => { formatted_address?: string };
          };
        };
      };
    };
  }
}

export default function LocationFields({ mode, inHouseAddress, onAddressChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode !== 'in-house') return;

    function attachAutocomplete() {
      if (!inputRef.current) return;
      const PlacesAutocomplete = window.google?.maps?.places?.Autocomplete;
      if (!PlacesAutocomplete) return;
      const autocomplete = new PlacesAutocomplete(
        inputRef.current,
        { types: ['address'] }
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onAddressChange(place.formatted_address ?? '');
      });
    }

    if (window.google?.maps?.places) {
      attachAutocomplete();
      return;
    }

    if (!mapsScriptLoaded) {
      mapsScriptLoaded = true;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = attachAutocomplete;
      document.head.appendChild(script);
    }
  }, [mode, onAddressChange]);

  if (mode === 'at-salon') {
    return (
      <div className="space-y-1">
        <Label htmlFor="salon-address">Salon Address</Label>
        <div
          id="salon-address"
          className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"
          aria-readonly="true"
        >
          {process.env.NEXT_PUBLIC_SALON_ADDRESS ?? 'Salon address not configured'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <Label htmlFor="in-house-address">Your Address</Label>
      <Input
        id="in-house-address"
        ref={inputRef}
        type="text"
        placeholder="Start typing your address..."
        value={inHouseAddress}
        onChange={(e) => onAddressChange(e.target.value)}
      />
    </div>
  );
}
