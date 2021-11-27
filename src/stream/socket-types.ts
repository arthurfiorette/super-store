type SocketEvents = {
  'event:update': UpdateEvent;
  authenticate: { method: 'jwt'; token: string };
  authenticated: AuthenticatedEvent;
  unauthorized: UnauthorizedEvent;
  connect: void;
  disconnect: void;

  // TODO: Find other types
  'event:reset': any;
  'event:test': any;
  event: any;
};

export type StreamElementsSocket =
  // typeof Socket &
  {
    on: <K extends keyof SocketEvents>(
      event: K,
      fn: (data: SocketEvents[K]) => void
    ) => void;
    emit: <K extends keyof SocketEvents>(event: K, data: SocketEvents[K]) => void;
    connect(): void;
    disconnect(): void;
  };

export type AuthenticatedEvent = {
  clientId: string;
  channelId: string;
  project: string;
  message: string;
};

export type UnauthorizedEvent = {
  message: string;
};

/** A union with all known event:update responses */
export type UpdateEvent = RedemptionLatestUpdateEvent | GenericUpdateEvent;

export type RedemptionLatestUpdateEvent = {
  name: 'redemption-latest';
  data: {
    itemId: string;
    type: string;
    name: string;
    item: string;
  };
};

export type GenericUpdateEvent = {
  name?: '';
  data?: any;
};
