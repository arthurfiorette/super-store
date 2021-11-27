/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Profile } from './Profile';
import type { ProviderTotals } from './ProviderTotals';
import type { User } from './User';

export type LinkedChannels = {
    profile: Profile;
    provider: string;
    suspended: boolean;
    nullChannel: boolean;
    providerEmails: Array<string>;
    lastJWTToken: string | null;
    _id: string;
    email: string;
    avatar: string;
    verified: boolean;
    username: string;
    alias: string;
    displayName: string;
    providerId: string;
    accessToken: string;
    apiToken: string;
    isPartner: boolean;
    broadcasterType: string;
    users: Array<User>;
    ab: any;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    country: string;
    providerTotals: ProviderTotals;
    features: any;
    geo: string;
}
