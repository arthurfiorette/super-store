import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CallbackError } from 'steamcommunity';
import CEconItem from 'steamcommunity/classes/CEconItem';
import { Events } from '../../common/events';
import { SteamService } from '../steam.service';
import { AppAndContext, InventoryContentsResponse } from './inventory.types';
import {Promises} from 'typed-core'

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  /**
   * An array with all appId and their respective contextId.
   *
   * Structured this way because each appId may have multiple contexts
   */
  inventories: AppAndContext[] = [];

  private contextReady = Promises.deferred<void>();

  constructor(
    private readonly steam: SteamService //private readonly config: ConfigService<Configuration>
  ) {}

  @OnEvent(Events.STEAM_LOGON)
  @OnEvent(Events.INVENTORY_UPDATED)
  async loadInventoryContexts() {
    let contexts: InventoryContentsResponse;
    try {
      contexts = await new Promise((res, rej) => {
        this.steam.community.getUserInventoryContexts(
          this.steam.client.steamID!,
          //@ts-expect-error
          (err: CallbackError, data: InventoryContentsResponse) => {
            if (err) rej(err);
            else res(data);
          }
        );
      });
    } catch (err) {
      this.logger.error(`Could not retrieve user contexts`, err);
      return;
    }

    this.inventories = [];

    for (const { appid, rgContexts } of Object.values(contexts)) {
      for (const { id } of Object.values(rgContexts)) {
        this.inventories.push({ appId: appid, contextId: id });
      }
    }

    this.contextReady.resolve(void 0);
  }

  /** Commodities items are not grouped together. */
  readonly getAllTradableItems = async (ignoreAppIds: number[] = []) => {
    await this.contextReady;

    const userId = this.steam.client.steamID!;
    const items = [] as CEconItem[];

    for (const { appId, contextId } of this.inventories) {
      if(ignoreAppIds.includes(appId)) {
        continue;
      }

      const [inventory] = await new Promise<[CEconItem[], CEconItem[]]>((res) => {
        // Declarator won't help here
        (this.steam.community.getUserInventoryContents as Function)(
          userId,
          appId,
          contextId,
          true,
          //@ts-expect-error
          (err, inventory, currencies) => {
            if (err) {
              this.logger.error(
                `Could not retrieve inventory for AppId: ${appId} & CtxId: ${contextId}`,
                err
              );
              return;
            }

            res([inventory, currencies]);
          }
        );
      });

      items.push(...inventory);
    }

    this.logger.debug(`Retrieved ${items.length} items from the user inventory`);

    return items;
  };
}
