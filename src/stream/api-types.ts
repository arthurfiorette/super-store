import { LoyaltyItem } from './generated';

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
