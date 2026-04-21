import { Service } from './types';

export const SERVICES: Service[] = [
  // Manicure group
  { id: 'man-no-shellac',    name: 'Manicure w/o Shellac',   group: 'Manicure',       basePrice: 25, inHouseSurcharge: 10, durationMin: 45 },
  { id: 'man-shellac-hand',  name: 'Shellac Hand',           group: 'Manicure',       basePrice: 40, inHouseSurcharge: 10, durationMin: 45 },
  { id: 'man-with-shellac',  name: 'Manicure w/ Shellac',    group: 'Manicure',       basePrice: 50, inHouseSurcharge: 10, durationMin: 60 },
  { id: 'man-take-off',      name: 'Nail Take Off',          group: 'Manicure',       basePrice: 20, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'man-repair',        name: 'Nail Repair',            group: 'Manicure',       basePrice:  5, inHouseSurcharge: 10, durationMin: 15 },

  // Pedicure group
  { id: 'ped-no-shellac',    name: 'Pedicure w/o Shellac',   group: 'Pedicure',       basePrice: 50, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'ped-with-shellac',  name: 'Pedicure w/ Shellac',    group: 'Pedicure',       basePrice: 55, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'ped-shellac-feet',  name: 'Shellac Feet',           group: 'Pedicure',       basePrice: 35, inHouseSurcharge: 10, durationMin: 30 },

  // Sets & Refills group
  { id: 'set-acrylic-full',  name: 'Acrylic Full Set',       group: 'Sets & Refills', basePrice: 60, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-gel-full',      name: 'Gel Full Set',           group: 'Sets & Refills', basePrice: 65, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-acrylic-refill',name: 'Acrylic Refill',         group: 'Sets & Refills', basePrice: 50, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-gel-refill',    name: 'Gel Refill',             group: 'Sets & Refills', basePrice: 55, inHouseSurcharge: 15, durationMin: 90 },
  { id: 'set-long-addon',    name: 'Long Nail add-on',       group: 'Sets & Refills', basePrice:  5, inHouseSurcharge: 10, durationMin: 15 },

  // Design group
  { id: 'des-white-airbrush',name: 'White Airbrush',         group: 'Design',         basePrice: 15, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'des-colour-airbrush',name:'Colour Airbrush',        group: 'Design',         basePrice: 15, inHouseSurcharge: 10, durationMin: 30 },
  { id: 'des-hand-drawn',    name: 'Hand-Drawn',             group: 'Design',         basePrice:  5, inHouseSurcharge: 10, durationMin: 30 },

  // Other group
  { id: 'oth-kids-combo',    name: 'Kids Combo',             group: 'Other',          basePrice: 60, inHouseSurcharge: 10, durationMin: 60 },
];

// Group names in display order
export const SERVICE_GROUPS = [
  'Manicure',
  'Pedicure',
  'Sets & Refills',
  'Design',
  'Other',
] as const;

// Hardcoded for Phase 1; admin-configurable in Phase 5
export const NAIL_TECHS: string[] = ['Lona'];

export function getServicesByGroup(group: string): Service[] {
  return SERVICES.filter((s) => s.group === group);
}
