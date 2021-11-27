/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Profile } from './Profile';

export type SimpleChannelDetails = {
    profile: Profile;
    provider: string;
    _id: string;
    avatar: string;
    username: string;
    alias: string;
    displayName: string;
    providerId: string;
    isPartner: boolean;
    broadcasterType: string;
    inactive: boolean;
}
