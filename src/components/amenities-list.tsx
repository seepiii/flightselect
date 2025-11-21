import { Amenity } from "@/lib/mock-data";
import { Wifi, Tv, Coffee, Zap, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"; // We need to create this or use simple title for now if not available. I'll use simple div with title for now to save time or create tooltip component.
// Actually, let's just render them nicely with a hover effect.

const iconMap: Record<string, any> = {
    Wifi,
    Tv,
    Coffee,
    Zap,
};

interface AmenitiesListProps {
    amenities: Amenity[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
    return (
        <div className="flex flex-wrap gap-4 mt-4">
            {amenities.map((amenity) => {
                const Icon = iconMap[amenity.icon] || Info;
                return (
                    <div key={amenity.id} className="group relative flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-full border border-white/10 hover:bg-secondary transition-colors cursor-help">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{amenity.name}</span>

                        {/* Tooltip-like hover card */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-popover text-popover-foreground text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-border">
                            <p className="font-semibold mb-1">{amenity.description}</p>
                            {amenity.items && (
                                <ul className="list-disc list-inside text-muted-foreground">
                                    {amenity.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-b border-r border-border"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
