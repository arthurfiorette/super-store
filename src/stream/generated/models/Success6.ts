/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Cooldown } from './Cooldown';

export type Success6 = {
  commandId: string;
  command: string;
  accessLevel: number;
  enabled: boolean;
  enabledOnline: boolean;
  enabledOffline: boolean;
  moduleId: string;
  cost: number;
  cooldown: Cooldown;
  aliases: Array<string>;
  regex: string;
  description: string;
  subCommands?: Array<string>;
  moduleEnabled?: boolean;
};
