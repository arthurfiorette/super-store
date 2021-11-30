import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AxiosCacheInstance } from 'axios-cache-interceptor';
import io from 'socket.io-client';
import { Configuration } from '../common/configuration';
import { Events } from '../common/events';
import { StoreStreamApi } from './api';
import { RedemptionsStreamApi } from './api/redemptions';
import { AuthenticatedEvent, StreamElementsSocket, UpdateEvent } from './socket-types';

@Injectable()
export class StreamService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  private readonly socket: StreamElementsSocket;

  readonly store: StoreStreamApi;
  readonly redemptions: RedemptionsStreamApi;

  constructor(
    private readonly config: ConfigService<Configuration>,
    @Inject('axios')
    private readonly axios: AxiosCacheInstance,
    private readonly eventEmitter: EventEmitter2
  ) {
    const seId = config.get('seUserId')!;
    const seJwt = config.get('seUserJwt')!;

    const socketUrl = config.get('seWsUrl');
    this.socket = io(socketUrl, {
      transports: ['websocket'],
      autoConnect: false
    });

    this.store = new StoreStreamApi(this.axios, seId, seJwt);
    this.redemptions = new RedemptionsStreamApi(this.axios, seId, seJwt);
  }

  public onModuleInit = () => {
    this.logger.log('Connecting to StreamElements socket');

    // Connection listeners
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);

    // Listen for redemption events
    this.socket.on('event:update', this.onEventUpdate);

    // TODO: Check if any other event are needed
    this.socket.on('event:test', (data) => this.logger.debug('event:test', data));
    this.socket.on('event', (data) => this.logger.debug('event', data));
    this.socket.on('event:update', (data) => this.logger.debug('event:update', data));
    this.socket.on('event:reset', (data) => this.logger.debug('event:reset', data));

    this.socket.connect();
  };

  public onModuleDestroy = () => {
    this.logger.log('Disconnecting to StreamElements socket');
    this.socket.disconnect();
  };

  private onConnect = () => {
    this.logger.log('Connected to StreamElements socket, authenticating');

    // Request authorized access
    this.socket.emit('authenticate', {
      method: 'jwt',
      token: this.config.get('seUserJwt')
    });

    // Listen for authentication response
    this.socket.on('authenticated', ({ channelId }: AuthenticatedEvent) => {
      this.logger.log(
        `Authenticated to StreamElements socket on channel id: ${channelId}`
      );
    });
    this.socket.on('unauthorized', ({ message }) => {
      this.logger.error(`SE Socket connection attempt was unauthorized: ${message}`);
      this.socket.disconnect();
    });
  };

  private onDisconnect = () => {
    this.logger.log('Disconnected to StreamElements socket');
  };

  private onEventUpdate = (event: UpdateEvent) => {
    switch (event.name) {
      case 'redemption-latest':
        this.eventEmitter.emit(Events.REDEMPTION_NEW, event);
        break;
    }
  };
}
