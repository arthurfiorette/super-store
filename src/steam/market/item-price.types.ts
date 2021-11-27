/**
 * The response from steam priceOverview API.
 */
export type ItemPrice = SuccessfulItemPrice | UnsuccessfulItemPrice;

export type SuccessfulItemPrice = {
  success: true;
  lowest_price: number;
  median_price: number;
  /**
   * Return the highest price between lowest and median
   *
   * **NOT present in the api response**
   */
  highest_price: number;
};

export type UnsuccessfulItemPrice = {
  success: false;
};
