import { Flight, Amenity, generateSeatMap } from './shared';
import { realUnitedFlights } from './united-data';
import { allAirlineFlights } from './airline-data';

export type { Flight, Amenity, Seat, Aircraft } from './shared';
export { generateSeatMap } from './shared';

// Flight type extension moved to shared.ts

// amenities moved to shared.ts

import { realFlightsDB } from './real-flight-db';

export const mockFlights: Flight[] = realFlightsDB;
