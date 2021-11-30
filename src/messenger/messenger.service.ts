import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'tmi.js';
import { PendingList } from 'typed-core';
import { Configuration } from '../common/configuration';

type Events = {
  connected: [void, void];
  disconnected: [void, void];
};

@Injectable()
export class MessengerService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  readonly client: Client;

  readonly pending = new PendingList<Events>();

  constructor(private readonly config: ConfigService<Configuration>) {
    const username = this.config.get('twitchBotName', { infer: true })!;
    const password = this.config.get('twitchOAuth', { infer: true })!;

    this.client = new Client({
      channels: [],
      identity: {
        username,
        password
      },
      connection: {
        reconnect: true,
        secure: true
      }
    });

    this.client.on('connected', this.onConnect);
    this.client.on('logon', this.onLogon);
    this.client.on('disconnected', this.onDisconnect);
  }

  readonly onModuleInit = async () => {
    await this.client.connect();
    await this.pending.get('connected');
  };

  readonly onModuleDestroy = async () => {
    await this.client.disconnect();
    await this.pending.get('disconnected');
  };

  private onConnect = (address: string, port: number) => {
    this.logger.log(`Connected to twitch at ${address}:${port}`);
  };

  private onLogon = () => {
    this.logger.log('Logged in to twitch');
    this.pending.resolve('connected', undefined);
  };

  private onDisconnect = (reason: string) => {
    this.logger.log(`Disconnected from twitch ${reason}`);
    this.pending.resolve('disconnected', undefined);
  };
}
