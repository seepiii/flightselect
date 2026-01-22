import { NextResponse } from 'next/server';

const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

// Get Amadeus access token
async function getAmadeusToken(): Promise<string | null> {
    if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
        return null;
    }

    try {
        const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: AMADEUS_CLIENT_ID,
                client_secret: AMADEUS_CLIENT_SECRET,
            }),
        });

        const data = await response.json();
        return data.access_token || null;
    } catch (error) {
        console.error('Amadeus token error:', error);
        return null;
    }
}

// Search flight offers (pricing)
async function searchFlightOffers(
    token: string,
    origin: string,
    destination: string,
    departureDate: string
): Promise<any> {
    try {
        const response = await fetch(
            `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1&max=10`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Amadeus search error:', error);
        return null;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('date');
    const flightNumber = searchParams.get('flightNumber');

    if (!origin || !destination) {
        return NextResponse.json(
            { error: 'Origin and Destination are required' },
            { status: 400 }
        );
    }

    // If no Amadeus credentials, return estimated price
    if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
        return NextResponse.json({
            prices: [],
            message: 'Amadeus API not configured. Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to get real prices.',
        });
    }

    try {
        // Get access token
        const token = await getAmadeusToken();
        if (!token) {
            return NextResponse.json(
                { error: 'Failed to authenticate with Amadeus API' },
                { status: 500 }
            );
        }

        // Use provided date or default to tomorrow
        const searchDate = departureDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];

        // Search for flight offers
        const offers = await searchFlightOffers(token, origin, destination, searchDate);

        if (!offers || offers.errors) {
            return NextResponse.json(
                { error: offers?.errors?.[0]?.detail || 'Failed to fetch flight prices' },
                { status: 500 }
            );
        }

        // Transform Amadeus data to our format
        const prices = (offers.data || []).map((offer: any) => {
            const price = offer.price;
            const segments = offer.itineraries[0]?.segments || [];
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];

            return {
                flightNumber: firstSegment?.carrierCode + firstSegment?.number,
                airline: firstSegment?.carrierCode,
                price: parseFloat(price.total),
                currency: price.currency,
                departureTime: firstSegment?.departure?.at,
                arrivalTime: lastSegment?.arrival?.at,
                origin: firstSegment?.departure?.iataCode,
                destination: lastSegment?.arrival?.iataCode,
                numberOfStops: segments.length - 1,
                duration: offer.itineraries[0]?.duration,
            };
        });

        // If flight number specified, filter to that flight
        if (flightNumber) {
            const filtered = prices.filter((p: any) =>
                p.flightNumber?.toUpperCase().includes(flightNumber.toUpperCase())
            );
            return NextResponse.json({ prices: filtered });
        }

        return NextResponse.json({ prices });
    } catch (error) {
        console.error('Flight price API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch flight prices' },
            { status: 500 }
        );
    }
}

