import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
})();
