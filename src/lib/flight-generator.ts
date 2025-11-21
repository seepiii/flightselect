import { Flight, Amenity, generateSeatMap, amenities } from './shared';

const AIRLINES = [
    { name: 'United Airlines', code: 'UA', isDomestic: true },
    { name: 'American Airlines', code: 'AA', isDomestic: true },
    { name: 'Delta Air Lines', code: 'DL', isDomestic: true },
    { name: 'Southwest Airlines', code: 'WN', isDomestic: true },
    { name: 'British Airways', code: 'BA', isDomestic: false },
    { name: 'Lufthansa', code: 'LH', isDomestic: false },
    { name: 'Air France', code: 'AF', isDomestic: false },
    { name: 'Emirates', code: 'EK', isDomestic: false },
    { name: 'Qatar Airways', code: 'QR', isDomestic: false },
    { name: 'Singapore Airlines', code: 'SQ', isDomestic: false },
];

const AIRCRAFT_TYPES = [
    { id: 'b777-300er', model: 'Boeing 777-300ER', manufacturer: 'Boeing', capacity: 396 },
    { id: 'b787-9', model: 'Boeing 787-9 Dreamliner', manufacturer: 'Boeing', capacity: 290 },
    { id: 'a350-900', model: 'Airbus A350-900', manufacturer: 'Airbus', capacity: 325 },
    { id: 'a330-300', model: 'Airbus A330-300', manufacturer: 'Airbus', capacity: 277 },
    { id: 'b737-max9', model: 'Boeing 737 MAX 9', manufacturer: 'Boeing', capacity: 178 },
    { id: 'a321neo', model: 'Airbus A321neo', manufacturer: 'Airbus', capacity: 196 },
];

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

import { flightSchedules } from './flight-schedules';

