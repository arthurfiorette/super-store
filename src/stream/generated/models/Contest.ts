/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Option } from './Option';

export type Contest = {
  botResponses: boolean;
  totalAmount: number;
  totalUsers: number;
  _id: string;
  title: string;
  minBet: number;
  maxBet: number;
  duration: number;
  options: Array<Option>;
  channel: string;
  state: string;
  createdAt: string;
  updatedAt: string;
};
