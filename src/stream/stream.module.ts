import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebModule } from '../web/web.module';
import { StreamService } from './stream.service';

@Module({
  providers: [StreamService],
  exports: [StreamService],
  imports: [ConfigModule, WebModule]
})
export class StreamModule {}
