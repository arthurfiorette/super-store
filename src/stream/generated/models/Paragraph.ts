/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timeout } from './Timeout';
import type { TimeoutSettings } from './TimeoutSettings';

export type Paragraph = {
    timeout: Timeout;
    settings: TimeoutSettings;
    enabled: boolean;
    exclude: number;
}
