// FIXME: There is an issue with the timing of loading these secrets from env
// Code is duplicated from DB config
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

export const jwtConstants = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: '15m',
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: '7d',
};