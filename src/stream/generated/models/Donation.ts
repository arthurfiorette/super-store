/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DonationUser } from './DonationUser';

export type Donation = {
  user: DonationUser;
  message: string;
  amount: number;
  currency: string;
};
