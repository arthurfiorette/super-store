/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Animation } from './Animation';
import type { Audio } from './Audio';
import type { Css } from './Css';
import type { Image } from './Image';
import type { Listeners } from './Listeners';
import type { Text } from './Text';
import type { Variables } from './Variables';
import type { Video } from './Video';

export type Widget = {
  id: number;
  type: string;
  visible: boolean;
  locked: boolean;
  listeners: Listeners;
  css: Css;
  text: Text;
  image: Image;
  video: Video;
  audio: Audio;
  animation: Animation;
  variables: Variables;
  provider: string;
  staffOnly: boolean;
  version?: number;
};
