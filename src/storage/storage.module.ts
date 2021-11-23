import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { StorageService } from './storage.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, StorageService],
  exports: [StorageService]
})
export class StorageModule {}
