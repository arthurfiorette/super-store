import { CurrencyIdKey } from '../common/currency';

export type Configuration = {
  seUserId: string;
  seUserJwt: string;
  seApiUrl: string;
  seWsUrl: string;
  steamUsername: string;
  steamPassword: string;
  steamSharedSecret: string;
  steamIdentitySecret: string;
  steamOwnerId: string[];
  pricesCurrency: CurrencyIdKey;
  pricesCurrencyValue: number;
};

const get = (
  name: string,
  opts: { required: true } | { required?: false; default: string }
): string => {
  const value = process.env[name];
  if (!opts.required) return value || opts.default;
  if (!value) throw new Error(`${name} is required`);
  return value;
};

export const configuration = (): Configuration => {
  return {
    seUserId: get('SE_USER_ID', { required: true }),
    seUserJwt: get('SE_USER_JWT', { required: true }),
    seApiUrl: get('SE_API_URL', { default: 'https://api.streamelements.com/kappa/v2/' }),
    seWsUrl: get('SE_WS_URL', { default: 'https://realtime.streamelements.com/' }),
    steamUsername: get('STEAM_USERNAME', { required: true }),
    steamPassword: get('STEAM_PASSWORD', { required: true }),
    steamSharedSecret: get('STEAM_SECRET', { required: true }),
    steamIdentitySecret: get('STEAM_IDENTITY', { required: true }),
    steamOwnerId: get('STEAM_OWNER_IDS', { default: '' }).trim().split(','),
    pricesCurrency: get('PRICES_CURRENCY', { default: 'BRL' }) as CurrencyIdKey,
    pricesCurrencyValue: parseInt(get('PRICES_CURRENCY_VALUE', { default: '1000' }))
  };
};
