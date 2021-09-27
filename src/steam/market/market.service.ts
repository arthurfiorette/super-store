import { Injectable, Logger } from '@nestjs/common';
import { AxiosService } from 'src/web/axios.service';
import { ICurrency } from '../../common/currency';
import { ItemPrice, SteamItem } from '../../common/steam.types';

const priceOverviewUrl = 'http://steamcommunity.com/market/priceoverview';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);

  constructor(private axios: AxiosService) {}

  getItemPrice = async (item: SteamItem, currency: ICurrency): Promise<ItemPrice> => {
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
      return this.parseData(data, currency.parse);
    } catch (e) {
      this.logger.error(e);

      return { success: false, lowest_price: -1 };
    }
  };

  private findHashName = ({ market_name, market_hash_name, name }: SteamItem): string => {
    const notEmpty = (str: string) => str && str.length > 0;

    if (notEmpty(market_hash_name)) return market_hash_name;
    if (notEmpty(market_name)) return market_name;

    return name;
  };

  private parseData = (
    { success, lowest_price, median_price }: any,
    parse: ICurrency['parse']
  ): ItemPrice => {
    return {
      success,
      lowest_price: parse(lowest_price),
      median_price: median_price ? parse(median_price) : undefined
    };
  };
}
