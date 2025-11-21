// Simple database of major airport coordinates (Lat, Long)
// Lat: -90 to 90, Long: -180 to 180
export const AIRPORT_COORDINATES: Record<string, { lat: number, long: number }> = {
    // US Major Hubs
    "EWR": { lat: 40.6895, long: -74.1745 }, // Newark
    "JFK": { lat: 40.6413, long: -73.7781 }, // New York JFK
    "LGA": { lat: 40.7769, long: -73.8740 }, // LaGuardia
    "SFO": { lat: 37.6213, long: -122.3790 }, // San Francisco
    "LAX": { lat: 33.9416, long: -118.4085 }, // Los Angeles
    "ORD": { lat: 41.9742, long: -87.9073 }, // Chicago O'Hare
    "DFW": { lat: 32.8998, long: -97.0403 }, // Dallas/Fort Worth
    "IAH": { lat: 29.9902, long: -95.3368 }, // Houston Intercontinental
    "HOU": { lat: 29.6454, long: -95.2788 }, // Houston Hobby
    "MIA": { lat: 25.7959, long: -80.2870 }, // Miami
    "ATL": { lat: 33.6407, long: -84.4277 }, // Atlanta
    "DEN": { lat: 39.8561, long: -104.6737 }, // Denver
    "SEA": { lat: 47.4502, long: -122.3088 }, // Seattle
    "BOS": { lat: 42.3656, long: -71.0096 }, // Boston
    "MCO": { lat: 28.4312, long: -81.3081 }, // Orlando
    "LAS": { lat: 36.0840, long: -115.1537 }, // Las Vegas

    // International
    "LHR": { lat: 51.4700, long: -0.4543 }, // London Heathrow
    "CDG": { lat: 49.0097, long: 2.5479 }, // Paris Charles de Gaulle
    "DXB": { lat: 25.2532, long: 55.3657 }, // Dubai
    "SIN": { lat: 1.3644, long: 103.9915 }, // Singapore
    "HND": { lat: 35.5494, long: 139.7798 }, // Tokyo Haneda
    "NRT": { lat: 35.7720, long: 140.3929 }, // Tokyo Narita
    "FRA": { lat: 50.0379, long: 8.5622 }, // Frankfurt
};

// Helper to get coordinates with fallback
export function getAirportCoords(code: string) {
    return AIRPORT_COORDINATES[code.toUpperCase()] || { lat: 40.7128, long: -74.0060 }; // Default to NYC if unknown
}
