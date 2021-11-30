/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SubscriberEvent } from './SubscriberEvent';

export type Success = {
  data: SubscriberEvent;
  provider: string;
  _id: string;
  type: string;
  channel: string;
  createdAt: string;
};
