import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Configuration } from '../../common/configuration';
import { Events } from '../../common/events';
import { SteamService } from '../steam.service';
import { TradeOfferEvent } from '../trade-offer.types';
import { Reason } from './offers.reasons';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);

  constructor(
    private readonly steam: SteamService,
    private readonly  config: ConfigService<Configuration>,
    private eventEmitter: EventEmitter2
  ) {
    this.steam.offerManager.on('newOffer', this.onNewOffer);
  }

  private acceptOffer = async (offer: TradeOfferEvent, reason: Reason) => {
    this.logger.log(`Accepting offer ${offer.id}`);

    await offer.accept((err) => {
      if (err) {
        this.logger.error(`Error accepting offer ${offer.id}`, err);
        return;
      }

      this.eventEmitter.emit(Events.INVENTORY_UPDATED);

      this.logger.log(`Accepted trade offer ${offer.id}. ${reason}`);
    });
  };

  private declineOffer = async (offer: TradeOfferEvent, reason: Reason) => {
    this.logger.log(`Declining offer ${offer.id}`);

    await offer.decline((err) => {
      if (err) {
        this.logger.error(`Error declining offer ${offer.id}`, err);
        return;
      }

      this.logger.log(`Declined trade offer ${offer.id}. ${reason}`);
    });
  };

  readonly onNewOffer = async (offer: TradeOfferEvent) => {
    if (offer.isGlitched()) {
      this.logger.error(`Offer ${offer.id} is glitched`);
      await this.declineOffer(offer, Reason.GLITCHED);
      return;
    }

    // FIXME: Owners
    const ownersId: string[] | undefined = this.config.get('steamOwnerId');
    const partnerId = offer.partner.getSteamID64();

    // The owner send that trade, accept it.
    if (ownersId?.includes(partnerId)) {
      await this.acceptOffer(offer, Reason.OWNER);
      return;
    }

    if (offer.itemsToGive.length >= 1) {
      await this.declineOffer(offer, Reason.NOT_A_GIFT);
      return;
    }

    for (const item of offer.itemsToReceive) {
      if (!item.marketable) {
        await this.declineOffer(offer, Reason.UNMARKETABLE);
        return;
      }

      if (item.fraudwarnings.length > 0) {
        this.logger.debug(`Fraud warnings: (${item.fraudwarnings.join(', ')})`);
        await this.declineOffer(offer, Reason.FRAUD_WARNINGS);
        return;
      }
    }

    await this.acceptOffer(offer, Reason.GIFT);
  };
}
