import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import CEconItem from 'steamcommunity/classes/CEconItem';
import { Configuration } from '../common/configuration';
import { Currency } from '../common/currency';
import { Events } from '../common/events';
import { InventoryService } from '../steam/inventory/inventory.service';
import { groupCommodities } from '../steam/inventory/inventory.utils';
import { SuccessfulItemPrice } from '../steam/market/item-price.types';
import { MarketService } from '../steam/market/market.service';
import { PutLoyaltyItem } from '../stream/api-types';
import { StreamService } from '../stream/stream.service';

@Injectable()
export class SellerService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly streamService: StreamService,
    private readonly inventoryService: InventoryService,
    private readonly marketService: MarketService,
    private readonly config: ConfigService<Configuration>
  ) {}

  @OnEvent(Events.STEAM_LOGON)
  public async onSteamLogon() {
    const currency = Currency[this.config.get('pricesCurrency', { infer: true })!];
    const ignoreAppIds = this.config.get('ignoreAppIds', { infer: true })!;

    const inventoryItems = await this.inventoryService.getAllTradableItems(ignoreAppIds);

    // const { error } = await this.streamService.store.getItems(
    //   /* max value */ 2147483647,
    //   0
    // );

    // if (error) {
    //   return;
    // }

    for (const item of groupCommodities(inventoryItems)) {
      if (!item.tradable || !item.marketable) {
        continue;
      }

      const marketPrice = await this.marketService.getItemPrice(item, currency);

      if (!marketPrice.success) {
        this.logger.error('Could not retrieve market price from steam.');
        continue;
      }

      const loyaltyItem = this.createLoyaltyItem(item, marketPrice);

      const resp = await this.streamService.store.addItem(loyaltyItem);

      if (resp.error) {
        console.log(resp.error);
      }
    }
  }

  private createLoyaltyItem = (
    item: CEconItem,
    { highest_price }: SuccessfulItemPrice
  ): Partial<PutLoyaltyItem> => {
    const currencyFactor = this.config.get('pricesCurrencyValue', { infer: true })!;

    const storeName = item.name || (<any>item).market_name || item.market_hash_name;

    return {
      type: 'perk',

      name: storeName + 'TEST',
      description: this.getInventoryLink(item),

      // FIXME: Only images from SE CDN are allowed.
      // thumbnail: item.getImageURL(),
      thumbnail:
        'https://cdn.streamelements.com/uploads/b68cece3-364b-4f5c-9302-4afb31a04a39.png',

      cost: highest_price * currencyFactor,
      quantity: { total: item.amount, current: item.amount },

      userInput: ['Steam Trade Link'],

      cooldown: { global: 5, user: 60 },
      bot: {
        identifier: this.createIdentifier(item),
        sendResponse: false,
        enabled: false
      },

      // Some properties that are sent by default
      subscriberOnly: false,
      accessCodes: { keys: [], mode: 'multi', random: true },
      enabled: true,
      featured: false,
      public: true,
      sources: ['website'],
      allowMessages: false,
      alert: {
        enabled: false,
        graphics: { duration: 8, type: 'image' },
        audio: { volume: 0.5, src: null },
        showUserInput: false
      }
    };
  };

  private createIdentifier = (item: CEconItem) => {
    // StreamElements validation
    let identifier = item.market_hash_name.replace(/[^\w+]/, '');

    // Add unique values
    identifier += `_${item.appid}`;
    identifier += `_${item.assetid}`;
    identifier += `_${item.classid}`;

    return identifier;
  };

  private getInventoryLink = (item: CEconItem) => {
    return `https://steamcommunity.com/id/griffitybr/inventory#${item.appid}_${item.contextid}_${item.id}`;
  };
}
