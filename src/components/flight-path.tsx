"use client";

import { useEffect, useRef } from "react";

interface FlightPathProps {
    origin: string;
    destination: string;
    progress?: number; // 0 to 1
}

// Approximate coordinates for major airports
const airportCoords: Record<string, { lat: number; lon: number }> = {
    JFK: { lat: 40.6413, lon: -73.7781 },
    LHR: { lat: 51.4700, lon: -0.4543 },
    EWR: { lat: 40.6895, lon: -74.1745 },
    SFO: { lat: 37.6213, lon: -122.3790 },
    DXB: { lat: 25.2532, lon: 55.3657 },
    NRT: { lat: 35.7719, lon: 140.3929 },
    LAX: { lat: 33.9416, lon: -118.4085 },
    CDG: { lat: 49.0097, lon: 2.5479 },
};

export function FlightPath({ origin, destination, progress = 0.3 }: FlightPathProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background (Map placeholder)
        ctx.fillStyle = "#0f172a"; // Slate 900
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines (simulating globe)
        ctx.strokeStyle = "#1e293b"; // Slate 800
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 50) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let i = 0; i < height; i += 50) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        // Get coordinates
        const start = airportCoords[origin] || { lat: 40, lon: -74 }; // Default to JFK-ish
        const end = airportCoords[destination] || { lat: 51, lon: 0 }; // Default to LHR-ish

        // Simple projection (Equirectangular approximation for demo)
        // Map lon -180..180 to 0..width
        // Map lat 90..-90 to 0..height
        const project = (lat: number, lon: number) => {
            const x = ((lon + 180) / 360) * width;
            const y = ((90 - lat) / 180) * height;
            return { x, y };
        };

        const p1 = project(start.lat, start.lon);
        const p2 = project(end.lat, end.lon);

        // Draw Path (Quadratic curve to simulate Great Circle arch)
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);

        // Control point for curve (midpoint + offset)
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 - 50; // Curve upwards

        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.strokeStyle = "#38bdf8"; // Sky 400
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.stroke();

        // Draw Origin
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px sans-serif";
        ctx.fillText(origin, p1.x + 8, p1.y + 4);

        // Draw Destination
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.fillText(destination, p2.x + 8, p2.y + 4);

        // Draw Plane Icon at progress
        // Calculate point on curve at t=progress
        const t = progress;
        const x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
        const y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;

        ctx.save();
        ctx.translate(x, y);
        // Calculate rotation angle (tangent)
        // Derivative of quadratic bezier: 2(1-t)(P1-P0) + 2t(P2-P1)
        // Simplified: 2(1-t)(mid-p1) + 2t(p2-mid)
        const tx = 2 * (1 - t) * (midX - p1.x) + 2 * t * (p2.x - midX);
        const ty = 2 * (1 - t) * (midY - p1.y) + 2 * t * (p2.y - midY);
        const angle = Math.atan2(ty, tx);
        ctx.rotate(angle);

        // Plane shape
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-5, 5);
        ctx.lineTo(-5, -5);
        ctx.closePath();
        ctx.fillStyle = "#f43f5e"; // Rose 500
        ctx.fill();
        ctx.restore();

    }, [origin, destination, progress]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-inner relative">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-500">
                Live Flight Tracking
            </div>
        </div>
    );
}
