// export type SteamItem = {
//   market_hash_name: string;
//   name: string;
//   market_name: string;
//   appid: number;
//   amount: number;
//   marketable: boolean;
//   tradeable: boolean;
//   commodity: boolean;
// };

import { ETradeOfferState } from 'steam-user';
import CEconItem from 'steamcommunity/classes/CEconItem';
import SteamId from 'steamid';

/**
 * @link https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/wiki/TradeOffer#properties
 */
export type TradeOfferEvent = {
  isGlitched: () => boolean;
  accept: (err?: (err: null | Error) => void) => void;
  decline: (err?: (err: null | Error) => void) => void;
  partner: SteamId;
  state: ETradeOfferState;
  itemsToGive: CEconItem[];
  itemsToReceive: CEconItem[];
  message: string;
  isOurOffer: boolean;
  id: string;
};
