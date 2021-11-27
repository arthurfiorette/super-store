/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SessionData } from './SessionData';
import type { SessionSettings } from './SessionSettings';

export type channelData = {
    data: SessionData;
    settings: SessionSettings;
    provider: string;
    lastReset: string;
    _id: string;
    channel: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
