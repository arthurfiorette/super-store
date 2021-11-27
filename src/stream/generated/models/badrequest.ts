/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Detail } from './Detail';

export type badrequest = {
    statusCode: number;
    error: string;
    message: string;
    details: Array<Detail>;
}
