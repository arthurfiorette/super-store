/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Banphrases } from './Banphrases';
import type { Caps } from './Caps';
import type { Emotes } from './Emotes';
import type { Links } from './Links';
import type { Paragraph } from './Paragraph';
import type { Symbols } from './Symbols';

export type BotFilters = {
    caps: Caps;
    links: Links;
    banphrases: Banphrases;
    emotes: Emotes;
    symbols: Symbols;
    paragraph: Paragraph;
}
