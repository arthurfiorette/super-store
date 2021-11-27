/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Giveaway = {
    subscriberLuck: number;
    subscriberOnly: boolean;
    totalAmount: number;
    totalUsers: number;
    botResponses: boolean;
    _id: string;
    winners: Array<string>;
    channel: string;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    state?: string;
    endedAt?: string;
}
