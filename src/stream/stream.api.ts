import { Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AxiosCacheInstance } from 'axios-cache-interceptor';
import { StoreApi } from '../generated/stream/api';
import { BASE_PATH } from '../generated/stream/api/base';

const ACCEPT_JSON = 'application/json; charset=utf-8';

export class SEApi {
  private logger = new Logger(SEApi.name);
  private readonly storeApi: StoreApi;
  private token;

  constructor(
    axios: AxiosCacheInstance,
    private readonly channelId: string,
    channelJwt: string
  ) {
    this.token = `Bearer ${channelJwt}`;

    this.storeApi = new StoreApi({}, BASE_PATH, axios);
  }

  private unwrapResponse = async <T>(
    promise: Promise<AxiosResponse<T, any>>
  ): Promise<T | null> => {
    try {
      const res = await promise;
      return res.data;
    } catch (err) {
      this.logger.log(
        `Error while requesting StreamElements API. Cancelling operation.`,
        err
      );

      return null;
    }
  };

  readonly getChannelItems = async (limit: number, offset: number) => {
    return this.unwrapResponse(
      this.storeApi.channelItems(limit, offset, this.channelId, ACCEPT_JSON, {
        headers: { token: this.token }
      })
    );
  };
}
