import { Flight, Amenity, generateSeatMap } from './shared';

// --- Delta Airlines ---
export const deltaAmenities: Record<string, Amenity> = {
    biscoff: {
        id: 'biscoff',
        name: 'Biscoff Cookies',
        icon: 'Cookie',
        description: 'The iconic Delta Biscoff cookies.',
        items: ['Lotus Biscoff Cookies'],
        image: '/images/delta_biscoff.png',
    },
    starbucks: {
        id: 'starbucks',
        name: 'Starbucks Coffee',
        icon: 'Coffee',
        description: 'Freshly brewed Starbucks coffee served on every flight.',
    },
    delta_studio: {
        id: 'delta_studio',
        name: 'Delta Studio',
        icon: 'Tv',
        description: '1,000+ hours of free entertainment on seatback screens.',
    },
    wifi_fast: {
        id: 'wifi_fast',
        name: 'Fast Free Wi-Fi',
        icon: 'Wifi',
        description: 'Fast, free Wi-Fi for SkyMiles members.',
    },
    delta_one_dining: {
        id: 'delta_one_dining',
        name: 'Delta One Dining',
        icon: 'Utensils',
        description: 'Chef-curated meals with Alessi service ware.',
        items: ['Fox Bros. BBQ', 'Seasonal Entrees', 'Dessert Cart'],
    },
    delta_one_suite: {
        id: 'delta_one_suite',
        name: 'Delta One Suite',
        icon: 'Armchair',
        description: 'Full-height door and lie-flat bed for total privacy.',
    }
};

export const deltaFlights: Flight[] = [
    {
        id: 'dl40',
        airline: 'Delta Air Lines',
        flightNumber: 'DL 40',
        departureTime: '07:30 PM',
        arrivalTime: '07:45 AM',
        origin: 'JFK',
        destination: 'LHR',
        price: 880,
        aircraft: {
            id: 'a330-900neo',
            model: 'Airbus A330-900neo',
            manufacturer: 'Airbus',
            capacity: 281,
            amenities: [
                deltaAmenities.wifi_fast,
                deltaAmenities.delta_one_dining,
                deltaAmenities.biscoff,
                deltaAmenities.starbucks,
                deltaAmenities.delta_studio,
                deltaAmenities.delta_one_suite
            ],
            seatMap: generateSeatMap(35, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J']),
            seatImages: {
                'business': '/images/delta_one_pov.png',
            }
        },
    }
];

// --- British Airways ---
export const baAmenities: Record<string, Amenity> = {
    afternoon_tea: {
        id: 'afternoon_tea',
        name: 'Afternoon Tea',
        icon: 'Coffee',
        description: 'Traditional afternoon tea with scones, jam, and clotted cream.',
        items: ['Scones', 'Clotted Cream', 'Strawberry Jam', 'Finger Sandwiches'],
        image: '/images/ba_scones.png',
    },
    club_world_dining: {
        id: 'club_world_dining',
        name: 'Club World Dining',
        icon: 'Utensils',
        description: 'Gourmet dining with a British touch.',
    },
    white_company: {
        id: 'white_company',
        name: 'The White Company Bedding',
        icon: 'Moon',
        description: 'Luxurious bedding and amenity kits from The White Company.',
    },
    club_suite: {
        id: 'club_suite',
        name: 'Club Suite',
        icon: 'Armchair',
        description: 'Direct aisle access and a privacy door.',
    }
};

export const baFlights: Flight[] = [
    {
        id: 'ba112',
        airline: 'British Airways',
        flightNumber: 'BA 112',
        departureTime: '06:30 PM',
        arrivalTime: '06:30 AM',
        origin: 'JFK',
        destination: 'LHR',
        price: 920,
        aircraft: {
            id: 'b777-300er',
            model: 'Boeing 777-300ER',
            manufacturer: 'Boeing',
            capacity: 254,
            amenities: [
                baAmenities.club_suite,
                baAmenities.afternoon_tea,
                baAmenities.club_world_dining,
                baAmenities.white_company
            ],
            seatMap: generateSeatMap(40, ['A', 'B', 'D', 'E', 'F', 'G', 'J', 'K']),
            seatImages: {
                'business': '/images/ba_club_pov.png',
            }
        },
    }
];

// --- Emirates ---
export const emiratesAmenities: Record<string, Amenity> = {
    arabic_coffee: {
        id: 'arabic_coffee',
        name: 'Arabic Coffee & Dates',
        icon: 'Coffee',
        description: 'Traditional welcome with Arabic coffee and dates.',
        items: ['Arabic Coffee', 'Premium Dates'],
        image: '/images/emirates_dates.png',
    },
    ice: {
        id: 'ice',
        name: 'ice Entertainment',
        icon: 'Tv',
        description: 'Award-winning entertainment system with 6,500+ channels.',
    },
    first_class_suite: {
        id: 'first_class_suite',
        name: 'First Class Private Suite',
        icon: 'Armchair',
        description: 'Fully enclosed private suite with zero-gravity seat.',
    },
    shower_spa: {
        id: 'shower_spa',
        name: 'Onboard Shower Spa',
        icon: 'Droplets',
        description: 'Rejuvenate in the A380 Shower Spa (First Class).',
    },
    onboard_lounge: {
        id: 'onboard_lounge',
        name: 'Onboard Lounge',
        icon: 'Martini',
        description: 'Socialize in the A380 Onboard Lounge.',
    }
};

export const emiratesFlights: Flight[] = [
    {
        id: 'ek202',
        airline: 'Emirates',
        flightNumber: 'EK 202',
        departureTime: '11:00 PM',
        arrivalTime: '07:45 PM', // Next day
        origin: 'JFK',
        destination: 'DXB',
        price: 1450,
        aircraft: {
            id: 'a380-800',
            model: 'Airbus A380-800',
            manufacturer: 'Airbus',
            capacity: 489,
            amenities: [
                emiratesAmenities.first_class_suite,
                emiratesAmenities.shower_spa,
                emiratesAmenities.onboard_lounge,
                emiratesAmenities.arabic_coffee,
                emiratesAmenities.ice
            ],
            seatMap: generateSeatMap(50, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']),
            seatImages: {
                'first': '/images/emirates_first_pov.png',
            }
        },
    }
];

export const allAirlineFlights: Flight[] = [
    ...deltaFlights,
    ...baFlights,
    ...emiratesFlights
];
