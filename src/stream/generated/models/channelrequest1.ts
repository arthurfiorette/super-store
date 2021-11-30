/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Offline } from './Offline';
import type { Online } from './Online';

export type channelrequest1 = {
  online: Online;
  offline: Offline;
  enabled: boolean;
  chatLines: number;
  name: string;
  message: string;
};
