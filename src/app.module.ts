import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configuration } from './common/configuration';
import { SteamModule } from './steam/steam.module';
import { StoreModule } from './store/store.module';
import { StorageModule } from './storage/storage.module';
import { StreamModule } from './stream/stream.module';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    WebModule,
    StorageModule,
    SteamModule,
    StreamModule,
    StoreModule,
  ]
})
export class AppModule {}
