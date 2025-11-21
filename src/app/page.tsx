"use client";

import { useState } from "react";
import { Flight, mockFlights } from "@/lib/mock-data";
import { generateFlights } from "@/lib/flight-generator";
import { searchRealFlights } from "@/lib/api-service";
import { FlightSearch } from "@/components/flight-search";
import { FlightCard } from "@/components/flight-card";
import { SeatSelectionModal } from "@/components/seat-selection-modal";
import { motion } from "framer-motion";

import { FlightTracker } from "@/components/flight-tracker";

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<'book' | 'track'>('book');

  const handleSearch = (mode: 'book' | 'track', criteria: { date?: string, airline?: string, origin?: string, destination?: string, flightNumber?: string }) => {
    setIsSearching(true);
    setSearchMode(mode);

    // Simulate API call (or real call now)
    // We use a slight delay to show loading state for better UX even if API is fast
    setTimeout(async () => {
      let results: Flight[] = [];

      // 1. Try Real Live API first (if in Book mode with specific route)
      if (mode === 'book' && criteria.origin && criteria.destination) {
        const apiResults = await searchRealFlights(criteria.origin, criteria.destination);
        if (apiResults.length > 0) {
          setFlights(apiResults);
          setHasSearched(true);
          setIsSearching(false);
          return;
        }
      }

      // 2. Fallback to Local DB / Generator logic
      let dbResults = mockFlights;

      if (mode === 'track') {
        if (criteria.flightNumber) {
          dbResults = dbResults.filter(f => f.flightNumber.toLowerCase().includes(criteria.flightNumber!.toLowerCase()));
        } else {
          dbResults = dbResults.filter(f => f.status === 'In Air');
        }
        results = dbResults;
      } else {
        // BOOK MODE
        if (criteria.origin && criteria.destination) {
          // Strict filtering for Origin/Dest
          const origin = criteria.origin.toLowerCase();
          const dest = criteria.destination.toLowerCase();

          dbResults = dbResults.filter(f =>
            f.origin.toLowerCase() === origin &&
            f.destination.toLowerCase() === dest
          );

          if (dbResults.length > 0) {
            results = dbResults;
          } else {
            // 3. Final Fallback: Generate flights if not in DB
            console.log(`No real flights found for ${criteria.origin}->${criteria.destination}. Generating...`);
            results = generateFlights(criteria.origin, criteria.destination, criteria.date);
          }
        } else {
          // If no specific route, just show all real flights (or filter by airline if present)
          if (criteria.airline) {
            dbResults = dbResults.filter(f => f.airline.toLowerCase().includes(criteria.airline!.toLowerCase()));
          }
          results = dbResults;
        }
      }

      setFlights(results);
      setHasSearched(true);
      setIsSearching(false);
    }, 800);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header Section */}
      <header className="text-center space-y-4 pt-10 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
        >
          FlightSelect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Experience your journey before you board. Explore aircrafts, amenities, and stunning seat views.
        </motion.p>
      </header>

      {/* Search Section */}
      <section className="relative z-10">
        <FlightSearch onSearch={handleSearch} />
      </section>

      {/* Results Section */}
      <section className="space-y-6">
        {isSearching ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {searchMode === 'track' ? 'Locating aircraft...' : 'Finding the best flights for you...'}
            </p>
          </div>
        ) : hasSearched ? (
          flights.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold px-2">
                {searchMode === 'track' ? 'Live Flight Status' : 'Available Flights'}
              </h2>

              {searchMode === 'track' ? (
                <div className="space-y-8">
                  {flights.map(flight => (
                    <FlightTracker key={flight.id} flight={flight} />
                  ))}
                </div>
              ) : (
                flights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onViewSeats={setSelectedFlight}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-20 glass-card">
              <p className="text-xl font-semibold">No flights found.</p>
              <p className="text-muted-foreground">Try adjusting your search criteria.</p>
            </div>
          )
        ) : (
          // Initial State / Hero Content could go here
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 opacity-50">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="font-bold">Immersive Views</h3>
              <p className="text-sm text-muted-foreground">See exactly what you'll see from your window.</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">💺</div>
              <h3 className="font-bold">Seat Details</h3>
              <p className="text-sm text-muted-foreground">Check legroom, recline, and amenities.</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">🍿</div>
              <h3 className="font-bold">Premium Amenities</h3>
              <p className="text-sm text-muted-foreground">Browse snacks, wifi speeds, and entertainment.</p>
            </div>
          </div>
        )}
      </section>

      <SeatSelectionModal
        flight={selectedFlight}
        onClose={() => setSelectedFlight(null)}
      />
    </main>
  );
}
