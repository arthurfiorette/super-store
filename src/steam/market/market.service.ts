import { Injectable, Logger } from '@nestjs/common';
import CEconItem from 'steamcommunity/classes/CEconItem';
import { ICurrency } from '../../common/currency';
import { AxiosService } from '../../web/axios.service';
import { ItemPrice } from './item-price.types';

const priceOverviewUrl = 'http://steamcommunity.com/market/priceoverview';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);

  constructor(private readonly axios: AxiosService) {}

  getItemPrice = async (item: CEconItem, currency: ICurrency): Promise<ItemPrice> => {
    try {
      const { data } = await this.axios.request({
        method: 'get',
        url: priceOverviewUrl,
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

      return { success: false, lowest_price: -1 };
    }
  };

  private findHashName = ({ name, market_hash_name }: CEconItem): string => {
    return market_hash_name?.length > 0 ? market_hash_name : name;
  };

  private parseData = (
    { success, lowest_price, median_price }: any,
    { parse }: ICurrency
  ): ItemPrice => {
    return {
      success: success == 'true',
      lowest_price: parse(lowest_price),
      median_price: median_price ? parse(median_price) : undefined
    };
  };
}
