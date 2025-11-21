"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flight } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plane, Clock, ArrowRight } from "lucide-react";
import { AmenitiesList } from "./amenities-list";
import { cn } from "@/lib/utils";

interface FlightCardProps {
    flight: Flight;
    onViewSeats: (flight: Flight) => void;
}

export function FlightCard({ flight, onViewSeats }: FlightCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
        >
            <Card className="overflow-hidden border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                    {/* Main Flight Info Row */}
                    <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Plane className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{flight.airline}</h3>
                                <p className="text-sm text-muted-foreground">{flight.flightNumber} • {flight.aircraft.model}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 flex-1 justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{flight.departureTime}</div>
                                <div className="text-sm text-muted-foreground">{flight.origin}</div>
                                {flight.departureTimezone && <div className="text-xs text-muted-foreground/60">{flight.departureTimezone.split('/')[1].replace('_', ' ')}</div>}
                            </div>
                            <div className="flex flex-col items-center px-4">
                                <div className="text-xs text-muted-foreground mb-1">{flight.status}</div>
                                <div className="w-24 h-px bg-border relative">
                                    <Plane className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                                <div className="text-sm text-muted-foreground">{flight.destination}</div>
                                {flight.arrivalTimezone && <div className="text-xs text-muted-foreground/60">{flight.arrivalTimezone.split('/')[1].replace('_', ' ')}</div>}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 flex-1 justify-end">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">${flight.price}</p>
                                <p className="text-xs text-muted-foreground">per person</p>
                            </div>
                            <Button
                                onClick={() => setIsExpanded(!isExpanded)}
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </Button>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t bg-muted/30"
                            >
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Plane className="h-4 w-4" />
                                            Aircraft Details
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div className="p-3 rounded-lg bg-background/50">
                                                <span className="text-muted-foreground block text-xs">Model</span>
                                                <span className="font-medium">{flight.aircraft.model}</span>
                                            </div>
                                            <div className="p-3 rounded-lg bg-background/50">
                                                <span className="text-muted-foreground block text-xs">Manufacturer</span>
                                                <span className="font-medium">{flight.aircraft.manufacturer}</span>
                                            </div>
                                            <div className="p-3 rounded-lg bg-background/50">
                                                <span className="text-muted-foreground block text-xs">Capacity</span>
                                                <span className="font-medium">{flight.aircraft.capacity} Seats</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Onboard Amenities</h4>
                                        <AmenitiesList amenities={flight.aircraft.amenities} />

                                        {/* Specific Snacks Highlight */}
                                        {flight.aircraft.amenities.some(a => a.id === 'snacks' || a.id === 'stroopwafel' || a.id === 'tapas' || a.id === 'quinoa' || a.image) && (
                                            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                                                <h5 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                                                    <span className="text-lg">🍪</span> Featured Onboard Experience
                                                </h5>

                                                {/* Snack Images Gallery */}
                                                <div className="flex gap-4 overflow-x-auto pb-2 mb-2">
                                                    {flight.aircraft.amenities
                                                        .filter(a => a.image)
                                                        .map((a, i) => (
                                                            <div key={i} className="flex-shrink-0 group relative">
                                                                <div className="h-24 w-24 rounded-md overflow-hidden border border-amber-200 dark:border-amber-800 shadow-sm">
                                                                    <img
                                                                        src={a.image}
                                                                        alt={a.name}
                                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                    />
                                                                </div>
                                                                <span className="text-[10px] font-medium text-amber-900 dark:text-amber-100 mt-1 block text-center truncate max-w-[96px]">
                                                                    {a.name}
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {flight.aircraft.amenities
                                                        .filter(a => a.items && a.items.length > 0)
                                                        .flatMap(a => a.items)
                                                        .map((item, i) => (
                                                            <span key={i} className="text-xs font-medium px-2 py-1 bg-white dark:bg-black/40 rounded-md border border-amber-200 dark:border-amber-800 shadow-sm">
                                                                {item}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={() => onViewSeats(flight)}
                                            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group"
                                        >
                                            View Seats & Experience
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
}
