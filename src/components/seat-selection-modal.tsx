"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flight } from "@/lib/mock-data";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeatMap } from "./seat-map";

interface SeatSelectionModalProps {
    flight: Flight | null;
    onClose: () => void;
}

export function SeatSelectionModal({ flight, onClose }: SeatSelectionModalProps) {
    return (
        <AnimatePresence>
            {flight && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-background w-full max-w-4xl max-h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center bg-muted/30">
                            <div>
                                <h2 className="text-2xl font-bold">Select Your Seat</h2>
                                <p className="text-muted-foreground">
                                    {flight.airline} • {flight.flightNumber} • {flight.aircraft.model}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950/50">
                            <SeatMap flight={flight} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
