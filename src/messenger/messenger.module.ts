import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Module({
  providers: [MessengerService],
  exports: [MessengerService]
})
export class MessengerModule {}
