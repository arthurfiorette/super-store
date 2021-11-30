/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';

export type channelrequest = {
  cooldown: Cooldown;
  aliases: Array<string>;
  keywords: Array<string>;
  enabled: boolean;
  enabledOnline: boolean;
  enabledOffline: boolean;
  hidden: boolean;
  cost: number;
  type: string;
  accessLevel: number;
  regex: string;
  reply: string;
  command: string;
  channel: string;
};
