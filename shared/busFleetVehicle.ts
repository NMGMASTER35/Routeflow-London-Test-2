// TypeScript interface for a London bus fleet vehicle
export interface BusFleetVehicle {
  reg: string; // Registration plate (primary key)
  fleetNo: string;
  model: string;
  operator: string;
  garage: string;
  fuelType: string;
  currentRoute: string | null;
  status: 'active' | 'withdrawn';
  lastSeen: string; // ISO date string
  photoGallery: string[]; // URLs to Firebase Storage
  userNotes: Array<{
    userId: string;
    note: string;
    timestamp: string;
  }>;
  routeHistory: Array<{
    routeId: string;
    from: string; // ISO date
    to: string; // ISO date or null if current
  }>;
  achievements?: string[]; // e.g., rare sightings, awards
}
