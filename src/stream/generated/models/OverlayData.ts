/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OverlaySettings } from './OverlaySettings';
import type { Widget } from './Widget';

export type OverlayData = {
    settings: OverlaySettings;
    widgets?: Widget;
    type: string;
    preview: string;
    mobile: boolean;
    _id: string;
    game: string | null;
    name: string;
    channel: string;
    createdAt: string;
    updatedAt: string;
}
