/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';
import type { SlotsMessages } from './SlotsMessages';

export type Slotmachine = {
  cooldown: Cooldown;
  messages: SlotsMessages;
  enabled: boolean;
  returnAmount: number;
  minAmount: number;
  emotes: Array<string>;
};
