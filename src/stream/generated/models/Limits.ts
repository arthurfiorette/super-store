/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Users } from './Users';

export type Limits = {
  users: Users;
  queueLimit: number;
  maxDuration: number;
};
