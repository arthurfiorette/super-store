/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SessionData } from './SessionData';
import type { SessionSettings } from './SessionSettings';

export type channel_reset = {
  data: SessionData;
  settings: SessionSettings;
  _id: string;
  provider: string;
  lastReset: string;
  channel: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
