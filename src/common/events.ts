/**
 * An enum with all events used by this NestJS application
 */
export enum Events {
  /** When the steam client made successful logon */
  STEAM_LOGON = 'steam.logon',

  /** When the user inventory was updated, by a trade or etc */
  INVENTORY_UPDATED = 'inventory.updated',

  /** On a new redemption. {@see RedemptionLatestUpdateEvent} */
  REDEMPTION_NEW = 'redemption.new'
}
