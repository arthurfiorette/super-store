/**
 * The response from steam priceOverview API.
 */
export type ItemPrice = {
  success: boolean;
  lowest_price: number;
  median_price?: number;
};
