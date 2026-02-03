/**
 * CanteenCard Component (Dumb)
 * Displays a single canteen with image, name, description, rating, and location
 */

"use client";

import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Canteen } from "@/types/ui";

interface CanteenCardProps {
  canteen: Canteen;
  onClick?: () => void;
  className?: string;
}

// TODO: improve this to use link insted of onClick handldr for SSR
export function CanteenCard({ canteen, onClick, className }: CanteenCardProps) {
  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        "border-2 hover:border-primary/20",
        !canteen.isActive && "opacity-60",
        className,
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={canteen.imageUrl}
          alt={canteen.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            !canteen.isActive && "grayscale",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={canteen.isActive ? "default" : "secondary"}
            className="shadow-lg font-semibold"
          >
            {canteen.isActive ? "Open" : "Closed"}
          </Badge>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-sm">{canteen.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">
            ({canteen.totalReviews})
          </span>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <h3 className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors">
          {canteen.name}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {canteen.description}
        </p>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{canteen.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
