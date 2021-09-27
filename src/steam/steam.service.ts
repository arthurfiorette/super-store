import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fromId, ICurrency } from 'src/common/currency';
import { Configuration } from 'src/config/configuration';
import SteamTotp from 'steam-totp';
import TradeOfferManager from 'steam-tradeoffer-manager';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';

@Injectable()
export class SteamService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(SteamService.name);

  readonly client = new SteamUser();
  readonly community = new SteamCommunity();
  readonly offerManager = new TradeOfferManager({
    steam: this.client,
    community: this.community,
    language: 'en'
  });

  private _currency = {} as ICurrency;

  constructor(private config: ConfigService<Configuration>) {
    // Initialization handlers
    this.client.on('webSession', this.onWebSession);
    this.client.on('wallet', this.onWallet);
    this.client.on('error', this.onError);

    // Auth handlers
    this.client.on('loggedOn', this.onLogin);
    this.client.on('disconnected', this.onDisconnect);
    this.client.on('steamGuard', this.onSteamGuard);
  }

  onModuleInit = () => {
    this.logger.log('Attempting to logon');

    this.client.logOn({
      accountName: this.config.get('steamUsername'),
      password: this.config.get('steamPassword'),
      twoFactorCode: this.getAuthCode(),
      machineName: 'super-store'
    });
  };

  onModuleDestroy = () => {
    this.logger.log('Attempting to logoff');
    this.client.logOff();
  };

  private onWebSession = (_sessionId: number, cookies: string[]) => {
    this.logger.debug('Started web session, delivering cookies');

    this.offerManager.setCookies(cookies);
    this.community.setCookies(cookies);

    // TODO: Migrate to new API (https://github.com/DoctorMcKay/node-steamcommunity/wiki/Steam-Confirmation-Polling#this-is-deprecated)
    this.community.startConfirmationChecker(
      11_000 /* Rate limit less than 10 seconds */,
      this.config.get('steamIdentitySecret')
    );
  };

  private onWallet = (_hasWallet: boolean, currencyId: number) => {
    this.logger.log(`Got currency id of ${currencyId}`);

    const currency = fromId(currencyId);

    if (!currency) {
      this.logger.error(`Unknown currency id ${currencyId}`);
      return;
    }

    this._currency = currency;
  };

  get currency(): ICurrency {
    return this._currency;
  }

  private onLogin = () => {
    this.logger.log('We logged in');
    this.client.setPersona(1);

    // TODO: Externalize a env config to change this game
    this.client.gamesPlayed(730);
  };

  private onDisconnect = (resultId: number, msg: string) => {
    this.logger.warn(`Steam client disconnected. (${resultId}) ${msg}`);
  };

  private onError = (err: Error) => {
    this.logger.error(`Occurred an error on the last operation: ${err}`);
  };

  private onSteamGuard = async (_domain: any, callback: (code: string) => void) => {
    const auth = this.getAuthCode();
    await callback(auth);
    this.logger.debug(`Requested steam guard. Returned ${auth}`);
  };

  getAuthCode = (): string => {
    const secret = this.config.get('steamSharedSecret')!;
    const code = SteamTotp.generateAuthCode(secret);
    this.logger.debug(`Generating steam guard code: ${code}`);
    return code;
  };
}
