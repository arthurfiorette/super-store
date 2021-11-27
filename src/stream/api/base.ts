import { Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import {
  AxiosCacheInstance,
  CacheAxiosResponse,
  CacheRequestConfig
} from 'axios-cache-interceptor';
import merge from 'lodash.merge';

export type ApiResult<D> = Promise<
  | {
      error: null;
      response: CacheAxiosResponse<D>;
    }
  | {
      error: AxiosError<D>;
      response: null;
    }
>;

export class BaseStreamApi {
  /** @see https://dev.streamelements.com/docs/kappa/ */
  static readonly BASE_URL = 'https://api.streamelements.com/kappa/v2';

  protected readonly logger = new Logger(this.constructor.name);

  protected defaultOptions: CacheRequestConfig<any>;

  constructor(
    protected readonly axios: AxiosCacheInstance,
    protected readonly channelId: string,
    protected readonly token: string
  ) {
    this.defaultOptions = {
      baseURL: BaseStreamApi.BASE_URL,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json; charset=utf-8'
      }
    };
  }

  protected request = async <Res, Req = never>(
    url: string,
    options?: Omit<CacheRequestConfig<Req>, 'url'>
  ): ApiResult<Res> => {
    try {
      const response = await this.axios.request<Res, Req>(
        merge(this.defaultOptions, { url }, options)
      );
      return { error: null, response: response };
    } catch (e: any) {
      this.logger.error('Error while getting response for request', e);

      return { error: e, response: null };
    }
  };
}
