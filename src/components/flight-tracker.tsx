"use client";

import { motion } from "framer-motion";
import { Flight } from "@/lib/mock-data";
import { Plane, Navigation, Clock, MapPin, Wifi, Activity } from "lucide-react";
import { AIRPORT_COORDINATES } from "@/lib/airport-coords";

interface FlightTrackerProps {
    flight: Flight;
}

export function FlightTracker({ flight }: FlightTrackerProps) {
    // Calculate progress based on mock data or default to 50%
    const progress = flight.progress || 50;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            {/* Status Header */}
            <div className="glass-card p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-black tracking-tight">{flight.airline} {flight.flightNumber}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${flight.status === 'On Time' ? 'bg-green-500/20 text-green-600' :
                            flight.status === 'Delayed' ? 'bg-red-500/20 text-red-600' :
                                flight.status === 'In Air' ? 'bg-blue-500/20 text-blue-600' :
                                    flight.status === 'Landed' ? 'bg-slate-500/20 text-slate-600' :
                                        'bg-gray-500/20 text-gray-600'
                            }`}>
                            {flight.status || 'SCHEDULED'}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Plane className="w-4 h-4" />
                            {flight.aircraft.model}
                        </span>
                        {flight.registration && (
                            <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs border">
                                {flight.registration}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-8 text-right">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Departure</div>
                        <div className="text-2xl font-bold">{flight.origin}</div>
                        {flight.departureTimezone && <div className="text-xs text-muted-foreground mb-1">{flight.departureTimezone.split('/')[1].replace('_', ' ')}</div>}
                        {flight.terminal && <div className="text-xs text-muted-foreground">Term {flight.terminal} • Gate {flight.gate || 'TBD'}</div>}
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-muted-foreground">⟶</span>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Arrival</div>
                        <div className="text-2xl font-bold">{flight.destination}</div>
                        {flight.arrivalTimezone && <div className="text-xs text-muted-foreground mb-1">{flight.arrivalTimezone.split('/')[1].replace('_', ' ')}</div>}
                        {flight.baggageClaim ? (
                            <div className="text-xs text-muted-foreground">Bag Claim {flight.baggageClaim}</div>
                        ) : (
                            <div className="text-xs text-muted-foreground">Term TBD</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Map Visualization */}
            <div className="glass-card p-1 relative overflow-hidden h-[450px] bg-slate-950 rounded-3xl border-slate-800">
                {/* World Map Background (Simplified) */}
                <div className="absolute inset-0 opacity-40">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                        <rect width="100%" height="100%" fill="#0f172a" />
                        {/* Simplified Land Masses - Abstract representation */}
                        <path d="M50,180 Q150,100 300,150 T600,180" fill="none" stroke="#1e293b" strokeWidth="120" strokeLinecap="round" className="opacity-50" />

                        {/* Grid lines */}
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" className="opacity-5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Flight Path */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" className="overflow-visible">
                        {(() => {
                            // Dynamic Path Calculation
                            const getCoords = (code: string) => {
                                // Simple Mercator-ish projection for the SVG viewbox (800x400)
                                // Longitude: -180 to 180 -> 0 to 800
                                // Latitude: -90 to 90 -> 400 to 0 (inverted y)
                                const coords = AIRPORT_COORDINATES[code.toUpperCase()] || { lat: 0, long: 0 };

                                // If unknown (0,0), try to guess based on typical US/EU routes or default
                                if (coords.lat === 0 && coords.long === 0) {
                                    if (code === 'LHR') return { x: 420, y: 100 }; // London approx
                                    return { x: 100, y: 200 }; // Default
                                }

                                const x = (coords.long + 180) * (800 / 360);
                                const y = (90 - coords.lat) * (400 / 180);
                                return { x, y };
                            };

                            const start = getCoords(flight.origin);
                            const end = getCoords(flight.destination);

                            // Calculate control point for curve (arc upwards)
                            const midX = (start.x + end.x) / 2;
                            const midY = (start.y + end.y) / 2 - 50; // Arc height

                            const pathD = `M${start.x},${start.y} Q${midX},${midY} ${end.x},${end.y}`;

                            return (
                                <>
                                    {/* Future Path (Dashed) */}
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke="#334155"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray="8 8"
                                    />

                                    {/* Past Path (Solid - Masked by progress) */}
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        pathLength="100"
                                        strokeDasharray="100"
                                        strokeDashoffset={100 - progress}
                                        className="transition-all duration-1000 ease-linear"
                                    />

                                    {/* Origin Dot */}
                                    <circle cx={start.x} cy={start.y} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                                    <text x={start.x} y={start.y + 25} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{flight.origin}</text>

                                    {/* Destination Dot */}
                                    <circle cx={end.x} cy={end.y} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                                    <text x={end.x} y={end.y + 25} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{flight.destination}</text>

                                    {/* Animated Plane */}
                                    <motion.g
                                        initial={{ offsetDistance: "0%" }}
                                        animate={{ offsetDistance: `${progress}%` }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        style={{ offsetPath: `path('${pathD}')` } as any}
                                    >
                                        <g transform="rotate(90) translate(-16, -16)">
                                            <Plane className="w-8 h-8 text-white fill-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                                        </g>
                                    </motion.g>
                                </>
                            );
                        })()}
                    </svg>
                </div>

                {/* Live Badge */}
                {flight.status === 'In Air' && (
                    <div className="absolute top-6 right-6 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-md animate-pulse flex items-center gap-2 shadow-lg shadow-red-900/50">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE TRACKING
                    </div>
                )}

                {/* Telemetry Overlay */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-4 gap-4">
                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Altitude</div>
                        <div className="text-xl font-mono font-bold text-white">
                            {flight.currentAltitude ? `${(flight.currentAltitude / 1000).toFixed(1)}k` : '--'} <span className="text-xs text-slate-500">ft</span>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Speed</div>
                        <div className="text-xl font-mono font-bold text-white">
                            {flight.currentSpeed || '--'} <span className="text-xs text-slate-500">mph</span>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Distance</div>
                        <div className="text-xl font-mono font-bold text-white">
                            {flight.distanceRemaining || '--'} <span className="text-xs text-slate-500">mi</span>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Arrival</div>
                        <div className="text-xl font-mono font-bold text-white">
                            {flight.timeRemaining || '--:--'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
