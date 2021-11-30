/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessCodes } from './AccessCodes';
import type { Alert } from './Alert';
import type { Bot2 } from './Bot2';
import type { Cooldown } from './Cooldown';
import type { Quantity1 } from './Quantity1';

export type LoyaltyItem = {
  bot: Bot2;
  cooldown: Cooldown;
  quantity: Quantity1;
  accessCodes?: AccessCodes;
  alert: Alert;
  subscriberOnly: boolean;
  userInput: Array<string>;
  _id: string;
  enabled: boolean;
  featured: boolean;
  name: string;
  description: string;
  type: string;
  cost: number;
  public: boolean;
  channel: string;
  createdAt: string;
  updatedAt: string;
};
