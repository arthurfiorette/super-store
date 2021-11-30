/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';

export type Eightball = {
  cooldown: Cooldown;
  enabled: boolean;
  messages: Array<string>;
  emotes: Array<string>;
};
