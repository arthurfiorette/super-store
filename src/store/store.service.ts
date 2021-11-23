import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../common/events';
import { InventoryService } from '../steam/inventory/inventory.service';
import { StreamService } from '../stream/stream.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly streamService: StreamService,
    private readonly inventoryService: InventoryService
  ) {}

  @OnEvent(Events.STEAM_LOGON)
  public async onSteamLogon() {
    const inventoryItems = await this.inventoryService.getAllTradableItems();
    const storeItems = await this.streamService.api.getChannelItems(
      /* max value */
      2147483647,
      0
    );

    if (storeItems == null) {
      return;
    }

    console.log('Store', storeItems);
    console.log('Inv', inventoryItems);
  }
}
