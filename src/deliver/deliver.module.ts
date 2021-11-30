import { Module } from '@nestjs/common';
import { MessengerModule } from '../messenger/messenger.module';
import { SteamModule } from '../steam/steam.module';
import { StreamModule } from '../stream/stream.module';
import { DeliverService } from './deliver.service';

@Module({
  providers: [DeliverService],
  exports: [DeliverService],
  imports: [StreamModule, SteamModule, MessengerModule]
})
export class DeliverModule {}
