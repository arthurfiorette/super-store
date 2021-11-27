/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Settings } from './Settings';
import type { Timeout } from './Timeout';

export type Caps = {
    timeout: Timeout;
    settings: Settings;
    enabled: boolean;
    exclude: number;
}
