import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { StreamModule } from './stream/stream.module';
import { WebModule } from './web/web.module';
import { SteamModule } from './steam/steam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env'
    }),
    StreamModule,
    WebModule,
    SteamModule
  ]
})
export class AppModule {}
