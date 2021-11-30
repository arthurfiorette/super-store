import { RedemptionInfo } from '../api-types';
import { ApiResult, BaseStreamApi } from './base';

export class RedemptionsStreamApi extends BaseStreamApi {
  /** Get redemption details */
  readonly getRedemptionDetails = async (
    redemptionId: string
  ): ApiResult<RedemptionInfo> => {
    return this.request(`/store/${this.channelId}/redemptions/${redemptionId}`);
  };
}
