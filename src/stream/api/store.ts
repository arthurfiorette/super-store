import { PutLoyaltyItem } from '../api-types';
import { badrequest, LoyaltyItem, Notfound2 } from '../generated';
import { ApiResult, BaseStreamApi } from './base';

export class StoreStreamApi extends BaseStreamApi {
  /** List store items */
  readonly getItems = async (limit: number, offset: number): ApiResult<LoyaltyItem[]> => {
    return this.request(`/store/${this.channelId}/items`, {
      method: 'get',
      params: {
        limit,
        offset
      }
    });
  };

  /** Add new item to store */
  readonly addItem = async (data: PutLoyaltyItem): ApiResult<LoyaltyItem> => {
    return this.request(`/store/${this.channelId}/items`, {
      method: 'post',
      data
    });
  };

  /**  Get item details */
  readonly getItemDetails = async (itemId: string): ApiResult<LoyaltyItem> => {
    return this.request(`/store/${this.channelId}/items/${itemId}`, {
      method: 'get'
    });
  };

  /** Update item */
  readonly updateItem = async (
    itemId: string,
    data: Partial<LoyaltyItem>
  ): ApiResult<LoyaltyItem | badrequest> => {
    return this.request(`/store/${this.channelId}/items/${itemId}`, {
      method: 'put',
      data
    });
  };

  /** Delete item from store */
  readonly deleteItem = async (itemId: string): ApiResult<'Created' | Notfound2> => {
    return this.request(`/store/${this.channelId}/items/${itemId}`, {
      method: 'delete'
    });
  };
}
