// All of this types are from looking at the responses.

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
