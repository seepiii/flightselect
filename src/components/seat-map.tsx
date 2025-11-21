"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Seat, Flight } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { SeatPOV } from "./seat-pov";

interface SeatMapProps {
    flight: Flight;
}

export function SeatMap({ flight }: SeatMapProps) {
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

    // Group seats by row
    const rows = Array.from(new Set(flight.aircraft.seatMap.map(s => s.row))).sort((a, b) => a - b);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-border overflow-hidden relative">
                {/* Cockpit Area */}
                <div className="h-32 bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 rounded-t-[50%] mx-10 mt-[-60px] border-b border-border relative z-0"></div>

                <div className="p-8 relative z-10">
                    <div className="flex justify-between items-center mb-8 px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-primary"></div>
                            <span className="text-xs text-muted-foreground">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-slate-300 dark:bg-slate-700"></div>
                            <span className="text-xs text-muted-foreground">Occupied</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-amber-400"></div>
                            <span className="text-xs text-muted-foreground">First Class</span>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                        {rows.map((rowNum) => {
                            const rowSeats = flight.aircraft.seatMap.filter(s => s.row === rowNum);
                            // Split into left and right side (assuming single aisle for simplicity or just rendering them in order with a gap)
                            // Let's assume a gap in the middle for the aisle
                            const midPoint = Math.ceil(rowSeats.length / 2);
                            const leftSide = rowSeats.slice(0, midPoint);
                            const rightSide = rowSeats.slice(midPoint);

                            return (
                                <div key={rowNum} className="flex items-center justify-center gap-8">
                                    <div className="flex gap-2">
                                        {leftSide.map(seat => (
                                            <SeatItem key={seat.id} seat={seat} onSelect={setSelectedSeat} />
                                        ))}
                                    </div>
                                    <div className="w-8 text-center text-xs text-muted-foreground font-mono">{rowNum}</div>
                                    <div className="flex gap-2">
                                        {rightSide.map(seat => (
                                            <SeatItem key={seat.id} seat={seat} onSelect={setSelectedSeat} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <SeatPOV
                seat={selectedSeat}
                flight={flight}
                onClose={() => setSelectedSeat(null)}
            />
        </div>
    );
}

function SeatItem({ seat, onSelect }: { seat: Seat, onSelect: (s: Seat) => void }) {
    const isFirst = seat.type === 'first';
    const isBusiness = seat.type === 'business';

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(seat)}
            className={cn(
                "w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors relative group",
                seat.isOccupied
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    : isFirst
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200"
                        : isBusiness
                            ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200"
                            : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            )}
        >
            {seat.col}
            {!seat.isOccupied && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    ${seat.price}
                </div>
            )}
        </motion.button>
    );
}
