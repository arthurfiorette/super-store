import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Configuration } from '../../config/configuration';
import type { TradeOfferEvent } from '../trade-offer.types';
import { SteamService } from '../steam.service';
import { Reason } from './offers.reasons';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);

  constructor(private steam: SteamService, private config: ConfigService<Configuration>) {
    this.steam.offerManager.on('newOffer', this.onNewOffer);
  }

  private acceptOffer = async (offer: TradeOfferEvent, reason: Reason) => {
    this.logger.log(`Accepting offer ${offer.id}`);

    await offer.accept((err) => {
      if (err) {
        this.logger.error(`Error accepting offer ${offer.id}`, err);
        return;
      }

      this.logger.log(`Accepted trade offer ${offer.id}. ${reason}`, err);
    });
  };

  private declineOffer = async (offer: TradeOfferEvent, reason: Reason) => {
    this.logger.log(`Declining offer ${offer.id}`);

    await offer.decline((err) => {
      if (err) {
        this.logger.error(`Error declining offer ${offer.id}`, err);
        return;
      }

      this.logger.log(`Declined trade offer ${offer.id}. ${reason}`, err);
    });
  };

  readonly onNewOffer = async (offer: TradeOfferEvent) => {
    if (offer.isGlitched()) {
      this.logger.error(`Offer ${offer.id} is glitched`);
      await this.declineOffer(offer, Reason.GLITCHED);
      return;
    }

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

    if (offer.itemsToReceive.some((item) => !item.marketable)) {
      await this.declineOffer(offer, Reason.UNMARKETABLE);
      return;
    }

    await this.acceptOffer(offer, Reason.GIFT);
  };
}
