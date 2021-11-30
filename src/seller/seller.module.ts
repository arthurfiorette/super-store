import { Module } from '@nestjs/common';
import { SteamModule } from '../steam/steam.module';
import { StreamModule } from '../stream/stream.module';
import { SellerService } from './seller.service';

@Module({
  providers: [SellerService],
  imports: [StreamModule, SteamModule]
})
export class SellerModule {}
