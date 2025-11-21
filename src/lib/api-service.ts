import { Flight } from './shared';

export async function searchRealFlights(origin: string, destination: string): Promise<Flight[]> {
    try {
        const response = await fetch(`/api/flights?origin=${origin}&destination=${destination}`);

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.flights || [];
    } catch (error) {
        console.warn('Real API fetch failed, falling back to generator:', error);
        return [];
    }
}
