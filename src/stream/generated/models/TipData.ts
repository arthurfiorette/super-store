/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Donation } from './Donation';

export type TipData = {
  donation: Donation;
  provider: string;
  status: string;
  deleted: boolean;
  _id: string;
  channel: string;
  transactionId: string;
  createdAt: string;
  approved: string;
  updatedAt: string;
};
