export interface Amenity {
    id: string;
    name: string;
    icon: string; // Lucide icon name
    description?: string;
    items?: string[]; // For snacks list
    image?: string; // Path to real image
}

export interface Seat {
    id: string;
    row: number;
    col: string;
    type: 'economy' | 'business' | 'first';
    isOccupied: boolean;
    price: number;
    viewDescription: string; // Description of the view from this seat
}

export interface Aircraft {
    id: string;
    model: string;
    manufacturer: string;
    capacity: number;
    amenities: Amenity[];
    seatMap: Seat[];
    seatImages?: Record<string, string>; // Map seat type to image path
}

export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    price: number;
    aircraft: Aircraft;
    // Tracking fields
    status?: 'On Time' | 'Delayed' | 'In Air' | 'Landed' | 'Scheduled';
    currentAltitude?: number; // ft
    currentSpeed?: number; // mph
    distanceRemaining?: number; // miles
    timeRemaining?: string;
    progress?: number; // 0-100
    terminal?: string;
    gate?: string;
    registration?: string;
    baggageClaim?: string;
    departureTimezone?: string;
    arrivalTimezone?: string;
}

export const generateSeatMap = (rows: number, cols: string[]): Seat[] => {
    const seats: Seat[] = [];
    for (let r = 1; r <= rows; r++) {
        cols.forEach((c) => {
            const isFirstClass = r <= 2;
            const isBusiness = r > 2 && r <= 5;
            seats.push({
                id: `${r}${c}`,
                row: r,
                col: c,
                type: isFirstClass ? 'first' : isBusiness ? 'business' : 'economy',
                isOccupied: Math.random() > 0.7,
                price: isFirstClass ? 1200 : isBusiness ? 600 : 200,
                viewDescription: c === 'A' || c === 'F' || c === 'K' || c === 'L'
                    ? `Stunning window view of the ${r < 10 ? 'wing and engine' : 'clouds and landscape'}.`
                    : 'Aisle access with easy movement.',
            });
        });
    }
    return seats;
};

export const amenities: Amenity[] = [
    {
        id: 'wifi',
        name: 'High-Speed Wi-Fi',
        icon: 'Wifi',
        description: 'Stay connected with our high-speed satellite internet.',
    },
    {
        id: 'tv',
        name: '4K Entertainment',
        icon: 'Tv',
        description: 'Personal 4K screens with over 1000 movies and shows.',
    },
    {
        id: 'snacks',
        name: 'Premium Snacks',
        icon: 'Coffee',
        description: 'Complimentary premium snacks and beverages.',
        items: ['Gourmet Pretzels', 'Truffle Popcorn', 'Artisanal Cookies', 'Sparkling Water', 'Craft Soda'],
    },
    {
        id: 'power',
        name: 'Power Outlets',
        icon: 'Zap',
        description: 'AC power and USB-C charging at every seat.',
    },
];
