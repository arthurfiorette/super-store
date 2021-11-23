import { AxiosCacheInstance, CacheAxiosResponse } from "axios-cache-interceptor";

export class SEApi {
  constructor(
    readonly axios: AxiosCacheInstance,
    readonly channelId: string,
    readonly channelJwt: string,
  ) {}

  readonly getChannelItems = () => {}
}