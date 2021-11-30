/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';
import type { RaffleMessages } from './RaffleMessages';

export type Roulette = {
  cooldown: Cooldown;
  messages: RaffleMessages;
  enabled: boolean;
  luck: number;
  minAmount: number;
};
