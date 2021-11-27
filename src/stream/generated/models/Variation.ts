/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SubVariationSettings } from './SubVariationSettings';

export type Variation = {
    name: string;
    type: string;
    condition?: string;
    requirement?: number;
    settings: SubVariationSettings;
}
