import { Module } from '@nestjs/common';
import { SteamModule } from '../steam/steam.module';
import { StreamModule } from '../stream/stream.module';
import { StoreService } from './store.service';

@Module({
  providers: [StoreService],
  imports: [StreamModule, SteamModule]
})
export class StoreModule {}
