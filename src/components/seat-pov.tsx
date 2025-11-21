"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Seat, Flight } from "@/lib/mock-data";
import { X, MapPin, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlightPath } from "@/components/flight-path";

interface SeatPOVProps {
    seat: Seat | null;
    flight: Flight | null;
    onClose: () => void;
}

export function SeatPOV({ seat, flight, onClose }: SeatPOVProps) {
    if (!seat || !flight) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    {/* Visual View Section */}
                    <div className="flex-1 relative bg-sky-300 dark:bg-sky-900 min-h-[300px] md:min-h-[500px] overflow-hidden group">
                        {/* If we have a seat interior image, show split view */}
                        {seat && flight?.aircraft?.seatImages?.[seat.type] ? (
                            <div className="absolute inset-0 flex">
                                {/* Window View (Left) */}
                                <div className="w-1/2 relative h-full border-r-4 border-gray-800 overflow-hidden bg-sky-300">
                                    {/* Clouds Layer 1 */}
                                    <motion.div
                                        animate={{ x: [-100, -1000] }}
                                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                        className="absolute top-1/2 left-0 w-[2000px] h-64 bg-white/40 blur-xl rounded-full"
                                    />
                                    {/* Clouds Layer 2 */}
                                    <motion.div
                                        animate={{ x: [-200, -1200] }}
                                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                        className="absolute top-1/3 left-0 w-[2000px] h-48 bg-white/60 blur-2xl rounded-full"
                                    />

                                    {/* Wing (Simple SVG Shape) */}
                                    <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gray-300 transform skew-x-12 origin-bottom-right shadow-2xl z-10" />
                                    <div className="absolute bottom-10 right-10 w-32 h-10 bg-gray-400 rounded-full z-20" /> {/* Engine */}

                                    <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md z-30">
                                        Window View
                                    </div>
                                </div>

                                {/* Seat Interior View (Right) */}
                                <div className="w-1/2 relative h-full bg-gray-900">
                                    <img
                                        src={flight.aircraft.seatImages[seat.type]}
                                        alt={`${seat.type} Seat View`}
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <h3 className="text-white text-xl font-bold capitalize">{seat.type} Class Experience</h3>
                                        <p className="text-white/80 text-sm mt-1">Actual seat configuration on this aircraft.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Standard Window View (Full Screen) */
                            <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200 dark:from-slate-900 dark:to-slate-800">
                                <motion.div
                                    animate={{ x: [0, -100, 0] }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                    className="absolute top-20 left-0 opacity-50"
                                >
                                    <Cloud className="h-32 w-32 text-white blur-xl" />
                                </motion.div>
                                <motion.div
                                    animate={{ x: [0, -150, 0] }}
                                    transition={{ repeat: Infinity, duration: 25, ease: "linear", delay: 2 }}
                                    className="absolute top-40 right-20 opacity-30"
                                >
                                    <Cloud className="h-48 w-48 text-white blur-2xl" />
                                </motion.div>

                                {/* Wing View (only for window seats) */}
                                {(seat.col === 'A' || seat.col === 'F' || seat.col === 'K' || seat.col === 'L') && (
                                    <div className="absolute bottom-0 right-0 w-2/3 h-1/3 bg-slate-200 dark:bg-slate-700 transform -skew-x-12 translate-y-10 shadow-2xl border-t border-white/20">
                                        <div className="absolute top-1/2 left-10 w-20 h-20 bg-slate-300 dark:bg-slate-600 rounded-full blur-sm"></div>
                                    </div>
                                )}

                                <div className="absolute bottom-8 left-8 text-white drop-shadow-md">
                                    <h3 className="text-2xl font-bold">Seat {seat.id} View</h3>
                                    <p className="text-sm opacity-90">{seat.viewDescription}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="w-full md:w-80 bg-background p-6 border-l border-border overflow-y-auto">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Seat Details</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span>Class</span>
                                        <span className="font-semibold capitalize">{seat.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span>Price</span>
                                        <span className="font-semibold text-primary">${seat.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span>Status</span>
                                        <span className={seat.isOccupied ? "text-red-500" : "text-green-500"}>
                                            {seat.isOccupied ? "Occupied" : "Available"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Live Flight Path</h4>
                                <div className="bg-slate-900 rounded-lg relative overflow-hidden h-48 border border-slate-800">
                                    <FlightPath
                                        origin={flight.origin}
                                        destination={flight.destination}
                                        progress={0.4}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                    <span>{flight.origin}</span>
                                    <span>{flight.destination}</span>
                                </div>
                            </div>

                            {!seat.isOccupied && (
                                <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                                    Select This Seat
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
