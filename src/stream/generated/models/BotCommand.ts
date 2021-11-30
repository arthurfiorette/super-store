/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';

export type BotCommand = {
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
  _id?: string;
  regex: string;
  reply: string;
  command: string;
  channel: string;
  createdAt?: string;
  updatedAt?: string;
};
