/**
 * Review Hooks - TanStack Query hooks for review data
 */

import { useQuery } from "@tanstack/react-query";
import { queryKeyStore } from "@/lib/query-keys";
import { getCanteenReviews } from "@/rpc/review";
import { mapReviews } from "@/types/mappers";

/**
 * Hook to fetch reviews for a canteen
 * @param canteenId - The canteen ID
 * @param limit - Optional limit for number of reviews (default: 5 for preview)
 */
export function useCanteenReviews(canteenId: string, limit?: number) {
  return useQuery({
    queryKey: queryKeyStore.review.list(canteenId, limit),
    queryFn: async () => {
      const dtos = await getCanteenReviews(canteenId, limit);
      return mapReviews(dtos);
    },
    enabled: !!canteenId,
  });
}
