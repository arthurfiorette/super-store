/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Voteskip } from './Voteskip';

export type Songrequest = {
  voteskip: Voteskip;
  enabled: boolean;
  moderation: boolean;
  minUserLevel: number;
  cost: number;
  subscriberDiscount: number;
  exemptUserLevel: number;
};
