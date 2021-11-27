/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Overlay } from './Overlay';

export type ThemesList = {
    published: boolean;
    provider: string;
    type: string;
    size: string;
    totalUsers: number;
    mobile: boolean;
    _id: string;
    updatedAt: string;
    createdAt: string;
    title: string;
    author: string;
    game: string;
    thumbnail: string;
    overlays: Array<Overlay>;
    rating: number;
    new: boolean;
}
