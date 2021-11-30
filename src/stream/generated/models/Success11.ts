/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Offline } from './Offline';
import type { Online } from './Online';

export type Success11 = {
  online: Online;
  offline: Offline;
  enabled: boolean;
  chatLines: number;
  _id: string;
  channel: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};
