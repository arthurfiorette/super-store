/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Animation } from './Animation';
import type { Audio1 } from './Audio1';
import type { Graphics } from './Graphics';
import type { Text1 } from './Text1';
import type { Tts } from './Tts';
import type { Variation1 } from './Variation1';

export type Cheer1 = {
    enableRandomPick: boolean;
    enabled: boolean;
    duration: number;
    layout: string;
    text: Text1;
    graphics: Graphics;
    audio: Audio1;
    animation: Animation;
    variations: Array<Variation1>;
    tts: Tts;
}
