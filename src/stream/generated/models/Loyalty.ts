/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bonuses } from './Bonuses';

export type Loyalty = {
    bonuses: Bonuses;
    name: string;
    enabled: boolean;
    amount: number;
    subscriberMultiplier: number;
    ignored: Array<string>;
}
