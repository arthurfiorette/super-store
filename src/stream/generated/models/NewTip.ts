/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User11 } from './User11';

export type NewTip = {
    user: User11;
    provider: string;
    message: string;
    amount: number;
    currency: string;
    imported: boolean;
}
