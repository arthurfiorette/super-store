import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StreamService } from './stream/stream.service';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const stream = app.get(StreamService);

  stream.connect();
})();
