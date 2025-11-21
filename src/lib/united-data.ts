import { Flight, Amenity, generateSeatMap } from './shared';

// Real United Amenities
export const unitedAmenities: Record<string, Amenity> = {
    stroopwafel: {
        id: 'stroopwafel',
        name: 'Stroopwafel',
        icon: 'Cookie',
        description: 'The famous United Stroopwafel. A Dutch caramel waffle treat.',
        items: ['Daelmans Stroopwafel'],
        image: '/images/united_stroopwafel.png',
    },
    quinoa: {
        id: 'quinoa',
        name: 'Chocolate Quinoa Crisps',
        icon: 'Cookie',
        description: 'Undercover Snacks Dark Chocolate + Sea Salt Quinoa Crisps.',
        items: ['Dark Chocolate Quinoa Crisps'],
    },
    tapas: {
        id: 'tapas',
        name: 'Tapas Snack Box',
        icon: 'Utensils',
        description: 'Available for purchase. Includes almonds, olives, hummus, and crackers.',
        items: ['Almonds', 'Olives', 'Hummus', 'Bruschetta', 'Crackers'],
    },
    illy: {
        id: 'illy',
        name: 'Illy Coffee',
        icon: 'Coffee',
        description: 'Premium illy dark roast coffee, brewed fresh on board.',
    },
    wifi_panasonic: {
        id: 'wifi_panasonic',
        name: 'United Wi-Fi (Panasonic)',
        icon: 'Wifi',
        description: 'Global satellite coverage. Streaming supported on select plans.',
    },
    wifi_viasat: {
        id: 'wifi_viasat',
        name: 'United Wi-Fi (Viasat)',
        icon: 'Wifi',
        description: 'High-speed Ka-band internet. Gate-to-gate connectivity.',
    },
    polaris_dining: {
        id: 'polaris_dining',
        name: 'Polaris Dining',
        icon: 'Utensils',
        description: 'Multi-course dining experience designed by The Trotter Project.',
        items: ['Chilled Appetizer', 'Salad', 'Choice of Entree', 'Ice Cream Sundae Cart'],
    },
    screens: {
        id: 'screens',
        name: 'Seatback Entertainment',
        icon: 'Tv',
        description: '10-inch to 16-inch HD screens with extensive movie library.',
    },
    power: {
        id: 'power',
        name: 'Power Everywhere',
        icon: 'Zap',
        description: 'AC power outlet and USB-A port at every seat.',
    }
};

// Real United Flights
export const realUnitedFlights: Flight[] = [
    {
        id: 'ua110',
        airline: 'United Airlines',
        flightNumber: 'UA 110',
        departureTime: '06:00 PM',
        arrivalTime: '06:20 AM', // Next day
        origin: 'EWR',
        destination: 'LHR',
        price: 845,
        aircraft: {
            id: 'b767-300',
            model: 'Boeing 767-300ER',
            manufacturer: 'Boeing',
            capacity: 214,
            amenities: [
                unitedAmenities.wifi_panasonic,
                unitedAmenities.polaris_dining,
                unitedAmenities.stroopwafel,
                unitedAmenities.illy,
                unitedAmenities.screens,
                unitedAmenities.power
            ],
            seatMap: generateSeatMap(35, ['A', 'B', 'D', 'E', 'K', 'L']), // 2-1-2 / 2-3-2 layout approximation
        },
    },
    {
        id: 'ua14',
        airline: 'United Airlines',
        flightNumber: 'UA 14',
        departureTime: '06:40 PM',
        arrivalTime: '06:55 AM',
        origin: 'EWR',
        destination: 'LHR',
        price: 845,
        aircraft: {
            id: 'b777-200',
            model: 'Boeing 777-200',
            manufacturer: 'Boeing',
            capacity: 276,
            amenities: [
                unitedAmenities.wifi_viasat,
                unitedAmenities.polaris_dining,
                unitedAmenities.quinoa,
                unitedAmenities.illy,
                unitedAmenities.screens,
                unitedAmenities.power
            ],
            seatMap: generateSeatMap(40, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']),
        },
    },
    {
        id: 'ua539',
        airline: 'United Airlines',
        flightNumber: 'UA 539',
        departureTime: '04:00 PM',
        arrivalTime: '07:18 PM',
        origin: 'EWR',
        destination: 'SFO',
        price: 429,
        aircraft: {
            id: 'b787-10',
            model: 'Boeing 787-10 Dreamliner',
            manufacturer: 'Boeing',
            capacity: 318,
            amenities: [
                unitedAmenities.wifi_panasonic,
                unitedAmenities.tapas,
                unitedAmenities.stroopwafel,
                unitedAmenities.illy,
                unitedAmenities.screens,
                unitedAmenities.power
            ],
            seatMap: generateSeatMap(40, ['A', 'B', 'C', 'D', 'E', 'F', 'J', 'K', 'L']),
        },
    }
];
