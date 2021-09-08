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
