/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Moderator } from './Moderator';
import type { Profile } from './Profile';

export type Channel1 = {
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
    isPartner: boolean;
    broadcasterType: string;
    ab: Array<string>;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    country: string;
    role: string;
    moderators: Array<Moderator>;
}
