import { Amenity } from './shared';

export const AIRLINE_AMENITIES: Record<string, Amenity[]> = {
    // United Airlines
    "United Airlines": [
        { id: 'wifi', name: 'United Wi-Fi', icon: 'Wifi', description: 'Purchase Wi-Fi for messaging and streaming.' },
        { id: 'entertainment', name: 'United Private Screening', icon: 'Tv', description: 'Free movies and TV on your own device.' },
        { id: 'snacks', name: 'Snacks', icon: 'Coffee', description: 'Complimentary snacks on longer flights.', items: ['Stroopwafel', 'Chocolate Quinoa Crisps', 'Savory Snack Mix'], image: '/images/stroopwafel.jpg' },
        { id: 'power', name: 'Power', icon: 'Zap', description: 'Power outlets in select rows.' }
    ],
    // Delta Air Lines
    "Delta Air Lines": [
        { id: 'wifi', name: 'Fast, Free Wi-Fi', icon: 'Wifi', description: 'Free Wi-Fi for SkyMiles members.' },
        { id: 'entertainment', name: 'Delta Studio', icon: 'Tv', description: '1,000+ hours of free entertainment on seatback screens.' },
        { id: 'snacks', name: 'Premium Snacks', icon: 'Coffee', description: 'Complimentary brand-name snacks.', items: ['Biscoff Cookies', 'SunChips', 'Almonds'], image: '/images/biscoff.jpg' },
        { id: 'power', name: 'Power', icon: 'Zap', description: 'AC power and USB ports at every seat.' }
    ],
    // American Airlines
    "American Airlines": [
        { id: 'wifi', name: 'High-Speed Wi-Fi', icon: 'Wifi', description: 'Gate-to-gate Wi-Fi available for purchase.' },
        { id: 'entertainment', name: 'Free Entertainment', icon: 'Tv', description: 'Stream free movies and TV to your device.' },
        { id: 'snacks', name: 'Snacks', icon: 'Coffee', description: 'Complimentary pretzels or Biscoff cookies.', items: ['Pretzels', 'Biscoff Cookies'] },
        { id: 'power', name: 'Power', icon: 'Zap', description: 'Power outlets on most mainline aircraft.' }
    ],
    // Southwest Airlines
    "Southwest Airlines": [
        { id: 'wifi', name: 'Inflight Internet', icon: 'Wifi', description: '$8 Internet per device.' },
        { id: 'entertainment', name: 'Free Movies & TV', icon: 'Tv', description: 'Watch free movies and live TV on your device.' },
        { id: 'snacks', name: 'Snacks', icon: 'Coffee', description: 'Complimentary snack mix and non-alcoholic drinks.', items: ['Snack Mix', 'Brownie Brittle'] },
        { id: 'bags', name: 'Bags Fly Free', icon: 'Luggage', description: 'Two checked bags fly free.' }
    ],
    // Spirit Airlines
    "Spirit Airlines": [
        { id: 'wifi', name: 'Wi-Fi', icon: 'Wifi', description: 'High-speed Wi-Fi available for purchase.' },
        { id: 'snacks', name: 'Buy on Board', icon: 'Coffee', description: 'Refreshments and snacks available for purchase.' },
        { id: 'seat', name: 'Big Front Seat', icon: 'Armchair', description: 'Wider seats available for upgrade.' }
    ],
    // Default
    "default": [
        { id: 'wifi', name: 'Wi-Fi', icon: 'Wifi', description: 'Wi-Fi availability varies by aircraft.' },
        { id: 'snacks', name: 'Refreshments', icon: 'Coffee', description: 'Snacks and drinks available.' }
    ]
};

export function getAirlineAmenities(airlineName: string): Amenity[] {
    // Simple partial match or exact match
    const key = Object.keys(AIRLINE_AMENITIES).find(k => airlineName.includes(k)) || "default";
    return AIRLINE_AMENITIES[key];
}
