/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';
import type { Messages5 } from './Messages5';

export type Duel = {
  cooldown: Cooldown;
  messages: Messages5;
  enabled: boolean;
};
