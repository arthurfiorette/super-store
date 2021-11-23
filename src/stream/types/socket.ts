// import { Socket } from 'socket.io-client';
import type { AuthenticatedEvent, UnauthorizedEvent, UpdateEvent } from './stream';

type Events = {
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
    on: <K extends keyof Events>(event: K, fn: (data: Events[K]) => void) => void;
    emit: <K extends keyof Events>(event: K, data: Events[K]) => void;
    connect(): void;
    disconnect(): void;
  };
