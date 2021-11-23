// import { Socket } from 'socket.io-client';
import { AuthenticatedEvent, UnauthorizedEvent, UpdateEvent } from './events';

type SocketEvents = {
  'event:update': UpdateEvent;
  authenticate: { method: 'jwt'; token: string };
  authenticated: AuthenticatedEvent;
  unauthorized: UnauthorizedEvent;
  connect: void;
  disconnect: void;

  // TODO: Find types
  'event:reset': any;
  'event:test': any;
  event: any;
};

export type StreamElementsSocket =
  // typeof Socket &
  {
    on: <K extends keyof SocketEvents>(event: K, fn: (data: SocketEvents[K]) => void) => void;
    emit: <K extends keyof SocketEvents>(event: K, data: SocketEvents[K]) => void;
    connect(): void;
    disconnect(): void;
  };
