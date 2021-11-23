export type SteamItem = {
  market_hash_name: string;
  name: string;
  market_name: string;
  appid: number;
  amount: number;
  marketable: boolean;
  tradeable: boolean;
  commodity: boolean;
};

export type ItemPrice = {
  success: boolean;
  lowest_price: number;
  median_price?: number;
};

/**
 * @link https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/wiki/TradeOffer#properties
 */
export type TradeOffer = {
  isGlitched: () => boolean;
  accept: (err?: (err: null | Error) => void) => void;
  decline: (err?: (err: null | Error) => void) => void;
  partner: Partner;
  itemsToGive: SteamItem[];
  itemsToReceive: SteamItem[];
  message: string;
  isOurOffer: boolean;
  id: string;
};

export type Partner = {
  getSteamID64(): string;
};
