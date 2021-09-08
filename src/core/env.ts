import dotenv from 'dotenv';
import path from 'path';

const PATH = path.join(__dirname, '..', '..', '.env');

const { error, parsed } = dotenv.config({
  path: PATH
});

if (error || !parsed) {
  throw error;
}

// Just to check if the environment variable exists
const get = (name: string) => {
  const value = parsed[name.toUpperCase()];
  if (!value || value.trim().length < 1) {
    console.error(`Variable ${name.toUpperCase()} not found`);
    return '';
  }
  return value;
};

export const LOG_LEVEL = get('LOG_LEVEL');

export const SE_USER_ID = get('SE_USER_ID');
export const SE_USER_JWT = get('SE_USER_JWT');
export const SE_API_URL = get('SE_API_URL');
export const SE_WS_URL = get('SE_WS_URL');

export const STEAM_USERNAME = get('STEAM_USERNAME');
export const STEAM_PASSWORD = get('STEAM_PASSWORD');
export const STEAM_SECRET = get('STEAM_SECRET');
export const STEAM_IDENTITY = get('STEAM_IDENTITY');

export const PRICES_CURRENCY = get('PRICES_CURRENCY');
export const PRICES_CURRENCY_VALUE = get('PRICES_CURRENCY_VALUE');
