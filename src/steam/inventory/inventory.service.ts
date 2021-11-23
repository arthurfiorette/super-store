import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CallbackError } from 'steamcommunity';
import { Events } from '../../common/events';
//import { ConfigService } from '@nestjs/config';
//import { Configuration } from '../../config/configuration';
import { SteamService } from '../steam.service';
import { InventoryContentsResponse } from './inventory.types';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  /** available after Events.STEAM_LOGON */
  inventoryContexts!: string[];

  constructor(
    private readonly steam: SteamService //private readonly config: ConfigService<Configuration>
  ) {}

  @OnEvent(Events.STEAM_LOGON)
  @OnEvent(Events.INVENTORY_NEEDS_UPDATE)
  public getInventoryContents() {
    const id = this.steam.client.steamID!;

    this.steam.community.getUserInventoryContexts(
      id,
      //@ts-expect-error
      this.onInventoryContexts
    );

    this.logger.log(`Got inventory contexts`);

    // for (const contextId of this.inventoryContexts) {
    //   this.steam.community.getUserInventoryContents(
    //     id,
    //     contextId,
    //     true,
    //     undefined,
    //     //@ts-expect-error
    //     (err: any, inventory: CEconItem, currencies: CEconItem) => {}
    //   );
    // }
  }

  private onInventoryContexts = (
    err: CallbackError,
    result: InventoryContentsResponse
  ) => {
    if (err) {
      this.logger.error(`Occurred and error while getting inventory contexts`, err);
    }

    console.log(result)

    this.inventoryContexts = Object.keys(result);
  };
}
