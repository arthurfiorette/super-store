import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebModule } from '../web/web.module';
import { InventoryService } from './inventory/inventory.service';
import { MarketService } from './market/market.service';
import { OfferService } from './offer/offers.service';
import { SteamService } from './steam.service';

@Module({
  providers: [SteamService, MarketService, OfferService, InventoryService],
  exports: [SteamService, MarketService, InventoryService],
  imports: [ConfigModule, WebModule]
})
export class SteamModule {}
