export enum Reason {
  GLITCHED = 'The trade was glitched',
  UNMARKETABLE = 'The trade contains unmarketable items',
  OWNER = 'The trade partner is listed as an owner of this bot',
  FRAUD_WARNINGS = 'There was a item in the trade with a trade warning',
  GIFT = 'The trade is a gift for us',
  NOT_A_GIFT = 'The trade required itens from our inventory'
}
