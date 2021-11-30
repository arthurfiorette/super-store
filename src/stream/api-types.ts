import { LoyaltyItem, User13 } from './generated';

export type PutLoyaltyItem = Partial<
  LoyaltyItem & {
    thumbnail: string;
    sources: string[];
    allowMessages: boolean;
    bot: { sendResponse: boolean };
    quantity: { current: number };
    alert: {
      graphics: { type: 'image' };
      showUserInput: boolean;
    };
  }
>;

export type RedemptionInfo = {
  redeemerType: string;
  completed: boolean;
  input: string[];
  _id: string;
  channel: string;
  redeemer: User13 & { inactive: boolean; isPartner: boolean };
  item: Pick<LoyaltyItem, '_id' | 'userInput' | 'name'>;
  source: string;
  createdAt: string;
  updatedAt: string;
};
