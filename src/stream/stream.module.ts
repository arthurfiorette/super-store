import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StreamService } from './stream.service';

@Module({
  providers: [StreamService],
  exports: [StreamService],
  imports: [ConfigModule]
})
export class StreamModule {}
