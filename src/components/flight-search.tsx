"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FlightSearchProps {
    onSearch: (mode: 'book' | 'track', criteria: {
        date?: string;
        airline?: string;
        origin?: string;
        destination?: string;
        flightNumber?: string;
    }) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
    const [mode, setMode] = useState<'book' | 'track'>('book');
    const [date, setDate] = useState("");
    const [origin, setOrigin] = useState("EWR");
    const [destination, setDestination] = useState("LHR");
    const [airline, setAirline] = useState("");
    const [flightNumber, setFlightNumber] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(mode, { date, airline, origin, destination, flightNumber });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="flex justify-center mb-6">
                <div className="bg-muted/50 p-1 rounded-full inline-flex">
                    <button
                        onClick={() => setMode('book')}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                            mode === 'book' ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"
                        )}
                    >
                        Book Flight
                    </button>
                    <button
                        onClick={() => setMode('track')}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                            mode === 'track' ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"
                        )}
                    >
                        Track Flight
                    </button>
                </div>
            </div>

            <form onSubmit={handleSearch} className="glass-card p-6 flex flex-col md:flex-row gap-4 items-end flex-wrap">
                {mode === 'book' ? (
                    <>
                        <div className="flex-1 min-w-[200px] space-y-2">
                            <label className="text-sm font-medium ml-1">From</label>
                            <div className="relative">
                                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-45" />
                                <Input
                                    type="text"
                                    placeholder="Origin (e.g. JFK)"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-w-[200px] space-y-2">
                            <label className="text-sm font-medium ml-1">To</label>
                            <div className="relative">
                                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-45" />
                                <Input
                                    type="text"
                                    placeholder="Destination (e.g. LHR)"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-w-[200px] space-y-2">
                            <label className="text-sm font-medium ml-1">Travel Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-w-[200px] space-y-2">
                            <label className="text-sm font-medium ml-1">Airline (Optional)</label>
                            <div className="relative">
                                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="e.g. SkyLux"
                                    value={airline}
                                    onChange={(e) => setAirline(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 min-w-[300px] space-y-2">
                        <label className="text-sm font-medium ml-1">Flight Number</label>
                        <div className="relative">
                            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="e.g. SL-101"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>
                )}

                <Button type="submit" size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Search className="mr-2 h-4 w-4" />
                    {mode === 'book' ? 'Search Flights' : 'Track Flight'}
                </Button>
            </form>
        </motion.div>
    );
}

