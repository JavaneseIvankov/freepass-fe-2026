/**
 * Canteens Page
 * Display list of all canteens with search and filtering
 */

"use client";

import { useRouter } from "next/navigation";
import { CanteenList, CanteenSearch } from "@/components/canteen";
import { CanteenListSkeleton } from "@/components/canteen/canteen-list-skeleton";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useCanteens } from "@/hooks/use-canteens";
import { useCanteenSearch } from "@/hooks/use-canteen-search";

export default function CanteensPage() {
  const router = useRouter();
  const { data: canteens, isLoading, error } = useCanteens();
  
  const { searchQuery, setSearchQuery, filteredCanteens, hasActiveSearch } =
    useCanteenSearch({
      canteens: canteens || [],
    });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Canteens</h1>
        <CanteenListSkeleton count={6} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Canteens</h1>
        <Alert variant="destructive">
          <p className="font-semibold">Failed to load canteens</p>
          <p className="text-sm mt-1">{error.message}</p>
        </Alert>
      </div>
    );
  }

  // Empty/Success state handled by CanteenList component
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Canteens</h1>
          {canteens && canteens.length > 0 && (
            <Badge variant="secondary">
              {hasActiveSearch
                ? `${filteredCanteens.length} of ${canteens.length}`
                : `${canteens.length} canteens`}
            </Badge>
          )}
        </div>

        <CanteenSearch
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, location, or description..."
        />
      </div>

      <CanteenList
        canteens={filteredCanteens}
        onCanteenClick={(canteen) => router.push(`/canteens/${canteen.id}`)}
      />
    </div>
  );
}
