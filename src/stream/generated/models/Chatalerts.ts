/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CheerBot } from './CheerBot';
import type { FollowBot } from './FollowBot';
import type { HostBot } from './HostBot';
import type { RaidBot } from './RaidBot';
import type { RedemptionBot } from './RedemptionBot';
import type { SubscriberBot } from './SubscriberBot';
import type { TipBot } from './TipBot';

export type Chatalerts = {
  follow: FollowBot;
  tip: TipBot;
  host: HostBot;
  subscriber: SubscriberBot;
  cheer: CheerBot;
  redemption: RedemptionBot;
  raid: RaidBot;
  enabled: boolean;
  delay: number;
};
