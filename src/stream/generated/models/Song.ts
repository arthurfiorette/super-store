/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Statistics } from './Statistics';
import type { User2 } from './User2';

export type Song = {
  user: User2;
  statistics?: Statistics;
  duration: number;
  tags?: Array<string>;
  voteskips?: Array<string>;
  _id: string;
  videoId: string;
  title: string;
  channel: string;
  source: string;
};
