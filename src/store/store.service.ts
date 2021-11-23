import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../common/events';
import { InventoryService } from '../steam/inventory/inventory.service';
import { SteamService } from '../steam/steam.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly steamService: SteamService,
    private readonly inventoryService: InventoryService
  ) {}

  @OnEvent(Events.STEAM_LOGON)
  public async onSteamLogon() {
    const inventoryItems = this.inventoryService.getAllTradableItems();
  }
  
}
