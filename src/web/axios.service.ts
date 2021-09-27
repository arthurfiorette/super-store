import { Injectable } from '@nestjs/common';
import {
  AxiosCacheInstance,
  CacheAxiosResponse,
  CacheRequestConfig,
  createCache
} from 'axios-cache-interceptor';
import { MemoryStorage } from 'axios-cache-interceptor/dist/storage/memory';

@Injectable()
export class AxiosService {
  readonly axios: AxiosCacheInstance;

  constructor() {
    this.axios = createCache({
      cache: {
        ttl: 1000 * 30, // 30 Seconds
        storage: new MemoryStorage(),
        interpretHeader: true
      }
    });
  }

  request = async <T = any, R = CacheAxiosResponse<T>>(
    config: CacheRequestConfig
  ): Promise<R> => {
    return this.axios.request(config);
  };
}
