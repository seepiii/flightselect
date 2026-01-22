import { Flight } from './shared';

export interface FlightPrice {
    flightNumber: string;
    airline: string;
    price: number;
    currency: string;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    numberOfStops: number;
    duration: string;
}

export async function getFlightPrices(
    origin: string,
    destination: string,
    date?: string,
    flightNumber?: string
): Promise<FlightPrice[]> {
    try {
        const params = new URLSearchParams({
            origin,
            destination,
        });

        if (date) params.append('date', date);
        if (flightNumber) params.append('flightNumber', flightNumber);

        const response = await fetch(`/api/flight-price?${params.toString()}`);

        if (!response.ok) {
            throw new Error('Failed to fetch prices');
        }

        const data = await response.json();
        return data.prices || [];
    } catch (error) {
        console.warn('Price fetch failed:', error);
        return [];
    }
}

// Helper to enrich existing flight with real price
export async function enrichFlightWithPrice(flight: Flight): Promise<Flight> {
    const prices = await getFlightPrices(
        flight.origin,
        flight.destination,
        undefined,
        flight.flightNumber
    );

    if (prices.length > 0) {
        // Find matching flight by flight number
        const matchingPrice = prices.find(
            (p) => p.flightNumber?.toUpperCase() === flight.flightNumber.toUpperCase()
        );

        if (matchingPrice) {
            return {
                ...flight,
                price: matchingPrice.price,
            };
        }
    }

    return flight;
}

