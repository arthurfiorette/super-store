/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Multi } from './Multi';
import type { Single } from './Single';

export type Raffle = {
    single: Single;
    multi: Multi;
    enabled: boolean;
}
