import io, { Socket } from 'socket.io-client';
import { SE_WS_URL } from '../core/env';
import { Service } from '../core/services';
import { Application } from '../core/index';
import { SE_USER_JWT } from '../core/env';
import { AuthenticatedEvent, UpdateEvent } from './types';
import { UnauthorizedEvent } from './types/auth';

export class SESocketListener extends Service {
  socket: typeof Socket;

  constructor(core: Application) {
    super(core);

    this.socket = io(SE_WS_URL, {
      // autoConnect: false,
      transports: ['websocket']
    });

    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
    this.socket.on('event:update', this.handleEventUpdate);

    // TODO: Check if any other event are needed
    this.socket.on('event:test', (data: any) => console.debug('event:test', data));
    this.socket.on('event', (data: any) => console.debug('event', data));
    this.socket.on('event:update', (data: any) => console.debug('event:update', data));
    this.socket.on('event:reset', (data: any) => console.debug('event:reset', data));
  }

  async enable() {
    this.socket.connect();
  }

  async disable() {
    this.socket.disconnect();
  }

  private onConnect = () => {
    const {
      core: { logger },
      socket
    } = this;
    logger.debug('SE Socket connected');

    // Request authorized access
    socket.emit('authenticate', {
      method: 'jwt',
      token: SE_USER_JWT
    });

    // Handle authenticated and unauthorized responses
    socket.once('authenticated', ({ channelId }: AuthenticatedEvent) => {
      logger.info(`SE Socket authenticated on channel: ${channelId}`);
    });
    socket.once('unauthorized', ({ message }: UnauthorizedEvent) => {
      logger.error(`SE Socket connection attempt was unauthorized: ${message}`);
    });
  };

  private onDisconnect = () => {
    this.core.logger.info('SE Socket was disconnected');
  };

  private handleEventUpdate = (event: UpdateEvent) => {
    if (event.name === 'redemption-latest') {
      const { name, item } = event.data;
      this.core.logger.info(`${name} Redeemed item ${item}.`);
    }
  };
}
