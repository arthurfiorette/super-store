import { Injectable } from '@nestjs/common';
import { AxiosCacheInstance, createCache } from 'axios-cache-interceptor';
import { MemoryAxiosStorage } from 'axios-cache-interceptor/dist/storage/memory';

@Injectable()
export class AxiosService {
  readonly axios: AxiosCacheInstance;

  constructor() {
    this.axios = createCache({
      cache: {
        ttl: 1000 * 30, // 30 Seconds
        storage: new MemoryAxiosStorage(),
        interpretHeader: true
      }
    });

    this.request = this.axios.request;
  }

  readonly request: AxiosCacheInstance['request'];
}
