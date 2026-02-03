/**
 * Canteens Page
 * Display list of all canteens with search and filtering
 */

"use client";

import { useRouter } from "next/navigation";
import { CanteenList } from "@/components/canteen";
import { CanteenListSkeleton } from "@/components/canteen/canteen-list-skeleton";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useCanteens } from "@/hooks/use-canteens";

export default function CanteensPage() {
  const router = useRouter();
  const { data: canteens, isLoading, error } = useCanteens();

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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Canteens</h1>
        {canteens && canteens.length > 0 && (
          <Badge variant="secondary">{canteens.length} canteens</Badge>
        )}
      </div>

      <CanteenList
        canteens={canteens || []}
        onCanteenClick={(canteen) => router.push(`/canteens/${canteen.id}`)}
      />
    </div>
  );
}