export function generateFlights(origin: string, destination: string, dateStr?: string): Flight[] {
    const flights: Flight[] = [];
    const routeKey = `${origin.toUpperCase()}-${destination.toUpperCase()}`;

    const today = new Date();
    const searchDate = dateStr ? new Date(dateStr) : today;
    // Normalize searchDate to local midnight for comparison
    const searchDateMidnight = new Date(searchDate);
    searchDateMidnight.setHours(0, 0, 0, 0);
    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);

    const isToday = searchDateMidnight.getTime() === todayMidnight.getTime();

    // Check if we have real schedules for this route
    if (flightSchedules[routeKey]) {
        const patterns = flightSchedules[routeKey];

        patterns.forEach(pattern => {
            // Parse departure time (HH:MM)
            const [hours, minutes] = pattern.departureTime.split(':').map(Number);
            const departureDate = new Date(searchDate);
            departureDate.setHours(hours, minutes, 0, 0);

            const arrivalDate = new Date(departureDate.getTime() + pattern.duration * 60000);

            // Format times
            const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            // Determine Aircraft details
            const aircraftType = AIRCRAFT_TYPES.find(a => a.id === pattern.aircraft) || AIRCRAFT_TYPES[0];

            // Determine Status
            let status: Flight['status'] = 'Scheduled';
            let progress = 0;
            let currentAltitude = 0;
            let currentSpeed = 0;
            let timeRemaining = '';
            let distanceRemaining = Math.floor(pattern.duration * 8); // Rough estimate

            if (isToday) {
                const now = new Date();
                if (now > arrivalDate) {
                    status = 'Landed';
                    progress = 100;
                    distanceRemaining = 0;
                    timeRemaining = 'Arrived';
                } else if (now > departureDate) {
                    status = 'In Air';
                    const elapsedTime = (now.getTime() - departureDate.getTime()) / 60000;
                    progress = Math.min(100, Math.floor((elapsedTime / pattern.duration) * 100));
                    currentAltitude = getRandomInt(32000, 41000);
                    currentSpeed = getRandomInt(480, 600);
                    distanceRemaining = Math.floor((pattern.duration * 8) * (1 - progress / 100));
                    const minsRemaining = pattern.duration - elapsedTime;
                    const hrs = Math.floor(minsRemaining / 60);
                    const mins = Math.floor(minsRemaining % 60);
                    timeRemaining = `${hrs}h ${mins}m`;
                } else if (now.getTime() > departureDate.getTime() - 30 * 60000) {
                    status = 'On Time'; // Close to departure
                }
            }

            flights.push({
                id: `${pattern.flightNumber.toLowerCase()}-${searchDate.getTime()}`,
                airline: pattern.airline,
                flightNumber: pattern.flightNumber,
                departureTime: formatTime(departureDate),
                arrivalTime: formatTime(arrivalDate),
                origin: origin.toUpperCase(),
                destination: destination.toUpperCase(),
                price: pattern.price,
                status: status,
                currentAltitude,
                currentSpeed,
                distanceRemaining,
                timeRemaining,
                progress,
                terminal: getRandomElement(['A', 'B', 'C', '1', '2']),
                gate: `${getRandomElement(['A', 'B', 'C'])}${getRandomInt(1, 50)}`,
                registration: `N${getRandomInt(100, 999)}${pattern.airline.substring(0, 2)}`,
                aircraft: {
                    id: aircraftType.id,
                    model: aircraftType.model,
                    manufacturer: aircraftType.manufacturer,
                    capacity: aircraftType.capacity,
                    amenities: amenities,
                    seatMap: generateSeatMap(Math.floor(aircraftType.capacity / 6), ['A', 'B', 'C', 'D', 'E', 'F']),
                }
            });
        });

        return flights.sort((a, b) => {
            const timeA = new Date(`2000/01/01 ${a.departureTime}`).getTime();
            const timeB = new Date(`2000/01/01 ${b.departureTime}`).getTime();
            return timeA - timeB;
        });
    }

    // --- FALLBACK: Random Generation for unknown routes ---
    const numFlights = getRandomInt(3, 8); // Generate 3-8 flights per day
    const basePrice = getRandomInt(300, 1200);
    const distance = getRandomInt(500, 9000); // Approximate distance
    const flightDurationMinutes = Math.floor(distance / 500 * 60 + 30); // Rough estimate: 500mph + 30min taxi

    // Determine if route is likely domestic (US)
    // Simple heuristic: US airport codes are 3 letters. International often 3 but we can assume domestic if both are known US hubs or short distance
    // Better heuristic: Check if airline list should be restricted
    const isDomestic = ['EWR', 'JFK', 'LGA', 'SFO', 'LAX', 'ORD', 'DFW', 'IAH', 'HOU', 'MIA', 'ATL', 'DEN', 'SEA', 'BOS', 'MCO', 'LAS'].includes(origin.toUpperCase()) &&
        ['EWR', 'JFK', 'LGA', 'SFO', 'LAX', 'ORD', 'DFW', 'IAH', 'HOU', 'MIA', 'ATL', 'DEN', 'SEA', 'BOS', 'MCO', 'LAS'].includes(destination.toUpperCase());

    const availableAirlines = isDomestic
        ? AIRLINES.filter(a => a.isDomestic)
        : AIRLINES;

    for (let i = 0; i < numFlights; i++) {
        const airline = getRandomElement(availableAirlines);
        const aircraft = getRandomElement(AIRCRAFT_TYPES);
        const flightNumber = `${airline.code}${getRandomInt(100, 9999)}`;

        // Random departure hour (6 AM to 10 PM)
        const departureHour = getRandomInt(6, 22);
        const departureMinute = getRandomElement([0, 15, 30, 45]);

        const departureDate = new Date(searchDate);
        departureDate.setHours(departureHour, departureMinute, 0, 0);

        const arrivalDate = new Date(departureDate.getTime() + flightDurationMinutes * 60000);

        // Format times
        const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Determine Status
        let status: Flight['status'] = 'Scheduled';
        let progress = 0;
        let currentAltitude = 0;
        let currentSpeed = 0;
        let timeRemaining = '';
        let distanceRemaining = distance;

        if (isToday) {
            const now = new Date();
            if (now > arrivalDate) {
                status = 'Landed';
                progress = 100;
                distanceRemaining = 0;
                timeRemaining = 'Arrived';
            } else if (now > departureDate) {
                status = 'In Air';
                const elapsedTime = (now.getTime() - departureDate.getTime()) / 60000;
                progress = Math.min(100, Math.floor((elapsedTime / flightDurationMinutes) * 100));
                currentAltitude = getRandomInt(32000, 41000);
                currentSpeed = getRandomInt(480, 600);
                distanceRemaining = Math.floor(distance * (1 - progress / 100));
                const minsRemaining = flightDurationMinutes - elapsedTime;
                const hrs = Math.floor(minsRemaining / 60);
                const mins = Math.floor(minsRemaining % 60);
                timeRemaining = `${hrs}h ${mins}m`;
            } else if (now.getTime() > departureDate.getTime() - 30 * 60000) {
                status = 'On Time'; // Close to departure
            }
        }

        flights.push({
            id: flightNumber.toLowerCase(),
            airline: airline.name,
            flightNumber: flightNumber,
            departureTime: formatTime(departureDate),
            arrivalTime: formatTime(arrivalDate),
            origin: origin.toUpperCase(),
            destination: destination.toUpperCase(),
            price: basePrice + getRandomInt(-50, 200),
            status: status,
            currentAltitude,
            currentSpeed,
            distanceRemaining,
            timeRemaining,
            progress,
            terminal: getRandomElement(['A', 'B', 'C', '1', '2', '3', '4', '5']),
            gate: `${getRandomElement(['A', 'B', 'C', 'D'])}${getRandomInt(1, 99)}`,
            registration: `N${getRandomInt(100, 999)}${getRandomElement(['UA', 'AA', 'DL', 'XX'])}`,
            aircraft: {
                id: aircraft.id,
                model: aircraft.model,
                manufacturer: aircraft.manufacturer,
                capacity: aircraft.capacity,
                amenities: amenities,
                seatMap: generateSeatMap(Math.floor(aircraft.capacity / 6), ['A', 'B', 'C', 'D', 'E', 'F']),
            }
        });
    }

    return flights.sort((a, b) => {
        // Sort by departure time roughly
        const timeA = new Date(`2000/01/01 ${a.departureTime}`).getTime();
        const timeB = new Date(`2000/01/01 ${b.departureTime}`).getTime();
        return timeA - timeB;
    });
}
