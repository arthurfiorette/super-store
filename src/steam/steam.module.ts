import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebModule } from 'src/web/web.module';
import { MarketService } from './market/market.service';
import { OfferService } from './offer/offers.service';
import { SteamService } from './steam.service';

@Module({
  providers: [SteamService, MarketService, OfferService],
  exports: [SteamService, MarketService],
  imports: [ConfigModule, WebModule]
})
export class SteamModule {}
