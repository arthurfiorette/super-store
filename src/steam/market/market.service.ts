import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosCacheInstance } from 'axios-cache-interceptor';
import CEconItem from 'steamcommunity/classes/CEconItem';
import { ICurrency } from '../../common/currency';
import { ItemPrice } from './item-price.types';

const priceOverviewUrl = 'http://steamcommunity.com/market/priceoverview';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);

  constructor(
    @Inject('axios')
    private readonly axios: AxiosCacheInstance
  ) {}

  getItemPrice = async (item: CEconItem, currency: ICurrency): Promise<ItemPrice> => {
    try {
      const { data } = await this.axios.get(priceOverviewUrl, {
        params: {
          appid: item.appid,
          currency: currency.steamId,
          market_hash_name: this.findHashName(item)
        }
      });

      this.logger.debug(`Retrieved item price for ${item.market_hash_name}`);

      return this.parseData(data, currency);
    } catch (e) {
      this.logger.error(e);

      return { success: false };
    }
  };

  private findHashName = ({ name, market_hash_name }: CEconItem): string => {
    return market_hash_name?.length > 0 ? market_hash_name : name;
  };

  private parseData = ({ success, ...prices }: any, { parse }: ICurrency): ItemPrice => {
    if (!success) {
      return { success };
    }

    const lowest_price = parse(prices.lowest_price);
    const median_price = prices.median_price ? parse(prices.median_price) : undefined;

    return {
      success,
      lowest_price,
      median_price,
      highest_price:
        median_price === undefined ? lowest_price : Math.max(lowest_price, median_price)
    };
  };
}
