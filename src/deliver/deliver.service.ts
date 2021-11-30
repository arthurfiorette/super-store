import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../common/events';
import { MessengerService } from '../messenger/messenger.service';
import { RedemptionLatestUpdateEvent } from '../stream/socket-types';
import { StreamService } from '../stream/stream.service';

const TRADELINK_REGEX =
  /^(https?:\/\/)?steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]+&token=[a-zA-Z0-9_-]+$/gi;

@Injectable()
export class DeliverService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly streamService: StreamService,
    // private readonly steamService: SteamService,
    private readonly messengerService: MessengerService
  ) {}

  @OnEvent(Events.REDEMPTION_NEW)
  async onRedeemAttempt({ data }: RedemptionLatestUpdateEvent) {
    const res = await this.streamService.redemptions.getRedemptionDetails(data.itemId);

    if (res.error) {
      return;
    }

    const {
      input: [tradeLink],
      redeemer
    } = res.response.data;

    if (!tradeLink || !tradeLink.match(TRADELINK_REGEX)) {
      this.logger.warn(`Received invalid trade link: '${tradeLink}'`);
      await this.messengerService.client.whisper(
        redeemer.username,
        `Received invalid trade link: '${tradeLink}'`
      );
      return;
    }
  }
}
