import {
  AxiosCacheInstance,
  CacheAxiosResponse,
  CacheRequestConfig,
  createCache
} from 'axios-cache-interceptor';
import { MemoryStorage } from 'axios-cache-interceptor/dist/storage/memory';
import { Application } from '../core/application';
import { Service } from '../core/service';

export class AxiosClient extends Service {
  readonly axios: AxiosCacheInstance;

  constructor(core: Application) {
    super(core);

    this.axios = createCache({
      methods: ['get'],
      storage: new MemoryStorage(),
      ttl: 1000 * 30 // 30 seconds
    });
  }

  public request = async <T>(
    config: CacheRequestConfig
  ): Promise<[CacheAxiosResponse<T>, null] | [null, any]> => {
    try {
      return [await this.axios.request<T>(config), null];
    } catch (error) {
      return [null, error];
    }
  };

  async enable() {}
  async disable() {}
}
