import { Flight } from './shared';

export interface FlightPattern {
    airline: string;
    flightNumber: string;
    departureTime: string; // HH:MM 24h format
    duration: number; // minutes
    aircraft: string; // ID from shared/generator
    price: number;
}

// Real-world daily schedules (approximate for 2024/2025)
export const flightSchedules: Record<string, FlightPattern[]> = {
    // --- SFO -> IAH (United Hub-to-Hub) ---
    "SFO-IAH": [
        { airline: "United Airlines", flightNumber: "UA242", departureTime: "06:00", duration: 235, aircraft: "b737-max9", price: 420 },
        { airline: "United Airlines", flightNumber: "UA1840", departureTime: "08:25", duration: 235, aircraft: "b777-200", price: 450 },
        { airline: "United Airlines", flightNumber: "UA2425", departureTime: "11:10", duration: 240, aircraft: "b787-9", price: 510 },
        { airline: "United Airlines", flightNumber: "UA2236", departureTime: "13:20", duration: 235, aircraft: "b737-max9", price: 480 },
        { airline: "United Airlines", flightNumber: "UA358", departureTime: "15:45", duration: 235, aircraft: "b777-200", price: 550 },
        { airline: "United Airlines", flightNumber: "UA1254", departureTime: "18:30", duration: 230, aircraft: "b787-9", price: 490 },
        { airline: "United Airlines", flightNumber: "UA489", departureTime: "23:55", duration: 230, aircraft: "b737-max9", price: 380 },
    ],
    // --- IAH -> SFO (Return) ---
    "IAH-SFO": [
        { airline: "United Airlines", flightNumber: "UA1123", departureTime: "07:15", duration: 260, aircraft: "b737-max9", price: 420 },
        { airline: "United Airlines", flightNumber: "UA455", departureTime: "09:40", duration: 265, aircraft: "b777-200", price: 450 },
        { airline: "United Airlines", flightNumber: "UA2210", departureTime: "12:30", duration: 265, aircraft: "b787-9", price: 510 },
        { airline: "United Airlines", flightNumber: "UA1748", departureTime: "16:20", duration: 260, aircraft: "b737-max9", price: 550 },
        { airline: "United Airlines", flightNumber: "UA532", departureTime: "20:10", duration: 255, aircraft: "b787-9", price: 480 },
    ],

    // --- DFW -> EWR (American / United) ---
    "DFW-EWR": [
        { airline: "American Airlines", flightNumber: "AA1562", departureTime: "07:00", duration: 205, aircraft: "b737-max9", price: 380 },
        { airline: "United Airlines", flightNumber: "UA1639", departureTime: "08:15", duration: 210, aircraft: "a321neo", price: 410 },
        { airline: "American Airlines", flightNumber: "AA2408", departureTime: "10:35", duration: 205, aircraft: "a321neo", price: 450 },
        { airline: "United Airlines", flightNumber: "UA2368", departureTime: "13:00", duration: 210, aircraft: "b737-max9", price: 420 },
        { airline: "American Airlines", flightNumber: "AA1289", departureTime: "15:45", duration: 205, aircraft: "b737-max9", price: 490 },
        { airline: "United Airlines", flightNumber: "UA1882", departureTime: "18:20", duration: 210, aircraft: "a321neo", price: 460 },
    ],
    // --- EWR -> DFW (Return) ---
    "EWR-DFW": [
        { airline: "United Airlines", flightNumber: "UA1556", departureTime: "06:00", duration: 230, aircraft: "b737-max9", price: 380 },
        { airline: "American Airlines", flightNumber: "AA1145", departureTime: "08:30", duration: 225, aircraft: "a321neo", price: 410 },
        { airline: "United Airlines", flightNumber: "UA2233", departureTime: "11:15", duration: 230, aircraft: "a321neo", price: 420 },
        { airline: "American Airlines", flightNumber: "AA2678", departureTime: "14:45", duration: 225, aircraft: "b737-max9", price: 450 },
        { airline: "United Airlines", flightNumber: "UA482", departureTime: "17:30", duration: 230, aircraft: "b737-max9", price: 490 },
    ],

    // --- JFK -> LAX (Premium Transcon) ---
    "JFK-LAX": [
        { airline: "Delta Air Lines", flightNumber: "DL472", departureTime: "07:00", duration: 375, aircraft: "b767-300", price: 650 },
        { airline: "Delta Air Lines", flightNumber: "DL324", departureTime: "09:30", duration: 380, aircraft: "a330-900", price: 720 },
        { airline: "Delta Air Lines", flightNumber: "DL449", departureTime: "12:15", duration: 375, aircraft: "b767-300", price: 680 },
        { airline: "Delta Air Lines", flightNumber: "DL245", departureTime: "16:00", duration: 380, aircraft: "a330-900", price: 750 },
        { airline: "Delta Air Lines", flightNumber: "DL921", departureTime: "19:30", duration: 370, aircraft: "b767-300", price: 620 },
    ],
    // --- LAX -> JFK (Return) ---
    "LAX-JFK": [
        { airline: "Delta Air Lines", flightNumber: "DL521", departureTime: "06:15", duration: 330, aircraft: "b767-300", price: 650 },
        { airline: "Delta Air Lines", flightNumber: "DL388", departureTime: "08:45", duration: 335, aircraft: "a330-900", price: 720 },
        { airline: "Delta Air Lines", flightNumber: "DL422", departureTime: "11:30", duration: 330, aircraft: "b767-300", price: 680 },
        { airline: "Delta Air Lines", flightNumber: "DL892", departureTime: "15:15", duration: 335, aircraft: "a330-900", price: 750 },
        { airline: "Delta Air Lines", flightNumber: "DL1145", departureTime: "21:30", duration: 325, aircraft: "b767-300", price: 580 },
    ],
    // --- IAH -> LGA (Houston Intercontinental to LaGuardia) ---
    "IAH-LGA": [
        { airline: "United Airlines", flightNumber: "UA1088", departureTime: "07:00", duration: 215, aircraft: "b737-max9", price: 380 },
        { airline: "Spirit Airlines", flightNumber: "NK912", departureTime: "09:30", duration: 215, aircraft: "a321neo", price: 180 },
        { airline: "United Airlines", flightNumber: "UA2254", departureTime: "11:45", duration: 220, aircraft: "a321neo", price: 420 },
        { airline: "Delta Air Lines", flightNumber: "DL5622", departureTime: "14:15", duration: 215, aircraft: "a321neo", price: 450 },
        { airline: "United Airlines", flightNumber: "UA482", departureTime: "17:30", duration: 220, aircraft: "b737-max9", price: 490 },
    ],
    // --- HOU -> LGA (Houston Hobby to LaGuardia - Southwest) ---
    "HOU-LGA": [
        { airline: "Southwest Airlines", flightNumber: "WN124", departureTime: "06:15", duration: 210, aircraft: "b737-max9", price: 290 },
        { airline: "Southwest Airlines", flightNumber: "WN482", departureTime: "09:45", duration: 215, aircraft: "b737-max9", price: 320 },
        { airline: "Southwest Airlines", flightNumber: "WN1156", departureTime: "13:20", duration: 210, aircraft: "b737-max9", price: 350 },
        { airline: "Southwest Airlines", flightNumber: "WN2298", departureTime: "16:50", duration: 215, aircraft: "b737-max9", price: 380 },
    ],
};
