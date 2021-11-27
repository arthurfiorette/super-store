import { Module } from '@nestjs/common';
import { createCache } from 'axios-cache-interceptor';
import { MemoryAxiosStorage } from 'axios-cache-interceptor/dist/storage/memory';

@Module({
  providers: [
    {
      provide: 'axios',
      useValue: createCache({
        cache: {
          ttl: 1000 * 30, // 30 Seconds
          storage: new MemoryAxiosStorage(),
          interpretHeader: true
        }
      })
    }
  ],
  exports: ['axios']
})
export class WebModule {}
