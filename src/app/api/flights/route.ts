import { NextResponse } from 'next/server';
import { Flight, amenities, generateSeatMap } from '@/lib/shared';
import { getAirlineAmenities } from '@/lib/airline-amenities';

const AVIATION_STACK_API_KEY = process.env.AVIATION_STACK_API_KEY;
const API_URL = 'http://api.aviationstack.com/v1/flights';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');

    if (!origin || !destination) {
        return NextResponse.json({ error: 'Origin and Destination are required' }, { status: 400 });
    }

    if (!AVIATION_STACK_API_KEY) {
        return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }

    try {
        // AviationStack free tier doesn't support date filtering well in some endpoints, 
        // but we'll try to get active flights.
        // For free tier, we might just get "recent" flights.
        const response = await fetch(
            `${API_URL}?access_key=${AVIATION_STACK_API_KEY}&dep_iata=${origin}&arr_iata=${destination}&limit=100`
        );

        const data = await response.json();

        if (data.error) {
            console.error('AviationStack Error:', data.error);
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        // Transform data to our Flight interface
        const flights: Flight[] = data.data.map((flight: any) => {
            const isLanded = flight.flight_status === 'landed';
            const isInAir = flight.flight_status === 'active';

            // Map status
            let status: Flight['status'] = 'Scheduled';
            if (isLanded) status = 'Landed';
            else if (isInAir) status = 'In Air';
            else if (flight.flight_status === 'scheduled') status = 'Scheduled';
            else if (flight.flight_status === 'cancelled') status = 'Delayed'; // Simplify for UI

            // Calculate progress/telemetry if active (mocking some physics as API doesn't give live telemetry in basic tier)
            let progress = 0;
            let altitude = 0;
            let speed = 0;

            if (isInAir) {
                progress = 50; // Default to mid-flight if unknown
                altitude = 35000;
                speed = 500;
            } else if (isLanded) {
                progress = 100;
            }

            // Format Time: AviationStack returns local time in "YYYY-MM-DDTHH:MM:SS+00:00" format usually.
            // We want to display the HH:MM part as is, because it represents the local time at the airport.
            // Actually, for display purposes, we can just parse the ISO string and format it.
            // But to be safe and stick to "Local Time" as user requested, we should trust the API's scheduled time string.

            const formatLocalTime = (isoString: string) => {
                if (!isoString) return 'TBD';
                const date = new Date(isoString);
                return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });
                // HACK: AviationStack free tier often gives the time as an ISO string which might be interpreted as UTC or Local.
                // If the string is "2025-11-10T14:00:00+00:00", new Date() makes it 14:00 UTC.
                // If we display it in local browser time, it shifts.
                // We want to display "14:00" regardless of where the user is.
                // So we treat the date as if it's in UTC and extract the UTC components to avoid browser shifting.
            };

            return {
                id: flight.flight.iata || `flt-${Math.random()}`,
                airline: flight.airline.name,
                flightNumber: `${flight.airline.iata}${flight.flight.number}`,
                departureTime: formatLocalTime(flight.departure.scheduled),
                arrivalTime: formatLocalTime(flight.arrival.scheduled),
                origin: flight.departure.iata,
                destination: flight.arrival.iata,
                price: 400 + Math.floor(Math.random() * 400), // API doesn't give price
                status: status,
                currentAltitude: altitude,
                currentSpeed: speed,
                distanceRemaining: 0, // specific calc needed
                timeRemaining: '',
                progress: progress,
                terminal: flight.departure.terminal,
                gate: flight.departure.gate,
                registration: flight.aircraft?.registration || 'N/A',
                departureTimezone: flight.departure.timezone,
                arrivalTimezone: flight.arrival.timezone,
                aircraft: {
                    id: 'b737', // Defaulting as API aircraft data can be sparse in free tier
                    model: flight.aircraft?.iata || 'Boeing 737',
                    manufacturer: 'Boeing',
                    capacity: 180,
                    amenities: getAirlineAmenities(flight.airline.name),
                    seatMap: generateSeatMap(30, ['A', 'B', 'C', 'D', 'E', 'F']),
                }
            };
        });

        return NextResponse.json({ flights });

    } catch (error) {
        console.error('API Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: 500 });
    }
}
