/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timeout } from './Timeout';

export type Links = {
  timeout: Timeout;
  enabled: boolean;
  exclude: number;
  whitelist: Array<string>;
  blacklist: Array<string>;
};
