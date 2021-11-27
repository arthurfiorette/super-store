/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BackupPlaylist } from './BackupPlaylist';
import type { Bot1 } from './Bot1';
import type { Limits } from './Limits';
import type { Player } from './Player';
import type { Tips } from './Tips';
import type { Youtube } from './Youtube';

export type MediaRequestData = {
    player: Player;
    limits: Limits;
    backupPlaylist: BackupPlaylist;
    bot: Bot1;
    tips: Tips;
    youtube: Youtube;
    enabled: boolean;
    mode: string;
    moderation: boolean;
    _id: string;
    bannedUsers: Array<string>;
}
