/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Bot = {
    enabled: boolean;
    name: string;
    joined: boolean;
    muted: boolean;
    mod: boolean;
    allowCustomName: boolean;
    language: string;
    channel: string;
    logs: Array<string>;
}
