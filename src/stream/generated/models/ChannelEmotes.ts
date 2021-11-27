/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BttvEmotes } from './BttvEmotes';
import type { FfzGlobalEmotes } from './FfzGlobalEmotes';
import type { TwitchGlobalEmotes } from './TwitchGlobalEmotes';

export type ChannelEmotes = {
    bttvChannelEmotes: BttvEmotes;
    bttvGlobalEmotes: BttvEmotes;
    ffzChannelEmotes: string | null;
    ffzGlobalEmotes: FfzGlobalEmotes;
    twitchGlobalEmotes: TwitchGlobalEmotes;
    twitchSubEmotes: string | null;
}
