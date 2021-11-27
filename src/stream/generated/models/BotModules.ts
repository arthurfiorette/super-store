/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Announcements } from './Announcements';
import type { Bingo } from './Bingo';
import type { Chatalerts } from './Chatalerts';
import type { Duel } from './Duel';
import type { Eightball } from './Eightball';
import type { Emotecombo } from './Emotecombo';
import type { Pyramid } from './Pyramid';
import type { Raffle } from './Raffle';
import type { Roulette } from './Roulette';
import type { Slotmachine } from './Slotmachine';
import type { Songrequest } from './Songrequest';
import type { Twitter } from './Twitter';

export type BotModules = {
    roulette: Roulette;
    raffle: Raffle;
    pyramid: Pyramid;
    bingo: Bingo;
    slotmachine: Slotmachine;
    duel: Duel;
    eightball: Eightball;
    emotecombo: Emotecombo;
    twitter: Twitter;
    chatalerts: Chatalerts;
    songrequest: Songrequest;
    announcements: Announcements;
}
