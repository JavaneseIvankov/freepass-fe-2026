/**
 * Review RPC - Transport layer for review data
 * Currently uses mock implementation
 */

import { getCanteenReviewsMock } from "./_mock/review.mock";
// import { getCanteenReviewsReal } from "./_real/review.real";

/**
 * Get reviews for a canteen
 * @param canteenId - The canteen ID
 * @param limit - Optional limit for number of reviews
 */
export async function getCanteenReviews(canteenId: string, limit?: number) {
  return getCanteenReviewsMock(canteenId, limit);
  // return getCanteenReviewsReal(canteenId, limit); // Uncomment when backend is ready
}
